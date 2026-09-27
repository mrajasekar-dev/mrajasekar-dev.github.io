import type { Metadata } from "next";
import { Mail } from "lucide-react";

import { PageHero } from "@/components/brief/page-hero";
import { Container } from "@/components/brief/container";
import { ContactForm } from "@/components/contact-form";
import { Scheduler } from "@/components/scheduler";
import { LinkedinIcon } from "@/components/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/config/site";
import { topicLabel, topics } from "@/content/topics";
import { availabilityLabels, getSiteSettings } from "@/lib/site-settings";
import { isCalendarConfigured } from "@/lib/google-calendar";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with .`,
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { topic } = await searchParams;
  const topicId = typeof topic === "string" && topicLabel(topic) ? topic : undefined;
  const { availability } = await getSiteSettings();
  const calendarReady = isCalendarConfigured();

  return (
    <>
      <PageHero label="Contact" title="Contact" intro={<>Email me at <a href={`mailto:${siteConfig.email}`} className="text-foreground underline underline-offset-4 hover:text-brand">{siteConfig.email}</a>, or use the form below.</>} />

      <section>
        <Container className="grid gap-8 pb-7 lg:grid-cols-12">
          <aside className="flex flex-col gap-4 text-sm lg:col-span-4">
            <p className="flex items-center gap-2 font-medium">
              <span className={cn("size-2 rounded-full", availability.status === "open" ? "bg-ok" : availability.status === "limited" ? "bg-amber-500" : "bg-muted-foreground")} />
              {availabilityLabels[availability.status]}
            </p>
            {availability.note ? <p className="text-muted-foreground">{availability.note}</p> : null}
            <div className="flex flex-col gap-2 border-t border-rule pt-4">
              <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 hover:text-brand">
                <Mail className="size-4" aria-hidden /> {siteConfig.email}
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 hover:text-brand">
                <LinkedinIcon className="size-4" /> LinkedIn
              </a>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-rule">
              <Tabs defaultValue={calendarReady ? "call" : "message"}>
                <div className="border-b border-rule px-5 pt-5 sm:px-8">
                  <TabsList className="mb-5">
                    <TabsTrigger value="call">Book a call</TabsTrigger>
                    <TabsTrigger value="message">Send a message</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="call" className="p-5 sm:p-8">
                  <Scheduler topics={topics} defaultTopic={topicId} />
                </TabsContent>
                <TabsContent value="message" className="p-5 sm:p-8">
                  <ContactForm topics={topics} defaultTopic={topicId} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
