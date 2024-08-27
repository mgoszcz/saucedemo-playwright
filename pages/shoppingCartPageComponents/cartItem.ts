import {Locator} from "@playwright/test";

const selectors = {
    root: 'div.cart_item',
    quantity: 'div.cart_quantity',
    label: 'div.inventory_item_name',
    description: 'div.inventory_item_desc',
    price: 'div.inventory_item_price',
    removeButton: 'button.cart_button',
}

export class CartItem {
    root: Locator;
    quantity: Locator;
    label: Locator;
    description: Locator;
    price: Locator;
    removeButton: Locator;

    constructor(root: Locator) {
        this.root = root;
        this.quantity = this.root.locator(selectors.quantity);
        this.label = this.root.locator(selectors.label);
        this.description = this.root.locator(selectors.description);
        this.price = this.root.locator(selectors.price);
        this.removeButton = this.root.locator(selectors.removeButton);
    }
}