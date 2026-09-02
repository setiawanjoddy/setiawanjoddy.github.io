import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const home = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
const stylesheetPath = home.match(/<link rel="stylesheet" href="([^"]+)"/)?.[1];
const styles = stylesheetPath
  ? await readFile(new URL(`../dist${stylesheetPath}`, import.meta.url), "utf8")
  : home;

test("the shared layout provides keyboard and contact shortcuts", () => {
  assert.match(home, /class="skip-link" href="#main-content"/);
  assert.match(home, /href="\/contact"[^>]*class="nav-cta"/);
  assert.match(home, /<footer[^>]*>.*Setiawan Joddy.*<\/footer>/);
});

test("global styles protect focus, mobile layout, and reduced motion", () => {
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /prefers-reduced-motion:reduce/);
  assert.match(styles, /width<=48rem/);
});
