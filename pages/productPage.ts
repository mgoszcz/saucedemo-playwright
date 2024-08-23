import {Locator, Page} from "@playwright/test";
import {BasePage} from "./basePage";

const selectors = {
    backToProductsButton: 'button.inventory_details_back_button',
    detailsContainer: 'div.inventory_details_container',
    productLabel: 'div.inventory_details_name.large_size',
}

export class ProductPage extends BasePage {
    backToProductsButton: Locator;
    detailsContainer: Locator;
    productLabel: Locator;


    constructor(page: Page) {
        super(page);
        this.backToProductsButton = page.locator(selectors.backToProductsButton);
        this.detailsContainer = page.locator(selectors.detailsContainer);
        this.productLabel = this.detailsContainer.locator(selectors.productLabel);
    }
}