import { schedulingConfig } from "@/config/scheduling";

// India Standard Time is a fixed UTC+5:30 offset with no daylight saving,
// so wall-clock IST <-> UTC conversion is safe to hardcode — no timezone
// library needed.
const IST_OFFSET_MINUTES = 5 * 60 + 30;

export type DateParts = { year: number; month: number; day: number };

function istToUtc(parts: DateParts, hour: number, minute: number): Date {
  const utcMillis =
    Date.UTC(parts.year, parts.month - 1, parts.day, hour, minute) -
    IST_OFFSET_MINUTES * 60 * 1000;
  return new Date(utcMillis);
}

function weekdayOf(parts: DateParts): number {
  return new Date(Date.UTC(parts.year, parts.month - 1, parts.day)).getUTCDay();
}

function addDays(parts: DateParts, days: number): DateParts {
  const d = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
  d.setUTCDate(d.getUTCDate() + days);
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
}

function todayInIst(): DateParts {
  const nowIst = new Date(Date.now() + IST_OFFSET_MINUTES * 60 * 1000);
  return {
    year: nowIst.getUTCFullYear(),
    month: nowIst.getUTCMonth() + 1,
    day: nowIst.getUTCDate(),
  };
}

/** Next bookable weekday dates (IST calendar days), within the configured advance window. */
export function getBookableDates(): DateParts[] {
  const dates: DateParts[] = [];
  const cursor = todayInIst();

  for (let i = 0; i <= schedulingConfig.maxAdvanceDays; i++) {
    const candidate = addDays(cursor, i);
    if ((schedulingConfig.availableDays as readonly number[]).includes(weekdayOf(candidate))) {
      dates.push(candidate);
    }
  }
  return dates;
}

/** All configured slot start times (UTC) for one IST calendar date, honoring minNoticeHours. */
export function getSlotsForDate(parts: DateParts): Date[] {
  const slots: Date[] = [];
  const minStart = new Date(Date.now() + schedulingConfig.minNoticeHours * 60 * 60 * 1000);

  for (
    let minutes = schedulingConfig.startHour * 60;
    minutes < schedulingConfig.endHour * 60;
    minutes += schedulingConfig.slotMinutes
  ) {
    const start = istToUtc(parts, Math.floor(minutes / 60), minutes % 60);
    if (start >= minStart) slots.push(start);
  }
  return slots;
}

export function isDateParts(value: unknown): value is DateParts {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.year === "number" && typeof v.month === "number" && typeof v.day === "number";
}
