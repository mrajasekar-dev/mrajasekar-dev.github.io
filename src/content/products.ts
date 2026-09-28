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
    name: "FocusQuest",
    tagline: "Earn your scroll",
    summary:
      "A Chrome extension that pauses YouTube and social media after your time is up and asks for a 70% quiz score before it gives you more. Ships with 200 scenario-based Salesforce developer questions, or import your own. Everything stays in your browser.",
    href: "/products/focusquest",
    tags: ["Chrome extension", "Manifest V3", "Local-only"],
  },
];
