// Stripe est initialisé uniquement à la demande (import dynamique dans les routes)
// Ce fichier contient uniquement les utilitaires de formatage

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount / 100);
}
