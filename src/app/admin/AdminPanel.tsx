"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  formatContactPreference,
  formatDomainSummary,
} from "@/lib/contact";
import { LEAD_STATUS_LABELS, Lead, LeadStatus } from "@/lib/leads";

const PACKAGE_LABELS: Record<string, string> = {
  Express: "Express",
  Dinamico: "Dinámico",
  Profesional: "Profesional",
  Enterprise: "Enterprise",
};

function formatDateTime(iso: string) {
  try {
    return new Intl.DateTimeFormat("es-MX", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setNotice("");
    try {
      const response = await fetch("/api/admin/leads", { cache: "no-store" });
      if (response.status === 401) {
        setAuthed(false);
        setLeads([]);
        return;
      }
      const data = (await response.json()) as {
        ok: boolean;
        leads?: Lead[];
        message?: string;
      };
      if (!response.ok || !data.ok) {
        setNotice(data.message ?? "No se pudieron cargar los prospectos.");
        return;
      }
      setAuthed(true);
      setLeads(data.leads ?? []);
    } catch {
      setNotice("Error de red al cargar prospectos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadLeads();
  }, [loadLeads]);

  const onLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoginError("");
    setLoading(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { ok: boolean; message?: string };
      if (!response.ok || !data.ok) {
        setLoginError(data.message ?? "No se pudo iniciar sesión.");
        setAuthed(false);
        return;
      }
      setPassword("");
      setAuthed(true);
      await loadLeads();
    } catch {
      setLoginError("Error de red al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setLeads([]);
  };

  const persistLead = async (
    id: string,
    patch: { notes?: string; status?: LeadStatus },
  ) => {
    setSavingId(id);
    setNotice("");
    try {
      const response = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = (await response.json()) as {
        ok: boolean;
        lead?: Lead;
        message?: string;
      };
      if (!response.ok || !data.ok || !data.lead) {
        setNotice(data.message ?? "No se pudo guardar el cambio.");
        return;
      }
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? data.lead! : lead)),
      );
    } catch {
      setNotice("Error de red al guardar.");
    } finally {
      setSavingId(null);
    }
  };

  const statusOptions = useMemo(
    () => Object.entries(LEAD_STATUS_LABELS) as [LeadStatus, string][],
    [],
  );

  if (authed === null) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-5">
        <p className="text-sm text-muted">Cargando panel...</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-16">
        <div className="rounded-2xl border border-line bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            WebGo Admin
          </p>
          <h1 className="mt-3 font-display text-2xl font-semibold text-ink-deep">
            Panel de prospectos
          </h1>
          <p className="mt-2 text-sm text-muted">
            Acceso protegido para seguimiento comercial.
          </p>
          <form onSubmit={onLogin} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-foreground">
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-md border border-line px-3.5 py-3 text-sm outline-none focus:border-accent"
                autoComplete="current-password"
                required
              />
            </label>
            {loginError ? (
              <p className="text-sm text-red-600">{loginError}</p>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-md bg-ink-deep px-4 py-3 text-sm font-semibold text-white hover:bg-accent-strong disabled:opacity-70"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Administración
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink-deep">
            Prospectos de contacto
          </h1>
          <p className="mt-2 text-sm text-muted">
            {leads.length} registro{leads.length === 1 ? "" : "s"} · notas y
            estatus editables
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void loadLeads()}
            className="rounded-md border border-line bg-white px-4 py-2.5 text-sm font-semibold text-foreground hover:border-accent/40"
          >
            Actualizar
          </button>
          <button
            type="button"
            onClick={() => void onLogout()}
            className="rounded-md bg-ink-deep px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-strong"
          >
            Salir
          </button>
        </div>
      </header>

      {notice ? (
        <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          {notice}
        </p>
      ) : null}

      <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-line bg-slate-50 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Fecha y hora</th>
              <th className="px-4 py-3 font-semibold">Nombre</th>
              <th className="px-4 py-3 font-semibold">Teléfono / WhatsApp</th>
              <th className="px-4 py-3 font-semibold">Correo</th>
              <th className="px-4 py-3 font-semibold">Paquete</th>
              <th className="px-4 py-3 font-semibold">Estatus</th>
              <th className="min-w-[220px] px-4 py-3 font-semibold">Notas</th>
            </tr>
          </thead>
          <tbody>
            {loading && leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted">
                  Cargando prospectos...
                </td>
              </tr>
            ) : null}
            {!loading && leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted">
                  Aún no hay registros. Los envíos del formulario aparecerán
                  aquí.
                </td>
              </tr>
            ) : null}
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-line/70 align-top">
                <td className="whitespace-nowrap px-4 py-4 text-muted">
                  {formatDateTime(lead.createdAt)}
                </td>
                <td className="px-4 py-4 font-medium text-ink-deep">
                  {lead.name}
                  {lead.message ? (
                    <p className="mt-1 max-w-[16rem] text-xs font-normal text-muted">
                      {lead.message}
                    </p>
                  ) : null}
                </td>
                <td className="px-4 py-4">
                  <a
                    href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-strong hover:underline"
                  >
                    {lead.phone}
                  </a>
                </td>
                <td className="px-4 py-4">
                  <a
                    href={`mailto:${lead.email}`}
                    className="text-foreground hover:underline"
                  >
                    {lead.email}
                  </a>
                </td>
                <td className="px-4 py-4">
                  <div>
                    {PACKAGE_LABELS[lead.packageInterest] ??
                      lead.packageInterest}
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    Contacto: {formatContactPreference(lead.contactPreference)}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    Horario: {lead.preferredSchedule?.trim() || "No indicado"}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    Dominio: {formatDomainSummary(lead)}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <select
                    value={lead.status}
                    disabled={savingId === lead.id}
                    onChange={(event) =>
                      void persistLead(lead.id, {
                        status: event.target.value as LeadStatus,
                      })
                    }
                    className="w-full min-w-[9rem] rounded-md border border-line bg-white px-2.5 py-2 text-sm outline-none focus:border-accent"
                  >
                    {statusOptions.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-4">
                  <textarea
                    defaultValue={lead.notes}
                    key={`${lead.id}-${lead.notes}`}
                    rows={3}
                    disabled={savingId === lead.id}
                    onBlur={(event) => {
                      const next = event.target.value;
                      if (next !== lead.notes) {
                        void persistLead(lead.id, { notes: next });
                      }
                    }}
                    placeholder="Observaciones de seguimiento..."
                    className="w-full min-w-[14rem] resize-y rounded-md border border-line bg-white px-2.5 py-2 text-sm outline-none focus:border-accent"
                  />
                  {savingId === lead.id ? (
                    <p className="mt-1 text-[11px] text-muted">Guardando...</p>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
