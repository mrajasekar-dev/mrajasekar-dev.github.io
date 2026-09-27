// Products I've built and run myself.

export type Product = {
  name: string;
  tagline: string;
  summary: string;
  href: string;
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
    name: "Orglore",
    tagline: "Your personal Salesforce query workspace",
    summary:
      "A SOQL query manager for Salesforce professionals: save, organise and run queries against your connected orgs, with a full SOQL reference always at hand.",
    href: "https://orglore.vercel.app",
    tags: ["Salesforce", "SOQL", "Next.js"],
  },
];
