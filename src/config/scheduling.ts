// Single source of truth for booking rules. All times are computed against
// this IANA timezone regardless of the visitor's own timezone.
export const schedulingConfig = {
  timezone: "Asia/Kolkata",
  // 0 = Sunday ... 6 = Saturday
  availableDays: [1, 2, 3, 4, 5] as const,
  startHour: 18, // 6pm IST
  endHour: 22, // 10pm IST
  slotMinutes: 30,
  meetingDurationMinutes: 30,
  minNoticeHours: 24,
  maxAdvanceDays: 21,
  calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
} as const;
