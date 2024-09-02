import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {
    this.page = page;
  }

  usernameField = this.page.locator("#user-name");
  passwordField = this.page.locator("#password");
  loginButton = this.page.locator("#login-button");

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
