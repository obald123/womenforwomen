"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const partners = [
  {
    id: "google",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    alt: "Google",
  },
  {
    id: "microsoft",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    alt: "Microsoft",
  },
  {
    id: "amazon",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    alt: "Amazon",
  },
  
  {
    id: "ibm",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    alt: "IBM",
  },
  
];

export default function PartnersCarousel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);

  // Autoplay: scrolls the list periodically. Pauses on hover/touch.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const computeStep = () => {
      const card = el.querySelector("[data-card]") as HTMLElement | null;
      const gapStr = getComputedStyle(el).gap || "16";
      const gap = parseInt(gapStr as string) || 16;
      return card ? card.clientWidth + gap : Math.round(el.clientWidth * 0.8);
    };

    const doScroll = () => {
      const step = computeStep();
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    };

    const interval = window.setInterval(() => {
      if (!pausedRef.current) doScroll();
    }, 3500);

    const handleMouseEnter = () => (pausedRef.current = true);
    const handleMouseLeave = () => (pausedRef.current = false);
    const handleTouchStart = () => (pausedRef.current = true);
    const handleTouchEnd = () => (pausedRef.current = false);

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      clearInterval(interval);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Keep UI markup minimal: no prev/next controls (autoplay-only)
  return (
    <section className="py-14 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-[2px] w-12 bg-[#00A991]" />
          <div className="text-[13px] uppercase tracking-[0.25em] text-[#00A991] font-extrabold">PARTNERS</div>
        </div>

        <h3 className="text-4xl font-black text-[#0D2323]">
          OUR TRUSTED <span className="italic font-light text-[#00A991]">PARTNERS</span>
        </h3>

        <p className="mt-3 text-sm text-[#496662] max-w-2xl">
          We are proud to collaborate with leading organizations and foundations whose generous support enables us to empower women and transform communities across Rwanda.
        </p>

        <div className="relative mt-8">
          <div
            ref={containerRef}
            className="partners-scrollbar-hidden mx-auto overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-6 py-6"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {partners.map((p) => (
              <div key={p.id} data-card className="flex-none w-[220px] sm:w-[240px] lg:w-[260px] snap-start">
                <div className="h-20 bg-white shadow-md flex items-center justify-center p-4">
                  <Image src={p.image} alt={p.alt} width={200} height={60} className="object-contain" />
                </div>
              </div>
            ))}
          </div>
          {/* Controls removed: autoplay handles sliding */}
        </div>
      </div>
    </section>
  );
}
