import Image from "next/image";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:4000";

export const dynamic = "force-dynamic";

async function getArticle(slug: string) {
  const res = await fetch(`${API_URL}/api/public/articles/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.data ?? null;
}

function resolveImageUrl(url?: string) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${API_URL}${url}`;
}

function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getArticle(slug);
  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Story not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col font-[family-name:var(--font-montserrat)] antialiased bg-white">
      <section className="relative min-h-[55vh] w-full overflow-hidden bg-[#0C3F3C]">
        <div className="absolute inset-0 z-0">
          <Image
            src={resolveImageUrl(item.coverImage) || "/images/site/home-hero.jpg"}
            alt={item.title}
            fill
            sizes="100vw"
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
            {formatDate(item.publishedAt || item.createdAt)}
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-[15px] leading-relaxed text-[#5F6E6C]">
            {item.excerpt}
          </p>

          <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-[#5F6E6C]">
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
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