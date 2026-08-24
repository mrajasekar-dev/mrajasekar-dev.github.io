export const principles = [
  {
    number: "01",
    title: "Understand before building",
    body: "We start with the business problem, not the Salesforce feature.",
  },
  {
    number: "02",
    title: "Resolve ambiguity early",
    body: "Questions are cheaper before development starts.",
  },
  {
    number: "03",
    title: "Design for the person using Salesforce",
    body: "Every screen, field and workflow should reduce unnecessary effort.",
  },
  {
    number: "04",
    title: "Make working software visible",
    body: "Progress should be demonstrated, not described in a PowerPoint.",
  },
  {
    number: "05",
    title: "Surface problems early",
    body: "Bad news doesn't become better because it arrives later.",
  },
  {
    number: "06",
    title: "Don't knowingly create technical debt",
    body: "If there is a trade-off, explain it and let the client make an informed decision.",
  },
  {
    number: "07",
    title: "Leave the client stronger",
    body: "Documentation, knowledge transfer and ownership are part of delivery.",
  },
] as const;

export const engineeringNote = {
  heading: "Modern engineering, used responsibly.",
  body: "AI can accelerate implementation. It doesn't replace architecture, requirements understanding, testing, security, code review, human judgment, or accountability.",
} as const;
