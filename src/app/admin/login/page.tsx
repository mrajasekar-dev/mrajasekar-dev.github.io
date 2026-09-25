import type { Metadata } from "next";

import { LoginForm } from "@/components/admin/login-form";
import { Monogram } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Studio login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between bg-foreground p-12 text-background lg:flex">
        <Monogram className="bg-background text-foreground" />
        <div>
          <p className="display text-6xl">
            Back to the <em>studio.</em>
          </p>
          <p className="mt-4 max-w-sm text-background/65">Inquiries, bookings, writing and availability, in one place.</p>
        </div>
        <p className="annot text-background/45">Private · rajasekar-m</p>
      </div>
      <div className="flex flex-col justify-center px-6 py-16 sm:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Monogram className="lg:hidden" />
          <p className="annot mt-8 lg:mt-0">Restricted</p>
          <h1 className="display mt-2 text-4xl">Sign in</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
