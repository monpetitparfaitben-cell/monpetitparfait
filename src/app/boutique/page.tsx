"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ChevronRight } from "lucide-react";
import { PRODUCTS, formatPrice } from "@/lib/products";
import { ProductCategory, CATEGORY_LABELS } from "@/types";
import ProductCard from "@/components/store/ProductCard";
import BackButton from "@/components/ui/BackButton";

// ── Position de l'image par sous-catégorie ──
const SUBCAT_IMAGE_POSITION: Record<string, string> = {};

// ── Lien direct vers produit (sous-catégories avec 1 seul produit) ──
const SUBCAT_DIRECT_LINK: Record<string, string> = {
  "Kit Capsule Café": "/produit/kit-capsule-cafe",
};

// ── Images hero par sous-catégorie (pour les cartes de navigation) ──
const SUBCAT_HERO_IMAGES: Record<string, string> = {
  "Kit Salle de Bains": "/images/hero/kit-sdb.jpg",
  "Kit Capsule Café": "/images/hero/kit-cafe.jpg",
  "Kit Gourmand": "/images/hero/kit-welcome.jpg",
  "Kit Entretien": "/images/hero/kit-entretien.jpg",
  "Essuie-tout": "/images/hero/essuie-tout.jpg",
  "Papier toilette": "/images/hero/papier-toilette-hero.jpg",
  "Sac poubelle": "/images/produits/sac-poubelle-hero.jpeg",
  "Tablette": "/images/produits/tablette-lave-vaisselle.jpg",
  "Capsule café": "/images/hero/capsule-cafe.jpg",
  "Thé": "/images/produits/PHOTO-2026-02-03-14-59-07.jpg",
  "Éponge standard": "/images/produits/eponge-simple.png",
  "Éponge emballage individuel": "/images/produits/eponge-emballage.png",
};

// ── Structure de navigation ─────────────────────────────────────
const NAV_STRUCTURE: { id: string; label: string; subcategories: string[]; hidden?: boolean }[] = [
  {
    id: "kits",
    label: "Kits",
    subcategories: ["Kit Salle de Bains", "Kit Capsule Café", "Kit Gourmand", "Kit Entretien"],
  },
  {
    id: "ouate",
    label: "100% Ouate",
    subcategories: ["Essuie-tout", "Papier toilette"],
  },
  {
    id: "consommables",
    label: "Consommables",
    subcategories: ["Sac poubelle", "Tablette", "Pastille", "Capsule café", "Thé"],
  },
  {
    id: "eponge",
    label: "Éponge",
    subcategories: ["Éponge standard", "Éponge emballage individuel"],
    hidden: true, // Accessible via /boutique?category=eponge mais pas affiché dans la vue générale
  },
];

// ── Carte produit style Beneki ──────────────────────────────────
function ProductGridCard({ product }: { product: typeof PRODUCTS[0] }) {
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const image = product.images[0];
  return (
    <Link href={`/produit/${product.slug}`} className="group block h-full">
      <div
        className="rounded-2xl overflow-hidden transition-all duration-200 group-hover:shadow-lg h-full flex flex-col"
        style={{ backgroundColor: "white", border: "1.5px solid #ede9e0" }}
      >
        {/* Image */}
        <div
          className="relative aspect-square w-full flex-shrink-0 overflow-hidden"
          style={{ backgroundColor: "#F7F5F0" }}
        >
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">📦</span>
          )}
        </div>

        {/* Infos */}
        <div className="p-4 flex flex-col flex-1">
          <p className="font-bold text-sm leading-snug mb-1" style={{ color: "#18223b" }}>
            {product.name}
          </p>
          <p className="text-sm font-semibold mt-auto" style={{ color: "#e67e22" }}>
            à partir de {formatPrice(lowestPrice)}
          </p>
        </div>
      </div>
    </Link>
  );
}

