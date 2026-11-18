import { Page, Locator } from '@playwright/test';
export class ProductDetailPage {
    nameProductLoc: Locator;
    originalPriceLoc: Locator;
    salePriceLoc: Locator
    descriptionLoc: Locator;
    addToCartButtonLoc: Locator;
    reviewTab: Locator;
    constructor(page: Page) {
        this.nameProductLoc = page.locator('h1.product_title');
        this.originalPriceLoc = page.locator('.summary del .woocommerce-Price-amount');
        this.salePriceLoc = page.locator('.summary ins .woocommerce-Price-amount');
        this.descriptionLoc = page.locator('.woocommerce-product-details__short-description');
        this.addToCartButtonLoc = page.getByRole('button', { name: 'Add to cart' });
        this.reviewTab = page.getByRole('link', { name: 'Reviews (0)' });
    }

    async clickAddToCartButton() {
        await this.addToCartButtonLoc.click();
    }
    async clickReviewTab() {
        await this.reviewTab.click();
    }
}