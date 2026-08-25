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

        {/* Client asked for a tighter presentation, so the phone row (<sm) is
            untouched: stacked number-then-title, no description, two columns.
            sm+ has room to spare, so each cell there becomes a small editorial
            block — an italic display numeral, a larger title and a bronze
            rule, with the service's one-line note reserved at a fixed height
            and faded in on hover/focus rather than pushed in (so neighbouring
            cells never reflow). */}
        <ul className="svc-grid mt-6 grid grid-cols-2 gap-px border-t border-bronze/25 bg-bronze/18 md:mt-10 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal
              key={s.n}
              as="li"
              delay={i * 60}
              className="group relative flex flex-col items-start gap-1.5 bg-shell px-4 py-4 transition-colors duration-[420ms] ease-out hover:bg-cream focus-within:bg-cream sm:block sm:px-0 sm:py-8 lg:py-10"
            >
              <span className="tracked-sm shrink-0 text-[9.5px] text-bronze-deep sm:hidden">{s.n}</span>

              <span
                aria-hidden="true"
                className="font-display hidden text-[1.3rem] italic leading-none text-bronze-deep/75 transition-colors duration-[420ms] ease-out group-hover:text-cognac sm:block md:text-[1.5rem]"
              >
                {s.n}
              </span>

              <h3 className="font-display text-[1.1rem] leading-[1.2] text-espresso transition-[color,transform] duration-[420ms] ease-[cubic-bezier(.22,.68,0,1)] group-hover:translate-x-1 group-hover:text-cognac sm:mt-3 sm:text-[1.5rem] md:text-[1.7rem]">
                {s.title}
              </h3>

              <span className="mt-3 hidden h-px w-8 bg-bronze/40 transition-all duration-[480ms] ease-[cubic-bezier(.22,.68,0,1)] group-hover:w-12 group-hover:bg-bronze-deep sm:block" />

              {s.note && (
                <p className="font-display mt-3 hidden max-w-[230px] text-[13px] italic leading-[1.4] text-espresso/55 opacity-0 transition-opacity duration-[420ms] ease-out group-hover:opacity-100 group-focus-within:opacity-100 sm:block sm:min-h-[2.6rem] md:min-h-[2.2rem]">
                  {s.note}
                </p>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
