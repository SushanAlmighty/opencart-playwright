import { Page, Locator } from '@playwright/test';
import { ProductPage } from './ProductPage';

export class SearchResultsPage {
    private readonly page: Page;
    
    private readonly searchPageHeader: Locator;
    private readonly searchProducts: Locator;

    constructor(page: Page) {
        this.page = page;

        this.searchPageHeader = this.page.locator('#content h1');
        this.searchProducts = this.page.locator('h4>a');
        
    }

    async isSearchResultsPageExists(): Promise<boolean> {
        try {
            const headerText = await this.searchPageHeader.textContent();
            return headerText?.includes('Search -') ?? false;
        } catch (error) {
            return false;
        }
    }

    async isProductExist(productName: string): Promise<boolean> {
        try {
            const count = await this.searchProducts.count();
            for (let i = 0; i < count; i++) {
                const product = this.searchProducts.nth(i);
                 const title = await product.textContent();
                 if (title === productName) {
                    return true;
                }
            }
        } catch (error) {
            console.log(`Error checking product existence: ${error}`);
        }
        return false;
    }

    async selectProduct(productName: string): Promise<ProductPage | null> {
        try {
            const count = await this.searchProducts.count();
            for (let i = 0; i < count; i++) {
                const product = this.searchProducts.nth(i);
                const title = await product.textContent();
                if (title === productName) {
                    await product.click();
                    return new ProductPage(this.page);
                }
            }
            console.log(`Product not found: ${productName}`);
        } catch (error) {
            console.log(`Error selecting product: ${error}`);
        }
        return null;
    }

    async getProductCount(): Promise<number> {
        return await this.searchProducts.count();
    }
}