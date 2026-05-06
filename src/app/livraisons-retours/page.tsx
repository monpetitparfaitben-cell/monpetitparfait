import Link from "next/link";
import BackButton from "@/components/ui/BackButton";

export default function LivraisonsRetoursPage() {
  return (
    <div style={{ backgroundColor: "#F7F5F0", minHeight: "100vh" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <BackButton href="/" />

        <h1 className="text-3xl font-bold mt-6 mb-8" style={{ color: "#18223b" }}>
          Livraisons &amp; Retours
        </h1>

        <div className="space-y-6">
          <div className="rounded-2xl p-8" style={{ backgroundColor: "white" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#18223b" }}>Livraison</h2>
            <div className="text-sm leading-relaxed opacity-80 space-y-3" style={{ color: "#18223b" }}>
              <p>Les commandes passées avant 14h sont expédiées le jour même (jours ouvrés).</p>
              <p>Délai de livraison estimé : 48h ouvrées après expédition.</p>
              <p>Livraison disponible en France métropolitaine, Belgique, Suisse, Luxembourg et Monaco.</p>
            </div>
          </div>

          <div className="rounded-2xl p-8" style={{ backgroundColor: "white" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#18223b" }}>Retours</h2>
            <div className="text-sm leading-relaxed opacity-80 space-y-3" style={{ color: "#18223b" }}>
              <p>Pour toute demande de retour, contactez-nous à <a href="mailto:contact@monpetitparfait.fr" style={{ color: "#e67e22" }}>contact@monpetitparfait.fr</a> dans les 14 jours suivant la réception.</p>
              <p>Les produits doivent être retournés dans leur emballage d&apos;origine, non utilisés.</p>
              <p>Le remboursement sera effectué sous 5 à 10 jours ouvrés après réception du retour.</p>
            </div>
          </div>

          <div className="rounded-2xl p-8" style={{ backgroundColor: "white" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#18223b" }}>Contact</h2>
            <p className="text-sm opacity-80" style={{ color: "#18223b" }}>
              Pour toute question, contactez notre équipe :{" "}
              <a href="mailto:contact@monpetitparfait.fr" className="font-semibold" style={{ color: "#e67e22" }}>
                contact@monpetitparfait.fr
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
