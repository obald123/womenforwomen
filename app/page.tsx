"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import PartnersCarousel from "./components/partners-carousel";
import { HeroSlider } from "./components/hero-slider";
import { JoinCommunitySection } from "./components/join-community-section";
import { publicFetch, resolveImageUrl } from "../lib/publicApi";

const HOME_HERO_IMAGES = [
  "/images/site/home-slide.jpg",
  "/images/wfw/Home page/Strengthening women-led businesses.jpg",
  "/images/wfw/Home page/Socio-economic empowerment.jpg",
  "/images/wfw/Home page/Graduation out of poverty.JPG",
  "/images/site/home-skills training.jpeg",
  "/images/wfw/Home page/Over 25 years of transformation.jpg",
];

const IMPACT_SLIDES = [
  "/images/site/home-23yearsof transformation.jpeg",
  "/images/wfw/Home page/Over 25 years of transformation.jpg",
  "/images/wfw/Home page/Strengthening women-led businesses.jpg",
  "/images/wfw/Home page/Socio-economic empowerment.jpg",
  "/images/wfw/Home page/Empowering change through skills building.jpg",
];

const FALLBACK_LATEST = [
  {
    title: "From Setbacks to Strength",
    slug: "from-setbacks-to-strength",
    image: "/images/site/gallery-1.jpg",
    date: "2025-09-04",
  },
  {
    title: "Empowered Women, Thriving Communities",
    slug: "empowered-women-thriving-communities",
    image: "/images/site/gallery-2.jpg",
    date: "2025-08-26",
  },
  {
    title: "Empowering Change through Skill Building",
    slug: "empowering-change-through-skill-building",
    image: "/images/site/gallery-3.jpg",
    date: "2025-07-14",
  },
  {
    title: "Celebrating the Graduation of 100 Women in Ibare",
    slug: "celebrating-the-graduation-of-100-women-in-ibare",
    image: "/images/site/gallery-4.jpg",
    date: "2025-07-12",
  },
  {
    title: "From Dreams to Determination",
    slug: "from-dreams-to-determination",
    image: "/images/site/gallery-5.jpg",
    date: "2025-07-09",
  },
];

function StatCounter({
  end,
  suffix = "+",
  duration = 1800,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setHasAnimated(true);
        let startTime: number | null = null;

        const tick = (now: number) => {
          if (startTime === null) startTime = now;
          const progress = Math.min(1, (now - startTime) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * end));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  const formatted = value.toLocaleString() + suffix;
  return <div ref={ref}>{formatted}</div>;
}

type GlassCardFormat = "k" | "plus" | "moneyK" | "plain";

function GlassCardStatCounter({
  end,
  format,
  start,
  duration = 1600,
}: {
  end: number;
  format: GlassCardFormat;
  start: boolean;
  duration?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end, start, duration]);

  const formatted =
    format === "k"
      ? `${value.toLocaleString()}K+`
      : format === "plus"
        ? `${value.toLocaleString()}+`
        : format === "moneyK"
          ? `$${value}K+`
          : String(value);
  return <>{formatted}</>;
}

function formatShortDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

