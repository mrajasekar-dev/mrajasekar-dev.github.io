// Products I've built and run myself.

export type Product = {
  name: string;
  tagline: string;
  summary: string;
  /** External URL (opens in a new tab) or an internal path like "/products/x". */
  href: string;
  /** Link text in the card footer. Defaults to the host for external links, "Details" for internal ones. */
  linkLabel?: string;
  tags: string[];
};

export const products: Product[] = [
  {
    name: "Rolo",
    tagline: "Turn your followers into a pipeline",
    summary:
      "Merges LinkedIn, Instagram, X, newsletter, email and event exports into one list of real people, scores who’s warm, and adds a lightweight CRM: inbox, pipeline, follow-ups and lead-capture pages. No scraping; the data never leaves your own exports.",
    href: "https://rolo-ashy.vercel.app",
    tags: ["Next.js", "Local-first", "SaaS"],
  },
  {
    name: "Salesforce Daily Quiz",
    tagline: "A daily Salesforce quiz, right in Chrome",
    summary:
      "Five Salesforce questions a day, the same for everyone. Keep a streak, practise 200 more, and optionally pause social media until you pass a quiz.",
    href: "/products/salesforce-daily-quiz",
    tags: ["Chrome extension", "Manifest V3", "Local-only"],
  },
];
