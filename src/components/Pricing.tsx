const packages = [
  {
    id: "express",
    name: "Express",
    price: "Desde $5,299 MXN",
    delivery: "24 a 48 horas",
    description:
      "Ideal para marcas personales, profesionales independientes y lanzamientos urgentes.",
    highlights: [
      "Look & feel premium",
      "Diseño 100% responsivo",
      "100% optimizado para web, móviles, tabletas y computadoras (excelente responsiva y diseño fluido)",
      "Optimizado para indexación en Google y buscadores",
      "Formulario de contacto por correo electrónico",
      "Entrega en 24–48 horas",
      "Servidor en línea 24/7 de alta disponibilidad (cloud DigitalOcean, VPS de servidor virtual de alto rendimiento)",
      "Gestión y configuración de dominio/DNS",
      "Balance de entrega rápida en 24 a 48 horas",
    ],
    note: "* ¿Requieres algo diferente? Cuéntanos y lo adaptamos a tu medida.",
    cta: "Lanzar con Express",
    badge: "Entrega Rápida 24-48h",
    featured: false,
    express: true,
    icon: "bolt" as const,
  },
  {
    id: "dinamico",
    name: "Dinámico",
    price: "Desde $8,999 MXN",
    delivery: "3 a 5 días",
    description:
      "Ideal para negocios, PyMES y servicios que buscan captar clientes y vender.",
    highlights: [
      "Look & feel premium",
      "Diseño 100% responsivo",
      "100% optimizado para web, móviles, tabletas y computadoras (excelente responsiva y diseño fluido)",
      "Optimizado para indexación en Google y buscadores",
      "CTAs y mensajes comerciales optimizados",
      "Formulario y botón de contacto directo a WhatsApp",
      "Servidor en línea 24/7 de alta disponibilidad (cloud DigitalOcean, VPS de servidor virtual de alto rendimiento)",
      "Gestión y configuración de dominio/DNS",
      "Balance ideal en 3 a 5 días de entrega",
    ],
    note: "* ¿Requieres algo diferente? Cuéntanos y lo adaptamos a tu medida.",
    cta: "Elegir Dinámico",
    badge: "Más Elegido",
    featured: true,
    express: false,
    icon: "rocket" as const,
  },
  {
    id: "profesional",
    name: "Profesional",
    price: "Desde $12,999 MXN",
    delivery: "A medida",
    description:
      "Ideal para empresas, corporativos y proyectos con automatización avanzada.",
    highlights: [
      "Look & feel premium",
      "Diseño 100% responsivo",
      "100% optimizado para web, móviles, tabletas y computadoras (excelente responsiva y diseño fluido)",
      "Optimizado para indexación en Google y buscadores",
      "Integraciones avanzadas con CRM y herramientas externas",
      "Flujos automatizados de captación y seguimiento",
      "Servidor en línea 24/7 de alta disponibilidad (cloud DigitalOcean, VPS de servidor virtual de alto rendimiento)",
      "Gestión y configuración de dominio/DNS",
      "Acompañamiento post-lanzamiento",
    ],
    note: "* ¿Buscas ir más allá? Posibilidades casi infinitas a tu medida: agentes de IA conversacionales para atención y pedidos, generación automatizada de contenido y audio, sincronización con POS en tiempo real, tableros inteligentes y flujos omnicanal que automatizan tu negocio.",
    cta: "Ir a Profesional",
    badge: "Máximo Nivel",
    featured: false,
    express: false,
    icon: "gem" as const,
  },
];

