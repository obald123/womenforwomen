"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Briefcase,
  Heart,
  ShieldCheck,
  Zap,
  BookOpen,
  Wrench,
  DollarSign,
  ArrowRight,
  Megaphone,
  TrendingUp,
  Share2,
  Users,
  GraduationCap
} from "lucide-react";

const programTabs = [
  {
    id: "01",
    navLabel: "CORE PROGRAM",
    kicker: "01 - CORE PROGRAM",
    titleMain: "STRENGTHENING WOMEN-LED BUSINESSES",
    titleAccent: "",
    paragraphs: [
      "For the past 25 years, our Core Program has been a beacon of transformation, strengthening women-led businesses across Rwanda. This comprehensive 12-month initiative empowers vulnerable women to achieve financial independence, build sustainable enterprises, and forge vital connections.",
      "Women for Women Rwanda's CORE Program is at the heart of this endeavor. It reaches across rural and semi-urban landscapes, bringing hope and empowerment to vulnerable women, including widows and survivors.",
      "In this journey, women embark on a year-long exploration of self-discovery and growth. Through education, they gain a deeper understanding of their rights, financial literacy, health, and advocacy, igniting the spark of change."
    ],
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Women seated together during a training session",
    badgeValue: "25+",
    badgeLabel: "YEARS OF IMPACT"
  },
  {
    id: "02",
    navLabel: "COMPLEMENTARY",
    kicker: "02 — COMPLEMENTARY PROGRAM",
    titleMain: "SOCIOECONOMIC EMPOWERMENT",
    titleAccent: "",
    paragraphs: [
      "At Women for Women Rwanda, our commitment to socioeconomic empowerment extends beyond individual growth. Recognizing that true progress requires a unified approach, our complementary initiatives extend to men's engagement, community advocacy, GBV prevention, and adolescent girls programming."
    ],
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Socioeconomic empowerment"
  },
  {
    id: "03",
    navLabel: "GRADUATE PROGRAM",
    kicker: "03 — GRADUATE PROGRAM",
    titleMain: "GRADUATION OUT OF POVERTY",
    titleAccent: "",
    paragraphs: [
      "After completing our 12-month program, graduates embark on a pathway to graduation out of poverty — becoming change-makers, business owners, cooperative leaders, and advocates. Through graduate support, women receive advanced training, access additional resources, improve their vocational skills, and connect to other graduates for production and employment.",
      "We know that women may need additional tools to overcome their challenges, especially in starting and growing their businesses, after graduation. By connecting women to financial services, advanced business and vocational training, and support networks, we increase opportunities to grow their businesses and unlock their full potential."
    ],
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Graduate program participants"
  }
];

