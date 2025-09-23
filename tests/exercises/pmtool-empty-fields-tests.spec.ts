import { test, expect } from "@playwright/test";

test("Cvičení - testy na nevyplněná pole", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool/");
  await page.locator(".btn").click();

  const usernameError = page.locator("#username-error");
  const passwordError = page.locator("#password-error");
  await expect(
    usernameError,
    "Error hláška u username je visible"
  ).toBeVisible();
  await expect(
    usernameError,
    "Error hláška u username obsahuje text"
  ).toHaveText("This field is required!");

  await expect(
    passwordError,
    "Error hláška u password je visible"
  ).toBeVisible();

  await expect(passwordError, "Error hláška u hesla obsahuje text").toHaveText(
    "This field is required!"
  );
});

test("Error hláška not visible - negative", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool/");
  await expect(page.locator("#username")).toBeVisible();
  await expect(
    page.locator("#username-error"),
    "Login chybová zpráva není přítommná"
  ).not.toBeVisible();
  await expect(
    page.locator("#password-error"),
    "Login chybová zpráva není přítommná"
  ).not.toBeVisible();
});
