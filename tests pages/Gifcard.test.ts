const { test } = require("@playwright/test");
import { expect } from "playwright/test";
import OpeningPage from "../pages/openingPage";

test("Gift Card", async ({
  page,
}: {
  page: import("@playwright/test").Page;
}) => {
  const openingPage = new OpeningPage(page);
  await openingPage.openPage("https://www.buzzsneakers.com/");
  await openingPage.performAgreementSteps();

  const buzzCrewPage = openingPage.buzzCrewPage();

  await page.getByRole("link", { name: "BUZZ CREW", exact: true }).click();

  await buzzCrewPage.navigateToNews();

  await buzzCrewPage.navigateToBuzzGiftCard();
  const finalUrl = page.url();
  const expectedUrl =
    "https://www.buzzsneakers.ba/magazin/novosti/9215-bonus-uz-buzz-gift-card-idealan-poklon-za-novogodisnje-praznike";
  expect(finalUrl).toBe(expectedUrl);
});