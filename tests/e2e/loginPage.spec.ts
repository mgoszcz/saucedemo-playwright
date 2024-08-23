import { expect } from '@playwright/test';
import {loginPageFixture as test} from "./fixtures/loginPage.fixture";

test.describe.parallel('Login Page', () => {
    test('should login with valid credentials', async ({ loginPage, inventoryPage }) => {
        await loginPage.loginUser('standard_user', 'secret_sauce');
        await expect(inventoryPage.inventoryContainer).toBeVisible()
    })

    test('should not login locked out user', async ({ loginPage }) => {
        await loginPage.loginUser('locked_out_user', 'secret_sauce');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.')
    })

    test('should not login invalid credentials', async ({ loginPage }) => {
        await loginPage.loginUser('invalid', 'invalid');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
    })

    test('should not login with empty credentials', async ({ loginPage }) => {
        await loginPage.loginUser('', '');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required')
    })

    test('Should not login without password', async ({ loginPage }) => {
        await loginPage.loginUser('standard_user', '');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required')
    })
})