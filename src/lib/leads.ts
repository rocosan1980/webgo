export type LeadStatus =
  | "nuevo"
  | "contactado"
  | "en_seguimiento"
  | "ganado"
  | "descartado";

export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  packageInterest: string;
  message: string;
  domainStatus?: "yes" | "no" | "";
  domainName?: string;
  notes: string;
  status: LeadStatus;
};

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  en_seguimiento: "En seguimiento",
  ganado: "Ganado",
  descartado: "Descartado",
};
