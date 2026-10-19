const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("primary-nav");
menuBtn.addEventListener("click", () => {
  const on = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(on));
  menuBtn.setAttribute(
    "aria-label",
    on ? "Close navigation" : "Open navigation",
  );
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open navigation");
  }),
);
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    }),
  { threshold: 0.08, rootMargin: "0px 0px -35px 0px" },
);
document.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
let scheduled = false;
function updateScroll() {
  const h = document.documentElement;
  const pct =
    (100 * h.scrollTop) / Math.max(h.scrollHeight - h.clientHeight, 1);
  document.getElementById("scroll-progress").style.width = pct + "%";
  document
    .getElementById("header")
    .classList.toggle("scrolled", h.scrollTop > 20);
  scheduled = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!scheduled) {
      requestAnimationFrame(updateScroll);
      scheduled = true;
    }
  },
  { passive: true },
);
updateScroll();
const sections = document.querySelectorAll("main section[id]");
const anchors = [...nav.querySelectorAll("a")];
const sectionObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        anchors.forEach((a) => {
          const active = a.getAttribute("href") === "#" + e.target.id;
          a.classList.toggle("active", active);
          active
            ? a.setAttribute("aria-current", "location")
            : a.removeAttribute("aria-current");
        });
      }
    }),
  { rootMargin: "-30% 0px -55% 0px" },
);
sections.forEach((s) => sectionObserver.observe(s));

// Application UI showcase
const shots = [
  {
    name: "Dashboard",
    desc: "A clear overview of clinical cases, patients and activity across the connected research workflow.",
    src: "assets/app-1.webp",
  },
  {
    name: "IoT Monitoring",
    desc: "Live ESP32 vital-sign monitoring brings incoming patient measurements into one focused view.",
    src: "assets/app-2.webp",
  },
  {
    name: "Patient Risk",
    desc: "Structured clinical intake combines symptoms and risk factors for baseline screening.",
    src: "assets/app-3.webp",
  },
  {
    name: "Cardiac Analysis",
    desc: "ECG and cardiac outputs support review of heart signals and the investigation pathway.",
    src: "assets/app-4.webp",
  },
  {
    name: "Gastric Support",
    desc: "Gastric findings and AI-assisted guidance are presented for educational clinical review.",
    src: "assets/app-5.webp",
  },
  {
    name: "Angiogram Analysis",
    desc: "Coronary vessel mapping highlights stenosis findings through visual image analysis.",
    src: "assets/app-6.webp",
  },
];
let activeShot = 0;
function setShot(i) {
  activeShot = (i + shots.length) % shots.length;
  let s = shots[activeShot];
  const image = document.getElementById("showcase-active");
  image.src = s.src;
  image.alt = s.name + " interface preview";
  image.classList.remove("is-changing");
  void image.offsetWidth;
  image.classList.add("is-changing");
  document.getElementById("showcase-title").textContent = s.name;
  document.getElementById("showcase-desc").textContent = s.desc;
  document.querySelector(".shot-count").textContent =
    String(activeShot + 1).padStart(2, "0") +
    " / " +
    String(shots.length).padStart(2, "0");
  document.querySelectorAll(".shot-thumb").forEach((b, j) => {
    b.classList.toggle("selected", j === activeShot);
    b.setAttribute("aria-pressed", String(j === activeShot));
  });
}
document
  .getElementById("shot-prev")
  .addEventListener("click", () => setShot(activeShot - 1));
document
  .getElementById("shot-next")
  .addEventListener("click", () => setShot(activeShot + 1));
document
  .querySelectorAll(".shot-thumb")
  .forEach((b, i) => b.addEventListener("click", () => setShot(i)));
