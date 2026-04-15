import Link from "next/link";
import { ArrowRight, Star, Truck, Shield, Clock } from "lucide-react";
import { getFeaturedProducts, PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/store/ProductCard";

const categoryCards = [
  {
    id: "kits",
    emoji: "🎁",
    title: "Nos Kits",
    subtitle: "Tout-en-un",
    description: "Kits café, salle de bain, entretien — tout prêt pour vos hébergements",
    href: "/boutique?category=kits",
    bg: "#18223b",
    color: "white",
  },
  {
    id: "ouate",
    emoji: "🧻",
    title: "100% Ouate",
    subtitle: "Premium",
    description: "Papier toilette, essuie-tout et mouchoirs certifiés FSC®",
    href: "/boutique?category=ouate",
    bg: "#e67e22",
    color: "white",
  },
  {
    id: "consommables",
    emoji: "☕",
    title: "Consommables",
    subtitle: "Quotidien",
    description: "Capsules café, sacs poubelle, tablettes vaisselle et éponges",
    href: "/boutique?category=consommables",
    bg: "#ede9e0",
    color: "#18223b",
  },
];

const features = [
  {
    icon: Truck,
    title: "Livraison offerte",
    description: "Sans minimum d'achat, partout en France",
  },
  {
    icon: Clock,
    title: "Expédition rapide",
    description: "Commandez avant 14h, expédié le jour même",
  },
  {
    icon: Shield,
    title: "Qualité garantie",
    description: "Produits sélectionnés pour les professionnels",
  },
  {
    icon: Star,
    title: "Sur-mesure B2B",
    description: "Tarifs dégressifs selon les volumes commandés",
  },
];

const testimonials = [
  {
    name: "Marie-Claire D.",
    role: "Gérante Airbnb, Paris",
    text: "Les kits salle de bain sont parfaits pour mes appartements. Mes clients adorent et les commandes sont toujours livrées rapidement.",
    rating: 5,
  },
  {
    name: "Laurent B.",
    role: "Responsable conciergerie, Lyon",
    text: "Je gère une vingtaine de logements et Mon Petit Parfait m'a simplifié la vie. Qualité excellente, livraison fiable.",
    rating: 5,
  },
  {
    name: "Sophie M.",
    role: "Hôtel 3★, Nice",
    text: "Le kit welcome café est un vrai plus pour nos chambres. Les clients le mentionnent systématiquement dans leurs avis.",
    rating: 5,
  },
];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div style={{ backgroundColor: "#F7F5F0" }}>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ backgroundColor: "#ede9e0", color: "#18223b" }}>
              <span>⭐</span>
              <span>Spécialiste B2B pour l&apos;hôtellerie</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: "#18223b" }}>
              Les petits détails qui font{" "}
              <span style={{ color: "#e67e22" }}>toute la différence</span>
            </h1>

            <p className="text-lg md:text-xl opacity-70 mb-8 leading-relaxed"
              style={{ color: "#18223b" }}>
              Kits d&apos;accueil, consommables et produits essentiels pour hôtels,
              conciergeries et hébergements professionnels. Livraison offerte, sans minimum.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/boutique"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#18223b" }}
              >
                Découvrir la boutique
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/boutique?category=kits"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all hover:shadow-md"
                style={{
                  backgroundColor: "white",
                  color: "#18223b",
                  border: "2px solid #ede9e0",
                }}
              >
                Voir nos kits
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {[
                { value: "500+", label: "Clients professionnels" },
                { value: "12", label: "Produits disponibles" },
                { value: "48h", label: "Délai de livraison" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold" style={{ color: "#18223b" }}>
                    {stat.value}
                  </p>
                  <p className="text-xs opacity-60" style={{ color: "#18223b" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Décoration */}
        <div
          className="absolute -right-20 top-10 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: "#e67e22" }}
        />
        <div
          className="absolute right-40 bottom-0 w-40 h-40 rounded-full opacity-10 blur-2xl"
          style={{ backgroundColor: "#18223b" }}
        />
      </section>

      {/* ===== CATÉGORIES ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categoryCards.map((cat) => (
            <Link key={cat.id} href={cat.href} className="group">
              <div
                className="rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ backgroundColor: cat.bg, color: cat.color }}
              >
                <div className="text-4xl mb-4">{cat.emoji}</div>
                <div className="text-xs font-semibold uppercase tracking-widest mb-1 opacity-60">
                  {cat.subtitle}
                </div>
                <h2 className="text-2xl font-bold mb-3">{cat.title}</h2>
                <p className="text-sm opacity-80 leading-relaxed mb-6">
                  {cat.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  Voir les produits <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== PRODUITS VEDETTES ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider mb-2 opacity-50" style={{ color: "#18223b" }}>
              Nos meilleurs
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#18223b" }}>
              Produits Populaires
            </h2>
          </div>
          <Link
            href="/boutique"
            className="hidden md:flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: "#e67e22" }}
          >
            Voir tout <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
            style={{ backgroundColor: "#e67e22" }}
          >
            Voir tous les produits <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ===== AVANTAGES ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-3xl p-8 md:p-12"
            style={{ backgroundColor: "#18223b" }}
          >
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest opacity-50 text-white mb-2">
                Pourquoi nous choisir
              </p>
              <h2 className="text-3xl font-bold text-white">
                Conçu pour les professionnels
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="text-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "#e67e22" }}
                  >
                    <feature.icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white opacity-60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TÉMOIGNAGES ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-wider mb-2 opacity-50" style={{ color: "#18223b" }}>
            Avis clients
          </p>
          <h2 className="text-3xl font-bold" style={{ color: "#18223b" }}>
            Ils nous font confiance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl p-6"
              style={{ backgroundColor: "white" }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="#e67e22" stroke="none" />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-4 opacity-80" style={{ color: "#18223b" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="font-bold text-sm" style={{ color: "#18223b" }}>
                  {t.name}
                </p>
                <p className="text-xs opacity-60" style={{ color: "#18223b" }}>
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div
          className="rounded-3xl p-10 md:p-16 text-center"
          style={{ backgroundColor: "#e67e22" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à simplifier la gestion de vos hébergements ?
          </h2>
          <p className="text-white opacity-80 text-lg mb-8 max-w-xl mx-auto">
            Commandez dès maintenant et recevez votre première livraison en 48h.
            Livraison gratuite, sans minimum d&apos;achat.
          </p>
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold bg-white transition-opacity hover:opacity-90"
            style={{ color: "#e67e22" }}
          >
            Commander maintenant <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
