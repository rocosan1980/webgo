import { Resend } from "resend";
import type { ContactPayload } from "@/lib/contact";

const PACKAGE_LABELS: Record<string, string> = {
  Express: "Express",
  Dinamico: "Dinámico",
  Profesional: "Profesional",
  Enterprise: "Enterprise",
};

function getResendApiKey() {
  return (
    process.env.RESEND_API_KEY_WEBGO?.trim() ||
    process.env.RESEND_API_KEY?.trim() ||
    ""
  );
}

function getNotifyTo(): string[] {
  const raw =
    process.env.CONTACT_NOTIFY_EMAIL_WEBGO?.trim() ||
    process.env.CONTACT_NOTIFY_EMAIL?.trim() ||
    "";

  return raw
    .split(/[,;\s]+/)
    .map((email) => email.trim())
    .filter(Boolean);
}

function getFromEmail() {
  return (
    process.env.RESEND_FROM_EMAIL_WEBGO?.trim() ||
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "WebGo <onboarding@resend.dev>"
  );
}

function formatDateTime(date = new Date()) {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Mexico_City",
  }).format(date);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/**
 * Envía alerta de nuevo lead por Resend (configuración aislada de WebGo).
 * Best-effort: nunca lanza errores al caller.
 */
export async function sendContactLeadEmail(data: ContactPayload) {
  const apiKey = getResendApiKey();
  const to = getNotifyTo();

  if (!apiKey || to.length === 0) {
    console.warn(
      "[WebGo] Resend omitido: falta RESEND_API_KEY_WEBGO/RESEND_API_KEY o CONTACT_NOTIFY_EMAIL_WEBGO.",
    );
    return { sent: false as const, reason: "missing_config" };
  }

  const packageName =
    PACKAGE_LABELS[data.packageInterest] ?? data.packageInterest;
  const when = formatDateTime();
  const resend = new Resend(apiKey);
  const safe = {
    name: escapeHtml(data.name),
    phone: escapeHtml(data.phone),
    email: escapeHtml(data.email),
    packageName: escapeHtml(packageName),
    message: escapeHtml(data.message),
    when: escapeHtml(when),
  };

  try {
    const { error } = await resend.emails.send({
      from: getFromEmail(),
      to,
      replyTo: data.email,
      subject: `Nuevo prospecto WebGo · ${packageName} · ${data.name}`,
      text: [
        "Nuevo lead desde webgo.lat",
        "",
        `Fecha y hora: ${when}`,
        `Nombre: ${data.name}`,
        `Teléfono / WhatsApp: ${data.phone}`,
        `Correo: ${data.email}`,
        `Paquete seleccionado: ${packageName}`,
        "",
        "Mensaje:",
        data.message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0b1426">
          <h2 style="margin:0 0 12px">Nuevo prospecto WebGo</h2>
          <p style="margin:0 0 16px;color:#5a6578">Registro desde el formulario de webgo.lat</p>
          <table style="border-collapse:collapse;width:100%;max-width:560px">
            <tr><td style="padding:8px 0;color:#5a6578">Fecha y hora</td><td style="padding:8px 0"><strong>${safe.when}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#5a6578">Nombre</td><td style="padding:8px 0"><strong>${safe.name}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#5a6578">Teléfono / WhatsApp</td><td style="padding:8px 0"><strong>${safe.phone}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#5a6578">Correo</td><td style="padding:8px 0"><strong>${safe.email}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#5a6578">Paquete</td><td style="padding:8px 0"><strong>${safe.packageName}</strong></td></tr>
          </table>
          <p style="margin:20px 0 6px;color:#5a6578">Mensaje</p>
          <p style="margin:0;white-space:pre-wrap">${safe.message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[WebGo] Resend error:", error);
      return { sent: false as const, reason: "provider_error" };
    }

    return { sent: true as const };
  } catch (error) {
    console.error("[WebGo] Resend exception:", error);
    return { sent: false as const, reason: "exception" };
  }
}
