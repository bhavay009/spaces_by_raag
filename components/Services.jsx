import Reveal from "./Reveal";
import { services } from "@/lib/site";

export default function Services() {
  return (
    <section id="services" className="grain-soft scroll-mt-24 border-t border-espresso/10 bg-shell px-6 py-12 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        {/* Intro — three beats on one baseline: statement, plate, supporting line. */}
        <Reveal className="grid gap-y-5 lg:grid-cols-12 lg:items-end lg:gap-x-10 lg:gap-y-9">
          <div className="lg:col-span-7">
            <p className="tracked text-[9px] text-bronze-deep md:text-[10px]">What We Do</p>
            <h2 className="font-display mt-4 text-[clamp(2.05rem,4.6vw,3.6rem)] leading-[1.06] tracking-[-0.021em] text-espresso md:mt-7">
              Design and delivery,
              <br />
              <span className="italic text-cognac">under one roof.</span>
            </h2>
          </div>

          <p className="max-w-sm text-[14px] leading-[1.6] text-espresso/70 lg:col-span-4 lg:col-start-9 lg:max-w-none lg:pb-1.5 lg:text-[15px] lg:leading-[1.85]">
            A single team from first concept through final handover — so detail
            survives the journey from drawing to site.
          </p>
        </Reveal>

        {/* Client asked for a tighter presentation. The service descriptions go:
            the brief states no long service descriptions are required, and they
            were the bulk of the height. Number, title and rule per cell keeps
            all six services while roughly halving the section. Mobile runs two
            columns instead of one — halves the row count again below sm. */}
        <ul className="svc-grid mt-6 grid grid-cols-2 gap-px border-t border-espresso/12 bg-espresso/12 md:mt-10 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal
              key={s.n}
              as="li"
              delay={i * 60}
              className="group relative flex flex-col items-start gap-1.5 bg-shell px-4 py-4 transition-colors duration-[420ms] ease-out hover:bg-cream sm:flex-row sm:items-baseline sm:gap-4 sm:px-0 sm:py-6 lg:py-7"
            >
              <span className="tracked-sm shrink-0 text-[9.5px] text-bronze-deep">{s.n}</span>
              <h3 className="font-display text-[1.1rem] leading-[1.2] text-espresso transition-[color,transform] duration-[420ms] ease-[cubic-bezier(.22,.68,0,1)] group-hover:translate-x-1 group-hover:text-cognac sm:text-[1.35rem] md:text-[1.5rem]">
                {s.title}
              </h3>
              <span className="ml-auto hidden h-px w-6 shrink-0 self-center bg-bronze/40 transition-all duration-[480ms] ease-[cubic-bezier(.22,.68,0,1)] group-hover:w-10 group-hover:bg-bronze-deep sm:block" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
