// Single source of truth for brand/identity facts. Changing the practice's
// name later ("Rajasekar M" -> "Rajasekar M Consulting" -> a company name)
// should only ever require editing this file.

export const siteConfig = {
  name: "Rajasekar M",
  shortName: "Raj",
  title: "Senior Salesforce Developer",
  tagline: "I design and build Salesforce solutions.",
  description:
    "Rajasekar M is a Senior Salesforce Developer in Bengaluru, working on solution design, Apex, LWC and integrations.",
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
    "Salesforce freelancer",
    "independent Salesforce consultant",
    "Salesforce consultant for growing businesses",
    "Salesforce implementation consultant",
    "Salesforce org cleanup",
    "Salesforce integration consultant",
    "Salesforce Apex developer",
    "Salesforce LWC developer",
    "Agentforce consultant",
    "Health Cloud consultant",
    "remote Salesforce consultant",
  ],
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const primaryCta = { label: "Get in touch", href: "/contact" } as const;
export const secondaryCta = { label: "Connect on LinkedIn", href: siteConfig.linkedin } as const;
