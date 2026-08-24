export const intro = {
  body: "I'm Rajasekar (most people just call me Raj), a Salesforce developer and technical consultant who has spent the last several years building Salesforce solutions across complex business environments — healthcare, automotive, and medical devices.",
} as const;

type ExperiencePhoto = { src: string; alt: string; width: number; height: number };

type ExperienceEntry = {
  role: string;
  org: string;
  period: string;
  location: string;
  photo?: ExperiencePhoto;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Senior Salesforce Developer",
    org: "GoKarya",
    period: "Feb 2026 – Present",
    location: "Bengaluru, India",
    bullets: [
      "Architected a clinical trial management platform for a US medical device company, integrating internal LWC interfaces and external Next.js/React dashboards via Salesforce External Client App Credentials.",
      "Pioneered AI-first development using Agentforce, Claude Code, MCP servers, and agentic frameworks, reducing multi-week feature development cycles to single-day deployments.",
      "Engineered multi-agent orchestration with deterministic guardrails governing Salesforce read/write permissions, CI/CD pipelines, and token-optimized prompt routing, utilizing data grounding and RAG for responsible AI outputs.",
      "Delivered enterprise identity and calendar federation, resolving native Salesforce Activity object limitations through custom Screen Flows, Microsoft Graph API, and Azure AD SAML SSO.",
      "Mentored junior engineers through technical design reviews focused on scalable architecture and test-driven development.",
    ],
  },
  {
    role: "Salesforce Developer",
    org: "Salesforce",
    period: "Jun 2021 – Feb 2026",
    location: "Bengaluru, India",
    photo: {
      src: "/rajasekar-salesforce.jpg",
      alt: "Rajasekar M standing at the Salesforce Bengaluru office",
      width: 1516,
      height: 1800,
    },
    bullets: [
      "Engineered high-volume data architectures handling millions of records for enterprise healthcare and non-profit clients, using asynchronous Apex, Platform Events, and the Trigger Actions Framework.",
      "Designed bulkified flows and external processing pipelines optimized for governor limits and high-traffic performance in complex multi-cloud deployments.",
      "Built real-time SAP–Salesforce integrations via custom REST APIs, powering an event-driven dealer management system for an Indian EV OEM.",
      "Refactored legacy codebases and eliminated technical debt, driving Apex test coverage from 50% to 85%, and executed complex data migrations for a US non-profit CRM.",
    ],
  },
];

export const award = {
  src: "/rajasekar-award.jpg",
  alt: "A three-year Salesforce service anniversary award on Rajasekar's desk",
  width: 1800,
  height: 1322,
} as const;

export const independentProject = {
  name: "Orglore",
  description: "Full-stack SOQL productivity SaaS",
  bullets: [
    "Engineered a full-stack SOQL productivity application from zero to a functional MVP using Next.js, Supabase, and Vercel.",
    "Implemented Salesforce OAuth, multi-tenant workspaces, and schema-driven autocomplete.",
  ],
} as const;

export const skillGroups = [
  {
    label: "Salesforce Core",
    items: [
      "Apex (sync/async)",
      "Lightning Web Components",
      "SOQL/SOSL",
      "Flow Builder",
      "Platform Events",
      "Trigger Actions Framework",
      "Data Cloud (data harmonization, unified data models)",
    ],
  },
  {
    label: "AI & Emerging",
    items: [
      "Agentforce",
      "RAG",
      "Prompt engineering",
      "Claude API",
      "MCP servers",
      "Model-context-driven engineering",
    ],
  },
  {
    label: "Integration",
    items: [
      "REST/SOAP APIs",
      "SAP integration",
      "Microsoft Graph API",
      "Salesforce External Client App Credentials",
    ],
  },
  {
    label: "Full stack & tooling",
    items: ["Next.js", "React", "Node.js", "Supabase", "Vercel", "Salesforce DX", "Git CI/CD"],
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
  {
    degree: "BTech, Computer Science Engineering",
    school: "Amrita Vishwa Vidyapeetham",
    period: "2017–2021",
  },
] as const;
