import {Locator, Page} from "@playwright/test";
import {CartList} from "./shoppingCartPageComponents/cartList";
import {BasePage} from "./basePage";

const selectors = {
    root: 'div.cart_contents_container',
    quantityLabel: 'div.cart_quantity_label',
    descriptionLabel: 'div.cart_desc_label',
    continueShoppingButton: 'button#continue-shopping',
    checkoutButton: 'button#checkout',
}

export class ShoppingCartPage extends BasePage {
    shoppingCartList: CartList;
    root: Locator;
    quantityLabel: Locator;
    descriptionLabel: Locator;
    continueShoppingButton: Locator;
    checkoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.root = page.locator(selectors.root);
        this.quantityLabel = this.root.locator(selectors.quantityLabel);
        this.descriptionLabel = this.root.locator(selectors.descriptionLabel);
        this.shoppingCartList = new CartList(this.root);
        this.continueShoppingButton = this.root.locator(selectors.continueShoppingButton);
        this.checkoutButton = this.root.locator(selectors.checkoutButton);
    }
}