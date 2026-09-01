import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppearanceForm } from "@/components/admin/appearance-form";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Appearance",
  robots: { index: false, follow: false },
};

// Always read the current Blob-backed settings — never serve a stale
// build-time snapshot of the form.
export const dynamic = "force-dynamic";

export default async function AdminAppearancePage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to admin
      </Link>

      <h1 className="mt-6 text-2xl font-semibold tracking-tight">Appearance</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Changes apply immediately across the site — no redeploy needed.
      </p>

      <AppearanceForm settings={settings} />
    </div>
  );
}
