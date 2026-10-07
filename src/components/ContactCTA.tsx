import { getWhatsAppHref } from "@/lib/whatsapp";

export default function ContactCTA() {
  return (
    <section className="border-t border-line bg-surface" aria-labelledby="cta-rapida-title">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
        <div className="relative overflow-hidden rounded-2xl border border-accent/25 bg-ink-deep px-6 py-8 text-white sm:px-8 sm:py-9">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(14,143,159,0.28),transparent_50%),radial-gradient(ellipse_at_90%_80%,rgba(29,110,245,0.16),transparent_45%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-8 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full border border-white/10"
            aria-hidden
          />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-accent">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M12 3c3.5 2 6 5.5 6 9.5 0 1.5-.4 2.9-1.1 4.1L12 21l-4.9-4.4A8.4 8.4 0 0 1 6 12.5C6 8.5 8.5 5 12 3Z" />
                  <path d="M9.5 14.5c.6.6 1.5.9 2.5.9s1.9-.3 2.5-.9" />
                </svg>
              </div>
              <h2
                id="cta-rapida-title"
                className="font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl"
              >
                ¿Listo para despegar o tienes alguna duda?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                ¡Escríbenos ahora! No esperes días para empezar. Mándanos un
                mensaje por WhatsApp o déjanos tus datos y te respondemos de
                volada para echar a andar tu proyecto.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[16rem]">
              <a
                href={getWhatsAppHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe57]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-hidden
                >
                  <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 2.08.55 4.04 1.52 5.74L2 22l4.58-1.5a9.9 9.9 0 0 0 5.46 1.6h.01c5.46 0 9.89-4.4 9.89-9.83S17.5 2 12.04 2zm5.76 13.97c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.82-4.2-4.96-4.4-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.56-.35.75-.35h.54c.17 0 .4-.06.63.48.24.56.81 1.94.88 2.08.07.14.12.3.02.49-.1.19-.14.3-.28.47-.14.16-.3.36-.43.49-.14.14-.29.29-.12.56.16.28.72 1.19 1.55 1.93 1.07.95 1.97 1.24 2.25 1.38.28.14.44.12.6-.07.16-.19.7-.81.89-1.09.19-.28.37-.23.63-.14.26.1 1.67.79 1.96.93.28.14.47.21.54.33.07.12.07.7-.17 1.37z" />
                </svg>
                Escribir por WhatsApp
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Dejar mis datos aquí
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
