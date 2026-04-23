"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Building2, Phone, Mail, MapPin, AlertCircle, CheckCircle, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const TYPES_ETABLISSEMENT = [
  "Hôtel",
  "Résidence hôtelière",
  "Airbnb / Location courte durée",
  "Conciergerie",
  "Gîte / Chambre d'hôtes",
  "Camping",
  "Autre",
];

export default function RegisterPage() {
  const { signUp } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    typeEtablissement: "",
    siret: "",
    phone: "",
    email: "",
    address: "",
    address2: "",
    postalCode: "",
    city: "",
    country: "FR",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      address: form.address,
      address2: form.address2,
      city: form.city,
      postalCode: form.postalCode,
      country: form.country,
      siret: form.siret,
      typeEtablissement: form.typeEtablissement,
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

    // Email de bienvenue (silencieux si erreur)
    fetch("/api/auth/welcome", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, firstName: form.firstName, company: form.company }),
    }).catch(() => {});

    setSuccess(true);
    setLoading(false);
  };

  const inputStyle = {
    border: "1.5px solid #ede9e0",
    color: "#18223b",
    backgroundColor: "white",
  };

  const Field = ({
    label,
    name,
    type = "text",
    required = false,
    placeholder = "",
    icon: Icon,
  }: {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    icon?: React.ElementType;
  }) => (
    <div>
      <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
        {label} {required && <span style={{ color: "#e67e22" }}>*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" style={{ color: "#18223b" }} />
        )}
        <input
          type={type}
          name={name}
          value={(form as Record<string, string>)[name]}
          onChange={handleChange}
          required={required}
          placeholder={placeholder}
          className={`w-full ${Icon ? "pl-8" : "px-3"} pr-3 py-2.5 rounded-xl text-sm outline-none`}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#e67e22")}
          onBlur={(e) => (e.target.style.borderColor = "#ede9e0")}
        />
      </div>
    </div>
  );

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#e67e2215" }}>
            <CheckCircle size={40} style={{ color: "#e67e22" }} />
          </div>
          <h1 className="text-2xl font-bold mb-3" style={{ color: "#18223b" }}>Compte créé !</h1>
          <p className="opacity-70 mb-2" style={{ color: "#18223b" }}>
            Votre compte a bien été créé.
          </p>
          <p className="text-sm opacity-60 mb-8" style={{ color: "#18223b" }}>
            Vous pouvez maintenant vous connecter et parcourir notre catalogue.
          </p>
          <Link href="/" className="inline-block px-6 py-3 rounded-xl font-bold text-white" style={{ backgroundColor: "#18223b" }}>
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link href="/">
            <span className="text-2xl font-bold" style={{ color: "#18223b" }}>
              mon petit <span style={{ color: "#e67e22" }}>parfait</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold mt-6 mb-2" style={{ color: "#18223b" }}>
            Créer mon compte
          </h1>
          <p className="text-sm opacity-60" style={{ color: "#18223b" }}>
            Hôtels, conciergeries et hébergements professionnels
          </p>
        </div>

        <div className="rounded-2xl p-8" style={{ backgroundColor: "white" }}>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Section identité */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User size={16} style={{ color: "#e67e22" }} />
                <h2 className="font-bold text-sm uppercase tracking-wider opacity-60" style={{ color: "#18223b" }}>
                  Vos informations
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Prénom" name="firstName" required placeholder="Jean" icon={User} />
                <Field label="Nom" name="lastName" required placeholder="Dupont" />
                <Field label="Email professionnel" name="email" type="email" required placeholder="direction@hotel.com" icon={Mail} />
                <Field label="Téléphone" name="phone" type="tel" required placeholder="+33 6 00 00 00 00" icon={Phone} />
              </div>
            </div>

            {/* Section établissement */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 size={16} style={{ color: "#e67e22" }} />
                <h2 className="font-bold text-sm uppercase tracking-wider opacity-60" style={{ color: "#18223b" }}>
                  Votre établissement
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field label="Nom de l'entreprise / établissement" name="company" required placeholder="Hôtel Lumière Paris SAS" icon={Building2} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                    Type d&apos;établissement <span style={{ color: "#e67e22" }}>*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="typeEtablissement"
                      value={form.typeEtablissement}
                      onChange={handleChange}
                      required
                      className="w-full px-3 pr-8 py-2.5 rounded-xl text-sm outline-none appearance-none"
                      style={inputStyle}
                    >
                      <option value="">Sélectionner...</option>
                      {TYPES_ETABLISSEMENT.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" style={{ color: "#18223b" }} />
                  </div>
                </div>
                <Field label="N° SIRET (optionnel)" name="siret" placeholder="123 456 789 00010" />
              </div>
            </div>

            {/* Section adresse */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} style={{ color: "#e67e22" }} />
                <h2 className="font-bold text-sm uppercase tracking-wider opacity-60" style={{ color: "#18223b" }}>
                  Adresse de livraison
                </h2>
              </div>
              <div className="space-y-4">
                <Field label="Adresse" name="address" required placeholder="123 rue de la Paix" icon={MapPin} />
                <Field label="Complément d'adresse" name="address2" placeholder="Bâtiment A, étage 2..." />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Code postal" name="postalCode" required placeholder="75001" />
                  <Field label="Ville" name="city" required placeholder="Paris" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                    Pays <span style={{ color: "#e67e22" }}>*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="w-full px-3 pr-8 py-2.5 rounded-xl text-sm outline-none appearance-none"
                      style={inputStyle}
                    >
                      <option value="FR">🇫🇷 France</option>
                      <option value="BE">🇧🇪 Belgique</option>
                      <option value="CH">🇨🇭 Suisse</option>
                      <option value="LU">🇱🇺 Luxembourg</option>
                      <option value="MC">🇲🇨 Monaco</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" style={{ color: "#18223b" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Section mot de passe */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-base">🔒</span>
                <h2 className="font-bold text-sm uppercase tracking-wider opacity-60" style={{ color: "#18223b" }}>
                  Mot de passe
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                    Mot de passe <span style={{ color: "#e67e22" }}>*</span>
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
                      placeholder="8 caractères minimum"
                      className="w-full pl-3 pr-10 py-2.5 rounded-xl text-sm outline-none"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "#e67e22")}
                      onBlur={(e) => (e.target.style.borderColor = "#ede9e0")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40"
                      style={{ color: "#18223b" }}
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                    Confirmer <span style={{ color: "#e67e22" }}>*</span>
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
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#e67e22")}
                    onBlur={(e) => (e.target.style.borderColor = "#ede9e0")}
                  />
                </div>
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
              className="w-full py-4 rounded-xl text-base font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ backgroundColor: "#e67e22" }}
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {loading ? "Envoi en cours..." : "Créer mon compte"}
            </button>
          </form>

          <div className="mt-5 text-center text-sm opacity-60" style={{ color: "#18223b" }}>
            Déjà client ?{" "}
            <Link href="/auth/login" className="font-semibold" style={{ color: "#e67e22" }}>
              Se connecter
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
