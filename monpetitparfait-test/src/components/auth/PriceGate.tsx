"use client";

import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface PriceGateProps {
  children: React.ReactNode;
  compact?: boolean; // Version compacte pour les cards produit
}

export default function PriceGate({ children, compact = false }: PriceGateProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="h-8 w-24 rounded-lg animate-pulse"
        style={{ backgroundColor: "#ede9e0" }}
      />
    );
  }

  // Si connecté → afficher le contenu (prix)
  if (user) {
    return <>{children}</>;
  }

  // Si non connecté → afficher le verrou
  if (compact) {
    return (
      <Link
        href="/auth/login"
        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
        style={{ backgroundColor: "#18223b", color: "white" }}
      >
        <Lock size={11} />
        Voir le prix
      </Link>
    );
  }

  return (
    <div
      className="rounded-2xl p-6 text-center"
      style={{ backgroundColor: "#ede9e0" }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
        style={{ backgroundColor: "#18223b" }}
      >
        <Lock size={20} className="text-white" />
      </div>
      <h3 className="font-bold mb-1" style={{ color: "#18223b" }}>
        Connectez-vous pour voir vos prix
      </h3>
      <p className="text-sm opacity-70 mb-4" style={{ color: "#18223b" }}>
        Nos tarifs sont personnalisés pour chaque client selon votre contrat.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/auth/login"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#18223b" }}
        >
          Se connecter <ArrowRight size={14} />
        </Link>
        <Link
          href="/auth/register"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-sm"
          style={{ backgroundColor: "white", color: "#18223b", border: "2px solid #ede9e0" }}
        >
          Demander un accès
        </Link>
      </div>
    </div>
  );
}

// Composant pour afficher le prix avec indication contractuelle
interface PriceDisplayProps {
  basePrice: number;           // prix catalogue en centimes
  variantId: string;
  showContractBadge?: boolean;
}

export function PriceDisplay({ basePrice, variantId, showContractBadge = true }: PriceDisplayProps) {
  const { user, getContractPrice, contract } = useAuth();

  const formatPrice = (cents: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(cents / 100);

  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-80 w-fit"
        style={{ backgroundColor: "#18223b", color: "white" }}
      >
        <Lock size={11} />
        Voir le prix
      </Link>
    );
  }

  const contractPrice = getContractPrice(variantId);
  const hasContractPrice = contractPrice !== null;
  const displayPrice = hasContractPrice ? contractPrice : basePrice;

  return (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-2">
        <span className="font-bold text-2xl" style={{ color: "#18223b" }}>
          {formatPrice(displayPrice)}
        </span>
        {hasContractPrice && displayPrice < basePrice && (
          <span className="text-sm line-through opacity-40" style={{ color: "#18223b" }}>
            {formatPrice(basePrice)}
          </span>
        )}
      </div>
      {hasContractPrice && showContractBadge && (
        <span
          className="text-xs font-semibold mt-1 px-2 py-0.5 rounded-full w-fit"
          style={{ backgroundColor: "#e67e2215", color: "#e67e22" }}
        >
          🤝 Prix {contract?.name ?? "contractuel"}
        </span>
      )}
      {!hasContractPrice && user && (
        <span className="text-xs opacity-50 mt-1" style={{ color: "#18223b" }}>
          Prix catalogue
        </span>
      )}
    </div>
  );
}
