const legalLinks = [
  { href: "#", label: "Aviso de privacidad" },
  { href: "#", label: "Términos de servicio" },
  { href: "#", label: "Cookies" },
];

const productLinks = [
  { href: "#beneficios", label: "Beneficios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#paquetes", label: "Paquetes" },
  { href: "#contacto", label: "Contacto" },
  { href: "#enterprise", label: "Enterprise" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-deep text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <a href="#inicio" className="font-display text-2xl font-semibold">
            Web<span className="text-accent">Go</span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
            Plataforma de servicios web ágiles para landing pages profesionales,
            alta conversión e integraciones avanzadas.
          </p>
          <p className="mt-4 text-sm font-medium text-white/80">webgo.lat</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
            Producto
          </p>
          <ul className="mt-4 space-y-2.5">
            {productLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
            Legal
          </p>
          <ul className="mt-4 space-y-2.5">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {year} WebGo. Todos los derechos reservados.</p>
          <p>Diseño web ágil · Conversión · Automatización</p>
        </div>
      </div>
    </footer>
  );
}
