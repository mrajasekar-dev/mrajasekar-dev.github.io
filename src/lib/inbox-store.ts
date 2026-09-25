import { randomUUID } from "node:crypto";
import { del, get, list, put } from "@vercel/blob";

export type InquiryKind = "message" | "booking";
export type InquiryStatus = "new" | "replied" | "won" | "archived";

export type Inquiry = {
  id: string;
  kind: InquiryKind;
  status: InquiryStatus;
  createdAt: string;
  name: string;
  email: string;
  company: string;
  /** Free text: the message, or booking notes. */
  body: string;
  /** Which situation the visitor picked, if they came through the triage. */
  topic?: string;
  /** ISO start time, bookings only. */
  slot?: string;
  budget?: string;
  timeline?: string;
};

// One object per inquiry (rather than one JSON array) so two visitors writing
// at the same moment can never overwrite each other.
const PREFIX = "inbox/";

function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readOne(pathname: string): Promise<Inquiry | null> {
  const result = await get(pathname, { access: "private" });
  if (!result) return null;
  return JSON.parse(await new Response(result.stream).text()) as Inquiry;
}

async function writeOne(inquiry: Inquiry): Promise<void> {
  await put(`${PREFIX}${inquiry.id}.json`, JSON.stringify(inquiry), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function recordInquiry(
  input: Omit<Inquiry, "id" | "status" | "createdAt">,
): Promise<Inquiry | null> {
  const inquiry: Inquiry = {
    ...input,
    // Time-sortable id: newest-first listing without reading every object.
    id: `${Date.now().toString(36).padStart(9, "0")}-${randomUUID().slice(0, 8)}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  if (!isBlobConfigured()) {
    console.log("[inbox] Blob not configured; inquiry not persisted", inquiry);
    return null;
  }
  await writeOne(inquiry);
  return inquiry;
}

export async function listInquiries(): Promise<Inquiry[]> {
  if (!isBlobConfigured()) return [];

  const pathnames: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
    pathnames.push(...page.blobs.map((b) => b.pathname));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const records = await Promise.all(pathnames.map((p) => readOne(p).catch(() => null)));
  return records
    .filter((r): r is Inquiry => r !== null)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<void> {
  const existing = await readOne(`${PREFIX}${id}.json`);
  if (!existing) throw new Error("Inquiry not found.");
  await writeOne({ ...existing, status });
}

export async function deleteInquiry(id: string): Promise<void> {
  await del(`${PREFIX}${id}.json`);
}

/** Request-time clock for server components (kept out of render bodies). */
export function currentTime(): number {
  return Date.now();
}
