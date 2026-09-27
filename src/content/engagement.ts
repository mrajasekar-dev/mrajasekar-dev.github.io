// The partner offer: how a consultancy engages me. Keep prices here and nowhere else.

export type Plan = {
  name: string;
  price: string;
  cadence: string;
  summary: string;
  points: string[];
};

export const plans: Plan[] = [
  {
    name: "Pilot",
    price: "$1,200",
    cadence: "two weeks, fixed price",
    summary: "One real ticket from your backlog, scoped with you up front, so you can judge the work before committing.",
    points: ["Scope agreed in writing before I start", "Delivered through your repo and review process", "No obligation to continue"],
  },
  {
    name: "Monthly",
    price: "$4,500",
    cadence: "per month · 60 hours",
    summary: "A senior developer embedded in your delivery team, working your backlog across client orgs.",
    points: ["Month to month, with 30 days' notice", "Weekly hours report against your tickets", "Unused hours don't roll over; extra hours are pre-approved"],
  },
];

/** The ground rules partners ask about first. */
export const terms: { title: string; body: string }[] = [
  {
    title: "White-label",
    body: "I work under your brand. Your clients deal with you. I sign your NDA and a written non-solicit, and I never approach your clients.",
  },
  {
    title: "Your tools",
    body: "Your Jira, Slack, Git and DevOps pipeline. Source-tracked changes, tests with every Apex class, and notes a reviewer can follow.",
  },
  {
    title: "Hours that fit",
    body: "Asynchronous by default, with a daily overlap window in US mornings for stand-ups and client calls you want me on.",
  },
  {
    title: "Simple billing",
    body: "Monthly USD invoice by ACH or wire. Registered in India for export of services, so invoices carry no Indian tax. W-8BEN on request.",
  },
];
