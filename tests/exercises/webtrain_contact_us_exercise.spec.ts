import { test } from "@playwright/test";

// skratka pwt
test("Contact Us Cvičení", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/contact.html");
  await page.locator("#full-name").fill("Val Susolova");
  await page.locator("#email").fill("val@mailinator.com");
  await page.locator("#contact-date").fill("2025-09-22");
  await page.locator("#role").selectOption("student");
  await page.locator("#comments").fill("Komentár k zpatnej vazbe");
  await page.locator("#newsletter").check();

  await page.locator('[data-testid="button-submit"]').click();
});
