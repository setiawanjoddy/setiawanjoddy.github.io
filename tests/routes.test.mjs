import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = (route) =>
  readFile(new URL(`../dist/${route}/index.html`, import.meta.url), "utf8");

test("each primary route has a distinct page heading", async () => {
  const routes = {
    about: "Tinkerer. Shipper. Loud.",
    experience: "Gigs &amp; joyrides.",
    publications: "Messy tests, real receipts.",
    projects: "Things I shipped.",
    contact: "Let’s make something loud.",
    blog: "Loud notes.",
  };

  for (const [route, heading] of Object.entries(routes)) {
    const html = await page(route);
    const text = html
      .match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1]
      .replace(/<[^>]+>/g, "");
    assert.equal(text, heading);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://setiawanjoddy.github.io/${route}/">`));
  }
});

test("blog lists posts and renders each post", async () => {
  const index = await page("blog");

  assert.match(index, /href="\/blog\/ship-loud-early"/);
  assert.match(index, /href="\/blog\/why-i-build-in-public"/);

  for (const slug of ["blog/ship-loud-early", "blog/why-i-build-in-public"]) {
    const html = await page(slug);
    assert.match(html, /<article[^>]*>/);
    assert.match(html, /<a[^>]*href="\/blog"[^>]*>Back to notes<\/a>/);
  }

  const post = await page("blog/ship-loud-early");
  assert.match(post, /<h1[^>]*>Ship loud, fix fast<\/h1>/);
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
  for (const theme of ["Machine learning", "Deep learning", "NLP", "Bioinformatics"]) {
    assert.match(html, new RegExp(`<li>${theme}<\\/li>`));
  }
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

  assert.match(html, /where builders are trusted/);
  assert.match(html, /href="https:\/\/linkedin.com\/in\/setiawanjoddy"/);
  assert.match(html, /href="https:\/\/github.com\/setiawanjoddy"/);
  assert.match(html, /href="https:\/\/scholar.google.com\/citations\?user=PbCs3nkAAAAJ/);
});
