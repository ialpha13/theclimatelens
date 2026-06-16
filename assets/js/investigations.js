document.addEventListener("DOMContentLoaded", async () => {
  const ui = window.ClimateLensUI;
  try {
    const [articles, authors] = await Promise.all([
      window.fetchArticlesByType("Investigation"),
      window.fetchAuthors()
    ]);
    document.querySelector("#investigation-count").textContent = `${articles.length} items`;
    document.querySelector("#investigation-list").innerHTML = articles.map((article) => ui.renderArticleCard(article, authors, "list")).join("");
  } catch (error) {
    ui.renderStatus("#investigation-list", "error", "Unable to load investigations.");
  }
});
