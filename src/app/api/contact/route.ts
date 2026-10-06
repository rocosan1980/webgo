import { NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/contact";

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

  // Listo para conectar con CRM, email, WhatsApp Business API o automatizaciones.
  console.info("[WebGo] Nuevo lead de contacto:", result.data);

  return NextResponse.json({
    ok: true,
    message:
      "Recibimos tu solicitud. Te contactaremos pronto para avanzar tu proyecto.",
  });
}
