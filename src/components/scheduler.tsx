"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getBookableDates, type DateParts } from "@/lib/scheduling";
import { cn } from "@/lib/utils";

function dateLabel(parts: DateParts) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(parts.year, parts.month - 1, parts.day)));
}

function timeLabel(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

type Step = "date" | "slot" | "details" | "done";

export function Scheduler() {
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
    website: "",
  });

  const localTimezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

  async function pickDate(parts: DateParts) {
    setSelectedDate(parts);
    setSelectedSlot(null);
    setStep("slot");
    setLoadingSlots(true);
    setSlotsError(null);
    try {
      const res = await fetch(
        `/api/availability?year=${parts.year}&month=${parts.month}&day=${parts.day}`,
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't load times.");
      setSlots(data.slots);
    } catch (err) {
      setSlotsError(err instanceof Error ? err.message : "Couldn't load times.");
    } finally {
      setLoadingSlots(false);
    }
  }

  function pickSlot(iso: string) {
    setSelectedSlot(iso);
    setStep("details");
  }

  async function submitBooking() {
    if (!selectedSlot) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, slot: selectedSlot }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      toast.success("Call booked", {
        description: `You'll get a calendar invite with a Google Meet link at ${fields.email}.`,
      });
      setStep("done");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "done") {
    return (
      <div role="status" className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-lg font-semibold">You&rsquo;re booked.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          A calendar invite with a Google Meet link is on its way to {fields.email}.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label className="mb-2 block">Pick a day</Label>
        <div className="flex flex-wrap gap-2">
          {dates.map((d) => (
            <button
              key={`${d.year}-${d.month}-${d.day}`}
              type="button"
              onClick={() => pickDate(d)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-sm transition-colors",
                selectedDate?.year === d.year &&
                  selectedDate?.month === d.month &&
                  selectedDate?.day === d.day
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-card hover:bg-muted",
              )}
            >
              {dateLabel(d)}
            </button>
          ))}
        </div>
      </div>

      {step !== "date" && selectedDate ? (
        <div>
          <Label className="mb-2 block">
            Pick a time <span className="text-muted-foreground">({localTimezone})</span>
          </Label>
          {loadingSlots ? (
            <p className="text-sm text-muted-foreground">Checking availability…</p>
          ) : slotsError ? (
            <p className="text-sm text-destructive">{slotsError}</p>
          ) : slots.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No open times that day — try another date.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {slots.map((iso) => (
                <button
                  key={iso}
                  type="button"
                  onClick={() => pickSlot(iso)}
                  className={cn(
                    "rounded-md border px-3 py-1.5 text-sm transition-colors",
                    selectedSlot === iso
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-border bg-card hover:bg-muted",
                  )}
                >
                  {timeLabel(iso)}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {step === "details" && selectedSlot ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitBooking();
          }}
          className="flex flex-col gap-4 border-t border-border/70 pt-5"
        >
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label htmlFor="booking-website">Website</label>
            <input
              id="booking-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={fields.website}
              onChange={(e) => setFields((f) => ({ ...f, website: e.target.value }))}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="booking-name">Name</Label>
              <Input
                id="booking-name"
                required
                value={fields.name}
                onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="booking-email">Work email</Label>
              <Input
                id="booking-email"
                type="email"
                required
                value={fields.email}
                onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="booking-company">Company</Label>
              <Input
                id="booking-company"
                required
                value={fields.company}
                onChange={(e) => setFields((f) => ({ ...f, company: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="booking-notes">What would you like to talk through? (optional)</Label>
            <Textarea
              id="booking-notes"
              rows={3}
              value={fields.notes}
              onChange={(e) => setFields((f) => ({ ...f, notes: e.target.value }))}
            />
          </div>
          <Button type="submit" size="lg" disabled={submitting} className="h-11 w-full sm:w-auto">
            {submitting ? "Booking…" : "Confirm booking →"}
          </Button>
        </form>
      ) : null}
    </div>
  );
}
