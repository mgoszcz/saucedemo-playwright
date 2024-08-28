import {inventoryPageFixture as test} from "./inventoryPage.fixture";
import {CheckoutUserDataPage} from "../../../pages/checkoutUserDataPage";

export const shoppingCartPageFixture = test.extend<{checkoutUserDataPage: CheckoutUserDataPage}>({
    checkoutUserDataPage: async ({page}, use) => {
        const checkoutPage = new CheckoutUserDataPage(page);
        await use(checkoutPage)
    },
})