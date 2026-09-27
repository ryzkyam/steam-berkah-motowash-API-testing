import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: process.env.SUPABASE_URL,
    extraHTTPHeaders: {
      "Content-Type": "application/json",
      apikey: process.env.SUPABASE_ANON_KEY || "",
      Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY || ""}`,
    },
  },

  // Tambahkan bagian projects di bawah ini
  projects: [
    {
      name: "chromium",
      use: {},
    },
  ],
});
