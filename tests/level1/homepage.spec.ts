import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ProductDetailPage } from '../../pages/product.page';
test.describe('Level 1', () => {
    let homePage: HomePage;
    let productDetailPage: ProductDetailPage;
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productDetailPage = new ProductDetailPage(page);
        await homePage.go();
    });
    test('ECOM-1', async ({ page }) => {

        //Tiêu đề: E-Commerce (DEV) – Khoá học QA & Testing
        await expect(homePage.tileLoc).toBeVisible();

        //Menu: hiển thị với các mục: Shop, Blog, Chứng chỉ....
        await expect(homePage.menuLoc).toBeVisible();

        //Thanh tìm kiếm: hiển thị với placeholder: "Search products…"
        await homePage.clickSearchButton();
        await expect(homePage.searchInputLoc).toBeVisible();
    });
    test('ECOM-2', async ({ page }) => {
        await homePage.clickSearchButton();
        await homePage.clickSearchProductButton('ISTQB');

        await expect(homePage.products).toHaveCount(6);
        expect(homePage.totalProducts).toBeVisible();
        for (let i = 0; i < await homePage.products.count(); i++) {
            await expect(homePage.products.nth(i)).toContainText('ISTQB');
        }
    })
    test('ECOM-3', async ({ page }) => {
        const PRODUCT = {
            name: 'FullStack Automation QA với Playwright Typescript',
            originalPrice: '$100.00',
            salePrice: '$70.00',
            description: 'Khoá học automation test từ chưa biết gì, với Playwright TypeScript',
        };
        await homePage.clickSearchButton();
        await homePage.clickSearchProductButton('FullStack Automation QA với Playwright Typescript');
        //Kiem tra thông tin sản phẩm: Tên sản phẩm, Giá gốc, Giá khuyến mãi, Mô tả
        await expect(productDetailPage.nameProductLoc).toHaveText(PRODUCT.name);
        await expect(productDetailPage.originalPriceLoc).toHaveText(PRODUCT.originalPrice);
        await expect(productDetailPage.salePriceLoc).toHaveText(PRODUCT.salePrice);
        await expect(productDetailPage.descriptionLoc).toHaveText(PRODUCT.description);
        //kiem tra nút "Add to cart" hiển thị
        await expect(productDetailPage.addToCartButtonLoc).toBeVisible();
        //click vào tab Reviews và Kiem tra Chưa có review nào ("There are no reviews yet.")
        await productDetailPage.clickReviewTab();
        await expect(page.getByText('There are no reviews yet.')).toBeVisible();
    })
    
})