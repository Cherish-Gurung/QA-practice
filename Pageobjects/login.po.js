const { expect } = require("@playwright/test");
exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page
        this.usernameInput = '#email';
        this.passwordInput = '#password';
        this.loginButton = '//button[@id="submit"]';
        this.logOut = '//button[@id="logout"]';
        this.loginValidation = '//p[conrains(text()."Click on my contact to view the contact Details ")]'
        this.alertMessage = '//span[@id="error"]';
    }
    async login(username, password) {
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
    }

    async verifyValidLogin() {
        const LoginValidation = await this.page.locator(this.loginValidation);
        await this.page.waitForTimeout(2000);
        expect(this.logOut).toBeVisible;
        await expect(LoginValidation).toHaveText('Click on any contact to view')
    }
}