import {Page, Locator} from '@playwright/test';

export class HomePage
{
    private readonly page:Page;
    private readonly linkMyAccount: Locator;
    private readonly linkRegister: Locator;
    private readonly linkLogin: Locator;
    private readonly txtSearchBox: Locator;
    private readonly btnSearch: Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.linkMyAccount = this.page.locator("[title='My Account']");
        this.linkRegister = this.page.getByRole('link', {name: "Register"});
        this.linkLogin = this.page.getByRole('link', {name: "Login"});
        this.txtSearchBox = this.page.getByPlaceholder("Search");
        this.btnSearch = this.page.locator('.btn.btn-default.btn-lg');
    }

    async doesHomePageExists(): Promise<boolean>
    {
        const title:string = await this.page.title();
        if(title)
            return true;
        return false
    }

    async clickMyAccount(): Promise<void>
    {
        try
        {
            await this.linkMyAccount.click();
        }
        catch(error)
        {
            console.log(`Exception occured while clicking 'My Account': ${error}`);
            throw error;   
        }
    }

    async clickLogin(): Promise<void>
    {
        try
        {
            await this.linkLogin.click();
        }
        catch(error)
        {
            console.log(`Exception occured while clicking 'Login': ${error}`);
            throw error;
        }
    }

    async clickRegister(): Promise<void>
    {
        try
        {
            await this.linkRegister.click();
        }
        catch(error)
        {
            console.log(`Exception occured while clicking 'Register': ${error}`);
            throw error;
        }
    }

    async enterProductName(productName:string): Promise<void>
    {
        try
        {
            await this.txtSearchBox.fill(productName);
        }
        catch(error)
        {
            console.log(`Exception occured while entering product name: ${error}`);
            throw error;
        }
    }

    async clickSearch(): Promise<void>
    {
        try
        {
            await this.btnSearch.click();
        }
        catch(error)
        {
            console.log(`Exception occured while clicking 'Search': ${error}`);
            throw error;
        }
    }
}