function PackageIcon({
  type,
  className,
}: {
  type: "bolt" | "rocket" | "gem" | "building";
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (type === "bolt") {
    return (
      <svg {...common}>
        <path d="M13 2 4.5 13.5H12l-1 8.5L19.5 10.5H12L13 2Z" />
      </svg>
    );
  }

  if (type === "rocket") {
    return (
      <svg {...common}>
        <path d="M12 3c3.5 2 6 5.5 6 9.5 0 1.5-.4 2.9-1.1 4.1L12 21l-4.9-4.4A8.4 8.4 0 0 1 6 12.5C6 8.5 8.5 5 12 3Z" />
        <path d="M9.5 14.5c.6.6 1.5.9 2.5.9s1.9-.3 2.5-.9" />
        <path d="M8 17.5 6.5 21M16 17.5 17.5 21" />
      </svg>
    );
  }

  if (type === "gem") {
    return (
      <svg {...common}>
        <path d="M6 3h12l3 6-9 12L3 9l3-6Z" />
        <path d="M3 9h18M12 21 8 9l4-6 4 6-4 12Z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M4 20V9.5L12 4l8 5.5V20" />
      <path d="M9 20v-6h6v6" />
      <path d="M4 20h16" />
    </svg>
  );
}

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
            Tres caminos claros para publicar con impacto. Si tu operación
            requiere escala, el bloque Enterprise está hecho a la carta.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {packages.map((item) => {
            const isDark = item.id === "express" || item.id === "profesional";

            const cardTone =
              item.id === "express"
                ? "border-accent bg-ink-deep text-white ring-1 ring-accent/40"
                : item.id === "dinamico"
                  ? "border-2 border-signal bg-surface text-foreground shadow-lg shadow-signal/20"
                  : "border-signal/40 bg-[#07152b] text-white ring-1 ring-signal/35 hover:bg-[#0b1d3a] hover:ring-signal/55";

            const iconTone =
              item.id === "express"
                ? "bg-accent/20 text-accent"
                : item.id === "dinamico"
                  ? "bg-signal/10 text-signal"
                  : "bg-signal/25 text-signal";

            const badgeTone =
              item.id === "express"
                ? "bg-accent text-white"
                : item.id === "dinamico"
                  ? "bg-signal text-white"
                  : "bg-signal text-white";

            const mutedText = isDark ? "text-white/70" : "text-muted";
            const bulletText = isDark ? "text-white/85" : "text-muted";
            const priceText = isDark ? "text-white" : "text-ink-deep";
            const ctaTone =
              item.id === "express"
                ? "bg-white text-ink-deep hover:bg-accent-soft"
                : item.id === "dinamico"
                  ? "bg-signal text-white hover:bg-[#1558d4]"
                  : "bg-signal text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:bg-[#4d8fff] hover:shadow-[0_0_0_3px_rgba(29,110,245,0.35)]";
            const accentLabel =
              item.id === "express"
                ? "text-accent"
                : item.id === "dinamico"
                  ? "text-signal"
                  : "text-signal";
            const bulletDot =
              item.id === "express" ? "bg-accent" : "bg-signal";

            return (
              <article
                key={item.id}
                className={`flex flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7 ${cardTone}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${iconTone}`}
                  >
                    <PackageIcon type={item.icon} className="h-5 w-5" />
                  </span>
                  {item.badge ? (
                    <span
                      className={`rounded px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${badgeTone}`}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-5 font-display text-2xl font-semibold">
                  {item.name}
                </h3>
                <p
                  className={`mt-1 text-xs font-semibold uppercase tracking-[0.12em] ${accentLabel}`}
                >
                  {item.delivery}
                </p>

                <p
                  className={`mt-4 font-display text-2xl font-semibold sm:text-3xl ${priceText}`}
                >
                  {item.price}
                </p>
                <p className={`mt-3 text-sm leading-relaxed ${mutedText}`}>
                  {item.description}
                </p>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm">
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${bulletDot}`}
                        aria-hidden
                      />
                      <span className={bulletText}>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {item.note ? (
                  <p
                    className={`mt-4 text-[12px] leading-5 italic sm:text-[12.5px] sm:leading-6 ${
                      item.express
                        ? "text-white/55"
                        : item.id === "profesional"
                          ? "text-white/60"
                          : "text-muted/90"
                    }`}
                  >
                    {item.note}
                  </p>
                ) : null}

                <a
                  href="#contacto"
                  className={`mt-8 inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold transition-colors ${ctaTone}`}
                >
                  {item.cta}
                </a>
              </article>
            );
          })}
        </div>

        <div
          id="enterprise"
          className="relative mt-10 overflow-hidden rounded-2xl border border-signal/25 bg-ink-deep px-6 py-8 text-white sm:px-8 sm:py-10"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_20%,rgba(29,110,245,0.28),transparent_45%),radial-gradient(ellipse_at_90%_80%,rgba(14,143,159,0.22),transparent_40%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-16 right-16 h-48 w-48 rounded-full border border-white/10"
            aria-hidden
          />

          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.9fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-signal">
                  <PackageIcon type="building" className="h-5 w-5" />
                </span>
                <span className="rounded bg-signal px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                  Hecho a la medida
                </span>
                <span className="rounded border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/80">
                  Roadmap dedicado
                </span>
              </div>

              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-signal">
                Enterprise · Comunicación Integral
              </p>
              <h3 className="mt-3 max-w-xl font-display text-2xl font-semibold leading-snug sm:text-3xl">
                Soluciones a la carta para operaciones que requieren escala.
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                Ecosistemas complejos, múltiples secciones, automatizaciones de
                IA personalizadas e integraciones avanzadas. Diseñado para
                marcas y equipos que necesitan un sistema de captación y
                comunicación a medida, con soporte de alto nivel.
              </p>

              <ul className="mt-6 grid gap-2.5 text-sm text-white/80 sm:grid-cols-2">
                {[
                  "Arquitectura multi-sección y flujos a escala",
                  "Integraciones IA · CRM · WhatsApp",
                  "Automatizaciones hechas a la carta",
                  "Acompañamiento estratégico continuo",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-6 max-w-2xl text-[12px] leading-5 italic text-white/55 sm:text-[12.5px] sm:leading-6">
                * ¿Buscas ir más allá? Posibilidades casi infinitas a tu medida:
                agentes de IA conversacionales para atención y pedidos,
                generación automatizada de contenido y audio, sincronización
                con POS en tiempo real, tableros inteligentes y flujos omnicanal
                que automatizan tu negocio.
              </p>
            </div>

            <div className="rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                Cotización personalizada
              </p>
              <p className="mt-3 font-display text-2xl font-semibold">
                A la medida
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                Cuéntanos el alcance de tu operación y armamos un roadmap
                dedicado con tiempos, entregables e integraciones.
              </p>
              <a
                href="#contacto"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-signal px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1558d4]"
              >
                Cotizar Enterprise
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
