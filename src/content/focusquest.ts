// Salesforce Daily Quiz: a Chrome extension I built. Copy for /products/salesforce-daily-quiz and its privacy policy.

export const focusquest = {
  name: "Salesforce Daily Quiz",
  headline: "Five Salesforce questions a day. *Right in Chrome.*",
  intro: "A daily challenge for Salesforce developers and admins, the same five questions for everyone. Keep a streak, practise 200 more, and optionally pause social media until you pass a quiz.",
  status: "Chrome Web Store listing coming soon. Free, and everything stays in your browser.",
  downloadHref: "/downloads/salesforce-daily-quiz.zip",
  privacyHref: "/products/salesforce-daily-quiz/privacy",

  screenshots: [
    { src: "/products/salesforce-daily-quiz/daily.png", alt: "The daily challenge start screen with the current streak", caption: "Daily challenge" },
    { src: "/products/salesforce-daily-quiz/quiz.png", alt: "A Salesforce scenario question with the explanation shown", caption: "Question" },
    { src: "/products/salesforce-daily-quiz/results.png", alt: "Results with streak, week view and share grid", caption: "Results" },
    { src: "/products/salesforce-daily-quiz/options.png", alt: "Settings overview", caption: "Settings" },
  ],

  install: [
    "Download and unzip.",
    "Open chrome://extensions and turn on Developer mode.",
    "Click Load unpacked and choose the folder.",
  ],
} as const;

export const focusquestPrivacy = {
  effectiveDate: "28 September 2026",
  permissions: [
    {
      title: "storage",
      body: "Saves your settings, timer, quiz progress, question banks and stats in chrome.storage.local, on your device.",
    },
    {
      title: "idle",
      body: "Tells the extension when you’ve stepped away from the computer, so the timer pauses instead of counting idle time.",
    },
    {
      title: "alarms",
      body: "Refreshes the time remaining shown on the toolbar badge at regular intervals.",
    },
    {
      title: "tabs",
      body: "Reads the address of open tabs to tell whether they are on a tracked site, and messages those tabs to lock or unlock them.",
    },
    {
      title: "scripting and optional host permissions",
      body: "Used only if you add a custom site to track. Chrome asks you to grant access to that site at the moment you add it; nothing is requested otherwise.",
    },
  ],
} as const;
