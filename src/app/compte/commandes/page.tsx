"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  ChevronDown,
  ArrowLeft,
  ShoppingCart,
  MapPin,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { formatPrice } from "@/lib/products";
import { useAuth } from "@/contexts/AuthContext";
import { useCartStore } from "@/store/cartStore";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { PRODUCTS } from "@/lib/products";

interface OrderItem {
  product_id: string;
  product_name: string;
  variant_name: string;
  variant_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  items: OrderItem[];
  shipping_address?: {
    company?: string;
    first_name: string;
    last_name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    postal_code: string;
    country: string;
  };
  order_items: Array<{
    product_name: string;
    variant_name: string;
    quantity: number;
    unit_price: number;
  }>;
}

const STATUS_CONFIG = {
  pending: {
    label: "En attente",
    color: "#18223b",
    bg: "#ede9e0",
    icon: Clock,
    step: 1,
  },
  paid: { label: "Payée", color: "#1a7a4a", bg: "#d4edda", icon: CheckCircle, step: 2 },
  processing: {
    label: "En préparation",
    color: "#856404",
    bg: "#fff3cd",
    icon: Package,
    step: 3,
  },
  shipped: {
    label: "Expédiée",
    color: "#0c5460",
    bg: "#d1ecf1",
    icon: Truck,
    step: 4,
  },
  delivered: {
    label: "Livrée",
    color: "#1a7a4a",
    bg: "#d4edda",
    icon: CheckCircle,
    step: 5,
  },
  cancelled: {
    label: "Annulée",
    color: "#721c24",
    bg: "#f8d7da",
    icon: XCircle,
    step: 0,
  },
};

