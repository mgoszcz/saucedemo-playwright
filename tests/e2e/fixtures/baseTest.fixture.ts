import {test} from "@playwright/test";
import {LoginPage} from "../../../pages/loginPage";


export const baseTestFixture = test.extend<{ loginPage: LoginPage }>({
    loginPage: async ({page: Page}, use) => {
        const loginPage = new LoginPage(Page);
        await loginPage.open();
        await loginPage.loginUser('standard_user', 'secret_sauce')
        await use(loginPage)
    }
})
