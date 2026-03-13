"use client";

import Image from "next/image";
import Link from "next/link";

export default function ImpactPage() {
  return (
    <div className="flex flex-col font-[family-name:var(--font-montserrat)] antialiased bg-white">

      <section className="relative min-h-[40vh] w-full overflow-hidden bg-[#0C3F3C]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
            alt="Community gathering"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-y-0 left-0 w-[78%] bg-gradient-to-r from-[#06564F]/78 via-[#0A6D66]/52 to-transparent md:w-[62%]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-12 md:px-6 md:pb-12 md:pt-14">
          <div className="max-w-2xl">
            <div className="mb-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/95 md:mb-10">
              <Link href="/" className="transition-colors hover:text-white/80">Home</Link>
              <span className="text-white/70">/</span>
              <span>Impact</span>
            </div>

            <div className="mb-8 h-[2px] w-9 bg-white/90" />

            <h1 className="text-4xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-5xl md:text-7xl">
              OUR
              <span className="block font-light italic">IMPACT</span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/90 md:mt-6 md:text-base md:leading-relaxed">
              Stories, numbers, and milestones from our work supporting women-led change.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-4xl font-black text-[#0D2323]">25+</div>
              <div className="mt-2 text-[11px] font-bold uppercase text-[#00A991] tracking-[0.18em]">Years</div>
              <div className="mt-2 text-[#6B7574]">Serving women across Rwanda</div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-4xl font-black text-[#0D2323]">12,000+</div>
              <div className="mt-2 text-[11px] font-bold uppercase text-[#00A991] tracking-[0.18em]">Women Reached</div>
              <div className="mt-2 text-[#6B7574]">Across programs and communities</div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-4xl font-black text-[#0D2323]">8,000+</div>
              <div className="mt-2 text-[11px] font-bold uppercase text-[#00A991] tracking-[0.18em]">Graduates</div>
              <div className="mt-2 text-[#6B7574]">With improved livelihoods</div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-4xl font-black text-[#0D2323]">300+</div>
              <div className="mt-2 text-[11px] font-bold uppercase text-[#00A991] tracking-[0.18em]">Communities</div>
              <div className="mt-2 text-[#6B7574]">Reached through outreach</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FBF9F6] py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#00A991]" />
            <div className="text-[#007A71] text-[12px] font-bold tracking-[0.18em] uppercase">Milestones</div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-[12px] font-bold text-[#00A991] mb-2">1999</div>
                <h3 className="font-black text-[20px] text-[#0D2323] mb-2">Founded to support women</h3>
                <p className="text-[#6B7574]">We started with community-based trainings focused on rights and livelihoods.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-[12px] font-bold text-[#00A991] mb-2">2010</div>
                <h3 className="font-black text-[20px] text-[#0D2323] mb-2">Program expansion</h3>
                <p className="text-[#6B7574]">Expanded programming to include vocational skills, financial literacy, and VSLA support.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-[12px] font-bold text-[#00A991] mb-2">2018</div>
                <h3 className="font-black text-[20px] text-[#0D2323] mb-2">Graduate networks</h3>
                <p className="text-[#6B7574]">Launched graduate support services to strengthen businesses and market access.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-[12px] font-bold text-[#00A991] mb-2">2024</div>
                <h3 className="font-black text-[20px] text-[#0D2323] mb-2">Digital initiatives</h3>
                <p className="text-[#6B7574]">Piloted digital VSLA tools and remote training to widen reach.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-sm">
              <div className="mb-4 text-[#00A991] text-[11px] font-bold uppercase tracking-[0.18em]">Impact Story</div>
              <h3 className="text-[24px] font-black text-[#0D2323] mb-4">From training to thriving</h3>
              <p className="text-[#6B7574]">After joining our program, many women report increased income, decision-making power, and community leadership roles. Stories like these showcase the long-term outcomes of combining skills, savings, and social support.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="mb-4 text-[#00A991] text-[11px] font-bold uppercase tracking-[0.18em]">Testimonial</div>
              <blockquote className="text-[#6B7574] italic">“This program helped me start a business and provide for my family. I now train other women in my village.”</blockquote>
              <div className="mt-4 font-black text-sm text-[#0D2323]">— Emma, Graduate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[320px] md:min-h-[420px] w-full overflow-hidden bg-[#0C3F3C]">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" alt="Community gathering" fill className="object-cover object-center" priority={false} />
          <div className="absolute inset-y-0 left-0 w-[72%] bg-gradient-to-r from-[#06564F]/86 via-[#0A6D66]/56 to-transparent md:w-[56%]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.92] tracking-tight text-white">
              JOIN OUR
              <span className="block font-light italic text-white/90 text-[2.3rem] md:text-[3.8rem]">COMMUNITY</span>
            </h2>
            <p className="mt-6 max-w-lg text-[13px] leading-relaxed text-white/90 md:text-[14px]">Partner with us, volunteer, or donate — every action helps us reach more women across Rwanda.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/partner" className="inline-flex items-center gap-3 bg-white text-[#007A71] px-5 py-3 rounded-md font-semibold shadow-sm hover:opacity-95 text-[13px]">PARTNER WITH US</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
