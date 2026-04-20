"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, ChevronDown, ChevronUp, Package } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { formatPrice } from "@/lib/products";

interface OrderItem {
  product_name: string;
  variant_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  subtotal: number;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_company: string | null;
  shipping_email: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string;
  shipping_country: string;
  notes: string | null;
  order_items: OrderItem[];
}

const STATUSES: { value: string; label: string; color: string; bg: string }[] = [
  { value: "pending",    label: "En attente",      color: "#18223b", bg: "#ede9e0" },
  { value: "paid",       label: "Payée",            color: "#1a7a4a", bg: "#d4edda" },
  { value: "processing", label: "En préparation",  color: "#856404", bg: "#fff3cd" },
  { value: "shipped",    label: "Expédiée",         color: "#0c5460", bg: "#d1ecf1" },
  { value: "delivered",  label: "Livrée ✓",        color: "#1a7a4a", bg: "#d4edda" },
  { value: "cancelled",  label: "Annulée",          color: "#721c24", bg: "#f8d7da" },
];

const statusMap = Object.fromEntries(STATUSES.map((s) => [s.value, s]));

export default function AdminCommandesPage() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !isAdmin) router.push("/");
  }, [isAdmin, loading, router]);

  useEffect(() => {
    if (!isAdmin) return;
    const supabase = createSupabaseBrowserClient();
    supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setOrders((data as Order[]) ?? []);
        setFetching(false);
      });
  }, [isAdmin]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    const supabase = createSupabaseBrowserClient();
    await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
    setUpdatingId(null);
  };

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      o.id.toLowerCase().includes(q) ||
      `${o.shipping_first_name} ${o.shipping_last_name}`.toLowerCase().includes(q) ||
      (o.shipping_company ?? "").toLowerCase().includes(q) ||
      o.shipping_email.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "#ede9e0", borderTopColor: "#e67e22" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="max-w-7xl mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-medium mb-6 opacity-60 hover:opacity-100" style={{ color: "#18223b" }}>
          <ArrowLeft size={16} /> Admin
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#18223b" }}>Commandes</h1>
            <p className="text-sm opacity-50 mt-1" style={{ color: "#18223b" }}>{orders.length} commande{orders.length > 1 ? "s" : ""} au total</p>
          </div>
          <div className="flex gap-2">
            {["pending", "processing"].map((s) => {
              const count = orders.filter((o) => o.status === s).length;
              if (!count) return null;
              const cfg = statusMap[s];
              return (
                <span key={s} className="text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer" style={{ backgroundColor: cfg.bg, color: cfg.color }} onClick={() => setFilterStatus(s)}>
                  {count} {cfg.label.toLowerCase()}
                </span>
              );
            })}
          </div>
        </div>

        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" style={{ color: "#18223b" }} />
            <input
              placeholder="Rechercher par client, email, référence..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ backgroundColor: "white", border: "1.5px solid #ede9e0", color: "#18223b" }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[{ value: "all", label: "Toutes" }, ...STATUSES].map((s) => (
              <button key={s.value} onClick={() => setFilterStatus(s.value)}
                className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                style={{
                  backgroundColor: filterStatus === s.value ? "#18223b" : "white",
                  color: filterStatus === s.value ? "white" : "#18223b",
                  border: `1.5px solid ${filterStatus === s.value ? "#18223b" : "#ede9e0"}`,
                }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Liste */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 rounded-2xl" style={{ backgroundColor: "white" }}>
              <Package size={40} className="mx-auto mb-3 opacity-20" style={{ color: "#18223b" }} />
              <p className="text-sm opacity-50" style={{ color: "#18223b" }}>Aucune commande trouvée</p>
            </div>
          ) : filtered.map((order) => {
            const s = statusMap[order.status] ?? statusMap.pending;
            const isExpanded = expandedId === order.id;
            const customer = order.shipping_company || `${order.shipping_first_name} ${order.shipping_last_name}`;

            return (
              <div key={order.id} className="rounded-2xl overflow-hidden" style={{ backgroundColor: "white" }}>
                {/* Ligne principale */}
                <div className="p-5 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="font-bold font-mono text-sm" style={{ color: "#18223b" }}>#{order.id.slice(0, 8).toUpperCase()}</span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: s.bg, color: s.color }}>{s.label}</span>
                    </div>
                    <p className="text-sm font-semibold truncate" style={{ color: "#18223b" }}>{customer}</p>
                    <p className="text-xs opacity-50" style={{ color: "#18223b" }}>{order.shipping_email} · {formatDate(order.created_at)}</p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-lg" style={{ color: "#18223b" }}>{formatPrice(order.total)}</p>
                    <p className="text-xs opacity-50" style={{ color: "#18223b" }}>{order.order_items?.length ?? 0} article{(order.order_items?.length ?? 0) > 1 ? "s" : ""}</p>
                  </div>

                  {/* Changer statut */}
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    disabled={updatingId === order.id}
                    className="px-3 py-2 rounded-xl text-xs font-semibold outline-none cursor-pointer flex-shrink-0"
                    style={{ backgroundColor: s.bg, color: s.color, border: "none" }}
                  >
                    {STATUSES.map((st) => <option key={st.value} value={st.value}>{st.label}</option>)}
                  </select>

                  <button onClick={() => setExpandedId(isExpanded ? null : order.id)} className="p-2 rounded-xl flex-shrink-0 transition-colors hover:opacity-70" style={{ backgroundColor: "#F7F5F0", color: "#18223b" }}>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>

                {/* Détail expandable */}
                {isExpanded && (
                  <div className="border-t px-5 pb-5 pt-4" style={{ borderColor: "#F7F5F0" }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Articles */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider opacity-50 mb-3" style={{ color: "#18223b" }}>Articles</h3>
                        <div className="space-y-2">
                          {order.order_items?.map((item, i) => (
                            <div key={i} className="flex justify-between text-sm" style={{ color: "#18223b" }}>
                              <span className="opacity-80">{item.product_name} — {item.variant_name} × {item.quantity}</span>
                              <span className="font-semibold flex-shrink-0 ml-4">{formatPrice(item.total_price)}</span>
                            </div>
                          ))}
                          <div className="flex justify-between text-sm font-bold pt-2 border-t" style={{ borderColor: "#ede9e0", color: "#18223b" }}>
                            <span>Total</span>
                            <span>{formatPrice(order.total)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Livraison */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider opacity-50 mb-3" style={{ color: "#18223b" }}>Livraison</h3>
                        <div className="text-sm space-y-1" style={{ color: "#18223b" }}>
                          <p className="font-semibold">{order.shipping_first_name} {order.shipping_last_name}</p>
                          {order.shipping_company && <p className="opacity-70">{order.shipping_company}</p>}
                          <p className="opacity-70">{order.shipping_address}</p>
                          <p className="opacity-70">{order.shipping_postal_code} {order.shipping_city}, {order.shipping_country}</p>
                          <p className="opacity-70">{order.shipping_email}</p>
                          <p className="opacity-70">{order.shipping_phone}</p>
                          {order.notes && <p className="mt-2 p-2 rounded-lg text-xs italic opacity-60" style={{ backgroundColor: "#F7F5F0" }}>📝 {order.notes}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
