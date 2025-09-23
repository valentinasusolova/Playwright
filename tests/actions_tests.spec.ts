// actions_tests.spec.ts
import { test } from "@playwright/test";
import path from "path";

test("pressSequentially - psaní znaků jeden za druhým", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await page.locator("#username").fill("Start");
  await page.locator("#username").fill("End"); // ? fill vždy nahrazuje již existující
  await page.locator("#username").pressSequentially("Kde toto bude?"); // ? pressSequentially nikdy nepřepisuje původní hodnotu, skončíme s textem: EndKde toto bude?
  await page.locator("#username").clear(); //vyčistí hodnotu pola
  await page
    .locator("#username")
    .pressSequentially("Dlouhý text", { delay: 500 }); //? spomalenie písania pomocou pressSequentially - 500 ms medzi jednotlivými údermi klávesnice
});

test(
  "check - zakliknutí radio a checkboxů",
  {
    tag: "@githubactions",
  },
  async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/registration.html");
    await page.locator("#gender").selectOption("female"); // ? Výběr z select prvku pomocí option value <option value="female">
    await page.locator("#gender").selectOption({ label: "Male" });
  }
);

test("check - zakliknutie radio a checkboxu", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/registration.html");

  // * Radio button (můžu zakliknout, nemůžu odkliknout)
  await page.locator("#contact-phone").check();

  // * Checkbox button (můžu zakliknout, můžu odkliknout)
  await page.locator("#interests-sports").check();
  await page.locator("#interests-travel").check();
  await page.locator("#interests-sports").uncheck(); // ? Odkliknutí checkbox
});

test("Date vyplnení pole s datumem", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/registration.html");
  await page.locator("#date-of-birth").fill("2000-12-30"); // ? Input type date musíme vždy vyplňovat ve formátu YYYY-MM-dd (1999-01-15) - jiný formát nebude fungovat
});

test("Upload souboru do formuláře", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/registration.html");

  // * Vytáhneme a uložíme cestu k souboru upload_file.txt
  const filePath = path.resolve(__dirname, "../assets/upload_file.txt");
  // ? Můžeme použít tzv. require, který nám pomůže najít správnou cestu k souboru - VS Code totiž ve funkci require napovídá obsah složek:
  // require("../assets")

  // ? Spouštíme čekání (odposlech) na událost prohlížeče: výběr souboru
  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.locator("#file-upload").click(); //  Kliknutí na tlačítko upload
  const filechooser = await fileChooserPromise; // Instrukce Playwrightu: čekej, než se provolá událost otevření upload okna. Následně identifikaci upload okna uložíme do proměnné pro následný upload souboru
  await filechooser.setFiles(filePath); //  Upload souboru, jehož cestu jsme identifikovali na začátku testu (path.resolve())

  //? čakáme 2sec. na odchytenie snapshotu - v reálu nie je odporúčané používať, lebo to spomaľuje teste
  await page.waitForTimeout(2000); // Čekání v ms, 1000ms = 1s
});

test("Ovládanie slideru - posuvníku", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/registration.html");
  await page.locator("#experience").fill("4");
  await page.locator("#experience").fill("9");
  await page.locator("#experience").fill("1");
});

test("Ovládání iFrame", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  // await page.locator("#name").fill("Píšeme do iframe"); // ! Nebude fungovat, prvek je v iframe

  const frame = page.frameLocator('[data-testid="test-automation-iframe"]');
  await frame.locator("#name").fill("Píšeme do iFrame");
});

test("hover - najetí myší na prvek", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  await page.locator("#hover-box").hover(); // ? Najede myší na prvek, v následných krocích můžeme s prvkem (například rozbalovací menu interagovat)
});
