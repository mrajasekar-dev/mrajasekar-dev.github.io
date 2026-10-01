// Selected work, from the founder's CV (Sept 2026). Current-employer client work stays off this list.

export type CaseNote = {
  slug: string;
  title: string;
  client: string;
  summary: string;
  tags: string[];
  metric?: { figure: string; label: string };
  /** Live link; the whole card opens it in a new tab. */
  href?: string;
};

export const caseNotes: CaseNote[] = [
  {
    slug: "ev-notifications",
    title: "Event-driven order notifications",
    client: "Indian EV startup · Salesforce",
    summary:
      "SMS, WhatsApp and push notifications on Platform Events.",
    tags: ["Platform Events", "Integration"],
  },
  {
    slug: "sap-sync",
    title: "Two-way SAP–Salesforce sync",
    client: "Automotive · Salesforce",
    summary:
      "A custom Apex REST layer connecting SAP, the mobile app and the website.",
    tags: ["Apex REST", "SAP"],
  },
  {
    slug: "test-coverage",
    title: "Legacy codebase clean-up",
    client: "US non-profit · Salesforce",
    summary: "Cleaned up legacy Apex and led data migrations.",
    tags: ["Apex", "Data migration"],
    metric: { figure: "50% → 85%", label: "Apex test coverage" },
  },
  {
    slug: "rolo",
    title: "Rolo: followers into a pipeline",
    client: "My product · SaaS",
    summary: "One list of real people from your social and email exports, with a simple pipeline.",
    tags: ["Next.js", "SaaS"],
    href: "/products/rolo",
  },
];
