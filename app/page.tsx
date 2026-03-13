"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import PartnersCarousel from "./components/partners-carousel";

export default function Home() {
  const glassCardRef = useRef<HTMLDivElement | null>(null);
  const [glassCardProgress, setGlassCardProgress] = useState(0);

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

  return (
    <div className="flex flex-col font-[family-name:var(--font-montserrat)] antialiased bg-white">
      
      {/* SECTION 1: HERO - 100% MATCH TO SCREENSHOT */}
      <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-black">
        {/* Hero Image Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2000&auto=format&fit=crop"
            alt="Women Empowerment Rwanda"
            fill
            className="object-cover object-center brightness-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D6B63]/75 via-[#0D6B63]/35 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full pt-20">
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
              {/* White Button */}
              <Link href="/programs" className="rounded-sm bg-white px-7 py-3 text-[11px] font-black tracking-[0.2em] text-[#0D6B63] transition-all hover:bg-gray-100 uppercase">
                Explore Programs
              </Link>
              {/* Transparent Border Button */}
              <Link href="/impact" className="rounded-sm border-2 border-white/60 bg-white/5 backdrop-blur-sm px-7 py-3 text-[11px] font-black tracking-[0.2em] text-white transition-all hover:bg-white/10 uppercase">
                See Our Impact
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Bottom Right */}
        <div className="absolute bottom-12 right-12 z-20 hidden md:flex flex-col items-center gap-6">
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.5em] rotate-90 origin-right translate-y-8 opacity-70">Scroll</span>
            <div className="h-24 w-[1px] bg-white/30"></div>
        </div>
      </section>

      {/* SECTION 2: STATS BAR */}
      <section className="bg-[#F0F7F6] py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#00A991]">80,000+</div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Women Served Since 1997</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#00A991]">3,160+</div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">VSLAs Created Nationwide</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#00A991]">390+</div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Digitalized Savings Groups</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#00A991]">170+</div>
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
              {/* First Image - Large */}
              <div className="relative overflow-hidden rounded-lg row-span-2">
                <Image 
                  src="https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1000"
                  alt="Women learning together"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Second Image - Small with Overlay */}
              <div className="relative overflow-hidden rounded-lg">
                <Image 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000"
                  alt="Community gathering"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <div className="inline-block bg-[#00A991]/40 px-2 py-1">
                    <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-white">Learning Together</span>
                  </div>
                </div>
              </div>
              {/* Third Image - Small */}
              <div className="relative overflow-hidden rounded-lg">
                <Image 
                  src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1000"
                  alt="Skills training"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* RIGHT SIDE - CONTENT */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 bg-[#00A991]"></div>
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
                <span className="inline-block bg-[#E6F6F4] px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A991]">
                  Health & Wellness
                </span>
                <span className="inline-block bg-[#E6F6F4] px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A991]">
                  GBV Prevention
                </span>
                <span className="inline-block bg-[#E6F6F4] px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A991]">
                  Women's Leadership
                </span>
                <span className="inline-block bg-[#E6F6F4] px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A991]">
                  Business Skills
                </span>
                <span className="inline-block bg-[#E6F6F4] px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A991]">
                  Vocational Training
                </span>
                <span className="inline-block bg-[#E6F6F4] px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A991]">
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
            {/* Card 1 */}
            <div className="relative h-[500px] overflow-hidden rounded-lg group cursor-pointer">
              <Image 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000"
                alt="Strengthening Women-Led Businesses"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D6B63]/95 via-[#0D6B63]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/70 block mb-3">
                  01 — Core Program
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight uppercase">
                  Strengthening<br />Women-Led<br />Businesses
                </h3>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative h-[500px] overflow-hidden rounded-lg group cursor-pointer">
              <Image 
                src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1000"
                alt="Socioeconomic Empowerment"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D6B63]/95 via-[#0D6B63]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/70 block mb-3">
                  02 — Complementary
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight uppercase">
                  Socioeconomic<br />Empowerment
                </h3>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative h-[500px] overflow-hidden rounded-lg group cursor-pointer">
              <Image 
                src="https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?q=80&w=1000"
                alt="Graduation Out of Poverty"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D6B63]/95 via-[#0D6B63]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/70 block mb-3">
                  03 — Graduate Program
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight uppercase">
                  Graduation Out<br />of Poverty
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: IMPACT - 23 YEARS OF TRANSFORMATION */}
      <section className="relative isolate min-h-[560px] md:min-h-[640px] overflow-hidden bg-[#0D6B63]">
        {/* Background image and layered color wash to match the reference */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2200&auto=format&fit=crop"
            alt="Women receiving certificates"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A5F58]/86 via-[#0A5F58]/42 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"></div>
        </div>

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
                <div className="text-4xl md:text-5xl font-black text-white">80K+</div>
                <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80 leading-relaxed">
                  Women Served
                  <br />
                  Since 1997
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-white">500+</div>
                <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80 leading-relaxed">
                  Business Plan
                  <br />
                  Training Recipients
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-white">$50K+</div>
                <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80 leading-relaxed">
                  Business Awards
                  <br />
                  Disbursed
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-white">10</div>
                <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80 leading-relaxed">
                  Business Competitions
                  <br />
                  Successfully Held
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <article className="group relative min-h-[320px] overflow-hidden md:col-span-5 md:min-h-[470px]">
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1800&auto=format&fit=crop"
                alt="From Setbacks to Strength"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D5B57]/92 via-[#0D5B57]/32 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">04 SEP 2025</p>
                <h3 className="max-w-[92%] text-[1.45rem] md:text-[1.75rem] font-semibold leading-[1.14] text-white">
                  From Setbacks to Strength: 60 Girls Graduate from ABADACOGORA Program in Masaka
                </h3>
              </div>
            </article>

            <div className="grid grid-cols-1 gap-[6px] md:col-span-7 md:grid-cols-2 md:grid-rows-2">
              <article className="group relative min-h-[220px] overflow-hidden md:min-h-[232px]">
                <Image
                  src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1400&auto=format&fit=crop"
                  alt="Empowered Women, Thriving Communities"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D5B57]/86 via-[#0D5B57]/28 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/70">26 AUG 2025</p>
                  <h3 className="text-[1.02rem] font-semibold leading-[1.18] text-white md:text-[1.16rem]">
                    Empowered Women, Thriving Communities
                  </h3>
                </div>
              </article>

              <article className="group relative min-h-[220px] overflow-hidden md:min-h-[232px]">
                <Image
                  src="https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?q=80&w=1400&auto=format&fit=crop"
                  alt="Empowering Change through Skill Building"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D5B57]/86 via-[#0D5B57]/28 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/70">14 JUL 2025</p>
                  <h3 className="text-[1.02rem] font-semibold leading-[1.18] text-white md:text-[1.16rem]">
                    Empowering Change through Skill Building
                  </h3>
                </div>
              </article>

              <article className="group relative min-h-[220px] overflow-hidden md:min-h-[232px]">
                <Image
                  src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1400&auto=format&fit=crop"
                  alt="Celebrating the Graduation of 100 Women in Ibare"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D5B57]/86 via-[#0D5B57]/28 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/70">12 JUL 2025</p>
                  <h3 className="text-[1.02rem] font-semibold leading-[1.18] text-white md:text-[1.16rem]">
                    Celebrating the Graduation of 100 Women in Ibare
                  </h3>
                </div>
              </article>

              <article className="group relative min-h-[220px] overflow-hidden md:min-h-[232px]">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1400&auto=format&fit=crop"
                  alt="From Dreams to Determination"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D5B57]/86 via-[#0D5B57]/28 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/70">09 JUL 2025</p>
                  <h3 className="text-[1.02rem] font-semibold leading-[1.18] text-white md:text-[1.16rem]">
                    From Dreams to Determination: ABADACOGORA Graduation in Rubona
                  </h3>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: WHERE WE WORK - SEVEN DISTRICTS */}
      <section className="bg-[#D3E1DF]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative min-h-[360px] md:min-h-[640px]">
            <Image
              src="https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=1800&auto=format&fit=crop"
              alt="Woman farmer in Rwanda"
              fill
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
                  "https://images.unsplash.com/photo-1531123414780-f74242c2b052?q=80&w=1200&auto=format&fit=crop",
              },
              {
                title: "EMPOWERMENT",
                image:
                  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200&auto=format&fit=crop",
              },
              {
                title: "SUSTAINABILITY",
                image:
                  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1200&auto=format&fit=crop",
              },
              {
                title: "SOLIDARITY",
                image:
                  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
              },
            ].map((value) => (
              <article key={value.title} className="group relative min-h-[260px] overflow-hidden md:min-h-[420px]">
                <Image
                  src={value.image}
                  alt={value.title}
                  fill
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

      {/* SECTION 10: GET INVOLVED - JOIN OUR COMMUNITY */}
      <section className="relative isolate min-h-[420px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2200&auto=format&fit=crop"
            alt="Women in community fields"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A7F73]/82 via-[#0A7F73]/38 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-16 lg:px-10">
          <div className="max-w-[560px]">
            <div className="mb-5 flex items-center gap-3 text-white/80">
              <span className="h-px w-8 bg-white/60"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.34em]">Get Involved</span>
            </div>

            <h2 className="text-[3.1rem] font-black uppercase leading-[0.9] text-white md:text-[4.3rem]">
              JOIN OUR
              <span className="block font-extralight italic">COMMUNITY</span>
            </h2>

            <p className="mt-5 max-w-[500px] text-base leading-relaxed text-white/92 md:text-[1.05rem]">
              Partner with us, volunteer, or donate. Every action helps us reach more women
              across Rwanda and build a stronger nation together.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/get-involved"
                className="inline-flex rounded-[4px] bg-white px-6 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-[#0A7F73] transition-colors hover:bg-[#EAF6F4]"
              >
                PARTNER WITH US
              </Link>
              <Link
                href="/get-involved"
                className="inline-flex rounded-[4px] border border-white/45 bg-white/5 px-6 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/12"
              >
                VIEW CAREERS
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PartnersCarousel />

    </div>
  );
}