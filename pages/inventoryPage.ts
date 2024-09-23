import { Page, Locator } from '@playwright/test';
import {InventoryList} from "./inventoryPageComponents/inventoryList";
import {BasePage} from "./basePage";
import {urls} from "../const/urls";

const selectors = {
    inventoryContainer: 'div.inventory_container',
    sortingDropdown: 'select.product_sort_container',
}

export class InventoryPage extends BasePage{
    inventoryContainer: Locator;
    inventoryList: InventoryList;
    sortingDropdown: Locator;

    constructor(page: Page) {
        super(page);
        this.inventoryContainer = page.locator(selectors.inventoryContainer);
        this.inventoryList = new InventoryList(this.inventoryContainer);
        this.sortingDropdown = page.locator(selectors.sortingDropdown);
    }

    async open() {
        await this.page.goto(urls.inventoryPage);
    }

    async addProductToCart(productName: string) {
        const item = await this.inventoryList.getItemByName(productName);
        await item.addToCartButton.click();
    }
}