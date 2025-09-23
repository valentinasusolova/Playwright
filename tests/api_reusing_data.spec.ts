import { test, expect } from "@playwright/test";
import { fakerCS_CZ as faker } from "@faker-js/faker";

test("Registrace a získaní dat - prenášení data medzi requesty", async ({
  request,
}) => {
  const username = faker.internet.username();
  const email = faker.internet.exampleEmail();

  const registerResponse = await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register",
    {
      data: {
        username: username,
        password: "123456",
        email: email,
      },
    }
  );

  const registerBody = await registerResponse.json();
  const userId = registerBody.userId;

  const userResponse = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop",
    {
      params: { userId: userId },
    }
  );
  const userBody = await userResponse.json();
  expect(userBody.username, "userBody.username má hodnotu").toBe(username);
  expect(userBody.email, "userBody.email má hodnotu").toBe(email);
});
