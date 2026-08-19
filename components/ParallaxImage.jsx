"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Lead project image with a restrained parallax drift.
 * The drift lives on a wrapper (kept slightly overscaled so no edge is ever revealed),
 * while the hover scale stays on the <Image> itself — two nested transforms, so
 * neither overwrites the other. Desktop only; disabled for reduced-motion.
 */
export default function ParallaxImage({ src, alt, sizes, strength = 18 }) {
  const frame = useRef(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -240 || r.top > vh + 240) return;
      // -1 above the fold … +1 below it
      const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      setY(Math.max(-1, Math.min(1, p)) * strength);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div
      ref={frame}
      className="group relative aspect-[4/3] w-full overflow-hidden bg-sand shadow-[0_18px_50px_-30px_rgba(26,17,9,.55)]"
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${y.toFixed(2)}px, 0) scale(1.07)` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          loading="lazy"
          sizes={sizes}
          className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(.22,.68,0,1)] group-hover:scale-[1.045]"
        />
      </div>
      {/* warm scrim recedes on hover — the image steps forward */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/28 via-transparent to-transparent transition-opacity duration-[1.2s] ease-out group-hover:opacity-0" />
    </div>
  );
}
