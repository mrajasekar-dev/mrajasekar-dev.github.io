// Fixed-scope packages: one entry per package, rendered at /packages/<slug>.
// To add a package, add an entry here; the route, sitemap, contact topic and listings pick it up.

export type Addon = { name: string; price: string; body: string };

export type ServicePackage = {
  slug: string;
  name: string;
  /** Short name for listings and the contact topic. */
  short: string;
  headline: string;
  intro: string;
  price: string;
  priceNote: string;
  timeline: string;
  /** What the buyer walks away with. */
  outcomes: string[];
  included: { title: string; body: string }[];
  addons: Addon[];
  prerequisites: string[];
  excluded: string[];
  faqs: { q: string; a: string }[];
};

export const packages: ServicePackage[] = [
  {
    slug: "microsoft-teams-integration",
    name: "Microsoft Teams + Salesforce integration",
    short: "Microsoft Teams integration",
    headline: "Salesforce updates where your team *already works.*",
    intro:
      "Deal and case updates posted to the right Teams channel the moment they happen, with a link straight back to the record. Built for your org, handed over with documentation, at a fixed price.",
    price: "$3,000",
    priceNote: "Fixed price for the standard scope. Add-ons are quoted up front.",
    timeline: "2 weeks from access to go-live",
    outcomes: [
      "Won deals, escalated cases and big stage changes announced in Teams without anyone copying and pasting",
      "A weekly pipeline or case digest posted to a channel every Monday",
      "Fewer \"did you see the email?\" messages, and nobody checking Salesforce just in case",
    ],
    included: [
      {
        title: "Three live alerts",
        body: "You pick the events, like a deal closing, a priority case or a renewal at risk. Each posts a clean card to the Teams channel or chat you choose, with the fields that matter and an Open in Salesforce button.",
      },
      {
        title: "One scheduled digest",
        body: "A daily or weekly summary, such as pipeline by stage or open cases by owner, posted automatically.",
      },
      {
        title: "Secure connection",
        body: "An app registration in your Microsoft tenant with only the permissions the alerts need, connected to Salesforce through Named Credentials. No passwords stored in code.",
      },
      {
        title: "Built to be trusted",
        body: "Retries if Teams is briefly down, an error log your admin can read, and on/off switches for each alert without a deployment.",
      },
      {
        title: "Sandbox first",
        body: "Built and tested in your sandbox, reviewed with your team, then deployed to production through source control.",
      },
      {
        title: "Handover and 30 days of fixes",
        body: "A written admin guide, a recorded walkthrough, and any bugs in what I built fixed free for 30 days after go-live.",
      },
    ],
    addons: [
      { name: "Extra alert", price: "$400", body: "Another event posted to Teams, same standard as the first three." },
      { name: "Extra digest", price: "$500", body: "Another scheduled summary to a channel of your choice." },
      {
        name: "Approve from Teams",
        price: "from $1,500",
        body: "Approve or reject a Salesforce approval with a comment, without leaving Teams. Needs a small Teams app registered in your tenant.",
      },
      {
        name: "Channel per key deal or account",
        price: "from $1,200",
        body: "A Teams channel created automatically for large deals or strategic accounts, with the right people added.",
      },
      { name: "Upkeep", price: "$300 / month", body: "Monitoring, fixes when Microsoft or Salesforce change something, and small tweaks. Cancel any month." },
    ],
    prerequisites: [
      "Salesforce Enterprise, Unlimited or Performance edition (Professional works with the API add-on)",
      "Microsoft 365 with Teams",
      "About an hour of your Microsoft 365 admin's time to approve the app registration",
      "A Salesforce sandbox I can build in",
    ],
    excluded: [
      "Salesforce and Microsoft licences",
      "Redesigning your sales or approval process (I'll flag issues I find)",
      "Publishing an app to the Teams store",
      "Slack, or integrations beyond Teams",
    ],
    faqs: [
      {
        q: "Salesforce already has a free Teams app. Why pay for this?",
        a: "The free app is good for finding and sharing records by hand. This package is about Teams telling people what happened, automatically, for the events your business cares about, in the format you want. Many teams use both.",
      },
      {
        q: "What data leaves Salesforce?",
        a: "Only the fields you choose to show on each card, sent to your own Microsoft tenant. Nothing passes through my systems.",
      },
      {
        q: "How is the final price set?",
        a: "After a 30-minute call you get a fixed quote within two business days: $3,000 for the standard scope, plus any add-ons you want. Half is due to start and half at go-live.",
      },
      {
        q: "What happens when Microsoft or Salesforce change their APIs?",
        a: "The build uses current, supported APIs and is documented so any admin can follow it. If something changes later, the upkeep plan covers it, or I'll quote a fix.",
      },
    ],
  },
];

export function getPackage(slug: string) {
  return packages.find((p) => p.slug === slug);
}
