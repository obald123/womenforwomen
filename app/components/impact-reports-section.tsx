"use client";

import { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";
import { publicFetch, resolveImageUrl } from "../../lib/publicApi";

type ImpactReport = {
  id: string;
  title: string;
  year?: number | null;
  description?: string | null;
  coverImage?: string | null;
  fileUrl: string;
  fileName?: string | null;
};

export function ImpactReportsSection() {
  const [reports, setReports] = useState<ImpactReport[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    publicFetch<{ data: ImpactReport[] }>("/api/public/impact-reports?pageSize=50")
      .then((res) => setReports(Array.isArray(res.data) ? res.data : []))
      .catch(() => setReports([]))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <section id="impact-reports" className="scroll-mt-24 bg-[#F6F6F2] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-10 flex items-center gap-3 text-[#007A71]">
          <span className="h-[2px] w-10 bg-[#007A71]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Read the Full Picture</span>
        </div>

        <h2 className="mb-10 text-4xl md:text-5xl font-black uppercase leading-[0.95] text-[#0D2323]">
          Our Impact
          <span className="ml-2 font-light italic text-[#007A71]">Reports</span>
        </h2>

        {loaded && reports.length === 0 ? (
          <div className="border border-dashed border-[#D8DEDD] bg-white px-8 py-14 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8FA19E]">
              Reports are being prepared and will be published here soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <a
                key={report.id}
                href={resolveImageUrl(report.fileUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lg"
              >
                <div className="relative h-[200px] w-full overflow-hidden bg-[#E7F3F1]">
                  {report.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={resolveImageUrl(report.coverImage)}
                      alt={report.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <FileText className="h-12 w-12 text-[#8FC6BC]" strokeWidth={1.2} />
                    </div>
                  )}
                  {report.year && (
                    <span className="absolute left-4 top-4 bg-[#007A71] px-3 py-1 text-[11px] font-bold text-white">
                      {report.year}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[15px] font-black uppercase leading-snug text-[#0D2323]">
                    {report.title}
                  </h3>
                  {report.description && (
                    <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-[#6B7574]">
                      {report.description}
                    </p>
                  )}
                  <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#00A991]">
                    <Download className="h-3.5 w-3.5" />
                    Download Report
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
