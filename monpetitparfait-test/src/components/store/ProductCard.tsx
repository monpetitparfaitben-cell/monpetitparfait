"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/products";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/contexts/AuthContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { user, getContractPrice } = useAuth();

  const contractPrice = getContractPrice(product.variants[0].id);
  const displayPrice = contractPrice ?? product.price;
  const hasContractPrice = contractPrice !== null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    addItem(product, product.variants[0], 1);
  };

  return (
    <Link href={`/produit/${product.slug}`} className="group block">
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        style={{ backgroundColor: "white" }}
      >
        {/* Image */}
        <div
          className="relative aspect-square flex items-center justify-center"
          style={{ backgroundColor: "#F7F5F0" }}
        >
          {product.is_featured && (
            <span
              className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white z-10"
              style={{ backgroundColor: "#e67e22" }}
            >
              ⭐ Populaire
            </span>
          )}
          {hasContractPrice && (
            <span
              className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full z-10"
              style={{ backgroundColor: "#18223b15", color: "#18223b" }}
            >
              🤝 Mon prix
            </span>
          )}
          {product.images && product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="text-6xl select-none">
              {product.category === "kits" && "🎁"}
              {product.category === "ouate" && "🧻"}
              {product.category === "consommables" && "☕"}
            </div>
          )}

          {/* Quick add (visible seulement si connecté) */}
          {user && (
            <button
              onClick={handleQuickAdd}
              className="absolute bottom-3 right-3 p-2.5 rounded-xl text-white shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200"
              style={{ backgroundColor: "#e67e22" }}
              aria-label={`Ajouter ${product.name} au panier`}
            >
              <ShoppingCart size={16} />
            </button>
          )}
        </div>

        {/* Infos */}
        <div className="p-4">
          <p className="text-xs font-medium uppercase tracking-wider mb-1 opacity-50" style={{ color: "#18223b" }}>
            {product.category === "kits" && "Kit"}
            {product.category === "ouate" && "100% Ouate"}
            {product.category === "consommables" && "Consommable"}
          </p>

          <h3 className="font-bold text-sm mb-1 line-clamp-2" style={{ color: "#18223b" }}>
            {product.name}
          </h3>

          <p className="text-xs opacity-60 mb-3 line-clamp-2" style={{ color: "#18223b" }}>
            {product.short_description}
          </p>

          {/* Prix */}
          <div className="flex items-center justify-between">
            <div>
              {user ? (
                <>
                  <p className="text-xs opacity-50 mb-0.5" style={{ color: "#18223b" }}>
                    À partir de
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <p className="font-bold text-base" style={{ color: "#18223b" }}>
                      {formatPrice(displayPrice)}
                    </p>
                    {hasContractPrice && displayPrice < product.price && (
                      <span className="text-xs line-through opacity-40" style={{ color: "#18223b" }}>
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                  {hasContractPrice && (
                    <span className="text-xs font-semibold" style={{ color: "#e67e22" }}>
                      Votre prix contractuel
                    </span>
                  )}
                </>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                  style={{ backgroundColor: "#18223b", color: "white" }}
                >
                  🔒 Voir le prix
                </Link>
              )}
            </div>
            <span
              className="text-xs px-2 py-1 rounded-lg font-medium"
              style={{ backgroundColor: "#F7F5F0", color: "#18223b" }}
            >
              {product.variants.length} options
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
