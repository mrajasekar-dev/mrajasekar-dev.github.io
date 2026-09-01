"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { deletePostAction } from "@/lib/admin-actions";

export function DeletePostButton({ slug, title }: { slug: string; title: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="text-destructive hover:text-destructive"
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
      {pending ? "Deleting…" : "Delete"}
    </Button>
  );
}
