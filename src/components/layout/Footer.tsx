import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#F7F5F0", borderTop: "1px solid #e8e4dc" }}>

      {/* Newsletter */}
      <div
        className="border-b"
        style={{ borderColor: "#e8e4dc" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-1" style={{ color: "#18223b" }}>
                Restez informé de nos nouveautés
              </h3>
              <p className="text-sm opacity-60" style={{ color: "#18223b" }}>
                Offres exclusives, nouveaux produits et conseils pour vos hébergements
              </p>
            </div>
            <form className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  backgroundColor: "white",
                  border: "1.5px solid #e8e4dc",
                  color: "#18223b",
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
              <Image
                src="/logo.png"
                alt="Mon Petit Parfait"
                width={140}
                height={88}
                className="object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "#18223b", opacity: 0.6 }}>
              Spécialiste des kits et consommables pour hôtels, conciergeries et hébergements professionnels.
            </p>
          </div>

          {/* Boutique */}
          <div>
            <h4 className="font-bold mb-4 text-xs uppercase tracking-wider" style={{ color: "#18223b", opacity: 0.4 }}>
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
                    className="text-sm transition-opacity hover:opacity-100"
                    style={{ color: "#18223b", opacity: 0.6 }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h4 className="font-bold mb-4 text-xs uppercase tracking-wider" style={{ color: "#18223b", opacity: 0.4 }}>
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
                    className="text-sm transition-opacity hover:opacity-100"
                    style={{ color: "#18223b", opacity: 0.6 }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-xs uppercase tracking-wider" style={{ color: "#18223b", opacity: 0.4 }}>
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm" style={{ color: "#18223b", opacity: 0.6 }}>
                <Mail size={15} className="flex-shrink-0" />
                <a href="mailto:contact@monpetitparfait.fr" className="hover:opacity-100 transition-opacity">
                  contact@monpetitparfait.fr
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{ color: "#18223b", opacity: 0.6 }}>
                <MapPin size={15} className="flex-shrink-0 mt-0.5" />
                <span>France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: "#e8e4dc" }}
        >
          <p className="text-xs" style={{ color: "#18223b", opacity: 0.4 }}>
            © {new Date().getFullYear()} Mon Petit Parfait. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-xs" style={{ color: "#18223b", opacity: 0.4 }}>
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
