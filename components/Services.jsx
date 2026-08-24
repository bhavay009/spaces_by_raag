import Reveal from "./Reveal";
import { services } from "@/lib/site";

export default function Services() {
  return (
    <section id="services" className="grain-soft scroll-mt-24 border-t border-espresso/10 bg-shell px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        {/* Intro — three beats on one baseline: statement, plate, supporting line. */}
        <Reveal className="grid gap-y-9 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-7">
            <p className="tracked text-[9px] text-bronze-deep md:text-[10px]">What We Do</p>
            <h2 className="font-display mt-7 text-[clamp(2.05rem,4.6vw,3.6rem)] leading-[1.06] tracking-[-0.021em] text-espresso">
              Design and delivery,
              <br />
              <span className="italic text-cognac">under one roof.</span>
            </h2>
          </div>

          <p className="max-w-sm text-[15px] leading-[1.85] text-espresso/70 lg:col-span-4 lg:col-start-9 lg:max-w-none lg:pb-1.5">
            A single team from first concept through final handover — so detail
            survives the journey from drawing to site.
          </p>
        </Reveal>

        {/* Client asked for a tighter presentation. The service descriptions go:
            the brief states no long service descriptions are required, and they
            were the bulk of the height. Number, title and rule per cell keeps
            all six services while roughly halving the section. */}
        <ul className="svc-grid mt-10 grid gap-px border-t border-espresso/12 bg-espresso/12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal
              key={s.n}
              as="li"
              delay={i * 60}
              className="group relative flex items-baseline gap-4 bg-shell py-6 transition-colors duration-[420ms] ease-out hover:bg-cream sm:py-7"
            >
              <span className="tracked-sm shrink-0 text-[9.5px] text-bronze-deep">{s.n}</span>
              <h3 className="font-display text-[1.35rem] leading-[1.2] text-espresso transition-[color,transform] duration-[420ms] ease-[cubic-bezier(.22,.68,0,1)] group-hover:translate-x-1 group-hover:text-cognac md:text-[1.5rem]">
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
