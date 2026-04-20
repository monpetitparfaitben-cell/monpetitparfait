"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Package,
  FileText,
  LogOut,
  Building2,
  Phone,
  Mail,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function ComptePage() {
  const { user, profile, contract, loading, signOut, isApproved } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading || !user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#e67e22" }} />
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const displayName = profile.first_name
    ? `${profile.first_name} ${profile.last_name ?? ""}`
    : profile.email;

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
            <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full" style={{ backgroundColor: "#27ae6030", color: "#27ae60" }}>
              <CheckCircle size={12} /> Compte approuvé
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full" style={{ backgroundColor: "#e67e2230", color: "#e67e22" }}>
              <Clock size={12} /> En attente
            </span>
          )}
        </div>

        {/* Alerte compte en attente */}
        {!isApproved && (
          <div className="rounded-2xl p-5 flex items-start gap-4" style={{ backgroundColor: "#e67e2210", border: "1.5px solid #e67e2230" }}>
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
                  <p className="font-bold text-sm" style={{ color: "#18223b" }}>{contract.name}</p>
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

        {/* Infos personnelles */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: "white" }}>
          <h2 className="font-bold mb-4" style={{ color: "#18223b" }}>Mes informations</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm" style={{ color: "#18223b" }}>
              <Mail size={16} className="opacity-40" />
              <span>{profile.email}</span>
            </div>
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
          </div>
        </div>

        {/* Navigation */}
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
              <p className="font-bold text-sm" style={{ color: "#18223b" }}>Mes commandes</p>
              <p className="text-xs opacity-60" style={{ color: "#18223b" }}>Historique et suivi</p>
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
              <p className="font-bold text-sm" style={{ color: "#18223b" }}>Mon contrat & prix</p>
              <p className="text-xs opacity-60" style={{ color: "#18223b" }}>Mes tarifs personnalisés</p>
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
