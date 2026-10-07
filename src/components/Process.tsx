const steps = [
  {
    number: "01",
    title: "Tu idea",
    description: "Elige paquete o comparte tu visión.",
    emoji: "💡",
    role: "client" as const,
  },
  {
    number: "02",
    title: "Tus datos",
    description: "Formulario o WhatsApp con el alcance.",
    emoji: "📝",
    role: "client" as const,
  },
  {
    number: "03",
    title: "Desarrollo",
    description: "Diseño e integración express con IA.",
    emoji: "⚡",
    role: "team" as const,
  },
  {
    number: "04",
    title: "Revisión",
    description: "Ajustes visuales y funcionales juntos.",
    emoji: "🤝",
    role: "collab" as const,
  },
  {
    number: "05",
    title: "En línea",
    description: "Publicamos lista para captar y vender.",
    emoji: "🏆",
    role: "goal" as const,
  },
];

const roleStyles = {
  client: {
    number: "text-amber-700",
    node: "border-amber-300 bg-amber-50 text-amber-900 shadow-amber-200/40 group-hover:border-amber-400 group-hover:bg-amber-100 group-hover:shadow-amber-300/50",
    title: "text-ink-deep group-hover:text-amber-800",
    description: "text-muted group-hover:text-amber-900/70",
    ring: "group-hover:shadow-[0_10px_28px_-14px_rgba(180,83,9,0.45)]",
  },
  team: {
    number: "text-accent-strong",
    node: "border-accent/40 bg-accent-soft text-accent-strong shadow-accent/20 group-hover:border-accent group-hover:bg-accent group-hover:text-white group-hover:shadow-accent/40",
    title: "text-ink-deep group-hover:text-accent-strong",
    description: "text-muted group-hover:text-accent-strong/80",
    ring: "group-hover:shadow-[0_10px_28px_-14px_rgba(14,143,159,0.5)]",
  },
  collab: {
    number: "text-ink-deep",
    node: "border-line bg-[linear-gradient(135deg,#fff7ed_0%,#fff7ed_48%,#d7f3f6_52%,#d7f3f6_100%)] text-ink-deep shadow-[0_4px_14px_-8px_rgba(11,20,38,0.25)] group-hover:border-accent/40 group-hover:shadow-[0_10px_24px_-12px_rgba(14,143,159,0.35)]",
    title: "text-ink-deep group-hover:text-accent-strong",
    description: "text-muted group-hover:text-foreground/80",
    ring: "group-hover:shadow-[0_10px_28px_-14px_rgba(14,143,159,0.35)]",
  },
  goal: {
    number: "text-emerald-700",
    node: "border-emerald-400 bg-emerald-500 text-white shadow-[0_0_0_4px_rgba(16,185,129,0.18)] group-hover:border-emerald-300 group-hover:bg-emerald-400 group-hover:shadow-[0_0_0_6px_rgba(16,185,129,0.22)]",
    title: "text-emerald-700 group-hover:text-emerald-600",
    description: "text-emerald-700/80 group-hover:text-emerald-700",
    ring: "group-hover:shadow-[0_12px_30px_-12px_rgba(16,185,129,0.55)]",
  },
};

export default function Process() {
  return (
    <section
      id="proceso"
      className="border-t border-line bg-surface"
      aria-label="Proceso WebGo"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="-mx-5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:overflow-visible sm:px-0">
          <div className="relative min-w-[44rem] sm:min-w-0">
            <div
              className="pointer-events-none absolute left-6 right-6 top-[3.35rem] h-px bg-gradient-to-r from-amber-200 via-accent/40 to-emerald-300 sm:left-10 sm:right-10"
              aria-hidden
            />
            <ol className="relative z-10 flex items-start justify-between gap-2">
              {steps.map((step) => {
                const style = roleStyles[step.role];

                return (
                  <li
                    key={step.number}
                    className={`group flex w-1/5 min-w-[8rem] flex-col items-center px-1 text-center ${style.ring}`}
                  >
                    <span
                      className={`font-display text-[11px] font-semibold tracking-[0.16em] transition-colors duration-300 ${style.number}`}
                    >
                      {step.number}
                    </span>

                    <span
                      className={`mt-2 flex h-14 w-14 items-center justify-center rounded-full border text-2xl shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 ${style.node}`}
                      aria-hidden
                    >
                      {step.emoji}
                    </span>

                    <h3
                      className={`mt-3 font-display text-sm font-semibold transition-colors duration-300 ${style.title}`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`mt-1 max-w-[9.5rem] text-xs leading-relaxed transition-colors duration-300 ${style.description}`}
                    >
                      {step.description}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
