export const primaryService = {
  name: "Salesforce Launch",
  summary:
    "A founder-led greenfield Salesforce implementation for growing companies — from the first discovery conversation to a system your team actually owns.",
  stages: [
    {
      name: "Discovery",
      body: "Understand the business, users, and outcome before proposing a solution.",
    },
    {
      name: "Design",
      body: "Architecture and screens, built around the people who'll actually use them.",
    },
    {
      name: "Build",
      body: "Configuration, automation, Apex, LWC, and integrations.",
    },
    {
      name: "Launch",
      body: "Testing, deployment, enablement, and hypercare until it's stable.",
    },
  ],
} as const;

export const secondaryService = {
  name: "Salesforce Engineering Partner",
  target:
    "Companies with an existing Salesforce admin or internal team that need additional senior engineering capacity — including complex integrations and platform architecture work.",
  positioning: "You know the business. I help you get the engineering done.",
  distinction: "Engineering partnership, not anonymous developer capacity.",
  work: [
    "Apex",
    "LWC",
    "Integrations",
    "External APIs",
    "Automation",
    "Platform architecture",
    "Technical debt reduction",
    "Performance improvements",
    "Deployment",
    "Code reviews",
  ],
} as const;
