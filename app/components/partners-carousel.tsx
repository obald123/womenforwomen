"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const partners = [
  { id: "partner-1", image: "/images/wfw/parteners/home-partens1.png", alt: "Partner logo 1" },
  { id: "partner-2", image: "/images/wfw/parteners/home-partens2.png", alt: "Partner logo 2" },
  { id: "partner-3", image: "/images/wfw/parteners/home-partens3.png", alt: "Partner logo 3" },
  { id: "partner-4", image: "/images/wfw/parteners/home-partens4.png", alt: "Partner logo 4" },
  { id: "partner-5", image: "/images/wfw/parteners/home-partens5.png", alt: "Partner logo 5" },
  { id: "partner-6", image: "/images/wfw/parteners/home-parterns2.png", alt: "Partner logo 6" },
];

function PartnerCard({ p }: { p: (typeof partners)[0] }) {
  return (
    <div className="flex-none w-[200px] sm:w-[240px] lg:w-[280px] shrink-0">
      <div className="relative h-16 sm:h-20 lg:h-24">
        <Image
          src={p.image}
          alt={p.alt}
          fill
          sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 280px"
          className="object-contain object-center"
          priority
        />
      </div>
    </div>
  );
}

export default function PartnersCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, startScrollLeft: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    trackRef.current.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragState.current = {
      startX: e.clientX,
      startScrollLeft: trackRef.current.scrollLeft,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current) return;
    const dx = e.clientX - dragState.current.startX;
    trackRef.current.scrollLeft = dragState.current.startScrollLeft - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    try {
      trackRef.current.releasePointerCapture(e.pointerId);
    } catch {
      // no-op
    }
    setIsDragging(false);
  };

  const loopPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-white overflow-hidden">
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

        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className={`relative mt-8 partners-scrollbar-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ touchAction: "pan-x" }}
        >
          <div className="partners-infinite-mask">
            <div
              className="partners-infinite-slide flex items-center gap-10 py-6 w-max"
              style={{ animationPlayState: isDragging ? "paused" : undefined }}
            >
              {loopPartners.map((p, idx) => (
                <PartnerCard key={`${p.id}-${idx}`} p={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
