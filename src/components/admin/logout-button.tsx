"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/admin-actions";

export function LogoutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={pending}
      onClick={() => startTransition(() => logoutAction())}
    >
      {pending ? "Logging out…" : "Log out"}
    </Button>
  );
}
