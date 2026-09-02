import { expect, test } from "@playwright/test";

test("introduces Setiawan as an AI researcher and product leader", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Setiawan Joddy | AI Researcher & Product Leader");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "I turn AI research into products people can use.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Start a conversation" })).toHaveAttribute(
    "href",
    "/contact",
  );
});

test("links to each primary portfolio section", async ({ page }) => {
  await page.goto("/");

  const navigation = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(navigation.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
  await expect(navigation.getByRole("link", { name: "Experience" })).toHaveAttribute(
    "href",
    "/experience",
  );
  await expect(navigation.getByRole("link", { name: "Publications" })).toHaveAttribute(
    "href",
    "/publications",
  );
  await expect(navigation.getByRole("link", { name: "Projects" })).toHaveAttribute(
    "href",
    "/projects",
  );
});
