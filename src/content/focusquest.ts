// Salesforce Daily Quiz: a Chrome extension I built. Copy for /products/salesforce-daily-quiz and its privacy policy.

export const focusquest = {
  name: "Salesforce Daily Quiz",
  headline: "A daily Salesforce quiz. *Right in Chrome.*",
  intro: "Five Salesforce questions a day, the same for everyone. Keep a streak and see where you rank, or practise privately. Free, anonymous, no account.",
  status: "Free. Chrome Web Store listing coming soon.",
  webHref: "https://play.sfdq.workers.dev",
  downloadHref: "/downloads/salesforce-daily-quiz.zip",
  privacyHref: "/products/salesforce-daily-quiz/privacy",

  demo: {
    src: "/products/salesforce-daily-quiz/demo.mp4",
    poster: "/products/salesforce-daily-quiz/demo-poster.jpg",
    captions: "/products/salesforce-daily-quiz/demo.vtt",
    title: "Salesforce Daily Quiz demo",
  },

  install: [
    "Download and unzip.",
    "Open chrome://extensions and turn on Developer mode.",
    "Click Load unpacked and choose the folder.",
  ],
} as const;

export const focusquestPrivacy = {
  effectiveDate: "3 October 2026",
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
