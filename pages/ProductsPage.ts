import { Page } from "@playwright/test";

export class ProductsPage {
  constructor(private page: Page) {
    this.page = page;
  }

  productTitle = this.page.locator(".title");
  cartBadge = this.page.locator(".shopping_cart_badge");
  productItems = this.page.locator(".inventory_item");

  async isLoaded() {
    await this.page.waitForSelector(".title");
    return (await this.productTitle.textContent()) === "Products";
  }

  async addRandomProductToCart() {
    const productCount = await this.productItems.count();
    const randomIndex = Math.floor(Math.random() * productCount);
    const randomProduct = this.productItems.nth(randomIndex);
    await randomProduct.locator("text=Add to cart").click();
    return randomProduct.locator(".inventory_item_name").textContent();
  }

  async goToCart() {
    await this.page.locator(".shopping_cart_link").click();
  }

  async getCartItemCount() {
    const cartBadgeText = await this.cartBadge.textContent();
    return parseInt(cartBadgeText || "0", 10);
  }

  async logout() {
    await this.page.locator("#react-burger-menu-btn").click();
    await this.page.locator("#logout_sidebar_link").click();
  }
}
