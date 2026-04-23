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

function withCloudinaryTransform(url: string, transform: string) {
  const marker = "/upload/";
  const idx = url.indexOf(marker);
  if (idx === -1) return url;
  // Only transform Cloudinary URLs (avoid breaking other CDNs / local assets)
  if (!url.includes("res.cloudinary.com")) return url;
  const prefix = url.slice(0, idx + marker.length);
  const rest = url.slice(idx + marker.length);
  return `${prefix}${transform}/${rest}`;
}

function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

function hasHtmlMarkup(content: string) {
  return /<[a-z][\s\S]*>/i.test(content);
}

function normalizePlainText(content: string) {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\n/g, " ").trim())
    .filter(Boolean);
}

function splitIntoParagraphs(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const sentences = normalized
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length <= 2) return [normalized];

  const chunks: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    chunks.push(sentences.slice(i, i + 2).join(" "));
  }
  return chunks;
}

function extractTextFromHtml(content: string) {
  return content
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .trim();
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

  const content = String(item.content || "");
  const contentHasHtml = hasHtmlMarkup(content);
  const plainParagraphsRaw = !contentHasHtml ? normalizePlainText(content) : [];
  const plainParagraphs =
    plainParagraphsRaw.length <= 1
      ? splitIntoParagraphs(plainParagraphsRaw.join(" "))
      : plainParagraphsRaw.flatMap((paragraph) => splitIntoParagraphs(paragraph));

  return (
    <div className="flex flex-col font-[family-name:var(--font-montserrat)] antialiased bg-white">
      <section className="hero-viewport relative flex w-full flex-col overflow-hidden bg-[#0C3F3C]">
        <div className="absolute inset-0 z-0">
          <Image
            src={
              withCloudinaryTransform(
                resolveImageUrl(item.coverImage) || "/images/site/home-hero.jpg",
                // Smart crop to a wide hero while focusing the subject/face.
                "c_fill,g_auto:faces,w_2400,h_1350,f_auto,q_auto"
              )
            }
            alt={item.title}
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-16 pt-24 text-white items-start">
          <div className="mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <span className="text-white/60">/</span>
            <Link href="/news" className="transition-colors hover:text-white">News &amp; Events</Link>
          </div>

          {item.category && (
            <div className="mb-4 w-fit max-w-full self-start rounded-sm bg-[#00A991] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
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
        <div className="mx-auto max-w-[68ch] px-6">
          <div className="mt-8 text-[#3D4B49]">
            {contentHasHtml ? (
              <div
                className="text-[1.07rem] leading-9 [&_p]:mb-7 [&_p]:leading-9 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#0F2224] [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#0F2224] [&_ul]:mb-6 [&_ul]:ml-6 [&_ul]:list-disc [&_li]:mb-2 [&_a]:text-[#007A71] [&_a]:underline [&_strong]:font-semibold [&_b]:font-semibold [&_em]:italic [&_i]:italic [&_u]:underline [&_img]:my-8 [&_img]:w-full [&_img]:max-w-full [&_img]:rounded-xl [&_img]:border [&_img]:border-[#E7EEED]"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <div className="space-y-7 text-[1.07rem] leading-9">
                {plainParagraphs.map((paragraph, index) => (
                  <p key={`plain-${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
                ))}
              </div>
            )}
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