export default function Home() {
  const glassCardRef = useRef<HTMLDivElement | null>(null);
  const [glassCardProgress, setGlassCardProgress] = useState(0);
  const [glassCardAnimated, setGlassCardAnimated] = useState(false);
  const [latest, setLatest] = useState<any[]>([]);

  useEffect(() => {
    const element = glassCardRef.current;
    if (!element) return;

    let frameId = 0;

    const updateProgress = () => {
      frameId = 0;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const visiblePx = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      const visibleRatio = Math.max(0, Math.min(1, visiblePx / rect.height));

      setGlassCardProgress((prev) =>
        Math.abs(prev - visibleRatio) > 0.01 ? visibleRatio : prev
      );
    };

    const onViewportChange = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("resize", onViewportChange);

    return () => {
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  useEffect(() => {
    publicFetch<any>("/api/public/articles?pageSize=5")
      .then((res) => setLatest(Array.isArray(res.data) ? res.data : []))
      .catch(() => setLatest([]));
  }, []);

  const latestItems = latest.length ? latest : FALLBACK_LATEST;

  useEffect(() => {
    const el = glassCardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setGlassCardAnimated(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col font-[family-name:var(--font-montserrat)] antialiased bg-white">
      
      {/* SECTION 1: HERO - Sliding images from wfw/Home page */}
      <HeroSlider
        images={HOME_HERO_IMAGES}
        altPrefix="Women Empowerment Rwanda"
        overlayClassName="bg-gradient-to-r from-[#0D6B63]/75 via-[#0D6B63]/35 to-transparent"
        className="min-h-screen"
      >
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 items-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full pt-20">
              <div className="max-w-4xl relative">
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-[900] leading-[0.85] text-white tracking-tighter uppercase">
                  STRONGER<br />
                  <span className="font-extralight italic text-[#4DD9C4] block py-2">WOMEN,</span>
                  <span className="block">STRONGER</span>
                  <span className="block">NATION</span>
                </h1>

                <p className="mt-8 text-sm md:text-base text-white leading-relaxed font-medium max-w-2xl">
                  Every woman possesses the potential to shape her world. When women unite, they wield the strength to create a brighter collective future for Rwanda.
                </p>

                <div className="mt-12 flex flex-wrap gap-5 pb-12">
                  <Link href="/programs" className="rounded-sm bg-white px-7 py-3 text-[11px] font-black tracking-[0.2em] text-[#0D6B63] transition-all hover:bg-gray-100 uppercase">
                    Explore Programs
                  </Link>
                  <Link href="/impact" className="rounded-sm border-2 border-white/60 bg-white/5 backdrop-blur-sm px-7 py-3 text-[11px] font-black tracking-[0.2em] text-white transition-all hover:bg-white/10 uppercase">
                    See Our Impact
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-12 right-12 z-20 hidden md:flex flex-col items-center gap-6">
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.5em] rotate-90 origin-right translate-y-8 opacity-70">Scroll</span>
            <div className="h-24 w-[1px] bg-white/30" />
          </div>
        </div>
      </HeroSlider>

      {/* SECTION 2: STATS BAR */}
      <section className="bg-[#F0F7F6] py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#00A991]">
                <StatCounter end={80000} />
              </div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Women Served Since 1997</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#00A991]">
                <StatCounter end={3160} />
              </div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">VSLAs Created Nationwide</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#00A991]">
                <StatCounter end={390} />
              </div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Digitalized Savings Groups</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#00A991]">
                <StatCounter end={170} />
              </div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Men Engaged as Advocates</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: BORN FROM RESILIENCE */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT SIDE - IMAGE GRID */}
            <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[600px]">
              {/* First Image - Large: COHORT 2024 */}
              <div className="group relative overflow-hidden rounded-lg row-span-2">
                <Image 
                  src="/images/site/aboutus-cohort 2024.jpeg"
                  alt="Women in cohort program"
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3">
                  <span className="inline-block bg-[#0D6B63] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white rounded-sm">
                    COHORT 
                  </span>
                </div>
              </div>
              {/* Second Image - LEARNING TOGETHER */}
              <div className="group relative overflow-hidden rounded-lg">
                <Image 
                  src="/images/site/home-grid-2.jpg"
                  alt="Community gathering"
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute bottom-3 left-3">
                  <span className="inline-block bg-[#0D6B63] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white rounded-sm">
                    LEARNING TOGETHER
                  </span>
                </div>
              </div>
              {/* Third Image - SKILLS TRAINING */}
              <div className="group relative overflow-hidden rounded-lg">
                <Image 
                  src="/images/site/aboutus-home.jpeg"
                  alt="Skills training"
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3">
                  <span className="inline-block bg-[#0D6B63] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white rounded-sm">
                    SKILLS TRAINING
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - CONTENT */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 bg-[#00A991]" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00A991]">Our Story</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black text-[#1F2937] leading-[1.05]">
                BORN FROM<br />
                <span className="italic font-light text-[#00A991]">RESILIENCE</span>
              </h2>
              
              <p className="text-base text-gray-600 leading-relaxed">
                Women for Women Rwanda (WfW-Rwanda) is a non-governmental organization 
                committed to promoting dignity, freedom, and equality for women. Our journey 
                began in 1997 when we witnessed the devastating effects of the 1994 genocide 
                on vulnerable women facing poverty, depression, and helplessness.
              </p>
              
              <p className="text-base text-gray-600 leading-relaxed">
                In 2021, we became a local Rwandan affiliate. Every year, more than 300 women 
                aged 18–55 are enrolled in our 12-month signature program, meeting bi-weekly 
                in groups of 25 to learn, share, and support one another.
              </p>

              {/* Program Pills/Tags */}
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="inline-block border border-[#00A991]/30 bg-[#E6F6F4] px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A991]">
                  Health & Wellness
                </span>
                <span className="inline-block border border-[#00A991]/30 bg-[#E6F6F4] px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A991]">
                  GBV Prevention
                </span>
                <span className="inline-block border border-[#00A991]/30 bg-[#E6F6F4] px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A991]">
                  Women&apos;s Leadership
                </span>
                <span className="inline-block border border-[#00A991]/30 bg-[#E6F6F4] px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A991]">
                  Business Skills
                </span>
                <span className="inline-block border border-[#00A991]/30 bg-[#E6F6F4] px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A991]">
                  Vocational Training
                </span>
                <span className="inline-block border border-[#00A991]/30 bg-[#E6F6F4] px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A991]">
                  Cooperative Building
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR PROGRAMS */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-[2px] w-8 bg-[#00A991]"></div>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00A991]">What We Do</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-[#1F2937] leading-tight">
                OUR <span className="italic font-light text-[#00A991]">PROGRAMS</span>
              </h2>
            </div>
            <Link href="/programs" className="mt-6 md:mt-0 text-[#00A991] font-black text-[11px] uppercase tracking-[0.2em] hover:text-[#008f7a] transition-colors flex items-center gap-2">
              View All Programs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

                    {/* Program Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - Graduation Out of Poverty */}
            <Link href="/programs?tab=01" className="relative h-[500px] overflow-hidden rounded-lg group cursor-pointer block">
              <Image 
                src="/images/site/programs-graduate.jpg"
                alt="Graduation Out of Poverty"
                fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D6B63]/95 via-[#0D6B63]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/70 block mb-3">
                  01 - Graduation Out of Poverty
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight uppercase">
                  Graduation Out<br />of Poverty
                </h3>
              </div>
            </Link>

            {/* Card 2 - Support Program */}
            <Link href="/programs?tab=02" className="relative h-[500px] overflow-hidden rounded-lg group cursor-pointer block">
              <Image 
                src="/images/site/programs-complementary.jpg"
                alt="Socioeconomic Empowerment"
                fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D6B63]/95 via-[#0D6B63]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/70 block mb-3">
                  02 - Support Program
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight uppercase">
                  Socioeconomic<br />Empowerment
                </h3>
              </div>
            </Link>

            {/* Card 3 - Development Program */}
            <Link href="/programs?tab=03" className="relative h-[500px] overflow-hidden rounded-lg group cursor-pointer block">
              <Image 
                src="/images/site/programs-core.jpg"
                alt="Strengthening Women-Led Businesses"
                fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D6B63]/95 via-[#0D6B63]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/70 block mb-3">
                  03 - Development Program
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight uppercase">
                  Strengthening<br />Women-Led<br />Businesses
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: IMPACT - 23 YEARS OF TRANSFORMATION */}
      <HeroSlider
        images={IMPACT_SLIDES}
        altPrefix="Impact"
        overlayClassName="bg-gradient-to-r from-[#0A5F58]/86 via-[#0A5F58]/42 to-transparent"
        className="min-h-[560px] md:min-h-[640px]"
      >
        <div className="relative flex-1">
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-10 md:pt-14 pb-24 md:pb-32">
            <div className="max-w-[620px]">
              <div className="mb-6 flex items-center gap-3 text-white/75">
                <span className="h-px w-7 bg-white/55"></span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.35em]">Our Impact</span>
              </div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.94] uppercase">
                23 YEARS OF
                <span className="mt-1 block font-extralight italic tracking-normal">TRANSFORMATION</span>
              </h2>

              <p className="mt-7 max-w-[560px] text-base md:text-[1.05rem] text-white/92 leading-relaxed">
                Over 23 years we've supported over 80,000 marginalized women,
                established digitized savings groups, and introduced men's
                engagement programs to combat gender-based violence across
                Rwanda.
              </p>

              <Link
                href="/impact"
                className="mt-8 inline-flex rounded-[4px] bg-white px-8 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-[#0D6B63] transition-colors hover:bg-[#EEF8F6]"
              >
                FULL IMPACT REPORT
              </Link>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-5 z-20 px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div
                ref={glassCardRef}
                className="grid w-full grid-cols-2 gap-7 border px-5 py-6 shadow-[0_14px_30px_rgba(0,0,0,0.28)] transition-[transform,opacity,background,border-color,backdrop-filter] duration-200 md:w-[78%] md:grid-cols-4 md:px-8 md:py-7 lg:w-[72%]"
                style={{
                  borderColor: `rgba(255,255,255,${0.14 + glassCardProgress * 0.16})`,
                  background: `linear-gradient(118deg, rgba(0,0,0,${0.32 - glassCardProgress * 0.22}) 0%, rgba(27,81,84,${0.36 + glassCardProgress * 0.18}) 100%)`,
                  backdropFilter: `blur(${2 + glassCardProgress * 3}px)`,
                  WebkitBackdropFilter: `blur(${2 + glassCardProgress * 3}px)`,
                  transform: `translateY(${(1 - glassCardProgress) * 8}px)`,
                  opacity: 0.9 + glassCardProgress * 0.1,
                }}
              >
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">
                    <GlassCardStatCounter end={80} format="k" start={glassCardAnimated} />
                  </div>
                  <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80 leading-relaxed">
                    Women Served
                    <br />
                    Since 1997
                  </div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">
                    <GlassCardStatCounter end={500} format="plus" start={glassCardAnimated} />
                  </div>
                  <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80 leading-relaxed">
                    Business Plan
                    <br />
                    Training Recipients
                  </div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">
                    <GlassCardStatCounter end={50} format="moneyK" start={glassCardAnimated} />
                  </div>
                  <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80 leading-relaxed">
                    Business Awards
                    <br />
                    Disbursed
                  </div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">
                    <GlassCardStatCounter end={10} format="plain" start={glassCardAnimated} />
                  </div>
                  <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80 leading-relaxed">
                    Business Competitions
                    <br />
                    Successfully Held
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeroSlider>

      {/* SECTION 7: LATEST NEWS & STORIES */}
      <section className="bg-[#F1F2F2] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 flex items-start justify-between md:mb-12">
            <div>
              <div className="mb-6 flex items-center gap-3 text-[#0A9C8E]">
                <span className="h-px w-8 bg-[#0A9C8E]"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.32em]">Latest</span>
              </div>

              <h2 className="text-5xl md:text-6xl font-black leading-[0.92] text-[#102022] uppercase">
                NEWS&
                <span className="mt-2 block font-extralight italic text-[#0A9C8E]">STORIES</span>
              </h2>
            </div>

            <Link
              href="/stories"
              className="mt-2 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#0A9C8E] hover:text-[#077d72]"
            >
              ALL STORIES
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-[6px] md:grid-cols-12">
            {latestItems[0] && (
              <Link href={`/news/${latestItems[0].slug}`} className="group relative min-h-[320px] overflow-hidden md:col-span-5 md:min-h-[470px] block">
                <Image
                  src={resolveImageUrl(latestItems[0].coverImage) || latestItems[0].image || "/images/site/gallery-1.jpg"}
                  alt={latestItems[0].title}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D5B57]/92 via-[#0D5B57]/32 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
                    {formatShortDate(latestItems[0].publishedAt || latestItems[0].date || latestItems[0].createdAt)}
                  </p>
                  <h3 className="max-w-[92%] text-[1.45rem] md:text-[1.75rem] font-semibold leading-[1.14] text-white">
                    {latestItems[0].title}
                  </h3>
                </div>
              </Link>
            )}

            <div className="grid grid-cols-1 gap-[6px] md:col-span-7 md:grid-cols-2 md:grid-rows-2">
              {latestItems.slice(1, 5).map((item: any) => (
                <Link key={item.slug || item.title} href={`/news/${item.slug}`} className="group relative min-h-[220px] overflow-hidden md:min-h-[232px] block">
                  <Image
                    src={resolveImageUrl(item.coverImage) || item.image || "/images/site/gallery-2.jpg"}
                    alt={item.title}
                    fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D5B57]/86 via-[#0D5B57]/28 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/70">
                      {formatShortDate(item.publishedAt || item.date || item.createdAt)}
                    </p>
                    <h3 className="text-[1.02rem] font-semibold leading-[1.18] text-white md:text-[1.16rem]">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: WHERE WE WORK - SEVEN DISTRICTS */}
      <section className="bg-[#D3E1DF]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative min-h-[360px] md:min-h-[640px]">
            <Image
              src="/images/site/impact-hero.jpg"
              alt="Woman farmer in Rwanda"
              fill
                  sizes="100vw"
                  className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#D3E1DF]/95 to-transparent"></div>
          </div>

          <div className="px-6 py-10 md:px-10 md:py-12 lg:px-12">
            <div className="mb-6 flex items-center gap-3 text-[#0A9C8E] md:mb-8">
              <span className="h-px w-8 bg-[#0A9C8E]"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.32em]">Where We Work</span>
            </div>

            <h2 className="text-[2.5rem] font-black uppercase leading-[0.92] text-[#0F2224] md:text-[3.5rem]">
              SEVEN
              <span className="block font-extralight italic text-[#0A9C8E]">DISTRICTS</span>
            </h2>

            <div className="mt-7 grid grid-cols-1 gap-3 md:mt-8 md:grid-cols-2 md:gap-[10px]">
              {[
                ["Nyaruguru", "Southern Province"],
                ["Muhanga", "Southern Province"],
                ["Kicukiro", "Kigali City"],
                ["Rwamagana", "Eastern Province"],
                ["Bugesera", "Eastern Province"],
                ["Gasabo", "Kigali City"],
                ["Kayonza", "Eastern Province"],
              ].map(([district, province]) => (
                <div key={district} className="flex items-start gap-2 bg-[#E9EEED] px-4 py-3">
                  <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-[#0A9C8E]"></span>
                  <div>
                    <p className="text-[12px] font-bold leading-none text-[#172E30]">{district}</p>
                    <p className="mt-1 text-[10px] font-medium text-[#658082]">{province}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-10">
              {[
                "Earning and saving money",
                "Improving health and well-being",
                "Influencing decisions at home and in community",
                "Connecting to local and global networks",
              ].map((item, index) => (
                <div
                  key={item}
                  className="grid grid-cols-[24px_1fr] items-center gap-3 border-b border-[#BCD0CE] py-3"
                >
                  <span className="text-[10px] font-bold tracking-[0.08em] text-[#0A9C8E]">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <p className="text-[13px] text-[#4E6668]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: OUR FOUNDATION - CORE VALUES */}
      <section className="bg-[#F1F2F2] py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 flex items-start justify-between md:mb-12">
            <div>
              <div className="mb-6 flex items-center gap-3 text-[#0A9C8E]">
                <span className="h-px w-8 bg-[#0A9C8E]"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.32em]">Our Foundation</span>
              </div>

              <h2 className="text-5xl font-black leading-[0.92] text-[#102022] uppercase md:text-6xl">
                CORE
                <span className="ml-2 inline-block font-extralight italic text-[#0A9C8E]">VALUES</span>
              </h2>
            </div>

            <Link
              href="/about"
              className="mt-2 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#0A9C8E] hover:text-[#077d72]"
            >
              MISSION & VISION
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-[4px] md:grid-cols-4">
            {[
              {
                title: "DIGNITY",
                image:
                  "/images/site/gallery-6.jpg",
              },
              {
                title: "EMPOWERMENT",
                image:
                  "/images/site/gallery-7.jpg",
              },
              {
                title: "SUSTAINABILITY",
                image:
                  "/images/site/gallery-8.jpg",
              },
              {
                title: "SOLIDARITY",
                image:
                  "/images/site/gallery-9.jpg",
              },
            ].map((value) => (
              <article key={value.title} className="group relative min-h-[260px] overflow-hidden md:min-h-[420px]">
                <Image
                  src={value.image}
                  alt={value.title}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D5B57]/90 via-[#0D5B57]/20 to-transparent"></div>
                <h3 className="absolute bottom-5 left-5 text-[1.48rem] font-bold uppercase leading-none text-white md:text-[1.78rem]">
                  {value.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PartnersCarousel />
      <JoinCommunitySection />

    </div>
  );
}


