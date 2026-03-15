"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { publicFetch } from "../../lib/publicApi";

function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

function toDateKey(value: string | Date) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export default function EventsCalendarPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  useEffect(() => {
    publicFetch<any>("/api/public/events")
      .then((res) => setEvents(Array.isArray(res.data) ? res.data : []))
      .catch(() => setEvents([]));
  }, []);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, any[]>();
    events.forEach((ev) => {
      const key = toDateKey(ev.eventDate);
      if (!key) return;
      const list = map.get(key) || [];
      list.push(ev);
      map.set(key, list);
    });
    return map;
  }, [events]);

  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const cells = [] as Array<{ date: Date; inMonth: boolean }>;
  for (let i = 0; i < 42; i += 1) {
    const dayOffset = i - startWeekday;
    const date = new Date(year, monthIndex, dayOffset + 1);
    cells.push({ date, inMonth: date.getMonth() === monthIndex });
  }

  function gotoPrev() {
    setMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }

  function gotoNext() {
    setMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-montserrat)]">
      <section className="bg-[#061E1C] text-white py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-12 bg-[#00A991]" />
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#00A991] font-semibold">Events Calendar</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Upcoming Events</h1>
          <p className="mt-3 text-sm text-[#B9D0CC] max-w-2xl">
            Explore upcoming events and click any date to see details about what’s happening.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10">
          <div className="bg-[#FAF9F6] border border-[#EDECE8] p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="text-[13px] uppercase tracking-[0.25em] text-[#007A71] font-extrabold">
                {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={gotoPrev} className="p-2 border border-[#EDECE8] hover:border-[#007A71]">
                  <ChevronLeft className="w-4 h-4 text-[#007A71]" />
                </button>
                <button onClick={gotoNext} className="p-2 border border-[#EDECE8] hover:border-[#007A71]">
                  <ChevronRight className="w-4 h-4 text-[#007A71]" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 text-[10px] uppercase tracking-[0.2em] text-[#7A8B89] font-bold mb-3">
              {"Sun Mon Tue Wed Thu Fri Sat".split(" ").map((d) => (
                <div key={d} className="text-center">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-[6px]">
              {cells.map(({ date, inMonth }) => {
                const key = toDateKey(date);
                const dayEvents = eventsByDate.get(key) || [];
                return (
                  <div
                    key={key}
                    className={
                      (inMonth ? "bg-white" : "bg-[#F3F1ED] text-gray-400") +
                      " min-h-[92px] border border-[#EFEDEA] p-2"
                    }
                  >
                    <div className="text-[11px] font-bold text-[#0D2323]">{date.getDate()}</div>
                    <div className="mt-2 space-y-1">
                      {dayEvents.slice(0, 3).map((ev) => (
                        <button
                          key={ev.id}
                          type="button"
                          onClick={() => setSelectedEvent(ev)}
                          className="block w-full text-left text-[9px] uppercase tracking-[0.18em] text-[#007A71] hover:text-[#00A991]"
                        >
                          {ev.title}
                        </button>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-[9px] text-[#7A8B89]">+{dayEvents.length - 3} more</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#061E1C] text-white border border-[#0E3A36] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-10 bg-[#00A991]" />
              <div className="text-[11px] uppercase tracking-[0.25em] text-[#00A991] font-semibold">Event Details</div>
            </div>

            {selectedEvent ? (
              <div>
                <div className="inline-block bg-[#00A991] text-[#05201f] text-[10px] uppercase px-2 py-1 tracking-[0.12em]">
                  {selectedEvent.badgeLabel || (selectedEvent.isFeatured ? "FEATURED EVENT" : "EVENT")}
                </div>
                <h2 className="mt-4 text-2xl font-extrabold uppercase leading-tight">
                  {selectedEvent.title}
                </h2>
                <ul className="mt-4 space-y-2 text-xs text-[#B9D0CC]">
                  <li className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#00A991]" />
                    <span>{formatDate(selectedEvent.eventDate)}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#00A991]" />
                    <span>{selectedEvent.isOnline ? "Online" : "In person"}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#00A991]" />
                    <span>{selectedEvent.location}</span>
                  </li>
                </ul>

                <p className="mt-4 text-[#9FB0AE] text-sm leading-relaxed">
                  {selectedEvent.excerpt}
                </p>

                <Link href={`/events/${selectedEvent.slug}`} className="mt-6 inline-flex items-center gap-2 text-[#00A991] font-semibold uppercase text-[10px]">
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <p className="text-sm text-[#9FB0AE]">Select an event from the calendar to see details.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
