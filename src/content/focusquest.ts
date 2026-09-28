// Salesforce Daily Quiz: a Chrome extension I built. Copy for /products/salesforce-daily-quiz and its privacy policy.

export const focusquest = {
  name: "Salesforce Daily Quiz",
  tagline: "A daily Salesforce quiz, right in Chrome",
  headline: "Five Salesforce questions a day. *Optional focus timer.*",
  intro:
    "A Chrome extension for Salesforce developers and admins preparing for interviews or keeping sharp. Every day it serves the same five scenario questions to everyone, like a daily word puzzle. A practice arena holds 200 more. If you want it to, it can also pause YouTube and social media after a time limit until you pass a short quiz.",
  status: "Chrome Web Store listing coming soon. Until then, install it unpacked from the zip below.",
  downloadHref: "/downloads/salesforce-daily-quiz.zip",
  privacyHref: "/products/salesforce-daily-quiz/privacy",

  /** Sites counted by the shared timer. */
  sites: [
    "YouTube",
    "Instagram",
    "Facebook",
    "X",
    "TikTok",
    "Reddit",
    "Snapchat",
    "Pinterest",
    "Threads",
    "Twitch",
    "Tumblr",
    "Quora",
    "9GAG",
    "LinkedIn (optional)",
  ],

  what: [
    "A daily challenge: the same five Salesforce scenarios for everyone each day, one attempt, with a daily streak and a shareable result.",
    "A practice arena with 200 scenario MCQs: triggers, async Apex, governor limits, LWC, integration, security and sharing, flows, order of execution, DevOps and more. Practise by topic, difficulty, mistakes or bookmarks.",
    "An optional focus timer: one shared allowance across YouTube and social media. When it runs out, tracked tabs pause until you pass a short quiz. It stays off until you turn it on.",
    "Import your own questions as JSON or CSV to study anything else.",
  ],

  steps: [
    { title: "Open the daily set", body: "Five scenario questions, the same for everyone that day. One attempt, with explanations after each answer." },
    { title: "Keep the streak", body: "Come back tomorrow for a new set. Your daily streak, accuracy and rank build over time." },
    { title: "Practise on demand", body: "Drill any topic from the 200-question bank, or review only the questions you got wrong." },
    { title: "Add focus if you want it", body: "Turn on the focus timer and social tabs pause after your allowance, until you pass a quiz." },
  ],

  features: [
    {
      title: "Lives and streaks",
      body: "Hearts for wrong answers, and combo multipliers for answers in a row.",
    },
    {
      title: "XP and ranks",
      body: "Experience points on every quiz, with ranks from Trailhead Rookie to CTA Legend.",
    },
    {
      title: "Lifelines",
      body: "50:50 removes two wrong answers; swap trades a question for another one.",
    },
    {
      title: "Optional question timer",
      body: "A per-question countdown, with a speed bonus for answering quickly.",
    },
    {
      title: "Achievements and daily goals",
      body: "Goals for the day, a day streak, and achievements for milestones along the way.",
    },
    {
      title: "Keyboard and sound",
      body: "Keyboard controls for answering, plus sound effects and confetti. Sound packs and motion level are adjustable.",
    },
  ],

  customization: [
    {
      label: "Look and feel",
      items: ["Five minimal light and dark themes, one that follows your system, and a custom accent colour", "Font and text size", "Motion level", "Sound packs"],
    },
    {
      label: "The quiz",
      items: [
        "Questions per quiz and pass mark",
        "Lives on or off",
        "Difficulty mix and topic filter",
        "Explanations mode",
      ],
    },
    {
      label: "The timer",
      items: [
        "Time limit and time earned per pass",
        "Focus schedule by day and hour",
        "Daily reset",
        "Always-allowed URLs, such as learning channels",
      ],
    },
    {
      label: "Everything else",
      items: [
        "Emergency passes",
        "Your own “why” on the lock screen",
        "Custom sites to track",
        "Backup and restore",
      ],
    },
  ],

  screenshots: [
    { src: "/products/salesforce-daily-quiz/daily.png", alt: "The daily challenge start screen", caption: "Daily challenge" },
    { src: "/products/salesforce-daily-quiz/quiz.png", alt: "A Salesforce scenario question with the explanation shown", caption: "Question" },
    { src: "/products/salesforce-daily-quiz/results.png", alt: "Results after the daily challenge", caption: "Results" },
    { src: "/products/salesforce-daily-quiz/options.png", alt: "The options page with themes", caption: "Options" },
  ],

  install: [
    "Download salesforce-daily-quiz.zip and unzip it.",
    "Open chrome://extensions in Chrome.",
    "Turn on Developer mode, top right.",
    "Click Load unpacked and choose the unzipped folder.",
  ],

  privacy: [
    "Everything is stored in your browser’s own extension storage.",
    "No account, no server, no analytics, no tracking.",
    "Nothing you do in the extension is sent anywhere.",
  ],

  builtWith: ["Manifest V3", "Vanilla JavaScript", "No dependencies"],
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
