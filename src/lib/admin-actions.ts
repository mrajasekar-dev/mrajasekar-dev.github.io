"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { put } from "@vercel/blob";

import { loginSchema, siteSettingsSchema, postSchema } from "@/lib/validations";
import {
  setSessionCookie,
  clearSessionCookie,
  verifyPassword,
  requireAdminSession,
  isAdminConfigured,
  isLockedOut,
  recordFailedAttempt,
  clearAttempts,
} from "@/lib/auth";
import { saveSiteSettings } from "@/lib/site-settings";
import { savePostRecord, deletePostRecord } from "@/lib/blog-store";
import { getSiteSettings } from "@/lib/site-settings";
import { deleteInquiry, updateInquiryStatus, type InquiryStatus } from "@/lib/inbox-store";

export type LoginState = { status: "idle" | "error"; message?: string };

async function clientKey(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for") ?? h.get("x-real-ip") ?? "unknown";
}

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAdminConfigured()) {
    return { status: "error", message: "Admin login isn't configured yet." };
  }

  const key = await clientKey();
  if (isLockedOut(key)) {
    return { status: "error", message: "Too many attempts — try again in a few minutes." };
  }

  const parsed = loginSchema.safeParse({ password: formData.get("password") });
  if (!parsed.success) {
    return { status: "error", message: "Enter the password." };
  }

  const ok = verifyPassword(parsed.data.password, process.env.ADMIN_PASSWORD_HASH!);
  if (!ok) {
    recordFailedAttempt(key);
    return { status: "error", message: "Incorrect password." };
  }

  clearAttempts(key);
  await setSessionCookie();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/admin/login");
}

export type SettingsState = { status: "idle" | "success" | "error"; message?: string };

export async function saveSettingsAction(
  _prev: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  await requireAdminSession();

  const raw = {
    colors: {
      light: {
        background: formData.get("light-background"),
        foreground: formData.get("light-foreground"),
        brand: formData.get("light-brand"),
      },
      dark: {
        background: formData.get("dark-background"),
        foreground: formData.get("dark-foreground"),
        brand: formData.get("dark-brand"),
      },
    },
    hero: {
      tagline: formData.get("tagline"),
      ctaLabel: formData.get("ctaLabel"),
    },
    availability: {
      status: formData.get("availability-status"),
      note: formData.get("availability-note") ?? "",
    },
  };

  const parsed = siteSettingsSchema.safeParse(raw);
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Check the fields." };
  }

  await saveSiteSettings(parsed.data);
  revalidatePath("/", "layout");

  return { status: "success", message: "Saved. Changes are live." };
}

/** One-click availability switch from the Overview. */
export async function setAvailabilityAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const status = String(formData.get("status"));
  if (status !== "open" && status !== "limited" && status !== "booked") return;
  const current = await getSiteSettings();
  await saveSiteSettings({ ...current, availability: { ...current.availability, status } });
  revalidatePath("/", "layout");
}

const INQUIRY_STATUSES: InquiryStatus[] = ["new", "replied", "won", "archived"];

export async function setInquiryStatusAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status")) as InquiryStatus;
  if (!id || !INQUIRY_STATUSES.includes(status)) return;
  await updateInquiryStatus(id, status);
  revalidatePath("/admin", "layout");
}

export async function deleteInquiryAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deleteInquiry(id);
  revalidatePath("/admin", "layout");
}

export type PostFormState = { status: "idle" | "error"; message?: string };

export async function savePostAction(
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  await requireAdminSession();

  const raw = {
    slug: formData.get("slug"),
    title: formData.get("title"),
    date: formData.get("date"),
    channel: formData.get("channel"),
    excerpt: formData.get("excerpt"),
    coverImage: formData.get("coverImage"),
    coverImageAlt: formData.get("coverImageAlt"),
    content: formData.get("content"),
    published: formData.get("published") === "on",
  };

  const parsed = postSchema.safeParse(raw);
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Check the fields." };
  }

  const originalSlug = String(formData.get("originalSlug") ?? "");
  if (originalSlug && originalSlug !== parsed.data.slug) {
    await deletePostRecord(originalSlug);
    revalidatePath(`/blog/${originalSlug}`);
  }

  await savePostRecord(parsed.data);

  revalidatePath("/blog");
  revalidatePath(`/blog/${parsed.data.slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/");

  if (formData.get("stay") === "1") {
    redirect(`/admin/posts/${parsed.data.slug}/edit?saved=1`);
  }
  redirect("/admin/posts");
}

export async function deletePostAction(formData: FormData): Promise<void> {
  await requireAdminSession();

  const slug = String(formData.get("slug") ?? "");
  if (!slug) return;

  await deletePostRecord(slug);

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");
  redirect("/admin/posts");
}

export type UploadState = { url?: string; error?: string };

export async function uploadCoverImageAction(
  _prev: UploadState,
  formData: FormData,
): Promise<UploadState> {
  await requireAdminSession();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose an image file." };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "That doesn't look like an image." };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { error: "Keep cover images under 5MB." };
  }

  try {
    const blob = await put(`covers/${Date.now()}-${file.name}`, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return { url: blob.url };
  } catch {
    return { error: "Upload failed — try again." };
  }
}
