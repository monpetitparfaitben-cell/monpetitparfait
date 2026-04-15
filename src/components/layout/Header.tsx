"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, User, Search } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const navLinks = [
  { href: "/boutique?category=kits", label: "Kits" },
  { href: "/boutique?category=ouate", label: "100% Ouate" },
  { href: "/boutique?category=consommables", label: "Consommables" },
  { href: "/boutique", label: "Tout voir" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggleCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hydrate cart store
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <>
      {/* Bandeau livraison */}
      <div className="bg-navy text-white text-center py-2 text-xs font-medium tracking-wide">
        🚚 Livraison offerte sans minimum d&apos;achat · Commande avant 14h = expédition le jour même
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-beige-100"
        }`}
        style={{ backgroundColor: scrolled ? undefined : "#F7F5F0" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span
                className="text-xl font-bold tracking-tight"
                style={{ color: "#18223b" }}
              >
                mon petit <span style={{ color: "#e67e22" }}>parfait</span>
              </span>
            </Link>

            {/* Navigation desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors duration-200 hover:opacity-70"
                  style={{ color: "#18223b" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/compte"
                className="p-2 rounded-full hover:bg-beige-200 transition-colors"
                style={{ color: "#18223b" }}
                aria-label="Mon compte"
              >
                <User size={20} />
              </Link>
              <button
                onClick={toggleCart}
                className="relative p-2 rounded-full hover:bg-beige-200 transition-colors"
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
            </div>

            {/* Mobile: panier + burger */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={toggleCart}
                className="relative p-2 rounded-full"
                style={{ color: "#18223b" }}
                aria-label="Panier"
              >
                <ShoppingCart size={22} />
                {itemCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    style={{ backgroundColor: "#e67e22" }}
                  >
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-md"
                style={{ color: "#18223b" }}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t px-4 py-4 space-y-3"
            style={{ borderColor: "#ede9e0", backgroundColor: "#F7F5F0" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium"
                style={{ color: "#18223b" }}
              >
                {link.label}
              </Link>
            ))}
            <hr style={{ borderColor: "#ede9e0" }} />
            <Link
              href="/compte"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 py-2 text-sm font-medium"
              style={{ color: "#18223b" }}
            >
              <User size={16} /> Mon compte
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
