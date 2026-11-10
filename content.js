/* ============================================================
   Louis Liu — Portfolio content
   All site copy and case study data lives here. app.js only renders it.
   Edit content in this file; edit layout/behaviour in app.js.
============================================================ */
window.PORTFOLIO = (function () {
  "use strict";

  const CASES = [
    {
      id: "signals",
      title: "Signals expansion",
      cat: "B2B SaaS · GTM Intelligence",
      desc: "One place for admins to turn business events into explainable signals that trigger alerts and workflows, taken from concept to beta in one quarter.",
      date: "Nov 2025 — Jan 2026",
      year: 2026,
      thumb: "assets/signals-thumb.jpg",
      thumbPos: "center 62%", // keep the laptop screen in frame when cropped
      hero: "assets/signals-hero.png",
      role: "Product Designer",
      team: "PM · Eng · Content design · UX research",
      timeline: "Nov 2025 – Jan 2026 (beta)",
      platform: "6sense Platform",
      hmw: "How might we help GTM teams catch the moment an account changes, and trust the signal enough to act on it?",
      sections: [
        { k: "At a glance", h: "From concept to beta in one quarter", p: [
          `<strong>Problem:</strong> Sales and marketing teams miss the short window when an account becomes ready to talk. 6sense’s scores could have told them, but users couldn’t see how they were calculated, so they didn’t trust them.`,
          `<strong>Solution:</strong> Signals, a single place where admins turn business events like funding rounds, leadership hires and hiring spikes into explainable triggers for alerts and workflows.`,
          `<strong>Impact:</strong> [TODO: beta and GA outcome, with a number if possible]`,
          `<strong>Constraint:</strong> One quarter, set by business priority rather than engineering limits. We aimed for a beta on purpose: a smaller, trustworthy release with room to keep testing with real customers before general availability.`
        ] },
        { k: "Context", h: "The right moment was hidden in a black box", p: [
          `The real problem was timing. Teams had plenty of accounts. What they lacked was a reliable way to know <strong>when</strong> one had changed (a new CMO, a funding round, a hiring spike) so outreach would feel relevant instead of cold.`,
          `6sense already had much of this data, spread across separate features, and its scores were calculated behind the scenes. Usage data showed customers spent little time in the app, and churn calls told us why: they didn’t understand where the data came from, so they couldn’t <span class="hl">trust</span> it. Meanwhile, PM-led customer research found business events coming up in more than 60 customer calls, all from current or former ZoomInfo customers.`,
          `Without a better option, every role faked timing its own way. SDR managers built “not touched in 30 days” lists in the CRM. Demand gen refreshed lists by hand from Sales Navigator and news alerts. RevOps stitched intent and CRM changes into fragile scoring rules. AEs relied on Google Alerts and gut feel: fine for 10 accounts, useless for 1,000.`
        ], fig: { src: "assets/signals-hero.png", cap: "Signals: set up a business event once, then use it to alert teams and trigger workflows" } },
        { k: "Discovery", h: "A signal is a hand wave, not a dashboard", p: [
          `Early in planning I noticed we were about to copy a feature competitors had shipped without confirming the problem it solved for our customers. So I planned and ran a generative study with 9 sales and marketing professionals: how they describe signals, who creates them, what makes one successful, and what they do once one fires. I synthesized it through affinity mapping, alongside a discovery study our UX researcher ran on where users look for account changes today.`,
          `Three findings shaped everything after. <strong>Signals are calls to action:</strong> people described them as “a hand wave,” “a flare,” “a traffic light.” <strong>Relevance depends on context:</strong> the same event matters to one account plan and is noise to another. <strong>Trust comes from accuracy, timeliness and relevance:</strong> “Why would I trust this?” came up again and again.`
        ], callout: "A signal only earns attention if users can see why it fired.", fig: { src: "assets/signals-research.png", cap: "Affinity mapping across five research questions" } },
        { k: "Decision 1", h: "Admins first, everyone later", p: [
          `The long-term goal is for anyone to create their own signals. With one quarter, I narrowed the beta to <strong>primary admins and admins</strong>.`,
          `Usage data showed these power users set up the platform, use the most features, and define the practices sellers and marketers follow. Sales leadership put it bluntly: expecting reps to configure intent data is unrealistic, but an alert they can act on works. Getting admins right first meant everyone else would inherit good signals, and gave us a small expert group to learn from before opening signals to everyone at general availability.`
        ] },
        { k: "Decision 2", h: "Create a signal once, use it anywhere", p: [
          `I explored two structures: define a signal and its uses in one flow, or keep them separate. A workshop idea pushed further: build signals directly inside Workflows. I chose separation. A dedicated Signals page owns configuration, and Workflows picks a signal as its trigger node, showing what it tracks and where else it’s used.`,
          `[TODO: Louis’s reasoning, e.g. one signal reused across many workflows and future apps like alerts, account dashboards and AI email]`
        ], fig: { src: "assets/signals-hifi-downstream.png", cap: "In Workflows, a signal is the trigger, with what it tracks one click away" } },
        { k: "Decision 3", h: "Simple enough to fit the task", p: [
          `I kept the signal model deliberately small: a signal is one or more event types (funding, leadership hire, headcount growth), each with a few conditions. Signals that combine event types moved to general availability after the team questioned whether customers would combine them at all. The beta would tell us. Templates, playbooks and AI-assisted creation were cut for time.`,
          `Because creation stayed short, it could live in a side panel instead of a separate page, so users stay oriented in the task behind it. [TODO: confirm panel type]`
        ], fig: { src: "assets/signals-concept-lofi.png", cap: "Layout explorations: a primary task area with supporting help beside it" } },
        { k: "Decision 4", h: "Show the evidence before publishing", p: [
          `To answer “why would I trust this?” at the moment of creation, I added two checks beside the form. <strong>Estimated impact</strong> shows how many events the signal would have caught in the past 90 days. <strong>Example signal results</strong> previews the data a user will actually receive. Admins can tune a signal before anyone downstream relies on it.`
        ], two: ["assets/signals-hifi-nav.png", "assets/signals-hifi-config.png"] },
        { k: "Beta", h: "Users don’t come to the app. It has to come to them", p: [
          `The beta changed our idea of success. Admins set up signals and alerts, then waited to be notified instead of checking the app. A robust alert system mattered more than an in-app feed. That matched the research, and the customer requests for triggers and alerts, the request theme tied to the most customer revenue.`,
          `[TODO: how this changed the GA design, and any outcome numbers]`
        ] },
        { k: "Reflection", h: "What went well, what I’d sharpen", p: [
          `<strong>What went well:</strong> working as a four-in-a-box pod with PM, engineering, research and content design; grounding scope in research when the pressure was to copy competitors; and documenting decisions so the team could move fast.`,
          `<strong>What I’d improve:</strong> more discovery-style exploration at the start of planning, and more concrete persona and market definition brought into the process earlier.`
        ] }
      ]
    },
    {
      id: "crm",
      title: "CRM object permissions",
      cat: "B2B SaaS · Onboarding",
      desc: "Surfacing hidden CRM permission gaps at a glance, so admins can self-diagnose and fix sync errors before they cascade into failed onboarding.",
      date: "2025",
      year: 2025,
      thumb: "assets/crm-thumb.jpg",
      thumbPos: "center 55%", // keep the laptop screen in frame when cropped
      hero: "assets/crm-hero.png",
      role: "Product Designer",
      team: "PM · Eng · Content · Support",
      timeline: "2025",
      platform: "6sense Onboarding",
      hmw: "How might we empower admins to independently diagnose CRM permission statuses?",
      sections: [
        { k: "Problem", h: "Permissions fail silently", p: [
          `Today, RevOps and IT admins can finish a CRM integration even if they haven’t granted 6sense permission to every mandatory object. Teams discover <span class="hl">missing permissions</span> later — through sync failures or incomplete data ingestion — which creates confusion, delays onboarding, and increases Support and CSM escalations.`,
          `Admins are often unaware permissions are missing <strong>because</strong> identifying which object lacks access isn’t obvious, which leaves them confused and slows down fixes.`
        ], fig: { src: "assets/crm-hero.png", cap: "The CRM integration setup where permission gaps go unnoticed" } },
        { k: "Hypothesis", h: "Make status visible at a glance", p: [
          `<strong>If</strong> we make required-object permission statuses visible at a glance, <strong>then</strong> admins stay informed during setup and ensure an error-free data connection. The job-to-be-done: "make sure 6sense has permission to all required objects, so I can set up the connection successfully."`
        ], callout: "Surface the error where the work happens — don’t make admins go hunting." },
        { k: "Design", h: "Three moves that fixed it", p: [
          `<strong>High visibility</strong> — essential objects and their permission statuses appear directly, no extra clicks, with a prominent <em>Recheck permission</em> action.`,
          `<strong>Help in context</strong> — instructions live in a drawer, giving admins one comprehensive view of everything they need.`,
          `<strong>Separate advanced objects</strong> — non-blocking objects move to their own section so admins can prioritize what matters for initial setup.`
        ], two: ["assets/crm-hifi-a.png", "assets/crm-hifi-c.png"] },
        { k: "Reflection", h: "Strengths & growth", p: [
          `<strong>What went well:</strong> cross-functional collaboration unified internal knowledge; a strong partnership with content design established clear hierarchy; support insights flowed directly into improvements.`,
          `<strong>What could improve:</strong> establish robust success metrics earlier, and accelerate feedback loops with support to catch recurring issues faster.`
        ] }
      ]
    },
    {
      id: "taxonomy",
      title: "Taxonomy for predictive models",
      cat: "B2B SaaS · Data Onboarding",
      desc: "Helping admins confidently classify their data for 6sense predictive models during onboarding — a system for clarity under complexity.",
      date: "2024",
      year: 2024,
      thumb: "assets/taxonomy-thumb.jpg",
      thumbPos: "center 52%", // keep the laptop screen in frame when cropped
      hero: "assets/home-card-taxonomy.png",
      comingSoon: true,
      hmw: "How might we empower admins to confidently classify their data for 6sense predictive models during onboarding?"
    }
  ];

  // Past projects (reverse-chron). Case studies link internally; walkthroughs open external prototypes.
  const PROJECTS = [
    { name: "Signals expansion", sub: "GTM intelligence, made explainable", tag: "Case study", date: "2026", to: "case/signals" },
    { name: "CRM object permissions", sub: "Self-diagnosing onboarding", tag: "Case study", date: "2025", to: "case/crm" },
    { name: "Taxonomy for predictive models", sub: "Classifying data with confidence", tag: "Soon", date: "2024", to: "case/taxonomy" },
    { name: "Insurance content display", sub: "Regulatory info for brokers, simplified", tag: "Prototype", date: "2022", href: "https://xd.adobe.com/view/b7440248-60d6-4353-903f-31ead172239c-e217/" },
    { name: "Intelligent farming · FurrowTechnik", sub: "Precise control during field work", tag: "Prototype", date: "2021", href: "https://xd.adobe.com/view/11e5b7e0-ddb7-45db-972d-78c451c8c679-44b6/?fullscreen" }
  ];


  // Life board — one Pinterest-style feed; order interleaves the categories.
  // Outdoors = me doing something out there (snowboarding, hiking, camping); Photography = the view.
  const PIN_CATS = {
    wood: { label: "Woodworking", note: "Measure twice, cut once. A hobby that balances creativity with a satisfying amount of precision." },
    photo: { label: "Photography", note: "Moments worth looking back on and saying, \u201coh yeah, that was cool.\u201d" },
    outdoors: { label: "Outdoors", note: "Snowboarding, hiking, and camping: any excuse to get out and see what\u2019s over the next ridge." },
    events: { label: "Events", note: "Conferences and game days: the crowds, the energy, and a photo to prove I was there." }
  };
  const PINS = [
    { cat: "wood", src: "assets/wood-1.jpg", w: 1440, h: 1440, title: "Holiday string art" },
    { cat: "outdoors", src: "assets/travel-10.jpg", w: 886, h: 886, title: "Past the beginner line" },
    { cat: "photo", src: "assets/travel-19.jpg", w: 1024, h: 768, title: "Tea terraces from above" },
    { cat: "events", src: "assets/event-1.jpg", w: 768, h: 1024, title: "Figma Config" },
    { cat: "photo", src: "assets/travel-3.jpg", w: 2995, h: 2995, title: "Terraced village in the mist" },
    { cat: "wood", src: "assets/wood-5.jpg", w: 886, h: 886, title: "Stocking holders on the mantel" },
    { cat: "outdoors", src: "assets/travel-11.jpg", w: 1024, h: 768, title: "Bootpack to the ridge" },
    { cat: "photo", src: "assets/travel-17.jpg", w: 1024, h: 767, title: "Tiered waterfall" },
    { cat: "outdoors", src: "assets/travel-18.jpg", w: 1024, h: 768, title: "Afternoon sail" },
    { cat: "wood", src: "assets/wood-2.jpg", w: 3024, h: 4032, title: "Entryway organizer" },
    { cat: "photo", src: "assets/travel-7.jpg", w: 1086, h: 724, title: "Cholla garden at dusk" },
    { cat: "photo", src: "assets/travel-20.jpg", w: 1182, h: 665, title: "Space Needle from above" },
    { cat: "events", src: "assets/event-2.jpg", w: 768, h: 1024, title: "Outside the Bucks\u2019 arena" },
    { cat: "outdoors", src: "assets/travel-14.jpg", w: 1159, h: 678, title: "Selfie-stick run" },
    { cat: "wood", src: "assets/wood-4.jpg", w: 886, h: 886, title: "String art in the clamps" },
    { cat: "photo", src: "assets/travel-12.jpg", w: 886, h: 886, title: "Peaks in black and white" },
    { cat: "photo", src: "assets/travel-1.jpg", w: 2496, h: 1664, title: "Wildflowers" },
    { cat: "outdoors", src: "assets/travel-8.jpg", w: 1024, h: 768, title: "Desert campsite" },
    { cat: "photo", src: "assets/travel-21.jpg", w: 1024, h: 768, title: "Village under the clouds" },
    { cat: "photo", src: "assets/travel-16.jpg", w: 1024, h: 768, title: "Bridge from above" },
    { cat: "events", src: "assets/event-3.jpg", w: 768, h: 1024, title: "On the field at AT&T Stadium" },
    { cat: "wood", src: "assets/wood-3.jpg", w: 4032, h: 3024, title: "Farmhouse end table" },
    { cat: "photo", src: "assets/travel-2.jpg", w: 4032, h: 3024, title: "Sculpture at golden hour" },
    { cat: "outdoors", src: "assets/travel-15.jpg", w: 768, h: 1024, title: "Hiking in through the trees" },
    { cat: "photo", src: "assets/travel-22.jpg", w: 1182, h: 665, title: "Lines from above" },
    { cat: "wood", src: "assets/wood-6.jpg", w: 768, h: 1024, title: "Fresh-cut log slices" },
    { cat: "photo", src: "assets/travel-9.jpg", w: 1182, h: 665, title: "Interchange from above" },
    { cat: "outdoors", src: "assets/travel-13.jpg", w: 1024, h: 768, title: "Summit break" },
    { cat: "photo", src: "assets/travel-5.jpg", w: 4096, h: 2304, title: "Drone over open water" },
    { cat: "photo", src: "assets/travel-6.jpg", w: 360, h: 480, title: "Painted hills" },
    { cat: "photo", src: "assets/travel-4.jpg", w: 4032, h: 3024, title: "Stone alley" }
  ];

  // Experience exactly as listed on assets/Resume_Louis_Liu.pdf — shown on the home bento.
  const RESUME = [
    { company: "6sense", roles: [
      { title: "Senior Product Designer", place: "Remote", dates: "Oct 2025 – Present" },
      { title: "Product Designer III", place: "Remote", dates: "Oct 2024 – Oct 2025" },
      { title: "User Experience Designer", place: "Remote", dates: "Apr 2022 – Oct 2024" }
    ] },
    { company: "Zywave", roles: [
      { title: "User Experience Designer", place: "Remote", dates: "Mar 2021 – Apr 2022" }
    ] },
    { company: "Dawn Equipment", roles: [
      { title: "User Experience Designer", place: "Madison, WI", dates: "Aug 2020 – Mar 2021" }
    ] },
    { company: "Kerry EAS Logistics", roles: [
      { title: "Management Trainee, Key Account Associate", place: "Beijing, China", dates: "Aug 2017 – Aug 2018" }
    ] }
  ];

  // Professional journey — rendered as an enterprise changelog.
  // layers drive the local filter toolbar.
  const JOURNEY = [
    {
      version: "v2.6", company: "6sense", role: "Senior Product Designer",
      timeline: "Oct 2025 — Present", promoted: true, layers: ["6sense", "ai-saas"],
      tags: ["Platform Architecture", "Scalability", "End-to-End Initiatives"],
      logs: ["Lead end-to-end platform design initiatives focused on driving consistency, system-level scalability, and seamless user orchestration across the entire enterprise product ecosystem."]
    },
    {
      version: "v2.5", company: "6sense", role: "Product Designer III",
      timeline: "Oct 2024 — Oct 2025 · 1 yr 1 mo", promoted: true, layers: ["6sense", "ai-saas"],
      tags: ["System Integrations", "Platform Operations", "Cross-Functional Enablement"],
      logs: ["Led critical experience improvements for core system integrations and foundational platform initiatives, actively enabling and unblocking cross-functional product teams."]
    },
    {
      version: "v2.0", company: "6sense", role: "User Experience Designer",
      timeline: "Apr 2022 — Oct 2024 · 2 yrs 7 mos", layers: ["6sense", "ai-saas"],
      tags: ["Revenue AI™", "Big Data Architecture", "AI–Human Loops"],
      logs: ["Owned and optimized the end-to-end user experience for <strong>6sense Revenue AI™ for Sales</strong> — a high-stakes enterprise platform utilizing predictive models and big data to streamline sales workflows and lower cognitive load for power users."]
    },
    {
      version: "v1.5", company: "Zywave", role: "User Experience Designer",
      timeline: "Mar 2021 — Apr 2022 · 1 yr 2 mos", layers: ["ai-saas"],
      tags: ["B2B SaaS", "Design Token Systems", "Multi-Tenant Architecture"],
      logs: [
        "Operated as a shared core design expert across 4 distinct cross-functional mission teams to uncover complex user friction nodes and deliver high-fidelity platform solutions.",
        "Designed and maintained robust SaaS quoting and configuration solutions deployed to over <strong>15,000 insurance brokers</strong> for complex employee benefit proposals.",
        "Audited, updated, and scaled design standards within Zywave’s proprietary design system, ensuring absolute UI consistency and component health across the entire enterprise software suite."
      ]
    },
    {
      version: "v1.0", company: "Dawn Equipment Company", role: "Founding Product Designer",
      timeline: "Aug 2020 — Mar 2021 · 8 mos", layers: ["physical"],
      tags: ["Founding Designer", "IoT / Hardware Interfaces", "Native Tablet UI"],
      logs: [
        "Established the internal design function as the founding in-house designer, partnering with a lean development team to evaluate legacy systems and architect scalable digital improvements.",
        "Designed the native tablet application interface utilized by <strong>70+ agricultural operators</strong> to monitor and control complex heavy machinery telemetry in real time.",
        "Orchestrated a comprehensive redesign of the digital platform, boosting product visibility and introducing unified post-sale technical support workflows."
      ]
    },
    {
      version: "v0.5", company: "Kerry Logistics", role: "Associate Key Account Manager · Management Trainee",
      timeline: "Aug 2017 — Aug 2018 · 1 yr 1 mo", layers: ["physical"],
      tags: ["Operations Infrastructure", "Data Analytics", "Systems Optimization"],
      logs: [
        "<span class=\"cl-lead\">System Optimization</span> Performed deep data and spatial analysis on outbound shipping dock workflows; led an operational floor redesign with a team of 3 that <strong>doubled daily processing capacity</strong> from 6 to 12 truckloads.",
        "<span class=\"cl-lead\">Data Management</span> Owned monthly warehousing inbound/outbound telemetry logs for <strong>33 enterprise key accounts</strong> within the northern logistics node."
      ]
    }
  ];

  const JOURNEY_FILTERS = [
    { k: "all", label: "All Layers" },
    { k: "6sense", label: "6sense Nodes Only" },
    { k: "ai-saas", label: "Enterprise AI/SaaS" },
    { k: "physical", label: "Physical / Logistics Systems" }
  ];

  return { CASES, PROJECTS, PIN_CATS, PINS, RESUME, JOURNEY, JOURNEY_FILTERS };
})();
