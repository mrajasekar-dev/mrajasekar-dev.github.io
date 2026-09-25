import type { Metadata } from "next";

import { StudioSidebar } from "@/components/studio/sidebar";
import { listInquiries } from "@/lib/inbox-store";

export const metadata: Metadata = {
  title: { default: "Studio", template: "%s · Studio" },
  robots: { index: false, follow: false },
};

// Admin always reads live Blob data, never a build-time snapshot.
export const dynamic = "force-dynamic";

export default async function StudioLayout({ children }: LayoutProps<"/admin">) {
  const inquiries = await listInquiries().catch(() => []);
  const newCount = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="flex min-h-dvh flex-col bg-background md:flex-row">
      <StudioSidebar newCount={newCount} />
      <div className="min-w-0 flex-1">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">{children}</div>
      </div>
    </div>
  );
}
