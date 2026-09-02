import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = (route) =>
  readFile(new URL(`../dist/${route}/index.html`, import.meta.url), "utf8");

test("each primary route has a distinct page heading", async () => {
  const routes = {
    about: "The throughline is translation.",
    experience: "Products, research, and classrooms.",
    publications: "Research built for real-world messiness.",
    projects: "Products shaped by evidence.",
    contact: "Let’s work on something useful.",
  };

  for (const [route, heading] of Object.entries(routes)) {
    const html = await page(route);
    assert.match(html, new RegExp(`<h1[^>]*>${heading}<\\/h1>`));
    assert.match(html, new RegExp(`<link rel="canonical" href="https://setiawanjoddy.github.io/${route}/">`));
  }
});

test("projects links to three evidence-led case studies", async () => {
  const html = await page("projects");

  assert.match(html, /href="\/projects\/joey"/);
  assert.match(html, /href="\/projects\/lunox"/);
  assert.match(html, /href="\/projects\/n-linked-glycosylation"/);
});

test("Joey case study explains the challenge, role, and result", async () => {
  const html = await page("projects/joey");

  assert.match(html, /<h1[^>]*>Joey: Self-Care Buddy<\/h1>/);
  assert.match(html, /<h2[^>]*>The challenge<\/h2>/);
  assert.match(html, /<h2[^>]*>My role<\/h2>/);
  assert.match(html, /<h2[^>]*>What we built<\/h2>/);
});

test("publications presents verified research themes and work", async () => {
  const html = await page("publications");

  assert.match(html, /Easy Data Augmentation for Handling Imbalanced Data in Fake News Detection/);
  assert.match(html, /Comparative Analysis of CNN, LSTM, and CNN–LSTM for Indonesian Stock Prediction/);
  assert.match(html, /Machine learning · Deep learning · NLP · Bioinformatics/);
});

test("about connects Setiawan's product and research background", async () => {
  const html = await page("about");

  assert.match(html, /Master of Computer Science/);
  assert.match(html, /Summa Cum Laude/);
  assert.match(html, /Bachelor of Information Systems/);
  assert.match(html, /Apple Developer Academy/);
});

test("experience includes academic and product roles", async () => {
  const html = await page("experience");

  assert.match(html, /Internationalization &amp; Partnership Officer/);
  assert.match(html, /Assistant Professor/);
  assert.match(html, /Associate Product Manager/);
  assert.match(html, /RCTI\+/);
});

test("contact gives collaborators and recruiters direct next steps", async () => {
  const html = await page("contact");

  assert.match(html, /Product Manager and AI Product Manager opportunities/);
  assert.match(html, /href="https:\/\/linkedin.com\/in\/setiawanjoddy"/);
  assert.match(html, /href="https:\/\/github.com\/setiawanjoddy"/);
  assert.match(html, /href="https:\/\/scholar.google.com\/citations\?user=PbCs3nkAAAAJ/);
});
