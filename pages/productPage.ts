import {Locator, Page} from "@playwright/test";
import {BasePage} from "./basePage";

const selectors = {
    backToProductsButton: 'button.inventory_details_back_button',
    detailsContainer: 'div.inventory_details_container',
    productLabel: 'div.inventory_details_name.large_size',
    image: 'img.inventory_details_img',
    productDescription: 'div.inventory_details_desc',
    productPrice: 'div.inventory_details_price',
    addToCartButton: 'button.btn_inventory',
}

export class ProductPage extends BasePage {
    backToProductsButton: Locator;
    detailsContainer: Locator;
    productLabel: Locator;
    image: Locator;
    productDescription: Locator;
    productPrice: Locator;
    addToCartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.backToProductsButton = page.locator(selectors.backToProductsButton);
        this.detailsContainer = page.locator(selectors.detailsContainer);
        this.productLabel = this.detailsContainer.locator(selectors.productLabel);
        this.image = this.detailsContainer.locator(selectors.image);
        this.productDescription = this.detailsContainer.locator(selectors.productDescription);
        this.productPrice = this.detailsContainer.locator(selectors.productPrice);
        this.addToCartButton = this.detailsContainer.locator(selectors.addToCartButton);
    }
}