// checkout.test.ts
const { test } = require("@playwright/test");
import { Page } from "playwright";
import OpeningPage from "../pages/openingPage";
import ItemAdditionPage from "../pages/itemAdditionPage";
import CheckOutPage from "../pages/CheckoutPage";
import { expect } from "playwright/test";

test("Check-out", async ({ page }: { page: Page }) => {
  const openingPage = new OpeningPage(page);
  const itemAdditionPage = new ItemAdditionPage(page);
  const checkoutPage = new CheckOutPage(page);

  await openingPage.openPage("https://www.buzzsneakers.com/");
  await openingPage.performAgreementSteps();

  await openingPage.login("alemaljovi58@gmail.com", "Alem123");

  await itemAdditionPage.hoverOnCategory("MUŠKARCI");
  await itemAdditionPage.clickOnItem("adidas Superstar");
  await itemAdditionPage.clickOnItemVariant(
    "div:nth-child(10) > .row > .item-data > .img-wrapper > a"
  );
  await itemAdditionPage.addItemToCart();

  await checkoutPage.proceedToCheckout();
  await checkoutPage.selectGiftCardOption();
  await checkoutPage.enterGiftCardInfo("4566666", "1234");
  const cardInfoLocator = page.locator(
    'input#cart_onepage_order_ticket.form-control[type="text"][inputmode="decimal"]'
  );
  await expect(cardInfoLocator).toHaveValue(/[0-9]/);
});