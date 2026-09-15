"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TRANSITION_MS = 1000;

type HeroSliderProps = {
  /** Image paths (from public), e.g. "/images/wfw/Home page/photo.jpg" */
  images: string[];
  /** Alt text prefix for each image */
  altPrefix?: string;
  /** Interval in ms between slides (default 7500) */
  interval?: number;
  /** Overlay gradient className (e.g. for teal overlay) */
  overlayClassName?: string;
  /** Section min height, default min-h-screen for home, pages can override */
  className?: string;
  /** object-position for the slides, e.g. "top" when subjects are framed near the top of the photo */
  imagePosition?: "top" | "center" | "bottom";
  children: React.ReactNode;
};

export function HeroSlider({
  images,
  altPrefix = "Hero",
  interval = 7500,
  overlayClassName = "bg-gradient-to-t from-black/30 via-black/5 to-transparent",
  className = "min-h-screen",
  imagePosition = "center",
  children,
}: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const count = images.length;
  const positionClass =
    imagePosition === "top" ? "object-top" : imagePosition === "bottom" ? "object-bottom" : "object-center";

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  // Autoplay; restarts whenever the slide changes (including manual nav) so a
  // manual click always buys a full interval before the next auto-advance.
  useEffect(() => {
    if (count <= 1 || isPaused) return;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % count);
    }, interval);
    return () => clearTimeout(id);
  }, [count, interval, isPaused, index]);

  if (!images.length) {
    return (
      <section className={`relative w-full flex items-center overflow-hidden bg-black ${className}`}>
        <div className="absolute inset-0 z-0 bg-[#0D6B63]" />
        <div className="relative z-10 w-full">{children}</div>
      </section>
    );
  }

  return (
    <section
      className={`relative w-full flex flex-col overflow-hidden bg-black ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 z-0">
        {images.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity ease-out"
            style={{
              opacity: i === index ? 1 : 0,
              transitionDuration: `${TRANSITION_MS}ms`,
            }}
            aria-hidden={i === index ? undefined : true}
          >
            <Image
              src={encodeURI(src)}
              alt={`${altPrefix} ${i + 1}`}
              fill
              className={`object-cover ${positionClass}`}
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous slide"
            className="group absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#00A991]/85 text-white transition-colors hover:bg-[#00A991] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:left-5 md:h-11 md:w-11"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next slide"
            className="group absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#00A991]/85 text-white transition-colors hover:bg-[#00A991] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:right-5 md:h-11 md:w-11"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 md:bottom-6">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </>
      )}

      <div className="relative z-10 flex flex-1 flex-col w-full">{children}</div>
    </section>
  );
}
