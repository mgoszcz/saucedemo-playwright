import {inventoryPageFixture as test} from "./inventoryPage.fixture";
import {CheckoutPage} from "../../../pages/checkoutPage";

export const shoppingCartPageFixture = test.extend<{checkoutPage: CheckoutPage}>({
    checkoutPage: async ({page}, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage)
    },
})