# Placeholders — what the owners still need to supply

The site is fully built and launchable, but these items are placeholders or unconfirmed.
Each is marked with a `TODO(owner)` comment in the code where applicable.

## Blocking real leads (do these first)

1. **Formspree ID** — the catering inquiry form and the email-signup form both point to
   `https://formspree.io/f/FORMSPREE_ID`. Create a free form at formspree.io with the owners'
   business email and replace `FORMSPREE_ID` in:
   - `docs/catering.html` (catering form)
   - `docs/index.html` (newsletter form)
   Until then, submissions show a graceful "call us" message instead of failing silently.
2. **Business email** — none is public anywhere. Needed for the Formspree destination.

## Confirm with the owners

3. **Hours** — public sources conflict. Site currently uses:
   - Peoplestown (from perfectseasoningllc.com): Sun–Mon 11:30–8, Tue 11:30–8:30, Wed–Fri 11:30–7, Sat 11:30–7:30
   - Midtown (from Google): Mon 11–5, Tue–Sat 11–8, Sun closed
   One edit updates the whole site: the `HOURS` object at the top of `docs/js/main.js`
   (plus the matching `openingHoursSpecification` JSON-LD in `docs/index.html`).
4. **Menu items tagged "ask in store"** — Rasta Pasta, Fried Chicken, Vegetable Plate,
   Mac & Cheese, Chickpeas, Cake of the Day. On the site menu/IG but absent from live ChowNow.
   If confirmed, remove the `tag--confirm` spans in `docs/menu.html`; if gone, delete the rows.
5. **Catering packages** — the three package cards frame inquiries without prices.
   If the owners have real packages/pricing, swap in the specifics.

## Assets to request

6. **Vector/hi-res logo** — currently using the 320px Instagram avatar. The header/footer use
   a styled text wordmark instead, so this is cosmetic — but a real SVG logo would upgrade
   the favicon and social-share image.
7. **Owner headshots** — `docs/story.html` has a marked placeholder card for a portrait of
   Dalisha & Chef Nicoy.
8. **Peoplestown storefront photo** — no good Terminal South exterior shot exists in the
   downloaded assets (only a low-res 150px highlight cover), so the Peoplestown cards use
   food photography. A storefront shot would complete the pair with the Peacherie photo.

## Nice-to-verify

9. **Uber Eats links** — deliberately omitted from location pages to push commission-free
   ChowNow ordering. If the owners want them, add per-location Uber Eats store URLs.
10. **Smyrna expansion** — kept off the site (crowdfunding-stage, unverified). The email
    capture ("Be first to know") is the hook; announce there first when it's public.
11. **Domain** — recommend repointing perfectseasoningllc.com DNS to this site at launch to
    keep existing Google/SEO equity (see `README.md` for GitHub Pages + custom domain steps).
