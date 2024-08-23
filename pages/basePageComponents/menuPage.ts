import {Page} from "@playwright/test";


export class MenuPage {
    page: Page;


    constructor(page: Page) {
        this.page = page;
    }
}