"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, CalendarCheck2, Clock, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fieldClass } from "@/components/contact-form";
import { getBookableDates, type DateParts } from "@/lib/scheduling";
import { cn } from "@/lib/utils";

const utc = (p: DateParts) => new Date(Date.UTC(p.year, p.month - 1, p.day));
const fmtDay = (p: DateParts, o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...o }).format(utc(p));
const timeLabel = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
const longLabel = (iso: string) =>
  new Date(iso).toLocaleString([], { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" });
const same = (a: DateParts | null, b: DateParts) => !!a && a.year === b.year && a.month === b.month && a.day === b.day;

type Step = "date" | "details" | "done";

export function Scheduler({ topics, defaultTopic }: { topics: { id: string; label: string }[]; defaultTopic?: string }) {
  const dates = useMemo(() => getBookableDates(), []);
  const [selectedDate, setSelectedDate] = useState<DateParts | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("date");
  const [submitting, setSubmitting] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    company: "",
    notes: "",
    topic: topics.find((t) => t.id === defaultTopic)?.label ?? "",
    website: "",
  });
  const set = (k: keyof typeof fields) => (e: { target: { value: string } }) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const localTimezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " "), []);

  async function pickDate(parts: DateParts) {
    setSelectedDate(parts);
    setSelectedSlot(null);
    setLoadingSlots(true);
    setSlotsError(null);
    try {
      const res = await fetch(`/api/availability?year=${parts.year}&month=${parts.month}&day=${parts.day}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't load times.");
      setSlots(data.slots);
    } catch (err) {
      setSlotsError(err instanceof Error ? err.message : "Couldn't load times.");
    } finally {
      setLoadingSlots(false);
    }
  }

  async function submitBooking() {
    if (!selectedSlot) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, topic: fields.topic || undefined, slot: selectedSlot }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      toast.success("Call booked", { description: `Invite sent to ${fields.email}.` });
      setStep("done");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "done" && selectedSlot) {
    return (
      <div role="status" className="rounded-lg border border-rule bg-background p-8">
        <CalendarCheck2 className="size-7 text-ok" aria-hidden />
        <p className="display mt-4 text-3xl">You&rsquo;re booked.</p>
        <p className="mt-2 text-lg">{longLabel(selectedSlot)}</p>
        <p className="annot mt-1">{localTimezone}</p>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
          A calendar invite with a Google Meet link is on its way to {fields.email}.
        </p>
      </div>
    );
  }

  const stepIndex = step === "date" ? (selectedDate ? 1 : 0) : 2;

  return (
    <div>
      <ol className="mb-8 grid grid-cols-3 gap-2" aria-label="Booking steps">
        {["Day", "Time", "Details"].map((s, i) => (
          <li key={s} className="flex flex-col gap-2" aria-current={i === stepIndex ? "step" : undefined}>
            <span className={cn("h-0.5 rounded-full", i <= stepIndex ? "bg-brand" : "bg-rule")} />
            <span className={cn("annot", i === stepIndex && "text-foreground")}>
              {String(i + 1).padStart(2, "0")} · {s}
            </span>
          </li>
        ))}
      </ol>

      {step === "date" ? (
        <div className="flex flex-col gap-8">
          <div>
            <p className="mb-3 text-sm font-medium">Choose a day</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {dates.map((d) => {
                const active = same(selectedDate, d);
                return (
                  <button
                    key={`${d.year}-${d.month}-${d.day}`}
                    type="button"
                    onClick={() => pickDate(d)}
                    aria-pressed={active}
                    className={cn(
                      "flex flex-col items-start rounded-md border px-3 py-2.5 text-left transition-colors",
                      active ? "border-foreground bg-foreground text-background" : "border-rule bg-background hover:border-foreground/40",
                    )}
                  >
                    <span className={cn("annot", active && "text-background/60")}>{fmtDay(d, { weekday: "short" })}</span>
                    <span className="display text-2xl leading-tight">{fmtDay(d, { day: "numeric" })}</span>
                    <span className={cn("text-xs", active ? "text-background/70" : "text-muted-foreground")}>
                      {fmtDay(d, { month: "short" })}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedDate ? (
            <div>
              <p className="mb-3 flex flex-wrap items-baseline justify-between gap-2 text-sm font-medium">
                Choose a time
                <span className="annot flex items-center gap-1.5">
                  <Clock className="size-3" aria-hidden /> {localTimezone}
                </span>
              </p>
              {loadingSlots ? (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" aria-hidden /> Checking the calendar…
                </p>
              ) : slotsError ? (
                <p className="text-sm text-destructive">{slotsError}</p>
              ) : slots.length === 0 ? (
                <p className="text-sm text-muted-foreground">No open times that day. Try another date.</p>
              ) : (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {slots.map((iso) => (
                    <button
                      key={iso}
                      type="button"
                      onClick={() => {
                        setSelectedSlot(iso);
                        setStep("details");
                      }}
                      className="rounded-md border border-rule bg-background px-3 py-2.5 text-sm font-medium tabular-nums transition-colors hover:border-brand hover:text-brand"
                    >
                      {timeLabel(iso)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      ) : null}

      {step === "details" && selectedSlot ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitBooking();
          }}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-rule bg-background px-4 py-3">
            <div>
              <p className="font-medium">{longLabel(selectedSlot)}</p>
              <p className="annot">30 min · Google Meet · {localTimezone}</p>
            </div>
            <button type="button" onClick={() => setStep("date")} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-3.5" aria-hidden /> Change
            </button>
          </div>

          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label htmlFor="booking-website">Website</label>
            <input id="booking-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={fields.website} onChange={set("website")} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="booking-name">Name</Label>
              <Input id="booking-name" required autoComplete="name" value={fields.name} onChange={set("name")} className={fieldClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="booking-email">Work email</Label>
              <Input id="booking-email" type="email" required autoComplete="email" value={fields.email} onChange={set("email")} className={fieldClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="booking-company">Company</Label>
              <Input id="booking-company" required autoComplete="organization" value={fields.company} onChange={set("company")} className={fieldClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="booking-topic">Topic</Label>
              <select
                id="booking-topic"
                value={fields.topic}
                onChange={set("topic")}
                className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20"
              >
                <option value="">Choose one (optional)</option>
                {topics.map((t) => (
                  <option key={t.id} value={t.label}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="booking-notes">Anything I should read beforehand? (optional)</Label>
            <Textarea id="booking-notes" rows={3} value={fields.notes} onChange={set("notes")} className="bg-background focus-visible:border-brand focus-visible:ring-brand/20" />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex h-12 items-center justify-center gap-2 self-start rounded-md bg-foreground px-6 font-medium text-background transition-colors hover:bg-foreground/85 disabled:opacity-60"
          >
            {submitting ? "Booking…" : "Confirm booking"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </button>
        </form>
      ) : null}
    </div>
  );
}
