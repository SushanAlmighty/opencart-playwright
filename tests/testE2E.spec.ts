import { test, expect, Page, TestDetails} from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { HomePage } from '../pages/HomePage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';
import { LogoutPage } from '../pages/LogoutPage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('execute end-to-end test flow @end-to-end', async({page}) => {

    const config: TestConfig = new TestConfig();

    await page.goto(config.appUrl);

    let registeredEmail: string = await performRegistration(page);
    console.log("✅ Registration is complete!");

    await performLogout(page);
    console.log("✅ Logout is completed!");

    await performLogin(page, registeredEmail);
    console.log("✅ Login is completed!");

    await addProductToCart(page);
    console.log("✅ Product added to the cart!");

    await verifyShoppingCart(page);
    console.log("✅ Shopping cart verification completed!");

})

const performRegistration = async(page: Page): Promise<string> => {

    const homePage: HomePage = new HomePage(page);
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    const registrationPage: RegistrationPage = new RegistrationPage(page);

    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getLastName());

    let email: string = RandomDataUtil.getEmail();
    await registrationPage.setEmail(email);
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

    await registrationPage.setPassword("test123");
    await registrationPage.setConfirmPassword("test123");

    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();

    const confirmationMsg = await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');

    return email;
}

const performLogout =  async(page: Page): Promise<void> => {
    const myAccountPage = new MyAccountPage(page);
    const logoutPage: LogoutPage = await myAccountPage.clickLogout();

    expect(await logoutPage.isContinueButtonVisible()).toBeTruthy();

    const homePage = await logoutPage.clickContinue();
    expect(await homePage.doesHomePageExists()).toBeTruthy();
}

const performLogin = async(page:Page, email: string): Promise<void> => {
    const config: TestConfig = new TestConfig();
    await page.goto(config.appUrl);

    const homePage = new HomePage(page);
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.login(email, 'test123');

    const myAccountPage: MyAccountPage = new MyAccountPage(page);
    expect(await myAccountPage.doesMyAccountPageExists()).toBeTruthy();
}

const addProductToCart = async(page: Page): Promise<void> => {
    const homePage = new HomePage(page);

    const config: TestConfig = new TestConfig();
    const productName: string = config.productName;
    const productQty: string = config.productQuantity;

    await homePage.enterProductName(productName);
    await homePage.clickSearch();

    const searchResultsPage: SearchResultsPage = new SearchResultsPage(page);
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

    expect(await searchResultsPage.isProductExist(productName)).toBeTruthy();

    const productPage: ProductPage | null = await searchResultsPage.selectProduct(productName);
    await productPage?.setQuantity(productQty);
    await productPage?.addToCart();
    
    await page.waitForTimeout(3000);

    expect(productPage?.isConfirmationMessageVisible()).toBeTruthy();
}

const verifyShoppingCart = async(page: Page): Promise<void> => {
    const productPage = new ProductPage(page);

    await productPage.clickItemsToNavigateToCart();

    const shoppingCartPage: ShoppingCartPage = new ShoppingCartPage(page);

    console.log("🛒 Navigated to shopping cart!");

    const config: TestConfig = new TestConfig();

    expect(await shoppingCartPage.getTotalPrice()).toBe(config.totalPrice);
}