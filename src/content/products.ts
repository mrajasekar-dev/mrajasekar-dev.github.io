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
    tagline: "Web app",
    summary: "Turn your followers into a pipeline. One list of real people, and who's warm.",
    href: "/products/rolo",
    tags: ["SaaS"],
  },
  {
    name: "Salesforce Daily Quiz",
    tagline: "Chrome extension",
    summary: "A daily Salesforce quiz. Play the ranked challenge or practise privately.",
    href: "/products/salesforce-daily-quiz",
    tags: ["Free"],
  },
];
