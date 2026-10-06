export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate min-h-[100svh] overflow-hidden pt-16 sm:pt-[4.25rem]"
    >
      <div className="absolute inset-0 bg-mesh" aria-hidden />
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div
        className="absolute inset-y-0 right-0 hidden w-[48%] bg-[radial-gradient(ellipse_at_70%_40%,rgba(14,143,159,0.28),transparent_58%),linear-gradient(120deg,transparent_10%,rgba(29,110,245,0.12)_45%,rgba(7,16,31,0.08)_100%)] lg:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-24 h-px animate-pulse-line bg-gradient-to-r from-transparent via-accent/70 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[calc(100svh-4.25rem)] max-w-6xl flex-col justify-center px-5 py-20 sm:px-8">
        <div className="max-w-2xl">
          <p className="animate-fade-up font-display text-5xl font-semibold tracking-tight text-ink-deep sm:text-6xl lg:text-7xl">
            Web<span className="text-accent">Go</span>
          </p>

          <h1 className="animate-fade-up-delay-1 mt-6 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink-deep sm:text-4xl lg:text-[2.85rem]">
            Landing pages que convierten, listas en tiempo récord.
          </h1>

          <p className="animate-fade-up-delay-2 mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Diseño profesional, entrega ágil e integraciones avanzadas:
            WhatsApp, automatizaciones e IA para acelerar tus resultados.
          </p>

          <div className="animate-fade-up-delay-3 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
            >
              Solicitar cotización
            </a>
            <a
              href="#paquetes"
              className="inline-flex items-center justify-center rounded-md border border-line bg-surface/80 px-5 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/40 hover:text-accent-strong"
            >
              Ver paquetes
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
