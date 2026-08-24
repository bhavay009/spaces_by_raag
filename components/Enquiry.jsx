"use client";
import { useState } from "react";
import { budgets, site } from "@/lib/site";

const field =
  "w-full border-b border-cream/25 bg-transparent px-0 py-3.5 text-[15px] text-cream placeholder:text-cream/55 transition-colors duration-400 focus:border-bronze focus:outline-none";
const label = "tracked-sm block text-[9px] text-cream/60";

export default function Enquiry() {
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    if (state === "sending") return;
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());

    const next = {};
    if (!data.name?.trim()) next.name = "Please tell us your name.";
    if (!/^[\d\s+()-]{7,}$/.test(data.phone || "")) next.phone = "Please enter a valid phone number.";
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) next.email = "Please check this email address.";
    if (!data.location?.trim()) next.location = "Where is the project?";
    setErrors(next);
    if (Object.keys(next).length) return;

    setState("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setState("done");
    } catch (err) {
      setMessage(err.message);
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <section id="enquiry" className="scroll-mt-24 bg-espresso px-6 py-32 md:px-12 md:py-44">
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-bronze/50">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="h-6 w-6 stroke-bronze" fill="none" strokeWidth="1.4">
              <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h2 className="font-display mt-8 text-[clamp(2rem,4.4vw,3.2rem)] leading-tight text-cream">
            Thank you — we&rsquo;ve got it.
          </h2>
          <p className="mt-5 text-[15.5px] leading-[1.85] text-cream/65">
            Your enquiry is with the studio. We usually respond within one working day.
            If it&rsquo;s urgent, do call &mdash; we&rsquo;re happy to talk it through.
          </p>
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="tracked-sm mt-10 inline-block border border-cream/35 px-9 py-4.5 text-[10px] text-cream transition-colors duration-500 hover:bg-cream hover:text-espresso"
          >
            Call {site.phone}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="enquiry" className="scroll-mt-24 bg-espresso px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <p className="tracked text-[9px] text-bronze-ink md:text-[10px]">Project Enquiry</p>
          <h2 className="font-display mt-6 text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.12] tracking-[-0.015em] text-cream">
            Tell us about
            <br />
            <span className="italic text-bronze">your space.</span>
          </h2>
          <p className="mt-7 max-w-sm text-[15px] leading-[1.85] text-cream/60">
            Share a few details and we&rsquo;ll come back with how we&rsquo;d approach it,
            what it typically takes, and the next step.
          </p>

          <div className="mt-12 space-y-4 border-t border-cream/12 pt-8">
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="tracked-sm flex min-h-11 w-fit items-center text-[10px] text-cream/70 transition-colors duration-400 hover:text-bronze-ink">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="tracked-sm flex min-h-11 w-fit items-center text-[10px] text-cream/70 transition-colors duration-400 hover:text-bronze-ink">
              {site.email}
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="lg:col-span-7">
          {/* honeypot — bots fill this, humans never see it */}
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="name">Name *</label>
              <input id="name" name="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={field} placeholder="Your full name" autoComplete="name" />
              {errors.name && (
                <p id="name-error" role="alert" className="mt-2 text-[12px] text-[#E8A87C]">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className={label} htmlFor="phone">Phone Number *</label>
              <input id="phone" name="phone" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} type="tel" className={field} placeholder="+91" autoComplete="tel" />
              {errors.phone && (
                <p id="phone-error" role="alert" className="mt-2 text-[12px] text-[#E8A87C]">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className={label} htmlFor="email">Email Address</label>
              <input id="email" name="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} type="email" className={field} placeholder="Optional" autoComplete="email" />
              {errors.email && (
                <p id="email-error" role="alert" className="mt-2 text-[12px] text-[#E8A87C]">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className={label} htmlFor="location">Project Location *</label>
              <input id="location" name="location" aria-invalid={!!errors.location} aria-describedby={errors.location ? "location-error" : undefined} className={field} placeholder="Gurgaon, Delhi, Noida…" />
              {errors.location && (
                <p id="location-error" role="alert" className="mt-2 text-[12px] text-[#E8A87C]">
                  {errors.location}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className={label} htmlFor="budget">Approximate Project Budget</label>
              <select id="budget" name="budget" defaultValue="" className={`${field} appearance-none`}>
                <option value="" className="bg-espresso">Select a range</option>
                {budgets.map((b) => (
                  <option key={b} value={b} className="bg-espresso">{b}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className={label} htmlFor="details">Tell Us About Your Project</label>
              <textarea
                id="details"
                name="details"
                rows={4}
                className={`${field} resize-none`}
                placeholder="Type of home, approximate size, timelines, anything else…"
              />
            </div>
          </div>

          {state === "error" && (
            <p role="alert" className="mt-7 text-[13.5px] text-[#E8A87C]">{message}</p>
          )}

          <button
            type="submit"
            disabled={state === "sending"}
            className="tracked-sm group relative mt-11 w-full overflow-hidden border border-cream/40 px-10 py-5 text-[10px] text-cream transition-colors duration-500 hover:border-cream disabled:opacity-55 sm:w-auto"
          >
            <span className="absolute inset-0 -translate-y-full bg-cream transition-transform duration-500 ease-out group-hover:translate-y-0 group-disabled:translate-y-full" />
            <span className="relative transition-colors duration-500 group-hover:text-espresso">
              {state === "sending" ? "Sending…" : "Send Enquiry"}
            </span>
          </button>

          <p className="mt-5 text-[12.5px] leading-relaxed text-cream/55">
            Prefer to talk? <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center text-cream/60 underline underline-offset-4 transition-colors duration-400 hover:text-cream">Call {site.phone}</a>.
          </p>
        </form>
      </div>
    </section>
  );
}
