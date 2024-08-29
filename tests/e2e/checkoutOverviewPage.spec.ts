import {allPagesFixture as test} from "./fixtures/allPagesFixture";
import {expect} from "@playwright/test";
import {products} from "../../data/products";

const calculateTax = (price: number) => (price * 0.08).toFixed(2);

test.describe.parallel('Checkout page - Overview', () => {
    test.describe.parallel('3 products selected', () => {
        test.beforeEach(async ({inventoryPage, shoppingCartPage, checkoutUserDataPage}) => {
            await inventoryPage.addProductToCart(products.backpack.name);
            await inventoryPage.addProductToCart(products.bikeLight.name);
            await inventoryPage.addProductToCart(products.boltTShirt.name);
            await inventoryPage.topBar.shoppingCartButton.click();
            await shoppingCartPage.checkoutButton.click();
            await checkoutUserDataPage.fillUserData('John', 'Doe', '12345');
            await checkoutUserDataPage.continueButton.click();
        });
        test('3 items should be displayed in list', async ({checkoutOverviewPage}) => {
            const cartItems = await checkoutOverviewPage.productsList.getItems();
            expect(cartItems).toHaveLength(3);
            const itemsLabels = await Promise.all(cartItems.map(async (item) => item.label.textContent()));
            expect(itemsLabels).toContain(products.backpack.name);
            expect(itemsLabels).toContain(products.bikeLight.name);
            expect(itemsLabels).toContain(products.boltTShirt.name);
            expect(await checkoutOverviewPage.topBar.shoppingCardBadge.textContent()).toBe('3');
        });
        test('payment and shipping information should be displayed', async ({checkoutOverviewPage}) => {
            expect(await checkoutOverviewPage.paymentInformationValue.textContent()).toContain('SauceCard #');
            expect(await checkoutOverviewPage.shippingInformationValue.textContent()).toBe('Free Pony Express Delivery!');
        });
        test('item price, total price and tax is properly calculated', async ({checkoutOverviewPage}) => {
            const expectedItemTotal = products.backpack.price + products.bikeLight.price + products.boltTShirt.price;
            const expectedTax = calculateTax(expectedItemTotal);
            const expectedTotal = expectedItemTotal + parseFloat(expectedTax);
            expect(await checkoutOverviewPage.getItemTotalValue()).toBe(`\$${expectedItemTotal}`);
            expect(await checkoutOverviewPage.getTaxValue()).toBe(`\$${expectedTax}`);
            expect(await checkoutOverviewPage.getTotalPriceValue()).toBe(`\$${expectedTotal}`);
        });
    });

    test.describe.parallel('6 products selected', () => {
        test.beforeEach(async ({inventoryPage, shoppingCartPage, checkoutUserDataPage}) => {
            const items = await inventoryPage.inventoryList.getItems();
            for (const item of items) {
                await item.addToCartButton.click();
            }
            await inventoryPage.topBar.shoppingCartButton.click();
            await shoppingCartPage.checkoutButton.click();
            await checkoutUserDataPage.fillUserData('John', 'Doe', '12345');
            await checkoutUserDataPage.continueButton.click();
        });
        test('6 items should be displayed and contain proper data', async ({checkoutOverviewPage}) => {
            const cartItems = await checkoutOverviewPage.productsList.getItems();
            expect(cartItems).toHaveLength(6);
            for (const product of Object.values(products)) {
                const item = await checkoutOverviewPage.productsList.getItemByName(product.name);
                expect(await item.label.textContent()).toStrictEqual(product.name);
                expect(await item.description.textContent()).toStrictEqual(product.description);
                expect(await item.price.textContent()).toStrictEqual(`\$${product.price}`);
            }
            expect(await checkoutOverviewPage.topBar.shoppingCardBadge.textContent()).toBe('6');
        });
        test('All items quantity should be 1', async ({checkoutOverviewPage}) => {
            const cartItems = await checkoutOverviewPage.productsList.getItems();
            for (const cartItem of cartItems) {
                expect(await cartItem.quantity.textContent()).toBe('1');
            }
        });
        test('user can access product page when clicking on product label', async ({checkoutOverviewPage, productPage, page}) => {
            for (const product of Object.values(products)) {
                await checkoutOverviewPage.productsList.getItemByName(product.name).then(async (item) => await item.label.click());
                expect( await productPage.productLabel.textContent()).toBe(product.name);
                await page.goBack();
            }
        });
        test('payment and shipping information should be displayed', async ({checkoutOverviewPage}) => {
            expect(await checkoutOverviewPage.paymentInformationValue.textContent()).toContain('SauceCard #');
            expect(await checkoutOverviewPage.shippingInformationValue.textContent()).toBe('Free Pony Express Delivery!');
        });
        test('item price, total price and tax is properly calculated', async ({checkoutOverviewPage}) => {
            const expectedItemTotal = Object.values(products).reduce((acc, product) => acc + product.price, 0);
            const expectedTax = calculateTax(expectedItemTotal);
            const expectedTotal = expectedItemTotal + parseFloat(expectedTax);
            expect(await checkoutOverviewPage.getItemTotalValue()).toBe(`\$${expectedItemTotal}`);
            expect(await checkoutOverviewPage.getTaxValue()).toBe(`\$${expectedTax}`);
            expect(await checkoutOverviewPage.getTotalPriceValue()).toBe(`\$${expectedTotal}`);
        });
    });

    test.describe.parallel('Checkout finished and cancelled', () => {
       test.beforeEach(async ({inventoryPage, shoppingCartPage, checkoutUserDataPage}) => {
              await inventoryPage.addProductToCart(products.backpack.name);
              await inventoryPage.topBar.shoppingCartButton.click();
              await shoppingCartPage.checkoutButton.click();
              await checkoutUserDataPage.fillUserData('John', 'Doe', '12345');
              await checkoutUserDataPage.continueButton.click();
       });
       test('cancel button should navigate to inventory page', async ({checkoutOverviewPage, inventoryPage}) => {
              await checkoutOverviewPage.cancelButton.click();
              await expect(inventoryPage.inventoryContainer).toBeVisible();
       });
       test('finish button should navigate to checkout complete page', async ({checkoutOverviewPage, checkoutCompletePage}) => {
           await checkoutOverviewPage.finishButton.click();
           await expect(checkoutCompletePage.checkoutCompleteContainer).toBeVisible();
           await expect(checkoutCompletePage.completeHeader).toContainText('Thank you for your order!');
           await expect(checkoutCompletePage.completeImage).toBeVisible();
           await expect(checkoutCompletePage.completeText).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
           await expect(checkoutCompletePage.backHomeButton).toBeVisible();
       });
       test('back home button should navigate to inventory page', async ({checkoutOverviewPage, checkoutCompletePage, inventoryPage}) => {
              await checkoutOverviewPage.finishButton.click();
              await checkoutCompletePage.backHomeButton.click();
              await expect(inventoryPage.inventoryContainer).toBeVisible();
       });
    });
});