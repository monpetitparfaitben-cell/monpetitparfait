import { NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/emails";

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, company } = await req.json();
    if (!email || !firstName) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    await sendWelcomeEmail({ to: email, firstName, company: company || "" });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Erreur email bienvenue:", err);
    return NextResponse.json({ error: "Erreur envoi email" }, { status: 500 });
  }
}
