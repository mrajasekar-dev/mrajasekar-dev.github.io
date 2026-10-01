import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/brief/page-hero";
import { Container } from "@/components/brief/container";
import { focusquestPrivacy } from "@/content/focusquest";
import { siteConfig } from "@/config/site";

// Replace with the deployed leaderboard address (the workers.dev URL or a custom domain) after deploying.
const LEADERBOARD_URL = "https://play.sfdq.workers.dev";

export const metadata: Metadata = {
  title: "Salesforce Daily Quiz privacy policy",
  description: "How the Salesforce Daily Quiz Chrome extension handles your data: everything stays on your device unless you opt in to the leaderboard.",
  alternates: { canonical: "/products/salesforce-daily-quiz/privacy" },
  robots: { index: false, follow: true },
};

export default function SalesforceDailyQuizPrivacyPage() {
  return (
    <>
      <PageHero
        label="Salesforce Daily Quiz · Legal"
        title="Privacy policy"
        intro="Short version: by default Salesforce Daily Quiz keeps everything on your device and sends nothing. The leaderboard is optional; if you join, only a few items listed below are sent."
      />
      <Container className="max-w-3xl pb-7">
        <div className="flex flex-col gap-5 leading-relaxed text-foreground/85">
          <p className="annot">Effective {focusquestPrivacy.effectiveDate}</p>
          <p>
            This policy covers the Salesforce Daily Quiz browser extension for Google Chrome (&ldquo;the extension&rdquo;), built
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
            storage (<code>chrome.storage.local</code>) on your device. It is not synced to your Google account.
            Backups you export are files you save and control yourself.
          </p>
          <p>
            <strong>By default, nothing leaves your device.</strong> The extension has no accounts, and until you
            choose to join the leaderboard it makes no network requests to send data anywhere.
          </p>
          <p>
            <strong>The leaderboard is optional and opt-in.</strong> It only starts if you join it in the extension
            options. If you do, the extension sends the following to the leaderboard server:
          </p>
          <ul className="flex list-disc flex-col gap-1 pl-5">
            <li>the display name you choose;</li>
            <li>an optional LinkedIn profile link, only if you enter one;</li>
            <li>your answers, scores and times for the daily challenge;</li>
            <li>
              an anonymous device code, created when you join. The server stores only a hash of its secret part.
            </li>
          </ul>
          <p>
            Your display name, optional LinkedIn link, score and time are shown publicly on the leaderboard. When you
            are joined, the extension also fetches the daily challenge set from the leaderboard server.
          </p>
          <p>
            <strong>What is never sent.</strong> Your browsing history, the sites you visit or the tabs you have open,
            blocker and timer data, your extension settings, your email address, and your other quiz progress stay on
            your device. The leaderboard uses no cookies and no analytics.
          </p>
          <p>
            <strong>Full leaderboard policy.</strong> What the leaderboard stores, how long it keeps it and who
            processes it is described in the{" "}
            <a href={`${LEADERBOARD_URL}/privacy.html`} className="text-brand underline underline-offset-4">
              leaderboard privacy policy
            </a>
            .
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
            including advertising, credit-worthiness or lending. If you never join the leaderboard, nothing leaves your
            device and the developer never has access to it.
          </p>
          <p>
            <strong>Remote code.</strong> The extension does not load or run remote code. Everything it runs ships
            inside the extension package.
          </p>
          <p>
            <strong>Deleting your data.</strong> Use &ldquo;Reset everything&rdquo; on the extension&rsquo;s options
            page to erase all data stored on your device, or remove the extension from Chrome, which deletes its
            storage with it. If you joined the leaderboard, choose &ldquo;Delete my data&rdquo; under Leaderboard in
            the extension options (or Profile in the web app) to remove your leaderboard account, scores and reports
            from the server.
          </p>
          <p>
            <strong>Children.</strong> The extension is not directed at children under 13 and knowingly collects no
            information from children.
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
            <Link href="/products/salesforce-daily-quiz" className="text-brand underline underline-offset-4">
              Back to Salesforce Daily Quiz
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
}
