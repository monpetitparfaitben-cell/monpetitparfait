"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Package,
  FileText,
  LogOut,
  Building2,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  Edit2,
  X,
  Save,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { formatPrice } from "@/lib/products";

interface OrderPreview {
  id: string;
  created_at: string;
  status: string;
  total: number;
  order_items: Array<{
    product_name: string;
    variant_name: string;
    quantity: number;
  }>;
}

export default function ComptePage() {
  const { user, profile, contract, loading, signOut, isApproved, refreshProfile } = useAuth();
  const router = useRouter();
  const [recentOrders, setRecentOrders] = useState<OrderPreview[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // State pour édition inline
  const [isEditing, setIsEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    postal_code: "",
  });

  // Initialiser formData au montage
  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
        company: profile.company || "",
        address: profile.address || "",
        city: profile.city || "",
        postal_code: profile.postal_code || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  // Charger les 3 dernières commandes
  useEffect(() => {
    if (!user) return;
    const supabase = createSupabaseBrowserClient();
    supabase
      .from("orders")
      .select("id, created_at, status, total, order_items(product_name, variant_name, quantity)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) => {
        setRecentOrders((data as OrderPreview[]) ?? []);
        setOrdersLoading(false);
      });
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setEditLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: formData.first_name || null,
          last_name: formData.last_name || null,
          phone: formData.phone || null,
          company: formData.company || null,
          address: formData.address || null,
          city: formData.city || null,
          postal_code: formData.postal_code || null,
        })
        .eq("id", user.id);

      if (error) {
        console.error("Erreur sauvegarde:", error);
        return;
      }

      await refreshProfile();
      setIsEditing(false);
    } catch (err) {
      console.error("Erreur:", err);
    } finally {
      setEditLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  if (loading || !user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#e67e22" }} />
      </div>
    );
  }

  const displayName = profile.first_name
    ? `${profile.first_name} ${profile.last_name ?? ""}`
    : profile.email;

  const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
    pending: { label: "En attente", color: "#18223b", bg: "#ede9e0" },
    paid: { label: "Payée", color: "#1a7a4a", bg: "#d4edda" },
    processing: { label: "En préparation", color: "#856404", bg: "#fff3cd" },
    shipped: { label: "Expédiée", color: "#0c5460", bg: "#d1ecf1" },
    delivered: { label: "Livrée ✓", color: "#1a7a4a", bg: "#d4edda" },
    cancelled: { label: "Annulée", color: "#721c24", bg: "#f8d7da" },
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header compte */}
        <div className="rounded-2xl p-6 flex items-center justify-between" style={{ backgroundColor: "#18223b" }}>
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white"
              style={{ backgroundColor: "#e67e22" }}
            >
              {(profile.first_name?.[0] ?? profile.email[0]).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-bold text-lg">{displayName}</p>
              {profile.company && (
                <p className="text-white opacity-60 text-sm flex items-center gap-1.5">
                  <Building2 size={12} /> {profile.company}
                </p>
              )}
            </div>
          </div>
          {isApproved ? (
            <span
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "#27ae6030", color: "#27ae60" }}
            >
              <CheckCircle size={12} /> Compte approuvé
            </span>
          ) : (
            <span
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "#e67e2230", color: "#e67e22" }}
            >
              <Clock size={12} /> En attente
            </span>
          )}
        </div>

        {/* Alerte compte en attente */}
        {!isApproved && (
          <div
            className="rounded-2xl p-5 flex items-start gap-4"
            style={{ backgroundColor: "#e67e2210", border: "1.5px solid #e67e2230" }}
          >
            <Clock size={20} style={{ color: "#e67e22", flexShrink: 0 }} />
            <div>
              <p className="font-bold text-sm mb-1" style={{ color: "#18223b" }}>
                Votre compte est en cours de validation
              </p>
              <p className="text-sm opacity-70" style={{ color: "#18223b" }}>
                Notre équipe valide votre accès et prépare votre contrat avec vos tarifs personnalisés. Vous serez notifié par email sous 24h.
              </p>
            </div>
          </div>
        )}

        {/* Contrat actif */}
        {contract && (
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: "white", border: "2px solid #e67e2220" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#e67e2215" }}>
                  <span className="text-lg">🤝</span>
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "#18223b" }}>
                    {contract.name}
                  </p>
                  <p className="text-xs opacity-60" style={{ color: "#18223b" }}>
                    {contract.valid_to
                      ? `Valide jusqu'au ${new Date(contract.valid_to).toLocaleDateString("fr-FR")}`
                      : "Contrat sans date d'expiration"}
                  </p>
                </div>
              </div>
              <Link
                href="/compte/mon-contrat"
                className="text-xs font-bold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#e67e22", color: "white" }}
              >
                Voir mes prix
              </Link>
            </div>
          </div>
        )}

        {/* Infos personnelles - ÉDITION INLINE */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: "white" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold" style={{ color: "#18223b" }}>
              Mes informations
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#e67e22", color: "white" }}
              >
                <Edit2 size={12} /> Modifier
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Prénom"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="px-4 py-3 rounded-lg text-sm"
                  style={{ backgroundColor: "#F7F5F0", color: "#18223b", border: "1px solid #ede9e0" }}
                />
                <input
                  type="text"
                  placeholder="Nom"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="px-4 py-3 rounded-lg text-sm"
                  style={{ backgroundColor: "#F7F5F0", color: "#18223b", border: "1px solid #ede9e0" }}
                />
              </div>

              <input
                type="tel"
                placeholder="Téléphone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg text-sm"
                style={{ backgroundColor: "#F7F5F0", color: "#18223b", border: "1px solid #ede9e0" }}
              />

              <input
                type="text"
                placeholder="Entreprise"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 rounded-lg text-sm"
                style={{ backgroundColor: "#F7F5F0", color: "#18223b", border: "1px solid #ede9e0" }}
              />

              <input
                type="text"
                placeholder="Adresse"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 rounded-lg text-sm"
                style={{ backgroundColor: "#F7F5F0", color: "#18223b", border: "1px solid #ede9e0" }}
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Ville"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="px-4 py-3 rounded-lg text-sm"
                  style={{ backgroundColor: "#F7F5F0", color: "#18223b", border: "1px solid #ede9e0" }}
                />
                <input
                  type="text"
                  placeholder="Code postal"
                  value={formData.postal_code}
                  onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                  className="px-4 py-3 rounded-lg text-sm"
                  style={{ backgroundColor: "#F7F5F0", color: "#18223b", border: "1px solid #ede9e0" }}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSaveProfile}
                  disabled={editLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-opacity hover:opacity-80 disabled:opacity-50"
                  style={{ backgroundColor: "#e67e22", color: "white" }}
                >
                  <Save size={16} /> {editLoading ? "Enregistrement..." : "Enregistrer"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  disabled={editLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "#F7F5F0", color: "#18223b", border: "1px solid #ede9e0" }}
                >
                  <X size={16} /> Annuler
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {(profile.first_name || profile.last_name) && (
                <div className="flex items-center gap-3 text-sm" style={{ color: "#18223b" }}>
                  <span className="opacity-40 w-6">👤</span>
                  <span>
                    {profile.first_name} {profile.last_name}
                  </span>
                </div>
              )}
              {profile.phone && (
                <div className="flex items-center gap-3 text-sm" style={{ color: "#18223b" }}>
                  <Phone size={16} className="opacity-40" />
                  <span>{profile.phone}</span>
                </div>
              )}
              {profile.company && (
                <div className="flex items-center gap-3 text-sm" style={{ color: "#18223b" }}>
                  <Building2 size={16} className="opacity-40" />
                  <span>{profile.company}</span>
                </div>
              )}
              {profile.address && (
                <div className="flex items-center gap-3 text-sm" style={{ color: "#18223b" }}>
                  <span className="opacity-40 w-6">📍</span>
                  <span>
                    {profile.address}
                    {profile.city && `, ${profile.city}`}
                    {profile.postal_code && ` ${profile.postal_code}`}
                  </span>
                </div>
              )}
              {!profile.phone && !profile.company && !profile.address && (
                <p className="text-sm opacity-60" style={{ color: "#18223b" }}>
                  <Mail size={16} className="inline opacity-40 mr-3" />
                  {profile.email}
                </p>
              )}
              <div className="flex items-center gap-3 text-sm" style={{ color: "#18223b" }}>
                <Mail size={16} className="opacity-40" />
                <span>{profile.email}</span>
              </div>
            </div>
          )}
        </div>

        {/* Aperçu des 3 dernières commandes */}
        {!ordersLoading && recentOrders.length > 0 && (
          <div className="rounded-2xl p-6" style={{ backgroundColor: "white" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold" style={{ color: "#18223b" }}>
                Mes 3 dernières commandes
              </h2>
              <Link
                href="/compte/commandes"
                className="text-xs font-semibold opacity-60 hover:opacity-100 transition-opacity"
                style={{ color: "#e67e22" }}
              >
                Voir tout
              </Link>
            </div>

            <div className="space-y-3">
              {recentOrders.map((order) => {
                const status = STATUS_LABELS[order.status] || STATUS_LABELS.pending;
                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: "#F7F5F0" }}
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-sm" style={{ color: "#18223b" }}>
                        #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p className="text-xs opacity-60" style={{ color: "#18223b" }}>
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm" style={{ color: "#18223b" }}>
                        {formatPrice(order.total)}
                      </p>
                      <span
                        className="text-xs font-bold px-2 py-1 rounded-full inline-block"
                        style={{ backgroundColor: status.bg, color: status.color }}
                      >
                        {status.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/compte/commandes"
            className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:shadow-md hover:-translate-y-0.5"
            style={{ backgroundColor: "white" }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#F7F5F0" }}>
              <Package size={20} style={{ color: "#e67e22" }} />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: "#18223b" }}>
                Mes commandes
              </p>
              <p className="text-xs opacity-60" style={{ color: "#18223b" }}>
                Historique et suivi
              </p>
            </div>
          </Link>

          <Link
            href="/compte/mon-contrat"
            className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:shadow-md hover:-translate-y-0.5"
            style={{ backgroundColor: "white" }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#F7F5F0" }}>
              <FileText size={20} style={{ color: "#e67e22" }} />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: "#18223b" }}>
                Mon contrat & prix
              </p>
              <p className="text-xs opacity-60" style={{ color: "#18223b" }}>
                Mes tarifs personnalisés
              </p>
            </div>
          </Link>
        </div>

        {/* Déconnexion */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ backgroundColor: "white", color: "#18223b", border: "1.5px solid #ede9e0" }}
        >
          <LogOut size={16} /> Se déconnecter
        </button>
      </div>
    </div>
  );
}
