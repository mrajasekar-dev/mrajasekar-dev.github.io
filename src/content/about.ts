// Sourced from the founder's CV (Sept 2026). Keep it factual and short.

export const intro = {
  body: "I'm Rajasekar (most people call me Raj), a Senior Salesforce Developer with 5+ years of solution design and delivery in integration-heavy enterprise environments.",
} as const;

type ExperiencePhoto = { src: string; alt: string; width: number; height: number };

type ExperienceEntry = {
  role: string;
  org: string;
  period: string;
  location: string;
  summary: string;
  photo?: ExperiencePhoto;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Senior Salesforce Developer",
    org: "GoKarya",
    period: "Feb 2026 – Present",
    location: "Bengaluru, India",
    summary: "Boutique Salesforce consultancy, working directly with US enterprise clients.",
    bullets: [
      "Built a clinical trial management platform for a US medical device company, reused across three systems.",
      "Technical advisor on the steering committee for Becknell Industrial: discovery, architecture and go-live.",
      "Designed a real-time analytics dashboard using Lightning Message Service, with scheduled executive digests.",
    ],
  },
  {
    role: "Salesforce Developer",
    org: "Salesforce",
    period: "Jun 2021 – Feb 2026",
    location: "Bengaluru, India",
    summary: "Delivery for enterprise customers across automotive, healthcare and non-profit.",
    photo: {
      src: "/rajasekar-salesforce.jpg",
      alt: "Rajasekar M standing at the Salesforce Bengaluru office",
      width: 1516,
      height: 1800,
    },
    bullets: [
      "Event-driven order notifications (SMS, WhatsApp, push) on Platform Events for an Indian EV startup.",
      "Two-way SAP–Salesforce sync through a custom Apex REST layer.",
      "Health Cloud data architecture for clients including Blue Shield California and AARP.",
      "Raised Apex test coverage from 50% to 85% on a legacy non-profit codebase.",
    ],
  },
];

export const award = {
  src: "/rajasekar-award.jpg",
  alt: "A three-year Salesforce service anniversary award on Rajasekar's desk",
  width: 1800,
  height: 1322,
} as const;

export const skillGroups = [
  {
    label: "Salesforce",
    items: ["Apex", "LWC", "SOQL/SOSL", "Flow", "Platform Events", "Trigger Actions Framework", "Health Cloud", "Data Cloud"],
  },
  {
    label: "Architecture & integration",
    items: ["Solution design", "ERD & data modeling", "REST/SOAP APIs", "SAP", "Microsoft Graph", "External Client Apps"],
  },
  {
    label: "AI-assisted delivery",
    items: ["Claude Code", "MCP servers", "Claude API", "Agentforce"],
  },
  {
    label: "Full stack & tools",
    items: ["Next.js", "React", "Node.js", "Supabase", "Salesforce DX", "Copado", "Azure DevOps"],
  },
] as const;

export const certifications = [
  "Salesforce Certified Agentforce Specialist",
  "Salesforce AI Associate",
  "Salesforce Platform Developer I",
  "Salesforce OmniStudio Developer",
  "Anthropic Claude API",
  "Anthropic MCP",
  "Anthropic Claude Skills",
] as const;

export const education = [
  { degree: "MBA, Business Analytics", school: "Liverpool Business School", period: "2023–2025" },
  { degree: "BTech, Computer Science Engineering", school: "Amrita Vishwa Vidyapeetham", period: "2017–2021" },
] as const;
