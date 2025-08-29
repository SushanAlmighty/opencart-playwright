import {Page, Locator} from '@playwright/test';

export class LoginPage
{
    private readonly page:Page;
    private readonly txtEmail: Locator;
    private readonly txtPassword: Locator;
    private readonly btnLogin:Locator;
    private readonly txtErrorMessage: Locator;

    constructor(page: Page)
    {
        this.page = page;

        this.txtEmail = this.page.getByPlaceholder('E-Mail Address');
        this.txtPassword = this.page.getByPlaceholder('Password');
        this.btnLogin = this.page.locator('[value="Login"]');
        this.txtErrorMessage = this.page.locator('.alert.alert-danger.alert-dismissible');
    }

    async setEmail(email:string): Promise<void>
    {
        try
        {
            await this.txtEmail.fill(email);
        }
        catch(error)
        {
            console.log(`Exception occured while entering Email: ${error}`);
            throw error;
        }
    }

    async setPassword(password:string): Promise<void>
    {
        try
        {
            await this.txtPassword.fill(password);
        }
        catch(error)
        {
            console.log(`Exception occured while entering Password: ${error}`);
            throw error;
        }
    }

    async clickLogin(): Promise<void>
    {
        try
        {
            await this.btnLogin.click();
        }
        catch(error)
        {
            console.log(`Exception occured while clicking 'Login': ${error}`);
            throw error;
        }
    }

    async login(email: string, password: string): Promise<void>
    {
        await this.setEmail(email);
        await this.setPassword(password);
        await this.clickLogin();
    }

    async getLoginErrorMsg(): Promise<string | undefined>
    {
        return (await this.txtErrorMessage.textContent())?.trim();
    }
}