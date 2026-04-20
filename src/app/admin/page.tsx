"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package, ShoppingBag, Users, TrendingUp, ArrowRight,
  Clock, CheckCircle, Truck, AlertCircle, BarChart2
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";
import { formatPrice, PRODUCTS } from "@/lib/products";
import { useAuth } from "@/contexts/AuthContext";
import { createSupabaseBrowserClient } from "@/lib/supabase";

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  subtotal: number;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_company: string | null;
  order_items: { product_name: string; variant_name: string; quantity: number; unit_price: number; total_price: number }[];
}

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string; chart: string }> = {
  pending:    { bg: "#ede9e0", color: "#18223b", label: "En attente",     chart: "#94a3b8" },
  paid:       { bg: "#d4edda", color: "#1a7a4a", label: "Payée",          chart: "#22c55e" },
  processing: { bg: "#fff3cd", color: "#856404", label: "En préparation", chart: "#f59e0b" },
  shipped:    { bg: "#d1ecf1", color: "#0c5460", label: "Expédiée",       chart: "#06b6d4" },
  delivered:  { bg: "#d4edda", color: "#1a7a4a", label: "Livrée",        chart: "#16a34a" },
  cancelled:  { bg: "#f8d7da", color: "#721c24", label: "Annulée",        chart: "#ef4444" },
};

const MONTHS_FR = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

function buildMonthlyRevenue(orders: Order[]) {
  const now = new Date();
  const months: { month: string; revenue: number; commandes: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ month: MONTHS_FR[d.getMonth()], revenue: 0, commandes: 0 });
  }
  orders.forEach((o) => {
    if (o.status === "cancelled") return;
    const d = new Date(o.created_at);
    const monthsAgo = (now.getFullYear() - d.getFullYear()) * 12 + now.getMonth() - d.getMonth();
    if (monthsAgo >= 0 && monthsAgo <= 5) {
      months[5 - monthsAgo].revenue += o.total;
      months[5 - monthsAgo].commandes += 1;
    }
  });
  return months;
}

function buildProductStats(orders: Order[]) {
  const map: Record<string, { name: string; qty: number; revenue: number }> = {};
  orders.forEach((o) => {
    if (o.status === "cancelled") return;
    (o.order_items ?? []).forEach((item) => {
      const key = item.product_name;
      if (!map[key]) map[key] = { name: item.product_name, qty: 0, revenue: 0 };
      map[key].qty += item.quantity;
      map[key].revenue += item.total_price;
    });
  });
  return Object.values(map).sort((a, b) => b.revenue - a.revenue).slice(0, 6);
}

function buildStatusPie(orders: Order[]) {
  const map: Record<string, number> = {};
  orders.forEach((o) => {
    map[o.status] = (map[o.status] ?? 0) + 1;
  });
  return Object.entries(map).map(([status, count]) => ({
    name: STATUS_COLORS[status]?.label ?? status,
    value: count,
    color: STATUS_COLORS[status]?.chart ?? "#999",
  }));
}

const CustomTooltipRevenue = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl shadow-lg px-4 py-3 text-sm" style={{ backgroundColor: "white", border: "1px solid #ede9e0" }}>
      <p className="font-bold mb-1" style={{ color: "#18223b" }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.name === "revenue" ? "#e67e22" : "#18223b" }}>
          {p.name === "revenue" ? formatPrice(p.value) : `${p.value} cmd`}
        </p>
      ))}
    </div>
  );
};

