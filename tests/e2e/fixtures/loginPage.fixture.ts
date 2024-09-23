import {test} from "@playwright/test";
import {InventoryPage} from "../../../pages/inventoryPage";
import {LoginPage} from "../../../pages/loginPage";

export const loginPageFixture = test.extend<{ loginPage: LoginPage; inventoryPage: InventoryPage }>({
    loginPage: async ({page: Page}, use) => {
        const loginPage = new LoginPage(Page);
        await loginPage.open();
        await use(loginPage)
    },

    inventoryPage: async ({page}, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage)
    },
})