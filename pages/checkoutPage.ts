import {BasePage} from "./basePage";
import {Locator, Page} from "@playwright/test";

const selectors = {
    root: 'div.checkout_info_container',
    firstName: 'input#first-name',
    lastName: 'input#last-name',
    postalCode: 'input#postal-code',
}

export class CheckoutPage extends BasePage {
    root: Locator;
    firstNameInput: Locator;

    constructor(page: Page) {
        super(page);
        this.root = page.locator(selectors.root);
        this.firstNameInput = this.root.locator(selectors.firstName);
    }

}