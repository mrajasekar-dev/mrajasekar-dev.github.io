"use client";

import { useState, type FormEvent, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactFormSchema } from "@/lib/validations";
import { siteConfig } from "@/config/site";

const initialValues = {
  name: "",
  email: "",
  company: "",
  role: "",
  goal: "",
  currentSituation: "",
  projectSize: "",
  preferredContact: "either" as "email" | "linkedin" | "either",
};

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

const contactLabels: Record<string, string> = {
  email: "Email",
  linkedin: "LinkedIn",
  either: "Either",
};

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<string, string>>>({});
  const [sent, setSent] = useState(false);

  function update<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = contactFormSchema.safeParse(values);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    const data = parsed.data;
    const subject = `Salesforce project inquiry from ${data.name} (${data.company})`;
    const bodyLines = [
      `Name: ${data.name}`,
      `Work email: ${data.email}`,
      `Company: ${data.company}`,
      `Role: ${data.role}`,
      "",
      `What they're trying to accomplish: ${data.goal}`,
      data.currentSituation ? `Current Salesforce situation: ${data.currentSituation}` : null,
      data.projectSize ? `Approximate project size: ${data.projectSize}` : null,
      `Preferred contact method: ${contactLabels[data.preferredContact]}`,
    ].filter((line): line is string => line !== null);

    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-lg font-semibold">Your email client should be opening.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Everything you entered has been pre-filled into a message to {siteConfig.email} — just
          review it and hit send.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={fieldErrors.name}>
          <Input
            id="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </Field>
        <Field id="email" label="Work email" error={fieldErrors.email}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </Field>
        <Field id="company" label="Company" error={fieldErrors.company}>
          <Input
            id="company"
            autoComplete="organization"
            required
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </Field>
        <Field id="role" label="Role" error={fieldErrors.role}>
          <Input
            id="role"
            required
            value={values.role}
            onChange={(e) => update("role", e.target.value)}
          />
        </Field>
      </div>

      <Field id="goal" label="What are you trying to accomplish?" error={fieldErrors.goal}>
        <Textarea
          id="goal"
          rows={4}
          required
          value={values.goal}
          onChange={(e) => update("goal", e.target.value)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="currentSituation" label="Current Salesforce situation (optional)">
          <Textarea
            id="currentSituation"
            rows={2}
            value={values.currentSituation}
            onChange={(e) => update("currentSituation", e.target.value)}
          />
        </Field>
        <div className="flex flex-col gap-5">
          <Field id="projectSize" label="Approximate project size (optional)">
            <Input
              id="projectSize"
              placeholder="e.g. a few weeks, a quarter"
              value={values.projectSize}
              onChange={(e) => update("projectSize", e.target.value)}
            />
          </Field>
          <Field id="preferredContact" label="Preferred contact method">
            <Select
              value={values.preferredContact}
              onValueChange={(v) => update("preferredContact", v as typeof values.preferredContact)}
            >
              <SelectTrigger id="preferredContact" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="either">Either</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </div>

      <Button type="submit" size="lg" className="h-11 w-full px-6 text-[0.95rem] sm:w-auto">
        Start a conversation →
      </Button>
    </form>
  );
}
