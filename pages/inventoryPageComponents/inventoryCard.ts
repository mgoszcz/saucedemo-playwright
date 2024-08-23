import {Locator} from "@playwright/test";

const selectors = {
    label: 'div.inventory_item_name',
    description: 'div.inventory_item_desc',
    image: 'div.inventory_item_img img',
    price: 'div.inventory_item_price',
    addToCartButton: 'button.btn_inventory',
}

export class InventoryCard {
    container: Locator;
    label: Locator;
    image: Locator;
    description: Locator;
    price: Locator;
    addToCartButton: Locator;


    constructor(cardContainer: Locator) {
        this.container = cardContainer;
        this.label = this.container.locator(selectors.label);
        this.image = this.container.locator(selectors.image);
        this.description = this.container.locator(selectors.description);
        this.price = this.container.locator(selectors.price);
        this.addToCartButton = this.container.locator(selectors.addToCartButton);
    }
}