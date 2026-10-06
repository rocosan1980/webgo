const packages = [
  {
    name: "Ágil",
    price: "Desde $299",
    description:
      "Landing de una página, lista para campañas rápidas con estructura de conversión clara.",
    highlights: [
      "Diseño responsive profesional",
      "Secciones clave de alto impacto",
      "Formulario de contacto básico",
      "Entrega express",
    ],
    cta: "Empezar con Ágil",
    featured: false,
  },
  {
    name: "Pro",
    price: "Desde $599",
    description:
      "La opción más elegida: diseño premium, WhatsApp y foco total en conversión.",
    highlights: [
      "UI de alta conversión",
      "Formulario conectado a WhatsApp",
      "Optimización de mensajes y CTAs",
      "Soporte de iteración post-lanzamiento",
    ],
    cta: "Elegir Pro",
    featured: true,
  },
  {
    name: "Integral",
    price: "A medida",
    description:
      "Automatizaciones, IA y flujos avanzados para equipos que necesitan escala.",
    highlights: [
      "Automatizaciones comerciales",
      "Integraciones con CRM / tools",
      "Asistentes y flujos con IA",
      "Acompañamiento estratégico",
    ],
    cta: "Hablar de Integral",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="paquetes" className="border-t border-line bg-background">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            Paquetes
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink-deep sm:text-4xl">
            Elige el ritmo con el que quieres lanzar.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Opciones claras, sin ruido. Cada paquete está pensado para un
            objetivo comercial distinto.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {packages.map((item) => (
            <article
              key={item.name}
              className={`flex flex-col rounded-2xl border p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8 ${
                item.featured
                  ? "border-accent bg-ink-deep text-white"
                  : "border-line bg-surface text-foreground"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl font-semibold">
                  {item.name}
                </h3>
                {item.featured ? (
                  <span className="rounded bg-accent px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    Popular
                  </span>
                ) : null}
              </div>

              <p
                className={`mt-4 font-display text-3xl font-semibold ${
                  item.featured ? "text-white" : "text-ink-deep"
                }`}
              >
                {item.price}
              </p>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  item.featured ? "text-white/70" : "text-muted"
                }`}
              >
                {item.description}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm">
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                        item.featured ? "bg-accent" : "bg-accent"
                      }`}
                      aria-hidden
                    />
                    <span
                      className={
                        item.featured ? "text-white/85" : "text-muted"
                      }
                    >
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className={`mt-8 inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold transition-colors ${
                  item.featured
                    ? "bg-white text-ink-deep hover:bg-accent-soft"
                    : "bg-ink-deep text-white hover:bg-accent-strong"
                }`}
              >
                {item.cta}
              </a>
            </article>
          ))}
        </div>

        <div
          id="enterprise"
          className="mt-10 rounded-2xl border border-line bg-surface px-6 py-8 sm:px-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-signal">
            Enterprise · Comunicación Integral
          </p>
          <h3 className="mt-3 max-w-2xl font-display text-2xl font-semibold text-ink-deep sm:text-3xl">
            Soluciones de comunicación integral para marcas y operaciones que
            requieren escala.
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            Sitios multi-sección, sistemas de captación, automatizaciones y
            acompañamiento continuo para equipos comerciales y de marketing.
          </p>
          <a
            href="#contacto"
            className="mt-6 inline-flex items-center justify-center rounded-md border border-line px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-signal/40 hover:text-signal"
          >
            Hablar con Enterprise
          </a>
        </div>
      </div>
    </section>
  );
}
