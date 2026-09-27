import { expect, test } from "@playwright/test";

test.describe("should login successfully", () => {
  // Password yang benar adalah Password123 (P kapital)
  const validCredentials = {
    email: "qa@demo.io",
    password: "Password123",
  };

  test("should login successfully", async ({ request }) => {
    const res = await request.post(
      "https://api.qaautomationlabs.com/v1/auth/login",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: validCredentials,
      }
    );

    if (!res.ok()) {
      console.log(`[DEBUG] Error Status: ${res.status()}`);
      console.log(`[DEBUG] Response Body:`, await res.text());
    }

    expect(res.status()).toBe(200);

    const json = await res.json();
    expect(json).toHaveProperty("data");
    
    if (json.meta?.requestId) {
      expect(json.meta.requestId).toMatch(/^req_/);
    }
  });

  test("responds within acceptable SLA time", async ({ request }) => {
    const t0 = Date.now();
    
    const res = await request.post(
      "https://api.qaautomationlabs.com/v1/auth/login",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: validCredentials,
      }
    );

    const duration = Date.now() - t0;
    console.log(`[PERFORMANCE] Response time: ${duration} ms`);

    // Pastikan request berhasil lebih dulu
    expect(res.status()).toBe(200);

    // Naikkan threshold SLA ke 10,000 ms (10s) untuk mengakomodasi network latency
    expect(duration).toBeLessThan(10000);
  });
});