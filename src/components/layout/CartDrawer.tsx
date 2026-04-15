"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/products";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } =
    useCartStore();
  const subtotal = getSubtotal();

  // Bloquer scroll quand ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full w-full sm:w-[420px] z-50 flex flex-col shadow-2xl"
        style={{ backgroundColor: "#F7F5F0" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "#ede9e0" }}
        >
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} style={{ color: "#18223b" }} />
            <h2
              className="text-lg font-bold"
              style={{ color: "#18223b" }}
            >
              Mon Panier
            </h2>
            {items.length > 0 && (
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: "#e67e22" }}
              >
                {items.reduce((c, i) => c + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-beige-200 transition-colors"
            style={{ color: "#18223b" }}
            aria-label="Fermer le panier"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#ede9e0" }}
              >
                <ShoppingBag size={36} style={{ color: "#18223b", opacity: 0.4 }} />
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: "#18223b" }}>
                  Votre panier est vide
                </p>
                <p className="text-sm opacity-60" style={{ color: "#18223b" }}>
                  Découvrez nos produits et kits pour vos hébergements
                </p>
              </div>
              <Link
                href="/boutique"
                onClick={closeCart}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#e67e22" }}
              >
                Voir la boutique
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.variant.id}`}
                  className="flex gap-4 p-4 rounded-xl"
                  style={{ backgroundColor: "white" }}
                >
                  {/* Image placeholder */}
                  <div
                    className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: "#F7F5F0" }}
                  >
                    <ShoppingBag size={20} style={{ color: "#18223b", opacity: 0.3 }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ color: "#18223b" }}
                    >
                      {item.product.name}
                    </p>
                    <p className="text-xs opacity-60 mb-2" style={{ color: "#18223b" }}>
                      {item.variant.name}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Quantité */}
                      <div
                        className="flex items-center gap-2 rounded-lg px-2 py-1"
                        style={{ backgroundColor: "#F7F5F0" }}
                      >
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.variant.id,
                              item.quantity - 1
                            )
                          }
                          className="p-0.5 rounded hover:opacity-70 transition-opacity"
                          style={{ color: "#18223b" }}
                          aria-label="Diminuer"
                        >
                          <Minus size={14} />
                        </button>
                        <span
                          className="text-sm font-medium w-5 text-center"
                          style={{ color: "#18223b" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.variant.id,
                              item.quantity + 1
                            )
                          }
                          className="p-0.5 rounded hover:opacity-70 transition-opacity"
                          style={{ color: "#18223b" }}
                          aria-label="Augmenter"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm font-bold"
                          style={{ color: "#18223b" }}
                        >
                          {formatPrice(item.variant.price * item.quantity)}
                        </span>
                        <button
                          onClick={() =>
                            removeItem(item.product.id, item.variant.id)
                          }
                          className="p-1 rounded hover:opacity-70 transition-opacity"
                          style={{ color: "#e67e22" }}
                          aria-label="Supprimer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="px-6 py-4 border-t space-y-4"
            style={{ borderColor: "#ede9e0" }}
          >
            {/* Livraison offerte */}
            <div
              className="flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "#e67e22", color: "white" }}
            >
              🚚 Livraison offerte sans minimum d&apos;achat
            </div>

            {/* Sous-total */}
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-70" style={{ color: "#18223b" }}>
                Sous-total
              </span>
              <span className="font-bold text-lg" style={{ color: "#18223b" }}>
                {formatPrice(subtotal)}
              </span>
            </div>

            {/* Bouton checkout */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full text-center py-3.5 rounded-xl text-base font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#18223b" }}
            >
              Commander — {formatPrice(subtotal)}
            </Link>

            <Link
              href="/panier"
              onClick={closeCart}
              className="block w-full text-center py-2 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: "#18223b" }}
            >
              Voir le panier complet
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
