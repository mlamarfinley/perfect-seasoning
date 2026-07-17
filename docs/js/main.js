/* ==========================================================================
   Perfect Seasoning — shared behavior
   - Live hours engine (single source of truth for both locations)
   - Taco Tuesday auto-banner
   - Nav, reveals (GSAP + fallback), marquee, forms, events
   ========================================================================== */

document.documentElement.classList.remove("no-js");

/* --------------------------------------------------------------------------
   HOURS — the one place hours live. Everything on the site renders from this.
   TODO(owner): confirm hours. Sources conflict; using each location's most
   authoritative public listing (Ridge Ave: perfectseasoningllc.com; Midtown:
   Google Business Profile) until the owners confirm.
   Format: [openMinutes, closeMinutes] in minutes-from-midnight, or null = closed.
   Index 0 = Sunday … 6 = Saturday. All times America/New_York.
   -------------------------------------------------------------------------- */
const HOURS = {
  peoplestown: {
    name: "Peoplestown",
    venue: "Switchman Hall at Terminal South",
    address: "1161 Ridge Ave SW, Atlanta, GA 30315",
    week: [
      [690, 1200],  // Sun 11:30–8
      [690, 1200],  // Mon 11:30–8
      [690, 1230],  // Tue 11:30–8:30
      [690, 1140],  // Wed 11:30–7
      [690, 1140],  // Thu 11:30–7
      [690, 1140],  // Fri 11:30–7
      [690, 1170],  // Sat 11:30–7:30
    ],
  },
  midtown: {
    name: "Midtown",
    venue: "The Peacherie Food Hall",
    address: "1375 Peachtree St NE, Atlanta, GA 30309",
    week: [
      null,          // Sun closed
      [660, 1020],   // Mon 11–5
      [660, 1200],   // Tue 11–8
      [660, 1200],   // Wed 11–8
      [660, 1200],   // Thu 11–8
      [660, 1200],   // Fri 11–8
      [660, 1200],   // Sat 11–8
    ],
  },
};

const ORDER_URL = "https://order.chownow.com/order/42959/locations";

/* Current time in Atlanta regardless of the visitor's timezone */
function atlantaNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short", hour: "numeric", minute: "numeric", hour12: false,
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const dayIdx = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day: dayIdx, mins: (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10) };
}

function fmt(mins) {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h24 >= 12 ? "PM" : "AM";
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return m === 0 ? `${h} ${ampm}` : `${h}:${String(m).padStart(2, "0")} ${ampm}`;
}

/* Open-now status for one location */
function locationStatus(key) {
  const loc = HOURS[key];
  const { day, mins } = atlantaNow();
  const today = loc.week[day];
  if (today && mins >= today[0] && mins < today[1]) {
    return { open: true, label: `Open now · closes ${fmt(today[1])}` };
  }
  if (today && mins < today[0]) {
    return { open: false, label: `Closed · opens today ${fmt(today[0])}` };
  }
  // Find next open day
  for (let i = 1; i <= 7; i++) {
    const next = loc.week[(day + i) % 7];
    if (next) {
      const dayName = i === 1 ? "tomorrow" : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][(day + i) % 7];
      return { open: false, label: `Closed · opens ${dayName} ${fmt(next[0])}` };
    }
  }
  return { open: false, label: "Closed" };
}

/* Render every [data-hours-status="key"] pill on the page */
function renderStatusPills() {
  document.querySelectorAll("[data-hours-status]").forEach((el) => {
    const key = el.dataset.hoursStatus;
    if (!HOURS[key]) return;
    const s = locationStatus(key);
    el.classList.toggle("is-open", s.open);
    el.classList.toggle("is-closed", !s.open);
    const text = el.querySelector(".status-text");
    if (text) text.textContent = s.label;
  });
  // Header pill: "open" if either location is open
  document.querySelectorAll("[data-hours-any]").forEach((el) => {
    const p = locationStatus("peoplestown");
    const m = locationStatus("midtown");
    const anyOpen = p.open || m.open;
    el.classList.toggle("is-open", anyOpen);
    el.classList.toggle("is-closed", !anyOpen);
    const text = el.querySelector(".status-text");
    if (text) {
      text.textContent = anyOpen
        ? (p.open && m.open ? "Both locations open now" : `${p.open ? "Peoplestown" : "Midtown"} open now`)
        : "Both locations closed";
    }
  });
}

/* Full week tables: [data-hours-table="key"] */
function renderHoursTables() {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const { day: today } = atlantaNow();
  document.querySelectorAll("[data-hours-table]").forEach((table) => {
    const loc = HOURS[table.dataset.hoursTable];
    if (!loc) return;
    table.innerHTML = loc.week
      .map((h, i) => {
        const range = h ? `${fmt(h[0])} – ${fmt(h[1])}` : "Closed";
        return `<tr${i === today ? ' class="is-today"' : ""}><td>${dayNames[i]}</td><td>${range}</td></tr>`;
      })
      .join("");
  });
}

/* "Today: …" inline slots */
function renderTodayLines() {
  const { day } = atlantaNow();
  document.querySelectorAll("[data-hours-today]").forEach((el) => {
    const loc = HOURS[el.dataset.hoursToday];
    if (!loc) return;
    const h = loc.week[day];
    el.textContent = h ? `Today: ${fmt(h[0])} – ${fmt(h[1])}` : "Closed today";
  });
}

/* --------------------------------------------------------------------------
   Taco Tuesday — banner appears automatically on Tuesdays (Atlanta time)
   -------------------------------------------------------------------------- */
