// itemAddition.test.ts
const { test } = require("@playwright/test");
import { Page } from "playwright";
import OpeningPage from "../pages/openingPage";
import ItemAdditionPage from "../pages/itemAdditionPage";
import { expect } from "playwright/test";

test("Adding-item", async ({ page }: { page: Page }) => {
  const openingPage = new OpeningPage(page);
  const itemAdditionPage = new ItemAdditionPage(page);

  await openingPage.openPage("https://www.buzzsneakers.com/");
  await openingPage.performAgreementSteps();
  await openingPage.login("alemaljovi58@gmail.com", "Alem123");

  await itemAdditionPage.hoverOnCategory("MUŠKARCI");
  await itemAdditionPage.clickOnItem("adidas Superstar");
  await itemAdditionPage.clickOnItemVariant(
    "div:nth-child(10) > .row > .item-data > .img-wrapper > a"
  );
  await itemAdditionPage.addItemToCart();

  const expectedUrl =
    "https://www.buzzsneakers.ba/patike/277013-adidas-patike-superstar";
  const currentUrl = page.url();
  expect(currentUrl).toBe(expectedUrl);
});