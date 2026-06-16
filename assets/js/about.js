document.addEventListener("DOMContentLoaded", async () => {
  const ui = window.ClimateLensUI;
  try {
    const authors = await window.fetchAuthors();
    document.querySelector("#author-grid").innerHTML = authors.map((author) => `
      <article class="author-card">
        <img src="${ui.escapeHtml(author.image)}" alt="${ui.escapeHtml(author.name)}" referrerpolicy="no-referrer">
        <div>
          <h3>${ui.escapeHtml(author.name)}</h3>
          <span>${ui.escapeHtml(author.role)}</span>
          <p>${ui.escapeHtml(author.bio)}</p>
        </div>
      </article>
    `).join("");
  } catch (error) {
    ui.renderStatus("#author-grid", "error", "Unable to load authors.");
  }
});
