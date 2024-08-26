import {Page} from "@playwright/test";
import {CartList} from "./shoppingCartPageComponents/cartList";
import {BasePage} from "./basePage";

const selectors = {
    root: 'div.cart_contents_container',

}

export class ShoppingCartPage extends BasePage {
    shoppingCartList: CartList;


    constructor(page: Page) {
        super(page);
        this.shoppingCartList = new CartList(this.page.locator(selectors.root));
    }
}