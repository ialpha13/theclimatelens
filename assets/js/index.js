document.addEventListener("DOMContentLoaded", async () => {
  const ui = window.ClimateLensUI;
  ui.renderStatus("#featured-story-slot", "loading", "Loading featured report...");

  try {
    const [articles, featured, videos, authors, categories] = await Promise.all([
      window.fetchLatestArticles(),
      window.fetchFeaturedArticles(),
      window.fetchFeaturedVideos(),
      window.fetchAuthors(),
      window.fetchCategories()
    ]);

    renderAtmosphericMonitor();

    const lead = featured[0] || articles[0];
    const featuredSlot = document.querySelector("#featured-story-slot");
    if (featuredSlot && lead) {
      const leadAuthor = ui.findAuthor(authors, lead) || {};
      featuredSlot.innerHTML = `
        <article class="featured-story">
          <a class="feature-image" href="${ui.articleUrl(lead)}">
            <img src="${ui.escapeHtml(lead.featuredImage)}" alt="${ui.escapeHtml(lead.title)}" referrerpolicy="no-referrer">
            <span class="feature-badge">Featured Report</span>
          </a>
          <div class="featured-copy">
            <div class="featured-topline">
              <span class="featured-eyebrow">Lead Investigation</span>
              <div class="meta-row">
                <span class="category-pill${lead.type === "Investigation" ? " investigation" : ""}">${ui.escapeHtml(lead.category)}</span>
                <span>${ui.escapeHtml(ui.formatDate(lead.publishedAt))}</span>
                <span>${ui.escapeHtml(lead.readingTime || "")}</span>
              </div>
            </div>
            <div class="featured-body">
              <a href="${ui.articleUrl(lead)}"><h3>${ui.escapeHtml(lead.title)}</h3></a>
              <p>${ui.escapeHtml(lead.excerpt)}</p>
            </div>
            <div class="feature-footer">
              <span class="author-chip">
                <img src="${ui.escapeHtml(leadAuthor.image || "")}" alt="${ui.escapeHtml(leadAuthor.name || "Climate Lens")}" referrerpolicy="no-referrer">
                <span><strong>${ui.escapeHtml(leadAuthor.name || "Climate Lens")}</strong><br>${ui.escapeHtml(leadAuthor.role || "Editorial Team")}</span>
              </span>
              <a class="btn btn-forest" href="${ui.articleUrl(lead)}">Read Investigation</a>
            </div>
          </div>
        </article>
      `;
    } else if (featuredSlot) {
      featuredSlot.innerHTML = `
        <div class="featured-story-empty">
          <h3>No featured report available right now.</h3>
          <p>Once a featured article is published in Sanity, it will appear here automatically.</p>
        </div>
      `;
    }

    document.querySelector("#explainer-stories").innerHTML = articles
      .filter((article) => article.type === "Climate Explained")
      .slice(0, 2)
      .map((article) => ui.renderArticleCard(article, authors))
      .join("");

    const leadSlug = lead?.slug;
    document.querySelector("#secondary-stories").innerHTML = articles
      .filter((article) => article.slug !== leadSlug && article.type !== "Climate Explained")
      .slice(0, 3)
      .map((article) => ui.renderArticleCard(article, authors))
      .join("");

    document.querySelector("#topic-pills").innerHTML = categories
      .slice(0, 6)
      .map((category) => `<span>${ui.escapeHtml(category.title)}</span>`)
      .join("");

    document.querySelector("#home-video-reels").innerHTML = videos
      .slice(0, 4)
      .map((video) => ui.renderVideoCard(video))
      .join("");

    ui.renderNewsletter("#home-newsletter");
    ui.setupNewsletter();
    ui.setupVideoCards(document);
  } catch (error) {
    ui.renderStatus("#featured-story-slot", "error", "Featured report could not load.");
  }
});

