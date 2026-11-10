# The High-Velocity UX Case Study Template

A modular, copy-pasteable Markdown template designed to satisfy two distinct portfolio audiences: busy recruiters who scan for outcomes in under sixty seconds, and design leads who evaluate deep decision-making logic.

---

## Strategic Overview & Information Architecture

Portfolio strategy research demonstrates that hiring managers and design recruiters rarely read case studies linearly from start to finish. Instead, reviewers scan for high-value signals: role clarity, problem framing, trade-off quality, and business impact. As emphasized across industry portfolio guides, an effective case study functions not as a passive scrapbook of every completed task, but as a persuasive problem-solving narrative.

To convert portfolio visits into interview callbacks, this template organizes your project narrative into a **tiered information hierarchy**.

```
========================================================================
 TIER 1: THE SKIMMER LAYER (At-a-Glance Summary & High-Fi Showcase)
========================================================================
 TIER 2: THE CONTEXT LAYER (Problem Framing & Actionable Discovery)
========================================================================
 TIER 3: THE DEEP-DIVE LAYER (Problem-Solution Pairs & Trade-Offs)
========================================================================
 TIER 4: THE CLOSING LAYER (Validated Impact, Reflection & CTA)
========================================================================
```

### Core Portfolio Principles
* **Target Word Count**: Keep the published case study between 600 and 1,200 words. Concision demonstrates professional maturity and respects reviewer time.
* **Progressive Disclosure**: Lead with outcomes and high-fidelity screens upfront, followed by supporting process logic.
* **Tweet-Length Process Headlines**: Write action-oriented section headlines that summarize the core insight of each step so skimmers grasp the story even if they read only the headings.
* **Prose Before Structure**: Always introduce tables and lists with an analytical context sentence explaining why the information matters.
* **Avoid Academic Clutter**: Omit generic Double Diamond diagrams, unreadable photos of post-it notes, and dictionary definitions of standard UX methods.

---

## Tier 1: Hero Section & At-a-Glance Overview (The Skimmer Layer)

The top section of your case study must establish immediate context, define project boundaries, and showcase your final UI output before forcing the reader to scroll down the page.

### 1. Impact-Driven Title & Cover

Section Purpose: Replace vague company names with a results-oriented headline that communicates the product, task, and core achievement.

```markdown
# [Product Name]: [Action-Oriented Task / Core Metric Achievement]
### [1-Sentence Subtitle Framing the High-Level Project Value]

![Case Study Cover Image: Polished Device Mockup](cover-image-placeholder.png)
```

#### Field Guidance & Best Practices
* **Headline Rule**: State what you built and the result it achieved.
  * *Weak Title*: "Home Depot Case Study" or "Mobile Redesign"
  * *Strong Title*: "Home Depot Checkout: Streamlining Mobile Shipping Flows for 50,000 Daily Shoppers"
* **Cover Asset**: Use a clean, non-distracting device mockup showcasing the hero interface.

---

### 2. Context & Metadata Chips

Section Purpose: Instantly establish operational parameters so hiring managers understand your level of responsibility and team environment.

```markdown
| Metadata Category | Project Details |
| :--- | :--- |
| **Role & Ownership** | [e.g., Lead Product Designer — Owned UX Research, Interaction Design, and Prototyping] |
| **Timeline** | [e.g., 6 Weeks] |
| **Team & Partners** | [e.g., 1 Product Manager, 2 Engineers, 1 UX Researcher] |
| **Tools Used** | [e.g., Figma, UserTesting, Mixpanel] |
```

#### Field Guidance & Best Practices
* **Ownership Clarity**: Specify exact responsibilities. Ambiguity around personal contribution severely weakens credibility.
* **Collaboration**: Highlight cross-functional partners to signal team readiness.

---

### 3. Constraint Statement

Section Purpose: Define real technical, business, or timeframe boundaries. As senior design guides note, a constraint gives design decisions context; without it, visual choices appear arbitrary.

```markdown
> **Project Constraints**: [State 2–3 sentence real-world boundary conditions, such as legacy API restrictions, strict release deadlines, or existing design system compliance requirements.]
```

#### Examples: Weak vs. Strong Constraint Statements
* **Weak**: "The goal was to improve the user experience under tight deadlines."
* **Strong**: "Engineering constraints required retaining the legacy two-step authentication system, preventing a single-step sign-up. Design solutions had to streamline cognitive load within the existing multi-screen infrastructure within a strict 3-week sprint."

