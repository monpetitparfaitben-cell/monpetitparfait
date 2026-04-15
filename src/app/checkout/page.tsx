"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Truck, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/lib/products";

interface FormData {
  // Coordonnées
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  // Adresse
  address: string;
  address2: string;
  city: string;
  postalCode: string;
  country: string;
  // Notes
  notes: string;
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  address: "",
  address2: "",
  city: "",
  postalCode: "",
  country: "FR",
  notes: "",
};

export default function CheckoutPage() {
  const { items, getSubtotal } = useCartStore();
  const { user, profile } = useAuth();
  const subtotal = getSubtotal();
  const [form, setForm] = useState<FormData>({
    ...initialForm,
    firstName: profile?.first_name ?? "",
    lastName: profile?.last_name ?? "",
    email: profile?.email ?? "",
    phone: profile?.phone ?? "",
    company: profile?.company ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // On envoie les IDs produit/variant — le serveur vérifie les prix
          items: items.map((item) => ({
            productId: item.product.id,
            variantId: item.variant.id,
            name: `${item.product.name} — ${item.variant.name}`,
            quantity: item.quantity,
          })),
          customerInfo: form,
          userId: user?.id ?? null, // Pour récupérer les prix contractuels côté serveur
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erreur lors du paiement");

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue. Veuillez réessayer.");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#F7F5F0" }}>
        <p className="text-lg font-semibold mb-4" style={{ color: "#18223b" }}>
          Votre panier est vide
        </p>
        <Link href="/boutique" className="text-sm font-medium" style={{ color: "#e67e22" }}>
          Retour à la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/panier"
            className="flex items-center gap-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: "#18223b" }}
          >
            <ArrowLeft size={16} /> Retour au panier
          </Link>
        </div>

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
                  <h2 className="font-bold" style={{ color: "#18223b" }}>
                    Vos coordonnées
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                      Prénom *
                    </label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                      Nom *
                    </label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                      Entreprise / Hôtel (optionnel)
                    </label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Mon Hôtel SAS"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                    />
                  </div>
                </div>
              </div>

              {/* Adresse livraison */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: "white" }}>
                <div className="flex items-center gap-2 mb-5">
                  <Truck size={18} style={{ color: "#e67e22" }} />
                  <h2 className="font-bold" style={{ color: "#18223b" }}>
                    Adresse de livraison
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                      Adresse *
                    </label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      placeholder="123 rue de la Paix"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                      Complément d&apos;adresse
                    </label>
                    <input
                      name="address2"
                      value={form.address2}
                      onChange={handleChange}
                      placeholder="Bâtiment, étage..."
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                        Code postal *
                      </label>
                      <input
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        required
                        placeholder="75001"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                        Ville *
                      </label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                        placeholder="Paris"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                      Pays *
                    </label>
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                    >
                      <option value="FR">🇫🇷 France</option>
                      <option value="BE">🇧🇪 Belgique</option>
                      <option value="CH">🇨🇭 Suisse</option>
                      <option value="LU">🇱🇺 Luxembourg</option>
                      <option value="MC">🇲🇨 Monaco</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: "white" }}>
                <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                  Notes de commande (optionnel)
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Instructions spéciales, créneau de livraison préféré..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                />
              </div>
            </div>

            {/* Récap commande */}
            <div className="lg:col-span-1">
              <div
                className="rounded-2xl p-6 sticky top-24"
                style={{ backgroundColor: "white" }}
              >
                <h2 className="font-bold text-lg mb-4" style={{ color: "#18223b" }}>
                  Votre commande
                </h2>

                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.variant.id}`}
                      className="flex justify-between text-sm"
                      style={{ color: "#18223b" }}
                    >
                      <span className="opacity-80">
                        {item.product.name} × {item.quantity}
                        <br />
                        <span className="text-xs opacity-50">{item.variant.name}</span>
                      </span>
                      <span className="font-semibold">
                        {formatPrice(item.variant.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className="border-t pt-4 mb-4 space-y-2"
                  style={{ borderColor: "#ede9e0" }}
                >
                  <div className="flex justify-between text-sm" style={{ color: "#18223b" }}>
                    <span className="opacity-70">Sous-total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm" style={{ color: "#18223b" }}>
                    <span className="opacity-70">Livraison</span>
                    <span className="text-green-600 font-medium">Gratuite</span>
                  </div>
                </div>

                <div
                  className="border-t pt-4 mb-6"
                  style={{ borderColor: "#ede9e0" }}
                >
                  <div className="flex justify-between" style={{ color: "#18223b" }}>
                    <span className="font-bold">Total TTC</span>
                    <span className="font-bold text-xl">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-xl text-sm text-red-700 bg-red-50">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: "#18223b" }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Redirection vers le paiement...
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      Payer — {formatPrice(subtotal)}
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 mt-3 text-xs opacity-50" style={{ color: "#18223b" }}>
                  <Lock size={12} />
                  Paiement sécurisé SSL via Stripe
                </div>

                <div className="flex justify-center gap-3 mt-3">
                  {["VISA", "MC", "CB"].map((card) => (
                    <span
                      key={card}
                      className="text-xs px-2 py-1 rounded font-bold opacity-40"
                      style={{ backgroundColor: "#F7F5F0", color: "#18223b" }}
                    >
                      {card}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
