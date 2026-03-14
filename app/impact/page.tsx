"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  TrendingUp,
  Users,
  Smartphone,
  ShieldCheck,
  Award,
  Heart,
  Wifi,
} from "lucide-react";

type StatItem = {
  end: number;
  label: string;
  format: (value: number) => string;
};

function formatK(value: number) {
  const rounded = Math.round(value / 1000);
  return `${rounded}K+`;
}

function formatMoneyK(value: number) {
  const rounded = Math.round(value / 1000);
  return `$${rounded}K+`;
}

function StatCounter({ end, format }: { end: number; format: (v: number) => string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.max(1, Math.floor(eased * end)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end]);

  return <span>{format(value)}</span>;
}

const impactStats: StatItem[] = [
  { end: 80000, label: "Women served since 1997", format: formatK },
  { end: 500, label: "Business plan training recipients", format: (v) => `${v}+` },
  { end: 50000, label: "Business awards disbursed", format: formatMoneyK },
  { end: 143, label: "Digitized savings groups", format: (v) => `${v}+` },
];

const impactAreas = [
  {
    id: "01",
    title: "Economic Empowerment",
    body:
      "Our flagship socio-economic empowerment program and microcredit support have played a pivotal role in transforming over 80,000 women's lives across the country.",
    icon: TrendingUp,
  },
  {
    id: "02",
    title: "Graduate Networks",
    body:
      "We have established women graduates' networks in all sectors and districts of our current operation, spanning seven districts across Rwanda.",
    icon: Users,
  },
  {
    id: "03",
    title: "Digital Savings Groups",
    body:
      "We have digitized 143 women savings groups, enabling them to access mobile money services through feature phones.",
    icon: Smartphone,
  },
  {
    id: "04",
    title: "Men's Engagement Program",
    body:
      "Nearly 170 men have undergone training through the Men's Engagement Program, supporting women's rights in households and communities.",
    icon: ShieldCheck,
  },
  {
    id: "05",
    title: "Business Competitions",
    body:
      "Since 2016, more than 500 women have received training in business plan development and received awards worth over $50,000.",
    icon: Award,
  },
  {
    id: "06",
    title: "Adolescent Support",
    body:
      "We build resilience and sustainable socioeconomic livelihoods for young mothers to break the cycle of deep-rooted poverty.",
    icon: Heart,
  },
];

const milestones = [
  {
    year: "2016",
    title: "Business plan training launched",
    body:
      "Started business plan development training and competitions, with winners receiving seed money awards.",
  },
  {
    year: "2020",
    title: "Digital pilot success",
    body:
      "Conducted a successful pilot project with six savings groups for VSLA digitization.",
  },
  {
    year: "2020",
    title: "Scaled digitization",
    body:
      "An additional 54 savings groups digitized since October 2020, with plans to digitize 240 groups.",
  },
  {
    year: "2023",
    title: "7 districts covered",
    body:
      "Over 2,000 conventional savings groups monitored across seven districts, with ongoing digitization efforts.",
  },
];

