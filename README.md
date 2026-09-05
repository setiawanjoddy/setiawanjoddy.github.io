# Setiawan Joddy Portfolio

Astro-powered personal portfolio for Setiawan Joddy.

## Development

```sh
npm install
npm run dev
```

## Verification

```sh
npm test
npm run test:e2e
```

`npm run test:e2e` needs Chromium's system libraries. CI installs them automatically.

## Writing a blog post

Add a Markdown file to `src/content/blog/` with frontmatter:

```md
---
title: "Your loud title"
description: "One-line hook."
date: 2026-09-05
---

Your words here.
```

Then add its URL to `public/sitemap.xml`. No CMS, no backend — the repo is the database.

## Deployment

The workflow in `.github/workflows/deploy.yml` deploys `dist/` after all checks pass. In the GitHub repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** before merging to `main`.
