import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";
import { PRODUCTS } from "@/lib/products";
import { sendOrderConfirmation, sendNewOrderAlert } from "@/lib/emails";

export async function POST(req: NextRequest) {
  try {
    const { items, customerInfo, userId } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const adminSupabase = createSupabaseAdmin();

    // Récupérer les prix contractuels si connecté
    let contractPriceMap: Record<string, number> = {};
    let contractId: string | null = null;

    if (userId) {
      const { data: contractPrices } = await adminSupabase.rpc(
        "get_user_contract_prices",
        { p_user_id: userId }
      );
      if (contractPrices) {
        contractPrices.forEach((p: { variant_id: string; custom_price: number }) => {
          contractPriceMap[p.variant_id] = p.custom_price;
        });
      }

      // Récupérer l'ID du contrat actif
      const today = new Date().toISOString().split("T")[0];
      const { data: contract } = await adminSupabase
        .from("contracts")
        .select("id")
        .eq("user_id", userId)
        .eq("is_active", true)
        .or(`valid_to.is.null,valid_to.gte.${today}`)
        .limit(1)
        .maybeSingle();

      if (contract) contractId = contract.id;
    }

    // Calculer les totaux avec prix vérifiés
    let subtotal = 0;
    const resolvedItems = items.map((item: {
      productId: string;
      variantId: string;
      quantity: number;
    }) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      const variant = product?.variants.find((v) => v.id === item.variantId);
      if (!product || !variant) throw new Error(`Produit introuvable: ${item.productId}`);

      const unitPrice = contractPriceMap[item.variantId] ?? variant.price;
      const totalPrice = unitPrice * item.quantity;
      subtotal += totalPrice;

      return {
        product_id: product.id,
        product_name: product.name,
        variant_id: variant.id,
        variant_name: variant.name,
        sku: variant.sku,
        quantity: item.quantity,
        unit_price: unitPrice,
        total_price: totalPrice,
        was_contract_price: contractPriceMap[item.variantId] !== undefined,
      };
    });

    // Créer la commande
    const { data: order, error: orderError } = await adminSupabase
      .from("orders")
      .insert({
        user_id: userId ?? null,
        contract_id: contractId,
        status: "pending",
        shipping_first_name: customerInfo.firstName,
        shipping_last_name: customerInfo.lastName,
        shipping_email: customerInfo.email,
        shipping_phone: customerInfo.phone,
        shipping_company: customerInfo.company ?? null,
        shipping_address: customerInfo.address,
        shipping_address2: customerInfo.address2 ?? null,
        shipping_city: customerInfo.city,
        shipping_postal_code: customerInfo.postalCode,
        shipping_country: customerInfo.country ?? "FR",
        notes: customerInfo.notes ?? null,
        subtotal,
        shipping_cost: 0,
        total: subtotal,
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error("Erreur création commande:", orderError);
      return NextResponse.json({ error: "Erreur lors de la création de la commande" }, { status: 500 });
    }

    // Insérer les articles
    const { error: itemsError } = await adminSupabase
      .from("order_items")
      .insert(resolvedItems.map((item: typeof resolvedItems[0]) => ({
        ...item,
        order_id: order.id,
      })));

    if (itemsError) {
      console.error("Erreur insertion articles:", itemsError);
      // Supprimer la commande si les articles n'ont pas pu être insérés
      await adminSupabase.from("orders").delete().eq("id", order.id);
      return NextResponse.json({ error: "Erreur lors de l'enregistrement des articles" }, { status: 500 });
    }

    // Envoyer emails (silencieux si erreur)
    if (process.env.RESEND_API_KEY) {
      // Email de confirmation au client
      sendOrderConfirmation({
        to: customerInfo.email,
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        orderId: order.id,
        items: resolvedItems.map((item: typeof resolvedItems[0]) => ({
          name: item.product_name,
          variant: item.variant_name,
          quantity: item.quantity,
          unitPrice: item.unit_price,
        })),
        total: subtotal,
      }).catch((e) => console.error("Email confirmation non envoyé:", e));

      // Email d'alerte à l'admin
      sendNewOrderAlert({
        to: "ouazanab@gmail.com",
        orderId: order.id,
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        company: customerInfo.company || "N/A",
        total: subtotal,
        items: resolvedItems.map((item: typeof resolvedItems[0]) => ({
          name: item.product_name,
          variant: item.variant_name,
          quantity: item.quantity,
        })),
      }).catch((e) => console.error("Email alerte non envoyé:", e));
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      total: subtotal,
    });

  } catch (err: unknown) {
    console.error("Erreur commande:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur serveur" },
      { status: 500 }
    );
  }
}
