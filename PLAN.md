# Perfect Seasoning — Website Plan

Drafted 2026-07-17. Based on research in [research/research.md](research/research.md).

## 1. The situation

Perfect Seasoning has a **template site** (perfectseasoningllc.com — a ChowNow/SEO-builder page) that takes orders but does nothing for the brand:

- Generic stock layout; none of their strong Instagram identity (slate/spice logo, green accents, pro food photography)
- Boilerplate "Our Story" — no mention of co-owners Dalisha Williams & Chef Nicoy McLean, the Jamaican roots, or the journey from Chattahoochee Food Works → Terminal South → Midtown's Peacherie
- Only lists the Ridge Ave location; the new Midtown location (their biggest visibility win, opened Nov 2025 in a Michelin-chef-backed food hall) is invisible
- Catering — a revenue line they actively promote on IG — is a dead link ("ordering temporarily closed")
- Conflicting hours everywhere (site vs Google vs Uber Eats vs IG bio)
- No events (Taco Tuesday, Flashbacks on the Tracks), no press, no email capture

**Goal:** a proper brand site that drives the three money actions — **direct orders (ChowNow, commission-free-ish), catering leads, and foot traffic to two locations** — while consolidating their story, menu, and reputation.

## 2. Site architecture (6 pages)

1. **Home** — hero (oxtail/stew-chicken photography), location picker ("Midtown" / "Peoplestown") with today's hours + Order buttons, featured dishes, review quotes (Google 4.0★/161), press logos (AJC, Rough Draft, What Now ATL), IG feed strip, catering teaser
2. **Menu** — full menu with prices, tabbed or toggled by location (prices differ), dietary tags (vegan plate, veg pattie), Taco Tuesday callout, "prices may vary in-store" disclaimer, sticky "Order Online" CTA
3. **Locations** — card per location: address, embedded map, per-location hours, what the venue is (The Peacherie food hall / Switchman Hall at Terminal South), photos of each storefront, order links (ChowNow primary; Uber Eats secondary), parking/transit notes. Optional "Coming soon: Smyrna" strip if owner confirms
4. **Catering** — photos of foil-tray/catering spreads, package outline, and a **lead form** (event date, headcount, budget) → email/Formspree. This replaces the broken ordering link with a lead-capture flow that always works
5. **Our Story** — Dalisha & Chef Nicoy, Jamaican roots, EST 2020 timeline through the three food halls, retail spice ambitions, press mentions with links
6. **Events** — recurring: Taco Tuesday (both locations), Flashbacks on the Tracks (Switchman Hall patio Fridays), karaoke nights; simple list the owners can update

Global: header (logo, nav, phone, Order Online button), footer (both addresses, hours, IG/TikTok/Facebook, phone), mobile-first.

## 3. Features that help the business

| Feature | Why it matters |
|---|---|
| Location-aware "Order Online" chooser | Two ChowNow menus exist; sending users to the right one removes the #1 friction |
| ChowNow deep links (not embeds) | Keeps their commission-free ordering + loyalty (10% off after 10 orders) front and center vs Uber Eats |
| Catering lead form | Catering is promoted weekly on IG but the current link is dead — this converts demand they already generate |
| Single source of truth for hours | Fixes the 4-way hours conflict; structured so Google can read it (schema.org) |
| Review section (Google quotes) | 4.0★/161 reviews exists but the template site shows only 4 blurbs; social proof sells Jamaican food to first-timers |
| SEO: `Restaurant` + `Menu` + `LocalBusiness` schema, per-location pages | "jamaican food midtown atlanta" is winnable; the Peacherie location is new and under-indexed |
| Instagram feed strip + follow CTA | Their IG is the living marketing channel (3.4K followers, reels get influencer coverage) |
| Press bar | AJC / Rough Draft / What Now / Black Restaurant Weeks logos = instant credibility |
| Email capture ("first to know: Smyrna opening, specials") | They're crowdfunding a Smyrna expansion — an audience list is an asset for launch |
| Spice retail teaser (phase 2) | Terminal South build-out included a Jamaican spice retail section — future e-commerce hook |
| Analytics (Plausible or GA4) | Measure order-click-through and catering leads |

