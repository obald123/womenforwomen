"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import { HeroSlider } from "../components/hero-slider";
import { JoinCommunitySection } from "../components/join-community-section";

const PARTNER_HERO_IMAGES = [
  "/images/wfw/slide 11 - partner with us/Main photo.jpg",
  "/images/wfw/Home page/Strengthening women-led businesses.jpg",
  "/images/wfw/Home page/Socio-economic empowerment.jpg",
  "/images/wfw/Home page/Over 25 years of transformation.jpg",
];

const partnerWays = [
  {
    title: "Corporate Partnerships",
    description: "CSR programs, employee engagement, and co-branded initiatives.",
  },
  {
    title: "Foundation Grants",
    description: "Fund programs directly or support capacity-building efforts.",
  },
  {
    title: "Technical Assistance",
    description: "Share expertise in digital, finance, health, or agriculture.",
  },
  {
    title: "Volunteer Programs",
    description: "Place skilled volunteers to support program delivery.",
  },
];

const careerOpenings = [
  {
    title: "Program Coordinator - Core Empowerment",
    tags: ["PROGRAMS", "FULL-TIME"],
    location: "Kigali, Rwanda",
    date: "Posted February 28, 2026",
  },
  {
    title: "Monitoring & Evaluation Officer",
    tags: ["RESEARCH & IMPACT", "FULL-TIME"],
    location: "Kigali, Rwanda",
    date: "Posted March 1, 2026",
  },
  {
    title: "VSLA Digitization Field Officer",
    tags: ["DIGITAL SAVINGS", "FULL-TIME"],
    location: "Kigali, Rwanda",
    date: "Posted March 2, 2026",
  },
  {
    title: "Communications & Content Specialist",
    tags: ["COMMUNICATIONS", "FULL-TIME"],
    location: "Kigali, Rwanda",
    date: "Posted March 3, 2026",
  },
  {
    title: "Adolescent Girls Program Mentor",
    tags: ["ABADACOGORA PROGRAM", "CONTRACT (12 MONTHS)"],
    location: "Masaka / Rubona, Rwanda",
    date: "Posted February 20, 2026",
  },
  {
    title: "Finance & Grants Assistant",
    tags: ["FINANCE", "FULL-TIME"],
    location: "Kigali, Rwanda",
    date: "Posted March 5, 2026",
  },
];

type FormValues = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

