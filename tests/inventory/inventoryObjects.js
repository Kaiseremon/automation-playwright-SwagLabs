/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */

class InventoryObjects{
    constructor(page){
        /**@type {Page}*/
        this.page = page;
        this.iconCart               = this.page.locator("//div[@id='shopping_cart_container']/a[@data-test='shopping-cart-link']");
        this.dropDownFilter         = this.page.locator("//select[@data-test='product-sort-container']");
        this.inventoryList          = this.page.locator("[data-test='inventory-list']");
        this.noOfProducts           = this.page.locator("[data-test='inventory-item']");
        //this.nameOfEachproduct    = this.page.locator("//div[@data-test='inventory-item']//div[@data-test='inventory-item-name']");
        this.nameOfEachProduct      = this.page.locator("[data-test='inventory-item-name']");
        //this.priceOfEachProduct   = this.page.locator("//div[@data-test='inventory-item']//div[@data-test='inventory-item-price']");
        this.priceOfEachProduct     = this.page.locator("[data-test='inventory-item-price']");
        this.buttonAddToCart        = this.page.locator("//div[@data-test='inventory-item']//button[contains(text(),'Add to cart')]");
        this.iconCartBadge          = this.page.locator("//div[@id='shopping_cart_container']//span[@data-test='shopping-cart-badge']");    
    }
}

export { InventoryObjects };
