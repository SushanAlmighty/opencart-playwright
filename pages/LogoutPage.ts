import { Page, Locator} from '@playwright/test';
import { HomePage } from './HomePage';

export class LogoutPage
{
    private readonly page: Page;
    private readonly btnContinue: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.btnContinue = this.page.locator('.btn.btn-primary');
    }

    async clickContinue(): Promise<HomePage>
    {
        try
        {
            await this.btnContinue.click();
            return new HomePage(this.page);
        }
        catch(error)
        {
            console.log(`Exception occured while clicking 'Logout': ${error}`);
            throw error;
        }
    }

    async isContinueButtonVisible(): Promise<boolean>
    {
        try
        {
            return await this.btnContinue.isVisible();
        }
        catch(error)
        {
            console.log(`Exception occured while locating 'Continue' button: ${error}`);
            throw error;
        }
    }
}