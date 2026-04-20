"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { ProductCategory, CATEGORY_LABELS, CATEGORY_DESCRIPTIONS } from "@/types";
import ProductCard from "@/components/store/ProductCard";

const CATEGORIES: { id: string; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "kits", label: "Kits" },
  { id: "ouate", label: "100% Ouate" },
  { id: "consommables", label: "Consommables" },
];

function BoutiqueContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filtered = useMemo(() => {
    let products = PRODUCTS.filter((p) => p.is_active);

    if (activeCategory !== "all") {
      products = products.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.short_description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case "price-asc":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...products].sort((a, b) => b.price - a.price);
      case "name":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return products;
    }
  }, [activeCategory, search, sortBy]);

  return (
    <div style={{ backgroundColor: "#F7F5F0", minHeight: "100vh" }}>
      {/* Header boutique */}
      <div
        className="py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#18223b" }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-50 text-white mb-2">
            Notre sélection
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {activeCategory !== "all"
              ? CATEGORY_LABELS[activeCategory as ProductCategory] || "Boutique"
              : "Toute la boutique"}
          </h1>
          {activeCategory !== "all" && CATEGORY_DESCRIPTIONS[activeCategory as ProductCategory] && (
            <p className="text-white opacity-60 text-sm">
              {CATEGORY_DESCRIPTIONS[activeCategory as ProductCategory]}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40"
              style={{ color: "#18223b" }}
            />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none"
              style={{
                backgroundColor: "white",
                border: "1px solid #ede9e0",
                color: "#18223b",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70"
                style={{ color: "#18223b" }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-xl text-sm outline-none"
            style={{
              backgroundColor: "white",
              border: "1px solid #ede9e0",
              color: "#18223b",
            }}
          >
            <option value="default">Trier par défaut</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="name">Nom A-Z</option>
          </select>
        </div>

        {/* Catégories */}
        <div className="flex gap-3 flex-wrap mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                backgroundColor:
                  activeCategory === cat.id ? "#18223b" : "white",
                color: activeCategory === cat.id ? "white" : "#18223b",
                border: `2px solid ${activeCategory === cat.id ? "#18223b" : "#ede9e0"}`,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Résultats */}
        <p className="text-sm opacity-50 mb-6" style={{ color: "#18223b" }}>
          {filtered.length} produit{filtered.length > 1 ? "s" : ""}{" "}
          {search && `pour "${search}"`}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-bold text-lg mb-2" style={{ color: "#18223b" }}>
              Aucun produit trouvé
            </p>
            <p className="text-sm opacity-60 mb-6" style={{ color: "#18223b" }}>
              Essayez avec d&apos;autres mots-clés ou changez de catégorie
            </p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("all"); }}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: "#e67e22" }}
            >
              Voir tous les produits
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
