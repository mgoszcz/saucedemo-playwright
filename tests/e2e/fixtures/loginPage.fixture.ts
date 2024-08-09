import { test, Page } from '@playwright/test';
import {LoginPage} from "../../../pages/LoginPage";
import {InventoryPage} from "../../../pages/InventoryPage";

export const loginPageFixture = test.extend<{ loginPage: LoginPage, inventoryPage: InventoryPage }>({
    loginPage: async ({page: Page}, use) => {
        const loginPage = new LoginPage(Page);
        await loginPage.open()
        await use(loginPage)
    },

    inventoryPage: async ({page: Page}, use) => {
        const inventoryPage = new InventoryPage(Page);
        await use(inventoryPage)
    }
})