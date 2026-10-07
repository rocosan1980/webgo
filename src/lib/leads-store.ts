import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import {
  LEAD_STATUS_LABELS,
  Lead,
  LeadStatus,
} from "@/lib/leads";

export type { Lead, LeadStatus };
export { LEAD_STATUS_LABELS };

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "leads.json");

async function ensureDb() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, "[]\n", "utf8");
  }
}

async function readLeads(): Promise<Lead[]> {
  await ensureDb();
  const raw = await fs.readFile(DB_FILE, "utf8");
  try {
    const parsed = JSON.parse(raw) as Lead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLeads(leads: Lead[]) {
  await ensureDb();
  const temp = `${DB_FILE}.${process.pid}.tmp`;
  await fs.writeFile(temp, `${JSON.stringify(leads, null, 2)}\n`, "utf8");
  await fs.rename(temp, DB_FILE);
}

export async function listLeads(): Promise<Lead[]> {
  const leads = await readLeads();
  return leads.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function createLead(
  input: Omit<Lead, "id" | "createdAt" | "notes" | "status">,
): Promise<Lead> {
  const leads = await readLeads();
  const lead: Lead = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    notes: "",
    status: "nuevo",
    ...input,
  };
  leads.push(lead);
  await writeLeads(leads);
  return lead;
}

export async function updateLead(
  id: string,
  patch: Partial<Pick<Lead, "notes" | "status">>,
): Promise<Lead | null> {
  const leads = await readLeads();
  const index = leads.findIndex((lead) => lead.id === id);
  if (index === -1) return null;

  const current = leads[index];
  const next: Lead = {
    ...current,
    notes: typeof patch.notes === "string" ? patch.notes : current.notes,
    status:
      patch.status && patch.status in LEAD_STATUS_LABELS
        ? patch.status
        : current.status,
  };

  leads[index] = next;
  await writeLeads(leads);
  return next;
}
