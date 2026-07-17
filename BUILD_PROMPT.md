# Build Prompt — Perfect Seasoning Website

> Paste everything below the line into a fresh Claude Code session opened in
> `~/Desktop/Claude Code/perfect-seasoning`. It is self-contained: it points at the
> research and assets already in this folder and specifies exactly what to build.

---

Build a production-ready marketing website for **Perfect Seasoning**, an authentic
Jamaican restaurant with two Atlanta locations. All research, the full plan, the menu
with live prices, and downloaded brand assets already exist in this project — read them
first, then build.

## Before you write any code

1. Read `research/research.md` (business facts, owners, menu, brand identity, ratings, contact).
2. Read `PLAN.md` (approved architecture, feature rationale, combined menu, design direction).
3. Look at every image in `research/images/` — these are the real brand assets and food
   photography the site must use. Note which are hero-quality plates vs. storefronts vs.
   marketing graphics (the research file captions each one).

Treat `PLAN.md` as the source of truth for scope. This prompt tells you *how* to build it.

## Stack & output

- **Static site**, no backend. Plain semantic HTML + modern CSS (custom properties, flexbox/grid)
  and a small amount of vanilla JS. No build step required, no framework unless it earns its
  keep — match the lightweight pattern used in the owner's other client sites.
- Mobile-first and fully responsive. Must look right at 375px and scale up cleanly.
- Deployable to GitHub Pages / Netlify as-is. Clean relative paths, no server dependencies.
- **Catering form** posts to **Formspree** (leave a clearly-marked `FORMSPREE_ID` placeholder).
- Accessible: real landmarks, alt text on every food photo, keyboard-navigable nav and form,
  color contrast that passes AA.
- Fast: compress/resize the images in `research/images/` for web, lazy-load below-the-fold
  imagery, no heavy libraries.

## Brand & design direction

Pull directly from the logo and their Instagram graphics (documented in the research file):

- **Palette:** charcoal/slate base (`#1a1a1a` range), white/cream, **Jamaican green** accent,
  **spice red** + **turmeric gold** highlights. Define these as CSS custom properties.
- **Type:** bold condensed uppercase display for headlines (matching the logotype energy),
  a warm serif for editorial voice ("We Saved You a Spot"), clean sans for body. Use Google Fonts.
- **Imagery:** their own photography carries the site — oxtail plate w/ Ting bottles, overhead
  stew chicken, escovitch snapper, jerk wings. Use the real files in `research/images/`.
- **Motifs:** arched photo masks (used in their IG graphics and the Peacherie architecture);
  a spice-spoon / spice-texture divider echoing the logo.
- **Tone:** warm, confident, diaspora-proud — "authentic, soul-warming flavors of Jamaica in
  the heart of Atlanta."

The finished site should feel like a real restaurant brand, not a template — the whole point
is to replace their generic ChowNow template page.

## Pages (6)

Build all six from `PLAN.md §2`. Summary:

1. **Home** — hero (oxtail/stew-chicken photography), a **location picker** ("Midtown" /
   "Peoplestown") showing today's hours + Order buttons, featured dishes, review quotes
   (Google 4.0★/161), press logos (AJC, Rough Draft, What Now ATL — text/placeholder logos ok),
   Instagram feed strip, catering teaser.
2. **Menu** — full menu with prices, **toggled by location** (prices differ between Midtown and
   Peoplestown — see `PLAN.md §5`), dietary tags, Taco Tuesday callout, a "prices may vary
   in-store" disclaimer, sticky "Order Online" CTA.
3. **Locations** — one card per location: address, embedded Google map, per-location hours,
   what the venue is (The Peacherie food hall / Switchman Hall at Terminal South), storefront
   photos, order links (ChowNow primary, Uber Eats secondary), parking/transit notes.
4. **Catering** — catering spread photos, a package outline, and a **lead form**
   (name, email, phone, event date, headcount, budget, message) → Formspree. This replaces
   their broken "ordering temporarily closed" link with a capture flow that always works.
