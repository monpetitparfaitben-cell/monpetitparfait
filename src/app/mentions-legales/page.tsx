import Link from "next/link";
import BackButton from "@/components/ui/BackButton";

export default function MentionsLegalesPage() {
  return (
    <div style={{ backgroundColor: "#F7F5F0", minHeight: "100vh" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <BackButton href="/" />

        <h1 className="text-3xl font-bold mt-6 mb-8" style={{ color: "#18223b" }}>
          Mentions Légales
        </h1>

        <div className="space-y-6">
          <div className="rounded-2xl p-8" style={{ backgroundColor: "white" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#18223b" }}>Éditeur du site</h2>
            <div className="text-sm leading-relaxed opacity-80 space-y-2" style={{ color: "#18223b" }}>
              <p><strong style={{ opacity: 1 }}>Mon Petit Parfait</strong></p>
              <p>Email : <a href="mailto:contact@monpetitparfait.fr" style={{ color: "#e67e22" }}>contact@monpetitparfait.fr</a></p>
            </div>
          </div>

          <div className="rounded-2xl p-8" style={{ backgroundColor: "white" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#18223b" }}>Hébergement</h2>
            <div className="text-sm leading-relaxed opacity-80 space-y-2" style={{ color: "#18223b" }}>
              <p>Ce site est hébergé par Vercel Inc., 340 Pine Street, Suite 600, San Francisco, CA 94104, États-Unis.</p>
            </div>
          </div>

          <div className="rounded-2xl p-8" style={{ backgroundColor: "white" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#18223b" }}>Propriété intellectuelle</h2>
            <p className="text-sm leading-relaxed opacity-80" style={{ color: "#18223b" }}>
              L&apos;ensemble du contenu de ce site (textes, images, logos) est la propriété exclusive de Mon Petit Parfait. Toute reproduction, même partielle, est interdite sans autorisation préalable.
            </p>
          </div>

          <div className="rounded-2xl p-8" style={{ backgroundColor: "white" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#18223b" }}>Données personnelles</h2>
            <p className="text-sm leading-relaxed opacity-80" style={{ color: "#18223b" }}>
              Les données collectées via ce site sont utilisées uniquement dans le cadre de la relation commerciale entre Mon Petit Parfait et ses clients professionnels. Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Pour exercer ce droit, contactez-nous à <a href="mailto:contact@monpetitparfait.fr" style={{ color: "#e67e22" }}>contact@monpetitparfait.fr</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
