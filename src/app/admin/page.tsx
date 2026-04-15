import Link from "next/link";
import { Package, ShoppingBag, Users, TrendingUp, ArrowRight } from "lucide-react";
import { formatPrice, PRODUCTS } from "@/lib/products";

// Mock stats
const stats = [
  { label: "Commandes totales", value: "147", icon: ShoppingBag, color: "#e67e22" },
  { label: "Produits actifs", value: String(PRODUCTS.filter((p) => p.is_active).length), icon: Package, color: "#18223b" },
  { label: "Clients", value: "89", icon: Users, color: "#27ae60" },
  { label: "Revenu ce mois", value: formatPrice(284500), icon: TrendingUp, color: "#9b59b6" },
];

const recentOrders = [
  { id: "CMD-2025-001", customer: "Hôtel Lumière Paris", total: 12990, status: "paid", date: "Aujourd'hui" },
  { id: "CMD-2025-002", customer: "Marie-Claire D.", total: 4990, status: "shipped", date: "Hier" },
  { id: "CMD-2025-003", customer: "Conciergerie Sud", total: 31500, status: "processing", date: "Il y a 2j" },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm opacity-50 mb-1" style={{ color: "#18223b" }}>
              Administration
            </p>
            <h1 className="text-2xl font-bold" style={{ color: "#18223b" }}>
              Tableau de bord
            </h1>
          </div>
          <Link
            href="/"
            className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: "#18223b" }}
          >
            ← Voir le site
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-5"
              style={{ backgroundColor: "white" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: "#18223b" }}>
                {stat.value}
              </p>
              <p className="text-xs opacity-60" style={{ color: "#18223b" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Commandes récentes */}
          <div className="lg:col-span-2 rounded-2xl p-6" style={{ backgroundColor: "white" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold" style={{ color: "#18223b" }}>
                Commandes récentes
              </h2>
              <Link
                href="/admin/commandes"
                className="text-xs font-medium flex items-center gap-1"
                style={{ color: "#e67e22" }}
              >
                Voir tout <ArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ backgroundColor: "#F7F5F0" }}
                >
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#18223b" }}>
                      {order.id}
                    </p>
                    <p className="text-xs opacity-60" style={{ color: "#18223b" }}>
                      {order.customer} · {order.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm" style={{ color: "#18223b" }}>
                      {formatPrice(order.total)}
                    </p>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: order.status === "paid" ? "#d4edda" : order.status === "shipped" ? "#d1ecf1" : "#fff3cd",
                        color: order.status === "paid" ? "#1a7a4a" : order.status === "shipped" ? "#0c5460" : "#856404",
                      }}
                    >
                      {order.status === "paid" ? "Payée" : order.status === "shipped" ? "Expédiée" : "En préparation"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Liens rapides */}
          <div className="rounded-2xl p-6" style={{ backgroundColor: "white" }}>
            <h2 className="font-bold mb-5" style={{ color: "#18223b" }}>
              Gestion rapide
            </h2>
            <div className="space-y-3">
              {[
                { label: "Gérer les commandes", href: "/admin/commandes", icon: ShoppingBag },
                { label: "Gérer les produits", href: "/admin/produits", icon: Package },
                { label: "Voir les clients", href: "/admin/clients", icon: Users },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all hover:shadow-sm hover:-translate-y-0.5"
                  style={{ backgroundColor: "#F7F5F0" }}
                >
                  <item.icon size={16} style={{ color: "#e67e22" }} />
                  <span className="text-sm font-semibold" style={{ color: "#18223b" }}>
                    {item.label}
                  </span>
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
