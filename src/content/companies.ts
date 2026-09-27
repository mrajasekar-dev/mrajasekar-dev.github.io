// The direct offer for companies running Salesforce without an in-house team. Prices live here and in engagement.ts.

import type { Plan } from "@/content/engagement";

export const companyPlans: Plan[] = [
  {
    name: "Salesforce Health Check",
    price: "$750",
    cadence: "fixed price · 5 business days",
    summary: "I go through your org end to end and tell you, in plain English, what's broken, what's risky and what to fix first.",
    points: [
      "A written report with a ranked fix list and effort for each item",
      "A 30-minute walkthrough call with your team",
      "Yours to keep, whether or not we work together after",
    ],
  },
  {
    name: "Fractional Salesforce team",
    price: "$4,500",
    cadence: "per month · 60 hours",
    summary: "Admin and developer work in one person, for less than half the cost of a full-time hire.",
    points: [
      "Works through the fix list, then your requests as they come",
      "Weekly update of what was done and what's next",
      "Month to month, with 30 days' notice",
    ],
  },
];

/** The problems that usually bring a company to me. */
export const signs = [
  "Your admin or implementation partner left, and nobody knows how things work.",
  "Automations fire twice, or not at all, and nobody wants to touch them.",
  "Reports don't match reality, so the team keeps its own spreadsheets.",
  "Salesforce keeps emailing about retiring features you might be using.",
  "An integration with your ERP, billing or website breaks every few weeks.",
  "You bought Salesforce for more than you're using it for.",
];

export const checkAreas: { title: string; body: string }[] = [
  { title: "Automation", body: "Flows, Process Builder, Workflow Rules and triggers: what runs, what overlaps and what's due for retirement." },
  { title: "Security & access", body: "Profiles, permission sets, sharing and who can see or export what." },
  { title: "Data quality", body: "Duplicates, empty fields that matter, broken picklists and records nobody owns." },
  { title: "Integrations", body: "Connected apps, API users and anything relying on retiring APIs like SOAP login()." },
  { title: "Code", body: "Apex and Lightning components, test coverage and anything that will fail the next release." },
  { title: "Adoption", body: "Page layouts, reports and dashboards: whether the org fits how your team actually sells and serves." },
];

/** Answers to what makes a company hesitate before hiring someone remote. */
export const safeguards: { title: string; body: string }[] = [
  { title: "You stay in control", body: "I start in a sandbox. You own my user and its permissions, and can switch it off any time." },
  { title: "Nothing lives in my head", body: "Every change is written up and kept in your org or your repo, so anyone can pick up after me." },
  { title: "Confidential by default", body: "I sign your NDA. For health data, we agree how it's handled before I get access." },
  { title: "Easy to leave", body: "Month to month. If you stop, you lose nothing but my time." },
  { title: "Paid like a local vendor", body: "USD invoices, paid by US bank transfer (ACH) or wire. W-8BEN sent with the first invoice." },
  { title: "Reachable in your day", body: "Asynchronous by default, with a daily overlap window in US mornings for calls." },
];

export const steps: { title: string; body: string }[] = [
  { title: "Free 20-minute call", body: "Tell me what's going wrong. I'll say honestly whether I can help." },
  { title: "Access and invoice", body: "You set up a sandbox or a limited login and pay the fixed $750." },
  { title: "Report in 5 days", body: "You get the written fix list and we walk through it together." },
  { title: "Your call", body: "Fix it yourselves, or keep me on monthly to work through it." },
];

export const companyFaqs: { q: string; a: string }[] = [
  {
    q: "Why not just hire a Salesforce admin?",
    a: "If you have 40 or more hours a week of Salesforce work, you should. Most companies under 50 licences don't. They need admin and developer skills a few days a month, and the monthly plan gives both for less than half a full-time salary.",
  },
  {
    q: "We're in the middle of an implementation that's gone sideways. Can you help?",
    a: "Yes. The health check works the same on a half-built org. It tells you what's salvageable and what the partner still owes you.",
  },
  {
    q: "Is it safe to give someone overseas access to our CRM?",
    a: "You decide exactly what I can see. The usual pattern is sandbox first, then a production user with only the permissions the work needs, with login history you can check any time.",
  },
  {
    q: "What if I only need a one-off fix?",
    a: "Book the call and describe it. Small, well-defined fixes can be quoted at a fixed price.",
  },
];
