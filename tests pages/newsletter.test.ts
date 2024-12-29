// newsletter.test.ts
const { test } = require("@playwright/test");
import { Page } from "playwright";
import OpeningPage from "../pages/openingPage";
import NewsletterPage from "../pages/newsletterPage";

test("Newsletter", async ({ page }: { page: Page }) => {
  const openingPage = new OpeningPage(page);
  const newsletterPage = new NewsletterPage(page);

  await openingPage.openPage("https://www.buzzsneakers.com/");
  await openingPage.performAgreementSteps();

  await newsletterPage.openNewsletterPopup();

  await newsletterPage.fillNewsletterForm("aminaaajla@gmail.com");
  await newsletterPage.submitNewsletterForm();
});