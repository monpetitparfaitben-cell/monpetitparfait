import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PRODUCTS, formatPrice } from "@/lib/products";
import HeroCarousel from "@/components/home/HeroCarousel";

const IMG = "/images/products";

const kits = [
  {
    href: "/boutique?subcategory=Kit+Salle+de+Bains",
    slug: "kit-salle-de-bains",
    label: "Kit Salle de Bains",
    desc: "Savon 30ml, shampoing 30ml, vanity kit, savonnette — prêt à déposer",
    img: "/images/hero/kit-sdb.jpg",
  },
  {
    href: "/boutique?subcategory=Kit+Capsule+Caf%C3%A9",
    slug: "kit-capsule-cafe",
    label: "Kit Capsule Café",
    desc: "3 capsules de café compatibles, prêtes à l'emploi",
    img: "/images/hero/kit-cafe.jpg",
  },
  {
    href: "/boutique?subcategory=Kit+Gourmand",
    slug: "kit-gourmand-formule-1",
    label: "Kit Gourmand",
    desc: "2 cafés solubles, 1 thé vert, 1 thé noir, 2 sucres, 2 touillettes, 2 biscuits Lotus",
    img: "/images/hero/kit-welcome.jpg",
  },
  {
    href: "/boutique?subcategory=Kit+Entretien",
    slug: "kit-entretien-formule-1",
    label: "Kit Entretien",
    desc: "Liquide vaisselle, éponge, sacs poubelles petit et grand format",
    img: "/images/hero/kit-entretien.jpg",
  },
];

const ouate = [
  { href: "/boutique?subcategory=Essuie-tout", slug: "essuie-tout-gamme-1", label: "Essuie-tout", img: `${IMG}/essuie%20tout%20fond%20bland.jpg` },
  { href: "/boutique?subcategory=Papier+toilette", slug: "papier-toilette-gamme-1", label: "Papier toilette", img: "/images/produits/kit-toilette.jpg" },
];

