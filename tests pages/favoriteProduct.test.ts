const { test } = require("@playwright/test");
import { Page } from "playwright";
import OpeningPage from "../pages/openingPage";
import FavoriteProductPage from "../pages/favoriteProductPage";
import { expect } from "playwright/test";

test("Favorite Product", async ({ page }: { page: Page }) => {
  const openingPage = new OpeningPage(page);
  const favoriteProductPage = new FavoriteProductPage(page);

  await openingPage.openPage("https://www.buzzsneakers.com/");
  await openingPage.performAgreementSteps();
  await openingPage.login("alemaljovi58@gmail.com", "Alem123");

  await page.getByRole("link", { name: "MUŠKARCI" }).hover();
  await page.getByRole("link", { name: "Nike Air Max", exact: true }).click();
  await page.locator(".img-wrapper > a").first().click();
  await favoriteProductPage.markProductAsFavorite();

  await favoriteProductPage.navigateToFavoriteProducts();
  await favoriteProductPage.removeProductFromFavorites();
  const expectedUrl = "https://www.buzzsneakers.ba/omiljeno/product";
  const currentUrl = page.url();
  expect(currentUrl).toBe(expectedUrl);
});