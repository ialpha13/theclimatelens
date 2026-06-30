(function () {
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
    if (value.includes("news")) return " news";
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
          ${article.type === "News" ? '<span class="feature-badge">News</span>' : ""}
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
            <span class="category-pill news">${escapeHtml(video.category)}</span>
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

  function setupGlobalInteractions() {}

  document.addEventListener("DOMContentLoaded", () => {
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
    renderStatus,
    setupVideoCards
  };
})();
