// Sourced from the founder's CV (Sept 2026). Keep it factual and short.

export const intro = {
  body: "Senior Salesforce Developer with 5+ years building integrations for enterprise clients.",
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
    summary: "Salesforce consultancy for US enterprise clients.",
    bullets: [
      "Clinical trial management for a US medical device company.",
      "Technical advisor to a US real estate firm, from discovery to go-live.",
      "Real-time analytics dashboard with scheduled executive digests.",
    ],
  },
  {
    role: "Salesforce Developer",
    org: "Salesforce",
    period: "Jun 2021 – Feb 2026",
    location: "Bengaluru, India",
    summary: "Enterprise delivery across automotive, healthcare and non-profit.",
    photo: {
      src: "/rajasekar-salesforce.jpg",
      alt: "Rajasekar M standing at the Salesforce Bengaluru office",
      width: 1516,
      height: 1800,
    },
    bullets: [
      "Order notifications (SMS, WhatsApp, push) for an EV startup.",
      "Two-way SAP–Salesforce sync.",
      "Health Cloud architecture for US insurers and a non-profit.",
      "Raised Apex test coverage from 50% to 85%.",
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
