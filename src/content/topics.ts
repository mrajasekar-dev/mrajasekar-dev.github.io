/** Options for "What's it about?" on the booking form. */
export const topics: { id: string; label: string }[] = [
  { id: "salesforce-work", label: "Salesforce work" },
  { id: "collaboration", label: "Collaboration" },
  { id: "salesforce-daily-quiz", label: "Salesforce Daily Quiz" },
  { id: "rolo", label: "Rolo" },
  { id: "other", label: "Something else" },
];

export function topicLabel(id: string | undefined) {
  return topics.find((t) => t.id === id)?.label;
}
