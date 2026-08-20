import Reveal from "./Reveal";
import { services } from "@/lib/site";

export default function Services() {
  return (
    <section id="services" className="grain-soft scroll-mt-24 border-t border-espresso/10 bg-shell px-6 py-20 md:px-12 md:py-32">
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

        <ul className="svc-grid mt-14 grid gap-px border-t border-espresso/12 bg-espresso/12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal
              key={s.n}
              as="li"
              delay={i * 70}
              className="group relative flex flex-col bg-shell py-11 transition-colors duration-[420ms] ease-out hover:bg-cream sm:py-12"
            >
              <span className="tracked-sm text-[9.5px] text-bronze-deep">{s.n}</span>
              <h3 className="font-display mt-5 text-[1.75rem] leading-[1.14] text-espresso sm:min-h-[2.28em] transition-[color,transform] duration-[420ms] ease-[cubic-bezier(.22,.68,0,1)] group-hover:translate-x-1 group-hover:text-cognac md:text-[2.05rem]">
                {s.title}
              </h3>
              <p className="mt-3.5 max-w-[24ch] text-[14.5px] leading-[1.8] text-espresso/72">
                {s.note}
              </p>
              {/* mt-auto pins the rule to the cell floor, so all six align across
                  a row no matter how many lines the title takes. */}
              <div className="mt-auto pt-9">
                <span className="block h-px w-9 bg-bronze/45 transition-all duration-[480ms] ease-[cubic-bezier(.22,.68,0,1)] group-hover:w-16 group-hover:bg-bronze-deep" />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
