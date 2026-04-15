"use client";

import { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCartStore();

  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ backgroundColor: "#F7F5F0" }}
    >
      <div className="max-w-lg w-full text-center">
        {/* Icône succès */}
        <div className="flex justify-center mb-8">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#27ae6015" }}
          >
            <CheckCircle size={48} className="text-green-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4" style={{ color: "#18223b" }}>
          Commande confirmée ! 🎉
        </h1>

        <p className="text-lg opacity-70 mb-8 leading-relaxed" style={{ color: "#18223b" }}>
          Merci pour votre commande. Vous allez recevoir un email de confirmation avec les détails de votre livraison.
        </p>

        {/* Info card */}
        <div
          className="rounded-2xl p-6 mb-8 text-left space-y-4"
          style={{ backgroundColor: "white" }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#e67e22" }}
            >
              <Mail size={18} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-sm mb-1" style={{ color: "#18223b" }}>
                Email de confirmation
              </p>
              <p className="text-sm opacity-70" style={{ color: "#18223b" }}>
                Un email récapitulatif vous a été envoyé avec tous les détails de votre commande.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#e67e22" }}
            >
              <Package size={18} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-sm mb-1" style={{ color: "#18223b" }}>
                Livraison estimée
              </p>
              <p className="text-sm opacity-70" style={{ color: "#18223b" }}>
                Votre colis sera expédié sous 24h et livré dans les 48h ouvrées. Livraison gratuite !
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/compte/commandes"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#18223b" }}
          >
            Voir mes commandes
          </Link>
          <Link
            href="/boutique"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:shadow-md"
            style={{
              backgroundColor: "white",
              color: "#18223b",
              border: "2px solid #ede9e0",
            }}
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
