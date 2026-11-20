"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { HeroSlider } from "./hero-slider";
import { publicFetch, resolveImageUrl } from "../../lib/publicApi";
import { GLOBAL_GIVING_URL } from "../../lib/donation";

type CampaignImpactFact = {
  value: string;
  label: string;
  detail: string;
};

type CampaignGalleryItem = {
  url: string;
  caption: string;
};

type DonationCampaign = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  closingLine: string;
  imageUrl: string;
  imageUrls?: string[];
  galleryItems?: CampaignGalleryItem[];
  impactFacts?: CampaignImpactFact[];
  donationUrl?: string;
  ctaLabel?: string;
};

function CampaignDonateButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 rounded-full bg-[#C73D35] px-7 py-3.5 text-xs font-black uppercase tracking-[0.18em] text-white shadow-[0_14px_32px_rgba(199,61,53,0.25)] transition hover:-translate-y-1 hover:bg-[#AE332E] hover:shadow-[0_20px_40px_rgba(199,61,53,0.3)]"
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function AnimatedImpactValue({ value }: { value: string }) {
  const parsedValue = /^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/.exec(value);
  const target = parsedValue ? Number(parsedValue[2].replace(/,/g, "")) : null;
  const decimals = parsedValue?.[2].split(".")[1]?.length ?? 0;
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element || target === null) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (prefersReducedMotion) setCount(target);
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!isVisible || target === null) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let startTime = 0;
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / 1400, 1);
      setCount(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, target]);

  if (!parsedValue || target === null) return <span>{value}</span>;

  const formattedCount = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(count);

  return (
    <>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true">
        {parsedValue[1]}
        {formattedCount}
        {parsedValue[3]}
      </span>
    </>
  );
}

