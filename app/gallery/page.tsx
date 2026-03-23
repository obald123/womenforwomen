"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { HeroSlider } from "../components/hero-slider";
import { JoinCommunitySection } from "../components/join-community-section";
import { publicFetch, resolveImageUrl } from "../../lib/publicApi";

const GALLERY_HERO_IMAGES = [
  "/images/site/gallery-home.jpeg",
  "/images/wfw/slide 5 - photo gallery/Stronger Women Stronger Nation.jpg",
  "/images/wfw/slide 5 - photo gallery/Abadacogora.jpg",
  "/images/wfw/slide 5 - photo gallery/Men Engage.jpeg",
  "/images/wfw/slide 5 - photo gallery/Couples Dialogue.jpg",
];

const fallbackImages = [
  { src: "/images/site/gallery-1.jpg", alt: "Community gathering", title: "Community Gathering", kicker: "PROGRAMS" },
  { src: "/images/site/gallery-2.jpg", alt: "Training session", title: "Training Session", kicker: "COMMUNITY" },
  { src: "/images/site/gallery-3.jpg", alt: "Socioeconomic empowerment", title: "Socioeconomic Empowerment", kicker: "EMPOWERMENT" },
  { src: "/images/site/gallery-4.jpg", alt: "Graduation", title: "Graduation", kicker: "GRADUATES" },
  { src: "/images/site/gallery-5.jpg", alt: "Team meeting", title: "Team Meeting", kicker: "TEAM" },
  { src: "/images/site/gallery-6.jpg", alt: "Market day", title: "Market Day", kicker: "MARKET" },
  { src: "/images/site/gallery-7.jpg", alt: "Portrait 1", title: "Portrait", kicker: "COMMUNITY" },
  { src: "/images/site/gallery-8.jpg", alt: "Portrait 2", title: "Portrait", kicker: "COMMUNITY" },
  { src: "/images/site/gallery-9.jpg", alt: "Portrait 3", title: "Portrait", kicker: "COMMUNITY" },
];

const mosaicClasses = [
  "row-span-2 md:row-span-2",
  "row-span-1 md:row-span-1",
  "row-span-1 md:row-span-1",
  "row-span-2 md:row-span-2",
  "row-span-1 md:row-span-1",
  "row-span-1 md:row-span-1",
  "row-span-2 md:row-span-2",
  "row-span-1 md:row-span-1",
  "row-span-1 md:row-span-1",
];

