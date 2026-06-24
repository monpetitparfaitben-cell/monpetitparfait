// =====================================================================
//  À PLACER DANS :  src/app/api/webhooks/stripe/route.ts
// =====================================================================
//
//  Reçoit les événements Stripe après paiement :
//   - checkout.session.completed → commande "paid" + montants réels (TTC, TVA)
//   - invoice.paid               → on stocke le lien du PDF de la facture
//
//  Route Handler App Router : on récupère le corps BRUT (await request.text()),
//  indispensable pour vérifier la signature du webhook.

import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase/admin'

// Stripe a besoin du runtime Node (crypto), pas de l'Edge.
export const runtime = 'nodejs'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  const body = await request.text() // corps BRUT requis pour la signature
  const sig = request.headers.get('stripe-signature')

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'inconnue'
    return new Response(`Signature webhook invalide : ${message}`, { status: 400 })
  }

  const admin = createAdminClient()

  switch (event.type) {
    // Paiement confirmé → commande payée + montants réels calculés par Stripe
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const orderId = session.metadata?.order_id
      if (orderId) {
        const paymentIntentId =
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : (session.payment_intent?.id ?? null)

        await admin
          .from('orders')
          .update({
            status: 'paid',
            stripe_payment_intent_id: paymentIntentId,
            subtotal: session.amount_subtotal ?? undefined, // HT réel (centimes)
            tax_amount: session.total_details?.amount_tax ?? 0, // TVA réelle
            total: session.amount_total ?? undefined, // TTC réel
          })
          .eq('id', orderId)
      }
      break
    }

    // Facture générée + payée → on enregistre les liens PDF
    case 'invoice.paid': {
      const invoice = event.data.object as Stripe.Invoice
      const orderId = invoice.metadata?.order_id
      if (orderId) {
        await admin
          .from('orders')
          .update({
            stripe_invoice_id: invoice.id,
            invoice_pdf_url: invoice.invoice_pdf, // le PDF téléchargeable
            hosted_invoice_url: invoice.hosted_invoice_url, // la page Stripe
          })
          .eq('id', orderId)
      }
      break
    }

    default:
      // autres événements ignorés
      break
  }

  // Toujours répondre 200 vite, sinon Stripe réessaie l'envoi.
  return Response.json({ received: true })
}
