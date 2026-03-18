import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Target, Eye, Shield, Users, Award, Heart, BookOpen, Handshake, Wrench, TrendingUp, Globe } from "lucide-react";
import { HeroSlider } from "../components/hero-slider";
import { JoinCommunitySection } from "../components/join-community-section";

const ABOUT_HERO_IMAGES = [
  "/images/wfw/slide 2/Born from resilience.jpg",
  "/images/wfw/slide 2/Learn, share and support.jpeg",
  "/images/wfw/slide 2/7 districts.jpg",
];

const values = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Integrity",
    desc: "We are guided by strong ethical principles of honesty and truthfulness in everything we do."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Teamwork",
    desc: "Delivering as one team makes challenges easy and promotes ownership and sustainability."
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Respect",
    desc: "We believe respect is mutual. We value diversity and unique abilities for the common good."
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Accountability",
    desc: "We take personal responsibility for our actions and the impact we have on others."
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Excellence",
    desc: "We focus on quality and professionalism, ensuring client needs are always the priority."
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Dignity",
    desc: "Every member of our organization represents our cause with dignity and honor."
  }
];

export default function AboutPage() {
  return (
    <div className="flex flex-col font-[family-name:var(--font-montserrat)] antialiased bg-white">
      
      {/* HERO SECTION */}
      <HeroSlider
        images={ABOUT_HERO_IMAGES}
        altPrefix="About Us"
        overlayClassName="bg-gradient-to-r from-[#0D6B63]/85 via-[#0D6B63]/40 to-transparent"
        className="min-h-screen"
      >
        <div className="flex flex-1 items-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="mb-8 flex items-center gap-2 text-white/70">
                <Link href="/" className="text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-colors">
                  HOME
                </Link>
                <span className="text-white/50">/</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">ABOUT US</span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-[900] leading-[0.9] text-white tracking-tighter uppercase">
                ABOUT<br />
                <span className="font-extralight italic text-[#4DD9C4]">US</span>
              </h1>

              <p className="mt-6 text-sm md:text-base text-white leading-relaxed font-medium max-w-2xl">
                Promoting dignity, freedom, and equality for women in Rwanda since 1997. A story of resilience, transformation, and community.
              </p>
            </div>
          </div>
        </div>
      </HeroSlider>

      {/* BORN FROM RESILIENCE SECTION */}
      <section id="mission-vision" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* LEFT SIDE - CONTENT */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 bg-[#00A991]"></div>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00A991]">Who We Are</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black text-[#1F2937] leading-[1.05]">
                BORN FROM<br />
                <span className="italic font-light text-[#00A991]">RESILIENCE</span>
              </h2>
              
              <div className="space-y-5 text-sm text-gray-600 leading-relaxed font-medium">
                <p>
                  Women for Women Rwanda (WfW-Rwanda) is a non-governmental organization committed to promoting dignity, freedom, and equality for women. Our journey began in 1997 when we witnessed the devastating effects of the 1994 genocide on vulnerable women facing poverty, depression, and helplessness.
                </p>
                
                <p>
                  These women were facing poverty, depression, and a strong sense of helplessness. Through our combined efforts and with a team of dedicated trainers, strategists, and governance board members, we have transformed thousands of lives.
                </p>

                <p>
                  In 2021, WfW-Rwanda transitioned from WfWI as a local organization in Rwanda as an affiliate. Through our combined efforts and with both local and international partners, we have served and supported over <span className="text-[#00A991] font-bold">80,000 women</span> and helped start up <span className="text-[#00A991] font-bold">3,160 Village Savings and Loan Associations (VSLAs)</span>, over 390 of which are digitalized.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE - IMAGE GRID */}
            <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[450px]">
              {/* Large Image - Top Left and Bottom Left */}
              <div className="relative overflow-hidden row-span-2">
                <Image 
                  src="/images/site/aboutus-cohort 2024.jpeg"
                  alt="Cohort 2024"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <div className="inline-block bg-[#00A991]/40 px-2 py-1">
                    <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-white">Cohort 2024</span>
                  </div>
                </div>
              </div>
              
              {/* Top Right Image */}
              <div className="relative overflow-hidden h-[208px]">
                <Image 
                  src="/images/site/about-grid-2.jpg"
                  alt="Learning Together"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <div className="inline-block bg-[#00A991]/40 px-2 py-1">
                    <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-white">Learning Together</span>
                  </div>
                </div>
              </div>
              
              {/* Bottom Right Image */}
              <div className="relative overflow-hidden h-[208px]">
                <Image 
                  src="/images/site/aboutus-home.jpeg"
                  alt="Skills Training"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <div className="inline-block bg-[#00A991]/40 px-2 py-1">
                    <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-white">Skills Training</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR JOURNEY - TIMELINE SECTION */}
      <section className="py-16 bg-[#EEEAE4]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-8 bg-[#0D6B63]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0D6B63]">Our Journey</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-[#1F2937] leading-[1] uppercase mb-10">
            A PATH OF{" "}
            <span className="font-extralight italic text-[#0D6B63]">TRANSFORMATION</span>
          </h2>

          {/* Divider — dark teal under 1997 column, then thin gray */}
          <div className="flex items-center mb-0">
            <div className="w-1/4 h-[3px] bg-[#0D6B63]"></div>
            <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>

          {/* Timeline grid */}
          <div className="grid grid-cols-1 md:grid-cols-4">
            {/* 1997 */}
            <div className="bg-white px-6 py-8">
              <p className="text-6xl font-black text-[#0D6B63] mb-3">1997</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1F2937] mb-3">Our Beginning</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Women for Women International (WfWI) began operations in Rwanda, responding to the devastating effects of the 1994 genocide of the Tutsis on vulnerable women and children.
              </p>
            </div>

            {/* 2020 */}
            <div className="px-6 py-8">
              <p className="text-6xl font-black text-[#0D6B63]/40 mb-3">2020</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1F2937] mb-3">Legal Registration</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Women for Women Rwanda (WfW-Rwanda) was created and legally registered as a national organization in Rwanda.
              </p>
            </div>

            {/* 2021 */}
            <div className="px-6 py-8">
              <p className="text-6xl font-black text-[#0D6B63]/40 mb-3">2021</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1F2937] mb-3">Local Transition</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                WfW-Rwanda transitioned from WfWI as a local organization in Rwanda as an affiliate, taking full ownership of programs and operations.
              </p>
            </div>

            {/* Today */}
            <div className="px-6 py-8">
              <p className="text-6xl font-black text-[#0D6B63]/40 mb-3">Today</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1F2937] mb-3">Growing Impact</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Over 80,000 women served, 3,160+ VSLAs created, 390+ digitized savings groups, and 300+ women enrolled annually in our signature program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12-MONTH SIGNATURE PROGRAM SECTION */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* LEFT SIDE - IMAGE */}
            <div className="relative overflow-hidden h-[400px] lg:h-[500px]">
              <Image
            src="/images/site/impact-approach.jpg"
                alt="Women in classroom"
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#063F39] via-[#063F39]/80 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-8 flex items-end gap-4 px-8">
                <p className="text-7xl font-black leading-none text-white">300+</p>
                <p className="mb-1 text-[12px] font-black uppercase tracking-[0.2em] text-white/85">Women Enrolled Annually</p>
              </div>
            </div>

            {/* RIGHT SIDE - CONTENT */}
            <div className="flex flex-col gap-8">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 bg-[#0D6B63]"></div>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0D6B63]">12-Month Signature Program</span>
              </div>

              {/* Heading */}
              <h2 className="text-5xl md:text-5xl font-black text-[#1F2937] leading-[1.1] uppercase">
                LEARN, SHARE<br />
                <span className="font-extralight italic text-[#0D6B63]">& SUPPORT</span>
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                Every year, more than 300 young mothers and women aged 18–55 years are enrolled in the WfW-Rwanda 12-month signature program where they meet bi-weekly in groups of 25 to learn, share and support one another. They receive capacity building in social skills and business training to generate income for their families.
              </p>

              {/* Program Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                <div className="bg-[#F0F9F7] border border-[#D4EFE9] p-3 rounded-lg flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#0D6B63] flex-shrink-0" />
                  <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[#1F2937]">GBV Prevention</p>
                </div>
                <div className="bg-[#F0F9F7] border border-[#D4EFE9] p-3 rounded-lg flex items-center gap-3">
                  <Heart className="w-5 h-5 text-[#0D6B63] flex-shrink-0" />
                  <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[#1F2937]">Health & Wellness</p>
                </div>
                <div className="bg-[#F0F9F7] border border-[#D4EFE9] p-3 rounded-lg flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#0D6B63] flex-shrink-0" />
                  <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[#1F2937]">Women's Leadership</p>
                </div>
                <div className="bg-[#F0F9F7] border border-[#D4EFE9] p-3 rounded-lg flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-[#0D6B63] flex-shrink-0" />
                  <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[#1F2937]">Business Skills</p>
                </div>
                <div className="bg-[#F0F9F7] border border-[#D4EFE9] p-3 rounded-lg flex items-center gap-3">
                  <Handshake className="w-5 h-5 text-[#0D6B63] flex-shrink-0" />
                  <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[#1F2937]">Cooperative Building</p>
                </div>
                <div className="bg-[#F0F9F7] border border-[#D4EFE9] p-3 rounded-lg flex items-center gap-3">
                  <Wrench className="w-5 h-5 text-[#0D6B63] flex-shrink-0" />
                  <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[#1F2937]">Vocational Training</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT AREAS SECTION */}
      <section className="py-16 bg-gradient-to-r from-[#041D1A] to-[#052823]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-7 bg-[#00A991]"></div>
            <div className="h-[2px] w-7 bg-white/25"></div>
            <span className="text-[11px] font-black uppercase tracking-[0.28em] text-white/55">Impact Areas</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white leading-[0.95] uppercase">
            FOUR MAIN <span className="font-extralight italic text-white/55">OUTCOME AREAS</span>
          </h2>

          <p className="mt-5 max-w-3xl text-sm text-white/45 leading-relaxed font-medium">
            Our programs are designed around four transformative pillars that drive lasting change in women&apos;s lives and their communities.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="border border-white/10 bg-white/[0.08] p-6">
              <div className="w-12 h-12 bg-[#0B3E37]/80 flex items-center justify-center mb-5">
                <TrendingUp className="w-5 h-5 text-[#00A991]" />
              </div>
              <p className="text-[10px] font-black tracking-[0.2em] text-white/35 mb-3">01</p>
              <h3 className="text-[13px] font-black text-white uppercase leading-tight mb-3">Earning &amp; Saving Money</h3>
              <p className="text-[13px] leading-relaxed text-white/45">
                Building financial independence through cooperatives, VSLAs, and business skills training.
              </p>
            </div>

            <div className="border border-white/10 bg-white/[0.08] p-6">
              <div className="w-12 h-12 bg-[#0B3E37]/80 flex items-center justify-center mb-5">
                <Heart className="w-5 h-5 text-[#00A991]" />
              </div>
              <p className="text-[10px] font-black tracking-[0.2em] text-white/35 mb-3">02</p>
              <h3 className="text-[13px] font-black text-white uppercase leading-tight mb-3">Improving Health &amp; Well-Being</h3>
              <p className="text-[13px] leading-relaxed text-white/45">
                Comprehensive health and wellness education including GBV prevention and mental well-being.
              </p>
            </div>

            <div className="border border-white/10 bg-white/[0.08] p-6">
              <div className="w-12 h-12 bg-[#0B3E37]/80 flex items-center justify-center mb-5">
                <Users className="w-5 h-5 text-[#00A991]" />
              </div>
              <p className="text-[10px] font-black tracking-[0.2em] text-white/35 mb-3">03</p>
              <h3 className="text-[13px] font-black text-white uppercase leading-tight mb-3">Influencing Decisions</h3>
              <p className="text-[13px] leading-relaxed text-white/45">
                Empowering women to influence decisions in the home and community through leadership training.
              </p>
            </div>

            <div className="border border-white/10 bg-white/[0.08] p-6">
              <div className="w-12 h-12 bg-[#0B3E37]/80 flex items-center justify-center mb-5">
                <Globe className="w-5 h-5 text-[#00A991]" />
              </div>
              <p className="text-[10px] font-black tracking-[0.2em] text-white/35 mb-3">04</p>
              <h3 className="text-[13px] font-black text-white uppercase leading-tight mb-3">Connecting to Networks</h3>
              <p className="text-[13px] leading-relaxed text-white/45">
                Building local and global networks for support, advocacy, and sustained growth.
              </p>
            </div>
          </div>

          <p className="mt-10 max-w-4xl text-sm italic leading-relaxed text-white/30">
            We are always learning new approaches and strategies to stay effective and responsive to the needs of our communities.
          </p>
        </div>
      </section>

      {/* WHERE WE WORK SECTION */}
      <section className="bg-[#E8F5F2] min-h-[520px] flex">
        {/* LEFT - Image */}
        <div className="relative hidden lg:block w-[48%] flex-shrink-0">
          <Image
            src="/images/site/impact-hero.jpg"
            alt="Women in Rwanda market"
            fill
            className="object-cover object-center"
          />
          {/* subtle bottom green tint */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#B2DDD6]/60 to-transparent"></div>
        </div>

        {/* RIGHT - Content */}
        <div className="flex flex-col justify-center px-10 py-16 flex-1">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-7 bg-[#0D6B63]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0D6B63]">Where We Work</span>
          </div>

          {/* Heading */}
          <h2 className="text-6xl font-black text-[#0D1F1C] uppercase leading-none mb-1">SEVEN</h2>
          <h2 className="text-6xl font-extralight italic text-[#0D6B63] uppercase leading-none mb-6">DISTRICTS</h2>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed max-w-md mb-8">
            Women for Women Rwanda (WfW-Rwanda) is a national organization created and legally registered in 2020, recently transitioned from Women for Women International that has been operating in Rwanda since 1997.
          </p>

          {/* District Cards Grid */}
          <div className="grid grid-cols-2 gap-3 max-w-lg">
            {[
              { name: "Nyaruguru", province: "Southern Province" },
              { name: "Muhanga", province: "Southern Province" },
              { name: "Kicukiro", province: "Kigali City" },
              { name: "Rwamagana", province: "Eastern Province" },
              { name: "Bugesera", province: "Eastern Province" },
              { name: "Gasabo", province: "Kigali City" },
              { name: "Kayonza", province: "Eastern Province" },
            ].map((d) => (
              <div key={d.name} className="bg-white border border-gray-200 px-4 py-3 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#0D6B63] flex-shrink-0"></span>
                <div>
                  <p className="text-[12px] font-bold text-[#0D1F1C] leading-tight">{d.name}</p>
                  <p className="text-[11px] text-gray-400 leading-tight">{d.province}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <JoinCommunitySection />

    </div>
  );
}
