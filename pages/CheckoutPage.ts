import { Page } from "@playwright/test";

export class CheckoutPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async fillFormAndContinue(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.page.locator("#first-name").fill(firstName);
    await this.page.locator("#last-name").fill(lastName);
    await this.page.locator("#postal-code").fill(postalCode);
    await this.page.locator("#continue").click();
  }

  async finishOrder() {
    await this.page.locator("#finish").click();
  }
}
