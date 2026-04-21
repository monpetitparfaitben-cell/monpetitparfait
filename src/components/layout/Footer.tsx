import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#18223b", color: "white" }}>
      {/* Newsletter */}
      <div
        className="border-b"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-1">
                Restez informé de nos nouveautés
              </h3>
              <p className="text-sm opacity-70">
                Offres exclusives, nouveaux produits et conseils pour vos hébergements
              </p>
            </div>
            <form className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                }}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#e67e22" }}
              >
                S&apos;inscrire
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="block mb-4">
              <span className="text-xl font-bold">
                mon petit <span style={{ color: "#e67e22" }}>parfait</span>
              </span>
            </Link>
            <p className="text-sm opacity-70 leading-relaxed mb-6">
              Spécialiste des kits et consommables pour hôtels, conciergeries et hébergements professionnels.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-opacity hover:opacity-70"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                aria-label="Instagram"
              >
                <ExternalLink size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-opacity hover:opacity-70"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                aria-label="Facebook"
              >
                <Share2 size={18} />
              </a>
            </div>
          </div>

          {/* Boutique */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-50">
              Boutique
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/boutique?category=kits", label: "Nos Kits" },
                { href: "/boutique?category=ouate", label: "Produits 100% Ouate" },
                { href: "/boutique?category=consommables", label: "Consommables" },
                { href: "/boutique", label: "Tout voir" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-50">
              Informations
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/livraisons-retours", label: "Livraisons & Retours" },
                { href: "/cgv", label: "Conditions Générales de Vente" },
                { href: "/mentions-legales", label: "Mentions Légales" },
                { href: "/contact", label: "Nous Contacter" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-50">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm opacity-70">
                <Mail size={15} className="flex-shrink-0" />
                <a href="mailto:contact@monpetitparfait.fr" className="hover:opacity-100 transition-opacity">
                  contact@monpetitparfait.fr
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-70">
                <Phone size={15} className="flex-shrink-0" />
                <a href="mailto:contact@monpetitparfait.fr" className="hover:opacity-100 transition-opacity">
                  Nous contacter par email
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm opacity-70">
                <MapPin size={15} className="flex-shrink-0 mt-0.5" />
                <span>France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p className="text-xs opacity-50">
            © {new Date().getFullYear()} Mon Petit Parfait. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-xs opacity-50">
            <span>Paiement sécurisé</span>
            <span>·</span>
            <span>🔒 SSL</span>
            <span>·</span>
            <span>Visa · Mastercard · CB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
