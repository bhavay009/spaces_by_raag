import Image from "next/image";
import Reveal from "./Reveal";

export default function Founder() {
  return (
    <section id="founder" className="grain-soft scroll-mt-24 bg-cream px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:order-2 lg:col-span-5">
          <div className="group relative aspect-[4/5] w-full overflow-hidden bg-espresso shadow-[0_18px_50px_-30px_rgba(26,17,9,.55)]">
            <Image
              src="/images/founder-ridham.jpg"
              alt="Ridham Girotra, Founder and Designer of Spaces by Raag"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top transition-transform duration-[1.8s] ease-[cubic-bezier(.22,.68,0,1)] group-hover:scale-[1.045]"
            />
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:order-1 lg:col-span-7">
          <p className="tracked text-[9px] text-bronze-deep md:text-[10px]">The Founder</p>
          <h2 className="font-display mt-6 text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.12] tracking-[-0.015em] text-espresso">
            Ridham Girotra
          </h2>
          <p className="tracked-sm mt-3.5 text-[9.5px] text-espresso/70">
            Founder &amp; Designer, Spaces by Raag
          </p>

          <div className="mt-8 max-w-xl space-y-5 text-[15px] leading-[1.85] text-espresso/72 md:text-[16px]">
            <p>
              Ridham believes great design begins with understanding people. With a passion for
              creating timeless, functional and elegant interiors, he approaches every project
              with a focus on thoughtful planning, refined aesthetics and personalised details.
            </p>
            <p>
              Inspired by architecture, natural materials and meaningful living, his vision is to
              craft spaces that not only look beautiful but feel authentic, comfortable and
              uniquely personal.
            </p>
          </div>

          <blockquote className="mt-10 border-l border-bronze/50 pl-7">
            <p className="font-display text-[1.4rem] italic leading-[1.5] text-cognac md:text-[1.65rem]">
              &ldquo;Every corner should have a purpose and every detail should have a reason.&rdquo;
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
