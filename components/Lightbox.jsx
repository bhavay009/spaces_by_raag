"use client";
import { useEffect } from "react";
import Image from "next/image";

/**
 * Full-screen viewer for a project's photo set. Opened from a click on any
 * lead/thumbnail image in ProjectCard; arrow keys and on-screen chevrons
 * step through the same project's `images` array.
 */
export default function Lightbox({ images, index, alt, onClose, onNavigate }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onNavigate]);

  const src = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close image"
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors duration-300 hover:border-cream active:scale-90 md:right-8 md:top-8"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(-1);
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors duration-300 hover:border-cream active:scale-90 md:left-8"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 5 7 12l8 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(1);
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors duration-300 hover:border-cream active:scale-90 md:right-8"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 5l8 7-8 7" />
            </svg>
          </button>
        </>
      )}

      <div className="relative mx-14 aspect-[4/3] w-full max-w-5xl md:mx-24" onClick={(e) => e.stopPropagation()}>
        <Image
          src={`/images/${src}.jpg`}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 85vw, 80vw"
          quality={90}
          className="object-contain"
        />
      </div>

      {images.length > 1 && (
        <p className="tracked-sm absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-cream/60">
          {index + 1} / {images.length}
        </p>
      )}
    </div>
  );
}
