"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const teamTabs = [
  {
    id: "01",
    navLabel: "BOARD OF DIRECTORS",
    kicker: "LEADERSHIP",
    titleMain: "BOARD OF DIRECTORS",
    paragraphs: [
      "Our Board of Directors provides strategic oversight and governance to ensure Women for Women Rwanda fulfills its mission with accountability and impact."
    ],
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Board meeting"
  },
  {
    id: "02",
    navLabel: "MEET OUR TEAM",
    kicker: "OUR TEAM",
    titleMain: "MEET OUR TEAM",
    paragraphs: [
      "Our leadership team runs programs on the ground, builds partnerships, and supports our graduates to thrive." 
    ],
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Leadership"
  }
];

const boardMembers = [
  { name: "Jane Mukasa", role: "Chairperson", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" },
  { name: "Elijah Nkurunziza", role: "Treasurer", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop" },
  { name: "Amina Uwase", role: "Secretary", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop" },
  { name: "Pauline Iradukunda", role: "Member", image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop" },
  { name: "Grace Niyonsaba", role: "Member", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop" },
  { name: "Beatrice Habimana", role: "Member", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" }
];

const teamMembers = [
  { name: "Mr. Nkusi Bukeye Eric", role: "Team", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop" },
  { name: "Beatrice Biyoga", role: "Team", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop" },
  { name: "Debra Bowers", role: "Team", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop" },
  { name: "Alice Uwimana", role: "Team", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" },
  { name: "Josephine Mukamana", role: "Team", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop" },
  { name: "Claire Niyonzima", role: "Team", image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=800&auto=format&fit=crop" },
  { name: "Pauline Iradukunda", role: "Team", image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop" },
  { name: "Grace Niyonsaba", role: "Team", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop" },
  { name: "Beatrice Habimana", role: "Team", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" },
  { name: "Anne Mukarubega", role: "Team", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop" },
  { name: "Esther Uwizeyimana", role: "Team", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop" },
  { name: "Ruth Kayitesi", role: "Team", image: "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?q=80&w=800&auto=format&fit=crop" },
  { name: "Clementine Niyigena", role: "Team", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" },
  { name: "Martha Ingabire", role: "Team", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop" }
];

const leadership = [
  { name: "Susan Kamanzi", role: "Executive Director", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" },
  { name: "Mark Rwagasana", role: "Program Director", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=400&auto=format&fit=crop" },
  { name: "Claire Bizimana", role: "Operations Lead", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400&auto=format&fit=crop" }
];

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState("01");
  const active = teamTabs.find((t) => t.id === activeTab) ?? teamTabs[0];

  const members = activeTab === "01" ? boardMembers : teamMembers;

  return (
    <div className="flex flex-col font-[family-name:var(--font-montserrat)] antialiased bg-white">

      <section className="relative min-h-[52vh] w-full overflow-hidden bg-[#0C3F3C]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
            alt="Community gathering"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-y-0 left-0 w-[78%] bg-gradient-to-r from-[#06564F]/78 via-[#0A6D66]/52 to-transparent md:w-[62%]" />
          <div className="absolute left-0 top-0 h-full w-16 bg-[#045C55]/28 md:w-24" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-12 pt-16 md:px-12 md:pb-16 md:pt-20">
          <div className="max-w-3xl text-left text-white">
            <div className="mb-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">
              <Link href="/" className="transition-colors hover:text-white/80">Home</Link>
              <span className="mx-2 text-white/60">/</span>
              <Link href="/about" className="transition-colors hover:text-white/80">About Us</Link>
              <span className="mx-2 text-white/60">/</span>
              <span>Our Team</span>
            </div>

            <div className="mb-6 h-[2px] w-9 bg-white/30" />

            <h1 className="text-4xl md:text-[3.2rem] font-black uppercase leading-[0.92] tracking-tight">
              <span className="block">OUR</span>
              <span className="block font-light italic text-white/90">TEAM</span>
            </h1>

            <p className="mt-6 max-w-2xl text-[14px] leading-relaxed text-white/90">
              Meet the dedicated leaders and staff guiding Women for Women Rwanda's mission to promote dignity, freedom, and equality for women.
            </p>
          </div>
        </div>
      </section>

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

      <section className="bg-white pt-12 md:pt-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8 relative">
          <div className="max-w-3xl pt-2 md:pt-5 text-left">
            <div className="mb-6 flex items-center gap-3 md:mb-5">
              <span className="h-[2px] w-8 bg-[#00A991]" />
              <span className="text-[10px] font-black uppercase tracking-[0.28em] text-[#007A71] md:text-[11px]">{active.kicker}</span>
            </div>

            {activeTab === "01" ? (
              <h2 className="text-[26px] md:text-[36px] font-black uppercase leading-[0.94] tracking-tight text-[#0D2323] whitespace-nowrap">
                <span className="mr-3">BOARD OF</span>
                <span className="font-light italic text-[#00A991]">DIRECTORS</span>
              </h2>
            ) : (
              <h2 className="text-[26px] md:text-[36px] font-black uppercase leading-[0.94] tracking-tight text-[#0D2323]">
                {active.titleMain}
              </h2>
            )}

            <div className="mt-7 space-y-4 pb-10 font-medium leading-[1.82] text-[#6B7574] md:pb-12 text-[14px] md:text-[14px]">
              {active.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((m) => (
                <div key={m.name} className="overflow-hidden bg-white">
                  <div className="relative h-[360px] sm:h-[420px] w-full">
                    <Image src={m.image} alt={m.name} fill className="object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#06564F]/85 via-[#06564F]/40 to-transparent" />
                    <div className="absolute left-4 top-4 bg-[#00A991] text-white text-[11px] font-bold px-3 py-1 z-10">{m.role}</div>
                  </div>
                  <div className="p-5 text-left">
                    <div className="font-black text-base text-[#0D2323]">{m.name}</div>
                    <div className="mt-3">
                      <Link href="#" className="text-[#00A991] font-semibold text-[10px]">VIEW BIO</Link>
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

      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
            alt="Join our community"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-y-0 left-0 w-[78%] bg-gradient-to-r from-[#06564F]/80 via-[#0A6D66]/60 to-transparent md:w-[62%]" />
          <div className="absolute left-0 top-0 h-full w-16 bg-[#045C55]/28 md:w-24" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-8 py-12 md:py-20">
          <div className="max-w-2xl text-left text-white">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-[2px] w-8 bg-white/30" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">GET INVOLVED</span>
            </div>

            <h2 className="font-extrabold text-4xl md:text-[4.8rem] leading-[0.9] tracking-tight">
              <span className="block">JOIN OUR</span>
              <span className="block font-light italic text-white/90 text-4xl md:text-[5.6rem]">COMMUNITY</span>
            </h2>

            <p className="mt-6 text-[12px] md:text-[14px] max-w-lg text-white/90 leading-relaxed">
              Partner with us, volunteer, or donate — every action helps us reach more women across Rwanda and build a stronger nation together.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/partner" className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#007A71]">PARTNER WITH US</Link>
              <Link href="/careers" className="inline-flex items-center justify-center rounded-md border border-white/30 px-5 py-3 text-sm text-white/90">VIEW CAREERS</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
