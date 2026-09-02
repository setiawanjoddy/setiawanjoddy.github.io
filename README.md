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
npm run check
npm run test:e2e
```

`npm run test:e2e` needs Chromium's system libraries. CI installs them automatically.

## Deployment

The workflow in `.github/workflows/deploy.yml` deploys `dist/` after all checks pass. In the GitHub repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** before merging to `main`.
