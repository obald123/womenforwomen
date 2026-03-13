"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { articles, stories, events } from "./data";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategory]);

  const categories = [
    "All",
    "Program Update",
    "Impact Story",
    "Success Story",
    "Training",
    "Graduation",
    "Cooperative",
    "Partnership",
  ];

  const filteredStories =
    selectedCategory === "All"
      ? stories
      : stories.filter((s) => s.category === selectedCategory);

  const visibleStories = filteredStories.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredStories.length;
  const featured = articles[0];

  return (
    <div className="flex flex-col font-[family-name:var(--font-montserrat)] antialiased bg-white">

      <section className="relative min-h-[52vh] w-full overflow-hidden bg-[#0C3F3C]">
        <div className="absolute inset-0 z-0">
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-y-0 left-0 w-[75%] bg-gradient-to-r from-[#06564F]/85 via-[#0A6D66]/60 to-transparent md:w-[62%]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-16 md:px-6 md:pb-20 md:pt-20">
          <div className="max-w-3xl">
            <div className="mb-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/95 md:mb-10">
              <Link href="/" className="transition-colors hover:text-white/80">Home</Link>
              <span className="text-white/70">/</span>
              <span>News &amp; Events</span>
            </div>

            <div className="mb-8 h-[2px] w-9 bg-white/90" />

            <h1 className="text-5xl font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[6.5rem]">
              NEWS <span className="inline-block">&amp;</span>
              <span className="block mt-2 font-light italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl">EVENTS</span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/90 md:mt-6 md:text-base md:leading-relaxed">
              Stay up to date with the latest stories, program updates, upcoming events, and community celebrations from Women for Women Rwanda.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-[2px] w-12 bg-[#007A71]" />
            <div className="text-xs uppercase tracking-widest text-[#007A71] font-semibold">FEATURED STORY</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-x-0 lg:gap-y-8 items-stretch">
            <div className="relative w-full min-h-[160px] md:min-h-[220px] lg:min-h-[260px] overflow-hidden">
              <Image src={featured.image} alt={featured.title} fill className="object-cover object-center" />
              <div className="absolute top-4 left-4">
                <span className="inline-block bg-[#007A71] text-white text-[10px] font-semibold uppercase px-2 py-1 tracking-wide">
                  {featured.category ?? "News Update"}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-full bg-[#F7F6F3] p-4 md:p-6 lg:p-8 h-full">
                <div className="text-[10px] font-semibold uppercase text-[#007A71] tracking-[0.18em]">
                  {featured.date}
                </div>
                <h2 className="mt-3 text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight text-[#0D2323]">
                  {featured.title}
                </h2>
                <p className="mt-3 text-[#6B7574] text-xs leading-relaxed">
                  {featured.excerpt}
                </p>

                <div className="mt-4">
                  <Link href={`/news/${featured.id}`} className="inline-flex items-center gap-2 text-[#007A71] font-semibold uppercase text-xs">
                    <span>Read full story</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF9F6] py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-[#007A71]" />
              <div className="text-[13px] uppercase tracking-[0.25em] text-[#007A71] font-extrabold">BLOG</div>
            </div>

            <h2 className="flex flex-wrap items-end gap-x-4 text-[#0D2323] leading-[0.9]">
              <span className="text-[40px] sm:text-[48px] md:text-[56px] font-[800] uppercase tracking-tight">
                LATEST
              </span>
              <span className="text-[40px] sm:text-[48px] md:text-[56px] font-[300] italic text-[#007A71] pb-1">
                STORIES
              </span>
            </h2>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={
                  (selectedCategory === cat
                    ? "px-4 py-1.5 bg-[#007A71] text-white"
                    : "px-4 py-1.5 bg-white border border-[#EDECE8] text-[#444] hover:border-[#007A71] hover:text-[#007A71]") +
                  " text-[11px] uppercase tracking-widest rounded-sm transition-colors"
                }
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {visibleStories.map((s) => (
              <article key={s.id} className="flex flex-col h-full bg-white group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow duration-300">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image 
                    src={s.image} 
                    alt={s.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute top-2 left-2">
                    <span className="inline-block bg-[#007A71] text-white text-[10px] uppercase px-3 py-1 tracking-[0.15em]">
                      {s.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 pt-8 flex-1 flex flex-col">
                  <div className="text-[10px] font-bold uppercase text-[#00A991] tracking-[0.2em] mb-3">
                    {s.date}
                  </div>
                  <h3 className="text-[18px] font-[700] text-[#0D2323] leading-tight mb-4 group-hover:text-[#007A71] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-[#6B7574] text-[13px] leading-relaxed mb-6 flex-1">
                    {s.excerpt}
                  </p>
                  <div>
                    <Link href={`/news/${s.id}`} className="inline-flex items-center gap-3 text-[#007A71] font-black uppercase text-[10px] tracking-[0.2em] group/link">
                      READ MORE
                      <span className="transition-transform duration-300 group-hover/link:translate-x-2">
                        <svg width="16" height="10" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 1L19 6L14 11M1 6H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            {filteredStories.length > 0 && (
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => Math.min(prev + 3, filteredStories.length))}
                disabled={!canLoadMore}
                className="border text-[12px] border-[#007A71] px-8 py-3 text-[#007A71] font-semibold uppercase tracking-widest bg-white hover:bg-[#FBFBFB] disabled:opacity-50 disabled:cursor-not-allowed disabled:text-[#A0A0A0]"
              >
                {canLoadMore ? "LOAD MORE STORIES" : "NO MORE STORIES"}
              </button>
            )}
          </div>
        </div>
      </section>
  
      <section className="bg-[#061E1C] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 bg-[#00A991]" />
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#00A991] font-semibold">OUR EVENTS</div>
            </div>

            <Link href="/events" className="text-[10px] text-[#00A991] uppercase tracking-widest font-semibold inline-flex items-center gap-2">
              VIEW CALENDAR
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch border border-[#0E3A36]">
            <div className="relative min-h-[260px] md:min-h-[320px] overflow-hidden group">
              <Image src={featured.image} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105 object-center" />
              <div className="absolute top-4 left-4">
                <span className="inline-block bg-[#00A991] text-white text-[10px] uppercase px-2 py-1 tracking-[0.12em]">FEATURED EVENT</span>
              </div>
            </div>

            <div className="bg-[#0B2E2B] p-8 flex flex-col justify-center border-l border-[#0E3A36]">
              <div>
                <span className="inline-block bg-[#00A991] text-[#05201f] text-[10px] uppercase px-2 py-1 tracking-[0.12em]">CONFERENCE</span>
              </div>

              <h3 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase leading-tight tracking-tight">
                ANNUAL WOMEN'S EMPOWERMENT SUMMIT 2026
              </h3>

              <ul className="mt-4 space-y-2 text-xs text-[#B9D0CC]">
                <li className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#00A991]" />
                  <span>April 15–16, 2026</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#00A991]" />
                  <span>9:00 AM – 5:00 PM</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#00A991]" />
                  <span>Kigali Convention Centre, Kigali</span>
                </li>
              </ul>

              <p className="mt-4 text-[#9FB0AE] text-xs leading-relaxed max-w-xl">
                Join over 500 women leaders, stakeholders, and partners for our flagship annual summit, featuring keynote speeches, panel discussions on economic empowerment, and networking sessions.
              </p>

              <div className="mt-6">
                <Link href="/events/register" className="inline-flex items-center gap-2 bg-[#007A71] hover:bg-[#008f7e] text-white font-semibold uppercase text-xs px-5 py-2">
                  REGISTER NOW
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((ev) => (
                <article key={ev.id} className="bg-[#061E1C] border border-[#0E3A36] overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={ev.image} alt={ev.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105 object-center" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#05201f]/70 to-transparent pointer-events-none z-10" />
                    <div className="absolute top-3 left-3 z-20">
                      <span className="inline-block bg-[#00A991] text-white text-[10px] uppercase px-2 py-1 tracking-[0.12em]">{ev.category}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="text-[13px] md:text-[14px] font-extrabold uppercase text-white mb-2 leading-tight">{ev.title}</h4>

                    <ul className="text-[11px] text-[#B9D0CC] space-y-1 mb-2">
                      <li className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#00A991]" /><span>{ev.date}</span></li>
                      <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#00A991]" /><span>{ev.time}</span></li>
                      <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#00A991]" /><span>{ev.location}</span></li>
                    </ul>

                    <p className="text-[#9FB0AE] text-[12px] mb-3">{ev.excerpt}</p>

                    <Link href={`/events/${ev.id}`} className="inline-flex items-center gap-2 text-[#00A991] font-semibold uppercase text-[10px]">
                      LEARN MORE
                      <span className="transition-transform duration-300 group-hover:translate-x-2">
                        <svg width="14" height="10" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 1L19 6L14 11M1 6H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[46vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={featured.image} alt="Join our community" fill className="object-cover object-center" />
          <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-[#007A71]/80 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-[2px] w-12 bg-white/60" />
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/90 font-semibold">GET INVOLVED</div>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase text-white leading-[0.92]">
              JOIN OUR
              <span className="block mt-2 font-light italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#D6EDE8]">COMMUNITY</span>
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/90">
              Partner with us, volunteer, or donate — every action helps us reach more women across Rwanda and build a stronger nation together.
            </p>

            <div className="mt-8 flex gap-4">
              <Link href="/partner" className="inline-block bg-white text-[#007A71] font-semibold uppercase text-sm px-4 py-2 rounded-sm">PARTNER WITH US</Link>
              <Link href="/careers" className="inline-block border border-white/60 text-white uppercase text-sm px-4 py-2 rounded-sm">VIEW CAREERS</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
