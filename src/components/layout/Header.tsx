"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/boutique?category=kits", label: "Kits" },
  { href: "/boutique?category=ouate", label: "100% Ouate" },
  { href: "/boutique?category=consommables", label: "Consommables" },
  { href: "/boutique", label: "Tout voir" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggleCart, getItemCount } = useCartStore();
  const { user, profile, signOut } = useAuth();
  const router = useRouter();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    useCartStore.persist.rehydrate();
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

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:opacity-60"
                  style={{ color: "#18223b" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions desktop */}
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
                <div className="relative">
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
                      <Link
                        href="/compte"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors hover:opacity-70"
                        style={{ color: "#18223b" }}
                      >
                        <User size={14} /> Mon compte
                      </Link>
                      <Link
                        href="/compte/commandes"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors hover:opacity-70"
                        style={{ color: "#18223b" }}
                      >
                        📦 Mes commandes
                      </Link>
                      <hr className="my-1" style={{ borderColor: "#ede9e0" }} />
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium w-full text-left transition-colors hover:opacity-70"
                        style={{ color: "#18223b" }}
                      >
                        <LogOut size={14} /> Se déconnecter
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                  style={{ backgroundColor: "#18223b", color: "white" }}
                >
                  <User size={15} /> Connexion
                </Link>
              )}
            </div>

            {/* Mobile */}
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

        {/* Menu mobile */}
        {mobileOpen && (
          <div className="md:hidden border-t px-4 py-4 space-y-2" style={{ borderColor: "#ede9e0", backgroundColor: "#F7F5F0" }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium" style={{ color: "#18223b" }}>
                {link.label}
              </Link>
            ))}
            <hr style={{ borderColor: "#ede9e0" }} />
            {user ? (
              <>
                <Link href="/compte" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-2 text-sm font-medium" style={{ color: "#18223b" }}>
                  <User size={15} /> {displayName}
                </Link>
                <Link href="/compte/commandes" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium opacity-70" style={{ color: "#18223b" }}>
                  📦 Mes commandes
                </Link>
                <button onClick={handleSignOut} className="flex items-center gap-2 py-2 text-sm font-medium opacity-60" style={{ color: "#18223b" }}>
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
