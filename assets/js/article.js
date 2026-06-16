document.addEventListener("DOMContentLoaded", async () => {
  const ui = window.ClimateLensUI;
  const slug = new URLSearchParams(window.location.search).get("slug");
  const target = document.querySelector("#article-detail");

  if (!slug) {
    ui.renderStatus(target, "empty", "Article Not Found");
    return;
  }

  try {
    const [article, authors] = await Promise.all([
      window.fetchArticleBySlug(slug),
      window.fetchAuthors()
    ]);
    if (!article) {
      ui.renderStatus(target, "empty", "Article Not Found");
      return;
    }
    const author = ui.findAuthor(authors, article);
    const related = await window.fetchRelatedArticles(article.categorySlug, article.slug);
    document.title = `${article.seoTitle || article.title} | The Climate Lens`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", article.seoDescription || article.excerpt);
    updateStructuredData(article, author);
    renderArticle(article, author, related, authors);
    setupReadingProgress();
  } catch (error) {
    ui.renderStatus(target, "error", "Unable to load this article.");
  }

  function renderArticle(article, author, related, authors) {
    target.innerHTML = `
      <div class="article-toolbar">
        <a class="article-back" href="latest-stories.html">Back to Articles</a>
      </div>
      <header class="article-head">
        <div class="meta-row">
          <span class="category-pill${article.type === "Investigation" ? " investigation" : ""}">${ui.escapeHtml(article.category)}</span>
          <span>${ui.escapeHtml(ui.formatDate(article.publishedAt))}</span>
          <span>${ui.escapeHtml(article.readingTime)}</span>
        </div>
        <h1>${ui.escapeHtml(article.title)}</h1>
        <p>"${ui.escapeHtml(article.excerpt)}"</p>
        <div class="article-author-row">
          <img src="${ui.escapeHtml(author.image)}" alt="${ui.escapeHtml(author.name)}" referrerpolicy="no-referrer">
          <div><strong>By ${ui.escapeHtml(author.name)}</strong><span>${ui.escapeHtml(author.role)}</span></div>
        </div>
      </header>
      <div class="article-cover">
        <img src="${ui.escapeHtml(article.featuredImage)}" alt="${ui.escapeHtml(article.title)}" referrerpolicy="no-referrer">
      </div>
      <div class="article-layout">
        <aside class="share-panel">
          <span>Share File</span>
          <button type="button" data-copy>Link</button>
          <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}" target="_blank" rel="noreferrer">X</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" rel="noreferrer">Fb</a>
          <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}" target="_blank" rel="noreferrer">In</a>
        </aside>
        <div class="article-body">
          ${ui.markdownToHtml(article.body)}
          <div class="author-credit-card">
            <h3>About The Reporter</h3>
            <span class="author-chip"><img src="${ui.escapeHtml(author.image)}" alt="${ui.escapeHtml(author.name)}"><span>${ui.escapeHtml(author.name)}<br>${ui.escapeHtml(author.bio)}</span></span>
          </div>
        </div>
        <aside class="metadata-card">
          <h3>Section Metadata</h3>
          <dl>
            <div><dt>Tags:</dt><dd>${ui.escapeHtml((article.tags || []).slice(0, 2).join(", "))}</dd></div>
            <div><dt>Standard Code:</dt><dd>CL-${ui.escapeHtml((article.id || article.slug).slice(0, 4).toUpperCase())}</dd></div>
            <div><dt>Platform Trust:</dt><dd>Verified PGP</dd></div>
          </dl>
        </aside>
      </div>
      <section class="related-section">
        <h2>Related Investigations</h2>
        <div class="article-grid">${related.map((item) => ui.renderArticleCard(item, authors)).join("")}</div>
      </section>
    `;
    target.querySelector("[data-copy]").addEventListener("click", () => navigator.clipboard.writeText(window.location.href));
  }

  function setupReadingProgress() {
    const bar = document.querySelector("#reading-progress span");
    window.addEventListener("scroll", () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : "0";
    }, { passive: true });
  }

  function updateStructuredData(article, author) {
    const existing = document.querySelector('script[data-article-schema]');
    if (existing) existing.remove();

    const schema = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      datePublished: article.publishedAt,
      dateModified: article.publishedAt,
      mainEntityOfPage: window.location.href,
      author: {
        "@type": "Person",
        name: author.name || "The Climate Lens"
      },
      publisher: {
        "@type": "Organization",
        name: "The Climate Lens",
        logo: {
          "@type": "ImageObject",
          url: "https://theclimatelens.vercel.app/assets/images/theclimatelenslogo2.png"
        }
      },
      image: article.featuredImage ? [article.featuredImage] : [],
      articleSection: article.category || "Climate News",
      keywords: (article.tags || []).join(", ")
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.articleSchema = "true";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
});
