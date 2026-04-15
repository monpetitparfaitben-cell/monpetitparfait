"use client";

import Link from "next/link";
import { Package, ChevronRight, ArrowLeft } from "lucide-react";
import { formatPrice } from "@/lib/products";

// Mock data — remplacer par des appels Supabase
const mockOrders = [
  {
    id: "CMD-2024-001",
    date: "12 Jan. 2025",
    status: "delivered",
    total: 4990,
    itemCount: 3,
    items: ["Kit Welcome Café × 2", "Papier Toilette Premium × 1"],
  },
  {
    id: "CMD-2024-002",
    date: "28 Dec. 2024",
    status: "shipped",
    total: 7990,
    itemCount: 2,
    items: ["Kit Salle De Bain × 1", "Éponges Grattantes × 1"],
  },
];

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "En attente", color: "#18223b", bg: "#ede9e0" },
  paid: { label: "Payée", color: "#1a7a4a", bg: "#d4edda" },
  processing: { label: "En préparation", color: "#856404", bg: "#fff3cd" },
  shipped: { label: "Expédiée", color: "#0c5460", bg: "#d1ecf1" },
  delivered: { label: "Livrée ✓", color: "#1a7a4a", bg: "#d4edda" },
  cancelled: { label: "Annulée", color: "#721c24", bg: "#f8d7da" },
};

export default function CommandesPage() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="max-w-3xl mx-auto">
        <Link
          href="/compte"
          className="inline-flex items-center gap-2 text-sm font-medium mb-6 opacity-60 hover:opacity-100 transition-opacity"
          style={{ color: "#18223b" }}
        >
          <ArrowLeft size={16} /> Mon compte
        </Link>

        <h1 className="text-2xl font-bold mb-8" style={{ color: "#18223b" }}>
          Mes commandes
        </h1>

        {mockOrders.length === 0 ? (
          <div className="text-center py-16 rounded-2xl" style={{ backgroundColor: "white" }}>
            <Package size={48} className="mx-auto mb-4 opacity-30" style={{ color: "#18223b" }} />
            <p className="font-bold mb-2" style={{ color: "#18223b" }}>
              Aucune commande pour le moment
            </p>
            <p className="text-sm opacity-60 mb-6" style={{ color: "#18223b" }}>
              Vos commandes apparaîtront ici
            </p>
            <Link
              href="/boutique"
              className="inline-block px-6 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: "#e67e22" }}
            >
              Commencer mes achats
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {mockOrders.map((order) => {
              const status = STATUS_LABELS[order.status] || STATUS_LABELS.pending;
              return (
                <div
                  key={order.id}
                  className="rounded-2xl p-6"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-bold" style={{ color: "#18223b" }}>
                        {order.id}
                      </p>
                      <p className="text-sm opacity-60" style={{ color: "#18223b" }}>
                        {order.date}
                      </p>
                    </div>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ backgroundColor: status.bg, color: status.color }}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div className="mb-4">
                    {order.items.map((item, i) => (
                      <p key={i} className="text-sm opacity-70" style={{ color: "#18223b" }}>
                        {item}
                      </p>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-bold text-lg" style={{ color: "#18223b" }}>
                      {formatPrice(order.total)}
                    </p>
                    <button
                      className="flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70"
                      style={{ color: "#e67e22" }}
                    >
                      Voir le détail <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
