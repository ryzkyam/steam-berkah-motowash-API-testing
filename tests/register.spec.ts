import { expect, test } from "@playwright/test";

test("should register successfully", async ({ request }) => {
  const res = await request.post(
    "https://api.qaautomationlabs.com/v1/auth/register",
    {
      data: {
        name: "John Doe",
        email: "new.user@gmail.com",
        password: "Password123",
      },
    },
  );

  expect(res.status()).toBe(201);
  const body = await res.json();
  expect(body.data).toBeDefined();
});
