'use client';

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[#0B1512] pt-16 pb-8 text-[#9DA7A2]">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Branding and Socials */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="relative h-10 w-36 shrink-0">
                <Image src="/images/site/logo.png" alt="Women for Women Rwanda" fill sizes="144px" className="object-contain" />
              </div>
            </div>
            <p className="max-w-xs text-[13.5px] leading-[1.55] opacity-75 font-inter">
              Promoting dignity, freedom, and equality for women in Rwanda since 1997. 
              A national organization created and legally registered in 2020.
            </p>
            <div className="flex gap-3">
              <Link href="https://www.facebook.com/wfwrwanda/" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center border border-white/20 rounded-sm hover:border-white/40 transition-colors">
                <Facebook size={16} className="text-gray-300" />
              </Link>
              <Link href="https://x.com/WfWRwanda" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center border border-white/20 rounded-sm hover:border-white/40 transition-colors">
                <Twitter size={16} className="text-gray-300" />
              </Link>
              <Link href="https://www.instagram.com/wfw_rwanda/" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center border border-white/20 rounded-sm hover:border-white/40 transition-colors">
                <Instagram size={16} className="text-gray-300" />
              </Link>
              <Link href="https://www.linkedin.com/company/women-for-women-rwanda/?originalSubdomain=rw" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center border border-white/20 rounded-sm hover:border-white/40 transition-colors">
                <Linkedin size={16} className="text-gray-300" />
              </Link>
            </div>
          </div>

          {/* Column 2: Navigate */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/90 font-montserrat">Navigate</h4>
            <div className="flex flex-col gap-3 text-[13.5px] font-inter">
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link href="/about" className="hover:text-white transition-colors">Mission & Vision</Link>
              <Link href="/team" className="hover:text-white transition-colors">Our Team</Link>
              <Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link>
              <Link href="/news" className="hover:text-white transition-colors">Blog</Link>
            </div>
          </div>

          {/* Column 3: Programs */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/90 font-montserrat">Programs</h4>
            <div className="flex flex-col gap-3 text-[13.5px] font-inter">
              <Link href="#" className="hover:text-white transition-colors">Core Program</Link>
              <Link href="#" className="hover:text-white transition-colors">Complementary</Link>
              <Link href="#" className="hover:text-white transition-colors">Graduate Program</Link>
              <Link href="/impact" className="hover:text-white transition-colors">Our Impact</Link>
              <Link href="#" className="hover:text-white transition-colors">Success Stories</Link>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/90 font-montserrat">Contact</h4>
            <div className="flex flex-col gap-3 text-[13.5px] font-inter">
              <p>P.O Box 2951</p>
              <p>KG 624 Street #15</p>
              <p>Kigali, Rwanda</p>
              <p className="mt-1">+250 794 089 592</p>
              <p className="break-all">info@womenforwomenrwanda.org</p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/10 pt-7 text-[12.5px] opacity-60 md:flex-row font-inter">
          <p>© 2026 Women for Women Rwanda. All rights reserved.</p>
          <div className="mt-4 flex gap-2 md:mt-0">
            <span className="font-montserrat">Dignity</span> · <span className="font-montserrat">Freedom</span> · <span className="font-montserrat">Equality</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
