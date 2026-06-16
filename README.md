# The Climate Lens

Independent climate journalism frontend powered by HTML, CSS, JavaScript, React/Vite, Sanity CMS, and Vercel.

The original editorial design, spacing, typography, animation, hover states, responsive behavior, and component structure are preserved. Sanity only replaces the content source for articles, authors, categories, videos, featured stories, and reels.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env.local`.
3. Add your Sanity values:
   `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_SANITY_API_VERSION`, and `VITE_SANITY_USE_CDN`.
4. Run the app:
   `npm run dev`

If Sanity variables are missing or the CMS is unavailable, the site uses the bundled editorial fallback content so the original layout remains visible during setup.

## Sanity Content

Schemas are stored in `src/sanity/schemas`:

- `article`
- `author`
- `category`
- `videoReel`

The frontend queries Sanity from `src/sanity/client.ts` and `src/sanity/queries.ts`. Keep visual components focused on rendering so design preservation remains easy to audit.

## Vercel

Use the default Vercel Vite settings:

- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: the same `VITE_SANITY_*` values from `.env.example`