export default function AdminPage() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [clientsCount, setClientsCount] = useState({ approved: 0, pending: 0 });
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !isAdmin) router.push("/");
  }, [isAdmin, loading, router]);

  useEffect(() => {
    if (!isAdmin) return;
    const supabase = createSupabaseBrowserClient();

    Promise.all([
      supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false }),
      supabase.from("profiles").select("id, account_status"),
    ]).then(([ordersRes, profilesRes]) => {
      setOrders((ordersRes.data as Order[]) ?? []);
      const profiles = profilesRes.data ?? [];
      setClientsCount({
        approved: profiles.filter((p: { account_status: string }) => p.account_status === "approved").length,
        pending: profiles.filter((p: { account_status: string }) => p.account_status === "pending").length,
      });
      setFetching(false);
    });
  }, [isAdmin]);

  const stats = useMemo(() => {
    const active = orders.filter((o) => o.status !== "cancelled");
    const revenue = active.reduce((s, o) => s + o.total, 0);
    const now = new Date();
    const thisMonth = active.filter((o) => {
      const d = new Date(o.created_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const lastMonth = active.filter((o) => {
      const d = new Date(o.created_at);
      const prev = new Date(now.getFullYear(), now.getMonth() - 1);
      return d.getMonth() === prev.getMonth() && d.getFullYear() === prev.getFullYear();
    });
    const avgOrder = active.length ? revenue / active.length : 0;
    return {
      total: orders.length,
      revenue,
      avgOrder,
      thisMonthCount: thisMonth.length,
      lastMonthCount: lastMonth.length,
      thisMonthRevenue: thisMonth.reduce((s, o) => s + o.total, 0),
      lastMonthRevenue: lastMonth.reduce((s, o) => s + o.total, 0),
      pending: orders.filter((o) => o.status === "pending").length,
      processing: orders.filter((o) => o.status === "processing").length,
    };
  }, [orders]);

  const monthlyData = useMemo(() => buildMonthlyRevenue(orders), [orders]);
  const productStats = useMemo(() => buildProductStats(orders), [orders]);
  const statusPie = useMemo(() => buildStatusPie(orders), [orders]);
  const recentOrders = orders.slice(0, 6);

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "#ede9e0", borderTopColor: "#e67e22" }} />
      </div>
    );
  }

  if (!isAdmin) return null;

  const deltaRevenue = stats.lastMonthRevenue
    ? ((stats.thisMonthRevenue - stats.lastMonthRevenue) / stats.lastMonthRevenue) * 100
    : null;
  const deltaOrders = stats.lastMonthCount
    ? ((stats.thisMonthCount - stats.lastMonthCount) / stats.lastMonthCount) * 100
    : null;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-40 mb-1" style={{ color: "#18223b" }}>Administration</p>
            <h1 className="text-2xl font-bold" style={{ color: "#18223b" }}>Tableau de bord</h1>
          </div>
          <Link href="/" className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity" style={{ color: "#18223b" }}>
            ← Voir le site
          </Link>
        </div>

        {/* Alertes */}
        {(stats.pending > 0 || clientsCount.pending > 0) && (
          <div className="flex flex-wrap gap-3 mb-6">
            {stats.pending > 0 && (
              <Link href="/admin/commandes" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-80" style={{ backgroundColor: "#fff3cd", color: "#856404" }}>
                <Clock size={14} /> {stats.pending} commande{stats.pending > 1 ? "s" : ""} en attente
              </Link>
            )}
            {stats.processing > 0 && (
              <Link href="/admin/commandes" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-80" style={{ backgroundColor: "#d1ecf1", color: "#0c5460" }}>
                <Truck size={14} /> {stats.processing} en préparation
              </Link>
            )}
            {clientsCount.pending > 0 && (
              <Link href="/admin/clients" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-80" style={{ backgroundColor: "#e67e2215", color: "#e67e22" }}>
                <AlertCircle size={14} /> {clientsCount.pending} client{clientsCount.pending > 1 ? "s" : ""} à approuver
              </Link>
            )}
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: "Revenu total",
              value: formatPrice(stats.revenue),
              sub: `Ce mois : ${formatPrice(stats.thisMonthRevenue)}`,
              delta: deltaRevenue,
              icon: TrendingUp,
              color: "#e67e22",
            },
            {
              label: "Commandes",
              value: String(stats.total),
              sub: `Ce mois : ${stats.thisMonthCount}`,
              delta: deltaOrders,
              icon: ShoppingBag,
              color: "#18223b",
            },
            {
              label: "Panier moyen",
              value: formatPrice(stats.avgOrder),
              sub: `${stats.total} commandes actives`,
              delta: null,
              icon: BarChart2,
              color: "#9b59b6",
            },
            {
              label: "Clients approuvés",
              value: String(clientsCount.approved),
              sub: `${clientsCount.pending} en attente`,
              delta: null,
              icon: Users,
              color: "#27ae60",
            },
          ].map((card) => (
            <div key={card.label} className="rounded-2xl p-5" style={{ backgroundColor: "white" }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${card.color}15` }}>
                  <card.icon size={20} style={{ color: card.color }} />
                </div>
                {card.delta !== null && (
                  <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{
                    backgroundColor: card.delta >= 0 ? "#d4edda" : "#f8d7da",
                    color: card.delta >= 0 ? "#1a7a4a" : "#721c24",
                  }}>
                    {card.delta >= 0 ? "+" : ""}{card.delta.toFixed(0)}%
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: "#18223b" }}>{card.value}</p>
              <p className="text-xs opacity-50" style={{ color: "#18223b" }}>{card.label}</p>
              <p className="text-xs mt-1 font-medium opacity-60" style={{ color: "#18223b" }}>{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Revenue chart (2/3) */}
          <div className="lg:col-span-2 rounded-2xl p-6" style={{ backgroundColor: "white" }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-bold" style={{ color: "#18223b" }}>Chiffre d&apos;affaires</h2>
                <p className="text-xs opacity-50 mt-0.5" style={{ color: "#18223b" }}>6 derniers mois (hors annulées)</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ede8" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#18223b", opacity: 0.5 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#18223b", opacity: 0.4 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}€`} width={48} />
                <Tooltip content={<CustomTooltipRevenue />} />
                <Bar dataKey="revenue" name="revenue" fill="#e67e22" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Status pie (1/3) */}
          <div className="rounded-2xl p-6" style={{ backgroundColor: "white" }}>
            <h2 className="font-bold mb-1" style={{ color: "#18223b" }}>Statuts</h2>
            <p className="text-xs opacity-50 mb-4" style={{ color: "#18223b" }}>Répartition des commandes</p>
            {statusPie.length === 0 ? (
              <div className="flex items-center justify-center h-[160px]">
                <p className="text-sm opacity-40" style={{ color: "#18223b" }}>Aucune donnée</p>
              </div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={statusPie} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                      {statusPie.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => [`${v} cmd`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-1.5 mt-3">
                  {statusPie.map((s) => (
                    <div key={s.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                        <span style={{ color: "#18223b" }} className="opacity-70">{s.name}</span>
                      </div>
                      <span className="font-bold" style={{ color: "#18223b" }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Orders volume line + Top products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Orders line chart */}
          <div className="rounded-2xl p-6" style={{ backgroundColor: "white" }}>
            <h2 className="font-bold mb-1" style={{ color: "#18223b" }}>Volume de commandes</h2>
            <p className="text-xs opacity-50 mb-4" style={{ color: "#18223b" }}>6 derniers mois</p>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ede8" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#18223b", opacity: 0.5 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#18223b", opacity: 0.4 }} axisLine={false} tickLine={false} allowDecimals={false} width={24} />
                <Tooltip formatter={(v: number) => [`${v} commandes`, ""]} />
                <Line type="monotone" dataKey="commandes" stroke="#18223b" strokeWidth={2.5} dot={{ fill: "#18223b", r: 4 }} activeDot={{ r: 6, fill: "#e67e22" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top products (2/3) */}
          <div className="lg:col-span-2 rounded-2xl p-6" style={{ backgroundColor: "white" }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-bold" style={{ color: "#18223b" }}>Top produits</h2>
                <p className="text-xs opacity-50 mt-0.5" style={{ color: "#18223b" }}>Par chiffre d&apos;affaires généré</p>
              </div>
            </div>
            {productStats.length === 0 ? (
              <p className="text-sm opacity-40 text-center py-8" style={{ color: "#18223b" }}>Aucune vente enregistrée</p>
            ) : (
              <div className="space-y-3">
                {productStats.map((p, i) => {
                  const maxRevenue = productStats[0].revenue;
                  const pct = maxRevenue > 0 ? (p.revenue / maxRevenue) * 100 : 0;
                  return (
                    <div key={p.name}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold w-5 text-center opacity-30" style={{ color: "#18223b" }}>#{i + 1}</span>
                          <span className="text-sm font-semibold truncate max-w-[180px]" style={{ color: "#18223b" }}>{p.name}</span>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0">
                          <span className="text-xs opacity-50" style={{ color: "#18223b" }}>{p.qty} unités</span>
                          <span className="text-sm font-bold" style={{ color: "#18223b" }}>{formatPrice(p.revenue)}</span>
                        </div>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ backgroundColor: "#F7F5F0" }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: i === 0 ? "#e67e22" : "#18223b" + "60" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom row: Recent orders + Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Commandes récentes */}
          <div className="lg:col-span-2 rounded-2xl p-6" style={{ backgroundColor: "white" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold" style={{ color: "#18223b" }}>Dernières commandes</h2>
              <Link href="/admin/commandes" className="text-xs font-semibold flex items-center gap-1 transition-opacity hover:opacity-70" style={{ color: "#e67e22" }}>
                Tout voir <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-2">
              {recentOrders.length === 0 ? (
                <p className="text-sm opacity-50 text-center py-8" style={{ color: "#18223b" }}>Aucune commande</p>
              ) : recentOrders.map((order) => {
                const s = STATUS_COLORS[order.status] ?? STATUS_COLORS.pending;
                const customer = order.shipping_company || `${order.shipping_first_name} ${order.shipping_last_name}`;
                const d = new Date(order.created_at);
                return (
                  <Link key={order.id} href="/admin/commandes"
                    className="flex items-center justify-between p-3 rounded-xl transition-colors hover:opacity-80"
                    style={{ backgroundColor: "#F7F5F0" }}>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-bold text-xs font-mono" style={{ color: "#18223b" }}>#{order.id.slice(0, 8).toUpperCase()}</p>
                        <p className="text-xs opacity-60" style={{ color: "#18223b" }}>{customer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs opacity-40 hidden sm:block" style={{ color: "#18223b" }}>
                        {d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: s.bg, color: s.color }}>{s.label}</span>
                      <span className="font-bold text-sm" style={{ color: "#18223b" }}>{formatPrice(order.total)}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navigation rapide */}
          <div className="rounded-2xl p-6" style={{ backgroundColor: "white" }}>
            <h2 className="font-bold mb-5" style={{ color: "#18223b" }}>Navigation</h2>
            <div className="space-y-2">
              {[
                { label: "Commandes", sub: `${stats.total} au total`, href: "/admin/commandes", icon: ShoppingBag, badge: stats.pending || null, badgeColor: "#856404", badgeBg: "#fff3cd" },
                { label: "Clients", sub: `${clientsCount.approved} approuvés`, href: "/admin/clients", icon: Users, badge: clientsCount.pending || null, badgeColor: "#e67e22", badgeBg: "#e67e2215" },
                { label: "Produits", sub: `${PRODUCTS.filter((p) => p.is_active).length} actifs`, href: "/admin/produits", icon: Package, badge: null, badgeColor: "", badgeBg: "" },
              ].map((item) => (
                <Link key={item.href} href={item.href}
                  className="flex items-center gap-3 p-3.5 rounded-xl transition-all hover:shadow-sm hover:-translate-y-0.5"
                  style={{ backgroundColor: "#F7F5F0" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#18223b15" }}>
                    <item.icon size={16} style={{ color: "#18223b" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold" style={{ color: "#18223b" }}>{item.label}</p>
                    <p className="text-xs opacity-50" style={{ color: "#18223b" }}>{item.sub}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge ? (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: item.badgeBg, color: item.badgeColor }}>
                        {item.badge}
                      </span>
                    ) : null}
                    <ArrowRight size={14} className="opacity-30" style={{ color: "#18223b" }} />
                  </div>
                </Link>
              ))}
            </div>

            {/* Produits actifs mini-liste */}
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider opacity-40 mb-3" style={{ color: "#18223b" }}>Catalogue actif</p>
              <div className="space-y-1.5">
                {PRODUCTS.filter((p) => p.is_active).slice(0, 4).map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-xs">
                    <span className="opacity-70 truncate max-w-[140px]" style={{ color: "#18223b" }}>{p.name}</span>
                    <div className="flex items-center gap-1">
                      <CheckCircle size={11} style={{ color: "#27ae60" }} />
                    </div>
                  </div>
                ))}
                {PRODUCTS.filter((p) => p.is_active).length > 4 && (
                  <p className="text-xs opacity-40" style={{ color: "#18223b" }}>+{PRODUCTS.filter((p) => p.is_active).length - 4} autres</p>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
