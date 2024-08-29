import {allPagesFixture as test} from "./fixtures/allPagesFixture";
import {expect} from "@playwright/test";

test.describe.parallel('Checkout page - user data', () => {
    test.beforeEach(async ({inventoryPage, shoppingCartPage}) => {
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');
        await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');
        await inventoryPage.topBar.shoppingCartButton.click();
        await shoppingCartPage.checkoutButton.click();
    });

    test('should show error message when user data is not provided', async ({checkoutUserDataPage}) => {
        await checkoutUserDataPage.continueButton.click();
        await expect(checkoutUserDataPage.errorMessage).toBeVisible();
        await expect(checkoutUserDataPage.errorMessage).toHaveText('Error: First Name is required');
        await expect(checkoutUserDataPage.firstNameErrorIcon).toBeVisible();
        await expect(checkoutUserDataPage.lastNameErrorIcon).toBeVisible();
        await expect(checkoutUserDataPage.postalCodeErrorIcon).toBeVisible();
    });

    test('should show error message when last name is not provided', async ({checkoutUserDataPage}) => {
        await checkoutUserDataPage.firstNameInput.fill('John');
        await checkoutUserDataPage.continueButton.click();
        await expect(checkoutUserDataPage.errorMessage).toBeVisible();
        await expect(checkoutUserDataPage.errorMessage).toHaveText('Error: Last Name is required');
        await expect(checkoutUserDataPage.firstNameErrorIcon).toBeVisible();
        await expect(checkoutUserDataPage.lastNameErrorIcon).toBeVisible();
        await expect(checkoutUserDataPage.postalCodeErrorIcon).toBeVisible();
    });

    test('should show error message when postal code is not provided', async ({checkoutUserDataPage}) => {
        await checkoutUserDataPage.firstNameInput.fill('John');
        await checkoutUserDataPage.lastNameInput.fill('Doe');
        await checkoutUserDataPage.continueButton.click();
        await expect(checkoutUserDataPage.errorMessage).toBeVisible();
        await expect(checkoutUserDataPage.errorMessage).toHaveText('Error: Postal Code is required');
        await expect(checkoutUserDataPage.firstNameErrorIcon).toBeVisible();
        await expect(checkoutUserDataPage.lastNameErrorIcon).toBeVisible();
        await expect(checkoutUserDataPage.postalCodeErrorIcon).toBeVisible();
    });

    test('should navigate to checkout overview page when user data is provided', async ({checkoutUserDataPage, checkoutOverviewPage}) => {
        await checkoutUserDataPage.fillUserData('John', 'Doe', '12345');
        await checkoutUserDataPage.continueButton.click();
        await expect(checkoutOverviewPage.summaryContainer).toBeVisible();
    });

    test('Should navigate to shopping cart when cancel button is pressed', async ({checkoutUserDataPage, shoppingCartPage}) => {
        await checkoutUserDataPage.cancelButton.click();
        await expect(shoppingCartPage.root).toBeVisible();
    });
})