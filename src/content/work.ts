// Selected work, from the founder's CV (Sept 2026).

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
    slug: "clinical-trials",
    title: "Clinical trial management platform",
    client: "US medical device company · GoKarya",
    summary:
      "Procedure checklists, a clinical data importer with duplicate detection, and dashboards across 4 concurrent studies, on one template-and-clone data model now reused across three systems.",
    tags: ["Health Cloud", "LWC", "Data model"],
  },
  {
    slug: "becknell",
    title: "Solution design for Becknell Industrial",
    client: "US industrial real estate · GoKarya",
    summary:
      "Steering-committee technical advisor: discovery, ERD and architecture, legacy data deduplication, and a feedback-tracking app ahead of go-live.",
    tags: ["Architecture", "Data migration", "Stakeholders"],
  },
  {
    slug: "analytics-dashboard",
    title: "Real-time clinical analytics dashboard",
    client: "US medical device company · GoKarya",
    summary:
      "Every chart syncs from a single filter using Lightning Message Service, with scheduled Apex snapshots and weekly executive email digests.",
    tags: ["LWC", "Lightning Message Service", "Scheduled Apex"],
  },
  {
    slug: "ev-notifications",
    title: "Event-driven order notifications",
    client: "Indian EV startup · Salesforce",
    summary:
      "SMS, WhatsApp and push notifications on Platform Events and Custom Metadata templates, replacing blocking callouts with an auditable, replayable async design.",
    tags: ["Platform Events", "Integration"],
  },
  {
    slug: "sap-sync",
    title: "Two-way SAP–Salesforce sync",
    client: "Automotive · Salesforce",
    summary:
      "A custom Apex REST layer plus a shared service layer for the mobile app and website; one business-payload endpoint replaced per-object REST coupling.",
    tags: ["Apex REST", "SAP"],
  },
  {
    slug: "test-coverage",
    title: "Legacy codebase clean-up",
    client: "US non-profit · Salesforce",
    summary: "Refactored legacy Apex, cleared technical debt and led complex data migrations.",
    tags: ["Apex", "Data migration"],
    metric: { figure: "50% → 85%", label: "Apex test coverage" },
  },
  {
    slug: "rolo",
    title: "Rolo: followers into a pipeline",
    client: "My product · SaaS",
    summary:
      "Merges official exports from 18 platforms into one person per human, scores who's warm, and adds a lightweight CRM with inbox, pipeline, follow-ups and lead-capture pages. Local-first, so 14k people load in under 100 ms.",
    tags: ["Next.js", "Local-first", "Identity merge"],
    href: "https://rolo-ashy.vercel.app",
  },
];
