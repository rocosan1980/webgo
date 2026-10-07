export const WHATSAPP_NUMBER = "5215512345678"; // Reemplazar con el número real (código país + número)

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola WebGo, quiero lanzar mi landing page. ¿Me ayudan a definir la mejor estrategia?";

export function getWhatsAppHref(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
