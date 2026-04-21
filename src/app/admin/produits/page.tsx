"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface ProductStats {
  orderCount: number;
  revenue: number;
}

export default function AdminProduitsPage() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [stats, setStats] = useState<Record<string, ProductStats>>({});
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !isAdmin) router.push("/");
  }, [isAdmin, loading, router]);

  useEffect(() => {
    async function loadStats() {
      const { data } = await supabase
        .from("order_items")
        .select("product_name, quantity, unit_price");

      if (data) {
        const statsMap: Record<string, ProductStats> = {};
        data.forEach((item: { product_name: string; quantity: number; unit_price: number }) => {
          if (!statsMap[item.product_name]) {
            statsMap[item.product_name] = { orderCount: 0, revenue: 0 };
          }
          statsMap[item.product_name].orderCount += 1;
          statsMap[item.product_name].revenue += item.quantity * item.unit_price;
        });
        setStats(statsMap);
      }
      setFetching(false);
    }

    if (isAdmin) loadStats();
  }, [isAdmin, supabase]);

  function getPriceRange(product: typeof PRODUCTS[0]): string {
    if (product.variants.length === 0) return "N/A";
    const prices = product.variants.map((v) => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max
      ? formatEur(min)
      : `${formatEur(min)} - ${formatEur(max)}`;
  }

  function formatEur(cents: number): string {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(cents / 100);
  }

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#e67e22" }} />
      </div>
    );
  }

  const activeProducts = PRODUCTS.filter((p) => p.is_active);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="max-w-6xl mx-auto">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm font-medium mb-6 opacity-60 hover:opacity-100 transition-opacity"
          style={{ color: "#18223b" }}
        >
          <ArrowLeft size={16} /> Admin
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#18223b" }}>
            Gestion des produits
          </h1>
          <p className="text-sm opacity-70" style={{ color: "#18223b" }}>
            {activeProducts.length} produits actifs
          </p>
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeProducts.map((product) => {
            const productStats = stats[product.name] || { orderCount: 0, revenue: 0 };

            return (
              <div
                key={product.id}
                className="rounded-2xl p-6 overflow-hidden"
                style={{ backgroundColor: "white" }}
              >
                {/* Image */}
                {product.images[0] && (
                  <div className="mb-4 rounded-xl overflow-hidden bg-gray-100 w-full h-48 relative">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                {/* Header avec badge */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="font-bold text-lg" style={{ color: "#18223b" }}>
                      {product.name}
                    </h2>
                    <p className="text-xs opacity-60 mt-1" style={{ color: "#18223b" }}>
                      {product.category}
                    </p>
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: product.is_active ? "#27ae6015" : "#e67e2215",
                      color: product.is_active ? "#27ae60" : "#e67e22",
                    }}
                  >
                    {product.is_active ? "Actif" : "Inactif"}
                  </span>
                </div>

                {/* Description courte */}
                <p className="text-sm opacity-70 mb-4" style={{ color: "#18223b" }}>
                  {product.short_description}
                </p>

                {/* Variantes */}
                <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: "#F7F5F0" }}>
                  <p className="text-xs font-semibold opacity-70 mb-2" style={{ color: "#18223b" }}>
                    {product.variants.length} variante(s)
                  </p>
                  <div className="space-y-1">
                    {product.variants.map((variant) => (
                      <div key={variant.id} className="flex justify-between text-xs" style={{ color: "#18223b" }}>
                        <span>{variant.name}</span>
                        <span className="font-semibold">{formatEur(variant.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prix min-max */}
                <div className="mb-4 p-3 rounded-lg border-2" style={{ borderColor: "#ede9e0", backgroundColor: "white" }}>
                  <p className="text-xs opacity-60 mb-1" style={{ color: "#18223b" }}>
                    Gamme de prix
                  </p>
                  <p className="font-bold text-lg" style={{ color: "#e67e22" }}>
                    {getPriceRange(product)}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t-2" style={{ borderColor: "#ede9e0" }}>
                  <div className="p-3 rounded-lg text-center" style={{ backgroundColor: "#F7F5F0" }}>
                    <BarChart3 size={16} className="mx-auto mb-2 opacity-60" style={{ color: "#18223b" }} />
                    <p className="text-xs opacity-60 mb-1" style={{ color: "#18223b" }}>
                      Commandes
                    </p>
                    <p className="font-bold text-lg" style={{ color: "#18223b" }}>
                      {productStats.orderCount}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg text-center" style={{ backgroundColor: "#F7F5F0" }}>
                    <BarChart3 size={16} className="mx-auto mb-2 opacity-60" style={{ color: "#18223b" }} />
                    <p className="text-xs opacity-60 mb-1" style={{ color: "#18223b" }}>
                      Chiffre d'affaires
                    </p>
                    <p className="font-bold text-lg" style={{ color: "#e67e22" }}>
                      {formatEur(productStats.revenue)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {activeProducts.length === 0 && (
          <div className="text-center py-12 rounded-2xl" style={{ backgroundColor: "white" }}>
            <p className="opacity-50 text-sm" style={{ color: "#18223b" }}>
              Aucun produit actif
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
