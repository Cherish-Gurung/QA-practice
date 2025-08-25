import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
   await page.goto('https://www.tealeaves.com/');
});
test('valid login', async({page})=>{


    await page.locator( '//input[@placeholder="First name"]').fill('Username');
    await page.getByPlaceholder('Password').fill("password");
    await page.getByRole('button', { name: 'Login' }).click();
    

});
test('invalid login', async({page})=>{
  

    await page.getByPlaceholder('Username').fill('invalidUsername');
    await page.getByPlaceholder('Password').fill("Password");
    await page.getByRole('button', { name: 'Login' }).click();

});

test('invalid username, valid password', async({page})=>{


    await page.getByRole('textbox', { name: 'Username' }).fill('invalidUsername');
    await page.getByPlaceholder('Password').fill("Password");
    await page.getByRole('button', { name: 'Login' }).click();

});
test('valid username, invalid password', async({page})=>{
   

    await page.getByRole('textbox', { name: 'Username' }).fill('invalidUsername');
    await page.getByPlaceholder('Password').fill("Password");
    await page.getByRole('button', { name: 'Login' }).click();

});
test('Blank fields', async({page})=>{
    

    await page.getByRole('textbox', { name: 'Username' }).fill("");
    await page.getByPlaceholder('Password').fill("");
    await page.getByRole('button', { name: 'Login' }).click();

});
test('invalid username, invalid password', async({page})=>{
    await page.getByRole('textbox', { name: 'Username' }).fill('invalidUsername');
    await page.getByPlaceholder('Password').fill('');
    await page.getByRole('button', { name: 'Login' }).click();

});
