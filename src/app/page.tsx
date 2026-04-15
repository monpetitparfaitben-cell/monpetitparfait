import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getFeaturedProducts, PRODUCTS, formatPrice } from "@/lib/products";
import ProductCard from "@/components/store/ProductCard";

const kits = [
  { slug: "kit-welcome-cafe", label: "Kit Welcome Café", emoji: "☕", desc: "2 cafés, thé, sucres, biscuits Lotus" },
  { slug: "kit-capsule", label: "Kit Capsule", emoji: "🫘", desc: "3 capsules café compatibles" },
  { slug: "kit-entretien", label: "Kit Entretien", emoji: "🧹", desc: "Liquide vaisselle, éponge, sacs poubelles" },
  { slug: "kit-salle-de-bain", label: "Kit Salle De Bain", emoji: "🧴", desc: "Savon, shampoing, trousse, pain de savon" },
];

const ouate = [
  { slug: "essuie-tout", label: "Essuie-tout", emoji: "🧻" },
  { slug: "papier-toilette", label: "Papier toilette", emoji: "🧻" },
  { slug: "mouchoirs-en-papier", label: "Mouchoirs en papier", emoji: "📦" },
];

const consommables = [
  { slug: "sacs-poubelle", label: "Sacs poubelles", emoji: "🗑️" },
  { slug: "tablette-vaisselle-linge", label: "Tablette vaisselle / linge", emoji: "🫧" },
  { slug: "capsules-cafe", label: "Capsules café", emoji: "☕" },
  { slug: "eponges", label: "Éponges", emoji: "🧽" },
];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div style={{ backgroundColor: "#F7F5F0" }}>

      {/* ===== HERO ===== */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#18223b" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-2xl">
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-white"
            >
              L&apos;Essentiel<br />
              <span style={{ color: "#e67e22" }}>au Quotidien</span>
            </h1>
            <p className="text-white opacity-70 text-lg md:text-xl mb-10 leading-relaxed">
              Kits d&apos;accueil et consommables pour hôtels, conciergeries<br className="hidden md:block" />
              et hébergements professionnels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/boutique"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#e67e22", color: "white" }}
              >
                Découvrir la gamme <ArrowRight size={18} />
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "white", border: "1.5px solid rgba(255,255,255,0.2)" }}
              >
                Créer un compte professionnel
              </Link>
            </div>
          </div>
        </div>
        {/* Déco */}
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-5"
          style={{ background: "radial-gradient(circle, #e67e22 0%, transparent 70%)" }} />
      </section>

      {/* ===== NOS KITS ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10" style={{ color: "#18223b" }}>
          Nos kits
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kits.map((kit) => {
            const product = PRODUCTS.find((p) => p.slug === kit.slug);
            return (
              <Link key={kit.slug} href={`/produit/${kit.slug}`} className="group">
                <div
                  className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{ backgroundColor: "white" }}
                >
                  <div
                    className="aspect-square flex items-center justify-center text-7xl"
                    style={{ backgroundColor: "#F7F5F0" }}
                  >
                    {kit.emoji}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-base mb-1" style={{ color: "#18223b" }}>
                      {kit.label}
                    </h3>
                    <p className="text-xs opacity-60 mb-3" style={{ color: "#18223b" }}>
                      {kit.desc}
                    </p>
                    {product && (
                      <p className="text-xs opacity-50" style={{ color: "#18223b" }}>
                        À partir de {formatPrice(product.price)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== PRODUITS 100% OUATE ===== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10" style={{ color: "#18223b" }}>
          Produits 100% Ouate
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {ouate.map((item) => {
            const product = PRODUCTS.find((p) => p.slug === item.slug);
            return (
              <Link key={item.slug} href={`/produit/${item.slug}`} className="group">
                <div
                  className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{ backgroundColor: "white" }}
                >
                  <div
                    className="aspect-video flex items-center justify-center text-6xl"
                    style={{ backgroundColor: "#F7F5F0" }}
                  >
                    {item.emoji}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-base mb-1" style={{ color: "#18223b" }}>
                      {item.label}
                    </h3>
                    {product && (
                      <p className="text-xs opacity-50 mt-1" style={{ color: "#18223b" }}>
                        À partir de {formatPrice(product.price)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== NOS CONSOMMABLES ===== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10" style={{ color: "#18223b" }}>
          Nos consommables
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {consommables.map((item) => {
            const product = PRODUCTS.find((p) => p.slug === item.slug);
            return (
              <Link key={item.slug} href={`/produit/${item.slug}`} className="group">
                <div
                  className="rounded-2xl p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="text-4xl mb-3">{item.emoji}</div>
                  <h3 className="font-semibold text-sm" style={{ color: "#18223b" }}>
                    {item.label}
                  </h3>
                  {product && (
                    <p className="text-xs opacity-50 mt-1" style={{ color: "#18223b" }}>
                      Dès {formatPrice(product.price)}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== BIENVENUE ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Carte principale blanche */}
          <div className="rounded-3xl p-8 md:p-10" style={{ backgroundColor: "white" }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#18223b" }}>
              Bienvenue chez Mon Petit Parfait
            </h2>
            <p className="opacity-70 leading-relaxed mb-6" style={{ color: "#18223b" }}>
              Nous créons des kits d&apos;accueil pensés pour les hôtels, les Airbnb et les locations saisonnières. Chaque kit est conçu pour offrir à vos voyageurs une expérience soignée, dès leur arrivée.
            </p>
            <h3 className="font-bold mb-4" style={{ color: "#18223b" }}>
              Pourquoi choisir Mon Petit Parfait ?
            </h3>
            <ul className="space-y-3">
              {[
                "Des produits adaptés aux besoins des voyageurs",
                "Qualité et praticité au rendez-vous",
                "Souplesse : commande au pack ou à l'unité",
                "De meilleurs avis grâce aux petits détails qui comptent",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "#18223b" }}>
                  <Check size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#e67e22" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Carte sombre livraison */}
          <div className="rounded-3xl p-8 md:p-10 flex flex-col justify-center" style={{ backgroundColor: "#18223b" }}>
            <h3 className="text-xl font-bold text-white mb-6">Livraison et service</h3>
            <ul className="space-y-4">
              {[
                { icon: "🚚", text: "Livraison offerte sans minimum d'achat" },
                { icon: "🔒", text: "Paiement 100% sécurisé" },
                { icon: "⚡", text: "Expédition le jour même avant 14h" },
                { icon: "🤝", text: "Tarifs négociés pour les gros volumes" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-white">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm opacity-80">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== À PROPOS ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "#18223b" }}>
            À propos de Mon Petit Parfait
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏠",
                title: "La Vraie Vie",
                text: "Nos kits sont pensés pour le quotidien réel des voyageurs. Rien de superflu, tout l'essentiel — bien présenté.",
              },
              {
                icon: "⚡",
                title: "Flexibilité",
                text: "Commandez à l'unité ou au pack selon vos besoins. Nos gammes s'adaptent à tous les volumes, des petites structures aux grandes chaînes.",
              },
              {
                icon: "🎯",
                title: "Objectif Simple",
                text: "Offrir à vos voyageurs une expérience mémorable dès la première seconde, grâce aux petits détails qui font la différence.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl p-8 text-center"
                style={{ backgroundColor: "white" }}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="font-bold text-lg mb-3" style={{ color: "#18223b" }}>
                  {card.title}
                </h3>
                <p className="text-sm opacity-70 leading-relaxed" style={{ color: "#18223b" }}>
                  {card.text}
                </p>
              </div>
            ))}
          </div>
          <p
            className="text-center mt-10 text-lg font-medium italic opacity-60"
            style={{ color: "#18223b" }}
          >
            &ldquo;Mon Petit Parfait, c&apos;est l&apos;art de bien accueillir, tout simplement.&rdquo;
          </p>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div
          className="rounded-3xl p-10 md:p-16 text-center"
          style={{ backgroundColor: "#e67e22" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à sublimer l&apos;accueil de vos clients ?
          </h2>
          <p className="text-white opacity-80 text-lg mb-8 max-w-xl mx-auto">
            Créez votre compte professionnel et découvrez vos tarifs personnalisés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold bg-white transition-opacity hover:opacity-90"
              style={{ color: "#e67e22" }}
            >
              Créer mon compte <ArrowRight size={18} />
            </Link>
            <Link
              href="/boutique"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white transition-all"
              style={{ border: "2px solid rgba(255,255,255,0.5)" }}
            >
              Voir la boutique
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
