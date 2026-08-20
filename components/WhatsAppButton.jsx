"use client";
import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/site";

export default function WhatsAppButton() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Spaces by Raag on WhatsApp"
      className={`group fixed bottom-6 right-6 z-50 flex items-center gap-0 transition-all duration-700 ease-out md:bottom-8 md:right-8 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <span className="tracked-sm pointer-events-none absolute right-full mr-4 hidden translate-x-1 whitespace-nowrap border border-espresso/15 bg-cream/95 px-4 py-2.5 text-[9px] text-espresso opacity-0 backdrop-blur-sm transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 md:block">
        Chat with us
      </span>
      <span
        className="
          relative flex h-14 w-14 items-center justify-center rounded-full bg-bronze
          shadow-[0_16px_40px_-14px_rgba(26,17,9,.55),0_0_0_1px_rgba(58,37,23,.30)]
          transition-[background-color,box-shadow,transform] duration-500 ease-[cubic-bezier(.22,.68,0,1)]
          group-hover:scale-[1.06] group-hover:bg-espresso
          group-hover:shadow-[0_20px_46px_-14px_rgba(26,17,9,.62),0_0_0_1px_rgba(176,131,86,.85)]
        "
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="relative h-[26px] w-[26px] fill-espresso transition-colors duration-500 group-hover:fill-bronze">
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
          <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2 22l5.34-1.4a9.83 9.83 0 0 0 4.7 1.2h.01c5.43 0 9.85-4.42 9.85-9.86A9.8 9.8 0 0 0 12.04 2zm0 17.96h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.15 8.15 0 0 1-1.25-4.36c0-4.52 3.68-8.2 8.2-8.2a8.15 8.15 0 0 1 8.19 8.2c0 4.52-3.68 8.2-8.19 8.2z" />
        </svg>
      </span>
    </a>
  );
}
