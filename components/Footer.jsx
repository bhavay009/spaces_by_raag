import { site, whatsappUrl } from "@/lib/site";

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 bg-ink px-6 pb-10 pt-24 md:px-12 md:pt-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="tracked text-[9px] text-bronze-ink md:text-[10px]">Spaces by</p>
            <p className="font-display mt-1.5 text-[clamp(3rem,7vw,5rem)] leading-none text-cream">
              Raag
            </p>
            <p className="font-display mt-7 max-w-xs text-[1.25rem] italic leading-[1.5] text-cream/55">
              Creating spaces that feel uniquely yours.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            <div>
              <p className="tracked-sm text-[9px] text-cream/55">Call</p>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="group mt-3 inline-flex min-h-11 items-center text-[15px] text-cream/85 transition-colors duration-400 hover:text-bronze-ink"
              >
                {site.phone}
              </a>
            </div>
            <div>
              <p className="tracked-sm text-[9px] text-cream/55">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="group mt-3 inline-flex min-h-11 items-center break-all text-[15px] text-cream/85 transition-colors duration-400 hover:text-bronze-ink"
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
                className="group mt-3 inline-flex min-h-11 items-center text-[15px] text-cream/85 transition-colors duration-400 hover:text-bronze-ink"
              >
                {site.instagramHandle}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center text-[15px] text-cream/85 transition-colors duration-400 hover:text-bronze-ink"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-cream/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
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
