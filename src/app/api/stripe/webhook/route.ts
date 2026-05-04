import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === "sk_test_...") {
    return NextResponse.json({ error: "Stripe non configuré" }, { status: 503 });
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-03-25.dahlia",
  });

  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook error";
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    console.log("✅ Paiement réussi:", session.id);

    try {
      const supabase = createSupabaseAdmin();
      const metadata = session.metadata || {};
      const shipping = session.shipping_details?.address || {};

      // Récupérer les line items de la session Stripe
      const lineItemsResult = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 100,
        expand: ["data.price.product"],
      });

      // Calculer le total en centimes
      const total = session.amount_total ?? 0;
      const subtotal = session.amount_subtotal ?? total;

      // Créer la commande dans Supabase
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: metadata.user_id || null,
          status: "paid",
          stripe_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent ?? null,
          shipping_first_name: metadata.firstName || "",
          shipping_last_name: metadata.lastName || "",
          shipping_email: session.customer_email || "",
          shipping_phone: metadata.phone || "",
          shipping_company: metadata.company || "",
          shipping_address: shipping.line1 || "",
          shipping_address2: shipping.line2 || "",
          shipping_city: shipping.city || "",
          shipping_postal_code: shipping.postal_code || "",
          shipping_country: shipping.country || "FR",
          subtotal,
          shipping_cost: 0,
          total,
          notes: metadata.notes || "",
        })
        .select()
        .single();

      if (orderError || !order) {
        console.error("Erreur création commande:", orderError);
        return NextResponse.json({ error: "Erreur DB" }, { status: 500 });
      }

      // Créer les order_items
      const orderItems = lineItemsResult.data.map((item: any) => {
        const productData = item.price?.product;
        const fullName: string = productData?.name ?? item.description ?? "Produit";
        // Format attendu: "Nom produit — Variante"
        const parts = fullName.split(" — ");
        const productName = parts[0] ?? fullName;
        const variantName = parts[1] ?? "Standard";

        return {
          order_id: order.id,
          product_id: productData?.metadata?.product_id ?? "",
          product_name: productName,
          variant_id: productData?.metadata?.variant_id ?? "",
          variant_name: variantName,
          quantity: item.quantity ?? 1,
          unit_price: item.price?.unit_amount ?? 0,
          total_price: (item.price?.unit_amount ?? 0) * (item.quantity ?? 1),
          was_contract_price: false,
        };
      });

      if (orderItems.length > 0) {
        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(orderItems);

        if (itemsError) {
          console.error("Erreur création order_items:", itemsError);
        }
      }

      console.log("✅ Commande enregistrée:", order.id);
    } catch (err) {
      console.error("Erreur traitement webhook:", err);
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    console.log("❌ Paiement échoué:", event.data.object.id);
  }

  return NextResponse.json({ received: true });
}