export default function PartnerPage() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const setField =
    (field: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = e.target.value;
      setValues((prev) => ({ ...prev, [field]: next }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (!values.name.trim()) nextErrors.name = "Name is required.";
    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!values.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!values.message.trim()) nextErrors.message = "Message is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    // TODO: hook up to backend or email service.
  };

  return (
    <div className="flex flex-col font-[family-name:var(--font-montserrat)] antialiased bg-white">
      {/* HERO */}
      <HeroSlider
        images={PARTNER_HERO_IMAGES}
        altPrefix="Partner With Us"
        overlayClassName="bg-gradient-to-r from-[#0B5E57]/80 via-[#0B5E57]/45 to-transparent"
        className="min-h-screen"
      >
        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-16 md:px-8 md:pb-16 md:pt-20">
            <div className="max-w-3xl text-white">
              <div className="mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
                <span className="text-white/60">/</span>
                <span>Partner With Us</span>
              </div>

              <div className="mb-6 h-[2px] w-9 bg-white/70" />

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase leading-[0.9] tracking-tight">
                PARTNER
                <span className="block font-light italic text-white/90">WITH US</span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/90 md:text-base">
                Together we can create lasting change. Partner with Women for Women
                Rwanda to empower marginalized women and build stronger communities
                across the nation.
              </p>
            </div>
          </div>
        </div>
      </HeroSlider>

      {/* GET IN TOUCH */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 flex items-center gap-3 text-[#007A71]">
            <span className="h-[2px] w-10 bg-[#007A71]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.32em]">
              Get In Touch
            </span>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            {/* FORM */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.92] text-[#0D2323]">
                Partner
                <span className="ml-2 font-light italic text-[#007A71]">With Us</span>
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#6B7574]">
                Whether you represent a corporation, foundation, NGO, or government
                body, we would love to explore how we can work together to empower
                women across Rwanda.
              </p>

              <form
                className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2"
                onSubmit={onSubmit}
                noValidate
              >
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0D2323]">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={values.name}
                    onChange={setField("name")}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "partner-name-error" : undefined}
                    className={`mt-2 w-full border bg-[#FBFAF7] px-4 py-3 text-sm text-[#0D2323] placeholder:text-[#9AA6A4] focus:border-[#00A991] focus:outline-none ${
                      errors.name ? "border-[#C73D35]" : "border-[#D7E3E1]"
                    }`}
                    required
                  />
                  {errors.name && (
                    <p id="partner-name-error" className="mt-2 text-[11px] text-[#C73D35]">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0D2323]">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@organization.com"
                    value={values.email}
                    onChange={setField("email")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "partner-email-error" : undefined}
                    className={`mt-2 w-full border bg-[#FBFAF7] px-4 py-3 text-sm text-[#0D2323] placeholder:text-[#9AA6A4] focus:border-[#00A991] focus:outline-none ${
                      errors.email ? "border-[#C73D35]" : "border-[#D7E3E1]"
                    }`}
                    required
                  />
                  {errors.email && (
                    <p id="partner-email-error" className="mt-2 text-[11px] text-[#C73D35]">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0D2323]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+250 7XX XXX XXX"
                    value={values.phone}
                    onChange={setField("phone")}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "partner-phone-error" : undefined}
                    className={`mt-2 w-full border bg-[#FBFAF7] px-4 py-3 text-sm text-[#0D2323] placeholder:text-[#9AA6A4] focus:border-[#00A991] focus:outline-none ${
                      errors.phone ? "border-[#C73D35]" : "border-[#D7E3E1]"
                    }`}
                    required
                  />
                  {errors.phone && (
                    <p id="partner-phone-error" className="mt-2 text-[11px] text-[#C73D35]">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0D2323]">
                    Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Your organization name"
                    value={values.organization}
                    onChange={setField("organization")}
                    className="mt-2 w-full border border-[#D7E3E1] bg-[#FBFAF7] px-4 py-3 text-sm text-[#0D2323] placeholder:text-[#9AA6A4] focus:border-[#00A991] focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0D2323]">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell us about your partnership interest, how you'd like to collaborate, or any questions you may have..."
                    value={values.message}
                    onChange={setField("message")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "partner-message-error" : undefined}
                    className={`mt-2 w-full resize-none border bg-[#FBFAF7] px-4 py-3 text-sm text-[#0D2323] placeholder:text-[#9AA6A4] focus:border-[#00A991] focus:outline-none ${
                      errors.message ? "border-[#C73D35]" : "border-[#D7E3E1]"
                    }`}
                    required
                  />
                  {errors.message && (
                    <p id="partner-message-error" className="mt-2 text-[11px] text-[#C73D35]">
                      {errors.message}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 bg-[#007A71] px-7 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white"
                  >
                    Send Message
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* SIDEBAR */}
            <div className="space-y-6">
              <div className="border border-[#E7EEEC] bg-[#FBFAF7] p-6">
                <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#0D2323]">
                  Contact Information
                </h3>

                <div className="mt-6 space-y-5 text-sm text-[#5B6B69]">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center bg-[#E8F6F4] text-[#007A71]">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6B7A78]">
                        Email
                      </div>
                      <div className="mt-1">info@womenforwomenrwanda.org</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center bg-[#E8F6F4] text-[#007A71]">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6B7A78]">
                        Phone
                      </div>
                      <div className="mt-1">+250 794 089 592</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center bg-[#E8F6F4] text-[#007A71]">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6B7A78]">
                        Address
                      </div>
                      <div className="mt-1">KG 624 Street #15</div>
                      <div>P.O Box 2951, Kigali, Rwanda</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0F2622] p-6 text-white">
                <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-white/85">
                  Ways To Partner
                </h3>
                <div className="mt-5 space-y-5">
                  {partnerWays.map((item) => (
                    <div key={item.title} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                      <div className="text-[14px] font-bold">{item.title}</div>
                      <div className="mt-1 text-[12px] text-white/60">
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section className="bg-[#FBFAF7] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 flex items-center gap-3 text-[#007A71]">
            <span className="h-[2px] w-10 bg-[#007A71]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.32em]">
              Join Our Team
            </span>
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.92] text-[#0D2323]">
                Career
                <span className="ml-2 font-light italic text-[#007A71]">Opportunities</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#6B7574]">
                Be part of a passionate team dedicated to transforming the lives of
                marginalized women across Rwanda. We are always looking for
                committed individuals who share our vision.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-3 border border-[#D8E4E1] bg-white px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#007A71]"
            >
              <Briefcase className="h-4 w-4" />
              6 Open Positions
            </button>
          </div>

          <div className="mt-10 space-y-6">
            {careerOpenings.map((job) => (
              <div
                key={job.title}
                className="group flex flex-col justify-between gap-6 border border-[#E6EFEA] bg-white px-6 py-6 md:flex-row md:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#007A71]">
                    {job.tags.map((tag) => (
                      <span key={tag} className="bg-[#E8F6F4] px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-4 text-[18px] font-black text-[#0D2323]">
                    {job.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-4 text-[12px] text-[#6B7574]">
                    <span>{job.location}</span>
                    <span>{job.date}</span>
                  </div>
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center border border-[#D8E4E1] text-[#007A71] transition-colors group-hover:bg-[#007A71] group-hover:text-white">
                  <ChevronRight className="h-5 w-5" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-[#0F2622] p-6 text-white md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-white/5">
                  <Briefcase className="h-6 w-6 text-[#00A991]" />
                </div>
                <div>
                  <div className="text-[14px] font-bold">Can not see a role that fits?</div>
                  <p className="mt-2 text-[12px] text-white/60 max-w-xl">
                    We are always open to hearing from talented individuals. Send your CV
                    and cover letter to careers@womenforwomenrwanda.org and we will keep
                    your application on file.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 bg-[#007A71] px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em]"
              >
                Send Your CV
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <JoinCommunitySection />
    </div>
  );
}
