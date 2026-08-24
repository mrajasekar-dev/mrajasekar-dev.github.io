export const primaryService = {
  name: "Salesforce Launch",
  summary:
    "A founder-led greenfield Salesforce implementation for growing companies — from the first discovery conversation to a system your team actually owns.",
  stages: [
    {
      name: "Discovery",
      body: "Understand the business, users, workflows and outcomes before any solution is proposed.",
    },
    {
      name: "Solution Design",
      body: "Translate business needs into a practical Salesforce architecture.",
    },
    {
      name: "Experience Design",
      body: "Design screens and workflows around the people actually using Salesforce.",
    },
    {
      name: "Build",
      body: "Configuration, automation, Apex, LWC and integrations where appropriate.",
    },
    {
      name: "Validate",
      body: "Functional testing, technical QA and user acceptance testing.",
    },
    {
      name: "Launch",
      body: "Controlled deployment, enablement and production readiness.",
    },
    {
      name: "Stabilize",
      body: "Hypercare and transition into ongoing support if needed.",
    },
  ],
} as const;

export const secondaryService = {
  name: "Salesforce Engineering Partner",
  target:
    "Companies with an existing Salesforce admin or internal team that need additional senior engineering capacity.",
  positioning: "You know the business. I help you get the engineering done.",
  distinction: "Engineering partnership, not anonymous developer capacity.",
  work: [
    "Apex",
    "LWC",
    "Integrations",
    "Automation",
    "Architecture",
    "Technical debt reduction",
    "Performance improvements",
    "Deployment",
    "Code reviews",
  ],
} as const;

export const futureService = {
  name: "Complex Salesforce Engineering",
  body: "For technically difficult requirements involving Apex, LWC, integrations, external APIs, complex automation, and platform architecture.",
  areas: [
    "Apex",
    "LWC",
    "Integrations",
    "External APIs",
    "Complex automation",
    "Platform architecture",
  ],
} as const;
