// Rolo: my SaaS product. Copy for /products/rolo. Screenshots live in public/products/rolo as <name>-light.png and <name>-dark.png.

export const rolo = {
  name: "Rolo",
  headline: "Turn your followers into *a pipeline.*",
  intro: "Merge your LinkedIn, Instagram, X and email exports into one list of real people. See who's warm, then follow up.",
  appHref: "https://rolo-ashy.vercel.app",
  shots: [
    { name: "people", width: 2880, height: 1720, alt: "Rolo's people list with one person open, showing their stage, tags and email thread", caption: "Everyone in one list" },
    { name: "pipeline", width: 2416, height: 1120, alt: "The Rolo pipeline with people in To reach out, Reached out, In conversation and Done", caption: "A simple pipeline" },
    { name: "compose", width: 1800, height: 1180, alt: "Writing to three people one by one, with a template filled in for each", caption: "Outreach that sounds like you" },
    { name: "emails", width: 2416, height: 1040, alt: "The Emails page showing conversations needing a reply and reply rate", caption: "Never miss a reply" },
  ],
} as const;
