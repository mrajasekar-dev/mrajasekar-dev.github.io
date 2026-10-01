"use server";

import { revalidatePath } from "next/cache";

import { contactFormSchema } from "@/lib/validations";
import { recordInquiry } from "@/lib/inbox-store";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<string, string>>;
};

function optional(value: FormDataEntryValue | null) {
  return typeof value === "string" && value.trim() ? value : undefined;
}

// Persists to the admin Inbox (Vercel Blob). No outbound email provider is
// configured yet, so the owner sees new inquiries in /admin rather than by mail.
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: optional(formData.get("company")),
    message: formData.get("message"),
    topic: optional(formData.get("topic")),
    budget: optional(formData.get("budget")),
    timeline: optional(formData.get("timeline")),
    website: optional(formData.get("website")),
  };

  const parsed = contactFormSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      status: "error",
      message: "A couple of fields need another look.",
      fieldErrors,
    };
  }

  const { website, message, ...rest } = parsed.data;
  // Honeypot tripped — report success so bots learn nothing.
  if (website) {
    return { status: "success", message: "Thanks — received." };
  }

  try {
    await recordInquiry({ kind: "message", body: message, ...rest });
    revalidatePath("/admin", "layout");
  } catch (err) {
    console.error("[contact-form] failed to persist", err);
    return {
      status: "error",
      message: "That didn't go through on my side. Please email me directly instead.",
    };
  }

  return {
    status: "success",
    message: "Thanks, I'll get back to you by email.",
  };
}
