"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  // the drawer is cream, so the bar must solidify with it — otherwise a
  // transparent header floats above an opaque panel.
  const opaque = solid || open;
  const toggleRef = useRef(null);

  // Escape closes the drawer and returns focus to the control that opened it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Every in-page link (nav, hero CTAs, footer, etc.) is a plain `<a href="#…">`,
  // so the browser's own `scroll-behavior: smooth` (in globals.css) was doing the
  // animating — but its duration scales with distance and reads as sluggish on a
  // page this long. Intercepting the click here, once, replaces it with a fixed
  // 500ms eased scroll for every anchor link on the site without touching each
  // one individually. scroll-mt-* on the section elements is still respected by
  // reading their computed scroll-margin-top.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const DURATION = 500;
    const easeOutCubic = (t) => 1 - (1 - t) ** 3;

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();

      const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const startY = window.scrollY;
      const targetY = Math.max(
        0,
        target.getBoundingClientRect().top + startY - margin
      );

      if (reduceMotion.matches) {
        window.scrollTo({ top: targetY, behavior: "instant" });
        return;
      }

      // behavior: "instant" on every frame — without it, scrollTo() defers to
      // the page's own CSS `scroll-behavior: smooth`, which kicks off its own
      // (slow) animation toward each intermediate position and fights this
      // rAF loop instead of landing where it's told.
      const distance = targetY - startY;
      const startTime = performance.now();
      const step = (now) => {
        const t = Math.min((now - startTime) / DURATION, 1);
        window.scrollTo({ top: startY + distance * easeOutCubic(t), behavior: "instant" });
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <header
      style={{ top: "calc(env(safe-area-inset-top) + 0.5rem)" }}
      className={`fixed inset-x-0 z-50 transition-[background-color,backdrop-filter,padding] duration-700 ease-out ${
        opaque ? "bg-cream/92 backdrop-blur-md py-4 shadow-[0_1px_0_rgba(58,37,23,.10)]"
          : "bg-transparent py-7"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <a
          href="#top"
          aria-label="Spaces by Raag — back to top"
          className="group relative flex min-h-11 items-center"
        >
          {/* The client's lockup, keyed off its flat background and recoloured.
              Two files rather than one because a raster cannot be tinted in CSS:
              white over the hero, espresso once the bar turns cream. */}
          <Image
            src="/images/logo-light.png"
            alt="Spaces by Raag"
            width={318}
            height={271}
            priority
            className={`h-11 w-auto transition-opacity duration-500 md:h-12 ${
              opaque ? "opacity-0" : "opacity-100"
            }`}
          />
          <Image
            src="/images/logo-dark.png"
            alt=""
            aria-hidden="true"
            width={318}
            height={271}
            priority
            className={`absolute left-0 h-11 w-auto transition-opacity duration-500 md:h-12 ${
              opaque ? "opacity-100" : "opacity-0"
            }`}
          />
        </a>

        <nav className="hidden items-center justify-center gap-10 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`tracked-sm group relative py-1.5 text-[10.5px] transition-colors duration-500 ${
                opaque ? "text-espresso/70 hover:text-espresso" : "text-cream/90 hover:text-cream"
              }`}
            >
              {n.label}
              <span
                className={`absolute bottom-0 left-0 h-px w-0 transition-all duration-[600ms] ease-[cubic-bezier(.22,.68,0,1)] group-hover:w-full ${
                  opaque ? "bg-bronze-deep" : "bg-bronze-ink"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5 lg:justify-self-end">
          {/* Client asked for contact to be reachable early in the journey, not
              only at the foot of the page. */}
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            aria-label={`Call ${site.phone}`}
            className={`tracked-sm group hidden items-center gap-2 text-[10px] transition-colors duration-500 xl:inline-flex ${
              opaque ? "text-espresso/70 hover:text-espresso" : "text-cream/80 hover:text-cream"
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
            >
              <path d="M14.05 6a4.5 4.5 0 0 1 3.95 3.95M21.7 16.42v2.4a1.9 1.9 0 0 1-2.07 1.9 18.8 18.8 0 0 1-8.2-2.92 18.5 18.5 0 0 1-5.7-5.7A18.8 18.8 0 0 1 2.8 3.87 1.9 1.9 0 0 1 4.69 1.8h2.4a1.9 1.9 0 0 1 1.9 1.64c.11.86.32 1.7.62 2.5a1.9 1.9 0 0 1-.43 2.01l-1.02 1.02a15.2 15.2 0 0 0 5.7 5.7l1.02-1.02a1.9 1.9 0 0 1 2-.43c.81.3 1.65.51 2.51.62a1.9 1.9 0 0 1 1.64 1.93Z" />
            </svg>
            <span>{site.phone}</span>
          </a>
          <a
            href="#enquiry"
            className={`tracked-sm hidden min-h-11 items-center border px-7 py-3.5 text-[10px] transition-all duration-500 active:scale-[0.97] md:inline-flex ${
              opaque ? "border-espresso/25 text-espresso hover:bg-espresso hover:text-cream"
                : "border-cream/40 text-cream hover:bg-cream hover:text-espresso"
            }`}
          >
            Discuss Your Project
          </a>

          <button
            ref={toggleRef}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] active:scale-90 lg:hidden"
          >
            <span className={`h-px w-6 transition-all duration-400 ${opaque ? "bg-espresso" : "bg-cream"} ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`h-px w-6 transition-all duration-400 ${opaque ? "bg-espresso" : "bg-cream"} ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 transition-all duration-400 ${opaque ? "bg-espresso" : "bg-cream"} ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* mobile drawer
          max-h was a fixed 580px, but content ran to 649px — the extra 69px
          (the Instagram link) was silently clipped by overflow-hidden on
          every phone, not just small ones. Content is now ~545px after the
          tighter spacing below; 650px keeps a real buffer without relying on
          dvh (unsupported in some engines, where the declaration is dropped
          entirely rather than falling back — worse than the original bug). */}
      <div
        id="mobile-nav"
        inert={!open || undefined}
        aria-hidden={!open}
        className={`overflow-hidden bg-cream transition-[max-height,opacity] duration-700 ease-out lg:hidden ${
          open ? "max-h-[650px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-0.5 px-6 py-5">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="font-display border-b border-espresso/10 py-3 text-xl text-espresso"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#enquiry"
            onClick={() => setOpen(false)}
            className="tracked-sm mt-4 flex min-h-11 items-center justify-center border border-espresso/25 px-6 py-3.5 text-center text-[10px] text-espresso transition-colors duration-500 hover:bg-espresso hover:text-cream active:scale-[0.97]"
          >
            Discuss Your Project
          </a>

          <div className="mt-4 flex flex-col gap-0.5 border-t border-espresso/10 pt-4">
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="tracked-sm flex min-h-11 items-center gap-2.5 text-[10px] text-espresso/70"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="shrink-0 opacity-70"
              >
                <path d="M14.05 6a4.5 4.5 0 0 1 3.95 3.95M21.7 16.42v2.4a1.9 1.9 0 0 1-2.07 1.9 18.8 18.8 0 0 1-8.2-2.92 18.5 18.5 0 0 1-5.7-5.7A18.8 18.8 0 0 1 2.8 3.87 1.9 1.9 0 0 1 4.69 1.8h2.4a1.9 1.9 0 0 1 1.9 1.64c.11.86.32 1.7.62 2.5a1.9 1.9 0 0 1-.43 2.01l-1.02 1.02a15.2 15.2 0 0 0 5.7 5.7l1.02-1.02a1.9 1.9 0 0 1 2-.43c.81.3 1.65.51 2.51.62a1.9 1.9 0 0 1 1.64 1.93Z" />
              </svg>
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="tracked-sm flex min-h-11 items-center text-[10px] text-espresso/70"
            >
              {site.email}
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="tracked-sm flex min-h-11 items-center text-[10px] text-espresso/70"
            >
              {site.instagramHandle}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
