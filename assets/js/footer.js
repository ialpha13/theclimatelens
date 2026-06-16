(function () {
  async function loadFooter() {
    const footerSlot = document.querySelector("#site-shell footer#site-footer");
    if (!footerSlot) return;

    const response = await fetch("assets/partials/footer.html");
    const html = await response.text();
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html.trim();
    footerSlot.replaceWith(wrapper.querySelector("#site-footer"));

    const footer = document.querySelector("#site-footer");
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
            <a href="mailto:zubairghilzai10@gmail.com">zubairghilzai10@gmail.com</a>
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

  document.addEventListener("DOMContentLoaded", loadFooter);
})();
