import { test } from '@playwright/test';
import { LoginPage } from '../Pageobjects/login.po';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
})

test.describe('Valid login tests', () => {
    test('Login using valid username and password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login("yumeeyumee9@gmail.com", "yumeeyumee9");
        await login.verifyValidLogin();
    });
})

test.describe('Invalid login',() =>{
    test('Login using invalid username and password',async({page})=>{
        const login=new LoginPage(page);
        await login.login("yumeeyumee9@gmail.com", "yumeeyumi9");
        await login.verifyValidLogin();
    });
})