import { packages } from "@/content/packages";
import { services } from "@/content/services";

/** Options for "What's it about?" on the contact forms. */
export const topics: { id: string; label: string }[] = [
  ...services.map((s) => ({ id: s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"), label: s.title })),
  { id: "fix-sprint", label: "Salesforce Fix Sprint" },
  ...packages.map((p) => ({ id: p.slug, label: p.short })),
  { id: "other", label: "Something else" },
];

export function topicLabel(id: string | undefined) {
  return topics.find((t) => t.id === id)?.label;
}
