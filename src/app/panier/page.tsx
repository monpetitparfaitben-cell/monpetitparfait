"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/lib/products";

export default function PanierPage() {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal } = useCartStore();
  const { user, getContractPrice } = useAuth();
  const subtotal = getSubtotal();

  if (items.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ backgroundColor: "#F7F5F0" }}
      >
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: "#ede9e0" }}
        >
          <ShoppingBag size={40} style={{ color: "#18223b", opacity: 0.4 }} />
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: "#18223b" }}>
          Votre panier est vide
        </h1>
        <p className="text-sm opacity-60 mb-8 text-center" style={{ color: "#18223b" }}>
          Découvrez nos kits et consommables pour vos hébergements
        </p>
        <Link
          href="/boutique"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
          style={{ backgroundColor: "#e67e22" }}
        >
          <ArrowLeft size={16} /> Voir la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "#18223b" }}>
            Mon Panier ({items.reduce((c, i) => c + i.quantity, 0)} articles)
          </h1>
          <button
            onClick={clearCart}
            className="text-sm opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1"
            style={{ color: "#18223b" }}
          >
            <Trash2 size={14} /> Vider le panier
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const contractPrice = getContractPrice(item.variant.id);
              const catalogPrice = item.variant.price;
              const hasContractPrice = contractPrice !== null;
              const displayPrice = hasContractPrice ? contractPrice : catalogPrice;
              const hasImage = item.product.images && item.product.images.length > 0;

              return (
                <div
                  key={`${item.product.id}-${item.variant.id}`}
                  className="flex gap-4 p-6 rounded-2xl"
                  style={{ backgroundColor: "white" }}
                >
                  {/* Image */}
                  <div
                    className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                    style={{ backgroundColor: "#F7F5F0" }}
                  >
                    {hasImage ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl">
                        {item.product.category === "kits" ? "🎁" : item.product.category === "ouate" ? "🧻" : "☕"}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold mb-1" style={{ color: "#18223b" }}>
                      {item.product.name}
                    </h3>
                    <p className="text-sm opacity-60 mb-3" style={{ color: "#18223b" }}>
                      {item.variant.name}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Quantité */}
                      <div
                        className="flex items-center gap-3 px-3 py-2 rounded-xl"
                        style={{ backgroundColor: "#F7F5F0" }}
                      >
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.variant.id, item.quantity - 1)
                          }
                          style={{ color: "#18223b" }}
                          aria-label="Diminuer"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-bold w-5 text-center text-sm" style={{ color: "#18223b" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.variant.id, item.quantity + 1)
                          }
                          style={{ color: "#18223b" }}
                          aria-label="Augmenter"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        {hasContractPrice && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: "#e67e22", color: "white" }}>
                            Prix contrat
                          </span>
                        )}
                        <div>
                          {hasContractPrice && (
                            <span className="text-xs opacity-50 line-through block">{formatPrice(catalogPrice * item.quantity)}</span>
                          )}
                          <span className="font-bold text-lg" style={{ color: "#18223b" }}>
                            {formatPrice(displayPrice * item.quantity)}
                          </span>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.variant.id)}
                          className="opacity-40 hover:opacity-100 transition-opacity mt-1"
                          style={{ color: "#e67e22" }}
                          aria-label="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Continuer les achats */}
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 text-sm font-medium mt-4 transition-opacity hover:opacity-70"
              style={{ color: "#18223b" }}
            >
              <ArrowLeft size={16} /> Continuer mes achats
            </Link>
          </div>

          {/* Récap commande */}
          <div className="lg:col-span-1">
            <div
              className="rounded-2xl p-6 sticky top-24"
              style={{ backgroundColor: "white" }}
            >
              <h2 className="font-bold text-lg mb-6" style={{ color: "#18223b" }}>
                Récapitulatif
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm" style={{ color: "#18223b" }}>
                  <span className="opacity-70">Sous-total</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm" style={{ color: "#18223b" }}>
                  <span className="opacity-70">Livraison</span>
                  <span className="font-semibold text-green-600">Gratuite</span>
                </div>
              </div>

              <div
                className="border-t pt-4 mb-6"
                style={{ borderColor: "#ede9e0" }}
              >
                <div className="flex justify-between" style={{ color: "#18223b" }}>
                  <span className="font-bold">Total TTC</span>
                  <span className="font-bold text-xl">{formatPrice(subtotal)}</span>
                </div>
              </div>

              {/* Livraison offerte */}
              <div
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium mb-4"
                style={{ backgroundColor: "#F7F5F0", color: "#18223b" }}
              >
                🚚 Livraison offerte
              </div>

              <Link
                href="/checkout"
                className="block w-full text-center py-4 rounded-xl text-base font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#18223b" }}
              >
                Passer la commande <ArrowRight size={16} className="inline ml-1" />
              </Link>

              <p className="text-xs text-center opacity-50 mt-4" style={{ color: "#18223b" }}>
                🔒 Paiement sécurisé par Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
