"use client";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  // the drawer is cream, so the bar must solidify with it — otherwise a
  // transparent header floats above an opaque panel.
  const opaque = solid || open;

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,padding] duration-700 ease-out ${
        opaque ? "bg-cream/92 backdrop-blur-md py-4 shadow-[0_1px_0_rgba(58,37,23,.10)]"
          : "bg-transparent py-7"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12">
        <a href="#top" className="group flex min-h-11 flex-col justify-center leading-none">
          <span
            className={`tracked text-[9px] transition-colors duration-500 ${
              opaque ? "text-cognac/70" : "text-cream/70"
            }`}
          >
            Spaces by
          </span>
          <span
            className={`font-display text-[26px] font-semibold leading-none transition-colors duration-500 md:text-[30px] ${
              opaque ? "text-espresso" : "text-cream"
            }`}
          >
            Raag
          </span>
        </a>

        <nav className="hidden items-center gap-10 lg:flex">
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

        <div className="flex items-center gap-4">
          <a
            href="#enquiry"
            className={`tracked-sm hidden border px-7 py-3.5 text-[10px] transition-all duration-500 md:inline-block ${
              opaque ? "border-espresso/25 text-espresso hover:bg-espresso hover:text-cream"
                : "border-cream/40 text-cream hover:bg-cream hover:text-espresso"
            }`}
          >
            Discuss Your Project
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span className={`h-px w-6 transition-all duration-400 ${opaque ? "bg-espresso" : "bg-cream"} ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`h-px w-6 transition-all duration-400 ${opaque ? "bg-espresso" : "bg-cream"} ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 transition-all duration-400 ${opaque ? "bg-espresso" : "bg-cream"} ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={`overflow-hidden bg-cream transition-[max-height,opacity] duration-700 ease-out lg:hidden ${
          open ? "max-h-[580px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-6">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="font-display border-b border-espresso/10 py-4 text-2xl text-espresso"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#enquiry"
            onClick={() => setOpen(false)}
            className="tracked-sm mt-5 bg-espresso px-6 py-4 text-center text-[10px] text-cream"
          >
            Discuss Your Project
          </a>
        </nav>
      </div>
    </header>
  );
}
