import { Page, Locator } from '@playwright/test';
import { CheckoutPage } from './CheckoutPage';

export class ShoppingCartPage {
    private readonly page: Page;
    
    private readonly lblTotalPrice: Locator;
    private readonly btnCheckout: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.lblTotalPrice = this.page.locator(".table-striped .text-right + .text-right");
        this.btnCheckout = this.page.locator("a[class='btn btn-primary']");
    }

    async getTotalPrice(): Promise<string | null> {
        try {
            return await this.lblTotalPrice.textContent();
        } catch (error) {
            console.log(`Unable to retrieve total price: ${error}`);
            return null;
        }
    }

    async clickOnCheckout(): Promise<CheckoutPage> {
        await this.btnCheckout.click();
        return new CheckoutPage(this.page);
    }

    async isPageLoaded(): Promise<boolean> {
        try {
            return await this.btnCheckout.isVisible();
        } catch (error) {
            return false;
        }
    }
}