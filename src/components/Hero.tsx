export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden pt-[5.5rem] sm:pt-[6.25rem]"
    >
      <div className="absolute inset-0 bg-mesh" aria-hidden />
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-[5.75rem] h-px animate-pulse-line bg-gradient-to-r from-transparent via-accent/70 to-transparent sm:top-28"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[calc(100svh-5.5rem)] max-w-6xl flex-col justify-center px-5 pb-16 pt-2 sm:min-h-[calc(100svh-6.25rem)] sm:px-8 sm:pb-20 sm:pt-4 lg:pb-24">
        <div className="max-w-2xl">
          <p className="animate-fade-up hidden font-display text-5xl font-semibold tracking-tight text-ink-deep sm:block sm:text-6xl lg:text-7xl">
            <span className="logo-shimmer">
              Web<span className="text-accent">Go</span>
            </span>
          </p>

          <h1 className="animate-fade-up-delay-1 font-display text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-ink-deep sm:mt-6 sm:text-4xl lg:text-[2.85rem]">
            Tu negocio en internet con clase y velocidad. Landing pages que
            conectan y venden.
          </h1>

          <p className="animate-fade-up-delay-2 mt-4 max-w-lg text-[0.95rem] leading-relaxed text-muted sm:mt-5 sm:text-lg">
            Diseño profesional de entrega rápida (incluso en 24 horas),
            respaldado por tecnología de última generación, herramientas IA y
            flujos optimizados para captar la atención desde el primer día.
          </p>

          <div className="animate-fade-up-delay-3 mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
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