// ── Contenu principal ───────────────────────────────────────────
function BoutiqueContent() {
  const searchParams  = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const subcatParam   = searchParams.get("subcategory") || "";
  const [search, setSearch] = useState("");

  // ── Filtrage (doit être AVANT les returns conditionnels — règle des hooks React) ──
  const filtered = useMemo(() => {
    let products = PRODUCTS.filter((p) => p.is_active);
    if (search.trim()) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.short_description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return products;
  }, [search]);

  // ── Vue sous-catégorie (style Beneki) ──
  if (subcatParam) {
    const products = PRODUCTS.filter(
      (p) => p.is_active && p.subcategory === subcatParam
    );

    // Trouver la catégorie parente
    const parentCat = NAV_STRUCTURE.find((c) =>
      c.subcategories.includes(subcatParam)
    );

    return (
      <div style={{ backgroundColor: "#F7F5F0", minHeight: "100vh" }}>
        {/* Header */}
        <div className="py-10 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F7F5F0" }}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-3">
              <BackButton
                href={parentCat ? `/boutique?category=${parentCat.id}` : "/boutique"}
                label={parentCat ? `Retour à ${parentCat.label}` : "Retour à la boutique"}
              />
            </div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs mb-3" style={{ color: "#18223b", opacity: 0.5 }}>
              <Link href="/boutique" className="hover:opacity-80">Boutique</Link>
              {parentCat && (
                <>
                  <ChevronRight size={12} />
                  <Link href={`/boutique?category=${parentCat.id}`} className="hover:opacity-80">
                    {parentCat.label}
                  </Link>
                </>
              )}
              <ChevronRight size={12} />
              <span style={{ opacity: 1 }}>{subcatParam}</span>
            </div>
            <h1 className="text-3xl font-bold" style={{ color: "#18223b" }}>{subcatParam}</h1>
            <p className="text-sm mt-1" style={{ color: "#18223b", opacity: 0.5 }}>
              {products.length} référence{products.length > 1 ? "s" : ""} disponible{products.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Grille produits */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-bold text-lg mb-2" style={{ color: "#18223b" }}>
                Aucun produit dans cette catégorie
              </p>
              <Link href="/boutique"
                className="inline-block mt-4 px-6 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ backgroundColor: "#e67e22" }}
              >
                Voir tout le catalogue
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((product) => (
                <ProductGridCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Autres sous-catégories de la même famille */}
          {parentCat && parentCat.subcategories.length > 1 && (
            <div className="mt-16">
              <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4"
                style={{ color: "#18223b" }}>
                Autres {parentCat.label}
              </p>
              <div className="flex flex-wrap gap-3">
                {parentCat.subcategories
                  .filter((s) => s !== subcatParam)
                  .map((s) => (
                    <Link
                      key={s}
                      href={`/boutique?subcategory=${encodeURIComponent(s)}`}
                      className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                      style={{ backgroundColor: "white", color: "#18223b", border: "1.5px solid #ede9e0" }}
                    >
                      {s}
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Vue catégorie : affiche les sous-catégories comme cartes ──
  if (categoryParam && categoryParam !== "all") {
    const catInfo = NAV_STRUCTURE.find((c) => c.id === categoryParam);
    if (catInfo) {
      return (
        <div style={{ backgroundColor: "#F7F5F0", minHeight: "100vh" }}>
          <div className="py-10 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F7F5F0" }}>
            <div className="max-w-7xl mx-auto">
              <div className="mb-3">
                <BackButton href="/boutique" label="Retour à la boutique" />
              </div>
              <div className="flex items-center gap-2 text-xs mb-3" style={{ color: "#18223b", opacity: 0.5 }}>
                <Link href="/boutique" className="hover:opacity-80">Boutique</Link>
                <ChevronRight size={12} />
                <span style={{ opacity: 1 }}>{catInfo.label}</span>
              </div>
              <h1 className="text-3xl font-bold" style={{ color: "#18223b" }}>{catInfo.label}</h1>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {catInfo.subcategories.map((subcat) => {
                // Premier produit de la sous-catégorie pour l'image
                const firstProduct = PRODUCTS.find(
                  (p) => p.is_active && p.subcategory === subcat
                );
                const lowestPrice = firstProduct
                  ? Math.min(...PRODUCTS.filter(p => p.is_active && p.subcategory === subcat)
                      .flatMap(p => p.variants.map(v => v.price)))
                  : 0;
                return (
                  <Link
                    key={subcat}
                    href={SUBCAT_DIRECT_LINK[subcat] ?? `/boutique?subcategory=${encodeURIComponent(subcat)}`}
                    className="group block"
                  >
                    <div
                      className="rounded-2xl overflow-hidden transition-all duration-200 group-hover:shadow-lg"
                      style={{ backgroundColor: "white", border: "1.5px solid #ede9e0" }}
                    >
                      <div
                        className="relative aspect-square w-full overflow-hidden"
                        style={{ backgroundColor: "#F7F5F0" }}
                      >
                        {(SUBCAT_HERO_IMAGES[subcat] ?? firstProduct?.images[0]) ? (
                          <Image
                            src={SUBCAT_HERO_IMAGES[subcat] ?? firstProduct!.images[0]}
                            alt={subcat}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 25vw"
                            style={{ objectPosition: SUBCAT_IMAGE_POSITION[subcat] ?? "center" }}
                          />
                        ) : (
                          <span className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">📦</span>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="font-bold text-sm" style={{ color: "#18223b" }}>{subcat}</p>
                        {lowestPrice > 0 && (
                          <p className="text-xs mt-1 font-semibold" style={{ color: "#e67e22" }}>
                            à partir de {formatPrice(lowestPrice)}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  }

  // ── Vue générale (tout le catalogue) ───────────────────────────
  return (
    <div style={{ backgroundColor: "#F7F5F0", minHeight: "100vh" }}>
      {/* Header */}
      <div className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <BackButton href="/" label="Retour à l'accueil" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#18223b", opacity: 0.4 }}>
            Notre sélection
          </p>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: "#18223b" }}>
            Tout le catalogue
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Recherche */}
        <div className="relative max-w-md mb-8">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" style={{ color: "#18223b" }} />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none"
            style={{ backgroundColor: "white", border: "1px solid #ede9e0", color: "#18223b" }}
          />
          {search && (
            <button onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70"
              style={{ color: "#18223b" }}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Navigation par catégories ──── */}
        {!search && (
          <div className="space-y-10 mb-12">
            {NAV_STRUCTURE.filter((cat) => !cat.hidden).map((cat) => (
              <div key={cat.id}>
                {/* Titre catégorie */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold" style={{ color: "#18223b" }}>
                    {cat.label}
                  </h2>
                  <Link
                    href={`/boutique?category=${cat.id}`}
                    className="text-xs font-semibold opacity-50 hover:opacity-80 transition-opacity"
                    style={{ color: "#18223b" }}
                  >
                    Voir tout →
                  </Link>
                </div>

                {/* Cartes sous-catégories — grille uniforme auto-fill */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 180px))", gap: "12px" }}>
                  {cat.subcategories.map((subcat) => {
                    const firstProduct = PRODUCTS.find(
                      (p) => p.is_active && p.subcategory === subcat
                    );
                    const lowestPrice = firstProduct
                      ? Math.min(...PRODUCTS.filter(p => p.is_active && p.subcategory === subcat)
                          .flatMap(p => p.variants.map(v => v.price)))
                      : 0;
                    const imgSrc = SUBCAT_HERO_IMAGES[subcat] ?? firstProduct?.images[0];
                    return (
                      <Link
                        key={subcat}
                        href={SUBCAT_DIRECT_LINK[subcat] ?? `/boutique?subcategory=${encodeURIComponent(subcat)}`}
                        className="group block"
                      >
                        <div
                          className="rounded-2xl overflow-hidden transition-all duration-200 group-hover:shadow-md h-full flex flex-col"
                          style={{ backgroundColor: "white", border: "1.5px solid #ede9e0" }}
                        >
                          <div
                            className="relative aspect-square w-full overflow-hidden flex-shrink-0"
                            style={{ backgroundColor: "#F7F5F0" }}
                          >
                            {imgSrc ? (
                              <Image
                                src={imgSrc}
                                alt={subcat}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 33vw, 20vw"
                                style={{ objectPosition: SUBCAT_IMAGE_POSITION[subcat] ?? "center" }}
                              />
                            ) : (
                              <span className="absolute inset-0 flex items-center justify-center text-4xl opacity-20">📦</span>
                            )}
                          </div>
                          <div className="p-3 flex flex-col flex-1 justify-between">
                            <p className="font-bold text-xs leading-snug" style={{ color: "#18223b" }}>
                              {subcat}
                            </p>
                            {lowestPrice > 0 && (
                              <p className="text-xs mt-0.5 font-semibold" style={{ color: "#e67e22" }}>
                                {formatPrice(lowestPrice)}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Résultats de recherche */}
        {search && (
          <>
            <p className="text-sm opacity-50 mb-6" style={{ color: "#18223b" }}>
              {filtered.length} produit{filtered.length > 1 ? "s" : ""} pour &ldquo;{search}&rdquo;
            </p>
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <p className="font-bold text-lg mb-2" style={{ color: "#18223b" }}>
                  Aucun produit trouvé
                </p>
                <button
                  onClick={() => setSearch("")}
                  className="mt-4 px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ backgroundColor: "#e67e22" }}
                >
                  Effacer la recherche
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function BoutiquePage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: "#F7F5F0" }} />}>
      <BoutiqueContent />
    </Suspense>
  );
}
