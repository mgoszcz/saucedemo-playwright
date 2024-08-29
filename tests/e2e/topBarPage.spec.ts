import {allPagesFixture as test} from "./fixtures/allPagesFixture";
import {expect} from "@playwright/test";
import {products} from "../../data/products";
import {BasePage} from "../../pages/basePage";

const menuTest = async (pageObject: BasePage) => {
    await expect(pageObject.topBar.menuButton).toBeVisible();
    await pageObject.topBar.menuButton.click();
    await expect(pageObject.menu.menuContainer).toBeVisible();
    await pageObject.menu.closeButton.click();
}

test.describe.parallel('Top Bar', () => {
    test('Label is displayed on each page', async ({inventoryPage, shoppingCartPage, checkoutUserDataPage, checkoutOverviewPage, checkoutCompletePage}) => {
        await expect(inventoryPage.topBar.logo).toBeVisible();
        await expect(inventoryPage.topBar.logo).toHaveText('Swag Labs');
        await inventoryPage.addProductToCart(products.backpack.name);
        await inventoryPage.topBar.shoppingCartButton.click();
        await expect(shoppingCartPage.topBar.logo).toBeVisible();
        await expect(shoppingCartPage.topBar.logo).toHaveText('Swag Labs');
        await shoppingCartPage.checkoutButton.click();
        await expect(checkoutUserDataPage.topBar.logo).toBeVisible();
        await expect(checkoutUserDataPage.topBar.logo).toHaveText('Swag Labs');
        await checkoutUserDataPage.fillUserData('John', 'Doe', '12345');
        await checkoutUserDataPage.continueButton.click();
        await expect(checkoutOverviewPage.topBar.logo).toBeVisible();
        await expect(checkoutOverviewPage.topBar.logo).toHaveText('Swag Labs');
        await checkoutOverviewPage.finishButton.click();
        await expect(checkoutCompletePage.topBar.logo).toBeVisible();
        await expect(checkoutCompletePage.topBar.logo).toHaveText('Swag Labs');
    })

    test('Shopping cart badge is updated on each page', async ({inventoryPage, shoppingCartPage, checkoutUserDataPage, checkoutOverviewPage, checkoutCompletePage}) => {
        await expect(inventoryPage.topBar.shoppingCardBadge).toBeHidden();
        await inventoryPage.addProductToCart(products.backpack.name);
        await expect(inventoryPage.topBar.shoppingCardBadge).toHaveText('1');
        await inventoryPage.topBar.shoppingCartButton.click();
        await expect(shoppingCartPage.topBar.shoppingCardBadge).toHaveText('1');
        await shoppingCartPage.checkoutButton.click();
        await expect(checkoutUserDataPage.topBar.shoppingCardBadge).toHaveText('1');
        await checkoutUserDataPage.fillUserData('John', 'Doe', '12345');
        await checkoutUserDataPage.continueButton.click();
        await expect(checkoutOverviewPage.topBar.shoppingCardBadge).toHaveText('1');
        await checkoutOverviewPage.finishButton.click();
        await expect(checkoutCompletePage.topBar.shoppingCardBadge).toBeHidden();
    })

    test('User can access cart from each page', async ({inventoryPage, shoppingCartPage, checkoutUserDataPage, checkoutOverviewPage, checkoutCompletePage}) => {
        await inventoryPage.addProductToCart(products.backpack.name);
        await inventoryPage.topBar.shoppingCartButton.click();
        await expect(shoppingCartPage.root).toBeVisible();
        await shoppingCartPage.checkoutButton.click();
        await checkoutUserDataPage.topBar.shoppingCartButton.click();
        await expect(shoppingCartPage.root).toBeVisible();
        await shoppingCartPage.checkoutButton.click();
        await checkoutUserDataPage.fillUserData('John', 'Doe', '12345');
        await checkoutUserDataPage.continueButton.click();
        await checkoutOverviewPage.topBar.shoppingCartButton.click();
        await expect(shoppingCartPage.root).toBeVisible();
        await shoppingCartPage.checkoutButton.click();
        await checkoutUserDataPage.fillUserData('John', 'Doe', '12345');
        await checkoutUserDataPage.continueButton.click();
        await checkoutOverviewPage.finishButton.click();
        await checkoutCompletePage.topBar.shoppingCartButton.click();
        await expect(shoppingCartPage.root).toBeVisible();
    });

    test('Menu button is displayed on each page and user can open menu', async ({inventoryPage, shoppingCartPage, checkoutUserDataPage, checkoutOverviewPage, checkoutCompletePage}) => {
       await menuTest(inventoryPage);
        await inventoryPage.addProductToCart(products.backpack.name);
        await inventoryPage.topBar.shoppingCartButton.click();
        await menuTest(shoppingCartPage);
        await shoppingCartPage.checkoutButton.click();
        await menuTest(checkoutUserDataPage);
        await checkoutUserDataPage.fillUserData('John', 'Doe', '12345');
        await checkoutUserDataPage.continueButton.click();
        await menuTest(checkoutOverviewPage);
        await checkoutOverviewPage.finishButton.click();
        await menuTest(checkoutCompletePage);
    });
});