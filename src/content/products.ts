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
];
