
(function () {
  "use strict";

  // =======================
  // Helper Functions
  // =======================
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (!selectEl) return;

    if (all) {
      selectEl.forEach(e => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  };

  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  // =======================
  // Navbar Active Links
  // =======================
  let navbarlinks = select("#navbar .scrollto", true);

  const navbarlinksActive = () => {
    let position = window.scrollY + 200;

    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;

      let section = select(navbarlink.hash);
      if (!section) return;

      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };

  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  // =======================
  // Scroll to section
  // =======================
  const scrollto = (el) => {
    const header = select("#header");
    if (!header) return;

    const element = select(el);
    if (!element) return;

    const offset = header.offsetHeight;

    window.scrollTo({
      top: element.offsetTop - offset,
      behavior: "smooth",
    });
  };

  // =======================
  // Back to top button
  // =======================
  const backtotop = select(".back-to-top");

  if (backtotop) {
    const toggleBacktotop = () => {
      backtotop.classList.toggle("active", window.scrollY > 100);
    };

    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  // =======================
  // Mobile nav toggle
  // =======================
  on("click", ".mobile-nav-toggle", function () {
    const navbar = select("#navbar");
    if (!navbar) return;

    navbar.classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  // =======================
  // Mobile dropdown
  // =======================
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      const navbar = select("#navbar");

      if (navbar && navbar.classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling?.classList.toggle("dropdown-active");
      }
    },
    true
  );

  // =======================
  // Smooth scroll links
  // =======================
  on(
    "click",
    ".scrollto",
    function (e) {
      const target = select(this.hash);

      if (target) {
        e.preventDefault();

        navbarlinks.forEach(link => link.classList.remove("active"));
        this.classList.add("active");

        const navbar = select("#navbar");
        if (navbar && navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");

          const toggle = select(".mobile-nav-toggle");
          toggle?.classList.toggle("bi-list");
          toggle?.classList.toggle("bi-x");
        }

        scrollto(this.hash);
      }
    },
    true
  );

  // =======================
  // About image click effect
  // =======================
  const aboutImg = select("#about-image");
  const aboutStatus = select("#about-image-status");

  if (aboutImg && aboutStatus) {
    aboutImg.addEventListener("click", () => {
      aboutStatus.classList.add("active");
      setTimeout(() => aboutStatus.classList.remove("active"), 1200);
    });
  }
})();

// =======================
// LOADER
// =======================
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.classList.add("disappear");
  }
});

// =======================
// TYPED JS
// =======================
document.addEventListener("DOMContentLoaded", function () {
  if (typeof Typed !== "undefined" && document.querySelector("#typed-text")) {
    new Typed("#typed-text", {
      strings: ["Administrator", "Accountant", "Technical Support Specialist"],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2500,
      loop: true,
    });
  }
});

// =======================
// DARK / LIGHT MODE TOGGLE (SYSTEM + MANUAL)
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const storageKey = "theme";

  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  let savedTheme = localStorage.getItem(storageKey);
  let currentTheme = savedTheme || systemTheme;

  applyTheme(currentTheme);

  // Manual toggle
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(currentTheme);
      localStorage.setItem(storageKey, currentTheme);
    });
  }

  // System change listener
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  mediaQuery.addEventListener("change", (e) => {
    if (!localStorage.getItem(storageKey)) {
      currentTheme = e.matches ? "dark" : "light";
      applyTheme(currentTheme);
    }
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    if (!themeIcon) return;

    if (theme === "dark") {
      themeIcon.classList.remove("bi-sun-fill");
      themeIcon.classList.add("bi-moon-fill");
    } else {
      themeIcon.classList.remove("bi-moon-fill");
      themeIcon.classList.add("bi-sun-fill");
    }
  }
});