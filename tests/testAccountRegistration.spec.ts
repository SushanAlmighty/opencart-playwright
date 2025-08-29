import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';

let URL: string;
let homePage: HomePage;
let registerPage: RegistrationPage;


test.beforeAll(async () => {

    const config = new TestConfig();
    URL = config.appUrl;

})

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    homePage = new HomePage(page);
    registerPage = new RegistrationPage(page);
})

test.afterEach(async ({ page }) => {
    await page.close();
})

test("User Registration test  @master @sanity @regression", async () => {


    await homePage.clickMyAccount();
    await homePage.clickRegister();



    await registerPage.setFirstName(RandomDataUtil.getFirstName());
    await registerPage.setLastName(RandomDataUtil.getLastName());
    await registerPage.setEmail(RandomDataUtil.getEmail());
    await registerPage.setTelephone(RandomDataUtil.getPhoneNumber());
    const password: string = RandomDataUtil.getPassword();
    await registerPage.setPassword(password);
    await registerPage.setConfirmPassword(password);
    await registerPage.setPrivacyPolicy();
    await registerPage.clickContinue();

    const confirmationMsg: string = await registerPage.getConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!')
})