import { Page, Locator, expect } from '@playwright/test';
import { ShoppingCartPage } from './ShoppingCartPage';

export class ProductPage {
    private readonly page: Page;
    
    private readonly txtQuantity: Locator;
    private readonly btnAddToCart: Locator;
    private readonly cnfMsg: Locator;
    private readonly btnItems: Locator;
    private readonly lnkViewCart: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.txtQuantity = this.page.locator('input[name="quantity"]');
        this.btnAddToCart = this.page.getByRole('button', { name: 'Add to Cart' });
        this.cnfMsg = this.page.locator('.alert.alert-success.alert-dismissible');
        this.btnItems = this.page.locator('#cart');
        this.lnkViewCart = this.page.locator('strong:has-text("View Cart")');
    }

    async setQuantity(qty: string): Promise<void> {
        await this.txtQuantity.fill('');
        await this.txtQuantity.fill(qty);
    }

    async addToCart(): Promise<void> {
        await this.btnAddToCart.click();
    }

    async isConfirmationMessageVisible(): Promise<boolean> {
        try {
            return await this.cnfMsg.isVisible();
           
        } catch (error) {
            console.log(`Confirmation message not found: ${error}`);
            return false;
        }
    }

    async clickItemsToNavigateToCart(): Promise<void> {
        await this.btnItems.click();
    }

    async clickViewCart(): Promise<ShoppingCartPage> {
        await this.lnkViewCart.click();
        return new ShoppingCartPage(this.page);
    }

    async addProductToCart(quantity: string): Promise<void> {
        await this.setQuantity(quantity);
        await this.addToCart();
        await this.isConfirmationMessageVisible();
    }
}