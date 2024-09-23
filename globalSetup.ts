import {chromium} from "@playwright/test";
import {urls} from "./const/urls";
import {LoginPage} from "./pages/loginPage";

async function globalSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.loginUser('standard_user', 'secret_sauce');

    await page.waitForURL(urls.inventoryPage)

    await page.context().storageState({ path: '.auth/state.json' });

    await browser.close();
}

export default globalSetup;