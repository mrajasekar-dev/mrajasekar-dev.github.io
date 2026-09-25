"use client";

import { useTransition } from "react";

import { Trash2 } from "lucide-react";

import { studioButton } from "@/components/studio/ui";
import { deletePostAction } from "@/lib/admin-actions";

export function DeletePostButton({ slug, title }: { slug: string; title: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      aria-label={`Delete ${title}`}
      className={`${studioButton.ghost} hover:text-destructive`}
      disabled={pending}
      onClick={() => {
        if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
        const formData = new FormData();
        formData.set("slug", slug);
        startTransition(() => {
          deletePostAction(formData);
        });
      }}
    >
      {pending ? "…" : <Trash2 className="size-4" aria-hidden />}
    </button>
  );
}
