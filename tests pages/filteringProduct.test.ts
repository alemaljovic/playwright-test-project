const { test } = require("@playwright/test");
import { Page } from "playwright";
import OpeningPage from "../pages/openingPage";
import FilteringProductPage from "../pages/FilteringProductPage";
import { expect } from "playwright/test";

test("Filtering Product", async ({ page }: { page: Page }) => {
  const openingPage = new OpeningPage(page);
  const filteringProductPage = new FilteringProductPage(page);

  await openingPage.openPage("https://www.buzzsneakers.com/");
  await openingPage.performAgreementSteps();

  await filteringProductPage.filterProducts();

  const expectedUrl = "https://www.buzzsneakers.ba/dukserica";
  const currentUrl = page.url();
  expect(currentUrl).toBe(expectedUrl);
});