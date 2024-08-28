import {BasePage} from "./basePage";
import {Locator, Page} from "@playwright/test";


const selectors = {
    summaryContainer: 'div.checkout_summary_container',
}

export class CheckoutOverviewPage extends BasePage{
    summaryContainer: Locator;


    constructor(page: Page) {
        super(page);
        this.summaryContainer = page.locator(selectors.summaryContainer);
    }
}