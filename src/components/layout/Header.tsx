"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

// ── Structure du mega-menu ─────────────────────────────────────
const MENU_DATA = [
  {
    id: "kits",
    label: "Kits",
    href: "/boutique?category=kits",
    subcategories: [
      { label: "Kit Salle de Bains", href: "/boutique?subcategory=Kit+Salle+de+Bains" },
      { label: "Kit Capsule Café",   href: "/boutique?subcategory=Kit+Capsule+Café" },
      { label: "Kit Gourmand",        href: "/boutique?subcategory=Kit+Gourmand" },
      { label: "Kit Entretien",       href: "/boutique?subcategory=Kit+Entretien" },
    ],
  },
  {
    id: "ouate",
    label: "100% Ouate",
    href: "/boutique?category=ouate",
    subcategories: [
      { label: "Essuie-tout",     href: "/boutique?subcategory=Essuie-tout" },
      { label: "Papier toilette", href: "/boutique?subcategory=Papier+toilette" },
    ],
  },
  {
    id: "consommables",
    label: "Consommables",
    href: "/boutique?category=consommables",
    subcategories: [
      { label: "Sac poubelle",  href: "/boutique?subcategory=Sac+poubelle" },
      { label: "Tablette",      href: "/boutique?subcategory=Tablette" },
      { label: "Pastille",      href: "/boutique?subcategory=Pastille" },
      { label: "Capsule café",  href: "/boutique?subcategory=Capsule+café" },
      { label: "Éponge",        href: "/boutique?subcategory=Éponge" },
    ],
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled]       = useState(false);

  const menuRef    = useRef<HTMLDivElement>(null);
  const userRef    = useRef<HTMLDivElement>(null);

  const { toggleCart, getItemCount } = useCartStore();
  const { user, profile, signOut }   = useAuth();
  const router    = useRouter();
  const itemCount = getItemCount();

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Rehydrate cart
  useEffect(() => { useCartStore.persist.rehydrate(); }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    window.location.href = "/";
  };

  const displayName = profile?.first_name
    ? profile.first_name
    : user?.email?.split("@")[0] ?? "Mon compte";

  return (
    <>
      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "#F7F5F0",
          boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Mon Petit Parfait"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </Link>

            {/* ── Nav desktop ── */}
            <nav className="hidden md:flex items-center gap-6">

              {/* Mega-menu PRODUITS */}
              <div ref={menuRef} className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-60"
                  style={{ color: "#18223b" }}
                >
                  Produits
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-200"
                    style={{ transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                {menuOpen && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 rounded-2xl shadow-2xl overflow-hidden z-50"
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #ede9e0",
                      width: "640px",
                    }}
                  >
                    {/* 3 colonnes */}
                    <div className="grid grid-cols-3 gap-0">
                      {MENU_DATA.map((cat, i) => (
                        <div
                          key={cat.id}
                          className="p-5"
                          style={{
                            borderRight: i < 2 ? "1px solid #ede9e0" : "none",
                          }}
                        >
                          {/* Titre catégorie */}
                          <Link
                            href={cat.href}
                            onClick={() => setMenuOpen(false)}
                            className="block text-xs font-bold uppercase tracking-widest mb-3 hover:opacity-70 transition-opacity"
                            style={{ color: "#e67e22" }}
                          >
                            {cat.label}
                          </Link>
                          {/* Sous-catégories */}
                          <ul className="space-y-2">
                            {cat.subcategories.map((sub) => (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="block text-sm font-medium transition-colors hover:opacity-60 py-0.5"
                                  style={{ color: "#18223b" }}
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {/* Footer du menu */}
                    <div
                      className="px-5 py-3 flex items-center justify-end"
                      style={{ borderTop: "1px solid #ede9e0", backgroundColor: "#F7F5F0" }}
                    >
                      <Link
                        href="/boutique"
                        onClick={() => setMenuOpen(false)}
                        className="text-xs font-semibold hover:opacity-70 transition-opacity"
                        style={{ color: "#18223b" }}
                      >
                        Voir tout le catalogue →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Lien tout voir */}
              <Link
                href="/boutique"
                className="text-sm font-medium transition-colors hover:opacity-60"
                style={{ color: "#18223b" }}
              >
                Tout voir
              </Link>
            </nav>

            {/* ── Actions desktop ── */}
            <div className="hidden md:flex items-center gap-2">
              {/* Panier */}
              <button
                onClick={toggleCart}
                className="relative p-2 rounded-full transition-colors hover:opacity-70"
                style={{ color: "#18223b" }}
                aria-label="Panier"
              >
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    style={{ backgroundColor: "#e67e22" }}
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>

              {/* Compte */}
              {user ? (
                <div ref={userRef} className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                    style={{ backgroundColor: "#18223b", color: "white" }}
                  >
                    <User size={15} />
                    <span className="max-w-[100px] truncate">{displayName}</span>
                    <ChevronDown size={13} className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  {userMenuOpen && (
                    <div
                      className="absolute right-0 top-full mt-2 w-48 rounded-2xl shadow-xl py-2 z-50"
                      style={{ backgroundColor: "white", border: "1px solid #ede9e0" }}
                    >
                      <Link href="/compte" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors hover:opacity-70"
                        style={{ color: "#18223b" }}
                      >
                        <User size={14} /> Mon compte
                      </Link>
                      <Link href="/compte/commandes" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors hover:opacity-70"
                        style={{ color: "#18223b" }}
                      >
                        📦 Mes commandes
                      </Link>
                      <hr className="my-1" style={{ borderColor: "#ede9e0" }} />
                      <button onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium w-full text-left transition-colors hover:opacity-70"
                        style={{ color: "#18223b" }}
                      >
                        <LogOut size={14} /> Se déconnecter
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/auth/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                  style={{ backgroundColor: "#18223b", color: "white" }}
                >
                  <User size={15} /> Connexion
                </Link>
              )}
            </div>

            {/* ── Mobile ── */}
            <div className="flex md:hidden items-center gap-2">
              <button onClick={toggleCart} className="relative p-2" style={{ color: "#18223b" }}>
                <ShoppingCart size={22} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center" style={{ backgroundColor: "#e67e22" }}>
                    {itemCount}
                  </span>
                )}
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2" style={{ color: "#18223b" }}>
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Menu mobile ── */}
        {mobileOpen && (
          <div className="md:hidden border-t px-4 py-4 space-y-1" style={{ borderColor: "#ede9e0", backgroundColor: "#F7F5F0" }}>
            {MENU_DATA.map((cat) => (
              <div key={cat.id}>
                {/* Catégorie */}
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === cat.id ? null : cat.id)}
                  className="w-full flex items-center justify-between py-3 text-sm font-bold"
                  style={{ color: "#18223b" }}
                >
                  {cat.label}
                  <ChevronDown
                    size={14}
                    style={{ transform: mobileExpanded === cat.id ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
                  />
                </button>
                {/* Sous-catégories */}
                {mobileExpanded === cat.id && (
                  <div className="pl-4 pb-2 space-y-1">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-sm font-medium opacity-70"
                        style={{ color: "#18223b" }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <hr style={{ borderColor: "#ede9e0" }} />
            <Link href="/boutique" onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium" style={{ color: "#18223b" }}>
              Tout le catalogue
            </Link>
            <hr style={{ borderColor: "#ede9e0" }} />
            {user ? (
              <>
                <Link href="/compte" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm font-medium" style={{ color: "#18223b" }}>
                  <User size={15} /> {displayName}
                </Link>
                <Link href="/compte/commandes" onClick={() => setMobileOpen(false)}
                  className="block py-2 text-sm font-medium opacity-70" style={{ color: "#18223b" }}>
                  📦 Mes commandes
                </Link>
                <button onClick={handleSignOut}
                  className="flex items-center gap-2 py-2 text-sm font-medium opacity-60" style={{ color: "#18223b" }}>
                  <LogOut size={14} /> Se déconnecter
                </button>
              </>
            ) : (
              <Link href="/auth/login" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-2 text-sm font-semibold" style={{ color: "#e67e22" }}>
                <User size={15} /> Se connecter
              </Link>
            )}
          </div>
        )}
      </header>
    </>
  );
}
