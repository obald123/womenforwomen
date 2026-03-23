'use client';

import { useState } from "react";
import Link from "next/link";
import { publicFetch } from "../../lib/publicApi";
import { sendEmail } from "../../lib/emailjsClient";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage("");
    publicFetch<any>("/api/public/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim() }),
    } as any)
      .then(() => {
        setStatus("success");
        setMessage("");
        setEmail("");
      })
      .catch(() => {
        setStatus("error");
        setMessage("Could not subscribe. Please try again.");
      });
  }

  return (
    <section className="bg-[#0B7F73] py-16 font-[family-name:var(--font-montserrat)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-4 text-white/70">
            <span className="h-px w-10 bg-white/50"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Stay Connected</span>
          </div>

          <h2 className="font-black uppercase leading-[0.88] text-white">
            <span className="block text-[2.8rem] md:text-[4.2rem]">SUBSCRIBE TO</span>
            <span className="mt-1 block text-[2.7rem] font-extralight italic text-white/45 md:text-[4.0rem]">
              OUR NEWSLETTER
            </span>
          </h2>

          <p className="mt-5 max-w-[680px] text-[14px] leading-[1.6] text-white/80 md:text-[15px]">
            Get quarterly updates on our programs, impact stories, and volunteer opportunities delivered to your inbox.
          </p>

          <form onSubmit={submit} className="mt-8 flex w-full max-w-[680px] flex-col md:flex-row">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-l-md border border-white/20 bg-white/15 px-5 py-[14px] text-[13px] text-white/85 placeholder:text-white/50 focus:border-white/40 focus:bg-white/20 focus:outline-none md:rounded-r-none"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-3 rounded-md bg-white px-8 py-[14px] text-[11px] font-black uppercase tracking-[0.2em] text-[#0B7F73] transition-colors hover:bg-[#F0F9F7] md:mt-0 md:rounded-l-none"
            >
              {status === "loading" ? "Sending..." : "Subscribe"}
            </button>
          </form>
          {message && (
            <p className={`mt-4 text-[12px] ${status === "error" ? "text-red-200" : "text-white/80"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
