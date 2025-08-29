import { Page, Locator, expect } from '@playwright/test';
import { LogoutPage } from './LogoutPage';

export class MyAccountPage
{
    private readonly page: Page;
    private readonly msgHeading: Locator;
    private readonly linkLogout: Locator;

    constructor(page: Page)
    {
        this.page = page;

        this.msgHeading = this.page.locator('h2:has-text("My Account")');
        this.linkLogout = this.page.locator('text="Logout"').nth(1);
    }

    async doesMyAccountPageExists(): Promise<boolean>
    {
        try
        {
            const isVisible = await this.msgHeading.isVisible();
            return isVisible;
        }
        catch(error)
        {
            console.log(`Error checking My Account page heading visibility: ${error}`);
            return false;
        }
    }

    async clickLogout(): Promise<LogoutPage>
    {
        try
        {
            await this.linkLogout.click();
            return new LogoutPage(this.page);
        }
        catch(error)
        {
            console.log('Unable to click Logout link: ', error);
            throw error;
        }
    }

    async getPagetitle(): Promise<string>
    {
        return await this.page.title();
    }
}