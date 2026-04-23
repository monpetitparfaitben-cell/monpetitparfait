"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SLIDES = [
  { img: "/images/products/kit%20capsules%20rectangle.jpg",  alt: "Kit Capsule Café" },
  { img: "/images/products/kit%20welcome%20rectangle.jpg",   alt: "Kit Gourmand" },
  { img: "/images/products/kit%20entretien%20rectangle.jpg", alt: "Kit Entretien" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const goTo = useCallback((idx: number) => {
    if (fading || idx === current) return;
    setPrev(current);
    setCurrent(idx);
    setFading(true);
    setTimeout(() => {
      setPrev(null);
      setFading(false);
    }, 500);
  }, [fading, current]);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      goTo(delta > 0
        ? (current + 1) % SLIDES.length
        : (current - 1 + SLIDES.length) % SLIDES.length
      );
    }
    setTouchStartX(null);
  }, [touchStartX, current, goTo]);

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#F7F5F0", minHeight: "85vh" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-stretch"
          style={{ minHeight: "80vh" }}
        >
          {/* ── Texte (gauche) ── */}
          <div className="lg:col-span-2 flex flex-col justify-center py-16">
            <h1
              className="font-extrabold leading-tight mb-8"
              style={{ color: "#18223b", fontSize: "clamp(2.8rem, 6vw, 4.5rem)" }}
            >
              L&apos;Essentiel<br />au Quotidien.
            </h1>

            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 self-start px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-[#18223b] hover:text-white"
              style={{ border: "2px solid #18223b", color: "#18223b", backgroundColor: "transparent" }}
            >
              Découvrir la gamme <ArrowRight size={16} />
            </Link>

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

          {/* ── Image desktop — crossfade ── */}
          <div
            className="lg:col-span-3 relative order-first lg:order-last hidden lg:flex lg:items-center"
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="relative overflow-hidden w-full"
              style={{ borderRadius: "32px", aspectRatio: "16 / 10" }}
            >
              {/* Image précédente (fond, disparaît) */}
              {prev !== null && (
                <Image
                  key={`prev-${prev}`}
                  src={SLIDES[prev].img}
                  alt={SLIDES[prev].alt}
                  fill
                  className="object-cover"
                  sizes="60vw"
                  style={{ opacity: fading ? 0 : 1, transition: "opacity 500ms ease" }}
                />
              )}
              {/* Image courante (dessus, apparaît) */}
              <Image
                key={`curr-${current}`}
                src={SLIDES[current].img}
                alt={SLIDES[current].alt}
                fill
                className="object-cover"
                sizes="60vw"
                priority
                style={{ opacity: fading ? 1 : 1, transition: "opacity 500ms ease" }}
              />
            </div>
          </div>

          {/* ── Image mobile ── */}
          <div
            className="relative lg:hidden"
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="relative overflow-hidden w-full"
              style={{ borderRadius: "24px", aspectRatio: "4 / 3" }}
            >
              {prev !== null && (
                <Image
                  key={`mob-prev-${prev}`}
                  src={SLIDES[prev].img}
                  alt={SLIDES[prev].alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  style={{ opacity: fading ? 0 : 1, transition: "opacity 500ms ease" }}
                />
              )}
              <Image
                key={`mob-curr-${current}`}
                src={SLIDES[current].img}
                alt={SLIDES[current].alt}
                fill
                className="object-cover"
                sizes="100vw"
                priority
                style={{ opacity: 1 }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
