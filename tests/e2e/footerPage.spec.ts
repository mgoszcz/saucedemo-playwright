import {allPagesFixture as test} from "./fixtures/allPagesFixture";
import {expect} from "@playwright/test";
import {BasePage} from "../../pages/basePage";
import {products} from "../../data/products";

const testVisibility = async (pageObject: BasePage) => {
    await expect(pageObject.footer.footerContainer).toBeVisible();
    await expect(pageObject.footer.twitter).toBeVisible();
    await expect(pageObject.footer.facebook).toBeVisible();
    await expect(pageObject.footer.linkedin).toBeVisible();
    await expect(pageObject.footer.copyrights).toBeVisible();
    await expect(pageObject.footer.copyrights).toHaveText(
        "© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy"
    )
}

test.describe.parallel.only('Footer Page', () => {
    test(
        'footer, copyrights and social buttons should be visible on each page',
        async ({inventoryPage, shoppingCartPage, checkoutUserDataPage, checkoutCompletePage, checkoutOverviewPage}) => {
        await testVisibility(inventoryPage);
        await inventoryPage.addProductToCart(products.backpack.name);
        await inventoryPage.topBar.shoppingCartButton.click();
        await testVisibility(shoppingCartPage);
        await shoppingCartPage.checkoutButton.click();
        await testVisibility(checkoutUserDataPage);
        await checkoutUserDataPage.fillUserData('John', 'Doe', '12345');
        await checkoutUserDataPage.continueButton.click();
        await testVisibility(checkoutOverviewPage);
        await checkoutOverviewPage.finishButton.click();
        await testVisibility(checkoutCompletePage);
    });

    test('X link should open X profile', async ({inventoryPage}) => {
        const newTabPromise = inventoryPage.page.waitForEvent('popup');
        await inventoryPage.footer.twitter.click();
        const newTab = await newTabPromise;
        await newTab.waitForLoadState('networkidle');
        await expect(newTab).toHaveURL(new RegExp('https://x.com/saucelabs'));
    });

    test('Facebook link should open Facebook profile', async ({inventoryPage}) => {
        const newTabPromise = inventoryPage.page.waitForEvent('popup');
        await inventoryPage.footer.facebook.click();
        const newTab = await newTabPromise;
        await newTab.waitForLoadState('domcontentloaded');
        await expect(newTab).toHaveURL('https://www.facebook.com/saucelabs');
    });

    test('Linkedin link should open Linkedin page', async ({inventoryPage}) => {
        const newTabPromise = inventoryPage.page.waitForEvent('popup');
        await inventoryPage.footer.linkedin.click();
        const newTab = await newTabPromise;
        await newTab.waitForLoadState('domcontentloaded');
        await expect(newTab).toHaveURL('https://www.linkedin.com/company/sauce-labs/');
    });
});