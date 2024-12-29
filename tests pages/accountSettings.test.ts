// accountSettings.test.ts
const { test, expect } = require("@playwright/test");
import { Page } from "playwright";
import OpeningPage from "../pages/openingPage";
import AccountSettingsPage from "../pages/accountSettingsPage";

test("Account-settings", async ({ page }: { page: Page }) => {
  const openingPage = new OpeningPage(page);
  const accountSettingsPage = new AccountSettingsPage(page);

  await openingPage.openPage("https://www.buzzsneakers.com/");
  await openingPage.performAgreementSteps();
  await openingPage.login("alemaljovi58@gmail.com", "Alem123");

  await accountSettingsPage.navigateToProfile();
  await accountSettingsPage.navigateToProfileEdit();

  await accountSettingsPage.updateProfileAddress("Kolonijska", "69");

  await page.waitForSelector("div.alert-success");
  const successMessageHandles = await page.locator("div.alert-success").all();

  let successMessage;
  for (const handle of successMessageHandles) {
    const isVisible = await handle.isVisible();
    if (isVisible) {
      successMessage = await handle.innerText();
      break;
    }
  }

  expect(successMessage).toContain("Uspješno ste izmijenili svoje");
});