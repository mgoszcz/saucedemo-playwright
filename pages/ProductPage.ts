import {Locator, Page} from "@playwright/test";

const selectors = {
    backToProductsButton: 'button.inventory_details_back_button',
    detailsContainer: 'div.inventory_details_container',
    productLabel: 'div.inventory_details_name.large_size',
}

export class ProductPage {
    page: Page;
    backToProductsButton: Locator;
    detailsContainer: Locator;
    productLabel: Locator;


    constructor(page: Page) {
        this.page = page;
        this.backToProductsButton = page.locator(selectors.backToProductsButton);
        this.detailsContainer = page.locator(selectors.detailsContainer);
        this.productLabel = this.detailsContainer.locator(selectors.productLabel);
    }
}