import { test } from "@playwright/test";

test("Cvičení posílaní API", async ({ request }) => {
  await request.post("https://reqres.in/api/register", {
    data: {
      email: "eve.holt@reqres.in",
      password: "pistol",
    },
    headers: {
      "Accept-Encoding": "gzip, deflate, br",
      "x-api-key": "reqres-free-v1",
    },
  });
});
