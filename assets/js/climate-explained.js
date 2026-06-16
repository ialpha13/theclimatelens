document.addEventListener("DOMContentLoaded", async () => {
  const ui = window.ClimateLensUI;
  try {
    const [articles, authors] = await Promise.all([
      window.fetchArticlesByType("Climate Explained"),
      window.fetchAuthors()
    ]);
    document.querySelector("#explainer-list").innerHTML = articles.map((article) => ui.renderArticleCard(article, authors)).join("");
  } catch (error) {
    ui.renderStatus("#explainer-list", "error", "Unable to load explainers.");
  }
});
