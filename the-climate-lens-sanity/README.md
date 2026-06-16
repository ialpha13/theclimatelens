# The Climate Lens Sanity Studio

This folder is the separate Sanity Studio for managing articles, investigations, explainers, authors, categories, and video/reel metadata.

## Setup

1. Create a Sanity account and project at `sanity.io`.
2. Copy your Sanity project ID.
3. Replace `YOUR_SANITY_PROJECT_ID` in `sanity.config.js` and `sanity.cli.js`.
4. Install dependencies:
   `npm install`
5. Start Studio locally:
   `npm run dev`

## Deploy Studio

Run:

`npx sanity deploy`

## Content Workflow

1. Create categories such as Climate News, Investigations, Climate Explained, Policy & Adaptation, and Biodiversity & Science.
2. Create authors with image, role, bio, and optional social links.
3. Create articles with title, slug, category, type, author, featured image, excerpt, body, tags, and SEO fields.
4. Create videos/reels with thumbnail and an external `videoUrl`.
5. Click Publish. Published content appears on the static Vercel site through the public Sanity CDN.

Do not upload large video files to Vercel. Use YouTube, Vimeo, Cloudinary, Mux, Bunny.net, or another external video host.

## CORS

In Sanity Manage, add these CORS origins:

- `http://localhost:3000`
- Your Vercel production domain
- Any Vercel preview domain you need
