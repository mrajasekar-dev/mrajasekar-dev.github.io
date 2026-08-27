export const principles = [
  {
    number: "01",
    title: "Understand before building",
    body: "Start with the business problem, not the Salesforce feature.",
  },
  {
    number: "02",
    title: "Resolve ambiguity early",
    body: "Questions are cheaper before development starts.",
  },
  {
    number: "03",
    title: "Design for the person using Salesforce",
    body: "Every screen, field, and workflow should reduce effort, not add to it.",
  },
  {
    number: "04",
    title: "Make working software visible",
    body: "Progress should be demonstrated, not described in a PowerPoint.",
  },
  {
    number: "05",
    title: "Surface problems early",
    body: "Bad news doesn't improve with time.",
  },
  {
    number: "06",
    title: "Don't knowingly create technical debt",
    body: "If there's a trade-off, it gets explained — not hidden.",
  },
  {
    number: "07",
    title: "Leave the client stronger",
    body: "Documentation, knowledge transfer, and ownership are part of delivery.",
  },
] as const;

export const engineeringNote = {
  heading: "Modern engineering, used responsibly.",
  body: "AI can accelerate implementation. It doesn't replace architecture, testing, security, or judgment.",
} as const;
