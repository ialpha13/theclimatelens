document.addEventListener("DOMContentLoaded", async () => {
  const ui = window.ClimateLensUI;
  try {
    const videos = await window.fetchVideos();
    document.querySelector("#video-count").textContent = `${videos.length} reels`;
    document.querySelector("#videos-grid-container").innerHTML = videos.map((video) => ui.renderVideoCard(video)).join("");
    ui.setupVideoCards(document);
  } catch (error) {
    ui.renderStatus("#videos-grid-container", "error", "Unable to load videos.");
  }
});
