# The Climate Lens

Static HTML, CSS, and JavaScript version of The Climate Lens. The existing editorial design is preserved while Sanity CMS becomes the content source for articles, news, explainers, authors, categories, featured stories, and videos/reels.

No PHP, React, Next.js, Laravel, WordPress, MySQL, or backend framework is required for the public site.

## Frontend Structure

- `index.html`
- `latest-stories.html`
- `article.html`
- `investigations.html`
- `climate-explained.html`
- `videos.html`
- `about.html`
- `contact.html`
- `assets/css/global.css`
- One page CSS file per page in `assets/css/`
- `assets/js/sanityClient.js`
- `assets/js/global.js`
- One page JS file per page in `assets/js/`
- `the-climate-lens-sanity/` for the separate Sanity Studio

## Run Locally

Because this is a static site, you can serve the folder with any static server.

Example:

`npx serve .`

Then open the local URL shown by the server.

## Connect Sanity

1. Create a Sanity project.
2. Open `assets/js/sanityClient.js`.
3. The repo is already configured for Sanity project ID `5ygxll5t`.
4. Keep `SANITY_DATASET` as `production` unless your dataset has another name.
5. In Sanity Manage, add CORS origins for your local URL and Vercel domain.

The frontend uses Sanity's public CDN/API for read-only published content. Do not put private write tokens in frontend JavaScript.

## Content Workflow

1. Log into Sanity Studio.
2. Create or edit an article, news story, blog, climate explained post, author, category, or video/reel.
3. Upload images or thumbnails in Sanity.
4. For videos, add an external video URL from YouTube, Vimeo, Cloudinary, Mux, Bunny.net, or another video platform.
5. Click Publish.
6. The Vercel-hosted website fetches the published content automatically.

## Contact Form

`contact.html` has a static contact form UI and local success message. Connect Formspree, Web3Forms, EmailJS, or a Vercel serverless function later for real email delivery.

## Deploy to Vercel

Use:

- Framework Preset: Other
- Build Command: empty
- Output Directory: `./`

The included `vercel.json` is configured for static hosting.

## SEO And Security

- `sitemap.xml` lists the public site pages for crawlers.
- `robots.txt` points search engines to the sitemap.
- `vercel.json` adds basic security headers.
- Keep real secret values out of GitHub. Use `.env.local` for local work and Vercel environment variables for deployments.
- Only `.env.example` is tracked here as a template.

## Sanity Studio

The Studio is in `the-climate-lens-sanity/`.

Setup:

`cd the-climate-lens-sanity`

`npm install`

`npm run dev`

Deploy Studio:

`npx sanity deploy`
