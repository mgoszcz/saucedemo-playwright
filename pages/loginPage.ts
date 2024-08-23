import { Page, Locator } from '@playwright/test';
import {urls} from "../const/urls";

const selectors = {
    root: '.login_container',
    logo: '.login_logo',
    input: (id) => `input#${id}`,
    errorMessage: 'div.error-message-container > h3[data-test=error]',
    loginButton: '#login-button',
}

export class LoginPage {
    page: Page;
    root: Locator;
    logo: Locator;
    userName: Locator;
    password: Locator;
    errorMessage: Locator;
    loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.root = page.locator(selectors.root);
        this.logo = this.root.locator(selectors.logo);
        this.userName = this.root.locator(selectors.input('user-name'));
        this.password = this.root.locator(selectors.input('password'));
        this.errorMessage = this.root.locator(selectors.errorMessage);
        this.loginButton = this.root.locator(selectors.loginButton);
    }

    async open() {
        await this.page.goto(urls.loginPage);
    }

    async loginUser(userName: string, password: string) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}
