# Perfect Seasoning — Website

Brand site for Perfect Seasoning (Authentic Jamaican Cuisine, Atlanta — Midtown &
Peoplestown). Static HTML/CSS/JS with GSAP animations. Built July 2026.

## Structure

- `docs/` — the deployable site (named `docs` so GitHub Pages can serve it directly)
  - `index.html`, `menu.html`, `locations.html`, `catering.html`, `story.html`, `events.html`
  - `css/style.css` — design system (slate + cream + spice palette, arch motif)
  - `js/main.js` — **hours engine** (single source of truth for both locations' hours →
    live "Open now" pills, hours tables, footer lines, all in Atlanta time), Taco Tuesday
    auto-banner, GSAP reveal animations w/ reduced-motion + no-JS fallbacks, Formspree forms,
    event next-occurrence chips
  - `js/menu.js` — per-location price toggle (persisted in localStorage)
  - `assets/img/` — optimized photography from the owners' Instagram
- `PLAN.md` — approved plan · `PLACEHOLDERS.md` — what the owners still owe
- `research/` — research brief + original assets

## Run locally

Any static server, e.g. `python3 -m http.server --directory docs 8000`

## Deploy (GitHub Pages)

1. Create a repo, push this folder.
2. Settings → Pages → Deploy from branch → `main` / `docs/`.
3. Later: add the custom domain (perfectseasoningllc.com) in Pages settings and repoint
   DNS at the registrar — keeps their existing SEO equity.

## Editing hours (the most common update)

Edit the `HOURS` object at the top of `docs/js/main.js`. Times are minutes-from-midnight
(e.g. `690` = 11:30 AM, `1200` = 8:00 PM), index 0 = Sunday. Every pill, table and footer
line on the site updates from that one object. Also mirror any change in the
`openingHoursSpecification` JSON-LD in `docs/index.html` so Google sees it.
