import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { PageHero } from "@/components/brief/page-hero";
import { Chapter } from "@/components/brief/chapter";
import { CtaBand } from "@/components/brief/cta-band";
import { intro, experience, certifications, education, award, skillGroups } from "@/content/about";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name}, Senior Salesforce Developer and ex-Salesforce engineer based in Bengaluru.`,
  alternates: { canonical: "/about" },
};

const salesforcePhoto = experience.find((job) => job.photo)?.photo;

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title={<>Hi, I&rsquo;m Raj.</>}
        intro={intro.body}
        aside={
          <Image
            src="/rajasekar-title.jpg"
            alt="Rajasekar M wearing a Salesforce badge"
            width={1800}
            height={1557}
            priority
            sizes="(min-width: 1024px) 380px, 100vw"
            className="aspect-[4/5] h-auto w-full rounded-2xl object-cover"
          />
        }
      />

      <Chapter label="Background" title="A bit about me">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              At Salesforce I delivered for enterprise customers in automotive, healthcare and the non-profit sector.
            </p>
            <p>
              Since February 2026 I&rsquo;ve been at GoKarya, a boutique Salesforce consultancy, working with US clients.
              Outside work I build small tools, like Rolo, a lightweight CRM for solo sellers.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {salesforcePhoto ? (
              <Image
                src={salesforcePhoto.src}
                alt={salesforcePhoto.alt}
                width={salesforcePhoto.width}
                height={salesforcePhoto.height}
                sizes="(min-width: 1024px) 280px, 50vw"
                className="h-full w-full rounded-xl object-cover"
              />
            ) : null}
            <Image
              src={award.src}
              alt={award.alt}
              width={award.width}
              height={award.height}
              sizes="(min-width: 1024px) 280px, 50vw"
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </Chapter>

      <Chapter label="Credentials" title="Certifications & education">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="font-medium">Certifications</p>
            <ul className="mt-4 border-t border-rule">
              {certifications.map((cert) => (
                <li key={cert} className="border-b border-rule py-3 text-sm">
                  {cert}
                </li>
              ))}
            </ul>
            <a
              href={siteConfig.trailheadVerify}
              target="_blank"
              rel="noreferrer noopener"
              className="annot mt-4 inline-flex items-center gap-1 hover:text-brand"
            >
              Verify on Trailhead <ArrowUpRight className="size-3" aria-hidden />
            </a>
          </div>
          <div>
            <p className="font-medium">Education</p>
            <ul className="mt-4 border-t border-rule">
              {education.map((edu) => (
                <li key={edu.degree} className="border-b border-rule py-3">
                  <p className="text-sm font-medium">{edu.degree}</p>
                  <p className="text-sm text-muted-foreground">
                    {edu.school} · {edu.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Chapter>

      <Chapter label="Skills" title="Tools I use">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p className="font-medium">{group.label}</p>
              <ul className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Chapter>

      <CtaBand />
    </>
  );
}