---

### 4. At-a-Glance (TL;DR) Summary Card

Section Purpose: A high-impact 3-bullet block providing complete coverage for busy reviewers who spend less than 30 seconds on the page.

```markdown
### At-a-Glance Overview

* **The Problem**: [1 sentence summarizing user friction or business drop-off point.]
* **The Solution**: [1 sentence describing the key feature or interface overhaul built.]
* **The Impact**: [1 sentence highlighting the primary metric, usability gain, or efficiency result.]
```

---

### 5. Primary Solution Showcase (High-Fidelity Flows First)

Section Purpose: Reverse the chronological instinct by placing polished final interface flows right near the top of the case study.

```markdown
### Final Deliverable Preview

[Insert 1–2 high-fidelity UI screen mockups, screen recordings, or an embedded interactive prototype link.]

* **Key Interaction Highlight**: [Brief 1-sentence caption explaining the core usability improvement shown in this mockup.]
```

---

## Tier 2: Problem Framing & Discovery (The Context Layer)

This layer establishes why the project was necessary, connecting business objectives with genuine user friction.

### 6. Problem Statement & Business Context

Section Purpose: Articulate who experienced the friction, how it impacted them, and why solving it mattered to the organization.

```markdown
## Problem Statement & Business Context

[Provide 1–2 paragraphs framing the core problem. Explain the baseline metrics or customer feedback that triggered this initiative.]

* **Target User**: [Define the primary user persona or user segment experiencing the issue.]
* **User Pain Point**: [Describe the specific friction point during the journey.]
* **Business Opportunity**: [Explain how solving this user friction connects to key business goals like conversion, retention, or support ticket reduction.]
```

---

### 7. Discovery Insights & Evidence

Section Purpose: Present curated research findings that directly shaped design decisions. Focus on insights rather than describing raw activities.

```markdown
## Discovery & Key Insights

To understand the root causes of user friction, we conducted targeted research focusing on actual user behavior.

| Discovery Focus | Method & Sample | Key Insight / Finding |
| :--- | :--- | :--- |
| **User Drop-Off Analysis** | Quantitative Funnel Audit | 42% of users abandoned checkout at the shipping options step due to hidden fee confusion. |
| **Qualitative Friction** | Usability Testing (8 Participants) | Business buyers frequently require multi-address shipping, which the legacy single-address flow blocked. |
```

```markdown
> **Critical Discovery Takeaway**: [Summarize the primary insight that fundamentally changed the direction of the project.]
```

#### Field Guidance & Best Practices
* **Focus on Insights over Tools**: Do not write "We conducted 5 user interviews." Instead, explain what those interviews revealed.
* **Avoid Unreadable Photos**: Do not include unreadable photos of whiteboards or post-it notes. Use clean data tables or annotated journey maps.

---

## Tier 3: Strategic Reasoning & Execution (The Deep-Dive Layer)

The reasoning layer is where design leads evaluate senior-level thinking. Demonstrate how research insights directly dictated UI decisions and trade-offs.

### 8. Process & Turning Points (Problem-Solution Pairs)

Section Purpose: Structure the execution narrative into 2–4 concise problem-solution pairs showing iteration and cause-and-effect reasoning.

```markdown
## Design Execution & Key Turning Points

### Turning Point 1: [Descriptive Insight Headline, e.g., Restructuring Checkout Choice Architecture]

* **Identified Friction**: [Explain the specific issue discovered during wireframing or initial testing.]
* **Design Response**: [Describe the changes made to wireframe flows, layout hierarchy, or component selection.]

[Insert Before vs. After UI Screen Comparison or Wireframe Iteration]

> **Rationale**: [Explain why this specific structural change resolved the friction point.]
```

---

### 9. Trade-Offs & Rejected Alternatives

Section Purpose: Detail alternative design options that were considered, why they were rejected, and the concrete evidence or constraint that ruled them out.

```markdown
## Strategic Trade-Offs & Rejected Directions

Every design choice requires balancing user needs against technical feasibility and business constraints. The table below details key directions explored and rejected during execution.

| Proposed Alternative | Reason for Rejection | Decision Evidence / Constraint |
| :--- | :--- | :--- |
| **Drawer Navigation** | High navigation drop-off among first-time mobile users. | Usability testing showed a 40% miss rate on the drawer icon; tab bars provided persistent visibility. |
| **Single-Page Checkout** | Created excessive vertical scrolling and cognitive overload. | Form field testing revealed users preferred a 2-step stepper over an overwhelming long-scroll page. |
```

