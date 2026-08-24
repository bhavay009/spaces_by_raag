import Image from "next/image";

// The footer prints the current year. Without this the page is rendered once at
// build time and would still claim 2026 well into 2027.
export const revalidate = 86400;

import Header from "@/components/Header";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Enquiry from "@/components/Enquiry";
import Founder from "@/components/Founder";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site, strip, credentials } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Header />
      <WhatsAppButton />

      <main id="top">
        {/* ————————————————————— HERO ————————————————————— */}
        <section className="grain relative flex h-[100svh] min-h-[620px] w-full flex-col overflow-hidden bg-ink">
          <Image
            src="/images/hero-facade.jpg"
            alt="Contemporary luxury villa facade designed by Spaces by Raag, illuminated at dusk in Gurgaon"
            fill
            priority
            sizes="100vw"
            className="kenburns object-cover"
          />
          {/* warm cinematic grade */}
          {/* One even scrim across the whole frame. No directional zoning and no
              nav band — those read as patches. A wide, shallow vignette keeps the
              surroundings a touch darker than the architecture without becoming a
              visible layer of its own. */}
          <div className="absolute inset-0 bg-ink/70" />
          <div className="absolute inset-0 bg-[radial-gradient(125%_115%_at_50%_45%,transparent_35%,rgba(26,17,9,.30)_100%)]" />
          <div className="absolute inset-0 bg-cognac/10 mix-blend-overlay" />

          {/* eyebrow */}
          <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-6 md:px-12">
            <div className="rise pt-32 md:pt-36" style={{ animationDelay: ".35s" }}>
              <p className="tracked-hero text-[9px] text-cream/90 md:text-[10px] [text-shadow:0_1px_14px_rgba(26,17,9,.92)]">
                {site.location} — Residential &amp; Office Interiors
              </p>
            </div>

            {/* headline block, bottom-weighted */}
            <div className="mt-auto pb-14 md:pb-20">
              {/* The tagline is the hero statement now, not a caption under the
                  wordmark — the brand name already sits in the header. */}
              <h1 className="max-w-[19ch]">
                <span className="sr-only">
                  Spaces by Raag — luxury interior design and turnkey execution in Gurgaon and Delhi NCR
                </span>
                <span
                  aria-hidden
                  className="rise font-display block text-[clamp(2.4rem,6vw,5rem)] font-normal leading-[1.04] tracking-[-0.022em] text-cream [text-shadow:0_8px_60px_rgba(26,17,9,.75)]"
                  style={{ animationDelay: ".55s" }}
                >
                  Spaces, thoughtfully designed.
                  <br />
                  <span className="italic">Beautifully executed.</span>
                </span>
              </h1>

              <div className="mt-10 flex flex-col gap-9 md:mt-12 md:flex-row md:items-end md:justify-between md:gap-16">
                <div
                  className="rise flex items-center gap-5"
                  style={{ animationDelay: ".95s" }}
                >
                  <span className="hidden h-px w-10 shrink-0 bg-gradient-to-r from-bronze to-bronze/0 md:block" />
                  <p className="tracked-hero text-[9px] text-cream/70 md:text-[10px] [text-shadow:0_2px_18px_rgba(26,17,9,.95)]">
                    Spaces by Raag
                  </p>
                </div>

                <div
                  className="rise flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center"
                  style={{ animationDelay: "1.15s" }}
                >
                  <a
                    href="#enquiry"
                    className="tracked-sm group relative overflow-hidden border border-cream/45 px-9 py-5 text-center text-[10px] text-cream transition-colors duration-500 hover:border-cream"
                  >
                    <span className="absolute inset-0 -translate-y-full bg-cream transition-transform duration-500 ease-out group-hover:translate-y-0" />
                    <span className="relative transition-colors duration-500 group-hover:text-espresso">
                      Discuss Your Project
                    </span>
                  </a>
                  <a
                    href="#work"
                    className="tracked-sm px-2 py-5 text-center text-[10px] text-cream/80 transition-colors duration-500 hover:text-cream"
                  >
                    View Selected Work
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* scroll cue */}
          <div className="pointer-events-none absolute bottom-0 right-6 z-10 hidden md:block lg:right-12">
            <span className="line-grow relative block h-16 w-px overflow-hidden bg-gradient-to-b from-transparent via-cream/25 to-cream/35">
              <span className="cue-drift absolute inset-x-0 top-0 block h-6 bg-gradient-to-b from-transparent via-cream to-transparent" />
            </span>
          </div>
        </section>

        {/* ————————————————— BRAND STRIP ————————————————— */}
        <section
          aria-label="What we do"
          className="strip relative overflow-hidden border-y border-cream/10 bg-espresso py-6"
        >
          <div className="strip-mask">
            <div className="flex w-max marquee">
              {[0, 1].map((dup) => (
                <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
                  {strip.map((item) => (
                    <li key={item} className="flex items-center">
                      <span className="tracked-hero px-10 text-[10px] whitespace-nowrap text-cream/80 transition-colors duration-500 md:px-16 md:text-[11px]">
                        {item}
                      </span>
                      <span className="h-[3px] w-[3px] rotate-45 bg-bronze/80" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>

        {/* ————————————— ABOUT + CREDENTIALS ————————————— */}
        <section id="about" className="grain-soft relative bg-cream px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="tracked text-[9px] text-bronze-deep md:text-[10px]">The Studio</p>
              <div className="group relative mt-10 aspect-[4/5] w-full overflow-hidden bg-sand shadow-[0_18px_50px_-30px_rgba(26,17,9,.55)]">
                <Image
                  src="/images/vilasa-1.jpg"
                  alt="Double-height living space with woven pendant lighting and layered natural textures in a villa in Gurgaon"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-[1.8s] ease-[cubic-bezier(.22,.68,0,1)] group-hover:scale-[1.045]"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center lg:col-span-7">
              <h2 className="font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-normal leading-[1.12] tracking-[-0.015em] text-espresso">
                Some spaces are designed.
                <br />
                <span className="italic text-cognac">Others are deeply felt.</span>
              </h2>

              <div className="mt-9 max-w-xl space-y-5 text-[15px] leading-[1.85] text-espresso/72 md:text-[16.5px]">
                <p>
                  Spaces by Raag is a boutique interior design studio working across Gurgaon,
                  Delhi, Noida and Faridabad — crafting timeless residential and boutique
                  commercial spaces defined by considered detail and thoughtful functionality.
                </p>
                <p>
                  Every project is approached with meticulous attention to detail — and carried
                  end to end, from first concept through execution and final handover.
                </p>
              </div>

              <a
                href="#enquiry"
                className="tracked-sm group mt-11 inline-flex min-h-11 w-fit items-center gap-4 border-b border-espresso/25 pb-2.5 text-[10px] text-espresso transition-colors duration-500 hover:border-bronze hover:text-cognac"
              >
                Discuss Your Project
                <span className="transition-transform duration-500 ease-out group-hover:translate-x-1.5">→</span>
              </a>

              {/* credentials */}
              <dl className="mt-16 grid grid-cols-1 gap-px border-t border-espresso/12 bg-espresso/12 sm:grid-cols-3">
                {credentials.map((c) => (
                  <div key={c.value} className="bg-cream px-1 pt-8 sm:px-6 sm:text-left">
                    <dt className="font-display text-[clamp(2.4rem,5vw,3.4rem)] leading-none text-cognac">
                      {c.value}
                    </dt>
                    <dd className="tracked-sm mt-3.5 text-[9.5px] leading-[1.9] text-espresso/70 sm:min-h-[3.8em]">
                      {c.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <Services />
        <Work />
        <Enquiry />
        <Founder />
      </main>
      <Footer />
    </>
  );
}
