import { Fragment } from "react";

/** Renders `*phrase*` as the signal-coloured italic used in display headings.
 * Lets the admin-editable tagline carry emphasis without HTML. */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <em key={i}>{part.slice(1, -1)}</em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function stripEmphasis(text: string) {
  return text.replace(/\*/g, "");
}