export default function ImpactPage() {
  return (
    <div className="flex flex-col font-[family-name:var(--font-montserrat)] antialiased bg-white">
      {/* HERO */}
      <section className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#0C3F3C]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/site/impact-hero.jpg"
            alt="Our Impact"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B5E57]/85 via-[#0B5E57]/35 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 pt-14 lg:px-10">
          <div className="max-w-3xl text-white">
            <div className="mb-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span className="text-white/60">/</span>
              <span>Our Impact</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.95]">
              OUR
              <span className="block font-light italic text-white/80">IMPACT</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
              Over 23 years, we have expanded and adapted our programs to support more than 80,000
              marginalized women across the country.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#F4F7F6]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-12 text-center md:grid-cols-4 lg:px-10">
          {impactStats.map((stat) => (
            <div key={stat.label} className="bg-white px-4 py-10 shadow-sm">
              <div className="text-4xl md:text-5xl font-black text-[#007A71]">
                <StatCounter end={stat.end} format={stat.format} />
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[#6C7A78]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* APPROACH */}
      <section className="py-16 min-h-[calc(100vh-4rem)] flex items-center">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
          <div>
            <div className="mb-5 flex items-center gap-3 text-[#007A71]">
              <span className="h-[2px] w-10 bg-[#007A71]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Our Approach</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.95] text-[#0D2323]">
              27+ Years of
              <span className="block font-light italic text-[#007A71]">Transformation</span>
            </h2>

            <div className="mt-6 space-y-5 text-[14px] leading-relaxed text-[#6B7574]">
              <p>
                Over the past 23 years, we have continuously expanded and adapted our programs to
                provide support to more than 80,000 marginalized women across the country.
              </p>
              <p>
                To ensure a sustainable impact, we have established women graduates' networks in all
                sectors and districts of our current operation, spanning seven districts.
              </p>
              <p>
                In an innovative approach, we introduced the Men’s Engagement Program (MEP) to
                address gender inequalities and combat discriminatory customs and gender-based
                violence.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[380px] w-full overflow-hidden">
              <Image
                src="/images/site/impact-approach.jpg"
                alt="Districts covered"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-6 left-6 bg-[#007A71] px-8 py-5 text-white shadow-lg">
              <div className="text-4xl font-black leading-none">7</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.25em]">Districts covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* AREAS OF IMPACT */}
      <section className="bg-[#F6F6F2] py-16 min-h-[calc(100vh-4rem)] flex items-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-8 flex items-center gap-3 text-[#007A71]">
            <span className="h-[2px] w-10 bg-[#007A71]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Areas of Impact</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.95] text-[#0D2323]">
            How We
            <span className="ml-2 font-light italic text-[#007A71]">Create Change</span>
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {impactAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div key={area.id} className="relative bg-white p-6 shadow-sm">
                  <div className="absolute right-5 top-4 text-[28px] font-black text-[#CFE4E1]">
                    {area.id}
                  </div>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center bg-[#E7F3F1] text-[#007A71]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-[13px] font-black uppercase text-[#0D2323]">{area.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-[#6B7574]">{area.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DIGITAL TRANSFORMATION */}
      <section className="bg-[#0B1E1A] py-16 text-white min-h-[calc(100vh-4rem)] flex items-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-6 flex items-center gap-3 text-[#7BB6AF]">
            <span className="h-[2px] w-8 bg-[#0A8F82]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Key Milestones</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.95]">
            Digital
            <span className="ml-2 font-light italic text-[#8BA8A3]">Transformation</span>
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((item) => (
              <div key={item.title} className="border border-white/10 bg-[#0F2420] p-6">
                <div className="text-3xl font-black text-[#0A8F82]">{item.year}</div>
                <div className="mt-4 text-[12px] font-bold uppercase">{item.title}</div>
                <p className="mt-4 text-[12px] leading-relaxed text-white/60">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-[13px] text-white/65">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-white/10">
                <Wifi className="h-5 w-5 text-[#7BB6AF]" />
              </div>
              <p>
                Currently, we are closely monitoring over 2,000 conventional savings groups across
                seven districts. With funding secured, we plan to digitize 240 savings groups by 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JOIN OUR COMMUNITY */}
      <section className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/site/join-community.jpg"
            alt="Join our community"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A7F73]/82 via-[#0A7F73]/45 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="max-w-2xl text-white">
            <div className="mb-5 flex items-center gap-3 text-white/80">
              <span className="h-[2px] w-10 bg-white/50" />
              <span className="text-[10px] font-bold uppercase tracking-[0.34em]">Get Involved</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black uppercase leading-[0.95]">
              Join Our
              <span className="block font-light italic text-white/70">Community</span>
            </h2>

            <p className="mt-5 max-w-lg text-[14px] leading-relaxed text-white/85">
              Partner with us, volunteer, or donate. Every action helps us reach more women across Rwanda.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/partner" className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[#0A7F73]">
                Partner with us
              </Link>
              <Link href="/careers" className="inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-white">
                View careers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
