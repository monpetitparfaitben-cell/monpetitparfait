import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Mon Petit Parfait <contact@monpetitparfait.fr>";

// ─── Email confirmation de commande ────────────────────────────────────────
export async function sendOrderConfirmation(params: {
  to: string;
  customerName: string;
  orderId: string;
  items: Array<{ name: string; variant: string; quantity: number; unitPrice: number }>;
  total: number;
}) {
  const { to, customerName, orderId, items, total } = params;
  const ref = orderId.slice(0, 8).toUpperCase();

  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 0; border-bottom:1px solid #ede9e0; color:#18223b; font-size:14px;">
          ${item.name} — ${item.variant}
        </td>
        <td style="padding:10px 0; border-bottom:1px solid #ede9e0; text-align:center; color:#18223b; font-size:14px;">
          ${item.quantity}
        </td>
        <td style="padding:10px 0; border-bottom:1px solid #ede9e0; text-align:right; color:#18223b; font-size:14px; font-weight:600;">
          ${formatEur(item.unitPrice * item.quantity)}
        </td>
      </tr>`
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Confirmation de commande</title></head>
<body style="margin:0;padding:0;background:#F7F5F0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#F7F5F0;">

    <!-- Header -->
    <div style="background:#18223b;padding:32px 40px;border-radius:16px 16px 0 0;text-align:center;">
      <h1 style="margin:0;color:white;font-size:22px;font-weight:800;letter-spacing:-0.5px;">
        mon petit <span style="color:#e67e22;">parfait</span>
      </h1>
    </div>

    <!-- Body -->
    <div style="background:white;padding:40px;">
      <h2 style="margin:0 0 8px;color:#18223b;font-size:24px;font-weight:700;">Commande confirmée ! 🎉</h2>
      <p style="margin:0 0 24px;color:#18223b;opacity:.7;font-size:15px;">
        Bonjour ${customerName}, votre commande a bien été enregistrée.
      </p>

      <!-- Référence -->
      <div style="background:#F7F5F0;border-radius:12px;padding:16px 20px;margin-bottom:28px;">
        <p style="margin:0;color:#18223b;font-size:13px;opacity:.6;">Référence commande</p>
        <p style="margin:4px 0 0;color:#18223b;font-size:18px;font-weight:700;font-family:monospace;">#${ref}</p>
      </div>

      <!-- Articles -->
      <h3 style="margin:0 0 12px;color:#18223b;font-size:15px;font-weight:700;">Votre commande</h3>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#18223b;opacity:.5;padding-bottom:8px;">Produit</th>
            <th style="text-align:center;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#18223b;opacity:.5;padding-bottom:8px;">Qté</th>
            <th style="text-align:right;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#18223b;opacity:.5;padding-bottom:8px;">Prix</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>

      <!-- Total -->
      <div style="background:#18223b;border-radius:12px;padding:16px 20px;margin-top:20px;display:flex;justify-content:space-between;align-items:center;">
        <span style="color:white;font-size:15px;font-weight:600;">Total TTC</span>
        <span style="color:#e67e22;font-size:20px;font-weight:800;">${formatEur(total)}</span>
      </div>

      <!-- Livraison -->
      <div style="margin-top:28px;padding:20px;border:2px solid #ede9e0;border-radius:12px;">
        <h3 style="margin:0 0 12px;color:#18223b;font-size:15px;font-weight:700;">🚚 Livraison</h3>
        <p style="margin:0;color:#18223b;font-size:14px;line-height:1.6;opacity:.8;">
          Votre commande sera expédiée sous 24h (commandes passées avant 14h expédiées le jour même).
          Livraison en 48h ouvrées. <strong>Livraison offerte !</strong>
        </p>
      </div>

      <!-- Prochaines étapes -->
      <div style="margin-top:20px;padding:20px;border:2px solid #ede9e0;border-radius:12px;">
        <h3 style="margin:0 0 12px;color:#18223b;font-size:15px;font-weight:700;">📞 Prochaines étapes</h3>
        <p style="margin:0;color:#18223b;font-size:14px;line-height:1.6;opacity:.8;">
          Notre équipe vous contactera sous 24h pour confirmer les modalités de livraison et de paiement.
        </p>
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin-top:32px;">
        <a href="https://monpetitparfait.fr/compte/commandes"
          style="display:inline-block;background:#e67e22;color:white;padding:14px 32px;border-radius:12px;font-weight:700;font-size:15px;text-decoration:none;">
          Voir mes commandes
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:24px 40px;text-align:center;">
      <p style="margin:0;color:#18223b;font-size:12px;opacity:.5;">
        © ${new Date().getFullYear()} Mon Petit Parfait · <a href="mailto:contact@monpetitparfait.fr" style="color:#e67e22;text-decoration:none;">contact@monpetitparfait.fr</a>
      </p>
    </div>
  </div>
</body>
</html>`;

  return resend.emails.send({
    from: FROM,
    to,
    subject: `✅ Commande confirmée #${ref} — Mon Petit Parfait`,
    html,
  });
}

// ─── Email bienvenue nouveau compte ───────────────────────────────────────
export async function sendWelcomeEmail(params: {
  to: string;
  firstName: string;
  company: string;
}) {
  const { to, firstName, company } = params;

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><title>Bienvenue</title></head>
<body style="margin:0;padding:0;background:#F7F5F0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#F7F5F0;">

    <div style="background:#18223b;padding:32px 40px;border-radius:16px 16px 0 0;text-align:center;">
      <h1 style="margin:0;color:white;font-size:22px;font-weight:800;">
        mon petit <span style="color:#e67e22;">parfait</span>
      </h1>
    </div>

    <div style="background:white;padding:40px;">
      <h2 style="margin:0 0 16px;color:#18223b;font-size:22px;font-weight:700;">Bienvenue, ${firstName} ! 👋</h2>
      <p style="color:#18223b;opacity:.8;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Votre demande de compte professionnel pour <strong>${company}</strong> a bien été reçue.
      </p>
      <p style="color:#18223b;opacity:.8;font-size:15px;line-height:1.7;margin:0 0 28px;">
        Notre équipe va valider votre compte sous 24h et vous contacter pour établir vos <strong>tarifs personnalisés</strong>.
      </p>

      <div style="background:#F7F5F0;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 12px;color:#18223b;font-size:14px;font-weight:700;">En attendant, vous pourrez :</p>
        <ul style="margin:0;padding-left:20px;color:#18223b;font-size:14px;line-height:1.8;opacity:.8;">
          <li>Parcourir notre catalogue de kits et consommables</li>
          <li>Découvrir nos formules B2B et tarifs de volume</li>
          <li>Accéder à votre espace client dès validation</li>
        </ul>
      </div>

      <div style="text-align:center;">
        <a href="https://monpetitparfait.fr/boutique"
          style="display:inline-block;background:#e67e22;color:white;padding:14px 32px;border-radius:12px;font-weight:700;font-size:15px;text-decoration:none;">
          Découvrir la boutique
        </a>
      </div>
    </div>

    <div style="padding:24px 40px;text-align:center;">
      <p style="margin:0;color:#18223b;font-size:12px;opacity:.5;">
        © ${new Date().getFullYear()} Mon Petit Parfait · <a href="mailto:contact@monpetitparfait.fr" style="color:#e67e22;text-decoration:none;">contact@monpetitparfait.fr</a>
      </p>
    </div>
  </div>
</body>
</html>`;

  return resend.emails.send({
    from: FROM,
    to,
    subject: "Bienvenue chez Mon Petit Parfait 🎉",
    html,
  });
}

function formatEur(cents: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(cents / 100);
}
