// using_api_on_frontend.spec.ts
import { fakerCS_CZ as faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";

test("Registrace uživatele a odchycení registračního requestu", async ({
  page,
}) => {
  const username = faker.internet.username();
  const email = faker.internet.exampleEmail();
  const password = "123456";

  await page.goto("https://tegb-frontend-88542200c6db.herokuapp.com/register");
  await page.locator("//input[@data-testid='username-input']").fill(username);
  await page.locator("//input[@data-testid='email-input']").fill(email);
  await page.locator("//input[@data-testid='password-input']").fill(password);

  // ? Zapínáme čekání na response (bez await - test bude pokračovat dál)
  const responsePromise = page.waitForResponse(
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/register"
  );
  // Klikneme na tlačítko registrace: frontend nám po kliknutí odešle API tegb/register
  await page.locator('[data-testid="submit-button"]').click();
  // Nyní počkáme na odchycení requestu a doručení response, výsledek requestu uložíme do proměnné
  const registerRequest = await responsePromise;

  // Testování request části
  const registerRequestBody = registerRequest.request().postDataJSON();
  expect(registerRequestBody.username, "request.body.username má hodnotu").toBe(
    username
  );
  expect(registerRequestBody.email, "request.body.email má hodnotu").toBe(
    email
  );

  //  Testování response části
  const registerResponseBody = await registerRequest.json();
  expect(registerRequest.status(), "Register status is 201").toBe(201);
  expect(
    registerResponseBody.username,
    "response.body.username má hodnotu"
  ).toBe(username);
  expect(registerResponseBody.email, "response.body.email má hodnotu").toBe(
    email
  );
});
