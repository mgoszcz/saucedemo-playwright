import {test} from "@playwright/test";
import {InventoryPage} from "../../../pages/InventoryPage";
import {LoginPage} from "../../../pages/LoginPage";

export const loginPageFixture = test.extend<{ loginPage: LoginPage, inventoryPage: InventoryPage }>({
    inventoryPage: async ({page: Page}, use) => {
        const inventoryPage = new InventoryPage(Page);
        await use(inventoryPage)
    },

    loginPage: async ({page: Page}, use) => {
        const loginPage = new LoginPage(Page);
        await loginPage.open();
        await use(loginPage)
    }
})