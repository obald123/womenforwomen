"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

export type ImpactArea = {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

type ImpactAreasScrollerProps = {
  areas: ImpactArea[];
  eyebrow: string;
  title: string;
  titleAccent: string;
};

/**
 * Pins the heading and one pair of cards for a run of page scroll: the wrapper
 * is N screens tall and the inner panel sticks to the top for that whole run,
 * so the heading never moves while the pairs swap. Page scroll drives which
 * pair shows, which keeps the behaviour identical scrolling up and down.
 */
export function ImpactAreasScroller({ areas, eyebrow, title, titleAccent }: ImpactAreasScrollerProps) {
  const pairs: ImpactArea[][] = [];
  for (let i = 0; i < areas.length; i += 2) pairs.push(areas.slice(i, i + 2));

  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const runway = rect.height - window.innerHeight;
      if (runway <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / runway));
      const idx = Math.min(pairs.length - 1, Math.floor(progress * pairs.length));
      setActive((prev) => (prev === idx ? prev : idx));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pairs.length]);

  const middleIndex = Math.floor((pairs.length - 1) / 2);

  return (
    <div ref={wrapRef} className="relative" style={{ height: `${pairs.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-[#F6F6F2] pt-[72px] sm:pt-[84px]">
        <div className="mx-auto w-full max-w-7xl shrink-0 px-6 pb-6 pt-8 lg:px-10">
          <div className="mb-4 flex items-center gap-3 text-[#007A71]">
            <span className="h-[2px] w-10 bg-[#007A71]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]">{eyebrow}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-[0.95] text-[#0D2323]">
            {title}
            <span className="ml-2 font-light italic text-[#007A71]">{titleAccent}</span>
          </h2>
        </div>

        <div className="relative min-h-0 flex-1">
          {pairs.map((pair, i) => {
            const isActive = active === i;
            return (
              <div
                key={i}
                aria-hidden={!isActive}
                className={`absolute inset-0 flex items-center justify-center px-6 transition-all duration-500 ease-out ${
                  i === middleIndex ? "bg-[#0B5E57]" : ""
                } ${isActive ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-8"}`}
              >
                <div className="grid w-full max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
                  {pair.map((area) => {
                    const Icon = area.icon;
                    return (
                      <div
                        key={area.id}
                        className="group relative bg-white p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lg md:p-10"
                      >
                        <div className="absolute right-6 top-5 text-[36px] font-black text-[#CFE4E1]">
                          {area.id}
                        </div>
                        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center bg-[#E7F3F1] text-[#007A71] transition-transform duration-300 ease-out group-hover:scale-110">
                          <Icon className="h-7 w-7" />
                        </div>
                        <h3 className="text-base font-black uppercase text-[#0D2323]">{area.title}</h3>
                        <p className="mt-4 text-sm leading-relaxed text-[#6B7574]">{area.body}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
