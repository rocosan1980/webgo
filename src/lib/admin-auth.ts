import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "webgo_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 horas

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "webgo-admin";
}

function getAdminSecret() {
  return process.env.ADMIN_SECRET ?? process.env.ADMIN_PASSWORD ?? "webgo-secret";
}

export function verifyAdminPassword(password: string) {
  const expected = getAdminPassword();
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function sign(value: string) {
  return createHmac("sha256", getAdminSecret()).update(value).digest("hex");
}

export function createAdminSessionToken() {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `ok.${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

export function isValidAdminSessionToken(token: string | undefined | null) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [flag, expiresRaw, signature] = parts;
  if (flag !== "ok") return false;
  const expiresAt = Number(expiresRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;
  const payload = `${flag}.${expiresRaw}`;
  const expected = sign(payload);
  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  return isValidAdminSessionToken(jar.get(ADMIN_COOKIE)?.value);
}

export function adminCookieOptions(maxAgeSeconds = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
