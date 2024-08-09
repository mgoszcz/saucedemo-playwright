import { Page, Locator } from '@playwright/test';
import {InventoryList} from "./InventoryList";

const selectors = {
    inventoryContainer: 'div.inventory_container',
}

export class InventoryPage {
    page: Page;
    inventoryContainer: Locator;
    inventoryList: InventoryList;

    constructor(page: Page) {
        this.page = page;
        this.inventoryContainer = page.locator(selectors.inventoryContainer);
        this.inventoryList = new InventoryList(this.inventoryContainer);
    }
}