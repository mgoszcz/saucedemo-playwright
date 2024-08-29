import {CheckoutOverviewPage} from "../../../pages/checkoutOverviewPage";
import {CheckoutCompletePage} from "../../../pages/checkoutCompletePage";
import {shoppingCartPageFixture} from "./shoppingCartPage.fixture";


export const allPagesFixture = shoppingCartPageFixture.extend<{checkoutOverviewPage: CheckoutOverviewPage, checkoutCompletePage: CheckoutCompletePage}>({
    checkoutOverviewPage: async ({page}, use) => {
        const checkoutPage = new CheckoutOverviewPage(page);
        await use(checkoutPage);
    },

    checkoutCompletePage: async ({page}, use) => {
        const checkoutPage = new CheckoutCompletePage(page);
        await use(checkoutPage);
    }
})