import { faker } from "@faker-js/faker";
import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

export class HelperBase {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad(page: Page) {
    await page.waitForLoadState("load");
  }

  async performLogin(page: Page, username: string, password: string) {
    const loginPage = new LoginPage(page);
    await loginPage.login(username, password);
  }

  async generateRandomUserData() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode(),
    };
  }
}
