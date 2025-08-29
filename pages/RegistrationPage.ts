import {Page, expect, Locator} from '@playwright/test';

export class RegistrationPage
{
    private readonly page:Page;
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtTelephone: Locator;
    private readonly txtPassword: Locator;
    private readonly txtConfirmPassword: Locator;
    private readonly checkedPolicy: Locator;
    private readonly btnContinue: Locator;
    private readonly msgConfirmation: Locator;

    constructor(page:Page)
    {
        this.page = page;

        this.txtFirstName = this.page.getByPlaceholder("First Name");
        this.txtLastName = this.page.getByPlaceholder("Last Name");
        this.txtEmail = this.page.getByPlaceholder("E-mail");
        this.txtTelephone = this.page.getByPlaceholder("Telephone");
        this.txtPassword = this.page.getByPlaceholder("Password", {exact: true});
        this.txtConfirmPassword = this.page.getByPlaceholder("Password Confirm");
        this.checkedPolicy = this.page.locator("[type='checkbox']");
        this.btnContinue = this.page.locator("[value='Continue']");
        this.msgConfirmation = this.page.locator('h1:has-text("Your Account Has Been Created!")');
    }

    async setFirstName(firstName:string): Promise<void>
    {
        try
        {
            await this.txtFirstName.fill(firstName);
        }
        catch(error)
        {
            console.log(`Exception occured while entering First Name: ${error}`);
            throw error;
        }
    }

    async setLastName(lastName:string): Promise<void>
    {
        try
        {
            await this.txtLastName.fill(lastName);
        }
        catch(error)
        {
            console.log(`Exception occured while entering Last Name: ${error}`);
            throw error;
        }
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

    async setTelephone(telePhone:string): Promise<void>
    {
        try
        {
            await this.txtTelephone.fill(telePhone);
        }
        catch(error)
        {
            console.log(`Exception occured while entering Telephone: ${error}`);
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

    async setConfirmPassword(confirmPassword:string): Promise<void>
    {
        try
        {
            await this.txtConfirmPassword.fill(confirmPassword);
        }
        catch(error)
        {
            console.log(`Exception occured while entering confirm Password: ${error}`);
            throw error;
        }
    }

    async setPrivacyPolicy(): Promise<void>
    {
        try
        {
            await this.checkedPolicy.check();
        }
        catch(error)
        {
            console.log(`Exception occured while checking Privacy Policy: ${error}`);
            throw error;
        }
    }

    async clickContinue(): Promise<void>
    {
        try
        {
            await this.btnContinue.click();
        }
        catch(error)
        {
            console.log(`Exception occured while clicking 'Continue': ${error}`);
            throw error;
        }
    }

    async getConfirmationMsg(): Promise<string>
    {
        try
        {
            return await this.msgConfirmation.textContent() ?? '';
        }
        catch(error)
        {
            console.log(`Exception occured while getting confirmation message: ${error}`);
            throw error;
        }
    }

    async completeRegistration(userData: {
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        password: string,
    }): Promise<void>
    {
        await this.setFirstName(userData.firstName);
        await this.setLastName(userData.lastName);
        await this.setEmail(userData.email);
        await this.setTelephone(userData.telephone);
        await this.setPassword(userData.password);
        await this.setConfirmPassword(userData.password);
        await this.setPrivacyPolicy();
        await this.clickContinue();
        await expect(this.msgConfirmation).toBeVisible();
    }
}