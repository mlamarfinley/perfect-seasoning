/* Menu page: location toggle with per-location prices.
   Prices live in the HTML as data attributes (data-pt / data-mt) so the
   menu stays readable without JS; this script only swaps which one shows. */

(function () {
  const KEY = "ps-menu-location";
  const toggle = document.querySelector(".loc-toggle");
  if (!toggle) return;
  const buttons = toggle.querySelectorAll("button[data-loc]");

  function apply(loc, animate) {
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.loc === loc)));
    document.querySelectorAll(".menu-item .price").forEach((el) => {
      const next = loc === "midtown" ? el.dataset.mt : el.dataset.pt;
      const label = next ? `$${next}` : "—";
      if (!animate) { el.textContent = label; return; }
      el.classList.add("is-swapping");
      setTimeout(() => { el.textContent = label; el.classList.remove("is-swapping"); }, 180);
    });
    document.querySelectorAll("[data-loc-name]").forEach((el) => {
      el.textContent = loc === "midtown" ? "Midtown · The Peacherie" : "Peoplestown · Terminal South";
    });
    try { localStorage.setItem(KEY, loc); } catch (e) { /* private mode */ }
  }

  buttons.forEach((b) => b.addEventListener("click", () => apply(b.dataset.loc, true)));

  let saved = "peoplestown";
  try { saved = localStorage.getItem(KEY) || "peoplestown"; } catch (e) { /* private mode */ }
  apply(saved, false);
})();
