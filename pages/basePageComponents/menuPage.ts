import {Locator, Page} from "@playwright/test";

const selectors = {
    menuContainer: 'div.bm-menu-wrap',
    closeButton: 'button:has-text("Close Menu")'
}

export class MenuPage {
    page: Page;
    menuContainer: Locator;
    closeButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.menuContainer = page.locator(selectors.menuContainer);
        this.closeButton = this.menuContainer.locator(selectors.closeButton);
    }
}