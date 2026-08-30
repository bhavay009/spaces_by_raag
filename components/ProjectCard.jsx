"use client";
import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import ParallaxImage from "./ParallaxImage";
import Lightbox from "./Lightbox";

function Meta({ label, value, className = "" }) {
  if (!value) return null;
  return (
    <div className={className}>
      <dt className="tracked-sm text-[8px] text-espresso/70 md:text-[8.5px]">{label}</dt>
      <dd className="mt-1 text-[12.5px] leading-[1.45] text-espresso/85 md:mt-1.5 md:text-[14px]">
        {value}
      </dd>
    </div>
  );
}

/**
 * One project.
 *
 * Phone only (below md) this is a compact row — small portrait frame, then a
 * summary line (index, type, name, location, area) with a disclosure control.
 * Blurb, scope and value collapse behind that control rather than being
 * dropped, so the row stays short without losing anything.
 *
 * From md up the disclosure is inert: the secondary block is forced open with
 * `md:!block` and the toggle is hidden, so the existing tablet/desktop
 * composition (12-col grid, alternating order) is unchanged.
 */
export default function ProjectCard({ p, i }) {
  const [open, setOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const flip = i % 2 === 1;
  const [lead, ...rest] = p.images;
  const panelId = `project-${p.slug}-detail`;

  return (
    <article className="flex items-start gap-4 md:grid md:items-center md:gap-10 lg:grid-cols-12 lg:gap-16">
      {/* lead image */}
      <Reveal
        className={`w-[92px] shrink-0 md:w-full lg:col-span-7 ${
          flip ? "md:order-2 lg:order-2 lg:col-start-6" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          aria-label={`View larger images of ${p.name}`}
          className="block w-full text-left"
        >
          <ParallaxImage
            src={`/images/${lead}.jpg`}
            alt={p.alt}
            sizes="(max-width: 767px) 92px, (max-width: 1024px) 100vw, 58vw"
          />
        </button>
      </Reveal>

      {/* copy */}
      <Reveal
        delay={120}
        className={`min-w-0 flex-1 md:w-full md:flex-none lg:col-span-5 ${
          flip ? "md:order-1 lg:order-1 lg:col-start-1 lg:row-start-1" : ""
        }`}
      >
        {/* summary — always visible */}
        <div className="flex items-start justify-between gap-3 md:block">
          <div className="min-w-0">
            <p className="tracked-sm text-[8.5px] text-bronze-deep md:text-[9px]">
              {String(i + 1).padStart(2, "0")} — {p.type}
            </p>
            <h3 className="font-display mt-1.5 text-[1.3rem] leading-[1.15] text-espresso md:mt-4 md:text-[clamp(1.9rem,3.4vw,2.9rem)] md:leading-[1.1]">
              {p.name}
            </h3>
            <p className="tracked-sm mt-1.5 text-[8.5px] text-espresso/70 md:mt-3 md:text-[9.5px]">
              {p.location}
            </p>
            {p.area && (
              <p className="mt-1.5 text-[12.5px] text-espresso/85 md:hidden">{p.area}</p>
            )}
          </div>

          {/* disclosure — phone only */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={`${open ? "Hide" : "Show"} details for ${p.name}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bronze/45 text-bronze-deep transition-colors duration-400 hover:border-bronze-deep hover:bg-bronze/10 active:scale-90 md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={`h-[15px] w-[15px] transition-transform duration-[420ms] ease-[cubic-bezier(.22,.68,0,1)] ${
                open ? "rotate-90" : ""
              }`}
            >
              <path d="M5 12h13M13 6.5 18.5 12 13 17.5" />
            </svg>
          </button>
        </div>

        {/* secondary — collapsed on phones, always open from md up */}
        <div id={panelId} className={`${open ? "block" : "hidden"} md:!block`}>
          <p className="mt-3 max-w-md text-[13px] leading-[1.6] text-espresso/70 md:mt-6 md:text-[15px] md:leading-[1.85]">
            {p.blurb}
          </p>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-espresso/12 pt-3 sm:grid-cols-3 md:mt-9 md:gap-x-6 md:gap-y-6 md:pt-7 lg:grid-cols-2">
            <Meta label="Scope" value={p.scope} />
            {/* area already sits in the phone summary line */}
            <Meta label="Area" value={p.area} className="hidden md:block" />
            <Meta label="Project Value" value={p.value} />
          </dl>

          {rest.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-1.5 md:mt-8 md:gap-3">
              {rest.slice(0, 3).map((img, k) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setLightboxIndex(k + 1)}
                  aria-label={`View larger image of ${p.name}, detail ${k + 2}`}
                  className="group/thumb relative aspect-[4/3] overflow-hidden bg-sand"
                >
                  <Image
                    src={`/images/${img}.jpg`}
                    alt={`${p.name} — interior detail ${k + 2}, ${p.location}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 767px) 30vw, (max-width: 1024px) 30vw, 13vw"
                    quality={90}
                    className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(.22,.68,0,1)] group-hover/thumb:scale-[1.07]"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </Reveal>

      {lightboxIndex !== null && (
        <Lightbox
          images={p.images}
          index={lightboxIndex}
          alt={p.alt}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(delta) =>
            setLightboxIndex((idx) => (idx + delta + p.images.length) % p.images.length)
          }
        />
      )}
    </article>
  );
}
