/* ==========================================================================
   Intro — an editorial title sequence for first arrival.
   Beat 1: Jamaica's national motto. Beat 2: the food, word by word.
   Beat 3: the brand lockup and a single gold "Welcome" button.

   - Homepage only (this script is only loaded there).
   - Shows once per browser session (sessionStorage).
   - Click anywhere or press Esc to jump straight to the Welcome beat.
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
    <svg class="intro-saltire" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="0" x2="100" y2="100" pathLength="1"/>
      <line x1="100" y1="0" x2="0" y2="100" pathLength="1"/>
    </svg>
    <div class="intro-stage">
      <div class="intro-beat intro-motto">
        <h2 class="intro-display"><span class="intro-line"><span>Out of many,</span></span><span class="intro-line"><span>one people</span></span></h2>
        <p class="intro-caption">— the Jamaican national motto</p>
      </div>
      <div class="intro-beat intro-words" aria-hidden="true">
        <span class="intro-word">Jerk.</span>
        <span class="intro-word">Oxtail.</span>
        <span class="intro-word">Escovitch.</span>
        <span class="intro-word">Rice &amp; peas.</span>
      </div>
      <div class="intro-beat intro-lockup">
        <span class="intro-brand">Perfect Season<span class="pepper">i</span>ng</span>
        <span class="intro-brand-sub">Authentic Jamaican Cuisine · Atlanta · Est 2020</span>
        <p class="intro-serif">The island’s table, set in the heart of the city.</p>
        <button type="button" class="btn btn--gold intro-welcome">Welcome</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.classList.add("intro-lock");

  const q = (sel) => overlay.querySelector(sel);
  const qa = (sel) => overlay.querySelectorAll(sel);
  const welcomeBtn = q(".intro-welcome");

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
      .to(".intro-lockup", { opacity: 0, y: -24, duration: 0.4, ease: "power2.in" })
      .to(overlay, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.85, ease: "power4.inOut" }, 0.15);
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Saltire draw — the flag's geometry, abstracted to two gold strokes
  gsap.set(".intro-saltire line", { strokeDasharray: 1, strokeDashoffset: 1 });
  tl.to(".intro-saltire line", { strokeDashoffset: 0, duration: 1.1, stagger: 0.12, ease: "power2.inOut" }, 0);

  // Beat 1 — the motto
  gsap.set(".intro-motto .intro-line > span", { yPercent: 110 });
  gsap.set(".intro-caption", { opacity: 0 });
  tl.to(".intro-motto .intro-line > span", { yPercent: 0, duration: 0.8, stagger: 0.14 }, 0.25)
    .to(".intro-caption", { opacity: 1, duration: 0.5 }, 1.0)
    .to(".intro-motto", { opacity: 0, y: -30, duration: 0.5, ease: "power2.in" }, 2.3);

  // Beat 2 — the food, one word at a time
  const words = qa(".intro-word");
  gsap.set(words, { opacity: 0, scale: 0.96 });
  words.forEach((w, i) => {
    const at = 2.85 + i * 0.5;
    tl.to(w, { opacity: 1, scale: 1, duration: 0.22 }, at)
      .to(w, { opacity: 0, duration: 0.18, ease: "power1.in" }, at + 0.36);
  });

  // Beat 3 — lockup and the Welcome button
  gsap.set([".intro-brand", ".intro-brand-sub", ".intro-serif", ".intro-welcome"], { opacity: 0, y: 22 });
  tl.to(".intro-brand", { opacity: 1, y: 0, duration: 0.7 }, 4.95)
    .to(".intro-brand-sub", { opacity: 1, y: 0, duration: 0.6 }, 5.15)
    .to(".intro-serif", { opacity: 1, y: 0, duration: 0.6 }, 5.3)
    .to(".intro-welcome", { opacity: 1, y: 0, duration: 0.6, onComplete: () => welcomeBtn.focus() }, 5.5)
    .to(".intro-saltire", { opacity: 0.14, duration: 1 }, 4.95);

  // Skip ahead: any click outside the button, or Esc, jumps to the final beat
  function skipToEnd() {
    if (done) return;
    if (tl.time() < 4.95) tl.seek(4.95);
  }
  overlay.addEventListener("click", (e) => { if (!e.target.closest(".intro-welcome")) skipToEnd(); });
  document.addEventListener("keydown", function onKey(e) {
    if (e.key === "Escape") { skipToEnd(); }
    if (done) document.removeEventListener("keydown", onKey);
  });

  welcomeBtn.addEventListener("click", finish);
})();
