"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm, type ContactFormState } from "@/lib/actions";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = { status: "idle" };

const selectClass =
  "h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20";

export const fieldClass = "h-11 bg-background focus-visible:border-brand focus-visible:ring-brand/20";

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="flex items-baseline justify-between">
        {label}
        {hint ? <span className="text-xs font-normal text-muted-foreground">{hint}</span> : null}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-foreground px-6 text-[0.95rem] font-medium text-background transition-colors hover:bg-foreground/85 disabled:opacity-60 sm:w-auto"
    >
      {pending ? "Sending…" : "Send message"}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
    </button>
  );
}

export function ContactForm({ topics, defaultTopic }: { topics: { id: string; label: string }[]; defaultTopic?: string }) {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const err = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-3 rounded-lg border border-rule bg-background p-8">
        <CheckCircle2 className="size-6 text-ok" aria-hidden />
        <p className="display text-3xl">Message received.</p>
        <p className="text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={err.name}>
          <Input id="name" name="name" autoComplete="name" required aria-invalid={!!err.name} className={fieldClass} />
        </Field>
        <Field id="email" label="Work email" error={err.email}>
          <Input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!err.email} className={fieldClass} />
        </Field>
        <Field id="company" label="Company" error={err.company}>
          <Input id="company" name="company" autoComplete="organization" required aria-invalid={!!err.company} className={fieldClass} />
        </Field>
        <Field id="topic" label="Topic">
          <select id="topic" name="topic" defaultValue={topics.find((t) => t.id === defaultTopic)?.label ?? ""} className={selectClass}>
            <option value="">Choose one (optional)</option>
            {topics.map((t) => (
              <option key={t.id} value={t.label}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Message" error={err.message}>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={!!err.message}
          placeholder="A few sentences about the project."
          className="bg-background focus-visible:border-brand focus-visible:ring-brand/20"
        />
      </Field>

      {state.status === "error" && state.message ? (
        <p role="alert" className={cn("text-sm text-destructive")}>
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-rule pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">Used only to reply to you. Never shared.</p>
        <SubmitButton />
      </div>
    </form>
  );
}
