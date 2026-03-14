"use client";

import Image from "next/image";
import Link from "next/link";

const partners = [
  { name: "MIGEPROF", logo: "/images/site/gallery-1.jpg" },
  { name: "MINICOM", logo: "/images/site/gallery-2.jpg" },
  { name: "MINAGRI", logo: "/images/site/gallery-3.jpg" },
  { name: "Private Sector", logo: "/images/site/gallery-4.jpg" },
  { name: "Women's Chamber", logo: "/images/site/gallery-5.jpg" }
];

export default function PartnerPage() {
  return (
    <div className="flex flex-col font-[family-name:var(--font-montserrat)] antialiased bg-white">

      <section className="relative min-h-[40vh] w-full overflow-hidden bg-[#0C3F3C]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/site/partner-hero.jpg"
            alt="Partners"
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
              <span>Partners</span>
            </div>

            <div className="mb-8 h-[2px] w-9 bg-white/90" />

            <h1 className="text-4xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-5xl md:text-7xl">
              OUR
              <span className="block font-light italic">PARTNERS</span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/90 md:mt-6 md:text-base md:leading-relaxed">
              We collaborate with government agencies, private sector partners, and civil society to expand our reach and deepen impact.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#00A991]" />
            <div className="text-[#007A71] text-[12px] font-bold tracking-[0.18em] uppercase">Our Partners</div>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
            {partners.map((p) => (
              <div key={p.name} className="flex items-center justify-center p-4 bg-white rounded shadow-sm h-28">
                <div className="relative h-16 w-40">
                  <Image src={p.logo} alt={p.name} fill className="object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FBF9F6] py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-[20px] font-black text-[#0D2323] mb-3">Why partner with us</h3>
              <ul className="list-disc ml-5 text-[#6B7574] space-y-2">
                <li>Extend program reach to rural and semi-urban communities</li>
                <li>Co-create impact-driven interventions with measurable outcomes</li>
                <li>Support women-led enterprises and local market access</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-[20px] font-black text-[#0D2323] mb-3">Get involved</h3>
              <p className="text-[#6B7574]">Reach out to our partnerships team to explore collaboration models, sponsorships, or joint programs.</p>
              <div className="mt-6">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-[#007A71] text-white px-5 py-3 rounded-md font-semibold">Contact Partnerships</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
