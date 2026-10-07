"use client";

import { ChangeEvent, useState } from "react";
import {
  ContactFieldErrors,
  ContactPayload,
  validateContactPayload,
} from "@/lib/contact";
import {
  buildContactWhatsAppMessage,
  getWhatsAppHref,
} from "@/lib/whatsapp";

const initialForm: ContactPayload = {
  name: "",
  email: "",
  phone: "",
  packageInterest: "",
  message: "",
};

type SubmitMode = "email" | "email_whatsapp";

export default function ContactForm() {
  const [form, setForm] = useState<ContactPayload>(initialForm);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [activeMode, setActiveMode] = useState<SubmitMode | null>(null);
  const [feedback, setFeedback] = useState("");

  const onChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const openWhatsAppChat = (payload: ContactPayload) => {
    const href = getWhatsAppHref(buildContactWhatsAppMessage(payload));
    const popup = window.open(href, "_blank", "noopener,noreferrer");
    if (!popup) {
      window.location.href = href;
    }
  };

  const submitContact = async (mode: SubmitMode) => {
    setFeedback("");
    setActiveMode(mode);

    const validation = validateContactPayload(form);
    if (!validation.ok) {
      setErrors(validation.errors);
      setStatus("error");
      setFeedback("Revisa los campos marcados e inténtalo de nuevo.");
      setActiveMode(null);
      return;
    }

    setStatus("loading");
    setFeedback(
      mode === "email_whatsapp"
        ? "Enviando tu solicitud y preparando WhatsApp..."
        : "Enviando tu mensaje por correo...",
    );

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !result?.ok) {
        setStatus("error");
        setFeedback(
          result?.message ||
            "No pudimos enviar tu solicitud. Inténtalo de nuevo.",
        );
        setActiveMode(null);
        return;
      }

      setErrors({});
      setStatus("success");

      if (mode === "email_whatsapp") {
        setFeedback(
          "¡Mensaje enviado! Te abrimos WhatsApp para continuar la conversación.",
        );
        openWhatsAppChat(validation.data);
      } else {
        setFeedback(
          "¡Mensaje enviado! Te contactaremos pronto por correo.",
        );
      }

      setForm(initialForm);
    } catch {
      setStatus("error");
      setFeedback(
        "No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo.",
      );
    } finally {
      setActiveMode(null);
    }
  };

  const fieldClass =
    "mt-2 w-full rounded-md border border-line bg-surface px-3.5 py-3 text-sm text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted/70 focus:border-accent focus:shadow-[0_0_0_3px_rgba(14,143,159,0.15)]";

  const isLoading = status === "loading";

  return (
    <section id="contacto" className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            Contacto
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink-deep sm:text-4xl">
            Cuéntanos qué quieres lanzar.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Completa el formulario y elige cómo quieres que te contactemos:
            solo por correo, o por correo y WhatsApp al mismo tiempo.
          </p>

          <div className="mt-8 space-y-4 text-sm text-muted">
            <p>
              <span className="font-semibold text-foreground">Email:</span>{" "}
              hola@webgo.lat
            </p>
            <p>
              <span className="font-semibold text-foreground">Web:</span>{" "}
              webgo.lat
            </p>
            <p>
              Tiempo de respuesta habitual:{" "}
              <span className="font-semibold text-foreground">
                de volada por WhatsApp
              </span>
              .
            </p>
          </div>
        </div>

        <form
          onSubmit={(event) => event.preventDefault()}
          noValidate
          className="rounded-2xl border border-line bg-background p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-foreground">
              Nombre
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                autoComplete="name"
                className={fieldClass}
                placeholder="Tu nombre"
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name ? (
                <span className="mt-1.5 block text-xs text-red-600">
                  {errors.name}
                </span>
              ) : null}
            </label>

            <label className="block text-sm font-medium text-foreground">
              Correo
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                autoComplete="email"
                className={fieldClass}
                placeholder="tu@empresa.com"
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? (
                <span className="mt-1.5 block text-xs text-red-600">
                  {errors.email}
                </span>
              ) : null}
            </label>

            <label className="block text-sm font-medium text-foreground">
              Teléfono / WhatsApp
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={onChange}
                autoComplete="tel"
                className={fieldClass}
                placeholder="+52 55 0000 0000"
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone ? (
                <span className="mt-1.5 block text-xs text-red-600">
                  {errors.phone}
                </span>
              ) : null}
            </label>

            <label className="block text-sm font-medium text-foreground">
              Paquete de interés
              <select
                name="packageInterest"
                value={form.packageInterest}
                onChange={onChange}
                className={fieldClass}
                aria-invalid={Boolean(errors.packageInterest)}
              >
                <option value="">Selecciona una opción</option>
                <option value="Express">Express</option>
                <option value="Dinamico">Dinámico</option>
                <option value="Profesional">Profesional</option>
                <option value="Enterprise">Enterprise</option>
              </select>
              {errors.packageInterest ? (
                <span className="mt-1.5 block text-xs text-red-600">
                  {errors.packageInterest}
                </span>
              ) : null}
            </label>
          </div>

          <label className="mt-5 block text-sm font-medium text-foreground">
            Mensaje
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              rows={5}
              className={`${fieldClass} resize-y`}
              placeholder="Cuéntanos sobre tu negocio, objetivo y fecha deseada de lanzamiento."
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message ? (
              <span className="mt-1.5 block text-xs text-red-600">
                {errors.message}
              </span>
            ) : null}
          </label>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => void submitContact("email")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-line bg-surface px-4 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent-strong disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isLoading && activeMode === "email"
                ? "Enviando..."
                : "Enviar mensaje por correo"}
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={() => void submitContact("email_whatsapp")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isLoading && activeMode === "email_whatsapp"
                ? "Enviando y abriendo WhatsApp..."
                : "Enviar correo y abrir WhatsApp"}
            </button>
          </div>

          {feedback ? (
            <div
              role="status"
              className={`mt-4 rounded-md px-3.5 py-3 text-sm leading-relaxed ${
                status === "success"
                  ? "border border-accent/25 bg-accent-soft text-accent-strong"
                  : status === "loading"
                    ? "border border-line bg-surface text-muted"
                    : "border border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {feedback}
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
}
