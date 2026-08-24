"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

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
import { submitContactForm, type ContactFormState } from "@/lib/actions";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = { status: "idle" };

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      className="h-11 w-full px-6 text-[0.95rem] sm:w-auto"
      disabled={pending}
    >
      {pending ? "Sending…" : "Start a conversation →"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-border bg-card p-8 text-center"
      >
        <p className="text-lg font-semibold">Message received.</p>
        <p className="mt-2 text-sm text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={state.fieldErrors?.name}>
          <Input id="name" name="name" autoComplete="name" required />
        </Field>
        <Field id="email" label="Work email" error={state.fieldErrors?.email}>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field id="company" label="Company" error={state.fieldErrors?.company}>
          <Input id="company" name="company" autoComplete="organization" required />
        </Field>
        <Field id="role" label="Role" error={state.fieldErrors?.role}>
          <Input id="role" name="role" required />
        </Field>
      </div>

      <Field
        id="goal"
        label="What are you trying to accomplish?"
        error={state.fieldErrors?.goal}
      >
        <Textarea id="goal" name="goal" rows={4} required />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="currentSituation" label="Current Salesforce situation (optional)">
          <Textarea id="currentSituation" name="currentSituation" rows={2} />
        </Field>
        <div className="flex flex-col gap-5">
          <Field id="projectSize" label="Approximate project size (optional)">
            <Input id="projectSize" name="projectSize" placeholder="e.g. a few weeks, a quarter" />
          </Field>
          <Field id="preferredContact" label="Preferred contact method">
            <Select name="preferredContact" defaultValue="either">
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

      {state.status === "error" ? (
        <p className={cn("text-sm text-destructive")}>{state.message}</p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
