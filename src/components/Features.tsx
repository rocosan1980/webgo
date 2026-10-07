const features = [
  {
    title: "Velocidad de entrega (24h)",
    description:
      "Procesos ágiles con IA para diseñar, configurar y publicar tu landing en tiempo récord. Ideal para lanzamientos inmediatos y campañas urgentes donde cada hora cuenta.",
    detail: "Brief → diseño → publicación",
  },
  {
    title: "Diseño de categoría",
    description:
      "Interfaces impecables, tipografía cuidada y jerarquía de conversión clara. 100% adaptable y funcional en web, tablets, móviles y escritorio, para transmitir confianza en cualquier pantalla.",
    detail: "Look & feel premium",
  },
  {
    title: "Alta conversión",
    description:
      "Ingeniería de conversión con CTAs de alto impacto, prueba social y formularios listos para captar leads. Respaldado por la robustez y velocidad de un servidor de alto rendimiento.",
    detail: "Leads listos para vender",
  },
  {
    title: "IA · CRM · Módulos personalizados",
    description:
      "Ecosistema tecnológico integral con asistentes de IA, flujos automatizados y sincronización inteligente. Reduce carga operativa y mantiene tu captación activa las 24 horas.",
    detail: "Integraciones avanzadas",
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group flex flex-col rounded-2xl border border-line bg-background px-7 py-8 shadow-[0_1px_2px_rgba(11,20,38,0.04)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_16px_36px_-18px_rgba(11,20,38,0.22)] sm:px-8 sm:py-9 lg:px-9 lg:py-10"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {feature.detail}
              </p>
              <h3 className="mt-3.5 font-display text-lg font-semibold leading-snug text-ink-deep sm:mt-4 sm:text-xl">
                {feature.title}
              </h3>
              <p className="mt-4 flex-1 text-[15px] leading-7 text-muted sm:mt-5 sm:text-base sm:leading-8">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
