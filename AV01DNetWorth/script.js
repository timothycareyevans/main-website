(() => {
  "use strict";

  const prefersReducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  const state = {
    menuOpen: false,
  };

  const els = {
    body: document.body,
    loader: document.querySelector(".loader"),
    loaderText: document.querySelector(".loader-text"),
    navbar: document.getElementById("navbar"),
    menuRoot: document.getElementById("mobileMenu"),
    menuToggle: document.getElementById("menuToggle"),
    menuClose: document.getElementById("menuCloseBtn"),
    menuLinks: document.querySelectorAll("[data-menu-link]"),
    statValues: document.querySelectorAll("[data-count]"),
  };

  const hasGSAP = typeof window.gsap !== "undefined";
  const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";

  if (hasGSAP && hasScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  const setMenuState = (open) => {
    if (!els.menuRoot || !els.menuToggle) return;

    state.menuOpen = open;
    els.body.classList.toggle("menu-open", open);
    els.menuRoot.classList.toggle("open", open);
    els.menuRoot.setAttribute("aria-hidden", String(!open));
    els.menuToggle.setAttribute("aria-expanded", String(open));
  };

  const openMenu = () => setMenuState(true);
  const closeMenu = () => setMenuState(false);

  const updateNavbar = () => {
    if (!els.navbar) return;
    els.navbar.classList.toggle("scrolled", window.scrollY > 16);
  };

  const animateCounters = () => {
    els.statValues.forEach((counter) => {
      if (counter.dataset.animated === "true") return;
      counter.dataset.animated = "true";

      const target = Number(counter.dataset.count || 0);
      const duration = prefersReducedMotion ? 0 : 1400;
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const progress = duration === 0 ? 1 : Math.min(elapsed / duration, 1);
        counter.textContent = String(Math.round(target * progress));
        if (progress < 1) {
          window.requestAnimationFrame(tick);
        }
      };

      window.requestAnimationFrame(tick);
    });
  };

  const setupCounterObserver = () => {
    const statsSection = document.querySelector(".quote-band");
    if (!statsSection) return;

    if (!("IntersectionObserver" in window)) {
      animateCounters();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounters();
          observer.disconnect();
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(statsSection);
  };

  const revealFallback = () => {
    const revealTargets = document.querySelectorAll(
      ".reveal-on-load, .reveal-left, .reveal-right, .reveal-up"
    );
    revealTargets.forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "translate(0, 0)";
    });
  };

  const runAnimations = () => {
    if (prefersReducedMotion || !hasGSAP) {
      if (els.loader) {
        els.loader.style.display = "none";
      }
      revealFallback();
      return;
    }

    const timeline = window.gsap.timeline({
      onComplete: () => {
        if (els.loader) {
          els.loader.style.display = "none";
        }
      },
    });

    timeline
      .to(els.loaderText, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
      .to(els.loader, { y: "-100%", duration: 0.85, delay: 0.25, ease: "power4.inOut" })
      .to(
        ".reveal-on-load",
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" },
        "-=0.1"
      );

    if (!hasScrollTrigger) {
      document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translate(0, 0)";
      });
      return;
    }

    document.querySelectorAll(".reveal-left").forEach((el) => {
      window.gsap.fromTo(
        el,
        { x: -48, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
          },
        }
      );
    });

    document.querySelectorAll(".reveal-right").forEach((el) => {
      window.gsap.fromTo(
        el,
        { x: 48, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
          },
        }
      );
    });

    document.querySelectorAll(".reveal-up").forEach((el) => {
      window.gsap.fromTo(
        el,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        }
      );
    });
  };

  const bindEvents = () => {
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    els.menuToggle?.addEventListener("click", openMenu);
    els.menuClose?.addEventListener("click", closeMenu);
    document.querySelector("[data-menu-backdrop]")?.addEventListener("click", closeMenu);

    els.menuLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && state.menuOpen) {
        closeMenu();
      }
    });
  };

  window.addEventListener("load", () => {
    bindEvents();
    runAnimations();
    setupCounterObserver();
  });
})();
