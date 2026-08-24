export const problems = [
  {
    title: "Requirements turn into tickets before anyone fully understands them.",
    body: "A ticket says what to build. It doesn't say why, or what happens to the person using it six months later.",
  },
  {
    title: "Warning signs get quieter in every status update.",
    body: "Nobody wants to be the one who says a project is off track, so the truth arrives late and in small pieces.",
  },
  {
    title: "The people who'll actually use the system get consulted last.",
    body: "By the time they're in the room, the data model and the workflow are already decided.",
  },
  {
    title: "Scope keeps growing while the deadline stays exactly where it was.",
    body: "Nobody signed off on the extra work out loud. It just became expected.",
  },
] as const;

export const whatIDo = [
  {
    title: "Discovery",
    body: "Understand the business, the users, the workflows, and the outcome you actually need.",
  },
  {
    title: "Salesforce architecture",
    body: "Translate business requirements into a solution design that will still make sense in two years.",
  },
  {
    title: "Apex, LWC & integrations",
    body: "Build the automation, custom logic, and connections to the other systems your business runs on.",
  },
  {
    title: "Delivery",
    body: "Test it, deploy it carefully, and leave you with a system your team understands and owns.",
  },
] as const;

export const uxPhilosophyTeaser = {
  heading: "Salesforce is a tool your people have to live in.",
  body: "If it takes ten clicks to do something that should take two, that's not a user problem. It's a design problem.",
} as const;
