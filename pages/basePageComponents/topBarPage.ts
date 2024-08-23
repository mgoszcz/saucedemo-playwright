import {Page, Locator} from '@playwright/test';
import {MenuPage} from "./menuPage";

const selectors = {
    root: 'div.primary_header',
    menuContainer: '#menu_button_container',
    menuButton: '#react-burger-menu-btn',
    menu: 'div.bm-menu-wrap',
    logo: 'div.app_logo',
    shoppingCart: 'a.shopping_cart_link',
}

export class TopBarPage {
    page: Page;
    root: Locator;
    menuButton: Locator;
    menu: MenuPage;
    logo: Locator;
    shoppingCartButton: Locator;
    shoppingCardBadge: Locator;


    constructor(page: Page) {
        this.page = page;
        this.root = this.page.locator(selectors.root);
        this.menuButton = this.root.locator(selectors.menuButton);
        this.menu = new MenuPage(this.page);
        this.logo = this.root.locator(selectors.logo);
        this.shoppingCartButton = this.root.locator(selectors.shoppingCart);
        this.shoppingCardBadge = this.shoppingCartButton.locator('span');
    }
}