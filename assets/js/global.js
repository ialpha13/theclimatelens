(function () {
  const navItems = [
    ["home", "Home", "index.html"],
    ["latest", "Latest Stories", "latest-stories.html"],
    ["investigations", "Investigations", "investigations.html"],
    ["explained", "Climate Explained", "climate-explained.html"],
    ["videos", "Videos", "videos.html"],
    ["about", "About", "about.html"]
  ];

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toISOString().slice(0, 10);
  }

  function articleUrl(article) {
    return `article.html?slug=${encodeURIComponent(article.slug || article.id)}`;
  }

  function findAuthor(authors, article) {
    return authors.find((author) => author.id === article.authorId || author.slug === article.authorId) || authors[0] || {};
  }

  function categoryClass(category, type) {
    const value = `${category || ""} ${type || ""}`.toLowerCase();
    if (value.includes("investigation")) return " investigation";
    if (value.includes("explained")) return " explained";
    return "";
  }

  function renderArticleCard(article, authors, layout) {
    const author = findAuthor(authors, article);
    const cardLayout = layout === "list" ? " list" : "";
    return `
      <article class="article-card${cardLayout}">
        <a class="article-media" href="${articleUrl(article)}" aria-label="${escapeHtml(article.title)}">
          <img src="${escapeHtml(article.featuredImage)}" alt="${escapeHtml(article.title)}" loading="lazy" referrerpolicy="no-referrer">
          ${article.type === "Investigation" ? '<span class="feature-badge">Investigation</span>' : ""}
        </a>
        <div class="card-content">
          <div>
            <div class="meta-row">
              <span class="category-pill${categoryClass(article.category, article.type)}">${escapeHtml(article.category)}</span>
              <span>${escapeHtml(formatDate(article.publishedAt))}</span>
            </div>
            <a href="${articleUrl(article)}"><h3>${escapeHtml(article.title)}</h3></a>
            <p>${escapeHtml(article.excerpt)}</p>
          </div>
          <div class="card-footer">
            <span class="author-chip">
              <img src="${escapeHtml(author.image || "")}" alt="${escapeHtml(author.name || "Author")}" loading="lazy" referrerpolicy="no-referrer">
              ${escapeHtml(author.name || "Climate Lens")}
            </span>
            <a class="read-link" href="${articleUrl(article)}">Read Full Story</a>
          </div>
        </div>
      </article>
    `;
  }

  function renderVideoCard(video) {
    return `
      <article class="video-card" data-video-card>
        <img src="${escapeHtml(video.thumbnail)}" alt="${escapeHtml(video.title)}" loading="lazy" referrerpolicy="no-referrer">
        <video src="${escapeHtml(video.videoUrl)}" poster="${escapeHtml(video.thumbnail)}" muted loop playsinline></video>
        <div class="video-overlay">
          <div>
            <span class="category-pill investigation">${escapeHtml(video.category)}</span>
          </div>
          <button class="play-button" type="button" aria-label="Play ${escapeHtml(video.title)}">Play</button>
          <div>
            <h3>${escapeHtml(video.title)}</h3>
            <p>${escapeHtml(video.description)}</p>
            <div class="video-meta">
              <span>${escapeHtml(formatDate(video.publishedAt))}</span>
              <span>CL-FEED</span>
            </div>
            <div class="progress-track"><span></span></div>
          </div>
        </div>
      </article>
    `;
  }

  function markdownToHtml(markdown) {
    const lines = String(markdown || "").split("\n");
    let html = "";
    let inList = false;
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        return;
      }
      if (trimmed.startsWith("## ")) {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        html += `<h2>${escapeHtml(trimmed.slice(3))}</h2>`;
      } else if (trimmed.startsWith("> ")) {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        html += `<blockquote><p>${escapeHtml(trimmed.slice(2))}</p></blockquote>`;
      } else if (trimmed.startsWith("- ")) {
        if (!inList) {
          html += "<ul>";
          inList = true;
        }
        html += `<li>${escapeHtml(trimmed.slice(2))}</li>`;
      } else {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        html += `<p>${escapeHtml(trimmed)}</p>`;
      }
    });
    if (inList) html += "</ul>";
    return html;
  }

  function renderNewsletter(target) {
    const node = typeof target === "string" ? document.querySelector(target) : target;
    if (!node) return;
    node.innerHTML = `
      <div class="newsletter">
        <div>
          <span>Newsroom Dispatch</span>
          <h2>Get evidence-based climate stories in your inbox.</h2>
          <p>Monthly field notes, investigations, explainers, and climate signals. No ads, no sponsor pressure.</p>
        </div>
        <form data-newsletter-form>
          <input type="email" required placeholder="you@example.com" aria-label="Email address">
          <button class="btn btn-gold" type="submit">Subscribe</button>
        </form>
      </div>
    `;
  }

  function renderStatus(target, type, message) {
    const node = typeof target === "string" ? document.querySelector(target) : target;
    if (!node) return;
    node.innerHTML = `<div class="${type}-state"><h2>${escapeHtml(message)}</h2></div>`;
  }

  function setupVideoCards(scope) {
    (scope || document).querySelectorAll("[data-video-card]").forEach((card) => {
      const video = card.querySelector("video");
      const button = card.querySelector(".play-button");
      const progress = card.querySelector(".progress-track span");
      if (!video || !button) return;
      const toggle = () => {
        document.querySelectorAll("[data-video-card] video").forEach((other) => {
          if (other !== video) {
            other.pause();
            other.closest("[data-video-card]")?.classList.remove("playing");
          }
        });
        if (video.paused) {
          video.play().then(() => card.classList.add("playing")).catch(() => {});
        } else {
          video.pause();
          card.classList.remove("playing");
        }
      };
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        toggle();
      });
      card.addEventListener("click", toggle);
      video.addEventListener("timeupdate", () => {
        if (progress && video.duration) progress.style.width = `${(video.currentTime / video.duration) * 100}%`;
      });
    });
  }

  function setupNewsletter() {
    document.querySelectorAll("[data-newsletter-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = form.querySelector("input");
        if (input) input.value = "";
        form.insertAdjacentHTML("afterend", '<p class="success-message">You are on the Climate Lens dispatch list for this session.</p>');
      }, { once: true });
    });
  }

  function renderHeader() {
    const current = document.body.dataset.page || "home";
    const header = document.querySelector("#site-header");
    if (!header) return;
    header.innerHTML = `
      <div class="container nav-inner">
        <a class="brand-logo" href="index.html" aria-label="The Climate Lens home">
          <img src="assets/images/theclimatelenslogo2.png" alt="The Climate Lens">
        </a>
        <nav class="desktop-nav" aria-label="Primary navigation">
          ${navItems.map(([id, label, href]) => `<a href="${href}" class="${current === id ? "active" : ""}">${label}</a>`).join("")}
        </nav>
        <a class="nav-cta" href="contact.html">Contact</a>
        <button class="mobile-menu-toggle" type="button" aria-label="Toggle navigation menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav class="mobile-nav container" aria-label="Mobile navigation" hidden>
        ${navItems.map(([id, label, href]) => `<a href="${href}" class="${current === id ? "active" : ""}">${label}</a>`).join("")}
        <a href="contact.html" class="${current === "contact" ? "active" : ""}">Send a Tip / Contact</a>
      </nav>
    `;
    const toggle = header.querySelector(".mobile-menu-toggle");
    const mobileNav = header.querySelector(".mobile-nav");
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      mobileNav.hidden = isOpen;
      document.body.classList.toggle("menu-open", !isOpen);
    });
  }

  function renderAnnouncement() {
    const bar = document.querySelector("#announcement-bar");
    if (!bar) return;
    bar.innerHTML = `
      <span class="pulse-dot" aria-hidden="true"></span>
      <strong>June 2026 Audit Report:</strong>
      <span>Ghost Forests &amp; Corporate Carbon Offsets Scandal Deployed.</span>
      <a href="article.html?slug=investigation-greenwashing-credits">Read Audit</a>
    `;
  }

  function renderFooter() {
    const footer = document.querySelector("#site-footer");
    if (!footer) return;
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-about">
            <a class="footer-logo" href="index.html"><img src="assets/images/theclimatelenslogo2.png" alt="The Climate Lens"></a>
            <p>An independent, global investigative journalism initiative. We monitor ecological shifts, tell evidence-based stories, and break down complex atmospheric systems to make changing climate developments transparent, accessible, and actionable.</p>
            <div class="footer-live">Watching Earth Through Nature's Lens</div>
          </div>
          <div class="footer-col">
            <h3>Editorial Sections</h3>
            <ul>
              <li><a href="latest-stories.html">News &amp; Latest Stories</a></li>
              <li><a href="investigations.html">Long-Form Investigations</a></li>
              <li><a href="climate-explained.html">Climate Explained</a></li>
              <li><a href="videos.html">Reels &amp; Videos</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h3>Platform Info</h3>
            <ul>
              <li><a href="about.html">Our Mission</a></li>
              <li><a href="contact.html">Inquiries &amp; Tips</a></li>
              <li><a href="index.html">Home Feed</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h3>Tip Line &amp; Contacts</h3>
            <p>Secure Tip Line:</p>
            <a href="mailto:tips@climatelens.org">tips@climatelens.org</a>
            <p>Available 24/7 for researchers, scientists &amp; whistleblowers.</p>
          </div>
        </div>
        <div class="footer-bottom">
          <span>Copyright ${new Date().getFullYear()} The Climate Lens. Independent Journalism.</span>
          <button class="back-to-top" type="button">Back to Top</button>
        </div>
        <div class="footer-notice">Evidence-Based Climate Stories Delivered Without Compromise.</div>
      </div>
    `;
    footer.querySelector(".back-to-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function setupGlobalInteractions() {
    window.addEventListener("scroll", () => {
      document.querySelector("#site-header")?.classList.toggle("scrolled", window.scrollY > 8);
    }, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderAnnouncement();
    renderHeader();
    renderFooter();
    setupGlobalInteractions();
  });

  window.ClimateLensUI = {
    escapeHtml,
    formatDate,
    articleUrl,
    findAuthor,
    renderArticleCard,
    renderVideoCard,
    markdownToHtml,
    renderNewsletter,
    renderStatus,
    setupVideoCards,
    setupNewsletter
  };
})();
