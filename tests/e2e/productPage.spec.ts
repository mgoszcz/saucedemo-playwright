import {inventoryPageFixture as test} from "./fixtures/inventoryPage.fixture";
import {expect} from "@playwright/test";
import {products} from "../../data/products";

test.describe.parallel('Product Page', () => {
    test.beforeEach(async ({inventoryPage}) => {
        await inventoryPage.inventoryList.getItemByName(products.backpack.name).then(item => item?.label.click());
    });

    test('product label, description and price should be displayed', async ({productPage}) => {
        expect(await productPage.productLabel.textContent()).toStrictEqual(products.backpack.name);
        expect(await productPage.productDescription.textContent()).toStrictEqual(products.backpack.description);
        expect(await productPage.productPrice.textContent()).toStrictEqual(`\$${products.backpack.price}`);
    });

    test('product image should be displayed @visual', async ({productPage}) => {
        await productPage.page.waitForLoadState('networkidle')
        await expect(productPage.image).toBeVisible();
        expect(await productPage.image.screenshot()).toMatchSnapshot('sauce-backpack.png')
    });

    test('add to cart button exists and changes label when adding or removing product', async ({productPage}) => {
        await expect(productPage.addToCartButton).toBeVisible();
        expect(await productPage.addToCartButton.textContent()).toBe('Add to cart');
        await productPage.addToCartButton.click();
        expect(await productPage.addToCartButton.textContent()).toBe('Remove');
        await productPage.addToCartButton.click();
        expect(await productPage.addToCartButton.textContent()).toBe('Add to cart');
    });

    test('add to cart button adds product to cart', async ({productPage, shoppingCartPage}) => {
        await productPage.addToCartButton.click();
        await productPage.topBar.shoppingCartButton.click();
        const cartItems = await shoppingCartPage.shoppingCartList.getItems();
        expect(cartItems.length).toBe(1);
        expect(await cartItems[0].label.textContent()).toBe(products.backpack.name);
    });

    test('add to cart and remove from cart is reflected in the cart badge', async ({productPage}) => {
        await expect(productPage.topBar.shoppingCardBadge).toBeHidden();
        await productPage.addToCartButton.click();
        await expect(productPage.topBar.shoppingCardBadge).toBeVisible();
        expect(await productPage.topBar.shoppingCardBadge.textContent()).toBe('1');
        await productPage.addToCartButton.click();
        await expect(productPage.topBar.shoppingCardBadge).toBeHidden();
    });

    test('user can go back to products with button', async ({productPage, inventoryPage}) => {
        await productPage.backToProductsButton.click();
        await expect(inventoryPage.inventoryContainer).toBeVisible();
    });
});