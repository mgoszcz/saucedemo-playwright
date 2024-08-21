import { Page, Locator } from '@playwright/test';
import {InventoryList} from "./InventoryList";

const selectors = {
    inventoryContainer: 'div.inventory_container',
    sortingDropdown: 'select.product_sort_container',
}

export class InventoryPage {
    page: Page;
    inventoryContainer: Locator;
    inventoryList: InventoryList;
    sortingDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryContainer = page.locator(selectors.inventoryContainer);
        this.inventoryList = new InventoryList(this.inventoryContainer);
        this.sortingDropdown = page.locator(selectors.sortingDropdown);
    }
}