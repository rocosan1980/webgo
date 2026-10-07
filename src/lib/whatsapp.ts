export const WHATSAPP_NUMBER = "5215512345678"; // Reemplazar con el número real (código país + número)

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola WebGo, quiero lanzar mi landing page. ¿Me ayudan a definir la mejor estrategia?";

const PACKAGE_LABELS: Record<string, string> = {
  Express: "Express",
  Dinamico: "Dinámico",
  Profesional: "Profesional",
  Enterprise: "Enterprise",
};

export function getWhatsAppHref(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildContactWhatsAppMessage(data: {
  name: string;
  email: string;
  phone: string;
  packageInterest: string;
  message?: string;
  domainStatus?: "yes" | "no" | "";
  domainName?: string;
  contactPreference?: "telefono" | "correo" | "whatsapp" | "";
  preferredSchedule?: string;
}) {
  const packageName =
    PACKAGE_LABELS[data.packageInterest] ?? data.packageInterest;

  let text = `Hola, mi nombre es ${data.name}, me interesa el paquete ${packageName} y me gustaría afinar los detalles de mi proyecto en WebGo.`;

  if (data.phone.trim()) {
    text += ` Mi WhatsApp/teléfono es ${data.phone.trim()}.`;
  }
  if (data.email.trim()) {
    text += ` Correo: ${data.email.trim()}.`;
  }

  if (data.contactPreference === "telefono") {
    text += " Prefiero que me contacten por teléfono.";
  } else if (data.contactPreference === "correo") {
    text += " Prefiero que me contacten por correo.";
  } else if (data.contactPreference === "whatsapp") {
    text += " Prefiero que me contacten por WhatsApp.";
  }

  if (data.preferredSchedule?.trim()) {
    text += ` Mejor horario de contacto: ${data.preferredSchedule.trim()}.`;
  }

  if (data.domainStatus === "no") {
    text += " No cuento con dominio.";
  } else if (data.domainStatus === "yes") {
    const domain = data.domainName?.trim();
    text += domain
      ? ` Cuento con el dominio ${domain}.`
      : " Sí cuento con dominio.";
  }

  if (data.message?.trim()) {
    text += ` Detalle: ${data.message.trim()}`;
  }

  return text;
}
