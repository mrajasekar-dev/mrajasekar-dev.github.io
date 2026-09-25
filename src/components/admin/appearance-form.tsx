"use client";

import { useActionState, useState } from "react";
import { Loader2, RotateCcw } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Emphasis } from "@/components/brief/emphasis";
import { Panel, studioButton } from "@/components/studio/ui";
import { availabilityLabels, defaultSiteSettings, type AvailabilityStatus, type SiteSettings } from "@/lib/site-settings";
import { saveSettingsAction, type SettingsState } from "@/lib/admin-actions";
import { cn } from "@/lib/utils";

const initialState: SettingsState = { status: "idle" };
const input = "bg-background focus-visible:border-brand focus-visible:ring-brand/20";

type Palette = SiteSettings["colors"]["light"];

function ColorField({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-3 rounded-md border border-rule bg-background p-2.5">
      <input id={id} name={id} type="color" value={value} onChange={(e) => onChange(e.target.value)} className="size-8 cursor-pointer rounded border-0 bg-transparent p-0" />
      <span className="flex flex-col">
        <span className="text-sm">{label}</span>
        <span className="font-mono text-xs text-muted-foreground uppercase">{value}</span>
      </span>
    </label>
  );
}

/** A miniature of the public hero, rendered in the palette being edited. */
function PalettePreview({ p, tagline, mode }: { p: Palette; tagline: string; mode: string }) {
  return (
    <div className="overflow-hidden rounded-md border border-rule" style={{ background: p.background, color: p.foreground }}>
      <div className="flex items-center justify-between px-4 py-2 text-[0.6rem] tracking-widest uppercase" style={{ borderBottom: `1px solid ${p.foreground}22`, opacity: 0.7 }}>
        <span>{mode}</span>
        <span>Preview</span>
      </div>
      <div className="p-4">
        <p className="display text-2xl [&_em]:!text-[var(--pv-brand)]" style={{ ["--pv-brand" as string]: p.brand }}>
          <Emphasis text={tagline} />
        </p>
        <div className="mt-3 flex gap-2">
          <span className="rounded px-2.5 py-1 text-[0.65rem] font-medium" style={{ background: p.foreground, color: p.background }}>Book a call</span>
          <span className="rounded px-2.5 py-1 text-[0.65rem] font-medium" style={{ background: p.brand, color: "#fff" }}>Accent</span>
        </div>
      </div>
    </div>
  );
}

export function AppearanceForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, saving] = useActionState(saveSettingsAction, initialState);
  const [light, setLight] = useState(settings.colors.light);
  const [dark, setDark] = useState(settings.colors.dark);
  const [tagline, setTagline] = useState(settings.hero.tagline);
  const [status, setStatus] = useState<AvailabilityStatus>(settings.availability.status);

  return (
    <form action={formAction} className="grid gap-6 lg:grid-cols-2">
      <Panel title="Availability" className="lg:col-span-2">
        <div className="grid gap-5 p-5 lg:grid-cols-3">
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-sm font-medium">Status</legend>
            <input type="hidden" name="availability-status" value={status} />
            {(Object.keys(availabilityLabels) as AvailabilityStatus[]).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={status === s}
                onClick={() => setStatus(s)}
                className={cn(
                  "flex items-center gap-2.5 rounded-md border px-3 py-2.5 text-left text-sm transition-colors",
                  status === s ? "border-foreground bg-foreground text-background" : "border-rule bg-background hover:border-foreground/40",
                )}
              >
                <span className={cn("size-2 rounded-full", s === "open" ? "bg-ok" : s === "limited" ? "bg-amber-500" : "bg-muted-foreground")} />
                {availabilityLabels[s]}
              </button>
            ))}
          </fieldset>
          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="availability-note">Note under the status</Label>
              <Input id="availability-note" name="availability-note" defaultValue={settings.availability.note} maxLength={140} placeholder="e.g. One slot opens mid-November." className={input} />
            </div>
            <p className="text-xs text-muted-foreground">Shown in the header and on the contact page.</p>
          </div>
        </div>
      </Panel>

      <Panel title="Homepage headline">
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tagline">Headline</Label>
            <Input id="tagline" name="tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} required className={input} />
            <p className="text-xs text-muted-foreground">
              Wrap words in <code className="rounded bg-foreground/8 px-1">*asterisks*</code> for the orange italic.
            </p>
          </div>
          <div className="rounded-md border border-rule bg-background p-5">
            <p className="display text-4xl">
              <Emphasis text={tagline || " "} />
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ctaLabel">Primary button label</Label>
            <Input id="ctaLabel" name="ctaLabel" defaultValue={settings.hero.ctaLabel} required className={input} />
          </div>
        </div>
      </Panel>

      <Panel
        title="Palette"
        action={
          <button
            type="button"
            onClick={() => {
              setLight(defaultSiteSettings.colors.light);
              setDark(defaultSiteSettings.colors.dark);
            }}
            className={studioButton.ghost}
          >
            <RotateCcw className="size-3.5" aria-hidden /> Reset
          </button>
        }
      >
        <div className="flex flex-col gap-5 p-5">
          {([
            ["light", light, setLight],
            ["dark", dark, setDark],
          ] as const).map(([mode, p, setP]) => (
            <div key={mode} className="flex flex-col gap-3">
              <p className="annot">{mode} mode</p>
              <div className="grid gap-2 sm:grid-cols-3">
                <ColorField id={`${mode}-background`} label="Paper" value={p.background} onChange={(v) => setP({ ...p, background: v })} />
                <ColorField id={`${mode}-foreground`} label="Ink" value={p.foreground} onChange={(v) => setP({ ...p, foreground: v })} />
                <ColorField id={`${mode}-brand`} label="Signal" value={p.brand} onChange={(v) => setP({ ...p, brand: v })} />
              </div>
              <PalettePreview p={p} tagline={tagline} mode={mode} />
            </div>
          ))}
        </div>
      </Panel>

      <div className="sticky bottom-4 flex items-center justify-between gap-4 rounded-lg border border-rule bg-paper/95 px-5 py-3 shadow-lg backdrop-blur lg:col-span-2">
        <p role="status" className={cn("text-sm", state.status === "error" ? "text-destructive" : "text-muted-foreground")}>
          {state.status === "idle" ? "Unsaved changes stay on this page until you save." : state.message}
        </p>
        <button type="submit" disabled={saving} className={studioButton.ink}>
          {saving ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
