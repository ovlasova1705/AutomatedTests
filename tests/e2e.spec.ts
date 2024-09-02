import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { ConfirmationPage } from "../pages/ConfirmationPage";
import { HelperBase } from "../utils/helperBase";

test("end-to-end test for Swag Labs", async ({ page }) => {
  const helper = new HelperBase(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const confirmationPage = new ConfirmationPage(page);

  const { firstName, lastName, postalCode } =
    await helper.generateRandomUserData();

  await test.step("Step 1: Authorization on the website", async () => {
    await page.goto(process.env.baseURL!);
    await helper.performLogin(
      page,
      process.env.STANDARD_USER_USERNAME!,
      process.env.STANDARD_USER_PASSWORD!
    );
    expect(await productsPage.isLoaded()).toBeTruthy();
  });

  await test.step("Step 2: Adding a product to the cart", async () => {
    const addedProductName = await productsPage.addRandomProductToCart();
    console.log(`Added product: ${addedProductName}`);
    expect(await productsPage.getCartItemCount()).toBe(1);
  });

  await test.step("Step 3: Navigating to the cart ", async () => {
    await productsPage.goToCart();
    expect(await (await cartPage.getCartItems()).count()).toBe(1);
  });

  await test.step("Step 4: Placing the order", async () => {
    await cartPage.checkout();
    await checkoutPage.fillFormAndContinue(firstName, lastName, postalCode);
  });

  await test.step("Step 5: Confirming the order", async () => {
    await checkoutPage.finishOrder();
    expect(await confirmationPage.getConfirmationMessage()).toBe(
      "Thank you for your order!"
    );
  });

  await test.step('Step 6: Returning to the home page by clicking "Back Home"', async () => {
    await confirmationPage.clickBackHome();
    expect(await productsPage.isLoaded()).toBeTruthy();
  });

  await test.step("Step 7: Logging out", async () => {
    await productsPage.logout();
    expect(page.url()).toBe(process.env.baseURL!);
  });
});