const consommables = [
  { href: "/boutique?subcategory=Sac+poubelle", slug: "sac-poubelle-10l-blanc", label: "Sacs poubelles", img: `${IMG}/PHOTO-2026-02-03-09-37-47-removebg-preview.png` },
  { href: "/boutique?subcategory=Tablette", slug: "tablette-lave-vaisselle", label: "Tablettes", img: `${IMG}/PHOTO-2026-02-03-09-51-51-removebg-preview.png` },
  { href: "/boutique?subcategory=Capsule+caf%C3%A9", slug: "capsule-cafe-aluminium", label: "Capsules café", img: `${IMG}/capsule%20fond%20blanc.jpg` },
  { href: "/boutique?subcategory=%C3%89ponge", slug: "eponge-standard", label: "Éponges", img: `${IMG}/PHOTO-2026-02-03-14-59-07.jpg` },
];

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "#F7F5F0" }}>

      {/* ===== HERO ===== */}
      <HeroCarousel />

      {/* ===== NOS KITS ===== */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "#18223b" }}>
          Nos kits
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kits.map((kit) => {
            const product = PRODUCTS.find((p) => p.slug === kit.slug);
            return (
              <Link key={kit.slug} href={kit.href} className="group h-full">
                <div
                  className="rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 h-full flex flex-col"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="aspect-square relative overflow-hidden flex-shrink-0" style={{ backgroundColor: "#F7F5F0" }}>
                    <Image
                      src={kit.img}
                      alt={kit.label}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                    <h3 className="font-bold text-sm mb-1" style={{ color: "#18223b" }}>
                      {kit.label}
                    </h3>
                    <p className="text-xs opacity-60 mb-2 line-clamp-2" style={{ color: "#18223b" }}>
                      {kit.desc}
                    </p>
                    {product && (
                      <p className="text-xs font-medium mt-auto" style={{ color: "#e67e22" }}>
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
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "#18223b" }}>
          Produits 100% Ouate
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {ouate.map((item) => {
            const product = PRODUCTS.find((p) => p.slug === item.slug);
            return (
              <Link key={item.slug} href={item.href} className="group">
                <div
                  className="rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="aspect-video relative overflow-hidden" style={{ backgroundColor: "#F7F5F0" }}>
                    <Image
                      src={item.img}
                      alt={item.label}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm mb-1" style={{ color: "#18223b" }}>
                      {item.label}
                    </h3>
                    {product && (
                      <p className="text-xs font-medium" style={{ color: "#e67e22" }}>
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
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "#18223b" }}>
          Nos consommables
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {consommables.map((item) => {
            const product = PRODUCTS.find((p) => p.slug === item.slug);
            return (
              <Link key={item.slug} href={item.href} className="group">
                <div
                  className="rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="aspect-square relative overflow-hidden" style={{ backgroundColor: "#F7F5F0" }}>
                    <Image
                      src={item.img}
                      alt={item.label}
                      fill
                      className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-semibold text-sm" style={{ color: "#18223b" }}>
                      {item.label}
                    </h3>
                    {product && (
                      <p className="text-xs mt-0.5 font-medium" style={{ color: "#e67e22" }}>
                        Dès {formatPrice(product.price)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== BIENVENUE ===== */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3 inline-block relative" style={{ color: "#18223b" }}>
              Bienvenue chez Mon Petit Parfait
              <span className="block w-12 h-1 rounded-full mt-2 mx-auto" style={{ backgroundColor: "#e67e22" }} />
            </h2>
            <p className="text-sm leading-relaxed mb-3 opacity-90" style={{ color: "#18223b" }}>
              Offrez à vos voyageurs une expérience inoubliable dès leur arrivée. Nous proposons des kits de bienvenue pensés pour les hôtels, Airbnb et locations saisonnières, ainsi que tous les essentiels du quotidien.
            </p>
            <p className="text-sm leading-relaxed opacity-90" style={{ color: "#18223b" }}>
              <strong>Notre expertise ?</strong> Allier praticité, qualité et convivialité pour un accueil parfait à chaque séjour.
            </p>
          </div>

          <div className="relative flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-0">
            <div
              className="rounded-2xl p-6 lg:w-8/12 lg:-mr-8 relative z-10"
              style={{ backgroundColor: "white", boxShadow: "0 10px 30px rgba(24,34,59,0.08)" }}
            >
              <h3 className="text-base font-bold mb-5" style={{ color: "#18223b" }}>
                Pourquoi choisir Mon Petit Parfait ?
              </h3>
              <ul className="space-y-3">
                {[
                  { bold: "Produits adaptés aux besoins réels des voyageurs", rest: " — pensés pour les hôtels et locations courte durée." },
                  { bold: "Qualité et praticité", rest: " — des articles utiles pour le quotidien et l'accueil." },
                  { bold: "Flexibilité", rest: " — packs complets ou produits individuels selon votre stratégie." },
                  { bold: "Un accueil réussi = de meilleures évaluations", rest: " — des petits détails qui font la différence." },
                ].map((item) => (
                  <li key={item.bold} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "#18223b" }}>
                    <span className="flex-shrink-0 font-bold leading-none mt-0.5" style={{ color: "#e67e22" }}>•</span>
                    <span><strong>{item.bold}</strong>{item.rest}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-2xl p-6 lg:w-5/12 lg:mt-8 lg:-ml-4 relative z-20"
              style={{ backgroundColor: "#18223b", boxShadow: "0 10px 25px rgba(24,34,59,0.15)" }}
            >
              <h3 className="text-base font-bold text-white mb-5">Livraison et service</h3>
              <ul className="space-y-4">
                {[
                  { bold: "Livraison offerte", rest: " sans minimum d'achat*." },
                  { bold: "Paiement sécurisé", rest: " et processus simple." },
                ].map((item) => (
                  <li key={item.bold} className="flex items-start gap-3 text-sm leading-relaxed text-white">
                    <span className="flex-shrink-0 font-bold leading-none mt-0.5" style={{ color: "#e67e22" }}>•</span>
                    <span><strong className="text-white">{item.bold}</strong>{item.rest}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== À PROPOS ===== */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6" style={{ color: "#18223b" }}>
            À propos de Mon Petit Parfait
          </h2>
          <p className="text-center opacity-70 mb-6 max-w-2xl mx-auto text-sm" style={{ color: "#18223b" }}>
            Chez Mon Petit Parfait, nous sommes convaincus qu&apos;un bon séjour commence dès l&apos;arrivée. Un logement propre, bien équipé et accueillant fait toute la différence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "🏠",
                title: "La Vraie Vie",
                text: "Des kits conçus à partir des besoins réels des voyageurs : se laver, nettoyer, se détendre ou savourer un café. Pratique, utile et prêt à l'emploi.",
              },
              {
                icon: "⚡",
                title: "Flexibilité",
                text: "Kits complets ou produits essentiels à l'unité. Composez votre propre organisation selon vos logements, vos habitudes et votre budget.",
              },
              {
                icon: "🎯",
                title: "Objectif Simple",
                text: "Vous aider à offrir un accueil chaleureux et pro. Ce sont les petits détails qui transforment un séjour ordinaire en très bonne expérience.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl p-6 text-center"
                style={{ backgroundColor: "white" }}
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="font-bold text-base mb-2" style={{ color: "#18223b" }}>
                  {card.title}
                </h3>
                <p className="text-sm opacity-70 leading-relaxed" style={{ color: "#18223b" }}>
                  {card.text}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-base font-medium italic opacity-60" style={{ color: "#18223b" }}>
            &ldquo;Mon Petit Parfait, c&apos;est l&apos;art de bien accueillir, tout simplement.&rdquo;
          </p>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-2xl p-8 md:p-10 text-center" style={{ backgroundColor: "#e67e22" }}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Prêt à sublimer l&apos;accueil de vos clients ?
          </h2>
          <p className="text-white opacity-80 text-base mb-6 max-w-xl mx-auto">
            Créez votre compte professionnel et découvrez vos tarifs personnalisés.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-white transition-opacity hover:opacity-90"
              style={{ color: "#e67e22" }}
            >
              Créer mon compte <ArrowRight size={16} />
            </Link>
            <Link
              href="/boutique"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all"
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
