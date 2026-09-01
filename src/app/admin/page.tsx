import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { LogoutButton } from "@/components/admin/logout-button";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const sections = [
  {
    href: "/admin/appearance",
    title: "Appearance",
    body: "Background, foreground, and brand accent colors, plus the homepage tagline and CTA label.",
  },
  {
    href: "/admin/posts",
    title: "Blog posts",
    body: "Create, edit, publish, or delete posts in both blog channels.",
  },
] as const;

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
        <LogoutButton />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-ring/50"
          >
            <h2 className="flex items-center gap-1.5 text-base font-semibold">
              {section.title}
              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
