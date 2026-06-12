"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { publicFetch } from "../../../lib/publicApi";
import {
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  Download,
  FileText,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

type JobOpening = {
  id: string;
  title: string;
  slug: string;
  department?: string | null;
  location?: string | null;
  employment?: string | null;
  description: string;
  requirements?: string[] | null;
  dueDate?: string | null;
  descriptionFileUrl?: string | null;
  descriptionFileName?: string | null;
  createdAt?: string;
};

export default function CareerDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [job, setJob] = useState<JobOpening | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [applyStatus, setApplyStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [applyError, setApplyError] = useState("");

  useEffect(() => {
    if (!slug) return;
    publicFetch<any>(`/api/public/jobs/${slug}`)
      .then((res) => {
        if (res?.data) setJob(res.data);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const submitApplication = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!job) return;
    const fd = new FormData(e.currentTarget);
    const resume = fd.get("resume");
    if (!(resume instanceof File) || resume.size === 0) {
      setApplyError("Please attach your resume (PDF or DOC).");
      return;
    }
    setApplyError("");
    setApplyStatus("loading");
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/jobs/${job.id}/apply`, {
      method: "POST",
      body: fd,
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        setApplyStatus("success");
        (e.target as HTMLFormElement).reset();
      })
      .catch(() => {
        setApplyStatus("error");
        setApplyError("Submission failed. Please check your files and try again.");
      });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white font-[family-name:var(--font-montserrat)]">
        <div className="text-[12px] text-[#6B7574] tracking-[0.2em] uppercase">Loading…</div>
      </div>
    );
  }

  if (notFound || !job) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white font-[family-name:var(--font-montserrat)] px-6 text-center">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#007A71] mb-4">Careers</div>
        <h1 className="text-4xl font-black uppercase text-[#0D2323] mb-4">Position Not Found</h1>
        <p className="text-sm text-[#6B7574] mb-8">This job listing is no longer available or has closed.</p>
        <Link
          href="/partner#career-opportunities"
          className="inline-flex items-center gap-2 bg-[#007A71] px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          View All Openings
        </Link>
      </div>
    );
  }

  const isExpired = job.dueDate ? new Date(job.dueDate) < new Date() : false;

  return (
    <div className="flex flex-col font-[family-name:var(--font-montserrat)] antialiased bg-white">
      {/* HEADER BAND */}
      <div className="bg-[#0B5E57] py-16 px-6">
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/partner#career-opportunities" className="hover:text-white transition-colors">Careers</Link>
            <span>/</span>
            <span className="text-white/90">{job.title}</span>
          </div>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {job.department && (
              <span className="bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
                {job.department}
              </span>
            )}
            {job.employment && (
              <span className="bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
                {job.employment}
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-[0.9] text-white tracking-tight">
            {job.title}
          </h1>

          {/* Meta row */}
          <div className="mt-6 flex flex-wrap gap-6 text-[13px] text-white/75">
            {job.location && (
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
            )}
            {job.employment && (
              <span className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                {job.employment}
              </span>
            )}
            {job.createdAt && (
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Posted {new Date(job.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            )}
            {job.dueDate && (
              <span className={`flex items-center gap-2 ${isExpired ? "text-red-300" : ""}`}>
                <Clock className="h-4 w-4" />
                {isExpired ? "Closed" : `Deadline: ${new Date(job.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="mx-auto w-full max-w-5xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">

          {/* LEFT — description + requirements + apply form */}
          <div>
            {/* Description */}
            <section>
              <div className="mb-4 flex items-center gap-3 text-[#007A71]">
                <span className="h-[2px] w-8 bg-[#007A71]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.32em]">About the Role</span>
              </div>
              <div
                className="prose prose-sm max-w-none text-[#3D4E4C] leading-relaxed
                  [&_h2]:text-[20px] [&_h2]:font-black [&_h2]:text-[#0D2323] [&_h2]:mt-6 [&_h2]:mb-3
                  [&_h3]:text-[17px] [&_h3]:font-extrabold [&_h3]:text-[#0D2323] [&_h3]:mt-5 [&_h3]:mb-2
                  [&_p]:my-3 [&_strong]:font-bold [&_em]:italic [&_u]:underline
                  [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </section>

            {/* Requirements */}
            {Array.isArray(job.requirements) && job.requirements.length > 0 && (
              <section className="mt-10">
                <div className="mb-4 flex items-center gap-3 text-[#007A71]">
                  <span className="h-[2px] w-8 bg-[#007A71]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.32em]">Requirements</span>
                </div>
                <ul className="space-y-2">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#3D4E4C]">
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[#007A71]" />
                      {req}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Application form */}
            {isExpired ? (
              <div className="mt-12 border border-[#E6EFEA] bg-[#FBFAF7] p-6">
                <p className="text-sm font-bold text-[#6B7574]">Applications for this position are now closed.</p>
              </div>
            ) : (
              <section className="mt-12" id="apply">
                <div className="mb-6 flex items-center gap-3 text-[#007A71]">
                  <span className="h-[2px] w-8 bg-[#007A71]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.32em]">Apply for this Position</span>
                </div>

                {applyStatus === "success" ? (
                  <div className="border border-[#CFE7E4] bg-[#E8F6F4] p-6">
                    <p className="text-sm font-bold text-[#007A71]">Application submitted successfully!</p>
                    <p className="mt-1 text-[12px] text-[#6B7574]">We will review your application and get back to you.</p>
                  </div>
                ) : (
                  <form onSubmit={submitApplication} className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0D2323]">Full Name</label>
                      <input
                        name="name"
                        required
                        className="mt-2 w-full border border-[#D7E3E1] bg-[#FBFAF7] px-4 py-3 text-sm text-[#0D2323] focus:border-[#00A991] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0D2323]">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="mt-2 w-full border border-[#D7E3E1] bg-[#FBFAF7] px-4 py-3 text-sm text-[#0D2323] focus:border-[#00A991] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0D2323]">Phone <span className="text-[#9AA6A4] font-bold">(optional)</span></label>
                      <input
                        name="phone"
                        className="mt-2 w-full border border-[#D7E3E1] bg-[#FBFAF7] px-4 py-3 text-sm text-[#0D2323] focus:border-[#00A991] focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0D2323]">Cover Letter <span className="text-[#9AA6A4] font-bold">(optional)</span></label>
                      <textarea
                        name="coverLetter"
                        rows={5}
                        className="mt-2 w-full resize-none border border-[#D7E3E1] bg-[#FBFAF7] px-4 py-3 text-sm text-[#0D2323] focus:border-[#00A991] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0D2323]">LinkedIn URL <span className="text-[#9AA6A4] font-bold">(optional)</span></label>
                      <input
                        name="linkedinUrl"
                        type="url"
                        className="mt-2 w-full border border-[#D7E3E1] bg-[#FBFAF7] px-4 py-3 text-sm text-[#0D2323] focus:border-[#00A991] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0D2323]">Portfolio URL <span className="text-[#9AA6A4] font-bold">(optional)</span></label>
                      <input
                        name="portfolioUrl"
                        type="url"
                        className="mt-2 w-full border border-[#D7E3E1] bg-[#FBFAF7] px-4 py-3 text-sm text-[#0D2323] focus:border-[#00A991] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0D2323]">Resume <span className="text-[#9AA6A4] font-bold">(PDF / DOC)</span></label>
                      <input
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        required
                        className="mt-2 w-full text-sm text-[#0D2323] file:mr-4 file:border-0 file:bg-[#E8F6F4] file:px-4 file:py-2 file:text-[10px] file:font-black file:uppercase file:tracking-[0.2em] file:text-[#007A71]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0D2323]">Supporting Document <span className="text-[#9AA6A4] font-bold">(optional)</span></label>
                      <input
                        type="file"
                        name="supporting"
                        accept=".pdf,.doc,.docx"
                        className="mt-2 w-full text-sm text-[#0D2323] file:mr-4 file:border-0 file:bg-[#E8F6F4] file:px-4 file:py-2 file:text-[10px] file:font-black file:uppercase file:tracking-[0.2em] file:text-[#007A71]"
                      />
                    </div>

                    {applyError && (
                      <div className="md:col-span-2 border border-[#F2D5D5] bg-[#FBEAEA] px-4 py-3 text-[12px] text-[#8E2B2B]">
                        {applyError}
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        disabled={applyStatus === "loading"}
                        className="inline-flex items-center gap-3 bg-[#007A71] px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white disabled:opacity-60"
                      >
                        {applyStatus === "loading" ? "Submitting…" : "Submit Application"}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                )}
              </section>
            )}
          </div>

          {/* RIGHT — sidebar */}
          <aside className="space-y-6">
            {/* Job description file download */}
            {job.descriptionFileUrl && (
              <div className="border border-[#E6EFEA] bg-[#FBFAF7] p-6">
                <div className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#0D2323]">Job Description</div>
                <p className="text-[12px] text-[#6B7574] mb-4">Download the full job description document for more details.</p>
                <a
                  href={job.descriptionFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={job.descriptionFileName || "job-description"}
                  className="inline-flex w-full items-center justify-center gap-2 border border-[#007A71] px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#007A71] hover:bg-[#007A71] hover:text-white transition-colors"
                >
                  <Download className="h-4 w-4" />
                  {job.descriptionFileName || "Download JD"}
                </a>
              </div>
            )}

            {/* Summary card */}
            <div className="border border-[#E6EFEA] bg-[#FBFAF7] p-6 space-y-4">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0D2323]">Position Summary</div>
              {[
                { label: "Department", value: job.department },
                { label: "Location", value: job.location },
                { label: "Employment", value: job.employment },
                {
                  label: "Deadline",
                  value: job.dueDate
                    ? new Date(job.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
                    : "Open until filled",
                },
              ].map(({ label, value }) => value && (
                <div key={label}>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#9AA6A4]">{label}</div>
                  <div className="mt-0.5 text-[13px] text-[#0D2323] font-semibold">{value}</div>
                </div>
              ))}
            </div>

            {/* Apply CTA */}
            {!isExpired && applyStatus !== "success" && (
              <a
                href="#apply"
                className="flex w-full items-center justify-center gap-2 bg-[#007A71] px-6 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white hover:bg-[#005e57] transition-colors"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </a>
            )}

            {/* Back link */}
            <Link
              href="/partner#career-opportunities"
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#007A71] hover:underline"
            >
              <ArrowLeft className="h-3 w-3" />
              All Openings
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
