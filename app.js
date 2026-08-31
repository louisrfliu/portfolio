/* ============================================================
   Louis Liu — Portfolio v2
   Vanilla router + GSAP micro-animations + Three.js hero glow
============================================================ */
(function () {
  "use strict";
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------
     DATA
  ---------------------------------------------------------- */
  const CASES = [
    {
      id: "signals",
      title: "Signals expansion",
      cat: "B2B SaaS · GTM Intelligence",
      desc: "A centralized system that turns powerful-but-opaque 6sense data into explainable business events, so GTM teams know exactly when and why to act.",
      date: "Nov 2025 — Jan 2026",
      year: 2026,
      thumb: "assets/home-card-signals.png",
      hero: "assets/signals-hero.png",
      role: "Lead Product Designer",
      team: "PM · Eng · Content · Research",
      timeline: "Nov 2025 – Jan 2026",
      platform: "6sense Platform",
      hmw: "How might we help GTM teams detect and act on business events to engage prospects at the right moment?",
      sections: [
        { k: "Context", h: "Powerful data, hidden behind a black box", p: [
          `6sense is known for its data quality and the GTM impact it brings. But key outcomes — keywords, 6QA, temperature scores — are formulas the platform calculates behind the scenes. The math is powerful, yet it creates a <span class="hl">"black box"</span> that erodes trust and obscures the right moment to act.`,
          `To improve transparency and explainability while helping users know <strong>when</strong> to act, we introduced <strong>Signals</strong> — our top priority leading into general availability in August 2026. The Platform Enablement team is building a centralized interface for users to detect, understand, and respond to business events.`
        ], fig: { src: "assets/signals-hero.png", cap: "Signals — a centralized home for detecting and acting on business events" } },
        { k: "Discovery", h: "Uncovering how users actually think about signals", p: [
          `I ran generative research across three goals: how users <strong>describe</strong> a feature like signals, how they <strong>create</strong> successful ones, and what <strong>outcomes</strong> they expect. The aim was to anchor the design in real mental models rather than internal jargon.`
        ], fig: { src: "assets/signals-research.png", cap: "Research synthesis — mapping user mental models to signal definitions" } },
        { k: "Principles", h: "What a signal should — and shouldn’t — be", p: [
          `Synthesis produced a sharp set of principles. A signal <span class="hl">should</span> grab attention and triage urgency, explain the "why" behind the alert, align to key metrics, fit users’ workflows, and drive immediate, coordinated action. It <span class="hl">should not</span> be vague, create false urgency, rely on untrusted data, sit siloed, or ignore ownership.`
        ], callout: "From noise to signal — every alert must earn the user’s attention." },
        { k: "Design", h: "Bringing it into the workflow", p: [
          `The feature lives on the main navigation, with clear event types and conditions per signal, and is surfaced directly inside the downstream applications where users already work — meeting people in context rather than forcing a detour.`
        ], two: ["assets/signals-hifi-nav.png", "assets/signals-hifi-config.png"] },
        { k: "Reflection", h: "What went well, what I’d sharpen", p: [
          `<strong>What went well:</strong> close collaboration with the 4IAB concept team, well-documented decisions, and insights communicated effectively across teams.`,
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
      thumb: "assets/home-card-crm.png",
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
      thumb: "assets/home-card-taxonomy.png",
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

  const PASSION = [
    { cat: "Personal · Tooling", title: "Workbench Companion", desc: "A small offline app I sketched to plan woodworking cut lists — minimizing waste from a single board with a visual nesting layout.", year: "2024", tag: "Concept", img: "assets/wood-2.jpg" },
    { cat: "Personal · Type", title: "Field Notes System", desc: "A personal note-taking system blending analog index cards with a lightweight digital catalog — designed around how I actually think on walks.", year: "2023", tag: "System", img: "assets/travel-3.jpg" }
  ];

  const WOOD = ["assets/wood-1.jpg", "assets/wood-2.jpg", "assets/wood-3.jpg"];
  const PHOTO = ["assets/travel-1.jpg", "assets/travel-2.jpg", "assets/travel-3.jpg", "assets/travel-4.jpg", "assets/travel-5.jpg"];
  const AI = ["Diffusion", "Agents", "Latent", "Prompts", "Vision", "Synthesis"];

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

  const ROUTES = { home: "Index", works: "Work", passion: "Passion", about: "About" };

  /* ----------------------------------------------------------
     HELPERS
  ---------------------------------------------------------- */
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));

  function splitWords(el) {
    const text = el.textContent;
    el.innerHTML = "";
    text.split(/(\s+)/).forEach((w) => {
      if (/^\s+$/.test(w)) { el.appendChild(document.createTextNode(w)); return; }
      const wrap = document.createElement("span");
      wrap.style.display = "inline-block";
      wrap.style.overflow = "hidden";
      wrap.style.verticalAlign = "top";
      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.textContent = w;
      inner.className = "_w";
      wrap.appendChild(inner);
      el.appendChild(wrap);
    });
    return $$("._w", el);
  }

  /* ----------------------------------------------------------
     PAGE TEMPLATES
  ---------------------------------------------------------- */
  function tHome() {
    return `
    <section class="hero">
      <div class="hero-grid">
        <div>
          <span class="eyebrow rv"><span class="ed"></span> Saint Paul, Minnesota, USA</span>
          <h1 class="hero-title" data-words>Where complex data meets human <em>intuition.</em></h1>
          <p class="hero-sub rv"><span class="hl">Senior Product Designer</span> leading 6sense AI Email. My focus is opening the "black box" by architecting trust, transparency, and human control into high-stakes AI systems.</p>
          <div class="hero-cta rv">
            <a class="btn solid" data-nav="works">View work <span class="arrow">→</span></a>
            <a class="btn" data-nav="about">About me</a>
          </div>
        </div>
        <div class="portrait rv" data-nav="about" role="img" aria-label="Portrait of Louis Liu">
          <img src="assets/portrait.jpg" alt="Louis Liu" onerror="this.src='assets/about-portrait.jpg'"/>
        </div>
      </div>

    </section>`;
  }

  function marqueeContent() {
    const items = ["System thinking", "·", "Design systems", "·", "B2B SaaS", "·", "Research", "·", "Prototyping", "·", "Craft", "·"];
    return `<span>${items.map((x) => x === "·" ? `<b>✦</b>` : x).join("</span><span>")}</span>`;
  }

  function featureCard(c, i) {
    const coming = c.comingSoon;
    return `
    <article class="feature ${coming ? "coming" : ""} rv" ${coming ? "" : `data-nav="case/${c.id}"`}>
      <div class="feature-img">
        <span class="feature-num">0${i + 1}</span>
        ${coming ? `<span class="feature-tag">Coming soon</span>` : ""}
        <div class="ph" style="background-image:url('${c.thumb}')"></div>
      </div>
      <div class="feature-body">
        <span class="feature-cat">${esc(c.cat)}</span>
        <h3 class="feature-title">${esc(c.title)}</h3>
        <p class="feature-desc">${esc(c.desc)}</p>
        <div class="feature-foot">
          <span class="feature-date">${esc(c.date)}</span>
          ${coming
            ? `<span class="feature-read cs">In progress</span>`
            : `<span class="feature-read">Read case <span class="arrow">→</span></span>`}
        </div>
      </div>
    </article>`;
  }

  function tWorks() {
    const sorted = PROJECTS.slice();
    return `
    <header class="page-head">
      <span class="eyebrow rv"><span class="ed"></span> Work · 2021—2026</span>
      <h1 class="page-h1" data-words>Selected case studies &amp; <em>shipped</em> work.</h1>
      <p class="page-lead rv">Three deep dives into how I think, paired with a running log of past projects — most recent first.</p>
    </header>

    <section style="padding-bottom:30px">
      <div class="sec-head">
        <span class="sec-label">Featured case studies</span>
        <span class="sec-count">03</span>
      </div>
      <div class="feature-list">
        ${CASES.map((c, i) => featureCard(c, i)).join("")}
      </div>
    </section>

    <section style="padding:80px 0 20px">
      <div class="sec-head">
        <span class="sec-label">All projects</span>
        <span class="sec-count">${String(sorted.length).padStart(2, "0")}</span>
      </div>
      <div class="proj-list">
        ${sorted.map((p, i) => projectRow(p, i)).join("")}
      </div>
    </section>

    ${contactBand()}
    ${footer()}`;
  }

  function projectRow(p, i) {
    const attrs = p.to ? `data-nav="${p.to}"` : `data-href="${p.href}"`;
    return `
    <div class="proj-row rv" ${attrs}>
      <span class="proj-idx">${String(i + 1).padStart(2, "0")}</span>
      <div class="proj-name">${esc(p.name)}<small>${esc(p.sub)}</small></div>
      <span class="proj-tag">${esc(p.tag)}</span>
      <span class="proj-date">${esc(p.date)} <span class="proj-arrow">↗</span></span>
    </div>`;
  }

  function tCase(id) {
    const idx = CASES.findIndex((c) => c.id === id);
    const c = CASES[idx];
    if (!c) return tNotFound();
    if (c.comingSoon) return tCaseComing(c, idx);
    const prev = CASES[idx - 1];
    const next = CASES[idx + 1];
    return `
    <article class="case-wrap">
      <div class="case-top">
        <a class="case-back" data-nav="works"><span class="a">←</span> All work</a>
        <h1 class="case-title" data-words>${esc(c.title)}</h1>
        <div class="case-meta rv">
          <div class="cm"><span class="cm-k">Role</span><span class="cm-v">${esc(c.role)}</span></div>
          <div class="cm"><span class="cm-k">Team</span><span class="cm-v">${esc(c.team)}</span></div>
          <div class="cm"><span class="cm-k">Timeline</span><span class="cm-v">${esc(c.timeline)}</span></div>
          <div class="cm"><span class="cm-k">Platform</span><span class="cm-v">${esc(c.platform)}</span></div>
        </div>
        <div class="case-hero-img rv"><img src="${c.hero}" alt="${esc(c.title)}"/></div>
      </div>

      <div class="case-body">
        <div class="case-section rv">
          <div class="case-klabel">How might we</div>
          <p class="case-p" style="font-size:21px;line-height:1.55;color:var(--text)">${esc(c.hmw)}</p>
        </div>
        ${c.sections.map(caseSection).join("")}

        <nav class="case-nav">
          ${prev
            ? `<div class="case-nav-item" data-nav="case/${prev.id}"><span class="cn-k"><span class="a">←</span> Previous</span><span class="cn-t">${esc(prev.title)}</span></div>`
            : `<div class="case-nav-item disabled"><span class="cn-k">← Previous</span><span class="cn-t">—</span></div>`}
          ${next
            ? `<div class="case-nav-item next" data-nav="case/${next.id}"><span class="cn-k">Next <span class="a">→</span></span><span class="cn-t">${esc(next.title)}</span></div>`
            : `<div class="case-nav-item next disabled"><span class="cn-k">Next →</span><span class="cn-t">—</span></div>`}
        </nav>
      </div>
    </article>
    ${footer()}`;
  }

  function caseSection(s) {
    const figs = s.fig ? `<figure class="case-fig"><img src="${s.fig.src}" alt=""/><figcaption>${esc(s.fig.cap)}</figcaption></figure>` : "";
    const two = s.two ? `<div class="case-two">${s.two.map((src) => `<figure class="case-fig" style="margin:0"><img src="${src}" alt=""/></figure>`).join("")}</div>` : "";
    const call = s.callout ? `<div class="callout"><p>${esc(s.callout)}</p></div>` : "";
    return `
    <section class="case-section rv">
      <div class="case-klabel">${esc(s.k)}</div>
      <h2 class="case-h2">${esc(s.h)}</h2>
      ${s.p.map((para) => `<p class="case-p">${para}</p>`).join("")}
      ${call}${figs}${two}
    </section>`;
  }

  function tCaseComing(c, idx) {
    const prev = CASES[idx - 1];
    return `
    <article class="case-wrap">
      <div class="case-top">
        <a class="case-back" data-nav="works"><span class="a">←</span> All work</a>
        <h1 class="case-title" data-words>${esc(c.title)}</h1>
        <div class="case-body" style="padding-top:50px">
          <div class="case-section rv">
            <div class="case-klabel">In progress</div>
            <p class="case-p" style="font-size:20px;color:var(--text)">${esc(c.hmw)}</p>
            <p class="case-p">This case study is being written up. In the meantime, take a look at the other two deep dives.</p>
          </div>
          <nav class="case-nav">
            <div class="case-nav-item" data-nav="case/${prev.id}"><span class="cn-k"><span class="a">←</span> Previous</span><span class="cn-t">${esc(prev.title)}</span></div>
            <div class="case-nav-item next disabled"><span class="cn-k">Next →</span><span class="cn-t">—</span></div>
          </nav>
        </div>
      </div>
    </article>
    ${footer()}`;
  }

  function tPassion() {
    return `
    <header class="page-head">
      <span class="eyebrow rv"><span class="ed"></span> Off the clock</span>
      <h1 class="page-h1" data-words>Things I make when <em>nobody</em> assigns them.</h1>
      <p class="page-lead rv">Self-directed design experiments, plus the woodworking, photography, and AI explorations that keep my hands and curiosity busy.</p>
    </header>

    <section>
      <div class="sec-head"><span class="sec-label">Personal projects</span><span class="sec-count">0${PASSION.length}</span></div>
      <div class="passion-cs">
        ${PASSION.map(passionCard).join("")}
      </div>
    </section>

    <section class="gallery-block">
      <div class="sec-head"><span class="sec-label">Woodworking</span><span class="sec-count">0${WOOD.length}</span></div>
      <p class="page-lead rv" style="margin-top:-26px;margin-bottom:34px">Measure twice, cut once. A hobby that balances creativity with a satisfying amount of precision.</p>
      <div class="gal-grid gal-wood">
        ${WOOD.map((src, i) => galItem(src, `Build 0${i + 1}`)).join("")}
      </div>
    </section>

    <section class="gallery-block">
      <div class="sec-head"><span class="sec-label">Photography</span><span class="sec-count">0${PHOTO.length}</span></div>
      <p class="page-lead rv" style="margin-top:-26px;margin-bottom:34px">Moments worth looking back on and saying, "oh yeah, that was cool."</p>
      <div class="gal-grid gal-photo">
        ${PHOTO.map((src, i) => galItem(src, `Frame 0${i + 1}`, i === 0 ? "span2" : "")).join("")}
      </div>
    </section>

    <section class="gallery-block">
      <div class="sec-head"><span class="sec-label">AI exploration</span><span class="sec-count">0${AI.length}</span></div>
      <p class="page-lead rv" style="margin-top:-26px;margin-bottom:34px">Ongoing experiments at the edge of generative tools — interfaces, agents, and what design becomes next.</p>
      <div class="gal-grid gal-ai">
        ${AI.map((label, i) => aiItem(label, i)).join("")}
      </div>
    </section>

    ${contactBand()}
    ${footer()}`;
  }

  function passionCard(p) {
    return `
    <article class="pcs rv">
      <div class="pcs-img"><div class="ph" style="background-image:url('${p.img}')"></div></div>
      <div class="pcs-body">
        <span class="pcs-cat">${esc(p.cat)}</span>
        <h3 class="pcs-title">${esc(p.title)}</h3>
        <p class="pcs-desc">${esc(p.desc)}</p>
        <div class="pcs-meta"><span>${esc(p.tag)}</span><span>${esc(p.year)}</span></div>
      </div>
    </article>`;
  }

  function galItem(src, cap, cls) {
    return `<div class="gal-item rv ${cls || ""}"><div class="ph" style="background-image:url('${src}')"></div><span class="gal-cap">${esc(cap)}</span></div>`;
  }

  function aiItem(label, i) {
    return `<div class="gal-item rv"><div class="ai-ph"><span>${esc(label)}</span></div><span class="gal-cap">Experiment 0${i + 1}</span></div>`;
  }

  function tAbout() {
    return `
    <section class="about-hero">
      <div>
                <h1 class="page-h1" data-words>Hi, it’s <em>Louis</em>.</h1>
        <p class="page-lead rv">Born in China, raised between two languages, and now building a wonderfully chaotic life with my family in Saint Paul, MN. I&rsquo;m a Senior Product Designer at 6sense, where I bring the same clarity I practice at the workbench to every product I design.</p>
        <p class="page-lead rv" style="margin-top:18px">I&rsquo;m drawn to the hard, unglamorous problems — data onboarding, permissions, the moments where complexity quietly defeats people. My job is to make those moments feel obvious.</p>
        <div class="about-links rv">
          <a class="btn" href="https://www.linkedin.com/in/louisrfliu" target="_blank" rel="noreferrer">LinkedIn <span class="arrow">↗</span></a>
        </div>
      </div>
      <div>
        <div class="about-portrait rv"><img src="assets/about-portrait.jpg" alt="Louis Liu"/></div>
      </div>
      <div class="about-facts rv">
        <div class="fact"><div class="fact-k">Based in</div><div class="fact-v">Saint Paul, MN</div></div>
        <div class="fact"><div class="fact-k">Languages</div><div class="fact-v">English · 中文</div></div>
        <div class="fact"><div class="fact-k">Currently</div><div class="fact-v">Senior PD @ 6sense</div></div>
        <div class="fact"><div class="fact-k">Off the clock</div><div class="fact-v">Woodworking · Travel</div></div>
      </div>
    </section>

    <section class="journey" id="journey">
      <div class="sec-head cl-head">
        <span class="sec-label">Professional journey</span>
        <a class="cl-download" href="assets/Resume_Louis_Liu.pdf" download>
          <span aria-hidden="true">📄</span> Download résumé
        </a>
      </div>

      <div class="cl-list">
        ${JOURNEY.map(changelogRow).join("")}
      </div>
    </section>

    <section class="philo">
      <div class="sec-head"><span class="sec-label">Design philosophy</span><span class="sec-count">03</span></div>
      <div class="philo-grid">
        <div class="philo-card rv"><div class="philo-num">01</div><h3 class="philo-h">Clarity is a kindness</h3><p class="philo-p">Complexity is easy; clarity is the work. I design so the next person doesn&rsquo;t have to feel stupid to get something done.</p></div>
        <div class="philo-card rv"><div class="philo-num">02</div><h3 class="philo-h">Think in systems</h3><p class="philo-p">A screen is a symptom. I design the model underneath — the structure that makes a hundred screens consistent and calm.</p></div>
        <div class="philo-card rv"><div class="philo-num">03</div><h3 class="philo-h">Measure twice</h3><p class="philo-p">The same patience that makes a clean joint makes a clean flow. Sweat the details, respect the material, ship with care.</p></div>
      </div>
    </section>

    ${contactBand()}
    ${footer()}`;
  }

  function changelogRow(e) {
    return `
    <article class="cl-row rv" data-layers="${e.layers.join(" ")}">
      <div class="cl-left">
        <div class="cl-co">${esc(e.company)}</div>
        <div class="cl-role">${esc(e.role)}</div>
        <div class="cl-time">${esc(e.timeline)}</div>
      </div>
      <div class="cl-right">
        <ul class="cl-logs">
          ${e.logs.map((l) => `<li>${l}</li>`).join("")}
        </ul>
      </div>
    </article>`;
  }

  function tNotFound() {
    return `<header class="page-head"><h1 class="page-h1">Lost the <em>thread</em>.</h1><p class="page-lead">That page doesn’t exist. <a data-nav="home" style="color:var(--accent);cursor:pointer">Back to start →</a></p></header>${footer()}`;
  }

  function contactBand() {
    return `
    <section class="contact">
      <h2 class="contact-h rv" style="margin-top:20px">Let's <em>work</em> together.</h2>
      <div class="contact-cta rv">
        <a class="btn solid" href="mailto:louis.rf.liu@gmail.com">Get in touch <span class="arrow">→</span></a>
        <a class="btn" href="https://www.linkedin.com/in/louisrfliu" target="_blank" rel="noreferrer">LinkedIn <span class="arrow">↗</span></a>
      </div>
    </section>`;
  }
  function footer() {
    return `<footer class="foot"><span>© ${new Date().getFullYear()} Louis Liu</span><span>Designed &amp; built in Saint Paul, MN</span><span>Available for work</span></footer>`;
  }

  /* ----------------------------------------------------------
     ROUTER
  ---------------------------------------------------------- */
  const view = $("#view");
  const main = $("#main");
  let current = null;

  function parseHash() {
    let h = location.hash.replace(/^#\/?/, "").trim();
    if (!h) return { name: "home" };
    const parts = h.split("/");
    if (parts[0] === "case") return { name: "case", id: parts[1] };
    if (ROUTES[parts[0]]) return { name: parts[0] };
    if (CASES.some((c) => c.id === parts[0])) return { name: "case", id: parts[0] };
    return { name: "home" };
  }

  function render(route) {
    let html;
    switch (route.name) {
      case "works": html = tWorks(); break;
      case "passion": html = tPassion(); break;
      case "about": html = tAbout(); break;
      case "case": html = tCase(route.id); break;
      default: html = tHome();
    }

    const animatable = !reduce && gsap && !document.hidden;

    const done = () => {
      ScrollTrigger && ScrollTrigger.getAll().forEach((t) => t.kill());
      view.innerHTML = html;
      main.scrollTop = 0;
      window.scrollTo(0, 0);
      document.body.classList.toggle("is-home", route.name === "home");
      setActiveNav(route);
      if (animatable) animateIn(route); else showStatic();
      bindLinks();
      closeMenu();
    };

    if (!animatable) {
      done();
      view.style.opacity = 1; view.style.transform = "none";
      return;
    }
    gsap.to(view, {
      opacity: 0, y: 10, duration: 0.32, ease: "power2.in",
      onComplete: () => { done(); gsap.fromTo(view, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }); }
    });
  }

  function setActiveNav(route) {
    const navName = route.name === "case" ? "works" : route.name;
    $$(".nav-item").forEach((el) => el.classList.toggle("active", el.dataset.nav === navName));
    moveNavPill();
  }

  function moveNavPill() {
    const pill = $("#navPill");
    const active = $(".nav-item.active");
    if (!pill || !active) { if (pill) pill.style.opacity = 0; return; }
    pill.style.opacity = 1;
    pill.style.transform = `translateY(${active.offsetTop}px)`;
  }

  /* ----------------------------------------------------------
     ANIMATIONS
  ---------------------------------------------------------- */
  function showStatic() {
    view.style.opacity = 1; view.style.transform = "none";
    $$(".rv").forEach((e) => { e.style.opacity = 1; e.style.transform = "none"; });
  }

  function animateIn(route) {
    if (reduce || !gsap || document.hidden) { showStatic(); return; }

    // Headline word reveal
    $$("[data-words]").forEach((el) => {
      // preserve <em> by splitting around it
      const words = splitWordsPreserve(el);
      gsap.set(words, { yPercent: 110 });
      gsap.to(words, { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.045, delay: 0.1 });
    });

    // Generic reveals (intro block, not scroll-bound near top)
    const rvs = $$(".rv");
    rvs.forEach((el) => {
      const r = el.getBoundingClientRect();
      const inView = r.top < window.innerHeight * 0.92;
      if (inView) {
        gsap.fromTo(el, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.15 + Math.min(el.dataset.d || 0, 0.4) });
      } else {
        gsap.set(el, { opacity: 0, y: 22 });
        ScrollTrigger.create({
          trigger: el, scroller: main, start: "top 90%",
          onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }),
          once: true
        });
      }
    });
    ScrollTrigger.refresh();
  }

  function splitWordsPreserve(el) {
    // Walk child nodes; wrap words but keep element nodes (<em>) intact as single units
    const nodes = Array.from(el.childNodes);
    el.innerHTML = "";
    const inners = [];
    const makeWrap = (content, isEl) => {
      const wrap = document.createElement("span");
      wrap.style.display = "inline-block";
      wrap.style.overflow = "hidden";
      wrap.style.verticalAlign = "top";
      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      if (isEl) inner.appendChild(content); else inner.textContent = content;
      wrap.appendChild(inner);
      el.appendChild(wrap);
      inners.push(inner);
    };
    nodes.forEach((node) => {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach((tok) => {
          if (tok === "") return;
          if (/^\s+$/.test(tok)) el.appendChild(document.createTextNode(" "));
          else makeWrap(tok, false);
        });
      } else {
        makeWrap(node, true);
        el.appendChild(document.createTextNode(" "));
      }
    });
    return inners;
  }

  /* ----------------------------------------------------------
     LINK BINDING (event delegation handles most; this is a no-op kept for clarity)
  ---------------------------------------------------------- */
  function bindLinks() { moveNavPill(); }

  document.addEventListener("click", (e) => {
    const navEl = e.target.closest("[data-nav]");
    if (navEl) {
      e.preventDefault();
      const to = navEl.dataset.nav;
      location.hash = "#/" + to;
      return;
    }
    const hrefEl = e.target.closest("[data-href]");
    if (hrefEl) { window.open(hrefEl.dataset.href, "_blank", "noopener,noreferrer"); }
  });

  // Changelog filter toolbar (Professional Journey)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".cl-filter");
    if (!btn) return;
    const scope = btn.closest("#journey");
    if (!scope) return;
    $$(".cl-filter", scope).forEach((b) => b.classList.toggle("active", b === btn));
    const filter = btn.dataset.filter;
    const rows = $$(".cl-row", scope);
    rows.forEach((row) => {
      const show = filter === "all" || row.dataset.layers.split(" ").indexOf(filter) !== -1;
      row.classList.toggle("is-hidden", !show);
    });
    if (gsap && !reduce) {
      const vis = rows.filter((r) => !r.classList.contains("is-hidden"));
      gsap.fromTo(vis, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.04, ease: "power2.out", overwrite: true });
    }
  });

  window.addEventListener("hashchange", () => {
    const route = parseHash();
    const key = route.name + (route.id || "");
    if (key === current) return;
    current = key;
    render(route);
  });

  /* ----------------------------------------------------------
     MOBILE MENU
  ---------------------------------------------------------- */
  const burger = $("#burger");
  const scrim = $("#scrim");
  function closeMenu() { document.body.classList.remove("menu-open"); }
  burger && burger.addEventListener("click", () => document.body.classList.toggle("menu-open"));
  scrim && scrim.addEventListener("click", closeMenu);

  /* ----------------------------------------------------------
     CLOCK
  ---------------------------------------------------------- */
  function tick() {
    const el = $("#clock");
    if (!el) return;
    try {
      const t = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "America/Chicago" });
      el.textContent = `${t} CST · Saint Paul, MN`;
    } catch (_) {
      el.textContent = `Saint Paul, MN`;
    }
  }
  tick(); setInterval(tick, 1000 * 20);

  /* ----------------------------------------------------------
     CUSTOM CURSOR (desktop, fine pointer only)
  ---------------------------------------------------------- */

  /* ----------------------------------------------------------
     MAGNETIC BUTTONS
  ---------------------------------------------------------- */
  (function magnetic() {
    if (window.matchMedia("(pointer:coarse)").matches || reduce || !gsap) return;
    document.addEventListener("mousemove", (e) => {
      const t = e.target.closest(".btn");
      $$(".btn").forEach((b) => {
        if (b === t) {
          const r = b.getBoundingClientRect();
          const mx = e.clientX - (r.left + r.width / 2);
          const my = e.clientY - (r.top + r.height / 2);
          gsap.to(b, { x: mx * 0.25, y: my * 0.35, duration: 0.4, ease: "power3.out" });
        } else {
          gsap.to(b, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
        }
      });
    });
  })();

  /* ----------------------------------------------------------
     THREE.JS — subtle warm glow shader behind everything
  ---------------------------------------------------------- */
  (function glow() {
    const THREE = window.THREE;
    const canvas = $("#glow-canvas");
    if (!THREE || !canvas) return;
    if (window.matchMedia("(pointer:coarse)").matches && window.innerWidth < 720) {
      // cheap CSS fallback on small mobile for performance
      canvas.style.background = "radial-gradient(60% 50% at 70% 12%, rgba(232,160,92,.10), transparent 60%)";
      return;
    }
    let renderer, scene, camera, mat, raf;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    } catch (e) {
      canvas.style.background = "radial-gradient(60% 50% at 70% 12%, rgba(232,160,92,.10), transparent 60%)";
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geo = new THREE.PlaneGeometry(2, 2);
    mat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        u_time: { value: 0 },
        u_res: { value: new THREE.Vector2(1, 1) },
        u_mouse: { value: new THREE.Vector2(0.7, 0.2) }
      },
      vertexShader: `void main(){ gl_Position = vec4(position,1.0); }`,
      fragmentShader: `
        precision mediump float;
        uniform float u_time; uniform vec2 u_res; uniform vec2 u_mouse;
        // simplex-ish noise
        vec3 hash3(vec2 p){ vec3 q=vec3(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)),dot(p,vec2(419.2,371.9))); return fract(sin(q)*43758.5453); }
        float noise(vec2 p){
          vec2 i=floor(p), f=fract(p);
          vec2 u=f*f*(3.0-2.0*f);
          float a=hash3(i).x, b=hash3(i+vec2(1.,0.)).x, c=hash3(i+vec2(0.,1.)).x, d=hash3(i+vec2(1.,1.)).x;
          return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
        }
        float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<4;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }
        void main(){
          vec2 uv = gl_FragCoord.xy / u_res.xy;
          vec2 asp = vec2(u_res.x/u_res.y, 1.0);
          float t = u_time*0.03;
          vec2 q = uv*asp;
          float n = fbm(q*1.6 + vec2(t, t*0.6));
          float n2 = fbm(q*2.4 - vec2(t*0.7, t*0.3) + n);
          // warm glow anchored top-right, drifting
          vec2 center = vec2(0.74 + 0.05*sin(u_time*0.05), 0.16 + 0.03*cos(u_time*0.04));
          float d = distance(uv, center);
          float glow = smoothstep(0.85, 0.0, d);
          float field = glow * (0.55 + 0.45*n2);
          vec3 amber = vec3(0.91, 0.63, 0.36);
          vec3 cool  = vec3(0.18, 0.22, 0.40);
          vec3 col = mix(cool, amber, field);
          // second faint cool bloom bottom-left
          float d2 = distance(uv, vec2(0.12, 0.92));
          float glow2 = smoothstep(0.7, 0.0, d2) * (0.4+0.4*n);
          col += cool * glow2 * 0.5;
          float alpha = field*0.5 + glow2*0.18;
          alpha *= 0.5;
          gl_FragColor = vec4(col, alpha);
        }`
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    function resize() {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      mat.uniforms.u_res.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
    }
    window.addEventListener("resize", resize);
    resize();

    const start = performance.now();
    let running = true;
    document.addEventListener("visibilitychange", () => { running = !document.hidden; if (running) loop(); });
    function loop() {
      if (!running) return;
      mat.uniforms.u_time.value = (performance.now() - start) / 1000;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    }
    if (!reduce) loop(); else renderer.render(scene, camera);
  })();

  /* ----------------------------------------------------------
     SIDEBAR COLLAPSE
  ---------------------------------------------------------- */
  (function sideCollapse() {
    const KEY = "side-collapsed";
    function apply(on) {
      document.body.classList.toggle("side-collapsed", on);
      setTimeout(() => { moveNavPill(); ScrollTrigger && ScrollTrigger.refresh(); }, 480);
    }
    try { if (localStorage.getItem(KEY) === "1") apply(true); } catch (_) {}
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#sideToggle")) return;
      const next = !document.body.classList.contains("side-collapsed");
      try { localStorage.setItem(KEY, next ? "1" : "0"); } catch (_) {}
      apply(next);
    });
  })();

  /* ----------------------------------------------------------
     BOOT
  ---------------------------------------------------------- */
  const initRoute = parseHash();
  current = initRoute.name + (initRoute.id || "");
  render(initRoute);
  window.addEventListener("resize", () => moveNavPill());
})();
