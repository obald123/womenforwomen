"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HeroSlider } from "../components/hero-slider";
import { JoinCommunitySection } from "../components/join-community-section";
import { publicFetch } from "../../lib/publicApi";

const TEAM_HERO_IMAGES = [
  "/images/wfw/slide 2/Born from resilience.jpg",
  "/images/wfw/slide 2/Learn, share and support.jpeg",
  "/images/wfw/slide 2/7 districts.jpg",
];

const teamTabs = [
  {
    id: "01",
    navLabel: "BOARD OF DIRECTORS",
    kicker: "LEADERSHIP",
    titleMain: "BOARD OF DIRECTORS",
    paragraphs: [
      "Our Board of Directors provides strategic oversight and governance to ensure Women for Women Rwanda fulfills its mission with accountability and impact."
    ],
  },
  {
    id: "02",
    navLabel: "MEET OUR TEAM",
    kicker: "OUR TEAM",
    titleMain: "MEET OUR TEAM",
    paragraphs: [
      "Our leadership team runs programs on the ground, builds partnerships, and supports our graduates to thrive." 
    ],
  }
];

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState("01");
  const [board, setBoard] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

  useEffect(() => {
    publicFetch<any>("/api/public/team")
      .then((res) => {
        const items = Array.isArray(res.data) ? res.data : [];
        const boardItems = items.filter((i: any) => i.category === "BOARD");
        const teamItems = items.filter((i: any) => i.category !== "BOARD");
        setBoard(boardItems);
        setTeam(teamItems);
      })
      .catch(() => {});
  }, []);

  const active = teamTabs.find((t) => t.id === activeTab) ?? teamTabs[0];
  const members = activeTab === "01" ? board : team;

  return (
    <div className="flex flex-col font-[family-name:var(--font-montserrat)] antialiased bg-white">

      <HeroSlider
        images={TEAM_HERO_IMAGES}
        altPrefix="Our Team"
        overlayClassName="bg-gradient-to-r from-[#0D6B63]/80 via-[#0D6B63]/35 to-transparent"
        className="min-h-screen"
      >
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 items-center">
            <div className="mx-auto w-full max-w-7xl px-6 pt-20 lg:px-8">
              <div className="max-w-4xl text-white">
                <div className="mb-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90">
                  <Link href="/" className="transition-colors hover:text-white/80">
                    Home
                  </Link>
                  <span className="text-white/60">/</span>
                  <Link href="/about" className="transition-colors hover:text-white/80">
                    About Us
                  </Link>
                  <span className="text-white/60">/</span>
                  <span>Our Team</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-8xl font-[900] leading-[0.85] tracking-tighter uppercase">
                  MEET THE
                  <span className="block font-extralight italic text-[#4DD9C4] py-2">
                    TEAM
                  </span>
                  <span className="block">BEHIND</span>
                  <span className="block">THE MISSION</span>
                </h1>

                <p className="mt-8 max-w-2xl text-sm md:text-base leading-relaxed text-white/90 font-medium">
                  Meet the dedicated leaders and staff guiding Women for Women Rwanda&apos;s
                  mission to promote dignity, freedom, and equality for women.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-12 right-12 z-20 hidden md:flex flex-col items-center gap-6">
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.5em] rotate-90 origin-right translate-y-8 opacity-70">
              Scroll
            </span>
            <div className="h-24 w-[1px] bg-white/30" />
          </div>
        </div>
      </HeroSlider>

      <section className="relative z-20 border-b border-[#D8DEDD] bg-[#E7ECEB]">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex overflow-x-auto">
            {teamTabs.map((tab) => {
              const isActive = tab.id === activeTab;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 border-b-2 px-4 py-2 text-left transition-colors md:px-5 ${
                    isActive
                      ? "border-[#00A991] bg-white text-[#007A71]"
                      : "border-transparent bg-transparent text-[#97A2A1] hover:text-[#6E7877]"
                  }`}
                >
                  <span className="mr-1 text-[9px] font-semibold tracking-[0.1em] opacity-80 md:text-[10px]">{tab.id}</span>
                  <span className="text-[10px] font-black tracking-[0.06em] md:text-[11px]">{tab.navLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="team-section" className="bg-white pt-12 md:pt-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8 relative">
          <div className="max-w-3xl pt-2 md:pt-5 text-left">
            <div className="mb-6 flex items-center gap-3 md:mb-5">
              <span className="h-[2px] w-8 bg-[#00A991]" />
              <span className="text-[10px] font-black uppercase tracking-[0.28em] text-[#007A71] md:text-[11px]">{active.kicker}</span>
            </div>

            <h2 className="text-[26px] md:text-[36px] font-black uppercase leading-[0.94] tracking-tight text-[#0D2323]">
              {active.titleMain}
            </h2>

            <div className="mt-7 space-y-4 pb-10 font-medium leading-[1.82] text-[#6B7574] md:pb-12 text-[14px] md:text-[14px]">
              {active.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((m: any, idx: number) => (
                <div key={`${m.name}-${idx}`} className="overflow-hidden bg-white">
                  <div className="relative h-[360px] sm:h-[420px] w-full">
                    {m.photo ? (
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        sizes="100vw"
                        className="object-cover object-center"
                      />
                    ) : (
                      <div className="h-full w-full bg-[#E7ECEB]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#06564F]/85 via-[#06564F]/40 to-transparent" />
                    <div className="absolute left-4 top-4 bg-[#00A991] text-white text-[11px] font-bold px-3 py-1 z-10">{m.role}</div>
                  </div>
                  <div className="p-5 text-left">
                    <div className="font-black text-base text-[#0D2323]">{m.name}</div>
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => setSelectedMember(m)}
                        className="text-[#00A991] font-semibold text-[10px]"
                      >
                        VIEW BIO
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#07211D]">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <p className="mx-auto max-w-3xl text-center text-[13px] md:text-[15px] italic text-[#D4E9E6] leading-relaxed">
            "Women for Women Rwanda (WfW-Rwanda) is a national organization created and legally
            registered in 2020. The organization recently transitioned from Women for Women International that
            has been operating in Rwanda since 1997."
          </p>
        </div>
      </section>

      <JoinCommunitySection />

      {selectedMember && (
        <div className="fixed inset-0 z-[90] bg-black/70 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-3xl bg-white shadow-2xl">
              <div className="relative min-h-[280px] w-full overflow-hidden bg-[#0C3F3C]">
                {selectedMember.photo ? (
                  <Image
                    src={selectedMember.photo}
                    alt={selectedMember.name}
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#0C3F3C]" />
                )}
                <div className="absolute inset-0 bg-black/45" />
                <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-[#06564F]/85 via-[#0A6D66]/45 to-transparent md:w-[55%]" />
                <div className="absolute right-6 top-6">
                  <button
                    type="button"
                    onClick={() => setSelectedMember(null)}
                    className="text-[10px] font-black tracking-[0.2em] text-white/80 hover:text-white"
                  >
                    CLOSE
                  </button>
                </div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="mb-3 inline-flex bg-[#00A991] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                    {selectedMember.role}
                  </div>
                  <div className="text-3xl md:text-4xl font-black uppercase leading-[0.95]">
                    {selectedMember.name}
                  </div>
                </div>
              </div>

              <div className="px-8 py-8">
                <p className="text-[15px] leading-relaxed text-[#5F6E6C]">
                  {selectedMember.bio || "Bio coming soon."}
                </p>
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedMember(null)}
                    className="inline-flex items-center gap-2 text-[#007A71] font-bold uppercase text-[11px] tracking-[0.22em]"
                  >
                    Back to Team
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#007A71]">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 6H2M6 10L2 6L6 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
