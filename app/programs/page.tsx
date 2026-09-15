"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { HeroSlider } from "../components/hero-slider";
import { JoinCommunitySection } from "../components/join-community-section";

const PROGRAMS_HERO_IMAGES = [
  "/images/wfw/slide 6 - our programs/Main photo.jpg",
  "/images/wfw/slide 6 - our programs/Strengthening women-led businesses.jpg",
  "/images/wfw/slide 6 - our programs/Socio-economic empowerment.jpg",
  "/images/wfw/slide 6 - our programs/Graduation out of poverty.JPG",
];
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
    navLabel: "GRADUATION OUT OF POVERTY",
    kicker: "01 - GRADUATION OUT OF POVERTY",
    titleMain: "GRADUATION OUT OF POVERTY",
    titleAccent: "",
    paragraphs: [
      "After completing our 12-month program, graduates embark on a pathway to graduation out of poverty - becoming change-makers, business owners, cooperative leaders, and advocates. Through graduate support, women receive advanced training, access additional resources, improve their vocational skills, and connect to other graduates for production and employment.",
      "We know that women may need additional tools to overcome their challenges, especially in starting and growing their businesses, after graduation. By connecting women to financial services, advanced business and vocational training, and support networks, we increase opportunities to grow their businesses and unlock their full potential."
    ],
    image: "/images/site/programs-graduate.jpg",
    imageAlt: "Graduate program participants"
  },
  {
    id: "02",
    navLabel: "SUPPORT PROGRAM",
    kicker: "02 - SUPPORT PROGRAM",
    titleMain: "SOCIOECONOMIC EMPOWERMENT",
    titleAccent: "",
    paragraphs: [
      "At Women for Women Rwanda, our commitment to socioeconomic empowerment extends beyond individual growth. Recognizing that true progress requires a unified approach, our support initiatives extend to men's engagement, community advocacy, GBV prevention, and adolescent girls programming."
    ],
    image: "/images/site/programs-complementary.jpg",
    imageAlt: "Socioeconomic empowerment"
  },
  {
    id: "03",
    navLabel: "DEVELOPMENT PROGRAM",
    kicker: "03 - DEVELOPMENT PROGRAM",
    titleMain: "STRENGTHENING WOMEN-LED BUSINESSES",
    titleAccent: "",
    paragraphs: [
      "For the past 29 years, our Development Program has been a beacon of transformation, strengthening women-led businesses across Rwanda. This comprehensive 12-month initiative empowers vulnerable women to achieve financial independence, build sustainable enterprises, and forge vital connections.",
      "Women for Women Rwanda's Development Program is at the heart of this endeavor. It reaches across rural and semi-urban landscapes, bringing hope and empowerment to vulnerable women, including widows and survivors.",
      "In this journey, women embark on a year-long exploration of self-discovery and growth. Through education, they gain a deeper understanding of their rights, financial literacy, health, and advocacy, igniting the spark of change."
    ],
    image: "/images/site/programs-core.jpg",
    imageAlt: "Women seated together during a training session",
    badgeValue: "29+",
    badgeLabel: "YEARS OF IMPACT"
  }
];

const validTabIds = ["01", "02", "03"];

function ProgramsPageContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab = tabParam && validTabIds.includes(tabParam) ? tabParam : "01";
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (tabParam && validTabIds.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const activeProgram =
    programTabs.find((program) => program.id === activeTab) ?? programTabs[0];

  return (
    <div className="flex flex-col font-[family-name:var(--font-montserrat)] antialiased bg-white">
      
      {/* --- HERO SECTION --- */}
      <HeroSlider
        images={PROGRAMS_HERO_IMAGES}
        altPrefix="Our Programs"
        overlayClassName="bg-gradient-to-t from-black/20 via-transparent to-transparent"
        className="min-h-[calc(100vh-4rem)]"
      >
        <div className="flex flex-1 items-end pb-16 pt-28 sm:items-center sm:pb-0">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
            <div className="max-w-xl rounded-lg bg-[#06564F] p-8 shadow-2xl sm:p-10 md:p-12">
              <div className="mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/95">
                <Link href="/" className="transition-colors hover:text-white/80">
                  Home
                </Link>
                <span className="text-white/70">/</span>
                <span>Our Programs</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black uppercase leading-[0.92] tracking-tight text-white">
                OUR
                <span className="block font-light italic">PROGRAMS</span>
              </h1>

              <p className="mt-6 text-sm leading-relaxed text-white/90 md:text-base md:leading-relaxed">
                Every woman possesses the potential to shape her world. When women
                unite, they wield the strength to create a brighter collective
                future for Rwanda.
              </p>
            </div>
          </div>
        </div>
      </HeroSlider>

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

      <section id="program-details" className="bg-white pt-12 md:pt-14">
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

                {activeProgram.id === "01" && (
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
          {activeProgram.id === "03" ? (
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
          {activeProgram.id === "03" ? (
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
                    <Image src="/images/site/programs-skills-building.jpeg" alt="Holistic empowerment" fill className="object-cover object-center" />
                  </div>
                  <div>
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E7F6F3] rounded p-2 mb-4">
                      <ShieldCheck className="w-5 h-5 text-[#00A991]" strokeWidth={1.5} />
                    </div>
                    <div className="text-[#00A991] text-[11px] font-bold tracking-[0.18em] uppercase mb-3">FROM POSSIBILITY TO PROGRESS</div>
                    <h3 className="text-[28px] md:text-[40px] font-black uppercase text-[#0D2323] mb-4">BUILDING STRONGER FUTURES</h3>
                    <p className="text-[#6B7574] text-[14px] leading-relaxed max-w-[70ch] mb-4">For over 29 years, we have walked alongside girls and women in rural and semi-urban communities as they build stronger, more independent futures. Our approach supports the whole woman, strengthening her economic independence, wellbeing, confidence and ability to make decisions that shape her life.</p>
                    <p className="text-[#6B7574] text-[14px] leading-relaxed max-w-[70ch]">Because lasting transformation is about more than one opportunity. It is about girls and women having the skills, resources and support to move forward, strengthen their families and contribute to thriving communities.</p>
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
                    <div className="text-[#00A991] text-[11px] font-bold tracking-[0.18em] uppercase mb-3">WOMEN AS AGENTS OF CHANGE</div>
                    <h3 className="text-[30px] md:text-[44px] font-black uppercase text-[#0D2323] mb-4">LEADING TRANSFORMATION</h3>
                    <p className="text-[#6B7574] text-[14px] leading-relaxed max-w-[70ch] mb-4">Women's journeys do not end when they complete the Stronger Women, Stronger Nations Programme. They carry their knowledge, confidence and experience into their families and communities, becoming leaders and voices for positive transformation.</p>
                    <p className="text-[#6B7574] text-[14px] leading-relaxed max-w-[70ch]">Many step into leadership roles, support other women, speak up on issues affecting their communities and help find solutions to shared challenges. In doing so, they create an impact that reaches far beyond their own lives, strengthening families and helping build more resilient communities.</p>
                  </div>
                  <div className="relative h-[260px] w-full overflow-hidden sm:h-[380px] lg:h-[440px]">
                    <div className="absolute left-6 top-6 z-20">
                      <div className="bg-[#007A71] text-white text-[12px] font-bold px-3 py-1">02</div>
                    </div>
                    <Image src="/images/site/IMG_8210.jpeg" alt="Community advocacy" fill className="object-cover object-center" />
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
                    <Image src="/images/site/programs-gbv.jpeg" alt="GBV prevention" fill className="object-cover object-center" />
                  </div>
                  <div>
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E7F6F3] rounded p-2 mb-4">
                      <ShieldCheck className="w-5 h-5 text-[#00A991]" strokeWidth={1.5} />
                    </div>
                    <div className="text-[#00A991] text-[11px] font-bold tracking-[0.18em] uppercase mb-3">FOSTERING SAFER COMMUNITIES</div>
                    <h3 className="text-[28px] md:text-[40px] font-black uppercase text-[#0D2323] mb-4">GBV PREVENTION</h3>
                    <p className="text-[#6B7574] text-[14px] leading-relaxed max-w-[70ch]">We work with key community institutions, including the Police, health centres and faith-based organisations, to strengthen efforts to prevent Gender Based Violence. Through these partnerships, we raise awareness about GBV prevention, relevant laws and available support, while also addressing important areas such as hygiene, nutrition and family planning. Together, these efforts help individuals and families make informed decisions and contribute to safer, healthier communities.</p>
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
                    <p className="text-[#6B7574] text-[14px] leading-relaxed max-w-[70ch]">The Men's Engagement Program aims to ensure men and women enjoy the economic, health, and social benefits of gender equality. Whilst gender equality outcomes for women remain the primary focus of our programs, WfW-Rwanda acknowledges that, in order for the program to realize long-lasting change, it is imperative for men to appreciate that gender equality benefits everyone, including men, and that they have a role to play in realizing more equal societies. Men receive training on positive masculinity, while women are trained on life and business skills. Both participate in couple connect sessions, which include dialogues and take-home exercises to strengthen relationships. Men are encouraged to understand the challenges women face, recognize the value of shared responsibilities, and actively support women's participation in economic and social activities. Additionally, selected men and women are trained as community agents of change, promoting gender equality and empowering others in their communities.</p>
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
                    <Image src="/images/site/Abadacogora2.jpg" alt="Adolescent girls program" fill className="object-cover object-center" />
                  </div>
                  <div>
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-[#E7F6F3] rounded p-2 mb-4">
                      <GraduationCap className="w-5 h-5 text-[#00A991]" strokeWidth={1.5} />
                    </div>
                    <div className="text-[#00A991] text-[11px] font-bold tracking-[0.18em] uppercase mb-3">INVESTING IN THE FUTURE</div>
                    <h3 className="text-[30px] md:text-[44px] font-black uppercase text-[#0D2323] mb-4">ADOLESCENT GIRLS (ABADACOGORA)</h3>
                    <p className="text-[#6B7574] text-[14px] leading-relaxed max-w-[70ch]">The Abadacogora Program reaches 16- and 17-year-old girls, equipping them with the social and economic skills they need to strengthen their independence and make informed choices about their futures. Through a rights-based and survivor-centred approach, the program responds to the realities girls face within their communities, taking into account local challenges, gender norms and traditions.</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === '02' && (
            <section className="bg-[#007A71] py-12 mt-8">
              <div className="mx-auto max-w-7xl px-6 md:px-6">
                <p className="italic text-white/95 text-center text-[14px] md:text-[16px] leading-relaxed max-w-3xl mx-auto">“I want to transfer the knowledge and skills I have gained to other girls so they too can build a better life for themselves. As long as she is capable, she has the right to shape her own future.”</p>
                <p className="not-italic text-white/70 text-center text-[11px] md:text-[12px] mt-3 tracking-[0.05em]">— Esther Nikuze, Abadacogora program 2017 graduate</p>
              </div>
            </section>
          )}

          {activeTab === '01' && (
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
          {activeTab === '01' && (
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
          {activeTab === "03" && (
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

                    {activeTab === "03" && (
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


      <JoinCommunitySection />

    </div>
  );
}

export default function ProgramsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ProgramsPageContent />
    </Suspense>
  );
}