## 4. Design direction

- **Palette:** charcoal/slate (#1a1a1a range) base, white/cream, Jamaican green accent, spice red + turmeric gold highlights — straight from the logo and their IG graphics
- **Type:** bold condensed uppercase display (matching logotype energy) + warm serif for the "We Saved You a Spot" editorial voice; body in a clean sans
- **Imagery:** their own photography is good enough to carry the site — oxtail plate w/ Ting bottles, overhead stew chicken, escovitch snapper, jerk wings. Storefront shots of both venues already downloaded (research/images/)
- **Motifs:** arched photo masks (used in their IG graphics + Peacherie architecture), spice-spoon texture from the logo as a section divider
- **Tone:** warm, confident, diaspora-proud — "authentic, soul-warming flavors of Jamaica in the heart of Atlanta"

## 5. Combined menu (for the site)

Prices from live ChowNow (2026-07-17). Where locations differ: Peoplestown / Midtown.

**Entrees**
- Oxtails — $29 (Midtown; on Peoplestown site menu at $29)
- Snapper (whole, escovitch-style) — $35 / $31 (price varies)
- Fried Jerk Catfish — $19.50 / $20
- Jamaican Jerk Smoke Chicken (1/4 dark) — $17 / $18
- Brown Stew Chicken — $17 / $18
- Curry Chicken — $17 / $18
- Rasta Pasta — $17 (site menu; confirm availability — IG shows it topped w/ catfish or fried chicken)
- Fried Chicken — $18 (site menu; confirm)
- Vegetable Plate (vegan) — $17 (site menu; confirm)

**Wings**
- 6 Wings — $10.25 / $11.25
- 6 Wings & Fries — $14 / $15 (w/ wing sauce)
- 6 Wings Meal (2 sides) — $17 (Peoplestown)

**Taco Tuesday**
- Jerk Chicken Tacos (3) — $12.50 / $13.50
- Jerk Fish Tacos (3) — $12.50 / $13.50

**Patties & Bread**
- Beef / Chicken / Veggie Pattie — $4.25 / $5.25
- Coco Bread — $5 / $5.50

**Sides**
- Rice & Peas — $5.25 / $6.25
- Cabbage — $4.25 / $5.25
- Plantains — $4.25 / $5.25
- Fries (regular or sweet potato) — $4.25 / $5.25
- Mac & Cheese — $9 (site menu; confirm)
- Chickpeas — $6.25 (site menu; confirm)

**Kids**
- Chicken Strips — $9.50 (Peoplestown)

**Drinks & Dessert**
- Jamaica Sodas (Ting, Kola Champagne, D&G) — $3
- Tropical Rhythm — $4.50
- House Drinks — $5 · Bottled Water — $2–3
- Cake of the Day — $7.50 (site menu; confirm)

## 6. Open questions for the owners (before build)

1. Confirm hours per location (4 conflicting sources)
2. Business email for catering leads + contact
3. Catering packages/pricing (current page is closed)
4. Are Rasta Pasta, Mac & Cheese, Fried Chicken, Vegetable Plate, Cake of the Day still on the menu?
5. Smyrna opening — public yet? Include on site?
6. Domain: perfectseasoningllc.com is tied to the template provider — repoint DNS to the new site, or launch on a subdomain/new domain? (Repointing keeps their existing Google/SEO equity; recommended)
7. Any headshots of Dalisha & Chef Nicoy for Our Story?

## 7. Build approach & phases

- **Stack:** static site (plain HTML/CSS/JS or Next.js static export), same pattern as your other client sites; hosted on GitHub Pages/Netlify; Formspree for the catering form. No backend needed — ordering stays on ChowNow.
- **Phase 1 (launch):** Home, Menu, Locations, Catering form, Story — with confirmed hours + menu
- **Phase 2:** Events page, email capture, per-neighborhood SEO landing pages, press page
- **Phase 3:** spice-line e-commerce teaser/shop, Smyrna launch page

**Assets already in hand:** logo (320px — request vector/hi-res from owner), 12 post images incl. 3 hero-quality plates, both storefront photos, highlight covers — all in [research/images](research/images/).
