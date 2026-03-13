'use client';

export function NewsletterSection() {
  return (
    <section className="bg-[#1A958A] py-12 md:py-14 font-[family-name:var(--font-montserrat)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-[520px]">
          <div className="mb-4 flex items-center gap-3 text-white/65">
            <span className="h-px w-7 bg-white/45"></span>
            <span className="text-[9px] font-bold uppercase tracking-[0.38em]">Stay Connected</span>
          </div>

          <h2 className="font-black uppercase leading-[0.88] text-white">
            <span className="text-[2.6rem] md:text-[3.4rem]">SUBSCRIBE TO</span>
            <span className="mt-1 block text-[2.48rem] font-extralight italic text-white/60 md:text-[3.28rem]">OUR NEWSLETTER</span>
          </h2>

          <p className="mt-4 max-w-[480px] text-[13.5px] leading-[1.5] text-white/85">
            Get quarterly updates on our programs, impact stories, and volunteer opportunities delivered to your inbox.
          </p>

          <form className="mt-6 flex flex-col md:flex-row">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 rounded-l-[3px] border border-white/20 bg-white/8 px-4 py-[13px] text-[13px] text-white/70 placeholder:text-white/45 focus:border-white/40 focus:bg-white/12 focus:outline-none md:rounded-r-none"
              required
            />
            <button
              type="submit"
              className="mt-3 rounded-[3px] bg-white px-7 py-[13px] text-[10.5px] font-black uppercase tracking-[0.18em] text-[#1A958A] transition-colors hover:bg-[#F0F9F7] md:mt-0 md:rounded-l-none"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
