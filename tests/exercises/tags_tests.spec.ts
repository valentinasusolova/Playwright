// tags_tests.spec.ts

import { test } from "@playwright/test";

test.describe(
  "Označkované (tagy) testy",
  {
    tag: "@mujTag",
  },
  () => {
    test("Otevření pmtool", async ({ page }) => {
      await page.goto("https://tredgate.com/pmtool");
    });

    test("Otevření webtrain", async ({ page }) => {
      await page.goto("https://tredgate.com/webtrain");
    });
  }
);

test("Označený test", { tag: "@testTag" }, async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
});
