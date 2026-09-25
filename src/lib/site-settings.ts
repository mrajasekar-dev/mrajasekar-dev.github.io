import { get, put } from "@vercel/blob";

import { primaryCta } from "@/config/site";

export type AvailabilityStatus = "open" | "limited" | "booked";

export type SiteSettings = {
  colors: {
    light: { background: string; foreground: string; brand: string };
    dark: { background: string; foreground: string; brand: string };
  };
  hero: {
    tagline: string;
    ctaLabel: string;
  };
  availability: {
    status: AvailabilityStatus;
    /** Short human line, e.g. "One slot opens mid-November". */
    note: string;
  };
};

// v3 = the minimal redesign. Settings saved under earlier keys were tuned for
// previous designs (palette and headline), so they are deliberately not carried over.
const SETTINGS_PATHNAME = "settings.v3.json";

export const defaultSiteSettings: SiteSettings = {
  colors: {
    light: { background: "#ffffff", foreground: "#0b0b0c", brand: "#1d3a8a" },
    dark: { background: "#0b0b0c", foreground: "#ededed", brand: "#93b0ff" },
  },
  hero: {
    tagline: "I design and build *Salesforce solutions.*",
    ctaLabel: primaryCta.label,
  },
  availability: {
    status: "open",
    note: "",
  },
};

export const availabilityLabels: Record<AvailabilityStatus, string> = {
  open: "Available for projects",
  limited: "Limited availability",
  booked: "Not taking new projects",
};

function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function mergeWithDefaults(partial: Partial<SiteSettings> | null | undefined): SiteSettings {
  return {
    colors: {
      light: { ...defaultSiteSettings.colors.light, ...partial?.colors?.light },
      dark: { ...defaultSiteSettings.colors.dark, ...partial?.colors?.dark },
    },
    hero: { ...defaultSiteSettings.hero, ...partial?.hero },
    availability: { ...defaultSiteSettings.availability, ...partial?.availability },
  };
}

async function readJson(pathname: string): Promise<Partial<SiteSettings> | null> {
  const result = await get(pathname, { access: "private" });
  if (!result) return null;
  const text = await new Response(result.stream).text();
  return JSON.parse(text);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isBlobConfigured()) return defaultSiteSettings;

  try {
    return mergeWithDefaults(await readJson(SETTINGS_PATHNAME));
  } catch {
    return defaultSiteSettings;
  }
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  if (!isBlobConfigured()) {
    throw new Error("Blob storage isn't configured — can't save settings.");
  }

  await put(SETTINGS_PATHNAME, JSON.stringify(settings, null, 2), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
