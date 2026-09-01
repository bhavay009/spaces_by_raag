import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/site";

export default function Work() {
  return (
    <section id="work" className="grain-soft scroll-mt-24 border-t border-espresso/10 bg-cream px-6 py-12 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="max-w-2xl">
          <p className="tracked text-[9px] text-bronze-deep md:text-[10px]">Selected Work</p>
          <h2 className="font-display mt-4 text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[1.06] tracking-[-0.022em] text-espresso md:mt-6">
            A few of the spaces
            <br />
            <span className="italic text-cognac">we&rsquo;ve shaped.</span>
          </h2>
          {/* Short rule under the heading, as in the approved phone comp. */}
          <span className="mt-5 block h-px w-12 bg-bronze/60 md:hidden" />
        </Reveal>

        {/* Phone: compact rows divided by hairlines, so the list reads as one
            sequence rather than eight floating blocks. md+ keeps the original
            spacing and carries no dividers. */}
        <ul className="mt-7 divide-y divide-espresso/10 md:mt-16 md:flex md:flex-col md:gap-24 md:divide-y-0">
          {projects.map((p, i) => (
            <li key={p.slug} className="py-6 first:pt-0 last:pb-0 md:py-0">
              <ProjectCard p={p} i={i} />
            </li>
          ))}
        </ul>

        <div className="mt-10 border-t border-espresso/10 pt-6 text-center md:mt-16 md:pt-8">
          <a
            href="https://www.instagram.com/reel/DAu61V8M5my/"
            target="_blank"
            rel="noopener noreferrer"
            className="tracked-sm group inline-flex min-h-11 items-center gap-2 text-[10px] text-espresso/70 transition-colors duration-400 hover:text-cognac"
          >
            Hear what a client had to say, on Instagram
            <span className="transition-transform duration-500 ease-out group-hover:translate-x-1.5">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
