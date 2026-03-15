"use client";

import Link from "next/link";
import { HeroSlider } from "./hero-slider";

const JOIN_COMMUNITY_IMAGES = [
  "/images/site/join-community.jpg",
  "/images/site/home-impact.jpg",
  "/images/site/impact-hero.jpg",
  "/images/site/gallery-1.jpg",
  "/images/site/gallery-4.jpg",
  "/images/site/gallery-7.jpg",
];

type JoinCommunitySectionProps = {
  className?: string;
};

export function JoinCommunitySection({ className = "" }: JoinCommunitySectionProps) {
  return (
    <HeroSlider
      images={JOIN_COMMUNITY_IMAGES}
      altPrefix="Join Our Community"
      overlayClassName="bg-gradient-to-r from-[#0A7F73]/85 via-[#0A7F73]/45 to-transparent"
      className={`min-h-screen ${className}`}
    >
      <div className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
          <div className="max-w-2xl text-white">
            <div className="mb-5 flex items-center gap-3 text-white/80">
              <span className="h-[2px] w-10 bg-white/50" />
              <span className="text-[10px] font-bold uppercase tracking-[0.34em]">
                Get Involved
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black uppercase leading-[0.95]">
              Join Our
              <span className="block font-light italic text-white/70">Community</span>
            </h2>

            <p className="mt-5 max-w-lg text-[14px] leading-relaxed text-white/85">
              Partner with us, volunteer, or donate -- every action helps us reach more women across Rwanda and build a stronger nation together.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/partner"
                className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[#0A7F73]"
              >
                Partner With Us
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-white"
              >
                View Careers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </HeroSlider>
  );
}
