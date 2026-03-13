import Image from "next/image";
import Link from "next/link";
import { articles, stories, type NewsItem } from "../data";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

function getItemById(id: string): NewsItem | undefined {
  return articles.find((a) => a.id === id) ?? stories.find((s) => s.id === id);
}

export function generateStaticParams() {
  return [...articles, ...stories].map((item) => ({ id: item.id }));
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const item =
    getItemById(params.id) ??
    ({
      id: params.id,
      title: "Story Update",
      date: "2026",
      excerpt:
        "This story is still being prepared. Please check back soon for the full update.",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1800&auto=format&fit=crop",
      category: "News",
    } satisfies NewsItem);

  return (
    <div className="flex flex-col font-[family-name:var(--font-montserrat)] antialiased bg-white">
      <section className="relative min-h-[55vh] w-full overflow-hidden bg-[#0C3F3C]">
        <div className="absolute inset-0 z-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-[#06564F]/85 via-[#0A6D66]/45 to-transparent md:w-[55%]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-14 pt-16 text-white">
          <div className="mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <span className="text-white/60">/</span>
            <Link href="/news" className="transition-colors hover:text-white">News &amp; Events</Link>
          </div>

          {item.category && (
            <div className="mb-4 inline-flex bg-[#00A991] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
              {item.category}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.95]">
            {item.title}
          </h1>
          <p className="mt-4 text-[12px] uppercase tracking-[0.25em] text-white/80">
            {item.date}
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-[15px] leading-relaxed text-[#5F6E6C]">
            {item.excerpt}
          </p>

          <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-[#5F6E6C]">
            <p>
              Our programs continue to expand opportunities for women through
              skills training, financial literacy, and community support. These
              initiatives are designed to build resilience, strengthen local
              economies, and create lasting impact for families across Rwanda.
            </p>
            <p>
              We collaborate with partners and local leaders to ensure each
              program responds to community needs, reaches vulnerable groups,
              and provides long-term pathways to independence.
            </p>
            <p>
              Thank you for following our work and helping to amplify these
              stories of transformation.
            </p>
          </div>

          <div className="mt-10">
            <Link href="/news" className="inline-flex items-center gap-2 text-[#007A71] font-bold uppercase text-[11px] tracking-[0.22em]">
              Back to News
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#007A71]">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 6H2M6 10L2 6L6 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
