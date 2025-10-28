import { defineConfig, devices } from "@playwright/test";

import dotenv from "dotenv";
import path from "path";

// load .env file
dotenv.config({ path: path.resolve(__dirname, ".env") });

// ambil BASE_URL dari environment
const baseUrl = process.env.BASE_URL;

// kalau tiada BASE_URL, terus throw error
if (!baseUrl) {
  throw new Error(
    "BASE_URL is not defined. Please set it in environment variables."
  );
}

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html"], ["junit", { outputFile: "results.xml" }]],

  use: {
    baseURL: baseUrl, // wajib ada
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // kalau nak 1 browser je, boleh comment bawah ni
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  // kalau ada server nak start sebelum test
  // webServer: {
  //   command: 'npm run start',
  //   url: baseUrl,
  //   reuseExistingServer: !process.env.CI,
  // },
});
