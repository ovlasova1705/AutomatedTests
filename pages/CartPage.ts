import { Page } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async getCartItems() {
    return this.page.locator(".cart_item");
  }

  async checkout() {
    await this.page.locator("#checkout").click();
  }
}
