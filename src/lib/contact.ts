export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  packageInterest: string;
  message: string;
};

export type ContactFieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s()-]{7,20}$/;

export function validateContactPayload(
  data: Partial<ContactPayload>,
): { ok: true; data: ContactPayload } | { ok: false; errors: ContactFieldErrors } {
  const errors: ContactFieldErrors = {};

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const phone = (data.phone ?? "").trim();
  const packageInterest = (data.packageInterest ?? "").trim();
  const message = (data.message ?? "").trim();

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
    data: { name, email, phone, packageInterest, message },
  };
}
