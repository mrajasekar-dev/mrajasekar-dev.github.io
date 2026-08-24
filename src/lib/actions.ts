"use server";

import { contactFormSchema } from "@/lib/validations";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<string, string>>;
};

// No email/CRM provider is wired up yet — there are no credentials to send
// this anywhere real. This validates the submission server-side and logs it,
// structured so Resend/HubSpot/Salesforce can replace the log line later
// without changing the form or this action's shape.
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    role: formData.get("role"),
    goal: formData.get("goal"),
    currentSituation: formData.get("currentSituation") || undefined,
    projectSize: formData.get("projectSize") || undefined,
    preferredContact: formData.get("preferredContact") || "either",
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
      message: "Please fix the fields below.",
      fieldErrors,
    };
  }

  console.log("[contact-form]", parsed.data);

  return {
    status: "success",
    message: "Thanks — this has been received. Expect a reply by email shortly.",
  };
}
