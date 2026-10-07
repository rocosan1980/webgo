export type DomainStatus = "yes" | "no" | "";

export type ContactPreference = "telefono" | "correo" | "whatsapp" | "";

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  packageInterest: string;
  message: string;
  domainStatus: DomainStatus;
  domainName: string;
  contactPreference: ContactPreference;
  preferredSchedule: string;
};

export type ContactFieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s()-]{7,20}$/;

const CONTACT_PREFERENCE_LABELS: Record<
  Exclude<ContactPreference, "">,
  string
> = {
  telefono: "Teléfono",
  correo: "Correo",
  whatsapp: "WhatsApp",
};

export function formatDomainSummary(data: {
  domainStatus?: DomainStatus | string;
  domainName?: string;
}): string {
  if (data.domainStatus === "no") {
    return "No cuento con dominio";
  }

  if (data.domainStatus === "yes") {
    const name = (data.domainName ?? "").trim();
    return name ? name : "Sí (sin especificar)";
  }

  return "No indicado";
}

export function formatContactPreference(
  value?: ContactPreference | string,
): string {
  if (value === "telefono" || value === "correo" || value === "whatsapp") {
    return CONTACT_PREFERENCE_LABELS[value];
  }
  return "No indicado";
}

export function validateContactPayload(
  data: Partial<ContactPayload> & Record<string, unknown>,
): { ok: true; data: ContactPayload } | { ok: false; errors: ContactFieldErrors } {
  const errors: ContactFieldErrors = {};

  const name = (data.name ?? "").toString().trim();
  const email = (data.email ?? "").toString().trim();
  const phone = (data.phone ?? "").toString().trim();
  const packageInterest = (data.packageInterest ?? "").toString().trim();
  const message = (data.message ?? "").toString().trim();
  const preferredSchedule = (data.preferredSchedule ?? "").toString().trim();

  const rawDomainStatus = (data.domainStatus ?? "").toString().trim();
  const domainStatus: DomainStatus =
    rawDomainStatus === "yes" || rawDomainStatus === "no"
      ? rawDomainStatus
      : "";
  const domainName =
    domainStatus === "yes"
      ? (data.domainName ?? "").toString().trim()
      : "";

  const rawPreference = (data.contactPreference ?? "").toString().trim();
  const contactPreference: ContactPreference =
    rawPreference === "telefono" ||
    rawPreference === "correo" ||
    rawPreference === "whatsapp"
      ? rawPreference
      : "";

  if (name.length < 2) {
    errors.name = "Ingresa tu nombre completo.";
  }

  if (!EMAIL_REGEX.test(email)) {
    errors.email = "Ingresa un correo válido.";
  }

  if (!PHONE_REGEX.test(phone)) {
    errors.phone = "Ingresa un teléfono válido.";
  }

  if (!packageInterest) {
    errors.packageInterest = "Selecciona un paquete de interés.";
  }

  if (message.length < 10) {
    errors.message = "Cuéntanos un poco más (mínimo 10 caracteres).";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      phone,
      packageInterest,
      message,
      domainStatus,
      domainName,
      contactPreference,
      preferredSchedule,
    },
  };
}
