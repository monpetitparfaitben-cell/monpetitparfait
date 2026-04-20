"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, ShoppingBag, Users, TrendingUp, ArrowRight } from "lucide-react";
import { formatPrice, PRODUCTS } from "@/lib/products";
import { useAuth } from "@/contexts/AuthContext";
import { createSupabaseBrowserClient } from "@/lib/supabase";

interface RecentOrder {
  id: string;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_company: string | null;
  total: number;
  status: string;
  created_at: string;
}

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  pending:    { bg: "#ede9e0", color: "#18223b", label: "En attente" },
  paid:       { bg: "#d4edda", color: "#1a7a4a", label: "Payée" },
  processing: { bg: "#fff3cd", color: "#856404", label: "En préparation" },
  shipped:    { bg: "#d1ecf1", color: "#0c5460", label: "Expédiée" },
  delivered:  { bg: "#d4edda", color: "#1a7a4a", label: "Livrée" },
  cancelled:  { bg: "#f8d7da", color: "#721c24", label: "Annulée" },
};

export default function AdminPage() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [stats, setStats] = useState({ orders: 0, clients: 0, revenue: 0 });

  useEffect(() => {
    if (!loading && !isAdmin) router.push("/");
  }, [isAdmin, loading, router]);

  useEffect(() => {
    if (!isAdmin) return;
    const supabase = createSupabaseBrowserClient();

    // Commandes récentes
    supabase
      .from("orders")
      .select("id, shipping_first_name, shipping_last_name, shipping_company, total, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5)
      .then(({ data }) => setRecentOrders((data as RecentOrder[]) ?? []));

    // Stats
    Promise.all([
      supabase.from("orders").select("id, total"),
      supabase.from("profiles").select("id").eq("account_status", "approved"),
    ]).then(([ordersRes, clientsRes]) => {
      const totalRevenue = (ordersRes.data ?? []).reduce((sum: number, o: { total: number }) => sum + o.total, 0);
      setStats({
        orders: ordersRes.data?.length ?? 0,
        clients: clientsRes.data?.length ?? 0,
        revenue: totalRevenue,
      });
    });
  }, [isAdmin]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "#ede9e0", borderTopColor: "#e67e22" }} />
    </div>;
  }

  if (!isAdmin) return null;

  const statCards = [
    { label: "Commandes totales", value: String(stats.orders), icon: ShoppingBag, color: "#e67e22" },
    { label: "Produits actifs", value: String(PRODUCTS.filter((p) => p.is_active).length), icon: Package, color: "#18223b" },
    { label: "Clients approuvés", value: String(stats.clients), icon: Users, color: "#27ae60" },
    { label: "Revenu total", value: formatPrice(stats.revenue), icon: TrendingUp, color: "#9b59b6" },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm opacity-50 mb-1" style={{ color: "#18223b" }}>Administration</p>
            <h1 className="text-2xl font-bold" style={{ color: "#18223b" }}>Tableau de bord</h1>
          </div>
          <Link href="/" className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity" style={{ color: "#18223b" }}>
            ← Voir le site
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat) => (
            <div key={stat.label} className="rounded-2xl p-5" style={{ backgroundColor: "white" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${stat.color}15` }}>
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: "#18223b" }}>{stat.value}</p>
              <p className="text-xs opacity-60" style={{ color: "#18223b" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Commandes récentes */}
          <div className="lg:col-span-2 rounded-2xl p-6" style={{ backgroundColor: "white" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold" style={{ color: "#18223b" }}>Commandes récentes</h2>
              <Link href="/admin/clients" className="text-xs font-medium flex items-center gap-1" style={{ color: "#e67e22" }}>
                Voir clients <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-3">
              {recentOrders.length === 0 ? (
                <p className="text-sm opacity-50 text-center py-6" style={{ color: "#18223b" }}>Aucune commande</p>
              ) : recentOrders.map((order) => {
                const s = STATUS_COLORS[order.status] ?? STATUS_COLORS.pending;
                const customer = order.shipping_company || `${order.shipping_first_name} ${order.shipping_last_name}`;
                return (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: "#F7F5F0" }}>
                    <div>
                      <p className="font-semibold text-sm font-mono" style={{ color: "#18223b" }}>#{order.id.slice(0,8).toUpperCase()}</p>
                      <p className="text-xs opacity-60" style={{ color: "#18223b" }}>{customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm" style={{ color: "#18223b" }}>{formatPrice(order.total)}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: s.bg, color: s.color }}>{s.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Liens rapides */}
          <div className="rounded-2xl p-6" style={{ backgroundColor: "white" }}>
            <h2 className="font-bold mb-5" style={{ color: "#18223b" }}>Gestion rapide</h2>
            <div className="space-y-3">
              {[
                { label: "Voir les clients", href: "/admin/clients", icon: Users },
                { label: "Gérer les produits", href: "/admin/produits", icon: Package },
              ].map((item) => (
                <Link key={item.href} href={item.href}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all hover:shadow-sm hover:-translate-y-0.5"
                  style={{ backgroundColor: "#F7F5F0" }}
                >
                  <item.icon size={16} style={{ color: "#e67e22" }} />
                  <span className="text-sm font-semibold" style={{ color: "#18223b" }}>{item.label}</span>
                  <ArrowRight size={14} className="ml-auto opacity-40" style={{ color: "#18223b" }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
