import type { Metadata } from "next";
import Image from "next/image";

import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { CTASection } from "@/components/cta-section";
import {
  intro,
  experience,
  independentProject,
  skillGroups,
  certifications,
  education,
  award,
} from "@/content/about";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — a Salesforce developer and technical consultant's background, experience, and why this practice exists.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Section as="div" spacing="top" border={false} className="max-w-6xl pb-14 sm:pb-16">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
          <div className="w-full shrink-0 sm:w-96">
            <Image
              src="/rajasekar-title.jpg"
              alt="Rajasekar M wearing a Salesforce badge"
              width={1800}
              height={1557}
              priority
              sizes="(min-width: 640px) 384px, 100vw"
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>
          <div>
            <SectionHeader as="h1" eyebrow="About" title={siteConfig.name} />
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
              {intro.body}
            </p>
          </div>
        </div>

        {/* Experience — text and photos run as two independent tracks, not paired per row */}
        <h2 className="mt-14 text-xl font-semibold tracking-tight sm:text-2xl">Experience</h2>
        <div className="mt-6 flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          <div className="flex max-w-xl flex-1 flex-col gap-12">
            {experience.map((job) => (
              <Reveal key={`${job.org}-${job.role}`}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-semibold">
                    {job.role}{" "}
                    <span className="font-normal text-muted-foreground">· {job.org}</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">{job.period}</p>
                </div>
                <ul className="mt-3 flex flex-col gap-2">
                  {job.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}

            <Reveal>
              <h3 className="text-lg font-semibold">
                {independentProject.name}{" "}
                <span className="font-normal text-muted-foreground">
                  · {independentProject.description}
                </span>
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {independentProject.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="flex w-full flex-col gap-8 lg:w-96 lg:shrink-0 lg:gap-20">
            <Reveal>
              <Image
                src={award.src}
                alt={award.alt}
                width={award.width}
                height={award.height}
                sizes="(min-width: 1024px) 384px, 100vw"
                className="h-auto w-full rounded-2xl object-cover"
              />
            </Reveal>
            {experience
              .filter((job) => job.photo)
              .map((job) => (
                <Reveal key={job.photo!.src}>
                  <Image
                    src={job.photo!.src}
                    alt={job.photo!.alt}
                    width={job.photo!.width}
                    height={job.photo!.height}
                    sizes="(min-width: 1024px) 384px, 100vw"
                    className="h-auto w-full rounded-2xl object-cover"
                  />
                </Reveal>
              ))}
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section className="max-w-6xl">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Technical skills</h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <Reveal key={group.label}>
              <h3 className="text-sm font-semibold">{group.label}</h3>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Certifications & education */}
      <Section className="max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2">
          <Reveal>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Certifications</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {certifications.map((cert) => (
                <li key={cert} className="text-sm text-muted-foreground">
                  {cert}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Education</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {education.map((edu) => (
                <li key={edu.degree} className="text-sm">
                  <p className="text-foreground">{edu.degree}</p>
                  <p className="text-muted-foreground">
                    {edu.school} · {edu.period}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
