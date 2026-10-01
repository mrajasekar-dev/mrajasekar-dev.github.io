import type { Metadata } from "next";
import { Mail } from "lucide-react";

import { PageHero } from "@/components/brief/page-hero";
import { Container } from "@/components/brief/container";
import { ContactForm } from "@/components/contact-form";
import { Scheduler } from "@/components/scheduler";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { topicLabel, topics } from "@/content/topics";
import { LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { topic } = await searchParams;
  const topicId = typeof topic === "string" && topicLabel(topic) ? topic : undefined;

  return (
    <>
      <PageHero label="Contact" title="Contact" intro={<>Email me at <a href={`mailto:${siteConfig.email}`} className="text-foreground underline underline-offset-4 hover:text-brand">{siteConfig.email}</a>, find me on LinkedIn, book a call, or send a message below.</>} />

      <section>
        <Container className="grid gap-8 pb-7 lg:grid-cols-12">
          <aside className="flex flex-col gap-2 text-sm lg:col-span-4">
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 hover:text-brand">
              <Mail className="size-4" aria-hidden /> {siteConfig.email}
            </a>
            <a href={siteConfig.linkedin} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 hover:text-brand">
              <LinkedinIcon className="size-4" /> LinkedIn
            </a>
          </aside>

          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-rule">
              <Tabs defaultValue="message">
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
                  <ContactForm />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
