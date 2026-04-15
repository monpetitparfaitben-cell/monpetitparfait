import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseAdmin } from "@/lib/supabase";
import { PRODUCTS } from "@/lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

interface CartItemInput {
  productId: string;
  variantId: string;
  name: string;
  quantity: number;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { items, customerInfo, userId } = await req.json() as {
      items: CartItemInput[];
      customerInfo: CustomerInfo;
      userId?: string;
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    // ============================================================
    // VÉRIFICATION DES PRIX CÔTÉ SERVEUR (sécurité B2B)
    // On ne fait jamais confiance aux prix envoyés par le client
    // ============================================================

    // Charger les prix contractuels si l'utilisateur est identifié
    let contractPriceMap: Record<string, number> = {};
    if (userId) {
      const adminSupabase = createSupabaseAdmin();
      const { data: contractPrices } = await adminSupabase.rpc(
        "get_user_contract_prices",
        { p_user_id: userId }
      );
      if (contractPrices) {
        contractPrices.forEach((p: { variant_id: string; custom_price: number }) => {
          contractPriceMap[p.variant_id] = p.custom_price;
        });
      }
    }

    // Construire les line items avec prix VÉRIFIÉS serveur
    const lineItems = items.map((item: CartItemInput) => {
      // Trouver le produit et la variante dans notre catalogue
      const product = PRODUCTS.find((p) => p.id === item.productId);
      const variant = product?.variants.find((v) => v.id === item.variantId);

      if (!product || !variant) {
        throw new Error(`Produit introuvable: ${item.productId}`);
      }

      // Prix résolu : contractuel si disponible, sinon catalogue
      const verifiedPrice = contractPriceMap[item.variantId] ?? variant.price;

      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: `${product.name} — ${variant.name}`,
          },
          unit_amount: verifiedPrice,
        },
        quantity: item.quantity,
      };
    });

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      customer_email: customerInfo.email,
      locale: "fr",
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH", "LU", "MC"],
      },
      metadata: {
        user_id: userId ?? "",
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        phone: customerInfo.phone,
        company: customerInfo.company ?? "",
        notes: customerInfo.notes ?? "",
        had_contract_prices: Object.keys(contractPriceMap).length > 0 ? "true" : "false",
      },
      payment_intent_data: {
        metadata: {
          customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          customer_email: customerInfo.email,
        },
      },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err: unknown) {
    console.error("Stripe checkout error:", err);
    const message = err instanceof Error ? err.message : "Erreur lors de la création du paiement";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
