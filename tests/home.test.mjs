import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const home = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");

test("home introduces Setiawan as an AI researcher and product leader", () => {
  assert.match(home, /<title>Setiawan Joddy \| AI Researcher &amp; Product Leader<\/title>/);
  assert.match(home, /<h1[^>]*>I turn AI research into products people can use\.<\/h1>/);
  assert.match(home, /href="\/contact"[^>]*>Start a conversation<\/a>/);
});

test("home presents an accessible, optimized portrait of Setiawan", () => {
  const portrait = home.match(/<img[^>]*class="hero-portrait-image"[^>]*>/)?.[0];

  assert.ok(portrait);
  assert.match(portrait, /alt="Portrait of Setiawan Joddy"/);
  assert.match(portrait, /src="\/_astro\/profile-setiawanjoddy\.[^"]+\.webp"/);
});

test("home links to every primary portfolio section", () => {
  assert.match(home, /aria-label="Primary navigation"/);
  assert.match(home, /href="\/about"[^>]*>About<\/a>/);
  assert.match(home, /href="\/experience"[^>]*>Experience<\/a>/);
  assert.match(home, /href="\/publications"[^>]*>Publications<\/a>/);
  assert.match(home, /href="\/projects"[^>]*>Projects<\/a>/);
});

test("home backs the positioning with selected work", () => {
  assert.match(home, /<h2[^>]*>Three lenses\. One practice\.<\/h2>/);
  assert.match(home, /<h2[^>]*>Selected work<\/h2>/);
  assert.match(home, /href="\/projects\/joey"/);
  assert.match(home, /href="\/publications"[^>]*>Explore the research<\/a>/);
});
