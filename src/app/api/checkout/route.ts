// =====================================================================
//  À PLACER DANS :  src/app/api/checkout/route.ts
//  (remplace entièrement le contenu actuel de ce fichier)
// =====================================================================
//
//  Stripe Checkout (paiement immédiat) + facture auto (invoice_creation)
//  + TVA mixte (20 % standard / 5,5 % réduit) via taux de TVA manuels.
//  getCatalogVariant() est branché sur ton catalogue src/lib/products.ts.
//  Compatible Next.js 16 (App Router).
//
//  ⚠️ SÉCURITÉ : les PRIX et la TVA ne viennent JAMAIS du navigateur. On
//  reçoit seulement les variantId + quantités, et on recalcule tout côté
//  serveur à partir du catalogue + des prix contractuels du client.

import Stripe from 'stripe'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'
import { PRODUCTS } from '@/lib/products'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Taux de TVA créés dans le Dashboard Stripe (exclusifs = ajoutés au HT)
const TVA_STANDARD = process.env.STRIPE_TAX_RATE_STANDARD! // 20 %  -> txr_...
const TVA_REDUITE = process.env.STRIPE_TAX_RATE_REDUCED! //  5,5 % -> txr_...

// Sous-catégories de ton catalogue à TVA réduite 5,5 % (café / gourmand).
// Pour ajuster un taux : ajoute/retire une sous-catégorie ici (rien d'autre).
const SOUS_CATEGORIES_TVA_REDUITE = new Set<string>([
  'Kit Gourmand',
  'Kit Capsule Café',
  'Capsule café',
])

type CatalogVariant = {
  productId: string
  productName: string
  variantName: string
  sku: string | null
  standardPrice: number // en CENTIMES
  vatRate: number // 20 ou 5.5
}

// Cherche une variante dans ton catalogue (src/lib/products.ts) par son id.
function getCatalogVariant(variantId: string): CatalogVariant | null {
  for (const product of PRODUCTS) {
    const variant = product.variants?.find((v) => v.id === variantId)
    if (variant) {
      return {
        productId: product.id,
        productName: product.name,
        variantName: variant.name,
        sku: variant.sku ?? null,
        standardPrice: variant.price, // déjà en centimes dans ton catalogue
        vatRate: SOUS_CATEGORIES_TVA_REDUITE.has(product.subcategory ?? '') ? 5.5 : 20,
      }
    }
  }
  return null
}

