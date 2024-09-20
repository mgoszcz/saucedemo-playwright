import {allPagesFixture as test} from "./fixtures/allPagesFixture";
import {expect} from "@playwright/test";

test.describe.parallel('Menu Page', () => {
    test('All Items should navigate to inventory page', async ({inventoryPage, shoppingCartPage}) => {
        await inventoryPage.topBar.shoppingCartButton.click();
        await shoppingCartPage.topBar.menuButton.click();
        await shoppingCartPage.menu.allItemsButton.click();
        await expect(inventoryPage.inventoryContainer).toBeVisible();
    })

    test('Close menu button should close menu', async ({inventoryPage}) => {
        await inventoryPage.topBar.menuButton.click();
        await expect(inventoryPage.menu.menuContainer).toBeVisible();
        await inventoryPage.menu.closeButton.click();
        await expect(inventoryPage.menu.menuContainer).toBeHidden();
    })

    test('About should navigate to about page', async ({inventoryPage, page}) => {
        await inventoryPage.topBar.menuButton.click();
        await inventoryPage.menu.aboutButton.click();
        await expect(page).toHaveURL('https://saucelabs.com/');
    })

    test('Logout should navigate to login page', async ({inventoryPage, loginPage}) => {
        await inventoryPage.topBar.menuButton.click();
        await inventoryPage.menu.logoutButton.click();
        await expect(loginPage.userName).toBeVisible();
        await expect(loginPage.password).toBeVisible();
        await expect(loginPage.userName).toBeEmpty();
        await expect(loginPage.password).toBeEmpty();
    })

    test('Reset App State should reset app state', async ({inventoryPage}) => {
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.topBar.menuButton.click();
        await inventoryPage.menu.resetAppStateButton.click();
        await expect(inventoryPage.topBar.shoppingCardBadge).toBeHidden();
    });
});