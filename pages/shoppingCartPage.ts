import {Page} from "@playwright/test";
import {CartList} from "./cartList";

const selectors = {
    root: 'div.cart_contents_container',

}

export class ShoppingCartPage {
    page: Page;
    shoppingCartList: CartList;


    constructor(page: Page) {
        this.page = page;
        this.shoppingCartList = new CartList(this.page.locator(selectors.root));
    }
}