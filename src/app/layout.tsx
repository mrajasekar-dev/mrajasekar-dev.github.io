import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";

import "./globals.css";
import { Navbar } from "@/components/navbar";
import { BackLink } from "@/components/back-link";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { getSiteSettings } from "@/lib/site-settings";

const fullTitle = `${siteConfig.name} — ${siteConfig.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: fullTitle,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.linkedin }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: fullTitle,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    url: siteConfig.url,
    email: siteConfig.email,
    sameAs: [siteConfig.linkedin, siteConfig.github, siteConfig.twitter],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Liverpool Business School" },
      { "@type": "CollegeOrUniversity", name: "Amrita Vishwa Vidyapeetham" },
    ],
    knowsAbout: ["Salesforce", "Apex", "Lightning Web Components", "Health Cloud", "Agentforce", "Salesforce integrations"],
    address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  },
];

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();
  const colorOverrides = `
    :root {
      --background: ${settings.colors.light.background};
      --foreground: ${settings.colors.light.foreground};
      --brand: ${settings.colors.light.brand};
    }
    .dark {
      --background: ${settings.colors.dark.background};
      --foreground: ${settings.colors.dark.foreground};
      --brand: ${settings.colors.dark.brand};
    }
  `;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Overrides the static tokens in globals.css with values saved in /admin/site. */}
        <style dangerouslySetInnerHTML={{ __html: colorOverrides }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main id="main" className="flex-1">
            <BackLink />
            {children}
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
