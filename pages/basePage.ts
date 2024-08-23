import {Page} from "@playwright/test";
import {TopBarPage} from "./basePageComponents/topBarPage";
import {FooterPage} from "./basePageComponents/footerPage";
import {MenuPage} from "./basePageComponents/menuPage";


export class BasePage {
    page: Page;
    topBar: TopBarPage;
    footer: FooterPage;
    menu: MenuPage;


    constructor(page: Page) {
        this.page = page;
        this.topBar = new TopBarPage(page);
        this.footer = new FooterPage(page);
        this.menu = new MenuPage(page);
    }
}