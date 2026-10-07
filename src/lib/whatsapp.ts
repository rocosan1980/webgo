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
  if (data.message?.trim()) {
    text += ` Detalle: ${data.message.trim()}`;
  }

  return text;
}
