import { NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/contact";
import { createLead } from "@/lib/leads-store";
import { sendContactLeadEmail } from "@/lib/resend-webgo";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "El cuerpo de la solicitud no es válido." },
      { status: 400 },
    );
  }

  const result = validateContactPayload(
    typeof body === "object" && body !== null
      ? (body as Record<string, string>)
      : {},
  );

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "Revisa los campos del formulario.",
        errors: result.errors,
      },
      { status: 400 },
    );
  }

  try {
    await createLead(result.data);
  } catch (error) {
    console.error("[WebGo] Error al guardar lead:", error);
    return NextResponse.json(
      {
        ok: false,
        message: "No pudimos registrar tu solicitud. Inténtalo de nuevo.",
      },
      { status: 500 },
    );
  }

  // Best-effort: el correo no debe romper el flujo de WhatsApp/registro.
  void sendContactLeadEmail(result.data);

  return NextResponse.json({
    ok: true,
    message:
      "Recibimos tu solicitud. Te contactaremos pronto para avanzar tu proyecto.",
  });
}