#### Examples: Weak vs. Strong Trade-Off Statements
* **Weak Trade-Off**: "We considered a drawer menu but decided to go with tabs instead because tabs look better."
* **Strong Trade-Off**: "Considered a drawer menu for the settings flow, but rejected it because usability testing revealed a 40% miss rate among first-time users. Bottom tabs preserved persistent visibility without requiring exploration."

---

## Tier 4: Validation, Impact & Reflection (The Closing Layer)

Demonstrate professional growth, strategic outcomes, and team maturity to leave a lasting impression.

### 10. Measurable Outcomes & Business Impact

Section Purpose: Present quantitative results or qualitative proxy indicators that prove the design solved the original problem.

```markdown
## Validation & Business Impact

Following launch and post-implementation testing, we evaluated performance against our baseline goals.

| Impact Category | Metric / Indicator | Measurable Outcome |
| :--- | :--- | :--- |
| **Conversion / Task Success** | Usability Task Completion Rate | Increased from 45% to 88% in post-launch testing. |
| **Efficiency & Speed** | Average Time-on-Task | Reduced checkout completion time by 35 seconds. |
| **Operational Savings** | Support Ticket Inquiries | 28% reduction in checkout-related support tickets over 60 days. |
```

#### Handling Projects Without Live Analytics
As industry career guides emphasize, if direct conversion metrics are unavailable, showcase alternative success indicators:
1. **Usability Results**: "8 out of 10 test participants completed the core task without assistance (up from 3 out of 10 on the baseline interface)."
2. **Engineering Efficiency**: "Building the structured component library reduced frontend development time by 40% for subsequent feature releases."
3. **Support Ticket Impact**: "Redesigning navigation reduced support inquiries regarding missing account options by 30%."
4. **Estimated Business Impact**: Clearly label revenue or conversion models as strategic estimates based on validated usability testing parameters.

---

### 11. Learnings & Retrospective

Section Purpose: Reflect honestly on unexpected challenges, trade-offs made under constraints, and what you would test next with more time.

```markdown
## Retrospective & Key Learnings

* **What Worked Well**: [Highlight a successful process choice, cross-functional collaboration pattern, or research win.]
* **Key Challenge & Adaptation**: [Describe an unexpected roadblock and how you adjusted your approach.]
* **What I'd Do Differently**: [1–2 sentences reflecting on a design choice or process step you would refine with additional time or resources.]
```

---

### 12. Call-to-Action (CTA)

Section Purpose: Provide immediate next steps for hiring managers or prospective clients to contact you or explore the live product.

```markdown
---

### Explore More & Get in Touch

* **Interactive Prototype**: [Link to Live Prototype]
* **Project Inquiry / Contact**: [Link to Contact Page or Email]
```

---

## AI Best Practices & Copywriting Guidelines

When drafting and refining copy for your portfolio case study:

* **AI as Assistant, Not Boss**: Use conversational AI tools to brainstorm headlines, condense long paragraphs, or outline revenue estimations. You retain 100% ownership over design decisions and factual accuracy.
* **Clarity over Smart Sounding**: Avoid industry jargon and buzzwords ("delve into", "seamless paradigm"). Write clear, concise, 1-to-2 sentence explanations.
* **Honest Impact Modeling**: When estimating metrics for conceptual or unlaunched projects, explicitly label them as "Estimated Metric Models" based on usability testing parameters or public financial disclosures.

---

## Pre-Publishing Case Study Health Checklist

Before publishing your case study, perform a quick 60-second health check:

- [ ] **Skimmer Friendly**: Can a reviewer understand the problem, solution, and impact within 30 seconds by reading only Tier 1?
- [ ] **High-Fi First**: Are final UI mockups visible near the top of the page before diving into research process details?
- [ ] **Clear Role Ownership**: Are your specific responsibilities explicitly defined in the metadata table?
- [ ] **Explicit Trade-Offs**: Did you document at least one rejected design alternative and the evidence behind the rejection?
- [ ] **No Generic Process Artifacts**: Have you removed generic process diagrams and unreadable whiteboard photos?
- [ ] **Concise Word Count**: Is the total text under 1,200 words?
