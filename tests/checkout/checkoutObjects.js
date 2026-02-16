/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */

class CheckoutObjects{

    constructor(page){
        /**@type {Page}*/
        this.page = page;

        /** @type {Locator}*/
        this.inputFirstName     = this.page.locator("//input[@id='first-name' or @data-test='firstName']");
        /** @type {Locator}*/
        this.inputLastName      = this.page.locator("//input[@id='last-name' or @data-test='lastName']");
        /** @type {Locator}*/
        this.inputPostalCode    = this.page.locator("//input[@id='postal-code' or @data-test='postalCode']");
        /** @type {Locator}*/
        this.buttonContinue     = this.page.locator("//input[@id='continue' or @data-test='continue']");
        /** @type {Locator}*/
        this.buttonCancel       = this.page.locator("//button[@id='cancel' or @data-test='cancel']");
        /** @type {Locator}*/
        this.buttonError        = this.page.locator("//button[@data-test='error-button']");
        /** @type {Locator}*/
        this.headerError        = this.page.locator("//h3[@data-test='error']");
        /** @type {Locator}*/
        this.emptyFirstName     = this.page.locator("//h3[@data-test='error' and contains(text(),'First Name is required')]");
        /** @type {Locator}*/
        this.emptyLastName      = this.page.locator("//h3[@data-test='error' and contains(text(),'Last Name is required')]");
        /** @type {Locator}*/
        this.emptyPostalCode    = this.page.locator("//h3[@data-test='error' and contains(text(),'Postal Code is required')]");
        /** @type {Locator}*/
        this.labelSubTotal      = this.page.locator("//div[@data-test='subtotal-label']");
        /** @type {Locator}*/
        this.labelTotal         = this.page.locator("//div[@data-test='total-label']");
        /** @type {Locator}*/
        this.buttonFinish       = this.page.locator("//button[@id='finish' or data-test='finish']");
        /** @type {Locator}*/
        this.titleComplete      = this.page.locator("//span[@data-test='title' and contains(text(),'Complete!')]");
        /** @type {Locator}*/
        this.headerComplete     = this.page.locator("//h2[@data-test='complete-header' and contains(text(),'Thank you')]");
    }
}

export { CheckoutObjects };
