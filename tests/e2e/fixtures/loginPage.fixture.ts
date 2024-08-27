import {baseTestFixture as test} from "./baseTest.fixture";
import {InventoryPage} from "../../../pages/inventoryPage";

export const loginPageFixture = test.extend<{ inventoryPage: InventoryPage }>({
    inventoryPage: async ({page}, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage)
    },
})