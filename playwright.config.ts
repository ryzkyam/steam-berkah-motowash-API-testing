import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Tambahkan baris ini untuk mendeteksi isi variabel:
console.log("DEBUG URL:", process.env.SUPABASE_URL);
console.log("DEBUG KEY:", process.env.SUPABASE_ANON_KEY);

export default defineConfig({
  testDir: "./tests",
  reporter: "html", 
  use: {
    baseURL: process.env.SUPABASE_URL,
    extraHTTPHeaders: {
      "Content-Type": "application/json",
      apikey: process.env.SUPABASE_ANON_KEY || "",
    },
  },

  projects: [
    {
      name: "chromium",
      use: {},
    },
  ],
});
