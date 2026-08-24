// Single source of truth for brand/identity facts. Changing the practice's
// name later ("Rajasekar M" -> "Rajasekar M Consulting" -> a company name)
// should only ever require editing this file.

export const siteConfig = {
  name: "Rajasekar M",
  title: "Salesforce Principal Consultant",
  shortName: "Rajasekar M",
  tagline: "Salesforce should make your business easier to run.",
  description:
    "I help growing companies design and implement Salesforce around the way their people actually work — from the first requirements conversation to production and beyond.",
  url: "https://mrajasekar-dev.github.io",
  email: "mrajasekar.dev@gmail.com",
  linkedin: "https://www.linkedin.com/in/mrajasekar-dev/",
  location: "Bengaluru, India",
  serviceArea: "Based in Bengaluru, India — working remotely with growing companies worldwide.",
  keywords: [
    "Salesforce consultant for growing businesses",
    "Salesforce implementation consultant",
    "Salesforce principal consultant",
    "Salesforce implementation",
    "Salesforce engineering",
    "Salesforce Apex consultant",
    "Salesforce LWC consultant",
    "Salesforce integration consultant",
    "remote Salesforce consultant",
  ],
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "How I Work", href: "/how-i-work" },
  { label: "About", href: "/about" },
] as const;

export const primaryCta = { label: "Start a conversation", href: "/contact" } as const;
export const secondaryCta = { label: "Connect on LinkedIn", href: siteConfig.linkedin } as const;
