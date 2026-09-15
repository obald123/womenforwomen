"use client";

import { useState } from "react";
import { RwandaDistrictsMap, WORKING_DISTRICTS } from "./rwanda-districts-map";

const DISTRICT_ORDER = [
  "Nyaruguru",
  "Muhanga",
  "Kicukiro",
  "Rwamagana",
  "Bugesera",
  "Gasabo",
  "Kayonza",
];

export function WhereWeWorkRwanda() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-xl border border-[#E4EAE9] bg-[#FAFCFB] p-4 md:p-6">
        <div className="aspect-[4/3] w-full">
          <RwandaDistrictsMap selected={selected} onSelect={setSelected} />
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <p className="mb-6 text-sm leading-relaxed text-[#6B7574]">
          Women for Women Rwanda runs its 12-month signature programme and complementary
          initiatives across seven districts in three provinces, reaching women in both rural
          communities and Kigali City. Select a district to locate it on the map.
        </p>

        <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-2">
          {DISTRICT_ORDER.map((district) => {
            const isSelected = selected === district;
            return (
              <button
                key={district}
                type="button"
                onClick={() => setSelected(isSelected ? null : district)}
                aria-pressed={isSelected}
                className={`flex items-start gap-2 border px-4 py-3 text-left transition-colors ${
                  isSelected
                    ? "border-[#00A991] bg-[#E7F3F1]"
                    : "border-transparent bg-[#F1F5F4] hover:border-[#BFD8D4]"
                }`}
              >
                <span
                  className={`mt-[6px] h-[6px] w-[6px] rounded-full ${
                    isSelected ? "bg-[#007A71]" : "bg-[#00A991]"
                  }`}
                />
                <span>
                  <span className="block text-[12px] font-bold leading-none text-[#172E30]">{district}</span>
                  <span className="mt-1 block text-[10px] font-medium text-[#658082]">
                    {WORKING_DISTRICTS[district]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
