/* ==========================================================================
   Intro — a single welcome screen.
   Full-bleed plate photography settles into place, the brand lockup rises
   over it, and one gold Welcome button opens the site.

   - Homepage only (this script is only loaded there).
   - Shows once per browser session (sessionStorage).
   - Esc skips the entrance straight to its end state.
   - Skipped entirely for reduced-motion, no-JS, or if GSAP failed to load.
   - The hero load animation waits for "ps:intro-done" (see main.js).
   ========================================================================== */

(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (typeof window.gsap === "undefined") return;
  try { if (sessionStorage.getItem("ps-intro-seen")) return; } catch (e) { /* private mode: show it */ }

  document.documentElement.classList.add("intro-active");

  const overlay = document.createElement("div");
  overlay.className = "intro-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-label", "Welcome to Perfect Seasoning");
  overlay.innerHTML = `
    <div class="intro-bg" aria-hidden="true">
      <img src="assets/img/post-03-stew-chicken.jpg" alt="">
    </div>
    <div class="intro-scrim" aria-hidden="true"></div>
    <div class="intro-lockup">
      <span class="intro-brand">Perfect Season<span class="pepper">i</span>ng</span>
      <span class="intro-brand-sub">Authentic Jamaican Cuisine · Atlanta · Est 2020</span>
      <p class="intro-serif">The island’s table, set in the heart of the city.</p>
      <button type="button" class="btn btn--gold intro-welcome">Welcome</button>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.classList.add("intro-lock");

  const welcomeBtn = overlay.querySelector(".intro-welcome");

  let done = false;
  function finish() {
    if (done) return;
    done = true;
    try { sessionStorage.setItem("ps-intro-seen", "1"); } catch (e) { /* private mode */ }
    gsap.timeline({
      onComplete() {
        overlay.remove();
        document.body.classList.remove("intro-lock");
        document.documentElement.classList.remove("intro-active");
        document.dispatchEvent(new Event("ps:intro-done"));
      },
    })
      .to(".intro-lockup", { opacity: 0, y: -24, duration: 0.35, ease: "power2.in" })
      .to(overlay, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.8, ease: "power4.inOut" }, 0.1);
  }

  // Entrance: the plate settles, the lockup rises
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  gsap.set(".intro-bg img", { scale: 1.1, opacity: 0 });
  gsap.set([".intro-brand", ".intro-brand-sub", ".intro-serif", ".intro-welcome"], { opacity: 0, y: 26 });
  tl.to(".intro-bg img", { opacity: 1, duration: 0.9, ease: "power2.out" }, 0)
    .to(".intro-bg img", { scale: 1, duration: 2.4, ease: "power2.out" }, 0)
    .to(".intro-brand", { opacity: 1, y: 0, duration: 0.7 }, 0.45)
    .to(".intro-brand-sub", { opacity: 1, y: 0, duration: 0.6 }, 0.65)
    .to(".intro-serif", { opacity: 1, y: 0, duration: 0.6 }, 0.8)
    .to(".intro-welcome", { opacity: 1, y: 0, duration: 0.6, onComplete: () => welcomeBtn.focus() }, 1.0);

  // Esc jumps the entrance to its end state
  document.addEventListener("keydown", function onKey(e) {
    if (e.key === "Escape" && !done) tl.progress(1);
    if (done) document.removeEventListener("keydown", onKey);
  });

  welcomeBtn.addEventListener("click", finish);
})();
