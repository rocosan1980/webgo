const features = [
  {
    title: "Velocidad de entrega",
    description:
      "Procesos ágiles para publicar landing pages profesionales sin dilatar tu campaña ni perder momentum comercial.",
    detail: "Brief → diseño → publicación",
  },
  {
    title: "Diseño de categoría",
    description:
      "Interfaces limpias, tipografía cuidada y jerarquía visual pensada para transmitir confianza desde el primer scroll.",
    detail: "Look & feel premium",
  },
  {
    title: "Alta conversión",
    description:
      "Estructura orientada a acción: CTAs claros, prueba social y formularios conectados a WhatsApp para cerrar más rápido.",
    detail: "Leads listos para vender",
  },
  {
    title: "Integraciones avanzadas",
    description:
      "Automatizaciones, notificaciones y asistentes con IA para nutrir prospectos y reducir trabajo manual del equipo.",
    detail: "WhatsApp · CRM · IA",
  },
];

export default function Features() {
  return (
    <section id="beneficios" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            Beneficios
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink-deep sm:text-4xl">
            Todo lo que necesitas para lanzar fuerte y vender más.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            WebGo combina diseño profesional con infraestructura lista para
            captar, calificar y responder leads sin fricción.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group bg-surface p-7 transition-colors duration-300 hover:bg-accent-soft/40 sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {feature.detail}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink-deep">
                {feature.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
