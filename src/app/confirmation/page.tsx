"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, Mail, Phone, ArrowRight } from "lucide-react";

function formatEur(cents: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(cents / 100);
}

interface OrderItem {
  name: string;
  variant: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface OrderData {
  customerName: string;
  email: string;
  total: number;
  items: OrderItem[];
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(!!sessionId);

  useEffect(() => {
    if (!sessionId) return;
    fetch(`/api/stripe/session?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setOrder(data);
      })
      .finally(() => setLoading(false));
  }, [sessionId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="max-w-lg w-full text-center">

        {/* Icône succès */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: "#27ae6015" }}>
            <CheckCircle size={52} className="text-green-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-3" style={{ color: "#18223b" }}>
          Merci pour votre commande ! 🎉
        </h1>

        {order && (
          <p className="text-base opacity-70 mb-2" style={{ color: "#18223b" }}>
            Bonjour {order.customerName}, votre commande a bien été enregistrée.
          </p>
        )}

        <p className="opacity-60 mb-8 leading-relaxed text-sm" style={{ color: "#18223b" }}>
          Un email de confirmation vous a été envoyé avec le récapitulatif de votre commande.
        </p>

        {/* Récap produits */}
        {loading && (
          <div className="rounded-2xl p-6 mb-6 text-center" style={{ backgroundColor: "white" }}>
            <p className="text-sm opacity-50" style={{ color: "#18223b" }}>Chargement de votre commande…</p>
          </div>
        )}

        {order && order.items.length > 0 && (
          <div className="rounded-2xl p-6 mb-6 text-left" style={{ backgroundColor: "white" }}>
            <h2 className="font-bold text-sm mb-4 uppercase tracking-wider opacity-50" style={{ color: "#18223b" }}>
              Récapitulatif
            </h2>
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-sm" style={{ color: "#18223b" }}>{item.name}</p>
                    {item.variant && (
                      <p className="text-xs opacity-50" style={{ color: "#18223b" }}>{item.variant} × {item.quantity}</p>
                    )}
                  </div>
                  <p className="font-bold text-sm flex-shrink-0" style={{ color: "#18223b" }}>
                    {formatEur(item.total)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t flex justify-between items-center" style={{ borderColor: "#ede9e0" }}>
              <span className="font-bold" style={{ color: "#18223b" }}>Total TTC</span>
              <span className="text-xl font-bold" style={{ color: "#e67e22" }}>{formatEur(order.total)}</span>
            </div>
          </div>
        )}

        {/* Info cards */}
        <div className="rounded-2xl p-6 mb-8 text-left space-y-5" style={{ backgroundColor: "white" }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#e67e22" }}>
              <Mail size={18} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-sm mb-1" style={{ color: "#18223b" }}>Confirmation par email</p>
              <p className="text-sm opacity-70" style={{ color: "#18223b" }}>
                Un email récapitulatif{order?.email ? ` a été envoyé à ${order.email}` : " vous a été envoyé"}.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#e67e22" }}>
              <Package size={18} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-sm mb-1" style={{ color: "#18223b" }}>Livraison estimée</p>
              <p className="text-sm opacity-70" style={{ color: "#18223b" }}>Expédition sous 24h — livraison en 48h ouvrées. Livraison gratuite !</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/compte/commandes"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
            style={{ backgroundColor: "#18223b" }}
          >
            Voir mes commandes
          </Link>
          <Link
            href="/boutique"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold"
            style={{ backgroundColor: "white", color: "#18223b", border: "2px solid #ede9e0" }}
          >
            Continuer mes achats <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: "#F7F5F0" }} />}>
      <ConfirmationContent />
    </Suspense>
  );
}
