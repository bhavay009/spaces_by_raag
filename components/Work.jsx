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
    <section id="work" className="scroll-mt-24 bg-cream px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="max-w-2xl">
          <p className="tracked text-[9px] text-bronze-deep md:text-[10px]">Selected Work</p>
          <h2 className="font-display mt-6 text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.12] tracking-[-0.015em] text-espresso">
            A few of the spaces
            <br />
            <span className="italic text-cognac">we&rsquo;ve shaped.</span>
          </h2>
        </Reveal>

        <div className="mt-20 flex flex-col gap-28 md:mt-24 md:gap-36">
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
                  {/* supporting strip */}
                  {rest.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      {rest.slice(0, 3).map((img, k) => (
                        <div key={img} className="group/thumb relative aspect-[4/3] overflow-hidden bg-sand">
                          <Image
                            src={`/images/${img}.jpg`}
                            alt={`${p.name} — interior detail ${k + 2}, ${p.location}`}
                            fill
                            loading="lazy"
                            sizes="(max-width: 640px) 31vw, (max-width: 1024px) 30vw, 19vw"
                            className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(.22,.68,0,1)] group-hover/thumb:scale-[1.07]"
                          />
                        </div>
                      ))}
                    </div>
                  )}
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
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
