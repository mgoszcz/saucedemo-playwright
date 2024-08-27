import {baseTestFixture as test} from "./baseTest.fixture";
import {InventoryPage} from "../../../pages/inventoryPage";
import {ShoppingCartPage} from "../../../pages/shoppingCartPage";
import {ProductPage} from "../../../pages/productPage";

export const inventoryPageFixture = test.extend<{
    inventoryPage: InventoryPage, shoppingCartPage: ShoppingCartPage, productPage: ProductPage }>({
    inventoryPage: async ({page, loginPage}, use) => {
        await loginPage.loginUser('standard_user', 'secret_sauce')
        const inventoryPage = new InventoryPage(page);
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