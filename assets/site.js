(() => {
  const root = document.documentElement;

  // Theme toggle (respects system preference until the visitor picks one)
  const toggle = document.querySelector(".theme-toggle");
  const systemDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  toggle?.addEventListener("click", () => {
    const current = root.dataset.theme || (systemDark() ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  });

  // Top bar border once scrolled
  const bar = document.querySelector(".topbar");
  const onScroll = () => bar?.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Highlight the nav link for the section in view
  const links = new Map(
    [...document.querySelectorAll(".topbar nav a")].map((a) => [
      a.hash.slice(1),
      a,
    ]),
  );
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.remove("active"));
        links.get(e.target.id)?.classList.add("active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  links.forEach((_, id) => {
    const el = document.getElementById(id);
    if (el) spy.observe(el);
  });

  // Gentle reveal on scroll
  const items = document.querySelectorAll(
    ".section__title, .about, .job, .pub, .card, .contact__card, .stats > div",
  );
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  // Copy email
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        const label = btn.textContent;
        btn.textContent = "Copied ✓";
        setTimeout(() => {
          btn.textContent = label;
        }, 1600);
      } catch (e) {
        location.href = "mailto:" + btn.dataset.copy;
      }
    });
  });

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
