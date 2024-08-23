import {Locator} from "@playwright/test";
import {InventoryCard} from "./inventoryCard";

const selectors = {
    list: 'div.inventory_list'
}

export class InventoryList {
    root: Locator;
    list: Locator;

    constructor(root: Locator) {
        this.root = root;
        this.list = this.root.locator(selectors.list);
    }

    async getItems() {
        const items = await this.list.locator('div.inventory_item').all();
        return items.map((item) => new InventoryCard(item));
    }

    async getItemByName(name: string) {
        const items = await this.getItems();
        return items.find(async (item) => await item.label.textContent() === name);
    }
}