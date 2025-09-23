import { test } from "@playwright/test";

test("GET Request", async ({ request }) => {
  await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/train");
});

test("GET Request s Query parametrem", async ({ request }) => {
  await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/eshop", {
    params: { userId: 12 },
  });
});

test('"Request s hlavičkou', async ({ request }) => {
  await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train/header",
    {
      headers: {
        train: "Playwright testování",
      },
    }
  );
});

test("Request s body", async ({ request }) => {
  await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train/body",
    {
      data: {
        stringProperty: "test",
        numberProperty: 123,
        booleanProperty: true,
      },
    }
  );
});