// Real embedded PDF viewer
const researchFiles = [
  {
    name: "Proposal \u00B7 Baseline Risk",
    embedUrl:
      "https://drive.google.com/file/d/1mmDAsH3Gnlc0FzMfs6eo9oTn6cc_kpuA/preview",
  },
  {
    name: "Proposal \u00B7 Cardiac",
    embedUrl:
      "https://drive.google.com/file/d/1ZoEZYyg7QpKvZpubXQqrGtlFlOUxl14D/preview",
  },
  {
    name: "Proposal \u00B7 Angiogram",
    embedUrl:
      "https://drive.google.com/file/d/1K9a1qNcYld8enXznMDgTQreBbEeDwlCu/preview",
  },
  {
    name: "Proposal \u00B7 Gastric",
    embedUrl:
      "https://drive.google.com/file/d/1rtEwGq5RrLN0lDn4rtgZPJWlxsOXW0WJ/preview",
  },
  {
    name: "Progress Presentation 1",
    embedUrl:
      "https://drive.google.com/file/d/1CEZ9yT6I1YIeCdwHKgP-ndwJRXKBdfic/preview",
  },
  {
    name: "Progress Presentation 2",
    embedUrl:
      "https://drive.google.com/file/d/101IN4JTNE6YYb3aQO6B-zs5bGMi4FF7Y/preview",
  },
];
document.querySelectorAll(".library-item").forEach((b, i) =>
  b.addEventListener("click", () => {
    const file = researchFiles[i];
    document.getElementById("pdf-frame").src = file.embedUrl;
    document.getElementById("pdf-frame").title = file.name;
    document.getElementById("pdf-name").textContent = file.name;
    document.getElementById("pdf-download").href = file.embedUrl
      .replace("/file/d/", "/uc?export=download&id=")
      .replace("/preview", "");
    document.getElementById("pdf-newtab").href = file.embedUrl;
    document.querySelectorAll(".library-item").forEach((x, j) => {
      x.classList.toggle("current", j === i);
      x.setAttribute("aria-pressed", String(j === i));
    });
  }),
);
// Rich-but-respectful visual feedback
if (
  window.matchMedia("(pointer:fine) and (prefers-reduced-motion:no-preference)")
    .matches
) {
  document
    .querySelectorAll(".module,.person-card,.supervisor-card")
    .forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty(
          "--mx",
          ((e.clientX - r.left) / r.width) * 100 + "%",
        );
        card.style.setProperty(
          "--my",
          ((e.clientY - r.top) / r.height) * 100 + "%",
        );
      });
    });
}

// Refined keyboard and motion interactions.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("open")) {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open navigation");
    menuBtn.focus();
  }
});
const showcase = document.querySelector(".showcase-wrap");
showcase.setAttribute("tabindex", "0");
showcase.setAttribute(
  "aria-label",
  "Application screenshots. Use left and right arrow keys to browse.",
);
showcase.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    setShot(activeShot + (event.key === "ArrowRight" ? 1 : -1));
    scheduleCarousel();
  }
});
const carouselToggle = document.getElementById("carousel-toggle");
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
let carouselPlaying = !reduceMotion;
let carouselTimer = null;
function stopCarousel() {
  clearTimeout(carouselTimer);
  carouselTimer = null;
  showcase.classList.remove("is-playing");
}
function scheduleCarousel() {
  stopCarousel();
  if (!carouselPlaying || document.hidden) return;
  void showcase.offsetWidth;
  showcase.classList.add("is-playing");
  carouselTimer = setTimeout(() => {
    setShot(activeShot + 1);
    scheduleCarousel();
  }, 7000);
}
function updateCarouselToggle() {
  carouselToggle.textContent = carouselPlaying ? "Pause" : "Play";
  carouselToggle.setAttribute(
    "aria-label",
    carouselPlaying ? "Pause automatic slideshow" : "Play automatic slideshow",
  );
}
carouselToggle.addEventListener("click", () => {
  carouselPlaying = !carouselPlaying;
  updateCarouselToggle();
  carouselPlaying ? scheduleCarousel() : stopCarousel();
});
showcase.addEventListener("mouseenter", stopCarousel);
showcase.addEventListener("mouseleave", scheduleCarousel);
showcase.addEventListener("focusin", stopCarousel);
showcase.addEventListener("focusout", (event) => {
  if (!showcase.contains(event.relatedTarget)) scheduleCarousel();
});
showcase.addEventListener("click", (event) => {
  if (event.target.closest(".shot-thumb,.showcase-controls"))
    scheduleCarousel();
});
document.addEventListener("visibilitychange", () =>
  document.hidden ? stopCarousel() : scheduleCarousel(),
);
updateCarouselToggle();
scheduleCarousel();
if (
  window.matchMedia("(pointer:fine) and (prefers-reduced-motion:no-preference)")
    .matches
) {
  const hero = document.querySelector(".hero");
  const art = document.querySelector(".hero-medical-art");
  hero.addEventListener("pointermove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 12;
    const y = (event.clientY / window.innerHeight - 0.5) * 8;
    art.style.setProperty("--pointer-x", x + "px");
    art.style.setProperty("--pointer-y", y + "px");
  });
  hero.addEventListener("pointerleave", () => {
    art.style.removeProperty("--pointer-x");
    art.style.removeProperty("--pointer-y");
  });
}

