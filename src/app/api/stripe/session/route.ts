import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "session_id manquant" }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe non configuré" }, { status: 503 });
  }

  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-03-25.dahlia",
    });

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"],
    });

    const items = (session.line_items?.data ?? []).map((item: any) => {
      const product = item.price?.product;
      const fullName: string = product?.name ?? item.description ?? "Produit";
      const parts = fullName.split(" — ");
      return {
        name: parts[0] ?? fullName,
        variant: parts[1] ?? "",
        quantity: item.quantity ?? 1,
        unitPrice: item.price?.unit_amount ?? 0,
        total: (item.price?.unit_amount ?? 0) * (item.quantity ?? 1),
      };
    });

    return NextResponse.json({
      customerName: session.metadata?.firstName
        ? `${session.metadata.firstName} ${session.metadata.lastName ?? ""}`.trim()
        : session.customer_details?.name ?? "Client",
      email: session.customer_email ?? "",
      total: session.amount_total ?? 0,
      items,
    });
  } catch (err) {
    console.error("Erreur récupération session:", err);
    return NextResponse.json({ error: "Session introuvable" }, { status: 404 });
  }
}
