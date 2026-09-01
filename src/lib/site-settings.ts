import { get, put } from "@vercel/blob";

import { siteConfig, primaryCta } from "@/config/site";

export type SiteSettings = {
  colors: {
    light: { background: string; foreground: string; brand: string };
    dark: { background: string; foreground: string; brand: string };
  };
  hero: {
    tagline: string;
    ctaLabel: string;
  };
};

const SETTINGS_PATHNAME = "settings.json";

// Hex approximations of the oklch values in globals.css, so the site looks
// the same as it does today until someone actually edits these in /admin.
export const defaultSiteSettings: SiteSettings = {
  colors: {
    light: { background: "#f8f6f3", foreground: "#2a2826", brand: "#3a5a95" },
    dark: { background: "#201f1d", foreground: "#f0eeea", brand: "#92aee0" },
  },
  hero: {
    tagline: siteConfig.tagline,
    ctaLabel: primaryCta.label,
  },
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
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isBlobConfigured()) return defaultSiteSettings;

  try {
    const result = await get(SETTINGS_PATHNAME, { access: "private" });
    if (!result) return defaultSiteSettings;

    const text = await new Response(result.stream).text();
    return mergeWithDefaults(JSON.parse(text));
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
