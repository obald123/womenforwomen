"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, CreditCard, Heart, ShieldCheck, X } from "lucide-react";
import { GLOBAL_GIVING_URL } from "../../lib/donation";

type AmountOption = {
  value: number;
  label: string;
};

const oneTimeAmounts: AmountOption[] = [
  { value: 25, label: "$25" },
  { value: 50, label: "$50" },
  { value: 100, label: "$100" },
  { value: 250, label: "$250" },
  { value: 500, label: "$500" },
  { value: 1000, label: "$1,000" },
];

const monthlyAmounts: AmountOption[] = [
  { value: 35, label: "$35" },
  { value: 70, label: "$70" },
  { value: 105, label: "$105" },
  { value: 140, label: "$140" },
  { value: 210, label: "$210" },
  { value: 420, label: "$420" },
];

export function DonateModalContent({ onClose }: { onClose?: () => void } = {}) {
  const [isMonthly, setIsMonthly] = useState(false);
  const [customAmount, setCustomAmount] = useState<number | "">("");
  const [selectedAmount, setSelectedAmount] = useState<number>(100);

  const amounts = isMonthly ? monthlyAmounts : oneTimeAmounts;
  const theme = isMonthly
    ? {
        accent: "#C7662E",
        badge: "STAND WITH HER",
        title: "Stand With Her",
        helper:
          "For $35/month, you can sponsor one woman through our entire 12-month Core Empowerment Program.",
        bullets: [
          "Full program enrollment for one woman",
          "Vocational skills and financial literacy training",
          "Quarterly impact updates from your sponsored participant",
        ],
      }
    : {
        accent: "#007A71",
        badge: "ONE-TIME",
        title: "Make a One-Time Gift",
        helper:
          "Your one-time donation directly supports Women for Women Rwanda's programs that help marginalized women rebuild their lives.",
        bullets: [
          "Access vocational training and education",
          "Develop sustainable livelihoods",
          "Build confidence and community networks",
        ],
      };

  const handleAmountClick = (value: number) => {
    setSelectedAmount(value);
    setCustomAmount("");
  };

  const handleToggle = (monthly: boolean) => {
    setIsMonthly(monthly);
    setCustomAmount("");
    setSelectedAmount(monthly ? 35 : 100);
  };

  const handleCustomChange = (value: string) => {
    const numeric = value.replace(/[^\d]/g, "");
    if (!numeric) {
      setCustomAmount("");
      setSelectedAmount(0);
      return;
    }
    const parsed = Number(numeric);
    setCustomAmount(parsed);
    setSelectedAmount(parsed);
  };

  return (
    <div id="donation-form" className="mx-auto w-full max-w-7xl scroll-mt-24 px-6 py-14 sm:py-18 lg:px-8 lg:py-20">
      <div className="mb-8 flex max-w-2xl items-start justify-between gap-5">
        <div>
          <h2 className="text-3xl font-black uppercase leading-tight text-[#0D2323] sm:text-4xl">
            Choose your gift
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5D6A68]">
            Select an amount to support women building skills, livelihoods, and brighter futures.
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close donation form"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E5E9E9] bg-white text-[#5C6B69] transition-colors hover:bg-[#F3F7F6] hover:text-[#102022]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="grid overflow-hidden rounded-xl border border-[#E3EAE8] bg-white shadow-[0_24px_70px_rgba(13,35,35,0.10)] lg:grid-cols-[0.88fr_1.12fr]">
        <div className="relative flex min-h-[430px] flex-col justify-end overflow-hidden bg-[#102622] text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/site/join-community.jpg"
              alt="Women in Rwanda"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081513] via-[#081513]/65 to-[#081513]/10" />
          </div>
          <div className="relative z-10 p-7 sm:p-9 lg:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white" style={{ backgroundColor: theme.accent }}>
              <Heart className="h-3 w-3" fill="currentColor" />
              {theme.badge}
            </div>
            <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
              <Image src="/favicon.png" alt="" width={22} height={22} className="h-[22px] w-[22px] object-contain" />
              Women for Women Rwanda
            </div>
            <h3 className="text-2xl font-black leading-tight sm:text-3xl">{theme.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/80">{theme.helper}</p>
            <ul className="mt-6 space-y-3 text-[13px] text-white/85">
              {theme.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#4DD9C4]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-white/20 pt-4 text-[11px] text-white/60">
              Every gift helps create opportunity, confidence, and independence.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-lg font-black text-[#102622]">Your contribution</div>
              <p className="mt-1 text-xs text-[#71807D]">Choose a frequency and amount.</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-[#F0F7F5] px-3 py-2 text-[10px] font-bold text-[#0B7A6D]">
              <ShieldCheck className="h-4 w-4" />
              Secure via GlobalGiving
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 rounded-lg bg-[#F1F5F4] p-1">
            <button
              type="button"
              onClick={() => handleToggle(false)}
              aria-pressed={!isMonthly}
              className={`rounded-md px-4 py-3 text-xs font-black transition-colors ${
                !isMonthly
                  ? "bg-white text-[#102622] shadow-sm"
                  : "text-[#6B7A78] hover:text-[#102622]"
              }`}
            >
              Give Once
            </button>
            <button
              type="button"
              onClick={() => handleToggle(true)}
              aria-pressed={isMonthly}
              className={`rounded-md px-4 py-3 text-xs font-black transition-colors ${
                isMonthly
                  ? "bg-white text-[#102622] shadow-sm"
                  : "text-[#6B7A78] hover:text-[#102622]"
              }`}
            >
              Give Monthly
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {amounts.map((amount) => {
              const isActive = selectedAmount === amount.value && customAmount === "";
              return (
                <button
                  key={amount.value}
                  type="button"
                  onClick={() => handleAmountClick(amount.value)}
                  aria-pressed={isActive}
                  className={`rounded-lg border px-3 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 ${
                    isActive
                      ? "text-white shadow-md"
                      : "border-[#E6ECEC] bg-white text-[#1E2F2D] hover:border-[#A9C9C3]"
                  }`}
                  style={{
                    borderColor: isActive ? theme.accent : undefined,
                    backgroundColor: isActive ? theme.accent : "white",
                  }}
                >
                  {amount.label}
                </button>
              );
            })}
          </div>

          <label className="mt-5 block text-xs font-bold text-[#3D4C4B]" htmlFor="custom-donation-amount">
            Or enter a custom amount
          </label>
          <div className="mt-2 flex items-center gap-3 rounded-lg border border-[#DDE6E4] bg-[#FBFCFB] px-4 py-3 focus-within:border-[#00A991] focus-within:ring-2 focus-within:ring-[#00A991]/15">
            <span className="text-lg font-black text-[#1E2F2D]">$</span>
            <input
              id="custom-donation-amount"
              type="text"
              inputMode="numeric"
              value={customAmount}
              onChange={(e) => handleCustomChange(e.target.value)}
              placeholder="Enter amount"
              aria-label="Custom donation amount in US dollars"
              className="w-full bg-transparent text-base font-semibold text-[#1E2F2D] outline-none placeholder:text-[#A0ABA9]"
            />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7A78]">USD</span>
          </div>

          <a
            href={GLOBAL_GIVING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-5 py-4 text-sm font-black text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            style={{ backgroundColor: theme.accent }}
          >
            <CreditCard className="h-4 w-4" />
            Donate on GlobalGiving
          </a>
          <p className="mt-3 text-center text-xs leading-relaxed text-[#7C8986]">
            Confirm your gift amount and frequency on GlobalGiving; selections here are not transferred.
          </p>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#EDF0EF] pt-5">
            <div className="flex items-center gap-2 text-xs text-[#74817F]">
              <ShieldCheck className="h-4 w-4 text-[#0B7A6D]" />
              Payments are completed on GlobalGiving.
            </div>
            <div className="flex h-10 shrink-0 items-center justify-center rounded-md border border-[#E6ECEC] bg-white px-3">
              <Image
                src="/images/site/Visa-Mastercard-1-1024x378.webp"
                alt="Visa and Mastercard"
                width={120}
                height={44}
                className="h-7 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
