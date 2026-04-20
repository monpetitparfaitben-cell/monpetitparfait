"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowLeft, Lock, Download } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { PRODUCTS, formatPrice } from "@/lib/products";

export default function MonContratPage() {
  const { user, profile, contract, contractPrices, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#e67e22" }} />
      </div>
    );
  }

  const hasContract = contract && Object.keys(contractPrices).length > 0;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="max-w-4xl mx-auto">
        <Link
          href="/compte"
          className="inline-flex items-center gap-2 text-sm font-medium mb-6 opacity-60 hover:opacity-100 transition-opacity"
          style={{ color: "#18223b" }}
        >
          <ArrowLeft size={16} /> Mon compte
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#18223b" }}>Mon Contrat & Mes Prix</h1>
            {contract && (
              <p className="text-sm opacity-60 mt-1" style={{ color: "#18223b" }}>
                {contract.name}
                {contract.valid_to && ` · Valide jusqu'au ${new Date(contract.valid_to).toLocaleDateString("fr-FR")}`}
              </p>
            )}
          </div>
          {hasContract && (
            <button
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ backgroundColor: "white", color: "#18223b", border: "1.5px solid #ede9e0" }}
            >
              <Download size={15} /> Télécharger PDF
            </button>
          )}
        </div>

        {!hasContract ? (
          <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: "white" }}>
            <Lock size={40} className="mx-auto mb-4 opacity-30" style={{ color: "#18223b" }} />
            <h2 className="font-bold text-lg mb-2" style={{ color: "#18223b" }}>
              Aucun contrat actif
            </h2>
            <p className="text-sm opacity-60 mb-6 max-w-sm mx-auto" style={{ color: "#18223b" }}>
              Vos tarifs personnalisés apparaîtront ici une fois votre contrat validé par notre équipe.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: "#e67e22" }}
            >
              Nous contacter
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Résumé contrat */}
            <div
              className="rounded-2xl p-6 flex items-center justify-between"
              style={{ backgroundColor: "#18223b" }}
            >
              <div>
                <p className="text-white opacity-60 text-xs uppercase tracking-wider mb-1">Contrat actif</p>
                <p className="text-white font-bold text-lg">{contract!.name}</p>
                <p className="text-white opacity-60 text-sm">{profile?.company}</p>
              </div>
              <div className="text-right">
                <p className="text-white opacity-60 text-xs mb-1">
                  {Object.keys(contractPrices).length} tarifs personnalisés
                </p>
                <span
                  className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: "#27ae6030", color: "#27ae60" }}
                >
                  ✓ Actif
                </span>
              </div>
            </div>

            {/* Grille des prix par catégorie */}
            {(["kits", "ouate", "consommables"] as const).map((cat) => {
              const catProducts = PRODUCTS.filter(
                (p) => p.category === cat && p.is_active
              );
              const catHasPrices = catProducts.some((p) =>
                p.variants.some((v) => contractPrices[v.id] !== undefined)
              );
              if (!catHasPrices) return null;

              return (
                <div key={cat} className="rounded-2xl overflow-hidden" style={{ backgroundColor: "white" }}>
                  <div className="px-6 py-4 border-b" style={{ borderColor: "#ede9e0" }}>
                    <h2 className="font-bold" style={{ color: "#18223b" }}>
                      {cat === "kits" ? "🎁 Kits" : cat === "ouate" ? "🧻 Produits 100% Ouate" : "☕ Consommables"}
                    </h2>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr style={{ backgroundColor: "#F7F5F0" }}>
                          <th className="text-left px-6 py-3 text-xs font-semibold opacity-60" style={{ color: "#18223b" }}>
                            Produit
                          </th>
                          <th className="text-left px-4 py-3 text-xs font-semibold opacity-60" style={{ color: "#18223b" }}>
                            Option
                          </th>
                          <th className="text-right px-4 py-3 text-xs font-semibold opacity-60" style={{ color: "#18223b" }}>
                            Prix catalogue
                          </th>
                          <th className="text-right px-6 py-3 text-xs font-semibold" style={{ color: "#e67e22" }}>
                            Votre prix
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {catProducts.map((product) =>
                          product.variants
                            .filter((v) => contractPrices[v.id] !== undefined)
                            .map((variant, i) => {
                              const myPrice = contractPrices[variant.id]!;
                              const saving = variant.price - myPrice;
                              const savingPct = Math.round((saving / variant.price) * 100);

                              return (
                                <tr
                                  key={variant.id}
                                  className="border-t"
                                  style={{ borderColor: "#F7F5F0" }}
                                >
                                  {i === 0 && (
                                    <td
                                      className="px-6 py-4 font-semibold text-sm"
                                      style={{ color: "#18223b" }}
                                      rowSpan={product.variants.filter((v) => contractPrices[v.id] !== undefined).length}
                                    >
                                      {product.name}
                                    </td>
                                  )}
                                  <td className="px-4 py-4 text-sm opacity-70" style={{ color: "#18223b" }}>
                                    {variant.name}
                                  </td>
                                  <td className="px-4 py-4 text-sm text-right line-through opacity-40" style={{ color: "#18223b" }}>
                                    {formatPrice(variant.price)}
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <span className="font-bold text-sm" style={{ color: "#18223b" }}>
                                      {formatPrice(myPrice)}
                                    </span>
                                    {saving > 0 && (
                                      <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#27ae6015", color: "#27ae60" }}>
                                        -{savingPct}%
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}

            {/* Note */}
            <p className="text-xs text-center opacity-50" style={{ color: "#18223b" }}>
              Ces prix sont confidentiels et s&apos;appliquent uniquement à votre compte. Prix HT, TVA non incluse.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
