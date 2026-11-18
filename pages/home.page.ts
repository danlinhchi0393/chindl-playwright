import { Page, Locator } from '@playwright/test';
export class HomePage {
    page: Page;
    tileLoc: Locator;
    searchInputLoc: Locator;
    searchButtonLoc: Locator;
    searchProductButtonLoc: Locator;
    menuLoc: Locator;
    products: Locator;
    nameProductLoc: Locator;
    totalProducts: Locator;
    baseUrl: string;
    keyword: string;
    constructor(page: Page) {
        this.page = page;
        this.baseUrl = 'https://e-commerce-dev.hoctest.com/';
        this.keyword = 'ISTQB';
        this.tileLoc = page.locator('div').filter({ hasText: 'E-Commerce (DEV) Khoá học QA' }).nth(5);
        this.searchInputLoc = page.getByRole('searchbox', { name: 'Search for:' });
        this.searchButtonLoc = page.getByRole('link', { name: 'Search for a product' });
        this.menuLoc = page.locator('#site-navigation').getByText('Shop Blog Chứng chỉ');
        this.searchProductButtonLoc = page.getByRole('button', { name: 'Search for the product' });
        this.products = page.locator('li.product');
        this.nameProductLoc = page.getByRole('link', { name: `${this.keyword}`});
        this.totalProducts = page.getByText('Showing all 6 results');
    }

    async go() {
        await this.page.goto(this.baseUrl);
    }

    async clickSearchButton() {
        await this.searchButtonLoc.click();
    }
    async clickSearchProductButton(keyword: string) {
        await this.searchInputLoc.fill(keyword);
        await this.searchProductButtonLoc.click();
    }

}