"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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

const collageLayouts = [
  "col-span-12 md:col-span-7 md:row-span-2",
  "col-span-6 md:col-span-5 md:mt-12",
  "col-span-6 md:col-span-4 md:-mt-3",
  "col-span-12 md:col-span-8 md:-mt-10",
];

const collageRatios = [
  "aspect-[5/4] md:aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[16/8]",
];

const collageTilts = ["md:-rotate-1", "md:rotate-1", "md:-rotate-2", "md:rotate-1"];

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
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative mx-auto mt-8 max-w-6xl md:mt-12">
          <div className="pointer-events-none absolute -left-8 top-10 hidden h-[85%] w-[2px] -rotate-[8deg] bg-[#00A991]/30 md:block" />
          <div className="grid grid-cols-12 items-start gap-4 sm:gap-6 md:gap-x-8 md:gap-y-6">
            {gallery.map((item, index) => {
              const layout =
                gallery.length === 1
                  ? "col-span-12 aspect-[16/8]"
                  : `${collageLayouts[index % collageLayouts.length]} ${
                      collageRatios[index % collageRatios.length]
                    } ${collageTilts[index % collageTilts.length]}`;
              return (
                <figure
                  key={`${item.url}-${index}`}
                  className={`group relative ${layout} overflow-hidden rounded-2xl bg-[#DCE7E3] shadow-[0_16px_40px_rgba(16,38,34,0.12)] ring-1 ring-black/5 transition duration-500 hover:z-10 hover:-translate-y-1 hover:rotate-0`}
                >
                  <Image
                    src={resolveImageUrl(item.url) || item.url}
                    alt={item.caption}
                    fill
                    unoptimized
                    priority={fullPage && index === 0}
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081513]/85 via-[#081513]/10 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-white sm:p-6">
                    <span className="max-w-lg text-sm font-semibold leading-snug sm:text-base">{item.caption}</span>
                    <span className="shrink-0 rounded-full border border-white/30 bg-black/20 px-3 py-1 text-[10px] font-bold tracking-wider backdrop-blur-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex justify-center sm:mt-16">
          <CampaignDonateButton href={donationUrl} label={ctaLabel} />
        </div>

        <div className="mx-auto mt-14 max-w-4xl lg:mt-20">
          <div className="space-y-5 text-[15px] leading-relaxed text-[#4D5C59]">
            {storyDetails.map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)}
          </div>
          <p className="mt-8 border-l-2 border-[#00A991] pl-5 text-lg font-semibold leading-relaxed text-[#183A35]">
            {campaign.closingLine}
          </p>
        </div>

        {!!campaign.impactFacts?.length && (
          <div className="mx-auto mt-14 grid max-w-6xl gap-3 sm:grid-cols-3 lg:mt-20">
            {campaign.impactFacts.map((fact, index) => (
              <div
                key={`${fact.value}-${fact.label}`}
                className={`rounded-2xl border border-[#E1EAE6] bg-white p-6 shadow-[0_10px_30px_rgba(13,35,35,0.04)] ${
                  index === 1 ? "sm:translate-y-5" : index === 2 ? "sm:translate-y-10" : ""
                }`}
              >
                <div className="text-3xl font-black tracking-tight text-[#078C7D]">{fact.value}</div>
                <div className="mt-2 text-[11px] font-black uppercase tracking-[0.12em] text-[#183A35]">
                  {fact.label}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#75817E]">{fact.detail}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 flex justify-center lg:mt-24">
          <CampaignDonateButton href={donationUrl} label={ctaLabel} />
        </div>
      </div>
      )}
    </section>
  );
}
