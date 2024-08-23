import {baseTestFixture as test} from "./baseTest.fixture";
import {InventoryPage} from "../../../pages/inventoryPage";
import {ShoppingCartPage} from "../../../pages/shoppingCartPage";
import {ProductPage} from "../../../pages/productPage";

export const inventoryPageFixture = test.extend<{
    inventoryPage: InventoryPage, shoppingCartPage: ShoppingCartPage, productPage: ProductPage }>({
    inventoryPage: async ({page: Page, loginPage: LoginPage}, use) => {
        const inventoryPage = new InventoryPage(Page);
        await use(inventoryPage)
    },

    shoppingCartPage: async ({page: Page}, use) => {
        const shoppingCartPage = new ShoppingCartPage(Page);
        await use(shoppingCartPage)
    },

    productPage: async ({page: Page}, use) => {
        const productPage = new ProductPage(Page);
        await use(productPage)
    }
})