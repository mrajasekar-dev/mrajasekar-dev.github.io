import { NextRequest, NextResponse } from "next/server";

import { isCalendarConfigured, getBusyRanges } from "@/lib/google-calendar";
import { getSlotsForDate, isDateParts } from "@/lib/scheduling";
import { schedulingConfig } from "@/config/scheduling";

export async function GET(request: NextRequest) {
  if (!isCalendarConfigured()) {
    return NextResponse.json(
      { error: "Scheduling isn't configured yet." },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const parts = {
    year: Number(searchParams.get("year")),
    month: Number(searchParams.get("month")),
    day: Number(searchParams.get("day")),
  };

  if (!isDateParts(parts) || Number.isNaN(parts.year)) {
    return NextResponse.json({ error: "Invalid date." }, { status: 400 });
  }

  const candidateSlots = getSlotsForDate(parts);
  if (candidateSlots.length === 0) {
    return NextResponse.json({ slots: [] });
  }

  const dayStart = candidateSlots[0];
  const dayEnd = new Date(
    candidateSlots[candidateSlots.length - 1].getTime() +
      schedulingConfig.meetingDurationMinutes * 60 * 1000,
  );

  try {
    const busy = await getBusyRanges(dayStart, dayEnd);

    const freeSlots = candidateSlots.filter((slotStart) => {
      const slotEnd = new Date(
        slotStart.getTime() + schedulingConfig.meetingDurationMinutes * 60 * 1000,
      );
      return !busy.some((b) => slotStart < b.end && slotEnd > b.start);
    });

    return NextResponse.json({ slots: freeSlots.map((s) => s.toISOString()) });
  } catch {
    return NextResponse.json(
      { error: "Couldn't check calendar availability." },
      { status: 502 },
    );
  }
}
