import {test, expect} from '@playwright/test';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';

let config: TestConfig;
let homePage: HomePage;
let searchResultsPage: SearchResultsPage;
let productPage: ProductPage;

test.beforeEach(async({page}) => {
    config = new TestConfig();
    await page.goto(config.appUrl);

    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
    productPage = new ProductPage(page);
});

test.afterEach(async({page}) => {
    await page.close();
});

test("Add product to cart test @master @regression", async({page}) => {

    await homePage.enterProductName(config.productName);
    await homePage.clickSearch();

    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

    const productName = config.productName;
    expect(await searchResultsPage.isProductExist(productName)).toBeTruthy();

    if(await searchResultsPage.isProductExist(productName))
    {
        await searchResultsPage.selectProduct(productName);
        await productPage.setQuantity(config.productQuantity);
        await productPage.addToCart();
    }

    await page.waitForTimeout(3000);
    expect(await productPage.isConfirmationMessageVisible()).toBeTruthy();
    
})