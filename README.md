# Louis Liu — Portfolio v2

A modern, awwwards-style portfolio built as a **webapp shell**: a fixed side
navigation + a scrollable main content area. Dark editorial aesthetic with a
warm amber accent, GSAP micro-animations, and a subtle Three.js glow behind the
content.

## Stack
- Single static `index.html` + `app.js` (no build step — deploys anywhere).
- [GSAP](https://gsap.com) + ScrollTrigger for reveals, page transitions, magnetic buttons.
- [Three.js](https://threejs.org) for the ambient warm-glow shader (gracefully
  degrades to a CSS gradient on small mobile / if WebGL is unavailable).
- Fonts: Instrument Serif (display italics), Inter (body), JetBrains Mono (labels).

## Pages (hash-routed)
| Route | Page |
|-------|------|
| `#/` | Landing — single non-scrollable viewport: hook, tagline, portrait |
| `#/works` | Work — top 3 case studies + reverse-chron project list |
| `#/case/<id>` | Case study detail with prev/next navigation |
| `#/passion` | Passion — personal projects + woodworking / photography / AI galleries |
| `#/about` | About — bio, journey, philosophy, résumé + LinkedIn |

## Editing content
All content lives in the data objects at the top of **`app.js`**:
- `CASES` — the three featured case studies (title, desc, date, images, sections).
- `PROJECTS` — the "All projects" list (most-recent-first).
- `PASSION`, `WOOD`, `PHOTO`, `AI` — passion projects and galleries.

## Swap the portrait
The landing hero uses **`assets/portrait.jpg`** (marked with a subtle
"placeholder · swap me" tag). Replace that file with your own portrait — keep a
roughly 3:4 ratio for the best fit. The About page uses `assets/about-portrait.jpg`.

## Run locally
Any static server, e.g. from this folder:
```
python3 -m http.server 8090
```
then open http://localhost:8090

## Promote to the live site
The current GitHub Pages site is the repo-root `index.html`. When you're happy
with this version, copy `portfolio-v2/index.html`, `app.js`, and `assets/` to the
root (or point Pages at this folder). Nothing here touches the live site until
you do.

## Accessibility & robustness
- Respects `prefers-reduced-motion` (animations off, content static).
- If JS/CDN fails to load or the tab is backgrounded, content renders statically
  rather than staying hidden.
- Custom cursor and magnetic effects are disabled on touch/coarse pointers.
