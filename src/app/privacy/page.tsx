import type { Metadata } from "next";

import { PageHero } from "@/components/brief/page-hero";
import { Container } from "@/components/brief/container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What this site collects, why, and how to have it removed.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero label="Legal" title="Privacy" intro="Short version: I collect only what you send me, use it only to reply, and delete it on request." />
      <Container className="max-w-3xl pb-16">
        <div className="flex flex-col gap-5 leading-relaxed text-foreground/85">
          <p>
            <strong>What&rsquo;s collected.</strong> When you send a message or book a call, I receive your name, work
            email, company, and whatever you choose to write. Bookings also create a Google Calendar event with a Meet
            link. Submissions are stored privately on Vercel so I can reply and keep track of the conversation.
          </p>
          <p>
            <strong>Analytics.</strong> Aggregate, anonymous traffic and performance metrics (page views, referrers,
            Core Web Vitals) are collected with Vercel Analytics and Speed Insights. They are not tied to your identity.
          </p>
          <p>
            <strong>Sharing.</strong> Your details are never sold or shared with third parties for marketing.
          </p>
          <p>
            <strong>Removal.</strong> Email{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-brand underline underline-offset-4">
              {siteConfig.email}
            </a>{" "}
            and anything you&rsquo;ve submitted will be deleted.
          </p>
        </div>
      </Container>
    </>
  );
}
