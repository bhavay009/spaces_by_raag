import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 bg-ink px-6 pb-8 pt-10 md:px-12 md:pb-10 md:pt-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-5 md:gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="tracked text-[9px] text-bronze-ink md:text-[10px]">Spaces by</p>
            <p className="font-display mt-1 text-[2.1rem] leading-none text-cream md:mt-1.5 md:text-[clamp(3rem,7vw,5rem)]">
              Raag
            </p>
            <p className="font-display mt-3 max-w-xs text-[1.05rem] italic leading-[1.35] text-cream/55 md:mt-7 md:text-[1.25rem] md:leading-[1.5]">
              Creating spaces that feel uniquely yours.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:gap-10 lg:col-span-7 lg:grid-cols-3">
            <div>
              <p className="tracked-sm text-[9px] text-cream/55">Call</p>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="group mt-1.5 inline-flex min-h-11 items-center text-[14px] text-cream/85 transition-colors duration-400 hover:text-bronze-ink md:mt-3 md:text-[15px]"
              >
                {site.phone}
              </a>
            </div>
            <div>
              <p className="tracked-sm text-[9px] text-cream/55">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="group mt-1.5 inline-flex min-h-11 items-center break-all text-[14px] text-cream/85 transition-colors duration-400 hover:text-bronze-ink md:mt-3 md:text-[15px]"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="tracked-sm text-[9px] text-cream/55">Follow</p>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-1.5 inline-flex min-h-11 items-center text-[14px] text-cream/85 transition-colors duration-400 hover:text-bronze-ink md:mt-3 md:text-[15px]"
              >
                {site.instagramHandle}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-cream/12 pt-5 sm:flex-row sm:items-center sm:justify-between md:mt-20 md:gap-4 md:pt-8">
          <p className="tracked-sm text-[9px] text-cream/55">
            {site.location} — Residential &amp; Office Interiors
          </p>
          <p className="tracked-sm text-[9px] text-cream/50">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
