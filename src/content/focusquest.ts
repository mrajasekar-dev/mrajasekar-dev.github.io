// FocusQuest: a Chrome extension I built. Copy for /products/focusquest and its privacy policy.

export const focusquest = {
  name: "FocusQuest",
  tagline: "Earn your scroll",
  headline: "Earn your scroll. *Answer your way back in.*",
  intro:
    "A Chrome extension for people who lose evenings to YouTube and social media. When your time is up, every social tab pauses and a quiz takes over the screen. Pass it and you get more time; the questions are Salesforce developer interview scenarios, or anything you choose to import.",
  status: "Chrome Web Store listing coming soon. Until then, install it unpacked from the zip below.",
  downloadHref: "/downloads/focusquest.zip",
  privacyHref: "/products/focusquest/privacy",

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
    "One shared timer across 14 sites, plus any site you add yourself. The default is 60 minutes.",
    "When it runs out, every tracked tab pauses and a full-screen quiz appears.",
    "Score 70% on a 30-question quiz to unlock more time.",
    "200 scenario-based Salesforce developer questions are built in: triggers, async Apex, governor limits, LWC, integration, security and sharing, flows, order of execution, DevOps and more.",
    "Import your own question bank as JSON or CSV to study anything else.",
  ],

  steps: [
    {
      title: "Browse as usual",
      body: "Time on any tracked site counts toward one shared limit. The timer pauses when you step away from the computer.",
    },
    {
      title: "Time runs out",
      body: "Every social tab pauses at once and the lock screen appears, with your own reason for studying if you’ve written one.",
    },
    {
      title: "Take the quiz",
      body: "Thirty scenario questions, with lives, lifelines, an optional per-question timer and explanations for the answers.",
    },
    {
      title: "Earn your time",
      body: "Reach the pass mark and the tabs unlock with more time on the clock. The amount earned per pass is yours to set.",
    },
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
      items: ["15 themes (plus one that follows your system), and a custom accent colour", "Font and text size", "Motion level", "Sound packs"],
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
    { src: "/products/focusquest/lock.png", alt: "FocusQuest lock screen shown when the time limit is reached", caption: "Lock screen" },
    { src: "/products/focusquest/quiz.png", alt: "A FocusQuest quiz question with lives, streak and lifelines", caption: "Quiz" },
    { src: "/products/focusquest/results.png", alt: "FocusQuest results screen after a quiz", caption: "Results" },
    { src: "/products/focusquest/options.png", alt: "FocusQuest options page with the theme gallery", caption: "Options and themes" },
  ],

  install: [
    "Download focusquest.zip and unzip it.",
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
