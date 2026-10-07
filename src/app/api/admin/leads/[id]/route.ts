import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { LEAD_STATUS_LABELS, LeadStatus } from "@/lib/leads";
import { updateLead } from "@/lib/leads-store";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { ok: false, message: "No autorizado." },
      { status: 401 },
    );
  }

  const { id } = await context.params;
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Solicitud inválida." },
      { status: 400 },
    );
  }

  const patch: { notes?: string; status?: LeadStatus } = {};

  if (
    typeof body === "object" &&
    body !== null &&
    "notes" in body &&
    typeof (body as { notes: unknown }).notes === "string"
  ) {
    patch.notes = (body as { notes: string }).notes;
  }

  if (
    typeof body === "object" &&
    body !== null &&
    "status" in body &&
    typeof (body as { status: unknown }).status === "string" &&
    (body as { status: string }).status in LEAD_STATUS_LABELS
  ) {
    patch.status = (body as { status: LeadStatus }).status;
  }

  if (!("notes" in patch) && !("status" in patch)) {
    return NextResponse.json(
      { ok: false, message: "No hay cambios para aplicar." },
      { status: 400 },
    );
  }

  const lead = await updateLead(id, patch);
  if (!lead) {
    return NextResponse.json(
      { ok: false, message: "Lead no encontrado." },
      { status: 404 },
    );
  }

  return NextResponse.json({ ok: true, lead });
}
