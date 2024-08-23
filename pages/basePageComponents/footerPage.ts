import {Locator, Page} from "@playwright/test";


const selectors = {
    footer: 'footer.footer',
    link: (className) => `ul.social > li.${className} > a`,
    copyrights: 'div.footer_copy'
}

export class FooterPage {
    page: Page;
    footerContainer: Locator;
    twitter: Locator;
    facebook: Locator;
    linkedin: Locator;
    copyrights: Locator;

    constructor(page: Page) {
        this.page = page;
        this.footerContainer = page.locator(selectors.footer);
        this.twitter = this.footerContainer.locator(selectors.link('social_twitter'));
        this.facebook = this.footerContainer.locator(selectors.link('social_facebook'));
        this.linkedin = this.footerContainer.locator(selectors.link('social_linkedin'));
        this.copyrights = this.footerContainer.locator(selectors.copyrights);
    }
}