import type { Metadata } from "next";

import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Log in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Admin login</h1>
      <p className="mt-2 text-sm text-muted-foreground">Restricted area.</p>
      <LoginForm />
    </div>
  );
}