export default function GalleryPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState(fallbackImages);
  const [videos, setVideos] = useState<Array<{ src: string; title?: string; caption?: string }>>([]);
  const [videoOpen, setVideoOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    publicFetch<any>("/api/public/gallery")
      .then((res) => {
        const galleries = Array.isArray(res.data) ? res.data : [];
        const flattened = galleries.flatMap((g: any) =>
          Array.isArray(g.images)
            ? g.images.map((img: any) => ({
                src: resolveImageUrl(img.url) || img.url,
                alt: img.caption || g.title || "Gallery image",
                title: g.title || "Gallery",
                kicker: "GALLERY",
              }))
            : []
        );
        if (flattened.length) setImages(flattened);

        const flattenedVideos = galleries.flatMap((g: any) =>
          Array.isArray(g.videos)
            ? g.videos.map((vid: any) => ({
                src: resolveImageUrl(vid.url) || vid.url,
                title: g.title || "Gallery",
                caption: vid.caption,
              }))
            : []
        );
        if (flattenedVideos.length) setVideos(flattenedVideos);
      })
      .catch(() => {});
  }, []);

  const openAt = useCallback((idx: number) => {
    setCurrentIndex(idx);
    setIsOpen(true);
    if (typeof document !== "undefined") document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    if (typeof document !== "undefined") document.body.style.overflow = "";
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const openVideoAt = useCallback((idx: number) => {
    setCurrentVideoIndex(idx);
    setVideoOpen(true);
    if (typeof document !== "undefined") document.body.style.overflow = "hidden";
  }, []);

  const closeVideo = useCallback(() => {
    setVideoOpen(false);
    if (typeof document !== "undefined") document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!isOpen) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, prev, next]);

  return (
    <div className="flex flex-col font-[family-name:var(--font-montserrat)] antialiased bg-white">

      <HeroSlider
        images={GALLERY_HERO_IMAGES}
        altPrefix="Gallery"
        overlayClassName="inset-y-0 left-0 w-[70%] md:w-[60%] bg-gradient-to-r from-[#06564F]/78 via-[#0A6D66]/52 to-transparent"
        className="min-h-[60vh]"
      >
        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-16 md:px-8 md:pb-16 md:pt-20">
            <div className="max-w-2xl">
              <div className="mb-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/95 md:mb-10">
                <Link href="/" className="transition-colors hover:text-white/80">Home</Link>
                <span className="text-white/70">/</span>
                <Link href="/about" className="transition-colors hover:text-white/80">About Us</Link>
                <span className="text-white/70">/</span>
                <span>Gallery</span>
              </div>

              <div className="mb-8 h-[2px] w-9 bg-white/90" />

              <h1 className="text-[3.2rem] sm:text-[4.2rem] md:text-[6.0rem] lg:text-[6.6rem] font-black uppercase leading-[0.9] tracking-tight text-white">
                <span className="block">PHOTO</span>
                <span className="block font-light italic text-white/95 tracking-tight">GALLERY</span>
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/90 md:mt-6 md:text-base md:leading-relaxed">
                A visual journey through our programs, community work, and the inspiring women who make it all possible.
              </p>
            </div>
          </div>
        </div>
      </HeroSlider>

      <section id="gallery-grid" className="bg-white pt-12 pb-12 md:pb-16 lg:pb-20 font-sans relative z-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#00A991]" />
            <div className="text-[#00A991] text-[10px] font-extrabold tracking-[0.25em] uppercase">PHOTO GALLERY</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px] md:auto-rows-[260px]">
            {images.map((img, idx) => (
              <button
                key={`${idx}-${img.src}`}
                onClick={() => openAt(idx)}
                className={`relative block w-full h-full overflow-hidden group transition-all duration-300 ${mosaicClasses[idx % mosaicClasses.length]} ${idx === 0 ? "ring-2 ring-[#00A991] ring-inset" : ""}`}
                aria-label={`Open gallery image ${idx + 1}`}
              >
                <div className="relative w-full h-full">
                  <Image src={img.src} alt={img.alt} fill
                  sizes="100vw"
                  className="object-cover object-center" />
                </div>

                <div className="absolute left-4 top-4 z-10 bg-[#00A991] text-white text-[10px] font-bold px-3 py-1">
                  {img.title || img.alt}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {videos.length > 0 && (
        <section id="gallery-videos" className="bg-[#F2F7F6] py-14 font-sans">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#0A9C8E]" />
              <div className="text-[#0A9C8E] text-[10px] font-extrabold tracking-[0.25em] uppercase">VIDEO GALLERY</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((vid, idx) => (
                <div key={`${idx}-${vid.src}`} className="bg-white border border-[#E6ECEB] p-3">
                  <button
                    type="button"
                    onClick={() => openVideoAt(idx)}
                    className="relative w-full aspect-video bg-black overflow-hidden group"
                    aria-label={`Open video ${idx + 1}`}
                  >
                    <video
                      src={vid.src}
                      muted
                      playsInline
                      loop
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.muted = true;
                        el.play().catch(() => {});
                        const prevTimer = (el as any).__hoverTimer as number | undefined;
                        if (prevTimer) window.clearTimeout(prevTimer);
                        (el as any).__hoverTimer = window.setTimeout(() => {
                          el.pause();
                        }, 10000);
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        const prevTimer = (el as any).__hoverTimer as number | undefined;
                        if (prevTimer) window.clearTimeout(prevTimer);
                        el.pause();
                        el.currentTime = 0;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-3 right-3 bg-white/90 text-[#0A9C8E] text-[10px] font-black tracking-[0.2em] px-2.5 py-1">
                      PLAY
                    </div>
                  </button>
                  <div className="mt-3">
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0A9C8E]">
                      {vid.title || "Gallery Video"}
                    </div>
                    {vid.caption && (
                      <div className="mt-1 text-[12px] text-[#4A5C5B]">{vid.caption}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {videoOpen && videos[currentVideoIndex] && (
        <div className="fixed inset-0 z-[90] bg-black/70 flex items-center justify-center p-6">
          <button onClick={closeVideo} className="absolute top-6 right-6 text-white">
            <X className="w-6 h-6" />
          </button>
          <div className="w-full max-w-4xl bg-black">
            <div className="relative w-full aspect-video">
              <video
                src={videos[currentVideoIndex].src}
                controls
                autoPlay
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>
            {(videos[currentVideoIndex].title || videos[currentVideoIndex].caption) && (
              <div className="bg-white px-4 py-3">
                {videos[currentVideoIndex].title && (
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0A9C8E]">
                    {videos[currentVideoIndex].title}
                  </div>
                )}
                {videos[currentVideoIndex].caption && (
                  <div className="mt-1 text-[12px] text-[#4A5C5B]">{videos[currentVideoIndex].caption}</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {isOpen && images[currentIndex] && (
        <div className="fixed inset-0 z-[90] bg-black/90 flex items-center justify-center">
          <button onClick={close} className="absolute top-6 right-6 text-white">
            <X className="w-6 h-6" />
          </button>
          <button onClick={prev} className="absolute left-6 text-white">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <div className="relative w-[80vw] h-[80vh]">
            <Image src={images[currentIndex].src} alt={images[currentIndex].alt} fill
                  sizes="100vw"
                  className="object-contain" />
          </div>
          <button onClick={next} className="absolute right-6 text-white">
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}

      <JoinCommunitySection />
    </div>
  );
}
