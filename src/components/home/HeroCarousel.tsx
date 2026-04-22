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
      style={{ backgroundColor: "#F7F5F0", minHeight: "88vh" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          style={{ minHeight: "88vh", paddingTop: "4rem", paddingBottom: "4rem" }}
        >

          {/* ── Texte (gauche) — identique pour tous les slides ── */}
          <div className="flex flex-col justify-center">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "#e67e22" }}
            >
              NOUVELLE COLLECTION
            </p>

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

          {/* ── Image (droite) — change à chaque slide ── */}
          <div className="relative order-first lg:order-last">
            <div
              className="relative overflow-hidden transition-opacity duration-300"
              style={{
                borderRadius: "32px",
                aspectRatio: "4 / 3",
                opacity: animating ? 0 : 1,
              }}
            >
              <Image
                src={SLIDES[current].img}
                alt={SLIDES[current].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