export async function POST(request: Request) {
  // --- Auth : qui est le client connecté ? (client SSR Supabase) ---
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // appelé hors d'un contexte modifiable — ignorable
          }
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return Response.json({ error: 'Non authentifié' }, { status: 401 })
  }

  // Modèle B2B : on n'autorise que les comptes approuvés.
  const { data: profile } = await supabase
    .from('profiles')
    .select('account_status, company, first_name, last_name')
    .eq('id', user.id)
    .single()

  if (profile?.account_status !== 'approved') {
    return Response.json({ error: 'Compte non approuvé' }, { status: 403 })
  }

  // --- Panier envoyé par le client (SANS prix) ---
  // Attendu : { items: [{ variantId, quantity }], shipping: {...} }
  const body = await request.json()
  const items: { variantId: string; quantity: number }[] = body.items ?? []
  if (items.length === 0) {
    return Response.json({ error: 'Panier vide' }, { status: 400 })
  }

  // --- Prix contractuels du client (priment sur le catalogue) ---
  const { data: contractRows } = await supabase.rpc('get_user_contract_prices', {
    p_user_id: user.id,
  })
  const contractPrices = new Map<string, number>()
  for (const row of contractRows ?? []) {
    contractPrices.set(row.variant_id as string, row.custom_price as number)
  }

  // --- Calcul serveur : line items Stripe + lignes de commande ---
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []
  const orderItems: Record<string, unknown>[] = []
  let subtotal = 0

  for (const item of items) {
    const v = getCatalogVariant(item.variantId)
    if (!v) {
      return Response.json(
        { error: `Variante inconnue : ${item.variantId}` },
        { status: 400 }
      )
    }
    const qty = Math.max(1, Math.floor(item.quantity))
    const contractPrice = contractPrices.get(item.variantId)
    const unitPrice = contractPrice ?? v.standardPrice // centimes, HT
    const wasContractPrice = contractPrice != null

    // Le bon taux de TVA selon le produit
    const taxRateId = v.vatRate === 5.5 ? TVA_REDUITE : TVA_STANDARD

    subtotal += unitPrice * qty

    lineItems.push({
      quantity: qty,
      tax_rates: [taxRateId], // 👈 TVA ajoutée par-dessus le prix HT
      price_data: {
        currency: 'eur',
        unit_amount: unitPrice, // reste le prix HT
        product_data: {
          name: `${v.productName} — ${v.variantName}`,
          metadata: { variant_id: item.variantId, product_id: v.productId },
        },
      },
    })

    orderItems.push({
      product_id: v.productId,
      product_name: v.productName,
      variant_id: item.variantId,
      variant_name: v.variantName,
      sku: v.sku,
      quantity: qty,
      unit_price: unitPrice,
      total_price: unitPrice * qty,
      was_contract_price: wasContractPrice,
    })
  }

  const shippingCost = 0 // livraison offerte
  // total HT provisoire — le webhook le remplacera par le TTC réel de Stripe
  const total = subtotal + shippingCost

  // --- Commande "pending" créée AVANT le paiement ---
  // On écrit avec le client ADMIN : tes policies RLS interdisent volontairement
  // à un user d'insérer une commande lui-même (sinon il choisirait son prix).
  const admin = createAdminClient()
  const s = body.shipping ?? {}

  const { data: order, error: orderError } = await admin
    .from('orders')
    .insert({
      user_id: user.id,
      status: 'pending',
      shipping_first_name: s.firstName ?? profile?.first_name ?? '',
      shipping_last_name: s.lastName ?? profile?.last_name ?? '',
      shipping_email: user.email,
      shipping_phone: s.phone ?? null,
      shipping_company: s.company ?? profile?.company ?? null,
      shipping_address: s.address ?? '',
      shipping_address2: s.address2 ?? null,
      shipping_city: s.city ?? '',
      shipping_postal_code: s.postalCode ?? '',
      shipping_country: s.country ?? 'FR',
      subtotal,
      shipping_cost: shippingCost,
      total,
    })
    .select('id')
    .single()

  if (orderError || !order) {
    return Response.json({ error: 'Création commande impossible' }, { status: 500 })
  }

  await admin
    .from('order_items')
    .insert(orderItems.map((oi) => ({ ...oi, order_id: order.id })))

  // --- Session Stripe Checkout AVEC FACTURE AUTOMATIQUE ---
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    customer_email: user.email,
    billing_address_collection: 'required', // utile pour la facture
    shipping_address_collection: { allowed_countries: ['FR'] },

    // Optionnel B2B : laisse le client saisir son n° de TVA (affiché sur la facture)
    // tax_id_collection: { enabled: true },

    // 👇 Stripe génère + envoie une facture PDF après paiement (TVA incluse)
    invoice_creation: {
      enabled: true,
      invoice_data: {
        // ⚠️ TODO : mets le vrai SIRET / n° de TVA de la société
        footer: 'Mon Petit Parfait — SIRET 000 000 000 00000 — TVA FR00 000000000',
        metadata: { order_id: order.id, user_id: user.id },
        custom_fields: [{ name: 'Commande', value: order.id.slice(0, 8) }],
      },
    },

    metadata: { order_id: order.id, user_id: user.id },
    success_url: `${baseUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/panier`,
  })

  await admin.from('orders').update({ stripe_session_id: session.id }).eq('id', order.id)

  return Response.json({ url: session.url })
}
