import { expect, test } from "@playwright/test";

test("skip link becomes visible and moves focus to main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await skipLink.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

for (const route of [
  "/",
  "/about",
  "/experience",
  "/publications",
  "/projects",
  "/projects/joey",
  "/blog",
  "/blog/ship-loud-early",
  "/contact",
]) {
  test(`${route} does not overflow a small mobile viewport`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto(route);

    const widths = await page.evaluate(() => ({
      document: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
    }));
    expect(widths.document).toBe(widths.viewport);
  });
}
