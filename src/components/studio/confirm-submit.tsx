"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

/** Submit button that asks for confirmation before a destructive action. */
export function ConfirmSubmit({ message, className, children }: { message: string; className?: string; children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {pending ? "Working…" : children}
    </button>
  );
}
