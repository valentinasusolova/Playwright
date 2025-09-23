// first_tests.spec.ts
// tests/
import { test } from "@playwright/test";

// skratka pwt
test("Náš první test", async ({ page }) => {
  // * testovací kroky
  await page.goto("https://tredgate.com/pmtool/");
  await page.locator("#username").fill("playwright_jaro24");
  await page.locator("#password").fill("Playwright!2024");
  await page.locator(".btn").click();
});
