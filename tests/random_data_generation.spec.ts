// random_data_generation.spec.ts
// import { faker } from "@faker-js/faker";
import { fakerCS_CZ as faker } from "@faker-js/faker";

import { test } from "@playwright/test";

test("Vygenerování unikátních dat pomocí Faker.js", ({ page }) => {
  const generatedFirstName = faker.person.firstName();
  const generatedLastName = faker.person.lastName();
  const generatedEmail = faker.internet.exampleEmail({
    firstName: generatedFirstName,
    lastName: generatedLastName,
  });
  console.log(generatedFirstName);
  console.log(generatedLastName);
  console.log(generatedEmail);
});
