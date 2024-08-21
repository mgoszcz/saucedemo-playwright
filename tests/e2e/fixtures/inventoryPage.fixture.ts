import {baseTestFixture as test} from "./baseTest.fixture";
import {InventoryPage} from "../../../pages/InventoryPage";
import {TopBarPage} from "../../../pages/topBarPage";
import {ShoppingCartPage} from "../../../pages/shoppingCartPage";
import {ProductPage} from "../../../pages/ProductPage";

export const inventoryPageFixture = test.extend<{
    inventoryPage: InventoryPage, topBarPage: TopBarPage, shoppingCartPage: ShoppingCartPage, productPage: ProductPage }>({
    inventoryPage: async ({page: Page, loginPage: LoginPage}, use) => {
        const inventoryPage = new InventoryPage(Page);
        await use(inventoryPage)
    },

    topBarPage: async ({page: Page}, use) => {
        const topBarPage = new TopBarPage(Page);
        await use(topBarPage)
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