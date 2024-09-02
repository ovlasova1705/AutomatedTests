# 🚀 **Automated Testing Project with Playwright and TypeScript**

## 📋 **Overview**

The tests are written in **TypeScript** using **Playwright** for testing across different browsers.

## 🌟 **Features**

- **🔄 Automated Pipeline**:  
  I've set up a pipeline using **GitHub Actions**. The tests run automatically whenever there’s a new push or pull request to the main branches, ensuring that all changes are tested.

- **📊 Allure Report**:  
  The project includes **Allure Report** for generating detailed and easy-to-read test reports.

- **📲 Telegram Notifications**:  
  The project is connected to **Telegram** to send notifications about the test results. You’ll get updates on both successful and failed tests.

## 🛠️ **Technologies and tools**

<p  align="center">

<code><img width="5%" title="Playwright" src="media/logo/playwright.svg"></code>
<code><img width="5%" title="TypeScript" src="media/logo/ts.svg"></code>
<code><img width="5%" title="Node.js" src="media/logo/nodejs.svg"></code>
<code><img width="5%" title="Visual Studio Code" src="media/logo/vsc.svg"></code>
<code><img width="5%" title="GitHub" src="media/logo/github.svg"></code>
<code><img width="5%" title="GitHubActions" src="media/logo/githubActions.svg"></code>
<code><img width="5%" title="Allure" src="media/logo/allure.svg"></code>
<code><img width="5%" title="Telegram" src="media/logo/telegram.svg"></code>

</p>

## ⚙️ **Current Setup**

- **🧪 End-to-End Test for Swag Labs**:  
  The project now includes a comprehensive end-to-end test that covers the full user journey on the Swag Labs website. The test includes the following steps:

> 1. **🚪 Authorization**:  
>    The test begins by **logging into** the website using provided credentials.
>
> 2. **🛒 Adding a Product to the Cart**:  
>    A random product is selected and **added to the shopping cart**.
>
> 3. **🛍️ Navigating to the Cart**:  
>    The test verifies that the product has been successfully **added to the cart**.
>
> 4. **💳 Placing the Order**:  
>    The test proceeds with entering randomly generated user details (first name, last name, and postal code) and **placing the order**.
>
> 5. **✅ Confirming the Order**:  
>    The test checks for a **confirmation message** that the order was successful.
>
> 6. **🏠 Returning to the Home Page**:  
>    After the order is confirmed, the test navigates back to the home page by clicking **"Back Home"**.
>
> 7. **🚪 Logging Out**:  
>    Finally, the test **logs out** of the application.

- **🌱 Future Expansion**:  
  I plan to add more tests and features to this project over time, making it more comprehensive.
