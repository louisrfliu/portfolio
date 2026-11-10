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
  // Content lives in content.js (loaded before this file).
  const { CASES, PROJECTS, PIN_CATS, PINS, RESUME, JOURNEY, JOURNEY_FILTERS } = window.PORTFOLIO;

  const ROUTES = { home: "Index", works: "Work", life: "Life", about: "About" };

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
    const tile = (cs, i) => {
      const coming = cs.comingSoon;
      return `
      <article class="bento-tile bento-case b-p${i + 1} ${coming ? "coming" : ""} rv" ${coming ? "" : `data-nav="case/${cs.id}"`}>
        <div class="ph" style="background-image:url('${cs.thumb}')${cs.thumbPos ? `;background-position:${cs.thumbPos}` : ""}"></div>
        <span class="bento-num">0${i + 1}</span>
        ${coming ? `<span class="bento-soon">Coming soon</span>` : `<span class="bento-go" aria-hidden="true">→</span>`}
        <div class="bento-case-body">
          <span class="bento-meta">Case study · ${cs.year}</span>
          <h2 class="bento-case-title">${esc(cs.title)}</h2>
        </div>
      </article>`;
    };
    // Same pattern as the About page's Professional journey (one row per role: company, title,
    // timeline, an amber dot on a vertical rail, a divider between rows), minus the descriptions.
    const exp = RESUME.flatMap((co) => co.roles.map((r) => ({ co, r }))).map(({ co, r }) => `
      <li class="xp-row">
        <span class="xp-dot" aria-hidden="true"></span>
        <div class="xp-text">
          <div class="xp-co-name">${esc(co.company)}</div>
          <div class="xp-title">${esc(r.title)}</div>
          <div class="xp-when">${esc(r.dates)} · ${esc(r.place)}</div>
        </div>
      </li>`).join("");
    return `
    <section class="bento">
      <div class="bento-tile b-stmt rv">
        <span class="eyebrow"><span class="ed"></span> Saint Paul, Minnesota, USA</span>
        <div>
          <h1 class="bento-title" data-words>Where complex data meets human <em>intuition.</em></h1>
          <p class="bento-sub"><span class="hl">Senior Product Designer</span> leading 6sense AI Email. I deconstruct complex B2B SaaS domain logic to transform massive revenue datasets into actionable, bulk outreach workflows.</p>
          <div class="hero-cta">
            <a class="btn solid" data-nav="works">View work <span class="arrow">→</span></a>
            <a class="btn" data-nav="about">About me</a>
          </div>
        </div>
      </div>
      <div class="bento-tile b-port rv" data-nav="about" role="img" aria-label="Portrait of Louis Liu">
        <img src="assets/portrait.jpg" alt="Louis Liu" onerror="this.src='assets/about-portrait.jpg'"/>
        <span class="bento-chip">About me →</span>
      </div>
      <div class="bento-tile b-exp rv">
        <div class="xp-head">
          <span class="bento-meta">Experience</span>
          <a class="xp-dl" href="assets/Resume_Louis_Liu.pdf" download>Résumé ↓</a>
        </div>
        <ol class="xp-list">${exp}</ol>
      </div>
      ${CASES.slice(0, 3).map(tile).join("")}
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
        <div class="ph" style="background-image:url('${c.thumb}')${c.thumbPos ? `;background-position:${c.thumbPos}` : ""}"></div>
      </div>
      <div class="feature-body">
        <span class="feature-cat">${esc(c.cat)}</span>
        <h3 class="feature-title">${esc(c.title)}</h3>
        <p class="feature-desc">${esc(c.desc)}</p>
        <div class="feature-meta">
          ${c.role ? `<span>${esc(c.role)}</span>` : ""}
          <span>${esc(c.date)}</span>
        </div>
        <div class="feature-foot">
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
      <span class="eyebrow rv"><span class="ed"></span> Selected work</span>
      <h1 class="page-h1" data-words>Complexity, <em>untangled.</em></h1>
      <p class="page-lead rv">How I turn messy enterprise problems into products people can actually use. Three deep dives, then the full log.</p>
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
        <div class="case-hero-img rv"><img src="${c.hero}" alt="${esc(c.title)}"/></div>
        <h1 class="case-title" data-words>${esc(c.title)}</h1>
        <div class="case-meta rv">
          <div class="cm"><span class="cm-k">Role</span><span class="cm-v">${esc(c.role)}</span></div>
          <div class="cm"><span class="cm-k">Team</span><span class="cm-v">${esc(c.team)}</span></div>
          <div class="cm"><span class="cm-k">Timeline</span><span class="cm-v">${esc(c.timeline)}</span></div>
          <div class="cm"><span class="cm-k">Platform</span><span class="cm-v">${esc(c.platform)}</span></div>
        </div>
      </div>

      <div class="case-body">
        <div class="case-hmw rv">
          <span class="eyebrow"><span class="ed"></span> The challenge</span>
          <p>${hmwText(c.hmw)}</p>
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

  // A section whose paragraphs all open with "<strong>Label:</strong>" (At a glance, Reflection)
  // renders as a grid of labelled cards so it can be scanned instead of read.
  const LEAD_RE = /^\s*<strong>([^<]+?):<\/strong>\s*([\s\S]*)$/;
  function caseBody(paras) {
    const leads = paras.map((t) => t.match(LEAD_RE));
    if (paras.length > 1 && leads.every(Boolean)) {
      return `<div class="case-cards${paras.length === 2 ? " two" : ""}">${leads.map((m) =>
        `<div class="case-card"><div class="case-card-k">${m[1]}</div><p>${m[2]}</p></div>`).join("")}</div>`;
    }
    return paras.map((para) => `<p class="case-p">${para}</p>`).join("");
  }

  // Set the opening "How might we" in the accent italic, like the page headlines.
  function hmwText(t) {
    const m = String(t).match(/^(how might we)\b([\s\S]*)$/i);
    return m ? `<em>${esc(m[1])}</em>${esc(m[2])}` : esc(t);
  }

  function caseSection(s, i) {
    const n = String(i + 1).padStart(2, "0");
    const figs = s.fig ? `<figure class="case-fig"><img src="${s.fig.src}" alt=""/><figcaption>${esc(s.fig.cap)}</figcaption></figure>` : "";
    const two = s.two ? `<div class="case-two">${s.two.map((src) => `<figure class="case-fig" style="margin:0"><img src="${src}" alt=""/></figure>`).join("")}</div>` : "";
    const call = s.callout ? `<div class="callout"><p>${esc(s.callout)}</p></div>` : "";
    return `
    <section class="case-section rv">
      <div class="case-rail" aria-hidden="true"><span class="case-num">${n}</span><span class="case-klabel">${esc(s.k)}</span></div>
      <div class="case-content">
        <div class="case-klabel case-klabel-inline">${n} · ${esc(s.k)}</div>
        <h2 class="case-h2">${esc(s.h)}</h2>
        ${caseBody(s.p)}
        ${call}${figs}${two}
      </div>
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
          <div class="case-section case-plain rv">
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

  function tLife() {
    return `
    <header class="page-head">
      <span class="eyebrow rv"><span class="ed"></span> Off the clock</span>
      <h1 class="page-h1" data-words>Where curiosity gets to <em>wander.</em></h1>
      <p class="page-lead rv">Woodworking, photography, time outdoors, and the odd event: the places I go to explore, experiment, and make things just to see what happens.</p>
    </header>

    <section class="board">
      <div class="board-bar rv" role="group" aria-label="Filter">
        ${pinChip("all", "All", PINS.length, true)}
        ${Object.entries(PIN_CATS).map(([k, c]) => pinChip(k, c.label, PINS.filter((p) => p.cat === k).length)).join("")}
      </div>
      <p class="board-note" aria-live="polite"></p>
      <div class="pins">
        ${PINS.map(pinItem).join("")}
      </div>
    </section>

    ${contactBand()}
    ${footer()}`;
  }

  function pinChip(key, label, n, on) {
    return `<button type="button" class="chip${on ? " on" : ""}" data-pin-filter="${key}" aria-pressed="${!!on}">${esc(label)}<span class="chip-n">${n}</span></button>`;
  }

  function pinItem(p, i) {
    return `
    <figure class="pin rv" data-cat="${p.cat}">
      <button type="button" class="pin-media" data-pin="${i}" aria-label="View ${esc(p.title)}">
        <img src="${p.src}" width="${p.w}" height="${p.h}" alt="${esc(p.title)}" decoding="async">
        <span class="pin-zoom" aria-hidden="true">\u2197</span>
      </button>
      <figcaption class="pin-cap"><span class="pin-title">${esc(p.title)}</span><span class="pin-cat">${esc(PIN_CATS[p.cat].label)}</span></figcaption>
    </figure>`;
  }

  /* Life board: category filter + lightbox (delegated, so it survives re-renders) */
  (function lifeBoard() {
    let box, img, cap, cur = -1;
    const visible = () => $$(".pin").filter((el) => !el.hidden).map((el) => +el.querySelector("[data-pin]").dataset.pin);
    function build() {
      box = document.createElement("div");
      box.className = "pin-box";
      box.hidden = true;
      box.setAttribute("role", "dialog");
      box.setAttribute("aria-modal", "true");
      box.innerHTML = `<button type="button" class="pin-box-x" aria-label="Close">\u2715</button>
        <button type="button" class="pin-box-nav prev" aria-label="Previous">\u2190</button>
        <figure><img alt=""><figcaption></figcaption></figure>
        <button type="button" class="pin-box-nav next" aria-label="Next">\u2192</button>`;
      document.body.appendChild(box);
      img = box.querySelector("img"); cap = box.querySelector("figcaption");
    }
    function show(i) {
      if (!box) build();
      cur = i; const p = PINS[i];
      img.src = p.src; img.alt = p.title;
      cap.innerHTML = `<span class="pin-title">${esc(p.title)}</span><span class="pin-cat">${esc(PIN_CATS[p.cat].label)}</span>`;
      box.hidden = false;
      requestAnimationFrame(() => box.classList.add("open"));
      document.body.classList.add("pin-open");
      box.querySelector(".pin-box-x").focus();
    }
    function close() {
      if (!box || box.hidden) return;
      box.classList.remove("open");
      document.body.classList.remove("pin-open");
      setTimeout(() => { if (!box.classList.contains("open")) box.hidden = true; }, 250);
    }
    function step(d) {
      const v = visible(); if (!v.length) return;
      const k = v.indexOf(cur);
      show(v[(k + d + v.length) % v.length]);
    }
    function filter(key) {
      $$(".chip[data-pin-filter]").forEach((c) => { const on = c.dataset.pinFilter === key; c.classList.toggle("on", on); c.setAttribute("aria-pressed", on); });
      $$(".pin").forEach((el) => {
        el.hidden = key !== "all" && el.dataset.cat !== key;
        if (!el.hidden) { el.style.opacity = 1; el.style.transform = "none"; }
      });
      const note = $(".board-note");
      if (note) note.textContent = PIN_CATS[key] ? PIN_CATS[key].note : "";
      if (ScrollTrigger) ScrollTrigger.refresh();
    }
    document.addEventListener("click", (e) => {
      const chip = e.target.closest("[data-pin-filter]");
      if (chip) return filter(chip.dataset.pinFilter);
      const pin = e.target.closest("[data-pin]");
      if (pin) return show(+pin.dataset.pin);
      if (!box || box.hidden) return;
      if (e.target.closest(".pin-box-nav")) return step(e.target.closest(".next") ? 1 : -1);
      if (e.target.closest(".pin-box-x") || !e.target.closest(".pin-box img")) close();
    });
    document.addEventListener("keydown", (e) => {
      if (!box || box.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    });
    window.addEventListener("hashchange", close);
  })();

  function tAbout() {
    return `
    <section class="about-hero">
      <div class="about-portrait rv"><img src="assets/about-portrait.jpg" alt="Louis Liu"/></div>
      <div class="about-intro">
        <h1 class="page-h1" data-words>Hi, it’s <em>Louis.</em></h1>
        <p class="page-lead rv">Born in China, raised between two languages, and now building a wonderfully chaotic life with my family in Saint Paul, MN. I&rsquo;m a Senior Product Designer at 6sense, where I bring the same clarity I practice at the workbench to every product I design.</p>
        <p class="page-lead rv" style="margin-top:18px">I&rsquo;m drawn to the hard, unglamorous problems — data onboarding, permissions, the moments where complexity quietly defeats people. My job is to make those moments feel obvious.</p>
        <div class="about-facts rv">
          <div class="fact"><div class="fact-k">Based in</div><div class="fact-v">Saint Paul, MN</div></div>
          <div class="fact"><div class="fact-k">Languages</div><div class="fact-v">English · 中文</div></div>
          <div class="fact"><div class="fact-k">Currently</div><div class="fact-v">Senior PD @ 6sense</div></div>
          <div class="fact"><div class="fact-k">Off the clock</div><div class="fact-v">Woodworking · Travel</div></div>
        </div>
        <div class="about-links rv">
          <a class="btn" href="https://www.linkedin.com/in/louisrfliu" target="_blank" rel="noreferrer">LinkedIn <span class="arrow">↗</span></a>
          <a class="btn" href="assets/Resume_Louis_Liu.pdf" download>Download résumé <span class="arrow">↓</span></a>
        </div>
      </div>
    </section>

    <section class="journey" id="journey">
      <div class="sec-head">
        <span class="sec-label">Professional journey</span>
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
    if (parts[0] === "passion" || parts[0] === "hobby") return { name: "life" }; // old links
    if (ROUTES[parts[0]]) return { name: parts[0] };
    if (CASES.some((c) => c.id === parts[0])) return { name: "case", id: parts[0] };
    return { name: "home" };
  }

  /* Desktop: the portrait (square) and the experience card each take half the grid's height,
     so the right column is exactly that wide. The experience card's type and spacing scale to
     fill its half; only on very short windows (below 75%) does the grid grow instead. */
  function fitBento() {
    const b = view.querySelector(".bento");
    if (!b) return;
    b.style.removeProperty("height");
    const exp = b.querySelector(".b-exp"), head = exp.querySelector(".xp-head"), list = exp.querySelector(".xp-list");
    if (window.innerWidth <= 1100) { b.style.removeProperty("--side-col"); exp.style.removeProperty("--xp-s"); exp.classList.remove("xp-tight"); return; }
    const cs = getComputedStyle(b);
    const gap = parseFloat(cs.rowGap) || 0;
    const pad = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    let half = Math.floor((b.clientHeight - pad - gap) / 2);
    b.style.setProperty("--side-col", half + "px");
    // Natural height of the experience card at this size.
    const items = list.children, first = items[0], last = items[items.length - 1];
    const need = () => {
      const lcs = getComputedStyle(list);
      return Math.ceil(head.offsetHeight + (last.offsetTop + last.offsetHeight - first.offsetTop)
        + parseFloat(lcs.paddingTop) + parseFloat(lcs.paddingBottom) + 2);
    };
    // Size the card's type and spacing so the list fills its half: the largest scale between
    // 60% and 120% that still fits (binary search), so spare room becomes larger text, not gaps.
    const setScale = (v) => exp.style.setProperty("--xp-s", v.toFixed(3));
    let lo = 0.6, hi = 1.2;
    setScale(hi);
    if (need() <= half) lo = hi;
    else {
      for (let i = 0; i < 8; i++) {
        const mid = (lo + hi) / 2;
        setScale(mid);
        if (need() <= half) lo = mid; else hi = mid;
      }
    }
    setScale(lo);
    // The desktop home is locked to one screen (no page scroll). If the list still doesn't fit
    // at 60% (very short windows), let just the experience list scroll inside its card.
    exp.classList.toggle("xp-tight", need() > half);
  }
  window.addEventListener("resize", () => requestAnimationFrame(fitBento));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitBento);

  // Jump (not smooth-scroll — .main has scroll-behavior:smooth) to the top of the page.
  function toTop() {
    main.scrollTo({ top: 0, left: 0, behavior: "instant" });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }

  function render(route) {
    let html;
    switch (route.name) {
      case "works": html = tWorks(); break;
      case "life": html = tLife(); break;
      case "about": html = tAbout(); break;
      case "case": html = tCase(route.id); break;
      default: html = tHome();
    }

    const animatable = !reduce && gsap && !document.hidden;

    const done = () => {
      ScrollTrigger && ScrollTrigger.getAll().forEach((t) => t.kill());
      view.innerHTML = html;
      toTop();
      document.body.classList.toggle("is-home", route.name === "home");
      ["works", "life", "about"].forEach((n) => document.body.classList.toggle("is-" + n, route.name === n));
      fitBento();
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
      gsap.set(words, { yPercent: 125 });
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
      wrap.style.paddingBottom = "0.15em"; // room for descenders; negative margin keeps line spacing
      wrap.style.marginBottom = "-0.15em";
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
      // Clicking the page you're already on doesn't change the hash, so scroll back up here.
      if (location.hash.replace(/^#\/?/, "") === to) { main.scrollTo({ top: 0, behavior: "smooth" }); closeMenu(); return; }
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
      canvas.style.background = "radial-gradient(60% 50% at 70% 12%, rgba(255,174,50,.10), transparent 60%)";
      return;
    }
    let renderer, scene, camera, mat, raf;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    } catch (e) {
      canvas.style.background = "radial-gradient(60% 50% at 70% 12%, rgba(255,174,50,.10), transparent 60%)";
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
    const btn = $("#sideToggle");
    const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    const keys = isMac ? "⌘ \\" : "Ctrl \\";
    const kbd = $("#sideKbd");
    if (kbd) kbd.textContent = keys;
    function apply(on) {
      document.body.classList.toggle("side-collapsed", on);
      if (btn) {
        btn.setAttribute("aria-label", on ? "Expand sidebar" : "Collapse sidebar");
        btn.setAttribute("data-tip", `Expand · ${keys}`);
      }
      setTimeout(() => { moveNavPill(); fitBento(); ScrollTrigger && ScrollTrigger.refresh(); }, 480);
    }
    function toggle() {
      const next = !document.body.classList.contains("side-collapsed");
      try { localStorage.setItem(KEY, next ? "1" : "0"); } catch (_) {}
      apply(next);
    }
    apply((() => { try { return localStorage.getItem(KEY) === "1"; } catch (_) { return false; } })());
    document.addEventListener("click", (e) => { if (e.target.closest("#sideToggle")) toggle(); });
    // ⌘\ (Ctrl+\ elsewhere) collapses / expands, like most sidebar apps. Desktop layout only.
    document.addEventListener("keydown", (e) => {
      if (e.key !== "\\" || !(e.metaKey || e.ctrlKey) || e.altKey || e.shiftKey) return;
      if (window.innerWidth <= 900) return;
      e.preventDefault();
      toggle();
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
