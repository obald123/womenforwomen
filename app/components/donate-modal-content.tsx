"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ShieldCheck, X, Heart } from "lucide-react";

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

type DonateModalContentProps = {
  onClose: () => void;
};

export function DonateModalContent({ onClose }: DonateModalContentProps) {
  const [isMonthly, setIsMonthly] = useState(false);
  const [customAmount, setCustomAmount] = useState<number | "">("");
  const [selectedAmount, setSelectedAmount] = useState<number>(100);

  const amounts = isMonthly ? monthlyAmounts : oneTimeAmounts;
  const theme = isMonthly
    ? {
        accent: "#C7662E",
        badge: "STAND WITH HER",
        title: "Stand With Her",
        cta: `SPONSOR — $${selectedAmount}/MONTH`,
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
        cta: `DONATE $${selectedAmount}`,
        helper:
          "Your one-time donation directly supports Women for Women Rwanda's programs that help marginalized women rebuild their lives.",
        bullets: [
          "Access vocational training and education",
          "Develop sustainable livelihoods",
          "Build confidence and community networks",
        ],
      };

  const formattedInputValue = useMemo(() => {
    if (customAmount === "") return "";
    return String(customAmount);
  }, [customAmount]);

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
      return;
    }
    const parsed = Number(numeric);
    setCustomAmount(parsed);
    setSelectedAmount(parsed);
  };

  return (
    <div className="relative w-full max-w-5xl overflow-hidden rounded-sm bg-white shadow-2xl">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close donate modal"
        className="absolute right-6 top-6 z-20 flex h-9 w-9 items-center justify-center border border-[#E5E9E9] bg-white text-[#5C6B69] hover:text-[#102022]"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr]">
        {/* Left panel */}
        <div className="relative flex flex-col bg-[#11221F] text-white">
          <div className="relative h-64 md:h-72">
            <Image
              src="/images/site/join-community.jpg"
              alt="Women in Rwanda"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div
              className="absolute left-6 top-6 inline-flex items-center gap-2 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white"
              style={{ backgroundColor: theme.accent }}
            >
              <Heart className="h-3 w-3" />
              {theme.badge}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 px-8 py-7">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center">
                <Image src="/favicon.png" alt="WFW" width={28} height={28} className="h-7 w-7 object-contain" />
              </span>
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/80">
                WOMEN FOR WOMEN RWANDA
              </div>
            </div>

            <h2 className="text-2xl font-black">{theme.title}</h2>
            <p className="text-[13px] leading-relaxed text-white/70">{theme.helper}</p>

            <ul className="space-y-2 text-[12px] text-white/70">
              {theme.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#2CB6A2]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-4 text-[11px] text-white/45">
              Registered NGO - Tax-deductible
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col gap-6 px-8 py-8 md:px-10">
          <div className="flex items-center gap-3 text-[13px] font-semibold text-[#1E2F2D]">
            <ShieldCheck className="h-4 w-4 text-[#0B7A6D]" />
            Secure Donation
          </div>

          <div className="grid grid-cols-2 overflow-hidden rounded-sm border border-[#E6ECEC]">
            <button
              type="button"
              onClick={() => handleToggle(false)}
              className={`px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em] ${
                !isMonthly
                  ? "bg-[#102622] text-white"
                  : "bg-white text-[#6B7A78]"
              }`}
            >
              Give Once
            </button>
            <button
              type="button"
              onClick={() => handleToggle(true)}
              className={`px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em] ${
                isMonthly
                  ? "bg-[#102622] text-white"
                  : "bg-white text-[#6B7A78]"
              }`}
            >
              Monthly
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {amounts.map((amount) => {
              const isActive = selectedAmount === amount.value && customAmount === "";
              return (
                <button
                  key={amount.value}
                  type="button"
                  onClick={() => handleAmountClick(amount.value)}
                  className={`border px-3 py-2 text-sm font-bold ${
                    isActive
                      ? "text-white"
                      : "text-[#1E2F2D] hover:border-[#C2D0CF]"
                  }`}
                  style={{
                    borderColor: isActive ? theme.accent : "#E6ECEC",
                    backgroundColor: isActive ? theme.accent : "white",
                  }}
                >
                  {amount.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 border border-[#E6ECEC] bg-[#FAF8F4] px-4 py-3">
            <span className="text-[16px] font-black">$</span>
            <input
              type="text"
              value={formattedInputValue}
              onChange={(e) => handleCustomChange(e.target.value)}
              placeholder={String(selectedAmount)}
              className="w-full bg-transparent text-[16px] font-semibold text-[#1E2F2D] outline-none placeholder:text-[#A0ABA9]"
            />
            <span className="text-[12px] font-semibold text-[#6B7A78]">USD</span>
          </div>

          <button
            type="button"
            className="w-fit text-[12px] font-semibold underline underline-offset-4"
            style={{ color: theme.accent }}
          >
            Dedicate this donation
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-3 text-[12px] font-black uppercase tracking-[0.2em] text-white"
            style={{ backgroundColor: theme.accent }}
          >
            {theme.cta}
          </button>

          <div className="flex items-center justify-center">
            <div className="flex h-16 w-56 items-center justify-center border border-[#E6ECEC] bg-white px-4">
              <Image
                src="/images/site/Visa-Mastercard-1-1024x378.webp"
                alt="Visa and Mastercard"
                width={220}
                height={80}
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>

          <div className="text-center text-[11px] text-[#6B7A78]">
            <span className="mx-2">Is my donation secure?</span>
            <span className="mx-2">Is this donation tax-deductible?</span>
            {isMonthly && <span className="mx-2">Can I cancel my recurring donation?</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
