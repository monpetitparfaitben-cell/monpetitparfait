"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, ChevronRight, ArrowLeft } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { useAuth } from "@/contexts/AuthContext";
import { createSupabaseBrowserClient } from "@/lib/supabase";

interface OrderItem {
  product_name: string;
  variant_name: string;
  quantity: number;
  unit_price: number;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  order_items: OrderItem[];
}

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  pending:    { label: "En attente",      color: "#18223b", bg: "#ede9e0" },
  paid:       { label: "Payée",           color: "#1a7a4a", bg: "#d4edda" },
  processing: { label: "En préparation", color: "#856404", bg: "#fff3cd" },
  shipped:    { label: "Expédiée",        color: "#0c5460", bg: "#d1ecf1" },
  delivered:  { label: "Livrée ✓",       color: "#1a7a4a", bg: "#d4edda" },
  cancelled:  { label: "Annulée",         color: "#721c24", bg: "#f8d7da" },
};

export default function CommandesPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const supabase = createSupabaseBrowserClient();
    supabase
      .from("orders")
      .select("id, created_at, status, total, order_items(product_name, variant_name, quantity, unit_price)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setOrders((data as Order[]) ?? []);
        setLoading(false);
      });
  }, [user]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

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

        <h1 className="text-2xl font-bold mb-8" style={{ color: "#18223b" }}>Mes commandes</h1>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-t-orange-400 rounded-full animate-spin" style={{ borderColor: "#ede9e0", borderTopColor: "#e67e22" }} />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 rounded-2xl" style={{ backgroundColor: "white" }}>
            <Package size={48} className="mx-auto mb-4 opacity-30" style={{ color: "#18223b" }} />
            <p className="font-bold mb-2" style={{ color: "#18223b" }}>Aucune commande pour le moment</p>
            <p className="text-sm opacity-60 mb-6" style={{ color: "#18223b" }}>Vos commandes apparaîtront ici</p>
            <Link href="/boutique" className="inline-block px-6 py-2.5 rounded-xl text-sm font-bold text-white" style={{ backgroundColor: "#e67e22" }}>
              Commencer mes achats
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = STATUS_LABELS[order.status] ?? STATUS_LABELS.pending;
              return (
                <div key={order.id} className="rounded-2xl p-6" style={{ backgroundColor: "white" }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-bold font-mono text-sm" style={{ color: "#18223b" }}>
                        #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p className="text-sm opacity-60" style={{ color: "#18223b" }}>{formatDate(order.created_at)}</p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: status.bg, color: status.color }}>
                      {status.label}
                    </span>
                  </div>

                  <div className="mb-4 space-y-1">
                    {order.order_items?.map((item, i) => (
                      <p key={i} className="text-sm opacity-70" style={{ color: "#18223b" }}>
                        {item.product_name} — {item.variant_name} × {item.quantity}
                      </p>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "#ede9e0" }}>
                    <p className="font-bold text-lg" style={{ color: "#18223b" }}>{formatPrice(order.total)}</p>
                    <button className="flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70" style={{ color: "#e67e22" }}>
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
