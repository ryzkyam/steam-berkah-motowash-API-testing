import { expect, test } from "@playwright/test";

test.describe("Supabase Authentication API Test Suite", () => {
  const validEmail = process.env.TEST_USER_EMAIL!;
  const validPassword = process.env.TEST_USER_PASSWORD!;
  const expectedUserId = process.env.TEST_USER_ID!;

  test("TC-AUTH-001: Should login successfully with valid credentials", async ({
    request,
  }) => {
    const response = await request.post("/auth/v1/token?grant_type=password", {
      data: {
        email: validEmail,
        password: validPassword,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    // Assertion Token & Type
    expect(body).toHaveProperty("access_token");
    expect(body).toHaveProperty("refresh_token");
    expect(body.token_type).toBe("bearer");

    // Assertion User Object
    expect(body.user.email).toBe(validEmail);
    expect(body.user.role).toBe("authenticated");
    expect(body.user.id).toBe(expectedUserId);
  });

  test("TC-AUTH-002: Should fail login with incorrect password", async ({
    request,
  }) => {
    const response = await request.post("/auth/v1/token?grant_type=password", {
      data: {
        email: validEmail,
        password: "WrongPassword123!",
      },
    });

    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body).toHaveProperty("error_description");
    expect(body.error_description).toContain("Invalid login credentials");
  });
});