function CampaignStoryRow({
  paragraph,
  item,
  index,
  eyebrow,
}: {
  paragraph: string;
  item: CampaignGalleryItem;
  index: number;
  eyebrow: string;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = rowRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const imageOnLeft = index % 2 === 0;
  const imageOrder = imageOnLeft
    ? "order-1 md:order-1 md:col-start-1"
    : "order-1 md:order-2 md:col-start-7";
  const textOrder = imageOnLeft
    ? "order-2 md:order-2 md:col-start-8"
    : "order-2 md:order-1 md:col-start-1";
  const imageOffset = imageOnLeft ? "-translate-x-10" : "translate-x-10";
  const textOffset = imageOnLeft ? "translate-x-10" : "-translate-x-10";
  const revealed = isVisible ? "translate-x-0 opacity-100" : "opacity-0";
  const motionClasses =
    "transform-gpu transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none";

  return (
    <article ref={rowRef} className="grid items-center gap-7 md:grid-cols-12 md:gap-10 lg:gap-14">
      <figure
        className={`group relative col-span-12 aspect-[5/4] overflow-hidden rounded-[1.75rem] bg-[#DCE7E3] shadow-[0_24px_60px_rgba(16,38,34,0.16)] ring-1 ring-black/5 ${imageOrder} md:col-span-6 ${motionClasses} ${
          isVisible ? revealed : `${imageOffset} ${revealed}`
        }`}
      >
        <Image
          src={resolveImageUrl(item.url) || item.url}
          alt={item.caption}
          fill
          unoptimized
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081513]/80 via-transparent to-transparent" />
        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
          <span className="max-w-sm text-sm font-semibold leading-snug sm:text-base">{item.caption}</span>
          <span className="shrink-0 text-xs font-black tracking-[0.18em] text-white/75">
            {String(index + 1).padStart(2, "0")}
          </span>
        </figcaption>
      </figure>

      <div
        className={`col-span-12 md:col-span-5 ${textOrder} ${motionClasses} delay-100 ${
          isVisible ? revealed : `${textOffset} ${revealed}`
        }`}
      >
        <p className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-[#078C7D]">
          {String(index + 1).padStart(2, "0")} <span className="mx-2 text-[#B8C9C4]">/</span> {eyebrow}
        </p>
        <p className="text-xl font-medium leading-relaxed tracking-[-0.02em] text-[#183A35] sm:text-2xl lg:text-[1.7rem]">
          {paragraph}
        </p>
      </div>
    </article>
  );
}

export function DonationCampaignSection({ fullPage = false }: { fullPage?: boolean }) {
  const [campaign, setCampaign] = useState<DonationCampaign | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    publicFetch<{ data: DonationCampaign }>("/api/public/donation-campaign")
      .then((response) => setCampaign(response.data))
      .catch(() => setError("The Giving Tuesday campaign could not be loaded. Please try again later."));
  }, []);

  const sectionClassName = fullPage ? "bg-[#F4F7F5] pb-12" : "bg-[#F4F7F5] py-10 sm:py-12";

  if (error || !campaign) {
    return (
      <section className={sectionClassName} aria-label="Giving Tuesday campaign">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p
            role={error ? "alert" : "status"}
            className={`rounded-xl border bg-white px-6 py-5 text-sm ${
              error ? "border-red-200 text-red-700" : "border-[#E5E9E9] text-[#5D6A68]"
            }`}
          >
            {error || "Loading the Giving Tuesday campaign…"}
          </p>
        </div>
      </section>
    );
  }

  const gallery = campaign.galleryItems?.length
    ? campaign.galleryItems
    : (campaign.imageUrls?.length ? campaign.imageUrls : [campaign.imageUrl]).map((url) => ({
        url,
        caption: campaign.title,
      }));
  const donationUrl = campaign.donationUrl || GLOBAL_GIVING_URL;
  const ctaLabel = campaign.ctaLabel || "Donate now";
  const storyIntro = campaign.paragraphs[0] ?? "";
  const storyDetails = campaign.paragraphs.slice(1);
  const currentSlide = gallery[activeSlide % gallery.length];
  const CampaignHeading = fullPage ? "h1" : "h2";
  const headingClassName = fullPage
    ? "text-4xl sm:text-5xl lg:text-7xl"
    : "text-3xl sm:text-4xl lg:text-5xl";

  return (
    <section className={sectionClassName} aria-labelledby="giving-tuesday-title">
      <HeroSlider
        images={gallery.map((item) => ({
          src: resolveImageUrl(item.url) || item.url,
          alt: item.caption,
        }))}
        altPrefix={campaign.title}
        interval={6500}
        overlayClassName="bg-gradient-to-r from-[#081513]/85 via-[#081513]/55 to-[#081513]/10"
        className={fullPage ? "min-h-[calc(100svh-5rem)]" : "min-h-[420px] sm:min-h-[460px] lg:min-h-[500px]"}
        imagePosition="center"
        unoptimized
        onIndexChange={setActiveSlide}
      >
        <div className={`flex flex-1 items-end ${fullPage ? "py-14 md:items-center" : "py-10 sm:py-12"}`}>
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl text-white">
              <div className="mb-5 inline-flex rounded-full border border-white/25 bg-black/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                {campaign.eyebrow}
              </div>
              <CampaignHeading
                id="giving-tuesday-title"
                className={`max-w-3xl font-black leading-[0.98] tracking-[-0.04em] ${headingClassName}`}
              >
                {campaign.title}
              </CampaignHeading>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                {storyIntro}
              </p>
              <div className="mt-7">
                <CampaignDonateButton href={donationUrl} label={ctaLabel} />
              </div>
              <p
                aria-live="polite"
                className="mt-6 max-w-xl border-l-2 border-[#4DD9C4] pl-4 text-sm font-medium leading-relaxed text-white/85 sm:mt-8"
              >
                {currentSlide.caption}
              </p>
            </div>
          </div>
        </div>
      </HeroSlider>

      {fullPage && (
        <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-14 py-14 sm:space-y-20 sm:py-20 lg:space-y-24 lg:py-24">
            {storyDetails.map((paragraph, index) => {
              const item = gallery[(index + 1) % gallery.length];

              return (
                <div key={`${index}-${paragraph}`}>
                  <CampaignStoryRow
                    paragraph={paragraph}
                    item={item}
                    index={index}
                    eyebrow={campaign.eyebrow}
                  />

                  {index === Math.ceil(storyDetails.length / 2) - 1 && (
                    <div className="mt-12 flex justify-center sm:mt-16">
                      <CampaignDonateButton href={donationUrl} label={ctaLabel} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mx-auto grid max-w-6xl items-stretch overflow-hidden rounded-[2rem] bg-[#102F2B] shadow-[0_24px_70px_rgba(16,38,34,0.16)] lg:grid-cols-12">
            {gallery.length > 1 && (
              <figure className="group relative min-h-[300px] overflow-hidden lg:col-span-5 lg:min-h-full">
                <Image
                  src={resolveImageUrl(gallery[gallery.length - 1].url) || gallery[gallery.length - 1].url}
                  alt={gallery[gallery.length - 1].caption}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081513]/75 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 text-sm font-semibold leading-relaxed text-white sm:p-8">
                  {gallery[gallery.length - 1].caption}
                </figcaption>
              </figure>
            )}

            <div className="p-6 sm:p-9 lg:col-span-7 lg:p-12">
              {!!campaign.impactFacts?.length && (
                <div className="grid gap-3 sm:grid-cols-3">
                  {campaign.impactFacts.map((fact) => (
                    <div
                      key={`${fact.value}-${fact.label}`}
                      className="rounded-2xl border border-white/15 bg-white/[0.06] p-4 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.1] motion-reduce:transition-none sm:p-5"
                    >
                      <div className="text-2xl font-black tracking-tight text-[#6FE0C9] sm:text-3xl">
                        <AnimatedImpactValue value={fact.value} />
                      </div>
                      <div className="mt-2 text-[10px] font-black uppercase leading-snug tracking-[0.12em] text-white sm:text-[11px]">
                        {fact.label}
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-white/65">{fact.detail}</p>
                    </div>
                  ))}
                </div>
              )}

              <p className="mt-8 border-l-2 border-[#6FE0C9] pl-5 text-lg font-semibold italic leading-relaxed text-white sm:mt-10 sm:text-xl">
                {campaign.closingLine}
              </p>
            </div>
          </div>

          <div className="mt-12 flex justify-center sm:mt-16">
            <CampaignDonateButton href={donationUrl} label={ctaLabel} />
          </div>
        </div>
      )}
    </section>
  );
}
