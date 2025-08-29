import {test, expect} from '@playwright/test';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';

let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let logoutPage: LogoutPage;

test.beforeEach(async({page}) => {
    config = new TestConfig();
    await page.goto(config.appUrl);

    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
});

test.afterEach(async({page}) => {
    await page.close();
})

test("User Logout test @master @regression", async() => {
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    await loginPage.login(config.email, config.password);
    expect(await myAccountPage.doesMyAccountPageExists()).toBeTruthy();

    logoutPage = await myAccountPage.clickLogout();
    expect(await logoutPage.isContinueButtonVisible()).toBe(true);

    homePage = await logoutPage.clickContinue();
    expect(await homePage.doesHomePageExists()).toBe(true);
})