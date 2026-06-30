(function () {
  async function loadNavbar() {
    const headerSlot = document.querySelector("#site-shell header#site-header");
    const announcementSlot = document.querySelector("#announcement-bar");
    if (!headerSlot || !announcementSlot) return;

    const response = await fetch("assets/partials/navbar.html");
    const html = await response.text();
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html.trim();
    announcementSlot.replaceWith(wrapper.querySelector("#announcement-bar"));
    headerSlot.replaceWith(wrapper.querySelector("#site-header"));

    const bar = document.querySelector("#announcement-bar");
    bar.innerHTML = `
      <span class="pulse-dot" aria-hidden="true"></span>
      <strong>June 2026 Top Story:</strong>
      <span>Wildfire smoke and public health remain at the center of this week's coverage.</span>
      <a href="article.html?slug=wildfire-smoke-public-health">Read Story</a>
    `;

    const current = document.body.dataset.page || "home";
    const header = document.querySelector("#site-header");
    header.innerHTML = `
      <div class="container nav-inner">
        <a class="brand-logo" href="index.html" aria-label="The Climate Lens home">
          <img src="assets/images/theclimatelenslogo2.png" alt="The Climate Lens">
        </a>
        <nav class="desktop-nav" aria-label="Primary navigation">
          ${navItems().map(([id, label, href]) => `<a href="${href}" class="${current === id ? "active" : ""}">${label}</a>`).join("")}
        </nav>
        <a class="nav-cta" href="contact.html">Contact</a>
        <button class="mobile-menu-toggle" type="button" aria-label="Toggle navigation menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav class="mobile-nav container" aria-label="Mobile navigation" hidden>
        ${navItems().map(([id, label, href]) => `<a href="${href}" class="${current === id ? "active" : ""}">${label}</a>`).join("")}
        <a href="contact.html" class="${current === "contact" ? "active" : ""}">Contact</a>
      </nav>
    `;

    const toggle = header.querySelector(".mobile-menu-toggle");
    const mobileNav = header.querySelector(".mobile-nav");
    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      mobileNav.hidden = true;
      document.body.classList.remove("menu-open");
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      mobileNav.hidden = isOpen;
      document.body.classList.toggle("menu-open", !isOpen);
    });

    header.querySelectorAll(".desktop-nav a, .mobile-nav a").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) closeMenu();
    });
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 8);
    }, { passive: true });
  }

  function navItems() {
    return [
      ["home", "Home", "index.html"],
      ["latest", "Latest Stories", "latest-stories.html"],
      ["investigations", "News", "investigations.html"],
      ["explained", "Climate Explained", "climate-explained.html"],
      ["videos", "Videos", "videos.html"],
      ["about", "About", "about.html"]
    ];
  }

  document.addEventListener("DOMContentLoaded", loadNavbar);
})();
