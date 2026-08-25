"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Lead project image with a restrained parallax drift.
 * The drift lives on a wrapper (kept slightly overscaled so no edge is ever revealed),
 * while the hover scale stays on the <Image> itself — two nested transforms, so
 * neither overwrites the other. Desktop only; disabled for reduced-motion.
 *
 * The drift is written straight to the DOM node rather than held in state: this
 * renders eight times on the page, and routing a per-frame value through React
 * would re-render each one (and its <Image>) on every scroll tick for nothing.
 * Listeners are also attached only while the frame is near the viewport, so a
 * scroll costs one or two handlers rather than eight.
 */
export default function ParallaxImage({ src, alt, sizes, strength = 18 }) {
  const frame = useRef(null);
  const drift = useRef(null);

  useEffect(() => {
    const el = frame.current;
    const inner = drift.current;
    if (!el || !inner) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 1023px)");
    const enabled = () => !reduce.matches && !narrow.matches;

    let raf = 0;
    let listening = false;

    const write = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 above the fold … +1 below it
      const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      const y = Math.max(-1, Math.min(1, p)) * strength;
      inner.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(1.07)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(write);
    };

    const attach = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      write();
    };

    const detach = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? attach() : detach()),
      { rootMargin: "240px 0px" }
    );

    // Re-evaluated when the breakpoint or motion preference changes, so resizing
    // across 1024px or toggling reduced-motion takes effect without a remount.
    const sync = () => {
      if (enabled()) {
        io.observe(el);
      } else {
        io.unobserve(el);
        detach();
        inner.style.transform = "scale(1.07)";
      }
    };

    sync();
    reduce.addEventListener("change", sync);
    narrow.addEventListener("change", sync);

    return () => {
      io.disconnect();
      detach();
      reduce.removeEventListener("change", sync);
      narrow.removeEventListener("change", sync);
    };
  }, [strength]);

  return (
    <div
      ref={frame}
      className="group relative aspect-[3/4] w-full overflow-hidden bg-sand shadow-[0_18px_50px_-30px_rgba(26,17,9,.55)] md:aspect-[4/3]"
    >
      <div
        ref={drift}
        className="absolute inset-0 will-change-transform"
        style={{ transform: "scale(1.07)" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          loading="lazy"
          sizes={sizes}
          quality={90}
          className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(.22,.68,0,1)] group-hover:scale-[1.045]"
        />
      </div>
      {/* warm scrim recedes on hover — the image steps forward */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/28 via-transparent to-transparent transition-opacity duration-[1.2s] ease-out group-hover:opacity-0" />
    </div>
  );
}
