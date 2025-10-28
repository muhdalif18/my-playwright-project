import { test, expect } from "@playwright/test";

test("homepage has title", async ({ page }) => {
  // Gunakan BASE_URL dari environment
  if (!process.env.BASE_URL) {
    throw new Error("BASE_URL is not defined");
  }
  await page.goto(process.env.BASE_URL);

  // Contoh: verify title page
  await expect(
    page.getByText("Welcome to AL AiN IT Consultants", { exact: true })
  ).toBeVisible();
});
