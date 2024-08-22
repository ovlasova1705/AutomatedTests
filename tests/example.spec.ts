import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";

test("has title", async ({ page }) => {
  await test.step("Navigate to Playwright website", async () => {
    await page.goto("https://playwright.dev/");
  });

  await test.step("Check page title", async () => {
    await expect(page).toHaveTitle(/Playwright/);
  });
});
