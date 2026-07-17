/* ==========================================================================
   Ambient heat — the signature interaction.
   A fixed canvas behind the content: the cursor carries a warm ember glow
   across the dark sections, and spice flecks (paprika / turmeric / thyme /
   coriander) drift upward like the air over a hot pan, scattering gently
   away from the pointer.

   - Sits at z-index 0; content paints above it (cream sections cover it).
   - Touch devices: ambient drift only, no glow (no cursor to follow).
   - prefers-reduced-motion: never starts.
   - Pauses when the tab is hidden. Particle count scales with viewport.
   ========================================================================== */

(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.className = "ambient-canvas";
  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d");

  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  let w = 0, h = 0, dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  // Spice palette — paprika, turmeric, dried thyme, coriander seed, sea salt
  const SPICES = ["#c93b2b", "#d99a2b", "#46a862", "#8a5a2b", "#f3ecdd"];

  function makeFleck() {
    return {
      x: Math.random() * w,
      y: h + Math.random() * h * 0.3,
      r: 0.8 + Math.random() * 1.8,
      vy: 0.12 + Math.random() * 0.35,          // slow rise, like heat
      sway: 0.4 + Math.random() * 1.1,
      phase: Math.random() * Math.PI * 2,
      color: SPICES[(Math.random() * SPICES.length) | 0],
      alpha: 0.25 + Math.random() * 0.45,
    };
  }

  let flecks = [];
  function seed() {
    const target = Math.round(Math.min(90, Math.max(30, (w * h) / 26000)) * (finePointer ? 1 : 0.5));
    flecks = Array.from({ length: target }, () => {
      const f = makeFleck();
      f.y = Math.random() * h;  // initial fill: scatter through the viewport
      return f;
    });
  }
  seed();
  window.addEventListener("resize", seed);

  // Cursor state, smoothed so the glow trails like warmth, not a flashlight
  const mouse = { x: w / 2, y: h * 0.4, tx: w / 2, ty: h * 0.4, active: false };
  if (finePointer) {
    window.addEventListener("pointermove", (e) => {
      mouse.tx = e.clientX; mouse.ty = e.clientY; mouse.active = true;
    }, { passive: true });
    window.addEventListener("pointerleave", () => { mouse.active = false; });
    document.addEventListener("mouseleave", () => { mouse.active = false; });
  }

  let running = true;
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(tick);
  });

  let t = 0;
  function tick() {
    if (!running) return;
    t += 0.016;
    ctx.clearRect(0, 0, w, h);

    // The ember glow under the cursor
    if (finePointer && mouse.active) {
      mouse.x += (mouse.tx - mouse.x) * 0.07;
      mouse.y += (mouse.ty - mouse.y) * 0.07;
      const R = Math.max(w, h) * 0.28;
      const breathe = 1 + Math.sin(t * 1.6) * 0.05;
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, R * breathe);
      g.addColorStop(0, "rgba(217, 130, 43, 0.16)");
      g.addColorStop(0.35, "rgba(201, 59, 43, 0.07)");
      g.addColorStop(1, "rgba(201, 59, 43, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }

    // Spice flecks
    for (const f of flecks) {
      f.y -= f.vy;
      f.x += Math.sin(t * 0.7 + f.phase) * f.sway * 0.18;

      // Scatter softly away from the cursor
      if (finePointer && mouse.active) {
        const dx = f.x - mouse.x, dy = f.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        const range = 120;
        if (d2 < range * range && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const push = (1 - d / range) * 1.4;
          f.x += (dx / d) * push;
          f.y += (dy / d) * push;
        }
      }

      if (f.y < -8) { Object.assign(f, makeFleck()); }
      if (f.x < -8) f.x = w + 6;
      if (f.x > w + 8) f.x = -6;

      ctx.globalAlpha = f.alpha;
      ctx.fillStyle = f.color;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