5. **Our Story** — co-owners **Dalisha Williams & Chef Nicoy McLean**, Jamaican roots, EST 2020
   timeline through the three food halls (Chattahoochee Food Works → Switchman Hall/Terminal
   South → The Peacherie/Midtown), retail-spice ambition, press mentions with links.
6. **Events** — recurring events (Taco Tuesday both locations, Flashbacks on the Tracks at
   Switchman Hall patio Fridays, karaoke nights). A simple list the owners can update by hand.

**Global:** sticky header (logo, nav, phone, "Order Online" button), footer (both addresses,
hours, IG/TikTok/Facebook links, phone). 

## Business-critical behaviors

- **Order Online is location-aware.** Two separate ChowNow menus exist. The chooser must send
  the user to the correct one:
  `https://order.chownow.com/order/42959/locations` (both locations live here).
- Prefer **ChowNow deep links** over Uber Eats (commission-friendly + their loyalty: 10% off
  first order, 10% off after 10). Uber Eats is a secondary option only.
- **Single source of truth for hours.** There are four conflicting hours sources today. Put hours
  in one data structure and render everywhere from it. Add `LocalBusiness` / `Restaurant` /
  `Menu` schema.org JSON-LD per location so Google reads it correctly.
- SEO: per-location pages, descriptive titles/meta, schema. "jamaican food midtown atlanta" is winnable.

## Real data to use

- **Phone:** (678) 653-0191
- **Locations:**
  - Midtown — 1375 Peachtree St NE, Atlanta, GA 30309 (inside **The Peacherie** food hall; opened Nov 2025)
  - Peoplestown — 1161 Ridge Ave SW, Atlanta, GA (inside **Switchman Hall at Terminal South**)
- **Socials:** Instagram @perfectseasoningllc · TikTok @perfectseasoning · facebook.com/perfectseasoningllc
- **Ratings:** Google 4.0★ / 161 reviews. Review quotes are in `research/research.md`.
- **Menu + prices:** use the combined menu in `PLAN.md §5` (Midtown / Peoplestown price splits noted).

## Placeholders — mark these clearly and DO NOT invent values

These are the owners' unresolved open questions (`PLAN.md §6`). Use obvious `TODO:`/placeholder
markers and collect them in a short `PLACEHOLDERS.md` at the end so the owner can fill them:

1. **Hours per location** — four sources conflict. Use the IG-bio hours (11–8 daily) as a
   labeled placeholder and flag that they must be confirmed.
2. **Business email** for catering leads + `FORMSPREE_ID`.
3. **Catering packages/pricing** — page is currently closed; outline structure, placeholder copy.
4. **Menu items to confirm** — Rasta Pasta, Mac & Cheese, Fried Chicken, Vegetable Plate, Cake of
   the Day appear on the site menu/IG but are absent from live ChowNow. Include them tagged
   "confirm availability."
5. **Smyrna expansion** — unverified/crowdfunding stage. Do not publish; leave an optional
   email-capture "be first to know" hook only.
6. **Owner headshots** for Our Story — use a tasteful placeholder block.
7. **Logo** — only a 320px version exists (`research/images/profile-pic.jpg`). Use it but note a
   request for a vector/hi-res file.

## Deliverable

A complete, browsable static site in this project (e.g. `site/` or repo root) with all six pages
linked, real assets wired in, the location-aware order flow working, the catering form ready for a
Formspree ID, schema.org markup in place, and a `PLACEHOLDERS.md` listing everything the owner still
needs to supply. Verify it renders correctly in a browser preview at mobile and desktop widths
before you call it done.

**Scope for this build = Phase 1 in `PLAN.md §7`** (Home, Menu, Locations, Catering, Story) plus the
Events page. Leave Phase 2/3 items (spice e-commerce, dedicated press page, Smyrna launch) as clearly
marked future hooks, not built out.
