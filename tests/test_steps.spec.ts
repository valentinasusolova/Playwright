import { expect, test } from "@playwright/test";

test("test.step - kroky v tetech", async ({ page }) => {
  //pws
  await test.step("Otvorenie Pmtool", async () => {
    await page.goto("https://tredgate.com/pmtool/");
  });

  await test.step("Prihlasenie", async () => {
    await page.locator("#username").fill("playwright_jaro24");
    await page.locator("#password").fill("Playwright!2024");
    await page.locator(".btn").click();
  });

  await test.step("Kontrola dashboard", async () => {
    await expect(
      page.locator("#welcome-page-header"),
      "Dashboard vítací sprava je viditelná"
    ).toBeVisible;
  });
});
