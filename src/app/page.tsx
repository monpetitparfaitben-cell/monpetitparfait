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
    img: `${IMG}/kit%20sdb%20carree.jpg`,
  },
  {
    href: "/boutique?subcategory=Kit+Capsule+Caf%C3%A9",
    slug: "kit-capsule-cafe",
    label: "Kit Capsule Café",
    desc: "3 capsules de café compatibles, prêtes à l'emploi",
    img: `${IMG}/kit%20capsule%20carre.jpg`,
  },
  {
    href: "/boutique?subcategory=Kit+Gourmand",
    slug: "kit-gourmand-formule-1",
    label: "Kit Gourmand",
    desc: "2 cafés solubles, 1 thé vert, 1 thé noir, 2 sucres, 2 touillettes, 2 biscuits Lotus",
    img: `${IMG}/kit%20welcome%20carre%20.jpg`,
  },
  {
    href: "/boutique?subcategory=Kit+Entretien",
    slug: "kit-entretien-formule-1",
    label: "Kit Entretien",
    desc: "Liquide vaisselle, éponge, sacs poubelles petit et grand format",
    img: `${IMG}/kit%20entretien%20carre%20.jpg`,
  },
];

const ouate = [
  { href: "/boutique?subcategory=Essuie-tout", slug: "essuie-tout-gamme-1", label: "Essuie-tout", img: `${IMG}/essuie%20tout%20fond%20bland.jpg` },
  { href: "/boutique?subcategory=Papier+toilette", slug: "papier-toilette-gamme-1", label: "Papier toilette", img: `${IMG}/sopalin%20fond%20blanc%20.jpg` },
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10" style={{ color: "#18223b" }}>
          Nos kits
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kits.map((kit) => {
            const product = PRODUCTS.find((p) => p.slug === kit.slug);
            return (
              <Link key={kit.slug} href={kit.href} className="group">
                <div
                  className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="aspect-square relative overflow-hidden" style={{ backgroundColor: "#F7F5F0" }}>
                    <Image
                      src={kit.img}
                      alt={kit.label}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-base mb-1" style={{ color: "#18223b" }}>
                      {kit.label}
                    </h3>
                    <p className="text-xs opacity-60 mb-3 line-clamp-2" style={{ color: "#18223b" }}>
                      {kit.desc}
                    </p>
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

      {/* ===== PRODUITS 100% OUATE ===== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10" style={{ color: "#18223b" }}>
          Produits 100% Ouate
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {ouate.map((item) => {
            const product = PRODUCTS.find((p) => p.slug === item.slug);
            return (
              <Link key={item.slug} href={item.href} className="group">
                <div
                  className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="aspect-video relative overflow-hidden" style={{ backgroundColor: "#F7F5F0" }}>
                    <Image
                      src={item.img}
                      alt={item.label}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-base mb-1" style={{ color: "#18223b" }}>
                      {item.label}
                    </h3>
                    {product && (
                      <p className="text-xs font-medium mt-1" style={{ color: "#e67e22" }}>
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
              <Link key={item.slug} href={item.href} className="group">
                <div
                  className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="aspect-square relative overflow-hidden" style={{ backgroundColor: "#F7F5F0" }}>
                    <Image
                      src={item.img}
                      alt={item.label}
                      fill
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-sm" style={{ color: "#18223b" }}>
                      {item.label}
                    </h3>
                    {product && (
                      <p className="text-xs mt-1 font-medium" style={{ color: "#e67e22" }}>
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="max-w-5xl mx-auto">
          {/* Intro centrée */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-5 inline-block relative" style={{ color: "#18223b" }}>
              Bienvenue chez Mon Petit Parfait
              <span className="block w-16 h-1 rounded-full mt-3 mx-auto" style={{ backgroundColor: "#e67e22" }} />
            </h2>
            <p className="text-base leading-relaxed mb-4 opacity-90" style={{ color: "#18223b" }}>
              Offrez à vos voyageurs une expérience inoubliable dès leur arrivée. Nous fabriquons des kits de bienvenue pensés pour les hôtels, Airbnb et locations saisonnières, ainsi que tous les essentiels du quotidien pour que vos invités se sentent comme chez eux.
            </p>
            <p className="text-base leading-relaxed opacity-90" style={{ color: "#18223b" }}>
              <strong>Notre expertise ?</strong> Allier praticité, qualité et convivialité pour un accueil parfait à chaque séjour.
            </p>
          </div>

          {/* Layout cartes superposées */}
          <div className="relative flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-0">
            {/* Carte blanche principale */}
            <div
              className="rounded-2xl p-8 md:p-10 lg:w-8/12 lg:-mr-8 relative z-10"
              style={{ backgroundColor: "white", boxShadow: "0 20px 40px rgba(24,34,59,0.10)" }}
            >
              <h3 className="text-xl font-bold mb-8" style={{ color: "#18223b" }}>
                Pourquoi choisir Mon Petit Parfait ?
              </h3>
              <ul className="space-y-5">
                {[
                  { bold: "Produits adaptés aux besoins réels des voyageurs", rest: " — pensés pour les hôtels et locations courte durée." },
                  { bold: "Qualité et praticité", rest: " — des articles utiles pour le quotidien et l'accueil." },
                  { bold: "Flexibilité", rest: " — nous proposons des packs complets ou produits individuels selon votre stratégie." },
                  { bold: "Un accueil réussi = de meilleures évaluations", rest: " — des petits détails qui font la différence dans l'expérience de séjour." },
                ].map((item) => (
                  <li key={item.bold} className="flex items-start gap-4 text-sm leading-relaxed" style={{ color: "#18223b" }}>
                    <span className="flex-shrink-0 text-xl font-bold leading-none mt-0.5" style={{ color: "#e67e22" }}>•</span>
                    <span><strong>{item.bold}</strong>{item.rest}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Carte bleue secondaire — décalée */}
            <div
              className="rounded-2xl p-8 md:p-10 lg:w-5/12 lg:mt-10 lg:-ml-4 relative z-20"
              style={{ backgroundColor: "#18223b", boxShadow: "0 15px 30px rgba(24,34,59,0.20)" }}
            >
              <h3 className="text-xl font-bold text-white mb-8">Livraison et service</h3>
              <ul className="space-y-6">
                {[
                  { bold: "Livraison offerte", rest: " sans minimum d'achat*." },
                  { bold: "Paiement sécurisé", rest: " et processus simple." },
                ].map((item) => (
                  <li key={item.bold} className="flex items-start gap-4 text-sm leading-relaxed text-white">
                    <span className="flex-shrink-0 text-xl font-bold leading-none mt-0.5" style={{ color: "#e67e22" }}>•</span>
                    <span><strong className="text-white">{item.bold}</strong>{item.rest}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== À PROPOS ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "#18223b" }}>
            À propos de Mon Petit Parfait
          </h2>
          <p className="text-center opacity-70 mb-10 max-w-2xl mx-auto" style={{ color: "#18223b" }}>
            Chez Mon Petit Parfait, nous sommes convaincus qu&apos;un bon séjour commence dès l&apos;arrivée. Un logement propre, bien équipé et accueillant fait toute la différence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <p className="text-center mt-10 text-lg font-medium italic opacity-60" style={{ color: "#18223b" }}>
            &ldquo;Mon Petit Parfait, c&apos;est l&apos;art de bien accueillir, tout simplement.&rdquo;
          </p>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl p-10 md:p-16 text-center" style={{ backgroundColor: "#e67e22" }}>
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
