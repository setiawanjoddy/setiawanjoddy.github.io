import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const home = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");

test("home introduces Setiawan as an AI builder and product maker", () => {
  assert.match(home, /<title>Setiawan Joddy \| AI Builder &amp; Product Maker<\/title>/);
  assert.match(home, /<span class="row">I build<\/span>/);
  assert.match(home, /people use\.<\/span>/);
  assert.match(home, /href="\/contact"[^>]*>Start a project<\/a>/);
  assert.match(home, /class="sticker"/);
});

test("home links to every primary portfolio section", () => {
  assert.match(home, /aria-label="Primary navigation"/);
  assert.match(home, /href="\/about"[^>]*>About<\/a>/);
  assert.match(home, /href="\/experience"[^>]*>Gigs<\/a>/);
  assert.match(home, /href="\/publications"[^>]*>Lab<\/a>/);
  assert.match(home, /href="\/projects"[^>]*>Work<\/a>/);
  assert.match(home, /href="\/blog"[^>]*>Blog<\/a>/);
});

test("home backs the positioning with selected work", () => {
  assert.match(home, /<h2[^>]*>Three moves\. Zero fluff\.<\/h2>/);
  assert.match(home, /<h2[^>]*>Fresh from the lab<\/h2>/);
  assert.match(home, /href="\/projects\/joey"/);
  assert.match(home, /href="\/publications"[^>]*>Dig the archive<\/a>/);
});
