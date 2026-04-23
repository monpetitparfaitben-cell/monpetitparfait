"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  ChevronLeft,
  Minus,
  Plus,
  Shield,
  ArrowLeft,
  Check,
  Lock,
  ShoppingCart,
} from "lucide-react";
import { getProductBySlug, formatPrice, PRODUCTS } from "@/lib/products";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/contexts/AuthContext";
import { PriceDisplay } from "@/components/auth/PriceGate";
import { ProductVariant } from "@/types";
import ProductCard from "@/components/store/ProductCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: PageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const { addItem } = useCartStore();
  const { user, getContractPrice, contract } = useAuth();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Prix résolu pour la variante sélectionnée
  const contractPrice = getContractPrice(selectedVariant.id);
  const resolvedPrice = contractPrice ?? selectedVariant.price;
  const totalPrice = resolvedPrice * quantity;

  const handleAddToCart = () => {
    if (!user) return;
    // Ajouter au panier avec le prix résolu (contractuel ou catalogue)
    addItem(
      product,
      { ...selectedVariant, price: resolvedPrice }, // prix résolu
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id && p.is_active
  ).slice(0, 4);

  const categoryEmoji =
    product.category === "kits" ? "🎁" : product.category === "ouate" ? "🧻" : "☕";

  const images = product.images && product.images.length > 0 ? product.images : null;

  return (
    <div style={{ backgroundColor: "#F7F5F0", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-sm mb-8 opacity-60"
          style={{ color: "#18223b" }}
        >
          <Link href="/" className="hover:opacity-100">Accueil</Link>
          <ChevronRight size={14} />
          <Link href="/boutique" className="hover:opacity-100">Boutique</Link>
          <ChevronRight size={14} />
          <span className="opacity-100 font-medium">{product.name}</span>
        </nav>

        <Link
          href="/boutique"
          className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-opacity hover:opacity-70"
          style={{ color: "#18223b" }}
        >
          <ArrowLeft size={16} /> Retour à la boutique
        </Link>

        {/* Product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div>
            {/* Thumbnails en haut */}
            {images && images.length > 1 && (
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIdx(i)}
                    className="w-16 h-16 rounded-xl relative overflow-hidden flex-shrink-0 transition-all duration-200"
                    style={{
                      border: `2.5px solid ${i === selectedImageIdx ? "#e67e22" : "#ede9e0"}`,
                      opacity: i === selectedImageIdx ? 1 : 0.6,
                    }}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Image principale avec flèches oranges */}
            <div
              className="relative"
              onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchStartX === null || !images) return;
                const delta = touchStartX - e.changedTouches[0].clientX;
                if (Math.abs(delta) > 40) {
                  if (delta > 0) {
                    setSelectedImageIdx((prev) => prev === images.length - 1 ? 0 : prev + 1);
                  } else {
                    setSelectedImageIdx((prev) => prev === 0 ? images.length - 1 : prev - 1);
                  }
                }
                setTouchStartX(null);
              }}
            >
              <div
                className="rounded-3xl aspect-square relative overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: "#ede9e0" }}
              >
                {images ? (
                  <Image
                    src={images[selectedImageIdx]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <span className="text-[10rem] select-none">{categoryEmoji}</span>
                )}
              </div>

              {/* Flèches navigation (uniquement si plusieurs images) */}
              {images && images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImageIdx((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{ backgroundColor: "transparent" }}
                    aria-label="Image précédente"
                  >
                    <ChevronLeft size={28} style={{ color: "#e67e22", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }} />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImageIdx((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{ backgroundColor: "transparent" }}
                    aria-label="Image suivante"
                  >
                    <ChevronRight size={28} style={{ color: "#e67e22", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Infos produit */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-50" style={{ color: "#18223b" }}>
              {product.category === "kits" && "Kit"}{product.category === "ouate" && "100% Ouate"}{product.category === "consommables" && "Consommable"}
            </p>

            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#18223b" }}>
              {product.name}
            </h1>


            {/* Prix */}
            <div className="mb-6">
              <PriceDisplay
                basePrice={selectedVariant.price}
                variantId={selectedVariant.id}
                showContractBadge={true}
              />
            </div>

            {/* Variants */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3" style={{ color: "#18223b" }}>
                Choisir la quantité :
              </p>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => {
                  const vContractPrice = getContractPrice(variant.id);
                  const vPrice = vContractPrice ?? variant.price;
                  const isSelected = selectedVariant.id === variant.id;

                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className="relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-left"
                      style={{
                        backgroundColor: isSelected ? "#18223b" : "white",
                        color: isSelected ? "white" : "#18223b",
                        border: `2px solid ${isSelected ? "#18223b" : "#ede9e0"}`,
                      }}
                    >
                      <span className="block">{variant.name}</span>
                      {user && (
                        <span className="block text-xs mt-0.5" style={{ opacity: isSelected ? 0.7 : 0.5 }}>
                          {formatPrice(vPrice)}
                          {vContractPrice && vContractPrice < variant.price && " 🤝"}
                        </span>
                      )}
                      {isSelected && (
                        <Check
                          size={12}
                          className="absolute -top-1.5 -right-1.5 text-white rounded-full p-0.5"
                          style={{ backgroundColor: "#e67e22" }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantité + CTA */}
            {user ? (
              <div className="flex gap-4 mb-8">
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ backgroundColor: "white", border: "2px solid #ede9e0" }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ color: "#18223b" }}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold w-6 text-center" style={{ color: "#18223b" }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ color: "#18223b" }}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-base font-bold text-white transition-all duration-200"
                  style={{ backgroundColor: added ? "#27ae60" : "#e67e22" }}
                >
                  {added ? (
                    <><Check size={18} /> Ajouté !</>
                  ) : (
                    <><ShoppingCart size={18} /> Ajouter — {formatPrice(totalPrice)}</>
                  )}
                </button>
              </div>
            ) : (
              <div
                className="rounded-2xl p-6 mb-8 text-center"
                style={{ backgroundColor: "#ede9e0" }}
              >
                <Lock size={24} className="mx-auto mb-3" style={{ color: "#18223b" }} />
                <p className="font-bold mb-1" style={{ color: "#18223b" }}>
                  Connectez-vous pour commander
                </p>
                <p className="text-sm opacity-70 mb-4" style={{ color: "#18223b" }}>
                  Nos prix sont personnalisés selon votre contrat professionnel
                </p>
                <div className="flex gap-3 justify-center">
                  <Link
                    href="/auth/login"
                    className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                    style={{ backgroundColor: "#18223b" }}
                  >
                    Se connecter
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ backgroundColor: "white", color: "#18223b", border: "2px solid #ede9e0" }}
                  >
                    Créer un compte
                  </Link>
                </div>
              </div>
            )}

            {/* Garanties */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm" style={{ color: "#18223b" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#e67e22" }}>
                  <Shield size={14} className="text-white" />
                </div>
                <span><strong>Paiement sécurisé</strong> — CB, Visa, Mastercard</span>
              </div>
            </div>

            {/* Badge contrat */}
            {contract && (
              <div
                className="mt-4 flex items-center gap-2 p-3 rounded-xl text-sm"
                style={{ backgroundColor: "#e67e2210", border: "1px solid #e67e2230" }}
              >
                <span className="text-base">🤝</span>
                <span style={{ color: "#18223b" }}>
                  Vous bénéficiez des prix du <strong>{contract.name}</strong>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="rounded-2xl p-8" style={{ backgroundColor: "white" }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: "#18223b" }}>Description</h2>
            <p className="text-sm leading-relaxed opacity-80" style={{ color: "#18223b" }}>
              {product.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ backgroundColor: "#F7F5F0", color: "#18223b" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="rounded-2xl p-8" style={{ backgroundColor: "white" }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: "#18223b" }}>Toutes les options</h2>
            <div className="space-y-3">
              {product.variants.map((variant) => {
                const vContractPrice = getContractPrice(variant.id);
                const vPrice = vContractPrice ?? variant.price;
                const isSelected = selectedVariant.id === variant.id;

                return (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className="w-full flex items-center justify-between p-3 rounded-xl transition-all"
                    style={{
                      backgroundColor: isSelected ? "#F7F5F0" : "transparent",
                      border: `2px solid ${isSelected ? "#18223b" : "#ede9e0"}`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {isSelected && <Check size={14} style={{ color: "#e67e22" }} />}
                      <span className="text-sm font-medium" style={{ color: "#18223b" }}>
                        {variant.name}
                      </span>
                    </div>
                    {user ? (
                      <div className="text-right">
                        <span className="font-bold text-sm" style={{ color: "#18223b" }}>
                          {formatPrice(vPrice)}
                        </span>
                        {vContractPrice && vContractPrice < variant.price && (
                          <>
                            <span className="text-xs ml-1.5 line-through opacity-40" style={{ color: "#18223b" }}>
                              {formatPrice(variant.price)}
                            </span>
                            <span className="block text-xs" style={{ color: "#e67e22" }}>🤝 contractuel</span>
                          </>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs opacity-40" style={{ color: "#18223b" }}>
                        <Lock size={12} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Produits similaires */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8" style={{ color: "#18223b" }}>Vous aimerez aussi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
