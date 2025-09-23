import { test, expect } from "@playwright/test";

test("Failing assert", async ({ page }) => {
  let username = "Petr";
  await page.goto("https://tredgate.com/pmtool");
  username = "Jana";
  await expect(page.locator("#not_existing")).toBeVisible();
});

test("Failing action", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await page.locator("#not_existing").click();
});

// ! Ukázat jak vypadají chybějící awaity
test("Padající akce", async ({ page }) => {
  page.goto("https://tredgate.com/pmtool");
  page.locator("#not_existing").click();
  await page.locator("#not_existing").click();
  page.locator("#not_existing").click();
  await page.locator("#not_existing").click();
  expect(page.locator("#not_existing")).toBeVisible();
});
