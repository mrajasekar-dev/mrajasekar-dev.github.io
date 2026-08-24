import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// This branch (GitHub Pages) is a static mirror; the canonical site is on
// Vercel via the `vercel` branch. Disallow crawling here entirely so this
// copy never competes with it in search results.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
