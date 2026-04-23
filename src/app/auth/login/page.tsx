"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, isAdmin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await signIn(email, password);

    if (error) {
      setError(
        error.includes("Invalid login credentials")
          ? "Email ou mot de passe incorrect."
          : error.includes("Email not confirmed")
          ? "Veuillez confirmer votre email avant de vous connecter."
          : "Une erreur est survenue. Veuillez réessayer."
      );
      setLoading(false);
      return;
    }

    router.push(isAdmin ? "/admin" : "/compte");
    router.refresh();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: "#F7F5F0" }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <span className="text-2xl font-bold" style={{ color: "#18223b" }}>
              mon petit <span style={{ color: "#e67e22" }}>parfait</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold mt-6 mb-2" style={{ color: "#18223b" }}>
            Connexion à votre espace
          </h1>
          <p className="text-sm opacity-60" style={{ color: "#18223b" }}>
            Accédez à vos prix contractuels et à votre historique
          </p>
        </div>

        <div className="rounded-2xl p-8" style={{ backgroundColor: "white" }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                className="block text-xs font-semibold mb-2 opacity-70"
                style={{ color: "#18223b" }}
              >
                Adresse email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40"
                  style={{ color: "#18223b" }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="vous@entreprise.com"
                  className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-colors"
                  style={{
                    border: "1.5px solid #ede9e0",
                    color: "#18223b",
                    backgroundColor: "white",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "#e67e22")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "#ede9e0")
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  className="text-xs font-semibold opacity-70"
                  style={{ color: "#18223b" }}
                >
                  Mot de passe
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-medium"
                  style={{ color: "#e67e22" }}
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40"
                  style={{ color: "#18223b" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-3 rounded-xl text-sm outline-none transition-colors"
                  style={{
                    border: "1.5px solid #ede9e0",
                    color: "#18223b",
                    backgroundColor: "white",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "#e67e22")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "#ede9e0")
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70"
                  style={{ color: "#18223b" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Erreur */}
            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-sm">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-base font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ backgroundColor: "#18223b" }}
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t text-center" style={{ borderColor: "#ede9e0" }}>
            <p className="text-sm opacity-60" style={{ color: "#18223b" }}>
              Pas encore de compte ?{" "}
              <Link
                href="/auth/register"
                className="font-semibold"
                style={{ color: "#e67e22" }}
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </div>

        {/* Info B2B */}
        <div
          className="mt-4 p-4 rounded-xl text-sm text-center opacity-70"
          style={{ color: "#18223b" }}
        >
          🔒 Vos prix sont confidentiels et personnalisés selon votre contrat
        </div>
      </div>
    </div>
  );
}
