"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Truck, User, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/lib/products";
import { useRouter } from "next/navigation";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  address2: string;
  city: string;
  postalCode: string;
  country: string;
  notes: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const { user, profile, getContractPrice } = useAuth();
  const subtotal = getSubtotal();

  const [form, setForm] = useState<FormData>({
    firstName: profile?.first_name ?? "",
    lastName: profile?.last_name ?? "",
    email: profile?.email ?? "",
    phone: profile?.phone ?? "",
    company: profile?.company ?? "",
    address: "",
    address2: "",
    city: "",
    postalCode: "",
    country: "FR",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pré-remplir si le profil charge après
  useEffect(() => {
    if (profile) {
      setForm((prev) => ({
        ...prev,
        firstName: prev.firstName || profile.first_name || "",
        lastName: prev.lastName || profile.last_name || "",
        email: prev.email || profile.email || "",
        phone: prev.phone || profile.phone || "",
        company: prev.company || profile.company || "",
        address: prev.address || profile.address || "",
        address2: prev.address2 || profile.address2 || "",
        city: prev.city || profile.city || "",
        postalCode: prev.postalCode || profile.postal_code || "",
        country: prev.country || profile.country || "FR",
      }));
    }
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.product.id,
            variantId: item.variant.id,
            quantity: item.quantity,
          })),
          customerInfo: form,
          userId: user?.id ?? null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de la commande");

      clearCart();
      router.push(`/confirmation?orderId=${data.orderId}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#F7F5F0" }}>
        <ShoppingBag size={48} className="mb-4 opacity-30" style={{ color: "#18223b" }} />
        <p className="text-lg font-semibold mb-4" style={{ color: "#18223b" }}>Votre panier est vide</p>
        <Link href="/boutique" className="text-sm font-medium" style={{ color: "#e67e22" }}>Retour à la boutique</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="max-w-5xl mx-auto">
        <Link href="/panier" className="inline-flex items-center gap-2 text-sm font-medium mb-8 opacity-60 hover:opacity-100 transition-opacity" style={{ color: "#18223b" }}>
          <ArrowLeft size={16} /> Retour au panier
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#18223b" }}>
          Finaliser la commande
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2 space-y-6">
              {/* Coordonnées */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: "white" }}>
                <div className="flex items-center gap-2 mb-5">
                  <User size={18} style={{ color: "#e67e22" }} />
                  <h2 className="font-bold" style={{ color: "#18223b" }}>Vos coordonnées</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "firstName", label: "Prénom *", required: true },
                    { name: "lastName", label: "Nom *", required: true },
                    { name: "email", label: "Email *", required: true, type: "email" },
                    { name: "phone", label: "Téléphone *", required: true, type: "tel" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>{field.label}</label>
                      <input
                        type={field.type ?? "text"}
                        name={field.name}
                        value={(form as unknown as Record<string, string>)[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ border: "1.5px solid #ede9e0", color: "#18223b", backgroundColor: "white" }}
                        onFocus={(e) => (e.target.style.borderColor = "#e67e22")}
                        onBlur={(e) => (e.target.style.borderColor = "#ede9e0")}
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>Entreprise / Hôtel</label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Mon Hôtel SAS"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: "1.5px solid #ede9e0", color: "#18223b", backgroundColor: "white" }}
                      onFocus={(e) => (e.target.style.borderColor = "#e67e22")}
                      onBlur={(e) => (e.target.style.borderColor = "#ede9e0")}
                    />
                  </div>
                </div>
              </div>

              {/* Adresse */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: "white" }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Truck size={18} style={{ color: "#e67e22" }} />
                    <h2 className="font-bold" style={{ color: "#18223b" }}>Adresse de livraison</h2>
                  </div>
                  {user && profile?.address && (
                    <button
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({
                          ...prev,
                          address: profile.address || "",
                          address2: profile.address2 || "",
                          city: profile.city || "",
                          postalCode: profile.postal_code || "",
                          country: profile.country || "FR",
                        }));
                      }}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
                      style={{ backgroundColor: "#F7F5F0", color: "#e67e22" }}
                    >
                      Utiliser mon adresse
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>Adresse *</label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      placeholder="123 rue de la Paix"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: "1.5px solid #ede9e0", color: "#18223b", backgroundColor: "white" }}
                      onFocus={(e) => (e.target.style.borderColor = "#e67e22")}
                      onBlur={(e) => (e.target.style.borderColor = "#ede9e0")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>Complément</label>
                    <input
                      name="address2"
                      value={form.address2}
                      onChange={handleChange}
                      placeholder="Bâtiment, étage..."
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: "1.5px solid #ede9e0", color: "#18223b", backgroundColor: "white" }}
                      onFocus={(e) => (e.target.style.borderColor = "#e67e22")}
                      onBlur={(e) => (e.target.style.borderColor = "#ede9e0")}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>Code postal *</label>
                      <input
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        required
                        placeholder="75001"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ border: "1.5px solid #ede9e0", color: "#18223b", backgroundColor: "white" }}
                        onFocus={(e) => (e.target.style.borderColor = "#e67e22")}
                        onBlur={(e) => (e.target.style.borderColor = "#ede9e0")}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>Ville *</label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                        placeholder="Paris"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ border: "1.5px solid #ede9e0", color: "#18223b", backgroundColor: "white" }}
                        onFocus={(e) => (e.target.style.borderColor = "#e67e22")}
                        onBlur={(e) => (e.target.style.borderColor = "#ede9e0")}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>Pays *</label>
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: "1.5px solid #ede9e0", color: "#18223b", backgroundColor: "white" }}
                    >
                      <option value="FR">🇫🇷 France</option>
                      <option value="BE">🇧🇪 Belgique</option>
                      <option value="CH">🇨🇭 Suisse</option>
                      <option value="LU">🇱🇺 Luxembourg</option>
                      <option value="MC">🇲🇨 Monaco</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>Notes (optionnel)</label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Instructions spéciales, créneau préféré..."
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                      style={{ border: "1.5px solid #ede9e0", color: "#18223b", backgroundColor: "white" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Récap */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl p-6 sticky top-24" style={{ backgroundColor: "white" }}>
                <h2 className="font-bold text-lg mb-4" style={{ color: "#18223b" }}>Votre commande</h2>

                <div className="space-y-3 mb-4">
                  {items.map((item) => {
                    const contractPrice = getContractPrice(item.variant.id);
                    const catalogPrice = item.variant.price;
                    const hasContractPrice = contractPrice !== null;
                    const displayPrice = hasContractPrice ? contractPrice : catalogPrice;
                    return (
                      <div key={`${item.product.id}-${item.variant.id}`} className="flex justify-between text-sm" style={{ color: "#18223b" }}>
                        <span className="opacity-80">
                          {item.product.name}
                          <br />
                          <span className="text-xs opacity-50">{item.variant.name} × {item.quantity}</span>
                        </span>
                        <div className="flex flex-col items-end gap-1">
                          {hasContractPrice && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: "#e67e22", color: "white" }}>
                                Prix contrat
                              </span>
                            </div>
                          )}
                          <div>
                            {hasContractPrice && (
                              <span className="text-xs opacity-50 line-through block">{formatPrice(catalogPrice * item.quantity)}</span>
                            )}
                            <span className="font-semibold">{formatPrice(displayPrice * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t pt-4 mb-4 space-y-2" style={{ borderColor: "#ede9e0" }}>
                  <div className="flex justify-between text-sm" style={{ color: "#18223b" }}>
                    <span className="opacity-70">Sous-total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm" style={{ color: "#18223b" }}>
                    <span className="opacity-70">Livraison</span>
                    <span className="text-green-600 font-medium">Gratuite</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6" style={{ borderColor: "#ede9e0" }}>
                  <div className="flex justify-between" style={{ color: "#18223b" }}>
                    <span className="font-bold">Total TTC</span>
                    <span className="font-bold text-xl">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-xl text-sm text-red-700 bg-red-50">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: "#18223b" }}
                >
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Traitement...</>
                  ) : (
                    <><Lock size={16} /> Confirmer la commande</>
                  )}
                </button>

                <p className="text-xs text-center opacity-50 mt-3" style={{ color: "#18223b" }}>
                  🔒 Vos données sont protégées
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
