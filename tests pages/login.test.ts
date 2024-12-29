// login.test.ts
const { test, expect } = require("@playwright/test");
import { Page } from "playwright";
import OpeningPage from "../pages/openingPage";

test("Login", async ({ page }: { page: Page }) => {
  const openingPage = new OpeningPage(page);

  await openingPage.openPage("https://www.buzzsneakers.com/");
  await openingPage.performAgreementSteps();
  await openingPage.login("alemaljovi58@gmail.com", "Alem123");
  await page.waitForLoadState();
  const afterLoginUrl = page.url();
  const expectedUrl = "https://www.buzzsneakers.ba/";
  expect(afterLoginUrl).toBe(expectedUrl);
  await openingPage.logout();
});