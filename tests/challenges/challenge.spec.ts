// first_tests.spec.ts
// tests/
import { test } from "@playwright/test";

// skratka pwt
test("Challenge", async ({ page }) => {
  // * testovací kroky
  await page.goto(
    "https://automationteststore.com/index.php?rt=account/create"
  );
  await page.locator("#AccountFrm_firstname").fill("Val");
  await page.locator("#AccountFrm_lastname").fill("Susolova");
  await page.locator("#AccountFrm_email").fill("val@mailinator.com");
  await page.locator("#AccountFrm_address_1").fill("ulica");
  await page.locator("#AccountFrm_city").fill("Praha");
});
