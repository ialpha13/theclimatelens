document.addEventListener("DOMContentLoaded", async () => {
  const ui = window.ClimateLensUI;
  const state = { category: "All", query: "", view: "grid", articles: [], authors: [], categories: [] };

  try {
    ui.renderStatus("#stories-results", "loading", "Loading climate archives...");
    [state.articles, state.authors, state.categories] = await Promise.all([
      window.fetchLatestArticles(),
      window.fetchAuthors(),
      window.fetchCategories()
    ]);
    renderFilters();
    renderResults();
  } catch (error) {
    ui.renderStatus("#stories-results", "error", "Unable to load stories. Please try again later.");
  }

  document.querySelector("#story-search").addEventListener("input", (event) => {
    state.query = event.target.value.toLowerCase();
    renderResults();
  });
  document.querySelector("#grid-view").addEventListener("click", () => setView("grid"));
  document.querySelector("#list-view").addEventListener("click", () => setView("list"));

  function setView(view) {
    state.view = view;
    document.querySelector("#grid-view").classList.toggle("active", view === "grid");
    document.querySelector("#list-view").classList.toggle("active", view === "list");
    renderResults();
  }

  function renderFilters() {
    const cats = ["All", ...state.categories.map((category) => category.title)];
    document.querySelector("#category-filters-container").innerHTML = cats
      .map((cat) => `<button type="button" class="${cat === state.category ? "active" : ""}" data-category="${ui.escapeHtml(cat)}">${ui.escapeHtml(cat)}</button>`)
      .join("");
    document.querySelectorAll("[data-category]").forEach((button) => {
      button.addEventListener("click", () => {
        state.category = button.dataset.category;
        renderFilters();
        renderResults();
      });
    });
  }

  function renderResults() {
    const results = state.articles.filter((article) => {
      const matchesCategory = state.category === "All" || article.category === state.category;
      const searchText = `${article.title} ${article.excerpt} ${(article.tags || []).join(" ")}`.toLowerCase();
      return matchesCategory && searchText.includes(state.query);
    });
    const target = document.querySelector("#stories-results");
    target.classList.toggle("list-mode", state.view === "list");
    document.querySelector("#stories-status").textContent = `Showing ${results.length} climate ${results.length === 1 ? "archive" : "archives"} found`;
    if (!results.length) {
      ui.renderStatus(target, "empty", "No Records Found");
      return;
    }
    target.innerHTML = results.map((article) => ui.renderArticleCard(article, state.authors, state.view === "list" ? "list" : "grid")).join("");
  }
});
