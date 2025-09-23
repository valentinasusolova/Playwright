// test_structures.spec.ts
import { expect, test } from "@playwright/test";

test.describe("Testovací sada: Pmtool login testy", () => {
  test.beforeAll(async () => {
    console.log("Běžím před prvním testem");
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("https://tredgate.com/pmtool/");
    console.log("Běžím před každým testem");
  });

  test.afterEach(async ({ page }) => {
    console.log("Běžím po každém testu");
  });

  test.afterAll(async () => {
    console.log("Běžím po posledním testu");
  });

  test("Úspěšné přihlášení", async ({ page }) => {
    await page.locator("#username").fill("playwright_jaro24");
    await page.locator("#password").fill("Playwright!2024");
    await page.locator(".btn").click();
    await expect(
      page.locator("#welcome-page-header"),
      "Dashboard vítací zpráva je viditelná"
    ).toBeVisible();
  });

  test("Nevalidní přihlášní", async ({ page }) => {
    await page.locator("#username").fill("NOT_EXISTING");
    await page.locator("#password").fill("NOT_EXISTING");
    await page.locator(".btn").click();
    await expect(
      page.locator(".alert"),
      "Zpráva o neúspěšném přihlášení je viditelná"
    ).toBeVisible();
  });

  test.skip("Přeskočený test", async ({ page }) => {});

  //  Pokud chci v reportu vidět anotaci issue, pak musím test skipnout až v krocích
  test(
    "Přeskočený test s anotací issue",
    {
      annotation: [
        {
          // anotace nám umožňuje označit test například chybou pro lepší orientaci proč je test přeskočený
          type: "issue",
          description: "https://github.com/microsoft/playwright/issues/23180",
        },
      ],
    },
    async ({ page }) => {
      test.skip();
    }
  );
});
