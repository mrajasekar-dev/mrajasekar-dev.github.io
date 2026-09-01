"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SiteSettings } from "@/lib/site-settings";
import { saveSettingsAction, type SettingsState } from "@/lib/admin-actions";

const initialState: SettingsState = { status: "idle" };

function ColorField({ id, label, defaultValue }: { id: string; label: string; defaultValue: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
      <Label htmlFor={id} className="text-sm">
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          name={id}
          type="color"
          defaultValue={defaultValue}
          className="size-8 cursor-pointer rounded-md border border-input bg-transparent p-0.5"
        />
        <span className="font-mono text-xs text-muted-foreground">{defaultValue}</span>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving…" : "Save changes"}
    </Button>
  );
}

export function AppearanceForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction] = useActionState(saveSettingsAction, initialState);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-10">
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Light mode
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <ColorField id="light-background" label="Background" defaultValue={settings.colors.light.background} />
          <ColorField id="light-foreground" label="Foreground" defaultValue={settings.colors.light.foreground} />
          <ColorField id="light-brand" label="Brand accent" defaultValue={settings.colors.light.brand} />
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Dark mode
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <ColorField id="dark-background" label="Background" defaultValue={settings.colors.dark.background} />
          <ColorField id="dark-foreground" label="Foreground" defaultValue={settings.colors.dark.foreground} />
          <ColorField id="dark-brand" label="Brand accent" defaultValue={settings.colors.dark.brand} />
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Homepage hero
        </h2>
        <div className="mt-3 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tagline">Tagline (the big headline)</Label>
            <Input id="tagline" name="tagline" defaultValue={settings.hero.tagline} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ctaLabel">Primary button label</Label>
            <Input id="ctaLabel" name="ctaLabel" defaultValue={settings.hero.ctaLabel} required />
          </div>
        </div>
      </section>

      {state.status !== "idle" ? (
        <p className={state.status === "error" ? "text-sm text-destructive" : "text-sm text-brand"}>
          {state.message}
        </p>
      ) : null}

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
