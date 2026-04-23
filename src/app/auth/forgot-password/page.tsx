"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      setError("Une erreur est survenue. Vérifiez votre adresse email.");
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#e67e2215" }}>
            <CheckCircle size={40} style={{ color: "#e67e22" }} />
          </div>
          <h1 className="text-2xl font-bold mb-3" style={{ color: "#18223b" }}>Email envoyé !</h1>
          <p className="opacity-70 mb-8" style={{ color: "#18223b" }}>
            Consultez votre boîte mail pour réinitialiser votre mot de passe.
          </p>
          <Link href="/auth/login" className="inline-block px-6 py-3 rounded-xl font-bold text-white" style={{ backgroundColor: "#18223b" }}>
            Retour à la connexion
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "#18223b" }}>Mot de passe oublié</h1>
          <p className="text-sm opacity-60 mt-2" style={{ color: "#18223b" }}>
            Entrez votre email pour recevoir un lien de réinitialisation
          </p>
        </div>

        <div className="rounded-2xl p-8" style={{ backgroundColor: "white" }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="votre@email.com"
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: "1.5px solid #ede9e0", color: "#18223b", backgroundColor: "white" }}
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-sm">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ backgroundColor: "#e67e22" }}
            >
              {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {loading ? "Envoi..." : "Envoyer le lien"}
            </button>
          </form>

          <div className="mt-5 text-center text-sm opacity-60" style={{ color: "#18223b" }}>
            <Link href="/auth/login" className="font-semibold" style={{ color: "#e67e22" }}>
              ← Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
