import {BasePage} from "./basePage";
import {Locator, Page} from "@playwright/test";
import {CartList} from "./shoppingCartPageComponents/cartList";


const selectors = {
    summaryContainer: 'div.checkout_summary_container',
    summaryLabel: (dataTest: string) => `div.summary_info_label[data-test=${dataTest}]`,
    summaryValue: (dataTest: string) => `div.summary_value_label[data-test=${dataTest}]`,
    priceValue: (dataTest: string) => `div[data-test=${dataTest}]`,
    finishButton: 'button#finish',
    cancelButton: 'button#cancel',
}

export class CheckoutOverviewPage extends BasePage{
    summaryContainer: Locator;
    productsList: CartList;
    paymentInformationLabel: Locator;
    paymentInformationValue: Locator;
    shippingInformationLabel: Locator;
    shippingInformationValue: Locator;
    priceTotalLabel: Locator;
    itemTotal: Locator;
    tax: Locator;
    totalPrice: Locator;
    finishButton: Locator;
    cancelButton: Locator;

    constructor(page: Page) {
        super(page);
        this.summaryContainer = page.locator(selectors.summaryContainer);
        this.productsList = new CartList(this.summaryContainer);
        this.paymentInformationLabel = this.summaryContainer.locator(selectors.summaryLabel('payment-info-label'));
        this.paymentInformationValue = this.summaryContainer.locator(selectors.summaryValue('payment-info-value'));
        this.shippingInformationLabel = this.summaryContainer.locator(selectors.summaryLabel('shipping-info-label'));
        this.shippingInformationValue = this.summaryContainer.locator(selectors.summaryValue('shipping-info-value'));
        this.priceTotalLabel = this.summaryContainer.locator(selectors.summaryLabel('total-info-label'));
        this.itemTotal = this.summaryContainer.locator(selectors.priceValue('subtotal-label'));
        this.tax = this.summaryContainer.locator(selectors.priceValue('tax-label'));
        this.totalPrice = this.summaryContainer.locator(selectors.priceValue('total-label'));
        this.finishButton = this.summaryContainer.locator(selectors.finishButton);
        this.cancelButton = this.summaryContainer.locator(selectors.cancelButton);
    }

    async getItemTotalValue() {
        return await this.itemTotal.textContent().then((value) => value.replace('Item total: ', ''));
    }

    async getTaxValue() {
        return await this.tax.textContent().then((value) => value.replace('Tax: ', ''));
    }

    async getTotalPriceValue() {
        return await this.totalPrice.textContent().then((value) => value.replace('Total: ', ''));
    }
}