import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/brief/page-hero";
import { Container } from "@/components/brief/container";
import { focusquestPrivacy } from "@/content/focusquest";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "FocusQuest privacy policy",
  description: "How the FocusQuest Chrome extension handles your data: everything stays on your device, and nothing is collected or sent anywhere.",
  alternates: { canonical: "/products/focusquest/privacy" },
  robots: { index: false, follow: true },
};

export default function FocusQuestPrivacyPage() {
  return (
    <>
      <PageHero
        label="FocusQuest · Legal"
        title="Privacy policy"
        intro="Short version: FocusQuest keeps everything on your device. It has no accounts, no servers and no analytics, and it never sends your data anywhere."
      />
      <Container className="max-w-3xl pb-7">
        <div className="flex flex-col gap-5 leading-relaxed text-foreground/85">
          <p className="annot">Effective {focusquestPrivacy.effectiveDate}</p>
          <p>
            This policy covers the FocusQuest browser extension for Google Chrome (&ldquo;the extension&rdquo;), built
            and maintained by {siteConfig.name}. It explains what the extension handles, where that information lives,
            and how to remove it.
          </p>
          <p>
            <strong>What the extension handles.</strong> To decide whether to count time, the extension reads the
            address (URL and hostname) of tabs on the sites it tracks, and whether a video is playing on them. It also
            stores what you create or change inside it: your settings, the timer, quiz answers and scores, XP, streaks,
            achievements, any question banks you import, any custom sites or always-allowed URLs you add, and the
            motivational text you write for the lock screen.
          </p>
          <p>
            <strong>Where it&rsquo;s stored.</strong> All of this is stored locally in your browser&rsquo;s extension
            storage (<code>chrome.storage.local</code>) on your device. It is not synced to your Google account and
            not uploaded to any server. Backups you export are files you save and control yourself.
          </p>
          <p>
            <strong>What is not collected.</strong> The extension has no accounts and no sign-in. It does not collect
            personally identifiable information, browsing history, page content, keystrokes, location, health,
            financial or authentication data. It contains no analytics, advertising, telemetry or tracking of any kind,
            and it makes no network requests to send data anywhere.
          </p>
          <div>
            <p>
              <strong>Permissions and why they&rsquo;re needed.</strong>
            </p>
            <dl className="mt-3 flex flex-col gap-3">
              {focusquestPrivacy.permissions.map((permission) => (
                <div key={permission.title}>
                  <dt className="font-medium">
                    <code>{permission.title}</code>
                  </dt>
                  <dd className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{permission.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p>
            <strong>Sharing and sale.</strong> No data is sold, transferred or shared with anyone, for any purpose,
            including advertising, credit-worthiness or lending. Because nothing leaves your device, the developer
            never has access to it either.
          </p>
          <p>
            <strong>Remote code.</strong> The extension does not load or run remote code. Everything it runs ships
            inside the extension package.
          </p>
          <p>
            <strong>Deleting your data.</strong> Use &ldquo;Reset everything&rdquo; on the extension&rsquo;s options
            page to erase all stored data, or remove the extension from Chrome, which deletes its storage with it.
          </p>
          <p>
            <strong>Children.</strong> The extension is not directed at children under 13 and collects no information
            from anyone, of any age.
          </p>
          <p>
            <strong>Changes.</strong> If this policy changes, the updated version will be posted on this page with a new
            effective date. If the extension ever needs to handle data differently, that will be stated here before the
            change ships.
          </p>
          <p>
            <strong>Contact.</strong> Questions about this policy or the extension:{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-brand underline underline-offset-4">
              {siteConfig.email}
            </a>
            .
          </p>
          <p>
            <Link href="/products/focusquest" className="text-brand underline underline-offset-4">
              Back to FocusQuest
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
}
