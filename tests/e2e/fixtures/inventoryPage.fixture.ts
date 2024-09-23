import {test} from "@playwright/test";
import {InventoryPage} from "../../../pages/inventoryPage";
import {ShoppingCartPage} from "../../../pages/shoppingCartPage";
import {ProductPage} from "../../../pages/productPage";
import {LoginPage} from "../../../pages/loginPage";

export const inventoryPageFixture = test.extend<{
    loginPage: LoginPage; inventoryPage: InventoryPage, shoppingCartPage: ShoppingCartPage, productPage: ProductPage }>({
    storageState: async ({}, use) => {
        await use('.auth/state.json');
    },

    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    inventoryPage: async ({page}, use) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.open();
        await use(inventoryPage)
    },

    shoppingCartPage: async ({page}, use) => {
        const shoppingCartPage = new ShoppingCartPage(page);
        await use(shoppingCartPage)
    },

    productPage: async ({page}, use) => {
        const productPage = new ProductPage(page);
        await use(productPage)
    }
})