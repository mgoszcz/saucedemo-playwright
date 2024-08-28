import {expect} from "@playwright/test";
import {shoppingCartPageFixture as test} from "./fixtures/shoppingCartPage.fixture";
import {products} from "../../data/products";

test.describe.parallel('Shopping Cart Page', () => {
    test.describe('Empty Cart', () => {
        test.beforeEach(async ({inventoryPage}) => {
            await inventoryPage.topBar.shoppingCartButton.click();
        });
        test('headers and buttons should be displayed', async ({shoppingCartPage}) => {
            await expect(shoppingCartPage.quantityLabel).toBeVisible();
            await expect(shoppingCartPage.descriptionLabel).toBeVisible();
            expect(await shoppingCartPage.quantityLabel.textContent()).toStrictEqual('QTY');
            expect(await shoppingCartPage.descriptionLabel.textContent()).toStrictEqual('Description');
            await expect(shoppingCartPage.continueShoppingButton).toBeVisible();
            await expect(shoppingCartPage.checkoutButton).toBeVisible();
        });

        test('no items should be displayed', async ({shoppingCartPage}) => {
            const items = await shoppingCartPage.shoppingCartList.getItems();
            expect(items.length).toBe(0);
        });
    });

    test.describe('Cart with 3 items', () => {
        test.beforeEach(async ({inventoryPage}) => {
            await inventoryPage.addProductToCart(products.backpack.name);
            await inventoryPage.addProductToCart(products.bikeLight.name);
            await inventoryPage.addProductToCart(products.boltTShirt.name);
            await inventoryPage.topBar.shoppingCartButton.click();
        });

        test('headers and buttons should be displayed', async ({shoppingCartPage}) => {
            await expect(shoppingCartPage.quantityLabel).toBeVisible();
            await expect(shoppingCartPage.descriptionLabel).toBeVisible();
            expect(await shoppingCartPage.quantityLabel.textContent()).toStrictEqual('QTY');
            expect(await shoppingCartPage.descriptionLabel.textContent()).toStrictEqual('Description');
            await expect(shoppingCartPage.continueShoppingButton).toBeVisible();
            await expect(shoppingCartPage.checkoutButton).toBeVisible();
        });

        test('3 items should be displayed', async ({shoppingCartPage}) => {
            const cartItems = await shoppingCartPage.shoppingCartList.getItems();
            expect(cartItems).toHaveLength(3);
            const itemsLabels = await Promise.all(cartItems.map(async (item) => item.label.textContent()));
            expect(itemsLabels).toContain(products.backpack.name);
            expect(itemsLabels).toContain(products.bikeLight.name);
            expect(itemsLabels).toContain(products.boltTShirt.name);
            expect(await shoppingCartPage.topBar.shoppingCardBadge.textContent()).toBe('3');
        });

        test('items can be removed from the cart', async ({shoppingCartPage}) => {
            const cartItems = await shoppingCartPage.shoppingCartList.getItems();
            let amount = 3;
            expect(cartItems).toHaveLength(amount);
            for (const cartItem of cartItems.slice().reverse()) {
                await cartItem.removeButton.click();
                amount--;
                expect(await shoppingCartPage.shoppingCartList.getItems()).toHaveLength(amount);
                if (amount > 0) {
                    expect(await shoppingCartPage.topBar.shoppingCardBadge.textContent()).toBe(amount.toString());
                } else {
                    await expect(shoppingCartPage.topBar.shoppingCardBadge).toBeHidden();
                }
            }
        });
    });

    test.describe('Cart with 6 items', () => {
       test.beforeEach(async ({inventoryPage}) => {
          const items = await inventoryPage.inventoryList.getItems();
          for (const item of items) {
              await item.addToCartButton.click();
          }
            await inventoryPage.topBar.shoppingCartButton.click();
       });

        test('6 items should be displayed and contain proper data', async ({shoppingCartPage}) => {
            const cartItems = await shoppingCartPage.shoppingCartList.getItems();
            expect(cartItems).toHaveLength(6);
            for (const product of Object.values(products)) {
                const item = await shoppingCartPage.shoppingCartList.getItemByName(product.name);
                expect(await item.label.textContent()).toStrictEqual(product.name);
                expect(await item.description.textContent()).toStrictEqual(product.description);
                expect(await item.price.textContent()).toStrictEqual(`\$${product.price}`);
            }
            expect(await shoppingCartPage.topBar.shoppingCardBadge.textContent()).toBe('6');
        });

        test('all items should contain remove button', async ({shoppingCartPage}) => {
            const cartItems = await shoppingCartPage.shoppingCartList.getItems();
            for (const cartItem of cartItems) {
                await expect(cartItem.removeButton).toBeVisible();
            }
        });

        test('All items quantity should be 1', async ({shoppingCartPage}) => {
            const cartItems = await shoppingCartPage.shoppingCartList.getItems();
            for (const cartItem of cartItems) {
                expect(await cartItem.quantity.textContent()).toBe('1');
            }
        });

        test('user can access product page when clicking on product label label', async ({shoppingCartPage, productPage, page}) => {
            for (const product of Object.values(products)) {
                await shoppingCartPage.shoppingCartList.getItemByName(product.name).then(async (item) => await item.label.click());
                expect( await productPage.productLabel.textContent()).toBe(product.name);
                await page.goBack();
            }
        });
    });

    test.describe('General', () => {
       test.beforeEach(async ({inventoryPage}) => {
          await inventoryPage.inventoryList.getItemByName(products.backpack.name).then(async (item) => item.addToCartButton.click());
            await inventoryPage.topBar.shoppingCartButton.click();
       });

       test('continue shopping button should redirect to inventory page', async ({shoppingCartPage, inventoryPage}) => {
          await shoppingCartPage.continueShoppingButton.click();
          await expect(inventoryPage.inventoryContainer).toBeVisible();
       });

         test('checkout button should redirect to checkout page', async ({shoppingCartPage, checkoutUserDataPage}) => {
             await shoppingCartPage.checkoutButton.click();
             await expect(checkoutUserDataPage.firstNameInput).toBeVisible();
         });
    });
});