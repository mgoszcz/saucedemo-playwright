import {expect} from "@playwright/test";
import {inventoryPageFixture as test} from "./fixtures/inventoryPage.fixture";
import {products} from "../../data/products";
import {sorting} from "../../const/sorting";

test.describe('Inventory Page', () => {
    test('Products are displayed with proper labels, description and price', async ({inventoryPage}) => {
        const items = await inventoryPage.inventoryList.getItems();
        expect(items.length).toBeGreaterThan(0);
        Object.values(products).forEach((value) => {
            expect(items.some(async (item) => await item.label.textContent() === value.name)).toBeTruthy();
            expect(items.some(async (item) => await item.description.textContent() === value.description)).toBeTruthy();
            expect(items.some(async (item) => await item.price.textContent() === `\$${value.price}`)).toBeTruthy();
        });
    });

    test('add to cart button is displayed for each product', async ({inventoryPage}) => {
        const items = await inventoryPage.inventoryList.getItems();
        items.forEach((item) => {
            expect(item.addToCartButton).toBeVisible();
            expect(item.addToCartButton).toBeEnabled();
        });
    });

    test('add to cart button changes label when adding or removing product', async ({inventoryPage}) => {
        const item = await inventoryPage.inventoryList.getItemByName(products.backpack.name);
        expect(await item.addToCartButton.textContent()).toBe('Add to cart');
        await item.addToCartButton.click();
        expect(await item.addToCartButton.textContent()).toBe('Remove');
        await item.addToCartButton.click();
        expect(await item.addToCartButton.textContent()).toBe('Add to cart');
    });

    test('add to cart button adds product to cart', async ({inventoryPage, topBarPage, shoppingCartPage}) => {
        const item = await inventoryPage.inventoryList.getItemByName(products.backpack.name);
        await item.addToCartButton.click();
        await topBarPage.shoppingCartButton.click();
        const cartItems = await shoppingCartPage.shoppingCartList.getItems();
        expect(cartItems.length).toBe(1);
        expect(await cartItems[0].label.textContent()).toBe(products.backpack.name);
    });

    test('add to cart and remove from cart is reflected in the cart badge', async ({inventoryPage, topBarPage}) => {
        await expect(topBarPage.shoppingCardBadge).toBeHidden();
        const items = await inventoryPage.inventoryList.getItems();
        let number = 1
        for (const item of items) {
            await item.addToCartButton.click();
            expect(await topBarPage.shoppingCardBadge.textContent()).toBe((number).toString());
            number++;
        }
        number = 6
        for (const item of items) {
            await item.addToCartButton.click();
            number--;
            if (number === 0) {
                await expect(topBarPage.shoppingCardBadge).toBeHidden();
            } else {
                expect(await topBarPage.shoppingCardBadge.textContent()).toBe(number.toString());
            }
        }
    });

    test('items can be sorted', async ({inventoryPage}) => {
        await expect(inventoryPage.sortingDropdown).toBeVisible();
        expect(await inventoryPage.sortingDropdown.inputValue()).toBe(sorting.nameAtoZ);
        let itemsSorted = Object.values(products).sort((a, b) => a.name.localeCompare(b.name));
        let items = await inventoryPage.inventoryList.getItems();
        const itemsLabels = await Promise.all(items.map(async (item) => await item.label.textContent()));
        expect(itemsLabels).toEqual(itemsSorted.map((item) => item.name));
        await inventoryPage.sortingDropdown.selectOption(sorting.nameZtoA);
        expect(await inventoryPage.sortingDropdown.inputValue()).toBe(sorting.nameZtoA);
        items = await inventoryPage.inventoryList.getItems();
        itemsSorted.reverse()
        items.forEach(async (item, index) => {
            expect(await item.label.textContent()).toBe(itemsSorted[index].name);
        });
        await inventoryPage.sortingDropdown.selectOption(sorting.priceLowToHigh);
        expect(await inventoryPage.sortingDropdown.inputValue()).toBe(sorting.priceLowToHigh);
        items = await inventoryPage.inventoryList.getItems();
        itemsSorted = Object.values(products).sort((a, b) => a.price - b.price);
        items.forEach(async (item, index) => {
            expect(await item.label.textContent()).toBe(itemsSorted[index].name);
        });
        await inventoryPage.sortingDropdown.selectOption(sorting.priceHighToLow);
        expect(await inventoryPage.sortingDropdown.inputValue()).toBe(sorting.priceHighToLow);
        itemsSorted = Object.values(products).sort((a, b) => b.price - a.price);
        items = await inventoryPage.inventoryList.getItems();
        items.forEach(async (item, index) => {
            expect(await item.label.textContent()).toBe(itemsSorted[index].name);
        });
    })

    test('user can click on label and open product page', async ({inventoryPage, productPage}) => {
        const item = await inventoryPage.inventoryList.getItemByName(products.backpack.name);
        await item.label.click();
        await expect(productPage.productLabel).toHaveText(products.backpack.name);
        await productPage.backToProductsButton.click();
        await expect(inventoryPage.inventoryContainer).toBeVisible();
    });
});