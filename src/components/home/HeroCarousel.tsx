"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ── Slides du carrousel ─────────────────────────────────────────
const SLIDES = [
  { img: "/images/products/kit%20capsules%20rectangle.jpg",  alt: "Kit Capsule Café" },
  { img: "/images/products/kit%20welcome%20rectangle.jpg",   alt: "Kit Gourmand" },
  { img: "/images/products/kit%20entretien%20rectangle.jpg", alt: "Kit Entretien" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const goTo = useCallback((idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  }, [animating]);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#F7F5F0", minHeight: "85vh" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch"
          style={{ minHeight: "85vh" }}
        >

          {/* ── Texte (gauche) ── */}
          <div className="flex flex-col justify-center py-16">
            <h1
              className="font-extrabold leading-tight mb-8"
              style={{
                color: "#18223b",
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              }}
            >
              L&apos;Essentiel<br />au Quotidien.
            </h1>

            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 self-start px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-[#18223b] hover:text-white"
              style={{
                border: "2px solid #18223b",
                color: "#18223b",
                backgroundColor: "transparent",
              }}
            >
              Découvrir la gamme <ArrowRight size={16} />
            </Link>

            {/* Indicateurs dots */}
            <div className="flex items-center gap-3 mt-10">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? "28px" : "8px",
                    height: "8px",
                    backgroundColor: i === current ? "#e67e22" : "#18223b",
                    opacity: i === current ? 1 : 0.2,
                  }}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ── Image (droite) — pleine hauteur ── */}
          <div
            className="relative order-first lg:order-last hidden lg:block"
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX === null) return;
              const delta = touchStartX - e.changedTouches[0].clientX;
              if (Math.abs(delta) > 40) {
                goTo(delta > 0
                  ? (current + 1) % SLIDES.length
                  : (current - 1 + SLIDES.length) % SLIDES.length
                );
              }
              setTouchStartX(null);
            }}
          >
            <div
              className="relative overflow-hidden transition-opacity duration-300 h-full"
              style={{
                borderRadius: "32px",
                opacity: animating ? 0 : 1,
                minHeight: "70vh",
              }}
            >
              <Image
                src={SLIDES[current].img}
                alt={SLIDES[current].alt}
                fill
                className="object-cover"
                sizes="55vw"
                priority
              />
            </div>
          </div>

          {/* ── Image mobile (en dessous du texte) ── */}
          <div
            className="relative lg:hidden"
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX === null) return;
              const delta = touchStartX - e.changedTouches[0].clientX;
              if (Math.abs(delta) > 40) {
                goTo(delta > 0
                  ? (current + 1) % SLIDES.length
                  : (current - 1 + SLIDES.length) % SLIDES.length
                );
              }
              setTouchStartX(null);
            }}
          >
            <div
              className="relative overflow-hidden transition-opacity duration-300"
              style={{
                borderRadius: "24px",
                aspectRatio: "4 / 3",
                opacity: animating ? 0 : 1,
              }}
            >
              <Image
                src={SLIDES[current].img}
                alt={SLIDES[current].alt}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
