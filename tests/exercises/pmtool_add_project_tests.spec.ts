import { test, expect } from "@playwright/test";

// skratka pwt
test(
  "Cvičení - kontrola Okna přidávaní nového projektu",
  { tag: "@githubactions" },
  async ({ page }) => {
    // * testovací kroky
    await page.goto("https://tredgate.com/pmtool/");
    await page.locator("#username").fill("playwright_jaro24");
    await page.locator("#password").fill("Playwright!2024");
    await page.locator(".btn").click();
    await page.locator("#Projects").click();

    await expect(
      page.locator(".table-scrollable table"),
      "Tabulka Projects je viditelna"
    ).toBeVisible;

    await page.locator('[test_id="Add Project"]').click();
    await expect(
      page.locator('div[data-testid="Name"] input'),
      "Pole name je viditelne"
    ).toBeVisible;
    await expect(
      page.locator("button[type='submit']"),
      "Tlačítko uložiť ma text"
    ).toHaveText("Save");
  }
);
