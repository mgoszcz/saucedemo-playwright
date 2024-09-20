import {Locator, Page} from "@playwright/test";

const selectors = {
    menuContainer: 'div.bm-menu-wrap',
    closeButton: 'button:has-text("Close Menu")',
    menuItem: (id) => `a#${id}.bm-item`,
}

export class MenuPage {
    page: Page;
    menuContainer: Locator;
    closeButton: Locator;
    allItemsButton: Locator;
    aboutButton: Locator;
    logoutButton: Locator;
    resetAppStateButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuContainer = page.locator(selectors.menuContainer);
        this.closeButton = this.menuContainer.locator(selectors.closeButton);
        this.allItemsButton = this.menuContainer.locator(selectors.menuItem('inventory_sidebar_link'));
        this.aboutButton = this.menuContainer.locator(selectors.menuItem('about_sidebar_link'));
        this.logoutButton = this.menuContainer.locator(selectors.menuItem('logout_sidebar_link'));
        this.resetAppStateButton = this.menuContainer.locator(selectors.menuItem('reset_sidebar_link'));
    }
}