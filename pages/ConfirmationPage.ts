import { Page } from "@playwright/test";

export class ConfirmationPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async getConfirmationMessage() {
    return this.page.locator(".complete-header").textContent();
  }

  async clickBackHome() {
    await this.page.locator("#back-to-products").click();
  }
}
