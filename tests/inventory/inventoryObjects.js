/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */

class InventoryObjects{
    constructor(page){
        /**@type {Page}*/
        this.page = page;

        /** @type {Locator}*/
        this.iconCart               = this.page.locator("//div[@id='shopping_cart_container']/a[@data-test='shopping-cart-link']");
        /** @type {Locator}*/
        this.dropDownFilter         = this.page.locator("//select[@data-test='product-sort-container']");
        /** @type {Locator}*/
        this.inventoryList          = this.page.locator("[data-test='inventory-list']");
        /** @type {Locator}*/
        this.noOfProducts           = this.page.locator("[data-test='inventory-item']");
        //this.nameOfEachproduct    = this.page.locator("//div[@data-test='inventory-item']//div[@data-test='inventory-item-name']");
        /** @type {Locator}*/
        this.nameOfEachProduct      = this.page.locator("[data-test='inventory-item-name']");
        //this.priceOfEachProduct   = this.page.locator("//div[@data-test='inventory-item']//div[@data-test='inventory-item-price']");
        /** @type {Locator}*/
        this.priceOfEachProduct     = this.page.locator("[data-test='inventory-item-price']");
        /** @type {Locator}*/
        this.buttonAddToCart        = this.page.locator("//div[@data-test='inventory-item']//button[contains(text(),'Add to cart')]");
        /** @type {Locator}*/
        this.iconCartBadge          = this.page.locator("//div[@id='shopping_cart_container']//span[@data-test='shopping-cart-badge']");    
    }
}
export { InventoryObjects };
