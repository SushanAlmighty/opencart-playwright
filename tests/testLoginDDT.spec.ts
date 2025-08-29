import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';
import { DataProvider } from '../utils/dataProvider'

const jsonPath = "data/loginData.json";
const csvPath = 'data/loginDAta.csv';

const jsonData: any = DataProvider.getTestDataFromJson(jsonPath);
const csvData: any = DataProvider.getTestDataFromCsv(csvPath);


jsonData.forEach(({testName, email, password, expected}) => {
    test(`${testName} with Email: ${email} and Password: ${password} using data from JSON @datadriven`, async({page}) => {

        const config = new TestConfig();
        await page.goto(config.appUrl);

        const homePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginPage = new LoginPage(page);
        await loginPage.login(email, password);

        if(expected.toLowerCase() === "success")
        {
            const myAccountPage = new MyAccountPage(page);
            const isLogged = await myAccountPage.doesMyAccountPageExists();
            expect(isLogged).toBeTruthy();
        }
        else
        {
            const errorMsg = await loginPage.getLoginErrorMsg();
            expect(errorMsg).toBe('Warning: No match for E-Mail Address and/or Password.')
        }
    })
})

csvData.forEach(({testName, email, password, expected}) => {
    test(`${testName} with Email: ${email} and Password: ${password} using data from CSV @datadriven`, async({page}) => {

        const config = new TestConfig();
        await page.goto(config.appUrl);

        const homePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginPage = new LoginPage(page);
        await loginPage.login(email, password);

        if(expected.toLowerCase() === "success")
        {
            const myAccountPage = new MyAccountPage(page);
            const isLogged = await myAccountPage.doesMyAccountPageExists();
            expect(isLogged).toBeTruthy();
        }
        else
        {
            const errorMsg = await loginPage.getLoginErrorMsg();
            expect(errorMsg).toBe('Warning: No match for E-Mail Address and/or Password.')
        }
    })
})