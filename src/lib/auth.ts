import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const SESSION_COOKIE = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12h
const SCRYPT_KEYLEN = 64;

function getSessionSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not configured.");
  }
  return new TextEncoder().encode(secret);
}

/** Format: `<salt-hex>:<hash-hex>`. Run once to generate `ADMIN_PASSWORD_HASH`. */
export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, SCRYPT_KEYLEN);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;

  const salt = Buffer.from(saltHex, "hex");
  const expected = Buffer.from(hashHex, "hex");
  const actual = scryptSync(password, salt, SCRYPT_KEYLEN);

  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD_HASH && process.env.SESSION_SECRET);
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSessionSecret());
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function setSessionCookie(): Promise<void> {
  const token = await createSessionToken();
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function hasAdminSession(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

/** Call at the top of every admin server action — proxy.ts guards pages, but
 * server functions aren't reliably covered by a proxy matcher, so each
 * mutation re-checks the session itself. */
export async function requireAdminSession(): Promise<void> {
  if (!(await hasAdminSession())) {
    throw new Error("Not authenticated.");
  }
}

export { SESSION_COOKIE };

const attempts = new Map<string, { count: number; lockedUntil: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000;

/** Best-effort, per-instance brute-force friction — not distributed, but this
 * is a single-owner site, not a multi-tenant login endpoint. */
export function isLockedOut(key: string): boolean {
  const entry = attempts.get(key);
  return Boolean(entry && entry.lockedUntil > Date.now());
}

export function recordFailedAttempt(key: string): void {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.lockedUntil < now) {
    attempts.set(key, { count: 1, lockedUntil: 0 });
    return;
  }
  const count = entry.count + 1;
  attempts.set(key, {
    count,
    lockedUntil: count >= MAX_ATTEMPTS ? now + LOCKOUT_MS : 0,
  });
}

export function clearAttempts(key: string): void {
  attempts.delete(key);
}
