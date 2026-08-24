import { NextRequest, NextResponse } from "next/server";

import { isCalendarConfigured, getBusyRanges, createBookingEvent } from "@/lib/google-calendar";
import { bookingFormSchema } from "@/lib/validations";
import { schedulingConfig } from "@/config/scheduling";

export async function POST(request: NextRequest) {
  if (!isCalendarConfigured()) {
    return NextResponse.json(
      { error: "Scheduling isn't configured yet." },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = bookingFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
  }

  // Honeypot tripped — pretend success so bots don't learn anything.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const start = new Date(parsed.data.slot);
  const now = new Date();
  const minStart = new Date(now.getTime() + schedulingConfig.minNoticeHours * 60 * 60 * 1000);
  if (start < minStart) {
    return NextResponse.json(
      { error: "That slot no longer has enough notice — please pick another." },
      { status: 409 },
    );
  }

  const end = new Date(start.getTime() + schedulingConfig.meetingDurationMinutes * 60 * 1000);

  try {
    // Re-check right before booking to avoid a race with another visitor.
    const busy = await getBusyRanges(start, end);
    const stillFree = !busy.some((b) => start < b.end && end > b.start);
    if (!stillFree) {
      return NextResponse.json(
        { error: "That slot was just booked — please pick another." },
        { status: 409 },
      );
    }

    await createBookingEvent({
      start,
      end,
      attendeeEmail: parsed.data.email,
      attendeeName: parsed.data.name,
      company: parsed.data.company,
      notes: parsed.data.notes || "No additional notes provided.",
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong booking that slot. Please try again." },
      { status: 502 },
    );
  }
}
