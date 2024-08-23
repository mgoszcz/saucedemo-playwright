import {Locator} from "@playwright/test";
import {CartItem} from "./cartItem";

const selectors = {
    cartList: 'div.cart_list',
}

export class CartList {
    root: Locator;
    cartList: Locator;

    constructor(root: Locator) {
        this.root = root;
        this.cartList = this.root.locator(selectors.cartList);
    }

    async getItems() {
        const items = await this.cartList.locator('div.cart_item').all();
        return items.map((item) => new CartItem(item));
    }

    async getItemByName(name: string) {
        const items = await this.getItems();
        return items.find(async (item) => await item.label.textContent() === name);
    }
}