document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  const success = document.querySelector("#contact-success");
  const logs = document.querySelector("#local-tip-logs");

  renderLogs();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const entry = {
      ...data,
      date: new Date().toISOString()
    };
    const existing = JSON.parse(localStorage.getItem("climatelens_inquiries") || "[]");
    localStorage.setItem("climatelens_inquiries", JSON.stringify([entry, ...existing]));
    form.reset();
    success.hidden = false;
    renderLogs();
  });

  function renderLogs() {
    const entries = JSON.parse(localStorage.getItem("climatelens_inquiries") || "[]");
    logs.hidden = !entries.length;
    if (!entries.length) return;
    logs.innerHTML = `
      <div class="archive-bar"><span>Submitted Tip Logs (This Session)</span><button class="back-to-top" type="button" data-clear>Clear Local History</button></div>
      ${entries.map((entry) => `
        <div class="tip-entry">
          <div class="meta-row"><span class="category-pill">${entry.inquiryType}</span><span>${new Date(entry.date).toLocaleString()}</span></div>
          <p><strong>Sender:</strong> ${entry.name} (${entry.email})</p>
          <p><em>"${entry.message}"</em></p>
        </div>
      `).join("")}
    `;
    logs.querySelector("[data-clear]").addEventListener("click", () => {
      localStorage.removeItem("climatelens_inquiries");
      renderLogs();
    });
  }
});
