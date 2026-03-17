'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Heart, ChevronDown, Menu, X } from 'lucide-react';
import { useDonateModal } from './donate-modal-provider';

type DropdownId = 'about' | 'programs' | null;

export function SiteHeader() {
  const pathname = usePathname() || '';
  const { openDonateModal } = useDonateModal();
  const [openDropdown, setOpenDropdown] = useState<DropdownId>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<DropdownId>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const programsRef = useRef<HTMLDivElement>(null);

  const isAboutActive =
    pathname === '/' ? false : pathname.startsWith('/about') || pathname === '/team' || pathname === '/gallery';
  const isProgramsActive = pathname.startsWith('/programs');

  const navLinkClass = (active: boolean) => {
    const base = 'text-[12px] font-bold uppercase tracking-[0.12em] transition-colors';
    return `${base} ${active ? 'text-[#00A991] hover:text-[#008472]' : 'text-[#666666] hover:text-[#00A991]'}`;
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
    setIsMenuOpen(false);
    setMobileOpen(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsFixed(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        aboutRef.current && !aboutRef.current.contains(target) &&
        programsRef.current && !programsRef.current.contains(target)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const headerClass = isFixed
    ? 'fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-100 shadow-md transition-all'
    : 'sticky top-0 z-50 w-full bg-white border-b border-gray-100';

  const dropdownPanel =
    'absolute left-0 top-full pt-1 min-w-[200px] transition-opacity duration-150';

  return (
    <>
      <header ref={headerRef} className={headerClass}>
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative h-12 w-36 sm:w-40">
            <Image src="/images/site/logo.png" alt="Women for Women Rwanda" fill sizes="160px" className="object-contain" />
          </div>
        </Link>

        {/* CENTER NAVIGATION */}
        <nav className="hidden flex-1 items-center justify-center gap-10 lg:flex">
          {/* HOME */}
          <Link href="/" className={navLinkClass(pathname === '/')}>
            HOME
          </Link>

          {/* ABOUT US DROPDOWN */}
          <div
            ref={aboutRef}
            className="relative"
            onMouseEnter={() => setOpenDropdown('about')}
            onMouseLeave={() => setOpenDropdown((prev) => (prev === 'about' ? null : prev))}
          >
            <div className={openDropdown === 'about' ? 'border-b-2 border-[#00A991]' : ''}>
              <Link
                href="/about"
                className={`flex items-center gap-1 ${navLinkClass(isAboutActive)}`}
                aria-haspopup="true"
                aria-expanded={openDropdown === 'about'}
              >
                ABOUT US
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === 'about' ? 'rotate-180' : ''}`} />
              </Link>
            </div>
            {openDropdown === 'about' && (
              <div className={dropdownPanel}>
                <div className="rounded-sm border border-gray-100 bg-white py-2 shadow-lg">
                  <Link
                    href="/about#mission-vision"
                    className="block px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 hover:bg-[#F0F7F6] hover:text-[#00A991] transition-colors"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Mission and Vision
                  </Link>
                  <Link
                    href="/team#team-section"
                    className="block px-4 py-2 text-[12px] font-medium text-[#666666] hover:bg-[#F0F7F6] hover:text-[#00A991] transition-colors"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Our Team
                  </Link>
                  <Link
                    href="/gallery#gallery-grid"
                    className="block px-4 py-2 text-[12px] font-medium text-[#666666] hover:bg-[#F0F7F6] hover:text-[#00A991] transition-colors"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Our Gallery
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* OUR PROGRAMS DROPDOWN */}
          <div
            ref={programsRef}
            className="relative"
            onMouseEnter={() => setOpenDropdown('programs')}
            onMouseLeave={() => setOpenDropdown((prev) => (prev === 'programs' ? null : prev))}
          >
            <div className={openDropdown === 'programs' ? 'border-b-2 border-[#00A991]' : ''}>
              <Link
                href="/programs"
                className={`flex items-center gap-1 ${navLinkClass(isProgramsActive)}`}
                aria-haspopup="true"
                aria-expanded={openDropdown === 'programs'}
              >
                OUR PROGRAMS
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === 'programs' ? 'rotate-180' : ''}`} />
              </Link>
            </div>
            {openDropdown === 'programs' && (
              <div className={dropdownPanel}>
                <div className="rounded-sm border border-gray-100 bg-white py-2 shadow-lg min-w-[220px]">
                  <Link
                    href="/programs?tab=01#program-details"
                    className="block px-4 py-2.5 text-[12px] font-medium text-[#666666] hover:bg-[#F0F7F6] hover:text-[#00A991] transition-colors"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Core Program
                  </Link>
                  <Link
                    href="/programs?tab=02#program-details"
                    className="block px-4 py-2.5 text-[12px] font-medium text-[#666666] hover:bg-[#F0F7F6] hover:text-[#00A991] transition-colors"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Complementary Program
                  </Link>
                  <Link
                    href="/programs?tab=03#program-details"
                    className="block px-4 py-2.5 text-[12px] font-medium text-[#666666] hover:bg-[#F0F7F6] hover:text-[#00A991] transition-colors"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Graduate Program
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/impact" className={navLinkClass(pathname.startsWith('/impact'))}>
            IMPACT
          </Link>

          <Link href="/news" className={navLinkClass(pathname.startsWith('/news'))}>
            NEWS
          </Link>
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* DONATE BUTTON */}
          <button
            type="button"
            onClick={openDonateModal}
            className="flex items-center gap-1.5 rounded-[3px] bg-[#C73D35] px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-white hover:bg-[#B03530] transition-colors"
          >
            <Heart size={14} fill="currentColor" />
            DONATE
          </button>

          {/* PARTNER BUTTON */}
          <Link
            href="/partner"
            className="rounded-[3px] bg-[#00A991] px-5 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-white hover:bg-[#008472] transition-colors"
          >
            PARTNER WITH US
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="lg:hidden inline-flex items-center justify-center p-2 text-[#0D2323]"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        </div>
      </header>

      {isFixed && <div aria-hidden style={{ height: headerHeight }} />}

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-[360px] bg-white shadow-xl p-6 overflow-y-auto">
            <div className="mb-6">
              <div className="text-[11px] font-black tracking-[0.3em] text-[#00A991] uppercase">
                Menu
              </div>
            </div>
            <nav className="flex flex-col gap-4">
              <Link href="/" className={navLinkClass(pathname === '/')}>HOME</Link>

              <button
                type="button"
                onClick={() => setMobileOpen((prev) => (prev === 'about' ? null : 'about'))}
                className={`flex items-center justify-between ${navLinkClass(isAboutActive)}`}
              >
                ABOUT US
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpen === 'about' ? 'rotate-180' : ''}`} />
              </button>
              {mobileOpen === 'about' && (
                <div className="ml-3 flex flex-col gap-2">
                  <Link href="/about#mission-vision" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Mission and Vision
                  </Link>
                  <Link href="/team#team-section" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Our Team
                  </Link>
                  <Link href="/gallery#gallery-grid" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Our Gallery
                  </Link>
                </div>
              )}

              <button
                type="button"
                onClick={() => setMobileOpen((prev) => (prev === 'programs' ? null : 'programs'))}
                className={`flex items-center justify-between ${navLinkClass(isProgramsActive)}`}
              >
                OUR PROGRAMS
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpen === 'programs' ? 'rotate-180' : ''}`} />
              </button>
              {mobileOpen === 'programs' && (
                <div className="ml-3 flex flex-col gap-2">
                  <Link href="/programs?tab=01#program-details" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Core Program
                  </Link>
                  <Link href="/programs?tab=02#program-details" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Complementary Program
                  </Link>
                  <Link href="/programs?tab=03#program-details" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Graduate Program
                  </Link>
                </div>
              )}

              <Link href="/impact" className={navLinkClass(pathname.startsWith('/impact'))}>IMPACT</Link>
              <Link href="/news" className={navLinkClass(pathname.startsWith('/news'))}>NEWS</Link>
            </nav>

            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  openDonateModal();
                }}
                className="flex items-center justify-center gap-2 rounded-[3px] bg-[#C73D35] px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-white"
              >
                <Heart size={14} fill="currentColor" />
                Donate
              </button>
              <Link
                href="/partner"
                className="rounded-[3px] bg-[#00A991] px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.14em] text-white"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