function renderAtmosphericMonitor() {
  const indicators = [
    {
      id: "co2",
      name: "Atmospheric CO2 Concentration",
      subtitle: "Mauna Loa Observatory Flask Samples",
      currentValue: "426.87 ppm",
      baselineValue: "280.00 ppm (Pre-Industrial)",
      changeRate: "+2.41 ppm / year",
      source: "NOAA / Scripps Oceanography (June 2026)",
      impact: ["Traps solar infrared energy inside the biosphere.", "Accelerates ocean acidification.", "Extends heatwave limits globally."]
    },
    {
      id: "temp",
      name: "Global Temperature Anomaly",
      subtitle: "Global Land-Ocean Temperature Index",
      currentValue: "+1.48 C",
      baselineValue: "0.0 C (1850-1900 Avg)",
      changeRate: "+0.18 C per decade",
      source: "NASA GISS / Copernicus Climate Service",
      impact: ["Melts continental glaciers.", "Triples extreme high-pressure blocks.", "Shifts agricultural limits."]
    },
    {
      id: "sealevel",
      name: "Global Mean Sea Level Change",
      subtitle: "Satellite Altimetry Record",
      currentValue: "+104.2 mm",
      baselineValue: "0.0 mm (1993 Altimetry Datum)",
      changeRate: "+4.6 mm / year",
      source: "NASA Sea Level Change Science Team",
      impact: ["Compromises coastal aquifers.", "Magnifies storm surge reach.", "Forces infrastructure retreats."]
    },
    {
      id: "oceanheat",
      name: "Ocean Heat Content Anomaly",
      subtitle: "0-2000m Thermal Storage",
      currentValue: "+284 ZJ",
      baselineValue: "0.0 ZJ (1955-2000 Baseline)",
      changeRate: "+9.5 ZJ / year",
      source: "NOAA National Centers for Environmental Info",
      impact: ["Stores most excess system heat.", "Triggers marine heatwaves.", "Expands ocean volume."]
    }
  ];

  const target = document.querySelector("#atmospheric-stress-dashboard");
  if (!target) return;
  let active = indicators[0];
  let mode = "current";

  function paint() {
    target.innerHTML = `
      <div class="atmospheric-dashboard">
        <div class="dashboard-header">
          <span class="hero-kicker">CL-Atmospheric-Monitor</span>
          <h2>Atmospheric Stress Ledger</h2>
          <p>An active ledger of direct physical planet metrics. Read baselines, click trend vectors, or view empirical impact profiles.</p>
        </div>
        <div class="dashboard-body">
          <div class="indicator-list">
            ${indicators.map((item) => `
              <button class="indicator-button ${item.id === active.id ? "active" : ""}" data-indicator="${item.id}">
                <span>${item.name.split(" ").slice(0, 3).join(" ")}<small>${item.subtitle}</small></span>
                <strong>${item.currentValue}</strong>
              </button>
            `).join("")}
          </div>
          <div class="dashboard-panel">
            <h3>${active.name}</h3>
            <div class="dashboard-tabs">
              ${["current", "history", "impact"].map((item) => `<button class="${item === mode ? "active" : ""}" data-mode="${item}">${item}</button>`).join("")}
            </div>
            <div class="dashboard-content">${renderPanel()}</div>
            <div class="meta-row">Primary Sensor System: <strong>${active.source}</strong></div>
          </div>
        </div>
      </div>
    `;
    target.querySelectorAll("[data-indicator]").forEach((button) => {
      button.addEventListener("click", () => {
        active = indicators.find((item) => item.id === button.dataset.indicator) || active;
        paint();
      });
    });
    target.querySelectorAll("[data-mode]").forEach((button) => {
      button.addEventListener("click", () => {
        mode = button.dataset.mode;
        paint();
      });
    });
  }

  function renderPanel() {
    if (mode === "impact") {
      return `<div class="metric-grid">${active.impact.map((note, index) => `<div class="metric-card"><span>Impact Vector 0${index + 1}</span><p>${note}</p></div>`).join("")}</div>`;
    }
    if (mode === "history") {
      return `<div class="metric-card"><span>Historical Trendline Analysis</span><strong>${active.currentValue}</strong><p>Timeline metadata remains attached to the original editorial dashboard style while the static site keeps the same interaction pattern.</p></div>`;
    }
    return `
      <div class="metric-grid">
        <div class="metric-card"><span>Active Carbon Baseline</span><strong>${active.currentValue}</strong></div>
        <div class="metric-card"><span>Pre-Industrial Benchmark</span><strong>${active.baselineValue}</strong></div>
        <div class="metric-card"><span>Vector Rate Anomaly</span><strong>${active.changeRate}</strong></div>
      </div>
    `;
  }

  paint();
}
