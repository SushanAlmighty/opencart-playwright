import {test, expect} from '@playwright/test';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

let config: TestConfig;
let homePage: HomePage;
let searchResultsPage: SearchResultsPage;

test.beforeEach(async({page}) => {
    config = new TestConfig();
    await page.goto(config.appUrl);

    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
});

test.afterEach(async({page}) => {
    await page.close();
})

test('Product search test @master @regression', async() => {
    const productName = config.productName;

    await homePage.enterProductName(productName);
    await homePage.clickSearch();

    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

    const isProductFound:boolean = await searchResultsPage.isProductExist(productName);
    expect(isProductFound).toBeTruthy();
})