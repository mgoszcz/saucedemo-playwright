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
        const labels = await Promise.all(items.map(async (item) => await item.label.textContent()));
        let foundIndex = -1;
        labels.forEach((label, index) => {
            if (label === name) foundIndex = index;
        })
        if (foundIndex === -1) throw new Error(`Item with name ${name} not found`);
        return items[foundIndex];
    }
}