function tacoTuesday() {
  const { day } = atlantaNow();
  document.querySelectorAll("[data-taco-tuesday]").forEach((el) => {
    if (day === 2) {
      el.hidden = false;
    } else {
      // Outside Tuesday, show it on the menu page only, reframed as a heads-up
      const heading = el.querySelector("h3");
      const isMenuPage = el.dataset.tacoTuesday === "keep";
      if (isMenuPage && heading) {
        el.hidden = false;
        heading.textContent = "Taco Tuesday — every Tuesday";
      } else {
        el.hidden = true;
      }
    }
  });
}

/* --------------------------------------------------------------------------
   Header / nav
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector(".site-header");
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }
}

/* --------------------------------------------------------------------------
   Reveal animations — GSAP ScrollTrigger when available, IntersectionObserver
   fallback otherwise. prefers-reduced-motion disables both.
   -------------------------------------------------------------------------- */
function initMotion() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    document.documentElement.classList.add("no-motion");
    return;
  }

  const hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

  if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero load sequence: arch rises open, headline lines stagger, meta fades.
    // If the intro overlay is up, hold this until the Welcome button dismisses it.
    const introActive = document.documentElement.classList.contains("intro-active");
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" }, paused: introActive });
    if (introActive) {
      document.addEventListener("ps:intro-done", () => heroTl.play(), { once: true });
    }
    if (document.querySelector(".hero-arch")) {
      gsap.set(".hero-arch", { clipPath: "inset(100% 0% 0% 0% round 999px 999px 20px 20px)" });
      heroTl.to(".hero-arch", { clipPath: "inset(0% 0% 0% 0% round 999px 999px 20px 20px)", duration: 1.2 }, 0.15);
    }
    if (document.querySelector(".hero-title .line > span")) {
      gsap.set(".hero-title .line > span", { yPercent: 110 });
      heroTl.to(".hero-title .line > span", { yPercent: 0, duration: 0.9, stagger: 0.12 }, 0.3);
    }
    const heroFade = document.querySelectorAll(".hero .eyebrow, .hero-lede, .hero-actions, .hero-meta, .hero-scroll-hint, .est-badge");
    if (heroFade.length) {
      gsap.set(heroFade, { opacity: 0, y: 16 });
      heroTl.to(heroFade, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.7);
    }

    // Subtle parallax on the hero photo
    if (document.querySelector(".hero-arch img")) {
      gsap.fromTo(".hero-arch img", { yPercent: -6, scale: 1.12 }, {
        yPercent: 6, scale: 1.12, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
    }

    // Scroll reveals
    document.querySelectorAll(".reveal").forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 34 }, {
        opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
      });
    });

    // Arch photos scale softly into place
    document.querySelectorAll(".dish-photo img, .split .arch-photo img, .loc-detail .arch-photo img").forEach((img) => {
      gsap.fromTo(img, { scale: 1.14 }, {
        scale: 1, duration: 1.3, ease: "power2.out",
        scrollTrigger: { trigger: img, start: "top 88%", once: true },
      });
    });
  } else {
    // IntersectionObserver fallback
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -10% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    document.querySelectorAll(".hero-title .line > span").forEach((el) => { el.style.transform = "none"; });
  }
}

/* --------------------------------------------------------------------------
   Catering / newsletter forms (Formspree)
   -------------------------------------------------------------------------- */
function initForms() {
  document.querySelectorAll("form[data-formspree]").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = form.querySelector(".form-status") || form.parentElement.querySelector(".form-status");
      const action = form.getAttribute("action") || "";
      if (action.includes("FORMSPREE_ID")) {
        if (status) {
          status.textContent = "This form isn’t connected yet — call (678) 653-0191 and we’ll take care of you.";
          status.className = "form-status is-error";
        }
        return;
      }
      const btn = form.querySelector("button[type=submit]");
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      try {
        const res = await fetch(action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("send failed");
        form.reset();
        if (status) {
          status.textContent = "Got it — we’ll get back to you within one business day.";
          status.className = "form-status is-ok";
        }
      } catch {
        if (status) {
          status.textContent = "Something went wrong sending this. Call (678) 653-0191 and we’ll take care of you.";
          status.className = "form-status is-error";
        }
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || "Send inquiry"; }
      }
    });
  });

  // Event date field can't be in the past
  const dateInput = document.querySelector('input[type="date"][name="event_date"]');
  if (dateInput) {
    const now = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
    dateInput.min = now;
  }
}

/* --------------------------------------------------------------------------
   Events — compute the next occurrence chip for recurring events
   data-recurs="2" (weekday index) on .event-card
   -------------------------------------------------------------------------- */
function initEvents() {
  const { day } = atlantaNow();
  document.querySelectorAll("[data-recurs]").forEach((card) => {
    const target = parseInt(card.dataset.recurs, 10);
    const chip = card.querySelector(".next-chip");
    if (!chip || Number.isNaN(target)) return;
    const diff = (target - day + 7) % 7;
    chip.textContent = diff === 0 ? "Happening today" : diff === 1 ? "Tomorrow" : `Next: ${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][target]}`;
  });
}

/* --------------------------------------------------------------------------
   Boot
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  renderStatusPills();
  renderHoursTables();
  renderTodayLines();
  tacoTuesday();
  initMotion();
  initForms();
  initEvents();
  // Keep the open/closed pills honest if the tab stays open across a boundary
  setInterval(() => { renderStatusPills(); renderTodayLines(); }, 60000);
});
