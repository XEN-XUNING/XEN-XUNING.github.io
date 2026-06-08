const { test } = require("@playwright/test");

test("screens", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
  await page.locator(".hero").screenshot({ path: "preview/hero.png" });
  await page.locator("#projects").screenshot({ path: "preview/projects.png" });
});
