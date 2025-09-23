import { test, expect } from "@playwright/test";
import { log } from "console";

test("Kontrola stavu odpoveedi response", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train"
  );

  //otestujeme že sa vracia 200
  expect(response.status(), "Response status je 200").toBe(200);
});

test("Kontrola hlavičky v response", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/4"
  );
  const headers = response.headers(); // ? Vytažení všech hlaviček response
  console.log(headers);
  // ! Pozor, názvy hlaviček v UI mode nemusí souhlasit (velká/malá písmena)

  const contentType = headers["content-type"];
  expect(
    contentType,
    "Odpoved obsahuje správnu hodnotu hlavičky content-type"
  ).toBe("application/json; charset=utf-8");
  // Můžeme zkontrolovat i část hodnoty hlavičky

  expect(
    contentType,
    "Odpověď obsahuje správné kódování v content-type"
  ).toContain("charset=utf-8");
});

test("Kontrola response body", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/4"
  );

  const responseBody = await response.json();
  console.log(responseBody);

  // * Kontrola existence klíče v response body
  expect(
    responseBody.active,
    "Active property existuje v responseBody"
  ).toBeDefined();

  expect(responseBody).toHaveProperty("active"); // ? Oba dva způsoby assertu existence jsou stejné, používáme ten, který je nám více sympatický

  // * Kontrola datových typů v body
  expect(typeof responseBody.userId, "body.userId je číslo ").toBe("number");
  expect(typeof responseBody.email, "body.email je string").toBe("string");

  // * Kontrola dat
  expect(responseBody.email, "body.email má správnou hodnotu").toBe(
    "petr.fifka@tredgate.cz"
  );
});
