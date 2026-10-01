// Single source of truth for brand/identity facts. Changing the practice's
// name later ("Rajasekar M" -> "Rajasekar M Consulting" -> a company name)
// should only ever require editing this file.

export const siteConfig = {
  name: "Rajasekar M",
  shortName: "Raj",
  title: "Salesforce Developer",
  tagline: "Salesforce developer. Integrations, Apex and LWC.",
  description:
    "Rajasekar M is a Salesforce developer, ex-Salesforce Professional Services and 7x certified, strongest in integrations, Apex and LWC. Selected projects, products and ways to get in touch.",
  url: "https://rajasekar-m.vercel.app",
  email: "mrajasekar.dev@gmail.com",
  linkedin: "https://www.linkedin.com/in/mrajasekar-dev/",
  github: "https://github.com/mrajasekar-dev",
  twitter: "https://x.com/unorthodox_raja",
  twitterHandle: "@unorthodox_raja",
  trailheadVerify: "https://trailhead.salesforce.com/en/credentials/verification",
  location: "Bengaluru, India",
  timezone: "Asia/Kolkata",
  serviceArea: "Based in Bengaluru, India. Working remotely.",
  keywords: [
    "Salesforce developer",
    "Salesforce Apex developer",
    "Salesforce LWC developer",
    "Salesforce integrations",
    "Agentforce",
    "Health Cloud",
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Products", href: "/#products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const primaryCta = { label: "Contact", href: "/contact" } as const;
