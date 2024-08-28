import {BasePage} from "./basePage";
import {Locator, Page} from "@playwright/test";

const selectors = {
    root: 'div.checkout_info_container',
    firstName: 'input#first-name',
    lastName: 'input#last-name',
    postalCode: 'input#postal-code',
    continueButton: '.submit-button',
    cancelButton: '.cart_cancel_link',
    errorMessage: 'div.error-message-container h3',
    inputErrorIcon: (inputName) => `input[name=${inputName}] + svg.error_icon`,
}

export class CheckoutUserDataPage extends BasePage {
    root: Locator;
    firstNameInput: Locator;
    lastNameInput: Locator;
    postalCodeInput: Locator;
    continueButton: Locator;
    cancelButton: Locator;
    errorMessage: Locator;
    firstNameErrorIcon: Locator;
    lastNameErrorIcon: Locator;
    postalCodeErrorIcon: Locator;

    constructor(page: Page) {
        super(page);
        this.root = page.locator(selectors.root);
        this.firstNameInput = this.root.locator(selectors.firstName);
        this.lastNameInput = this.root.locator(selectors.lastName);
        this.postalCodeInput = this.root.locator(selectors.postalCode);
        this.continueButton = this.root.locator(selectors.continueButton);
        this.cancelButton = this.root.locator(selectors.cancelButton);
        this.errorMessage = this.root.locator(selectors.errorMessage);
        this.firstNameErrorIcon = this.root.locator(selectors.inputErrorIcon('firstName'));
        this.lastNameErrorIcon = this.root.locator(selectors.inputErrorIcon('lastName'));
        this.postalCodeErrorIcon = this.root.locator(selectors.inputErrorIcon('postalCode'));
    }

    async fillUserData(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

}