"use client";

import Image from "next/image";
import { useRef, useState } from "react";

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

function PartnerCard({ p }: { p: (typeof partners)[0] }) {
  return (
    <div className="flex-none w-[240px] sm:w-[260px] lg:w-[280px] shrink-0">
      <div className="h-24 bg-white shadow-md flex items-center justify-center p-4">
        <Image src={p.image} alt={p.alt} width={200} height={60} className="object-contain" />
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

  return (
    <section className="py-16 bg-white">
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
          className={`relative mt-8 overflow-x-auto partners-scrollbar-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ touchAction: "pan-x" }}
        >
          <div
            className="partners-infinite-slide flex gap-6 py-8 w-max"
            style={{ animationPlayState: isDragging ? "paused" : undefined }}
          >
            {partners.map((p) => (
              <PartnerCard key={p.id} p={p} />
            ))}
            {partners.map((p) => (
              <PartnerCard key={`${p.id}-dup`} p={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
