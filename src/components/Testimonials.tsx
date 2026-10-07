const testimonials = [
  {
    quote:
      "En menos de dos días tenía mi landing lista y con cara profesional. Perfecta para lanzar mi marca personal sin perder tiempo.",
    name: "Ana Rivas",
    role: "Coach independiente · Perfil Express",
  },
  {
    quote:
      "Pasamos de no tener presencia clara a recibir mensajes por WhatsApp todos los días. El diseño vende y se siente de negocio serio.",
    name: "Luis Mendoza",
    role: "Dueño de PyME · Perfil Dinámico",
  },
  {
    quote:
      "Integraron nuestro flujo con CRM y automatizaciones sin fricción. El acompañamiento post-lanzamiento fue clave para escalar captación.",
    name: "Mariana Solís",
    role: "Directora de Operaciones · Perfil Profesional",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-1" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          className="h-4 w-4 fill-current text-amber-400 drop-shadow-[0_1px_1px_rgba(180,83,9,0.25)]"
          aria-hidden
        >
          <path d="M10 1.5l2.35 4.76 5.25.76-3.8 3.7.9 5.24L10 13.77 5.3 15.96l.9-5.24-3.8-3.7 5.25-.76L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="reseñas" className="border-t border-line bg-background">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Confianza real
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink-deep sm:text-4xl">
            Reseñas de clientes satisfechos
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Resultados claros para marcas personales, negocios en crecimiento y
            equipos que necesitan escala.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50/80 p-7 shadow-[0_1px_2px_rgba(11,20,38,0.04)] transition-transform duration-300 hover:-translate-y-0.5 sm:p-8"
            >
              <Stars />
              <blockquote className="mt-5 flex-1 text-[15px] leading-7 text-zinc-600">
                “{item.quote}”
              </blockquote>
              <div className="mt-6 border-t border-zinc-200 pt-5">
                <p className="font-display text-base font-semibold text-ink-deep">
                  {item.name}
                </p>
                <p className="mt-1 text-sm text-zinc-500">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