export default function ProgramsPage() {
  const [activeTab, setActiveTab] = useState("01");
  const activeProgram =
    programTabs.find((program) => program.id === activeTab) ?? programTabs[0];

  return (
    <div className="flex flex-col font-[family-name:var(--font-montserrat)] antialiased bg-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#0C3F3C]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070"
            alt="Students walking across a campus"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-y-0 left-0 w-[78%] bg-gradient-to-r from-[#06564F]/78 via-[#0A6D66]/52 to-transparent md:w-[62%]" />
          <div className="absolute left-0 top-0 h-full w-16 bg-[#045C55]/28 md:w-24" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-12 md:px-6 md:pb-12 md:pt-14">
          <div className="max-w-2xl">
            <div className="mb-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/95 md:mb-10">
              <Link href="/" className="transition-colors hover:text-white/80">
                Home
              </Link>
              <span className="text-white/70">/</span>
              <span>Our Programs</span>
            </div>

            <div className="mb-8 h-[2px] w-9 bg-white/90" />

            <h1 className="text-4xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-5xl md:text-7xl">
              OUR
              <span className="block font-light italic">PROGRAMS</span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/90 md:mt-6 md:text-base md:leading-relaxed">
              Every woman possesses the potential to shape her world. When women
              unite, they wield the strength to create a brighter collective
              future for Rwanda.
            </p>
          </div>
        </div>
      </section>

      {/* --- PROGRAM TABS --- */}
      <section className="relative z-20 border-b border-[#D8DEDD] bg-[#E7ECEB]">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex overflow-x-auto">
            {programTabs.map((tab) => {
              const isActive = tab.id === activeTab;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 border-b-2 px-4 py-2 text-left transition-colors md:px-5 ${
                    isActive
                      ? "border-[#00A991] bg-white text-[#007A71]"
                      : "border-transparent bg-transparent text-[#97A2A1] hover:text-[#6E7877]"
                  }`}
                >
                  <span className="mr-1 text-[9px] font-semibold tracking-[0.1em] opacity-80 md:text-[10px]">
                    {tab.id}
                  </span>
                  <span className="text-[10px] font-black tracking-[0.06em] md:text-[11px]">
                    {tab.navLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white pt-12 md:pt-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8 relative">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="max-w-[640px] pt-2 md:pt-5">
              <div className="mb-6 flex items-center gap-3 md:mb-5">
                <span className="h-[2px] w-8 bg-[#00A991]" />
                <span className="text-[10px] font-black uppercase tracking-[0.28em] text-[#007A71] md:text-[11px]">
                  {activeProgram.kicker}
                </span>
              </div>

              <h2 className="text-[30px] md:text-[44px] font-black uppercase leading-[0.94] tracking-tight text-[#0D2323]">
                {activeProgram.titleMain}
                <span className="block font-light italic text-[#00A991] sm:whitespace-nowrap text-[1.4rem] md:text-[1.9rem]">
                  {activeProgram.titleAccent}
                </span>
              </h2>

              <div className={`mt-7 space-y-4 pb-10 font-medium leading-[1.82] text-[#6B7574] md:pb-12 ${activeTab === '02' ? 'text-[14px] md:text-[14px]' : 'text-[15px] md:text-[15px]'}`}>
                {activeProgram.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            {activeProgram.id !== "02" && (
              <div className="relative h-[360px] w-full overflow-hidden sm:h-[500px] lg:h-[640px]">
                <Image
                  src={activeProgram.image}
                  alt={activeProgram.imageAlt}
                  fill
                  className="object-cover object-center"
                />

                {activeProgram.id === "03" && (
                  <div className="absolute bottom-0 left-0 right-0">
                    <div className="bg-gradient-to-b from-transparent via-[#007A71]/40 to-[#007A71]/95 py-8">
                      <div className="w-full text-left text-white/95 uppercase text-[11px] tracking-widest pl-6 md:pl-10">EMPOWERING ENTREPRENEURS</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Badge overlaps both columns at the bottom */}
          {activeProgram.id === "01" ? (
            <div className="hidden lg:block absolute left-0 right-0 mx-auto z-20" style={{ bottom: '-32px', width: 'fit-content' }}>
              <div className="bg-[#00A991] px-8 py-5 text-white shadow-xl flex flex-col items-center">
                <p className="text-4xl font-black leading-none tracking-tight md:text-5xl">
                  {activeProgram.badgeValue}
                </p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/95 md:text-xs">
                  {activeProgram.badgeLabel}
                </p>
              </div>
            </div>
          ) : null}
          {/* For mobile, keep badge inside image at bottom left */}
          {activeProgram.id === "01" ? (
            <div className="lg:hidden relative z-20 -mt-6 w-fit">
              <div className="bg-[#00A991] px-7 py-5 text-white shadow-xl flex flex-col items-center">
                <p className="text-3xl font-black leading-none tracking-tight">
                  {activeProgram.badgeValue}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/95">
                  {activeProgram.badgeLabel}
                </p>
              </div>
            </div>
          ) : null}
		</div>
          </section>

          {activeTab === '02' && (
            <section className="bg-[#FBF9F6] py-16 mt-8  border-[#ecebe6]">
              <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="relative h-[260px] w-full overflow-hidden sm:h-[380px] lg:h-[440px]">
                    <div className="absolute left-6 top-6 z-20">
                      <div className="bg-[#007A71] text-white text-[12px] font-bold px-3 py-1">01</div>
                    </div>
                    <Image src={activeProgram.image} alt={activeProgram.imageAlt} fill className="object-cover object-center" />
                  </div>
                  <div>
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E7F6F3] rounded p-2 mb-4">
                      <ShieldCheck className="w-5 h-5 text-[#00A991]" strokeWidth={1.5} />
                    </div>
                    <div className="text-[#00A991] text-[11px] font-bold tracking-[0.18em] uppercase mb-3">EMPOWERING TOGETHER FOR LASTING CHANGE</div>
                    <h3 className="text-[28px] md:text-[40px] font-black uppercase text-[#0D2323] mb-4">HOLISTIC EMPOWERMENT</h3>
                    <p className="text-[#6B7574] text-[14px] leading-relaxed max-w-[70ch]">Our commitment to transformative change extends beyond individual growth. For over 25 years, our CORE Program has empowered 18–55-year-old vulnerable women in rural and semi-urban areas, igniting hope and fostering empowerment.</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === '02' && (
            <section className="bg-white py-16 mt-8 border-[#ecebe6]">
              <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E7F6F3] rounded p-2 mb-4">
                      <Megaphone className="w-5 h-5 text-[#00A991]" strokeWidth={1.5} />
                    </div>
                    <div className="text-[#00A991] text-[11px] font-bold tracking-[0.18em] uppercase mb-3">WOMEN AS CHANGE AGENTS</div>
                    <h3 className="text-[30px] md:text-[44px] font-black uppercase text-[#0D2323] mb-4">COMMUNITY ADVOCACY</h3>
                    <p className="text-[#6B7574] text-[14px] leading-relaxed max-w-[70ch]">Our women graduates are more than beneficiaries — they are catalysts for change on society's front lines. Having completed the Stronger Women, Stronger Nations Program, these remarkable women leverage their newfound skills to become true Change Agents. Through local advocacy and leadership roles, they spearhead initiatives that rebuild communities and tackle persistent challenges.</p>
                  </div>
                  <div className="relative h-[260px] w-full overflow-hidden sm:h-[380px] lg:h-[440px]">
                    <div className="absolute left-6 top-6 z-20">
                      <div className="bg-[#007A71] text-white text-[12px] font-bold px-3 py-1">02</div>
                    </div>
                    <Image src={activeProgram.image} alt={activeProgram.imageAlt} fill className="object-cover object-center" />
                  </div>
                </div>
              </div>
            </section>
              )}

          {activeTab === '02' && (
            <section className="bg-[#FBF9F6] py-16 mt-8 border-[#ecebe6]">
              <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="relative h-[260px] w-full overflow-hidden sm:h-[380px] lg:h-[440px]">
                    <div className="absolute left-6 top-6 z-20">
                      <div className="bg-[#007A71] text-white text-[12px] font-bold px-3 py-1">03</div>
                    </div>
                    <Image src={activeProgram.image} alt={activeProgram.imageAlt} fill className="object-cover object-center" />
                  </div>
                  <div>
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E7F6F3] rounded p-2 mb-4">
                      <ShieldCheck className="w-5 h-5 text-[#00A991]" strokeWidth={1.5} />
                    </div>
                    <div className="text-[#00A991] text-[11px] font-bold tracking-[0.18em] uppercase mb-3">FOSTERING SAFER COMMUNITIES</div>
                    <h3 className="text-[28px] md:text-[40px] font-black uppercase text-[#0D2323] mb-4">GBV PREVENTION</h3>
                    <p className="text-[#6B7574] text-[14px] leading-relaxed max-w-[70ch]">We collaborate with influential institutions such as the Police, Health Centers, and faith-based organizations to create a united front against Gender-Based Violence. Through strategic partnerships, we deliver comprehensive campaigns on GBV prevention strategies, anti-GBV laws, hygiene, nutrition, and family planning — empowering community members with a holistic understanding of well-being and safety.</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === '02' && (
            <section className="bg-white py-16 mt-8 border-[#ecebe6]">
              <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E7F6F3] rounded p-2 mb-4">
                      <Users className="w-5 h-5 text-[#00A991]" strokeWidth={1.5} />
                    </div>
                    <div className="text-[#00A991] text-[11px] font-bold tracking-[0.18em] uppercase mb-3">ALLIES FOR EQUALITY</div>
                    <h3 className="text-[30px] md:text-[44px] font-black uppercase text-[#0D2323] mb-4">MEN'S ENGAGEMENT</h3>
                    <p className="text-[#6B7574] text-[14px] leading-relaxed max-w-[70ch]">Breaking the chains of gender norms and inequalities demands collaborative effort. We actively involve men as allies and advocates for women's empowerment. By collaborating with male community leaders and household members, we cultivate an understanding of the substantial benefits that arise from supporting women's progress.</p>
                  </div>
                  <div className="relative h-[260px] w-full overflow-hidden sm:h-[380px] lg:h-[440px]">
                    <div className="absolute left-6 top-6 z-20">
                      <div className="bg-[#007A71] text-white text-[12px] font-bold px-3 py-1">04</div>
                    </div>
                    <Image src={activeProgram.image} alt={activeProgram.imageAlt} fill className="object-cover object-center" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === '02' && (
            <section className="bg-[#FBF9F6]  py-16 mt-8 border-[#ecebe6]">
              <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="relative h-[260px] w-full overflow-hidden sm:h-[380px] lg:h-[440px]">
                    <div className="absolute left-6 top-6 z-20">
                      <div className="bg-[#007A71] text-white text-[12px] font-bold px-3 py-1">05</div>
                    </div>
                    <Image src={activeProgram.image} alt={activeProgram.imageAlt} fill className="object-cover object-center" />
                  </div>
                  <div>
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E7F6F3] rounded p-2 mb-4">
                      <GraduationCap className="w-5 h-5 text-[#00A991]" strokeWidth={1.5} />
                    </div>
                    <div className="text-[#00A991] text-[11px] font-bold tracking-[0.18em] uppercase mb-3">INVESTING IN THE FUTURE</div>
                    <h3 className="text-[30px] md:text-[44px] font-black uppercase text-[#0D2323] mb-4">ADOLESCENT GIRLS</h3>
                    <p className="text-[#6B7574] text-[14px] leading-relaxed max-w-[70ch]">We are piloting a program that reaches adolescent girls — providing bundled socioeconomic skills training that 16- and 17-year-old girls need to guard their independence and chart a course for the life they choose. We prioritize a rights-based and survivor-centered approach, developing the program through a local lens that accounts for country-specific challenges, gender norms, and traditions.</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === '02' && (
            <section className="bg-[#007A71] py-12 mt-8">
              <div className="mx-auto max-w-7xl px-2 md:px-6">
                <p className="italic text-white/95 text-center text-[12px] md:text-[14px] leading-none max-w-full mx-auto">“As we march forward, hand in hand with our partners and community members, we chart a course toward a violence-free, equitable, and empowered tomorrow.”</p>
              </div>
            </section>
          )}

          {activeTab === '03' && (
            <section className="bg-[#FBF9F6] py-16 mt-12  border-[#ecebe6]">
              <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-[2px] w-8 bg-[#00A991]" />
                  <div className="text-[#007A71] text-[12px] font-bold tracking-[0.18em] uppercase">WHAT WE PROVIDE</div>
                </div>
                <h3 className="text-[30px] md:text-[44px] font-black uppercase leading-[0.94] tracking-tight text-[#0D2323]">
                  <span className="mr-3">GRADUATE</span>
                  <span className="font-light italic text-[#00A991] text-[1.4rem] md:text-[1.6rem]">SUPPORT SERVICES</span>
                </h3>
                <p className="mt-4 text-[#6B7574] text-[12px] md:text-[14px] max-w-3xl">The advanced trainings are tailored to the context and the needs of our graduates, fostering continued opportunities after they complete the program.</p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="relative bg-white border border-[#F1F1EE] p-8 h-full">
                    <div className="absolute top-6 right-6 text-[40px] md:text-[48px] font-bold text-[#DFF5F2]">01</div>
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E7F6F3] rounded p-2 mb-4">
                      <BookOpen className="w-5 h-5 text-[#00A991]" strokeWidth={2} />
                    </div>
                    <h4 className="font-black text-[14px] uppercase mb-3 text-[#0D2323]">ADVANCED TRAINING</h4>
                    <p className="text-[#6B7574] text-[13px] leading-[1.7]">Tailored advanced business and vocational training designed to meet the specific needs and context of our graduates.</p>
                  </div>

                  <div className="relative bg-white border border-[#F1F1EE] p-8 h-full">
                    <div className="absolute top-6 right-6 text-[40px] md:text-[48px] font-bold text-[#DFF5F2]">02</div>
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E7F6F3] rounded p-2 mb-4">
                      <DollarSign className="w-5 h-5 text-[#00A991]" strokeWidth={2} />
                    </div>
                    <h4 className="font-black text-[14px] uppercase mb-3 text-[#0D2323]">BUSINESS COMPETITIONS</h4>
                    <p className="text-[#6B7574] text-[13px] leading-[1.7]">Women are trained on business plan designs and pitches. The best business plans are awarded seed money to expand their businesses.</p>
                  </div>

                  <div className="relative bg-white border border-[#F1F1EE] p-8 h-full">
                    <div className="absolute top-6 right-6 text-[40px] md:text-[48px] font-bold text-[#DFF5F2]">03</div>
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E7F6F3] rounded p-2 mb-4">
                      <Briefcase className="w-5 h-5 text-[#00A991]" strokeWidth={2} />
                    </div>
                    <h4 className="font-black text-[14px] uppercase mb-3 text-[#0D2323]">NETWORKING & FAIRS</h4>
                    <p className="text-[#6B7574] text-[13px] leading-[1.7]">Annual finance fairs and networking events bring together government institutions, private sector, financial institutions, and successful entrepreneurs.</p>
                  </div>

                  <div className="relative bg-white border border-[#F1F1EE] p-8 h-full">
                    <div className="absolute top-6 right-6 text-[40px] md:text-[48px] font-bold text-[#DFF5F2]">04</div>
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E7F6F3] rounded p-2 mb-4">
                      <Wrench className="w-5 h-5 text-[#00A991]" strokeWidth={2} />
                    </div>
                    <h4 className="font-black text-[14px] uppercase mb-3 text-[#0D2323]">VSLA DIGITIZATION</h4>
                    <p className="text-[#6B7574] text-[13px] leading-[1.7]">Supporting women in learning new technologies like VSLA digitization to break the gender digital divide that hinders their development.</p>
                  </div>

                  <div className="relative bg-white border border-[#F1F1EE] p-8 h-full">
                    <div className="absolute top-6 right-6 text-[40px] md:text-[48px] font-bold text-[#DFF5F2]">05</div>
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E7F6F3] rounded p-2 mb-4">
                      <Users className="w-5 h-5 text-[#00A991]" strokeWidth={2} />
                    </div>
                    <h4 className="font-black text-[14px] uppercase mb-3 text-[#0D2323]">MENTORSHIP & CREDIT</h4>
                    <p className="text-[#6B7574] text-[13px] leading-[1.7]">Connecting women with mentorship, advanced training, credit access, and markets to grow their businesses.</p>
                  </div>

                  <div className="relative bg-white border border-[#F1F1EE] p-8 h-full">
                    <div className="absolute top-6 right-6 text-[40px] md:text-[48px] font-bold text-[#DFF5F2]">06</div>
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E7F6F3] rounded p-2 mb-4">
                      <Heart className="w-5 h-5 text-[#00A991]" strokeWidth={2} />
                    </div>
                    <h4 className="font-black text-[14px] uppercase mb-3 text-[#0D2323]">LEADERSHIP & GOVERNANCE</h4>
                    <p className="text-[#6B7574] text-[13px] leading-[1.7]">Leadership and governance training so women can successfully work together in savings groups, producer groups, and cooperatives.</p>
                  </div>
                </div>
              </div>
            </section>
          )}
          {/* Two-panel graduate features: Business Competitions & Building Networks */}
          {activeTab === '03' && (
            <section className="py-16 mt-8 lg:py-20">
              <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left: Business Competitions (dark panel) */}
                  <div className="bg-[#0C3F3C] text-white p-8 md:p-12">
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-[#0A6D66] rounded p-2 mb-4 shadow-sm">
                        <TrendingUp className="w-5 h-5 text-[#DFF5F2]" strokeWidth={2} />
                      </div>
                    </div>
                    <h4 className="text-3xl md:text-4xl font-black uppercase mb-4 tracking-tight">BUSINESS COMPETITIONS</h4>
                    <p className="text-[#D1E9E6] text-[13px] md:text-[14px] leading-relaxed mb-8 max-w-[54ch]">Women for Women Rwanda invests in building capacities in business development. Women are trained on business plan designs and pitches. After training, women participate in business competitions where the best business plans are awarded seed money to expand their businesses.</p>

                    <div className="mt-6 grid grid-cols-2 gap-6">
                      <div className="border border-white/10 p-6 flex flex-col items-start justify-center">
                        <div className="text-3xl md:text-4xl font-black leading-none">$50K+</div>
                        <div className="mt-2 text-[12px] uppercase tracking-wider text-white/60">AWARDS DISBURSED</div>
                      </div>
                      <div className="border border-white/10 p-6 flex flex-col items-start justify-center">
                        <div className="text-3xl md:text-4xl font-black leading-none">10+</div>
                        <div className="mt-2 text-[12px] uppercase tracking-wider text-white/60">COMPETITIONS HELD</div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Building Networks (light panel) */}
                  <div className="bg-[#E7F6F3] p-8 md:p-12">
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-[#DFF5F2] rounded p-2 mb-4">
                        <Share2 className="w-5 h-5 text-[#007A71]" strokeWidth={2} />
                      </div>
                    </div>
                    <h4 className="text-3xl md:text-4xl font-black uppercase mb-4 text-[#0D2323] tracking-tight">BUILDING NETWORKS</h4>
                    <p className="text-[#6B7574] text-[13px] md:text-[14px] leading-relaxed mb-6 max-w-[64ch]">Every year we organize finance fairs and networking events that bring together government institutions, private sector representatives, financial institutions, donors, and successful women entrepreneurs to discuss available opportunities that can benefit women micro-entrepreneurs.</p>

                    <div className="flex flex-wrap gap-3 mt-3">
                      <span className="inline-block bg-white border border-[#D7EFE9] text-[#007A71] px-3 py-1 text-[12px] font-semibold rounded">MIGEPROF</span>
                      <span className="inline-block bg-white border border-[#D7EFE9] text-[#007A71] px-3 py-1 text-[12px] font-semibold rounded">MINICOM</span>
                      <span className="inline-block bg-white border border-[#D7EFE9] text-[#007A71] px-3 py-1 text-[12px] font-semibold rounded">MINAGRI</span>
                      <span className="inline-block bg-white border border-[#D7EFE9] text-[#007A71] px-3 py-1 text-[12px] font-semibold rounded">PRIVATE SECTOR</span>
                      <span className="inline-block bg-white border border-[#D7EFE9] text-[#007A71] px-3 py-1 text-[12px] font-semibold rounded">FINANCIAL INSTITUTIONS</span>
                      <span className="inline-block bg-white border border-[#D7EFE9] text-[#007A71] px-3 py-1 text-[12px] font-semibold rounded">WOMEN'S CHAMBER</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          {activeTab === "01" && (
                      <section className="bg-[#F8F8F4] py-16 mt-16  border-[#ecebe6]">
                        <div className="mx-auto max-w-7xl px-4 md:px-8">
                          <div className="mb-3 text-[#007A71] text-[12px] font-bold tracking-[0.18em] uppercase">How it works</div>
                          <div className="flex items-end gap-2 mb-7">
                            <span className="text-[2.2rem] md:text-[2.7rem] font-black leading-none text-[#0D2323]">THE FOUR</span>
                            <span className="text-[2.2rem] md:text-[2.7rem] font-light italic text-[#00A991] leading-none">PILLARS</span>
                          </div>
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {/* 1 */}
                            <div className="bg-white rounded shadow-sm p-7 flex flex-col h-full">
                              <div className="mb-5">
                                <BookOpen className="w-8 h-8 text-[#00A991] bg-[#E7F6F3] rounded p-1" strokeWidth={2} />
                              </div>
                              <div className="text-[11px] font-bold text-[#00A991] tracking-[0.18em] mb-1">01</div>
                              <div className="font-black text-[15px] mb-2 text-[#0D2323]">EDUCATION & RIGHTS</div>
                              <div className="text-[#6B7574] text-[13px] font-medium leading-[1.7]">Women gain a deeper understanding of their rights, financial literacy, health, and advocacy — igniting the spark of change.</div>
                            </div>
                            {/* 2 */}
                            <div className="bg-white rounded shadow-sm p-7 flex flex-col h-full">
                              <div className="mb-5">
                                <Wrench className="w-8 h-8 text-[#00A991] bg-[#E7F6F3] rounded p-1" strokeWidth={2} />
                              </div>
                              <div className="text-[11px] font-bold text-[#00A991] tracking-[0.18em] mb-1">02</div>
                              <div className="font-black text-[15px] mb-2 text-[#0D2323]">PRACTICAL SKILLS</div>
                              <div className="text-[#6B7574] text-[13px] font-medium leading-[1.7]">Vocational training and numeracy proficiency pave the way for sustainable livelihoods and economic independence.</div>
                            </div>
                            {/* 3 */}
                            <div className="bg-white rounded shadow-sm p-7 flex flex-col h-full">
                              <div className="mb-5">
                                <DollarSign className="w-8 h-8 text-[#00A991] bg-[#E7F6F3] rounded p-1" strokeWidth={2} />
                              </div>
                              <div className="text-[11px] font-bold text-[#00A991] tracking-[0.18em] mb-1">03</div>
                              <div className="font-black text-[15px] mb-2 text-[#0D2323]">RESOURCES & STIPENDS</div>
                              <div className="text-[#6B7574] text-[13px] font-medium leading-[1.7]">Stipends, asset transfers, and savings support cultivate economic stability, resilience, and determination.</div>
                            </div>
                            {/* 4 */}
                            <div className="bg-white rounded shadow-sm p-7 flex flex-col h-full">
                              <div className="mb-5">
                                <Heart className="w-8 h-8 text-[#00A991] bg-[#E7F6F3] rounded p-1" strokeWidth={2} />
                              </div>
                              <div className="text-[11px] font-bold text-[#00A991] tracking-[0.18em] mb-1">04</div>
                              <div className="font-black text-[15px] mb-2 text-[#0D2323]">SISTERHOOD & SOLIDARITY</div>
                              <div className="text-[#6B7574] text-[13px] font-medium leading-[1.7]">A nurturing space that fosters support, camaraderie, and strength among women in the program.</div>
                            </div>
                          </div>
                        </div>
                      </section>
                    )}

                    {activeTab === "01" && (
                      <section className="bg-[#0B7A6D] py-12 mt-10">
                        <div className="mx-auto max-w-7xl px-4 md:px-8">
                          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                            <div className="md:w-3/4">
                              <h3 className="text-2xl md:text-3xl font-black text-white">UNITING FOR PROGRESS</h3>
                              <p className="mt-4 text-white/90 text-sm md:text-[14px] leading-relaxed max-w-[70ch]">The call to action resounds: Let us come together to fortify Rwanda. By empowering women today, we lay the foundation for a stronger tomorrow.</p>
                            </div>
                            <div className="md:w-auto flex items-center md:justify-end">
                              <Link href="/partner" className="ml-auto md:ml-0 bg-white text-[#007A71] px-6 py-3 rounded-md font-semibold text-xs flex items-center gap-3 shadow-sm hover:opacity-95">
                                <span>PARTNER WITH US</span>
                                <ArrowRight className="w-4 h-4" strokeWidth={2} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </section>
                    )}

      
      {/* --- PROGRAM GALLERY (always visible) --- */}
        <section className="bg-[#0C3F3C] pt-12 pb-12 md:pb-16 lg:pb-20 font-sans relative z-10">
  <div className="mx-auto max-w-7xl px-4 md:px-6">
    {/* Top Label */}
    <div className="mb-6 flex items-center gap-3">
      <span className="h-[1px] w-8 bg-[#00A991]" />
      <div className="text-white/60 text-[10px] font-extrabold tracking-[0.25em] uppercase">
        EXPLORE ALL PROGRAMS
      </div>
    </div>

    {/* Grid of Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {programTabs.map((p, idx) => (
        <div
          key={p.id}
          className={`relative h-[420px] md:h-[520px] overflow-hidden group transition-all duration-300 
            ${idx === 0 ? 'ring-2 ring-[#00A991] ring-inset' : ''}`}
        >
          {/* Background Image */}
          <Image
            src={p.image}
            alt={p.imageAlt}
            fill
            className="object-cover object-center brightness-[0.85]"
          />

          {/* Green overlay: dark-green top, clear middle (removed bottom green) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#06564F]/85 via-transparent to-transparent" />

          {/* Card Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              {p.kicker}
            </div>
            
            <h3 className="text-[34px] font-[900] leading-[1.05] text-white uppercase tracking-tight max-w-[90%]">
              {p.titleMain}
              <span className="block font-light italic text-[#00A991]">{p.titleAccent}</span>
            </h3>

            <div className="mt-6">
              {idx === 0 ? (
                <div className="inline-block bg-white px-3 py-1.5 text-[10px] font-black tracking-widest text-[#0C3F3C] rounded-sm">
                  VIEWING
                </div>
              ) : (
                <div className="h-8" /> /* Spacer for alignment */
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
    
  </div>
</section>


      {/* --- JOIN OUR COMMUNITY --- */}
      <section className="relative min-h-[320px] md:min-h-[420px] lg:min-h-[520px] w-full overflow-hidden bg-[#0C3F3C]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070"
            alt="Community gathering"
            fill
            priority={false}
            className="object-cover object-center"
          />
          <div className="absolute inset-y-0 left-0 w-[72%] bg-gradient-to-r from-[#06564F]/86 via-[#0A6D66]/56 to-transparent md:w-[56%]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="max-w-2xl">
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90">GET INVOLVED</div>

            <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.92] tracking-tight text-white">
              JOIN OUR
              <span className="block font-light italic text-white/90 text-[2.3rem] md:text-[3.8rem]">COMMUNITY</span>
            </h2>

            <p className="mt-6 max-w-lg text-[13px] leading-relaxed text-white/90 md:text-[14px]">
              Partner with us, volunteer, or donate — every action helps us reach more women across Rwanda and build a stronger nation together.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/partner" className="inline-flex items-center gap-3 bg-white text-[#007A71] px-5 py-3 rounded-md font-semibold shadow-sm hover:opacity-95 text-[13px]">
                <span>PARTNER WITH US</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>

              <Link href="/careers" className="inline-flex items-center gap-3 border border-white/40 text-white px-5 py-3 rounded-md font-semibold hover:bg-white/10 text-[13px]">
                VIEW CAREERS
              </Link>
            </div>
          </div>
        </div>

        {/* pager removed to sit flush with gallery above */}
      </section>

    </div>
  );
}
