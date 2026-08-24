import { google } from "googleapis";
import { randomUUID } from "crypto";

import { schedulingConfig } from "@/config/scheduling";

function getOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Google Calendar is not configured (missing env vars).");
  }

  const client = new google.auth.OAuth2({ clientId, clientSecret });
  client.setCredentials({ refresh_token: refreshToken });
  return client;
}

export function isCalendarConfigured() {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN,
  );
}

/** Returns busy [start, end] ranges (as Date objects) between timeMin and timeMax. */
export async function getBusyRanges(
  timeMin: Date,
  timeMax: Date,
): Promise<Array<{ start: Date; end: Date }>> {
  const auth = getOAuthClient();
  const calendar = google.calendar({ version: "v3", auth });

  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      items: [{ id: schedulingConfig.calendarId }],
    },
  });

  const busy = res.data.calendars?.[schedulingConfig.calendarId]?.busy ?? [];
  return busy
    .filter((b) => b.start && b.end)
    .map((b) => ({ start: new Date(b.start as string), end: new Date(b.end as string) }));
}

export async function createBookingEvent(params: {
  start: Date;
  end: Date;
  attendeeEmail: string;
  attendeeName: string;
  company: string;
  notes: string;
}) {
  const auth = getOAuthClient();
  const calendar = google.calendar({ version: "v3", auth });

  const res = await calendar.events.insert({
    calendarId: schedulingConfig.calendarId,
    sendUpdates: "all",
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Salesforce conversation: ${params.attendeeName} (${params.company})`,
      description: params.notes,
      start: { dateTime: params.start.toISOString() },
      end: { dateTime: params.end.toISOString() },
      attendees: [{ email: params.attendeeEmail, displayName: params.attendeeName }],
      conferenceData: {
        createRequest: {
          requestId: randomUUID(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
  });

  return res.data;
}
