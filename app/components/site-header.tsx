'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Heart } from 'lucide-react';
import { useDonateModal } from './donate-modal-provider';

export function SiteHeader() {
  const pathname = usePathname() || '';
  const { openDonateModal } = useDonateModal();

  const navClass = (path: string) => {
    const base = 'text-[12px] font-bold uppercase tracking-[0.12em] transition-colors';
    const isActive = path === '/' ? pathname === '/' : pathname && pathname.startsWith(path);
    return `${base} ${isActive ? 'text-[#00A991] hover:text-[#008472]' : 'text-[#666666] hover:text-[#00A991]'}`;
  };

  const headerRef = useRef<HTMLElement | null>(null);
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsFixed(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const headerClass = isFixed
    ? 'fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-100 shadow-md transition-all'
    : 'sticky top-0 z-50 w-full bg-white border-b border-gray-100';

  return (
    <>
      <header ref={headerRef} className={headerClass}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative h-9 w-12">
            <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
              <path d="M15 25C15 15 25 10 35 10C45 10 55 15 55 25C55 35 45 40 35 40C25 40 15 35 15 25Z" fill="#00A991"/>
              <path d="M5 25C5 45 30 55 50 55C70 55 95 45 95 25C70 25 50 40 5 25Z" fill="#00A991"/>
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[0.95rem] font-black tracking-tighter text-[#1A1A1A]">
              WOMEN FOR WOMEN
            </span>
            <span className="text-[0.75rem] font-semibold tracking-[0.15em] text-[#666666]">
              RWANDA
            </span>
          </div>
        </Link>

        {/* CENTER NAVIGATION */}
        <nav className="hidden flex-1 items-center justify-center gap-12 md:flex">
          <Link href="/about" className={navClass('/about')}>
            ABOUT
          </Link>

          <Link href="/programs" className={navClass('/programs')}>
            PROGRAMS
          </Link>

          <Link href="/impact" className={navClass('/impact')}>
            IMPACT
          </Link>

          <Link href="/news" className={navClass('/news')}>
            NEWS
          </Link>
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-3 shrink-0">
          {/* DONATE BUTTON */}
          <button
            type="button"
            onClick={openDonateModal}
            className="flex items-center gap-1.5 rounded-[3px] bg-[#C73D35] px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.14em] text-white hover:bg-[#B03530] transition-colors"
          >
            <Heart size={14} fill="currentColor" />
            DONATE
          </button>

          {/* PARTNER BUTTON */}
          <Link
            href="/partner"
            className="rounded-[3px] bg-[#00A991] px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.14em] text-white hover:bg-[#008472] transition-colors"
          >
            PARTNER WITH US
          </Link>
        </div>

        </div>
      </header>

      {isFixed && <div aria-hidden style={{ height: headerHeight }} />}
    </>
  );
}
