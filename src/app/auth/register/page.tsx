"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Building2, Phone, Mail, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (form.password.length < 8) {
      setError("Le mot de passe doit comporter au moins 8 caractères.");
      return;
    }

    setLoading(true);
    const { error } = await signUp({
      email: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      company: form.company,
      phone: form.phone,
    });

    if (error) {
      setError(
        error.includes("already registered")
          ? "Un compte existe déjà avec cet email."
          : error
      );
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: "#F7F5F0" }}
      >
        <div className="w-full max-w-md text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "#e67e2215" }}
          >
            <CheckCircle size={40} style={{ color: "#e67e22" }} />
          </div>
          <h1 className="text-2xl font-bold mb-3" style={{ color: "#18223b" }}>
            Demande envoyée !
          </h1>
          <p className="opacity-70 mb-2" style={{ color: "#18223b" }}>
            Votre demande de compte a bien été reçue.
          </p>
          <p className="text-sm opacity-60 mb-8" style={{ color: "#18223b" }}>
            Notre équipe va valider votre compte et vous contacter pour établir votre contrat et vos tarifs personnalisés. Vous recevrez un email de confirmation.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl font-bold text-white"
            style={{ backgroundColor: "#18223b" }}
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: "#F7F5F0" }}
    >
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/">
            <span className="text-2xl font-bold" style={{ color: "#18223b" }}>
              mon petit <span style={{ color: "#e67e22" }}>parfait</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold mt-6 mb-2" style={{ color: "#18223b" }}>
            Demander un accès professionnel
          </h1>
          <p className="text-sm opacity-60" style={{ color: "#18223b" }}>
            Réservé aux hôtels, conciergeries et hébergements professionnels
          </p>
        </div>

        <div className="rounded-2xl p-8" style={{ backgroundColor: "white" }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom / Prénom */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                  Prénom *
                </label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" style={{ color: "#18223b" }} />
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                  />
                </div>
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
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                />
              </div>
            </div>

            {/* Entreprise */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                Entreprise / Établissement *
              </label>
              <div className="relative">
                <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" style={{ color: "#18223b" }} />
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                  placeholder="Hôtel Lumière Paris SAS"
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                Email professionnel *
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" style={{ color: "#18223b" }} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="direction@hotel.com"
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                />
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                Téléphone
              </label>
              <div className="relative">
                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" style={{ color: "#18223b" }} />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+33 6 00 00 00 00"
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                />
              </div>
            </div>

            {/* Mots de passe */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                  Mot de passe *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="8 caractères min."
                    className="w-full pl-3 pr-8 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 opacity-40"
                    style={{ color: "#18223b" }}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                  Confirmer *
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                />
              </div>
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
              className="w-full py-3.5 rounded-xl text-base font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
              style={{ backgroundColor: "#e67e22" }}
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {loading ? "Envoi en cours..." : "Soumettre ma demande"}
            </button>
          </form>

          <div className="mt-5 text-center text-sm opacity-60" style={{ color: "#18223b" }}>
            Déjà client ?{" "}
            <Link href="/auth/login" className="font-semibold" style={{ color: "#e67e22" }}>
              Se connecter
            </Link>
          </div>
        </div>

        <p className="mt-4 text-xs text-center opacity-50" style={{ color: "#18223b" }}>
          Votre compte sera validé manuellement par notre équipe sous 24h.
        </p>
      </div>
    </div>
  );
}
