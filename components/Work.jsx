import Image from "next/image";
import Reveal from "./Reveal";
import ParallaxImage from "./ParallaxImage";
import { projects } from "@/lib/site";

function Meta({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <dt className="tracked-sm text-[8.5px] text-espresso/70">{label}</dt>
      <dd className="mt-1.5 text-[14px] text-espresso/85">{value}</dd>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="grain-soft scroll-mt-24 border-t border-espresso/10 bg-cream px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="max-w-2xl">
          <p className="tracked text-[9px] text-bronze-deep md:text-[10px]">Selected Work</p>
          <h2 className="font-display mt-6 text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[1.06] tracking-[-0.022em] text-espresso">
            A few of the spaces
            <br />
            <span className="italic text-cognac">we&rsquo;ve shaped.</span>
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-20 md:mt-16 md:gap-24">
          {projects.map((p, i) => {
            const flip = i % 2 === 1;
            const [lead, ...rest] = p.images;
            return (
              <article key={p.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                {/* lead image */}
                <Reveal
                  className={`lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}
                >
                  <ParallaxImage
                    src={`/images/${lead}.jpg`}
                    alt={p.alt}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                </Reveal>

                {/* text */}
                <Reveal
                  delay={120}
                  className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1 lg:row-start-1" : ""}`}
                >
                  <p className="tracked-sm text-[9px] text-bronze-deep">
                    {String(i + 1).padStart(2, "0")} — {p.type}
                  </p>
                  <h3 className="font-display mt-4 text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.1] text-espresso">
                    {p.name}
                  </h3>
                  <p className="tracked-sm mt-3 text-[9.5px] text-espresso/70">{p.location}</p>

                  <p className="mt-6 max-w-md text-[15px] leading-[1.85] text-espresso/70">
                    {p.blurb}
                  </p>

                  <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-espresso/12 pt-7 sm:grid-cols-3 lg:grid-cols-2">
                    <Meta label="Scope" value={p.scope} />
                    <Meta label="Area" value={p.area} />
                    <Meta label="Project Value" value={p.value} />
                  </dl>

                  {/* Supporting frames sit under the copy rather than beneath the
                      lead image. The text column ran ~350px shorter than the image
                      column, so this fills existing dead space instead of adding
                      height — the row is now set by the lead image alone. */}
                  {rest.length > 0 && (
                    <div className="mt-8 grid grid-cols-3 gap-3">
                      {rest.slice(0, 3).map((img, k) => (
                        <div key={img} className="group/thumb relative aspect-[4/3] overflow-hidden bg-sand">
                          <Image
                            src={`/images/${img}.jpg`}
                            alt={`${p.name} — interior detail ${k + 2}, ${p.location}`}
                            fill
                            loading="lazy"
                            sizes="(max-width: 640px) 31vw, (max-width: 1024px) 30vw, 13vw"
                            className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(.22,.68,0,1)] group-hover/thumb:scale-[1.07]"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
