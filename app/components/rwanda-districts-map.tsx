"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import geoData from "../data/rwanda-districts.json";

type Ring = [number, number][];
type District = { name: string; rings: Ring[]; centroid: [number, number] };
type GeoFile = {
  bounds: { west: number; east: number; south: number; north: number };
  districts: District[];
};

const GEO = geoData as unknown as GeoFile;

/** The seven districts WfW-Rwanda works in, with their provinces. */
export const WORKING_DISTRICTS: Record<string, string> = {
  Nyaruguru: "Southern Province",
  Muhanga: "Southern Province",
  Kicukiro: "Kigali City",
  Rwamagana: "Eastern Province",
  Bugesera: "Eastern Province",
  Gasabo: "Kigali City",
  Kayonza: "Eastern Province",
};

function makeProjection(width: number, height: number, pad = 16) {
  const { west, east, south, north } = GEO.bounds;
  const lonSpan = east - west;
  const latSpan = north - south;
  const scale = Math.min((width - pad * 2) / lonSpan, (height - pad * 2) / latSpan);
  const tx = (width - lonSpan * scale) / 2 - west * scale;
  const ty = (height - latSpan * scale) / 2 + north * scale;
  const project = ([lon, lat]: [number, number]): [number, number] => [lon * scale + tx, ty - lat * scale];
  return { project, scale };
}
type Projection = ReturnType<typeof makeProjection>;

const ringPath = (ring: Ring, { project }: Projection) => {
  let d = "";
  for (let i = 0; i < ring.length; i++) {
    const [x, y] = project(ring[i]);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return `${d}Z`;
};

function useSize(ref: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ w: 520, h: 400 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) setSize({ w: Math.round(width), h: Math.round(height) });
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

type RwandaDistrictsMapProps = {
  selected: string | null;
  onSelect: (name: string | null) => void;
};

export function RwandaDistrictsMap({ selected, onSelect }: RwandaDistrictsMapProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { w, h } = useSize(wrapRef);
  const [hovered, setHovered] = useState<string | null>(null);

  const proj = useMemo(() => makeProjection(w, h), [w, h]);

  const shapes = useMemo(
    () =>
      GEO.districts.map((d) => ({
        name: d.name,
        d: d.rings.map((r) => ringPath(r, proj)).join(""),
        working: d.name in WORKING_DISTRICTS,
        point: proj.project(d.centroid),
      })),
    [proj]
  );

  const activeName = hovered ?? selected;
  const active = activeName ? shapes.find((s) => s.name === activeName && s.working) : undefined;

  const TIP_W = 158;
  const tip = active
    ? {
        left: Math.max(6, Math.min(w - TIP_W - 6, active.point[0] - TIP_W / 2)),
        top: active.point[1] - 60 < 6 ? active.point[1] + 16 : active.point[1] - 60,
      }
    : null;

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        height="100%"
        role="img"
        aria-label="Map of Rwanda showing the seven districts where Women for Women Rwanda works"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* All 30 districts — neutral base */}
        {shapes.map((s) => (
          <path key={s.name} d={s.d} fill="#E3EAE9" stroke="#FFFFFF" strokeWidth="0.9" />
        ))}

        {/* The seven we work in */}
        {shapes
          .filter((s) => s.working)
          .map((s) => {
            const isActive = activeName === s.name;
            return (
              <path
                key={`w-${s.name}`}
                d={s.d}
                fill="#00A991"
                fillOpacity={isActive ? 0.85 : 0.28}
                stroke="#00A991"
                strokeWidth={isActive ? 1.4 : 0.9}
                strokeOpacity={isActive ? 1 : 0.55}
                style={{ transition: "fill-opacity .25s ease, stroke-width .25s ease", cursor: "pointer" }}
                onMouseEnter={() => setHovered(s.name)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSelect(selected === s.name ? null : s.name)}
              >
                <title>{`${s.name} — ${WORKING_DISTRICTS[s.name]}`}</title>
              </path>
            );
          })}

        {/* Markers */}
        {shapes
          .filter((s) => s.working)
          .map((s) => {
            const [x, y] = s.point;
            const isActive = activeName === s.name;
            return (
              <g
                key={`m-${s.name}`}
                tabIndex={0}
                role="button"
                aria-label={`${s.name}, ${WORKING_DISTRICTS[s.name]}`}
                onMouseEnter={() => setHovered(s.name)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(s.name)}
                onBlur={() => setHovered(null)}
                onClick={() => onSelect(selected === s.name ? null : s.name)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(selected === s.name ? null : s.name);
                  }
                }}
                style={{ cursor: "pointer", outline: "none" }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 4.8 : 3.6}
                  fill="#FFFFFF"
                  stroke="#007A71"
                  strokeWidth="1.6"
                  pointerEvents="none"
                  style={{ transition: "r .2s ease" }}
                />
                <circle cx={x} cy={y} r={11} fill="transparent" />
              </g>
            );
          })}
      </svg>

      {active && tip && (
        <div
          className="pointer-events-none absolute z-20 rounded-md border border-[#D4E0DE] bg-white px-3 py-2 shadow-md"
          style={{ left: tip.left, top: tip.top, width: TIP_W }}
          role="status"
        >
          <div className="text-[12px] font-bold text-[#0D2323]">{active.name}</div>
          <div className="mt-0.5 text-[10px] text-[#7A8C89]">{WORKING_DISTRICTS[active.name]}</div>
        </div>
      )}

      <div className="pointer-events-none absolute bottom-2 left-2 flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-[#00A991]/30 ring-1 ring-[#00A991]/50" />
          <span className="text-[10px] text-[#7A8C89]">Districts where we work</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-[#E3EAE9]" />
          <span className="text-[10px] text-[#7A8C89]">Other districts</span>
        </div>
      </div>
    </div>
  );
}
