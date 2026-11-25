"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { HeroSlider } from "./hero-slider";
import { publicFetch, resolveImageUrl } from "../../lib/publicApi";
import { GLOBAL_GIVING_URL } from "../../lib/donation";

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
  const CampaignHeading = fullPage ? "h1" : "h2";
  const headingClassName = fullPage
    ? "text-4xl sm:text-5xl lg:text-7xl"
    : "text-3xl sm:text-4xl lg:text-5xl";

  if (!fullPage) {
    return (
      <section className="w-full bg-[#F4F7F5] py-8 sm:py-12" aria-label="Giving Tuesday campaign">
        <div className="relative w-full overflow-hidden">
          <Image
            src="/images/donation-campaign/giving-tuesday-home-banner-wide.png"
            alt="Giving Tuesday 2026 banner inviting people to support Rwandan women building a trade."
            width={1907}
            height={442}
            sizes="100vw"
            className="block h-auto w-full"
          />
          <a
            href={donationUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Support the Giving Tuesday campaign on GlobalGiving"
            className="absolute left-[34.7%] top-[67%] z-10 h-[20.5%] w-[28%] rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00A991] focus-visible:ring-offset-2"
          />
        </div>
      </section>
    );
  }

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

          <div className="mx-auto grid max-w-6xl gap-5 rounded-[2rem] bg-[#102F2B] p-5 shadow-[0_24px_70px_rgba(16,38,34,0.16)] sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-8 lg:p-10">
            <div className="grid grid-cols-2 gap-3 lg:col-span-7 lg:gap-4">
              {gallery.slice(-3).map((item, index) => (
                <figure
                  key={`${item.url}-closing-${index}`}
                  className={`group relative overflow-hidden rounded-2xl bg-[#DCE7E3] ${
                    index === 0 ? "col-span-2 aspect-[16/8]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={resolveImageUrl(item.url) || item.url}
                    alt={item.caption}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </figure>
              ))}
            </div>

            <div className="px-2 py-4 sm:px-4 lg:col-span-5 lg:px-5">
              <p className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-[#6FE0C9]">
                {campaign.eyebrow}
              </p>
              <p className="border-l-2 border-[#6FE0C9] pl-5 text-xl font-semibold italic leading-relaxed text-white sm:text-2xl">
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
