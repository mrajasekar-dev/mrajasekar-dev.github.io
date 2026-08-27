export const problems = [
  {
    title: "Requirements turn into tickets before anyone fully understands them.",
    body: "A ticket says what to build. It doesn't say why — or who has to live with it.",
  },
  {
    title: "Warning signs get quieter in every status update.",
    body: "Bad news arrives late, in small pieces, because nobody wants to say it first.",
  },
  {
    title: "The people who'll actually use the system get consulted last.",
    body: "By the time they're in the room, the data model is already decided.",
  },
  {
    title: "Scope keeps growing while the deadline stays exactly where it was.",
    body: "Nobody approved the extra work. It just became expected.",
  },
] as const;

export const whatIDo = [
  {
    title: "Discovery",
    body: "Understand the business, the users, and the outcome you need.",
  },
  {
    title: "Salesforce architecture",
    body: "Turn requirements into an architecture that still makes sense in two years.",
  },
  {
    title: "Apex, LWC & integrations",
    body: "Build the automation, logic, and integrations the business runs on.",
  },
  {
    title: "Delivery",
    body: "Test it, deploy it, and hand over a system your team owns.",
  },
] as const;

export const uxPhilosophyTeaser = {
  heading: "Salesforce is a tool your people have to live in.",
  body: "If it takes ten clicks to do something that should take two, that's not a user problem. It's a design problem.",
} as const;
