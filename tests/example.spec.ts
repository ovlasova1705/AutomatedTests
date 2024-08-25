import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await test.step("Navigate to Playwright website", async () => {
    await page.goto("https://playwright.dev/");
  });

  await test.step("Check page title", async () => {
    await expect(page).toHaveTitle(/Playwright/);
  });
});