export default function CommandesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [recommandeLoading, setRecommandeLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const supabase = createSupabaseBrowserClient();
    supabase
      .from("orders")
      .select(`
        id,
        created_at,
        status,
        total,
        shipping_address,
        order_items(
          product_id,
          product_name,
          variant_id,
          variant_name,
          quantity,
          unit_price,
          total_price
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error("Erreur chargement commandes:", error);
          setOrdersLoading(false);
          return;
        }
        const ordersData = (data || []).map((order: any) => ({
          ...order,
          items: order.order_items || [],
        }));
        setOrders(ordersData as Order[]);
        setOrdersLoading(false);
      });
  }, [user]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const handleRecommande = async (order: Order) => {
    setRecommandeLoading(order.id);
    try {
      // Pour chaque article de la commande, ajouter au panier
      for (const item of order.items) {
        // Trouver le produit par ID
        const product = PRODUCTS.find((p) => p.id === item.product_id);
        if (!product) {
          console.warn(`Produit ${item.product_id} non trouvé`);
          continue;
        }

        // Trouver la variante par ID
        const variant = product.variants.find((v) => v.id === item.variant_id);
        if (!variant) {
          console.warn(`Variante ${item.variant_id} non trouvée`);
          continue;
        }

        // Ajouter au panier
        addItem(product, variant, item.quantity);
      }

      // Rediriger vers le panier
      router.push("/panier");
    } finally {
      setRecommandeLoading(null);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F5F0" }}>
        <div
          className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: "#e67e22" }}
        />
      </div>
    );
  }

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

        {ordersLoading ? (
          <div className="flex justify-center py-16">
            <div
              className="w-8 h-8 border-2 border-t-orange-400 rounded-full animate-spin"
              style={{ borderColor: "#ede9e0", borderTopColor: "#e67e22" }}
            />
          </div>
        ) : orders.length === 0 ? (
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
            {orders.map((order) => {
              const status = (STATUS_CONFIG as any)[order.status] || STATUS_CONFIG.pending;
              const isExpanded = expandedOrderId === order.id;

              return (
                <div key={order.id} className="rounded-2xl overflow-hidden" style={{ backgroundColor: "white" }}>
                  {/* En-tête cliquable */}
                  <button
                    onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                    className="w-full flex items-start justify-between p-6 hover:opacity-80 transition-opacity text-left"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold font-mono text-sm" style={{ color: "#18223b" }}>
                          #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <span
                          className="text-xs font-bold px-3 py-1 rounded-full"
                          style={{ backgroundColor: status.bg, color: status.color }}
                        >
                          {status.label}
                        </span>
                      </div>
                      <p className="text-sm opacity-60 mb-3" style={{ color: "#18223b" }}>
                        {formatDate(order.created_at)}
                      </p>

                      {/* Résumé des articles */}
                      <p className="text-sm opacity-70" style={{ color: "#18223b" }}>
                        {order.items.length} article{order.items.length > 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="text-right ml-4">
                      <p className="font-bold text-lg mb-3" style={{ color: "#18223b" }}>
                        {formatPrice(order.total)}
                      </p>
                      <ChevronDown
                        size={20}
                        style={{
                          color: "#e67e22",
                          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </div>
                  </button>

                  {/* Détail expandable */}
                  {isExpanded && (
                    <div
                      className="border-t px-6 py-6 space-y-6"
                      style={{ borderColor: "#ede9e0" }}
                    >
                      {/* Barre de progression du statut */}
                      {order.status !== "cancelled" && (
                        <div>
                          <p className="text-xs font-bold mb-3 opacity-60" style={{ color: "#18223b" }}>
                            PROGRESSION
                          </p>
                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((step) => {
                              const isCompleted = status.step >= step;
                              const isCurrent = status.step === step;
                              return (
                                <div key={step} className="flex-1 flex flex-col items-center gap-2">
                                  <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                                    style={{
                                      backgroundColor: isCompleted ? "#e67e22" : "#F7F5F0",
                                      color: isCompleted ? "white" : "#18223b",
                                      border: isCurrent ? "2px solid #e67e22" : "none",
                                    }}
                                  >
                                    {step}
                                  </div>
                                  <span className="text-xs opacity-50 text-center" style={{ color: "#18223b" }}>
                                    {step === 1 && "En attente"}
                                    {step === 2 && "Payée"}
                                    {step === 3 && "Prépa"}
                                    {step === 4 && "Expédiée"}
                                    {step === 5 && "Livrée"}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Articles de la commande */}
                      <div>
                        <p className="text-xs font-bold mb-3 opacity-60" style={{ color: "#18223b" }}>
                          ARTICLES ({order.items.length})
                        </p>
                        <div className="space-y-2">
                          {order.items.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-start justify-between p-3 rounded-lg"
                              style={{ backgroundColor: "#F7F5F0" }}
                            >
                              <div className="flex-1">
                                <p className="font-semibold text-sm" style={{ color: "#18223b" }}>
                                  {item.product_name}
                                </p>
                                <p className="text-xs opacity-60" style={{ color: "#18223b" }}>
                                  {item.variant_name} × {item.quantity}
                                </p>
                              </div>
                              <div className="text-right ml-4">
                                <p className="text-xs opacity-60" style={{ color: "#18223b" }}>
                                  {formatPrice(item.unit_price)} / unité
                                </p>
                                <p className="font-bold text-sm" style={{ color: "#18223b" }}>
                                  {formatPrice(item.total_price)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Adresse de livraison */}
                      {order.shipping_address && (
                        <div>
                          <p className="text-xs font-bold mb-3 opacity-60" style={{ color: "#18223b" }}>
                            ADRESSE DE LIVRAISON
                          </p>
                          <div className="p-3 rounded-lg" style={{ backgroundColor: "#F7F5F0" }}>
                            <div className="flex items-start gap-3">
                              <MapPin size={16} className="opacity-40 mt-0.5 flex-shrink-0" />
                              <div className="text-sm" style={{ color: "#18223b" }}>
                                {order.shipping_address.company && (
                                  <p className="font-semibold">{order.shipping_address.company}</p>
                                )}
                                <p>
                                  {order.shipping_address.first_name} {order.shipping_address.last_name}
                                </p>
                                <p className="opacity-60">
                                  {order.shipping_address.address_line1}
                                </p>
                                {order.shipping_address.address_line2 && (
                                  <p className="opacity-60">{order.shipping_address.address_line2}</p>
                                )}
                                <p className="opacity-60">
                                  {order.shipping_address.postal_code} {order.shipping_address.city}
                                </p>
                                <p className="opacity-60">{order.shipping_address.country}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bouton Re-commander */}
                      <button
                        onClick={() => handleRecommande(order)}
                        disabled={recommandeLoading === order.id}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-opacity hover:opacity-80 disabled:opacity-50"
                        style={{ backgroundColor: "#e67e22", color: "white" }}
                      >
                        <ShoppingCart size={16} />
                        {recommandeLoading === order.id ? "Ajout en cours..." : "Re-commander"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
