# Vaibhav Sharma — Android & Platform Engineer

Personal engineering website and writing journal for **Vaibhav Sharma** (Lead Engineer at Samsung R&D Institute Bangalore · Previously Android Engineer at Probo).

## Structure & Editable Data
- **Profile, Experience, Skills, Case Studies & Now Data**: `src/lib/siteData.ts`
  - Update `emailPlaceholder`, `githubUrlPlaceholder`, `linkedinUrlPlaceholder`, `locationPlaceholder`, and employment dates.
  - Add personal reflections inside `[Editable placeholder: ...]` fields in `CASE_STUDIES`.
- **Writing & Proposed Topics (MDX)**: `src/content/articles/*.mdx`
  - Entries start with `status: "proposed"` so they are clearly displayed as unpublished outlines and excluded from `/rss.xml` and `/sitemap.xml`.
  - Flip `status: "published"` and update `date` when an article is ready to publish.

## Local Development

```bash
npm install
npm run dev
```

Runs on `http://localhost:3000`.

## Verification

```bash
npx --yes tsx --test src/lib/content.test.ts
npm run lint
npm run build
```

## Production Run

```bash
npm run build
NODE_ENV=production npm start
```
