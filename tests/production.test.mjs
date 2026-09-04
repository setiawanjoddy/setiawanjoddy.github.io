import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const output = (file) => readFile(new URL(`../dist/${file}`, import.meta.url), "utf8");

test("home publishes social and structured identity metadata", async () => {
  const home = await output("index.html");

  assert.match(home, /<meta property="og:image" content="https:\/\/avatars.githubusercontent.com\/u\/37212064\?v=4">/);
  assert.match(home, /<meta name="twitter:card" content="summary">/);
  assert.match(home, /"@type":"Person"/);
  assert.match(home, /"https:\/\/linkedin.com\/in\/setiawanjoddy"/);
});

test("static crawl and fallback files are generated", async () => {
  assert.match(await output("robots.txt"), /Sitemap: https:\/\/setiawanjoddy.github.io\/sitemap.xml/);
  assert.match(await output("sitemap.xml"), /<loc>https:\/\/setiawanjoddy.github.io\/projects\/joey\/<\/loc>/);
  assert.match(await output("404.html"), /href="\/">Return home<\/a>/);
});

test("deployment gates GitHub Pages on tests", async () => {
  const workflow = await readFile(
    new URL("../.github/workflows/deploy.yml", import.meta.url),
    "utf8",
  );

  assert.match(workflow, /npm test/);
  assert.match(workflow, /npm run test:e2e/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
});
