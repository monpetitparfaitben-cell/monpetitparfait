import { NextResponse } from "next/server";
import { sendOrderConfirmation, sendNewOrderAlert } from "@/lib/emails";

// Route temporaire pour tester les emails — à supprimer après vérification
export async function GET() {
  const testItems = [
    { name: "Capsule café", variant: "500 pcs", quantity: 2, unitPrice: 4500 },
    { name: "Sac poubelle 30L", variant: "200 pcs", quantity: 1, unitPrice: 3200 },
  ];

  try {
    await sendOrderConfirmation({
      to: "ouazanab@gmail.com",
      customerName: "Test Client",
      orderId: "test-order-1234",
      items: testItems,
      total: 12200,
    });

    await sendNewOrderAlert({
      to: "ouazanab@gmail.com",
      orderId: "test-order-1234",
      customerName: "Test Client",
      company: "Hôtel Test",
      total: 12200,
      items: testItems,
    });

    return NextResponse.json({ ok: true, message: "Emails envoyés à ouazanab@gmail.com" });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
