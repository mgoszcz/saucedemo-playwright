import {BasePage} from "./basePage";
import {Locator, Page} from "@playwright/test";

const selectors = {
    checkoutCompleteContainer: 'div.checkout_complete_container',
    completeHeader: 'h2.complete-header',
    completeText: 'div.complete-text',
    completeImage: 'img.pony_express',
    backHomeButton: 'button#back-to-products',
}

export class CheckoutCompletePage extends BasePage {
    checkoutCompleteContainer: Locator;
    completeHeader: Locator;
    completeText: Locator;
    completeImage: Locator;
    backHomeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutCompleteContainer = page.locator(selectors.checkoutCompleteContainer);
        this.completeHeader = this.checkoutCompleteContainer.locator(selectors.completeHeader);
        this.completeText = this.checkoutCompleteContainer.locator(selectors.completeText);
        this.completeImage = this.checkoutCompleteContainer.locator(selectors.completeImage);
        this.backHomeButton = this.checkoutCompleteContainer.locator(selectors.backHomeButton);
    }
}