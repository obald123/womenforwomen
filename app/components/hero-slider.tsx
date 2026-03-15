"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const TRANSITION_MS = 800;

type HeroSliderProps = {
  /** Image paths (from public), e.g. "/images/wfw/Home page/photo.jpg" */
  images: string[];
  /** Alt text prefix for each image */
  altPrefix?: string;
  /** Interval in ms between slides (default 5000) */
  interval?: number;
  /** Overlay gradient className (e.g. for teal overlay) */
  overlayClassName?: string;
  /** Section min height, default min-h-screen for home, pages can override */
  className?: string;
  children: React.ReactNode;
};

export function HeroSlider({
  images,
  altPrefix = "Hero",
  interval = 5000,
  overlayClassName = "bg-gradient-to-r from-[#0D6B63]/75 via-[#0D6B63]/35 to-transparent",
  className = "min-h-screen",
  children,
}: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const count = images.length;
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Advance to next slide (0 -> 1 -> ... -> count; at count we show duplicate of first, then reset to 0)
  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => i + 1);
    }, interval);
    return () => clearInterval(id);
  }, [count, interval]);

  // When index === count, after transition ends jump back to 0 with no transition so loop is seamless
  useEffect(() => {
    if (count <= 1 || index !== count) return;
    resetTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }, TRANSITION_MS);
    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, [count, index]);

  if (!images.length) {
    return (
      <section className={`relative w-full flex items-center overflow-hidden bg-black ${className}`}>
        <div className="absolute inset-0 z-0 bg-[#0D6B63]" />
        <div className="relative z-10 w-full">{children}</div>
      </section>
    );
  }

  const slideCount = count * 2;
  const displayIndex = count <= 1 ? 0 : Math.min(index, count);
  const translatePercent = count <= 1 ? 0 : (displayIndex / slideCount) * 100;

  return (
    <section className={`relative w-full flex flex-col overflow-hidden bg-black ${className}`}>
      <div className="absolute inset-0 z-0">
        <div
          className="flex h-full ease-out"
          style={{
            width: `${slideCount * 100}%`,
            transform: `translateX(-${translatePercent}%)`,
            transition: isTransitioning ? `transform ${TRANSITION_MS}ms ease-out` : "none",
          }}
        >
          {images.map((src, i) => (
            <div key={`a-${i}`} className="relative h-full flex-none" style={{ width: `${100 / slideCount}%` }}>
              <Image
                src={encodeURI(src)}
                alt={`${altPrefix} ${i + 1}`}
                fill
                className="object-cover object-center"
                sizes="100vw"
                priority={i === 0}
              />
            </div>
          ))}
          {count > 1 && images.map((src, i) => (
            <div key={`b-${i}`} className="relative h-full flex-none" style={{ width: `${100 / slideCount}%` }}>
              <Image
                src={encodeURI(src)}
                alt={`${altPrefix} ${i + 1}`}
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>

      <div className="relative z-10 flex flex-1 flex-col w-full">{children}</div>
    </section>
  );
}
