"use client";

import { useTransition } from "react";

import { LogOut } from "lucide-react";

import { studioButton } from "@/components/studio/ui";
import { logoutAction } from "@/lib/admin-actions";

export function LogoutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className={studioButton.ghost}
      disabled={pending}
      onClick={() => startTransition(() => logoutAction())}
    >
      <LogOut className="size-4" aria-hidden />
      {pending ? "Logging out…" : "Log out"}
    </button>
  );
}