// FormSubmit returns visitors to the live site after a successful submission.
const contactFormStatus = document.getElementById("contact-form-status");
if (new URLSearchParams(window.location.search).get("message") === "sent") {
  contactFormStatus.hidden = false;
  contactFormStatus.textContent =
    "Your enquiry was sent successfully. Please check your email for the automatic confirmation.";
  window.history.replaceState({}, document.title, "#contact");
}

// Inline navigation search for documents and key website sections.
const navSearchForm = document.getElementById("nav-search");
const navSearchInput = document.getElementById("nav-search-input");
const navSearchTargets = [
  {
    keywords:
      "research module methodology literature survey objectives workflow architecture",
    target: "#domain",
  },
  {
    keywords:
      "baseline risk patient profile risk assessment symptoms machine learning explainability",
    target: "#domain",
  },
  {
    keywords:
      "heart cardiac ecg echo echocardiogram functional analysis signals",
    target: "#domain",
  },
  {
    keywords:
      "angiogram coronary stenosis yolo coronary imaging",
    target: "#domain",
  },
  {
    keywords:
      "gastric gastroscopy endoscopy efficientnet decision support stomach",
    target: "#domain",
  },
  {
    keywords:
      "platform application dashboard iot monitoring patient risk screenshots live app",
    target: "#showcase",
  },
  {
    keywords:
      "result evidence accuracy sensitivity specificity f1 performance logistic regression",
    target: "#results",
  },
  {
    keywords:
      "milestone timeline proposal presentation final assessment website viva march september october",
    target: "#milestones",
  },
  {
    keywords:
      "team supervisor people harshanath rajapaksha nishan vas samarakoon peiris bhawi wijewardhana isuru jayalath savidya maheesha",
    target: "#about",
  },
  { keywords: "contact email enquiry", target: "#contact" },
  {
    keywords: "checklist project checklist sheets google sheets",
    target: "#documents",
    openSelector: ".library-checklist-group",
  },
];
navSearchInput.addEventListener("input", () =>
  navSearchInput.setCustomValidity(""),
);
navSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = navSearchInput.value.trim().toLowerCase();
  if (!query) return;

  const matchesQuery = (text) =>
    query.split(/\s+/).every((term) => text.toLowerCase().includes(term));
  const documentIndex = researchFiles.findIndex((file) =>
    matchesQuery(file.name),
  );
  if (documentIndex >= 0) {
    const documentButton = document.querySelector(
      `.library-item[data-file="${documentIndex}"]`,
    );
    documentButton.closest("details").open = true;
    documentButton.click();
    document.querySelector("#documents").scrollIntoView({ behavior: "smooth" });
    return;
  }

  const target = navSearchTargets.find((entry) => matchesQuery(entry.keywords));
  if (target) {
    if (target.openSelector) document.querySelector(target.openSelector).open = true;
    document
      .querySelector(target.target)
      .scrollIntoView({ behavior: "smooth" });
    return;
  }

  navSearchInput.setCustomValidity(
    "No matching document or section was found.",
  );
  navSearchInput.reportValidity();
});
