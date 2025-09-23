import { test, expect } from "@playwright/test";
import { log } from "console";

test("Cvičení api ", async ({ request }) => {
  const response = await request.patch(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train"
  );

  const responseBody = await response.json();
  console.log(responseBody);

  expect(responseBody.id, "body.id je číslo").toBe(1);

  expect(typeof responseBody.timestamp, "body.timestamp je string").toBe(
    "string"
  );
});
