/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */

class CartObjects{

    constructor(page){
        /**@type {Page}*/
        this.page = page;        
    
        /** @type {Locator}*/
        this.cartList               = this.page.locator("[data-test='cart-list']");
        //this.noOfAddedProducts    = this.page.locator("//div[@data-test='cart-list']/div[@data-test='inventory-item']");
        /** @type {Locator}*/
        this.noOfAddedProducts      = this.page.locator("[data-test='inventory-item']");
        //this.nameOfAddedProducts  = this.page.locator("//div[@data-test='inventory-item']//div[@data-test='inventory-item-name']");
        /** @type {Locator}*/
        this.nameOfAddedProduct     = this.page.locator("[data-test='inventory-item-name']");
        //this.priceOfAddedProducts = this.page.locator("//div[@data-test='inventory-item']//div[@data-test='inventory-item-price']");
        /** @type {Locator}*/
        this.priceOfAddedProduct    = this.page.locator("[data-test='inventory-item-price']");
        /** @type {Locator}*/
        this.buttonRemove           = this.page.locator("//div[@data-test='inventory-item']//button[contains(text(), 'Remove')]");
        /** @type {Locator}*/
        this.buttonContinue         = this.page.locator("//button[@id='continue-shopping' or @data-test='continue-shopping']");
        /** @type {Locator}*/
        this.buttonCheckout         = this.page.locator("//button[@id='checkout' or @data-test='checkout']");
    }
}

export { CartObjects };
