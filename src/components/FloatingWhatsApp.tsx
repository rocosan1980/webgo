"use client";

import { useEffect, useState } from "react";
import { getWhatsAppHref } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 280);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 transition-all duration-300 sm:bottom-6 sm:right-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <a
        href={getWhatsAppHref()}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        aria-label="Escribir por WhatsApp"
        title="WhatsApp"
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-10px_rgba(37,211,102,0.65)] transition-transform duration-300 hover:scale-105 hover:bg-[#1ebe57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden>
          <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 2.08.55 4.04 1.52 5.74L2 22l4.58-1.5a9.9 9.9 0 0 0 5.46 1.6h.01c5.46 0 9.89-4.4 9.89-9.83S17.5 2 12.04 2zm5.76 13.97c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.82-4.2-4.96-4.4-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.56-.35.75-.35h.54c.17 0 .4-.06.63.48.24.56.81 1.94.88 2.08.07.14.12.3.02.49-.1.19-.14.3-.28.47-.14.16-.3.36-.43.49-.14.14-.29.29-.12.56.16.28.72 1.19 1.55 1.93 1.07.95 1.97 1.24 2.25 1.38.28.14.44.12.6-.07.16-.19.7-.81.89-1.09.19-.28.37-.23.63-.14.26.1 1.67.79 1.96.93.28.14.47.21.54.33.07.12.07.7-.17 1.37z" />
        </svg>
        <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-ink-deep px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 sm:block">
          Escríbenos
        </span>
      </a>
    </div>
  );
}
