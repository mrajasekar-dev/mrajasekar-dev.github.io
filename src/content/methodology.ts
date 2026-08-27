export const principles = [
  {
    number: "01",
    title: "Understand before building",
    body: "Start with the business problem, not the Salesforce feature — and resolve ambiguity before writing code.",
  },
  {
    number: "02",
    title: "Design for the person using Salesforce",
    body: "Every screen, field, and workflow should reduce effort, not add to it.",
  },
  {
    number: "03",
    title: "Show progress, not slides",
    body: "Working software is the update — not a status deck.",
  },
  {
    number: "04",
    title: "No surprises",
    body: "Problems get surfaced immediately. Trade-offs get explained, not hidden.",
  },
  {
    number: "05",
    title: "Leave you stronger",
    body: "Documentation, knowledge transfer, and ownership ship with the work.",
  },
] as const;

export const engineeringNote = {
  heading: "Modern engineering, used responsibly.",
  body: "AI can accelerate implementation. It doesn't replace architecture, testing, security, or judgment.",
} as const;
