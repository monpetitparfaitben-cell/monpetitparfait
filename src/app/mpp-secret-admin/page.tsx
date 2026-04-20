"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase";

const ADMIN_EMAIL = "ouazanab@gmail.com";

export default function SecretAdminLogin() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email.toLowerCase() !== ADMIN_EMAIL) {
      setError("Accès non autorisé.");
      return;
    }

    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin`,
      },
    });

    if (error) {
      setError("Erreur lors de l'envoi. Réessaie.");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-6">📬</div>
          <h1 className="text-xl font-bold mb-3" style={{ color: "#18223b" }}>Lien envoyé !</h1>
          <p className="text-sm opacity-60" style={{ color: "#18223b" }}>
            Vérifie ta boîte mail <strong>{email}</strong> et clique sur le lien pour accéder à l&apos;admin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="w-full max-w-sm">
        <div className="rounded-2xl p-8" style={{ backgroundColor: "white" }}>
          <div className="text-center mb-8">
            <div className="text-3xl mb-3">🔐</div>
            <h1 className="text-lg font-bold" style={{ color: "#18223b" }}>Accès administration</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              required
              autoFocus
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ border: "1.5px solid #ede9e0", color: "#18223b", backgroundColor: "white" }}
              onFocus={(e) => (e.target.style.borderColor = "#e67e22")}
              onBlur={(e) => (e.target.style.borderColor = "#ede9e0")}
            />

            {error && (
              <p className="text-sm text-center font-semibold" style={{ color: "#e74c3c" }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "#18223b" }}
            >
              {loading ? "Envoi..." : "Recevoir le lien de connexion"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
