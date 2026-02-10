/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */

class CheckoutObjects{
    constructor(page){
        /**@type {Page}*/
        this.page = page;
        this.inputFirstName     = this.page.locator("//input[@id='first-name' or @data-test='firstName']");
        this.inputLastName      = this.page.locator("//input[@id='last-name' or @data-test='lastName']");
        this.inputPostalCode    = this.page.locator("//input[@id='postal-code' or @data-test='postalCode']");
        this.buttonContinue     = this.page.locator("//input[@id='continue' or @data-test='continue']");
        this.buttonCancel       = this.page.locator("//button[@id='cancel' or @data-test='cancel']");
        this.buttonError        = this.page.locator("//button[@data-test='error-button']");
        this.headerError        = this.page.locator("//h3[@data-test='error']");
        this.emptyFirstName     = this.page.locator("//h3[@data-test='error' and contains(text(),'First Name is required')]");
        this.emptyLastName      = this.page.locator("//h3[@data-test='error' and contains(text(),'Last Name is required')]");
        this.emptyPostalCode    = this.page.locator("//h3[@data-test='error' and contains(text(),'Postal Code is required')]");
        this.labelSubTotal      = this.page.locator("//div[@data-test='subtotal-label']");
        this.labelTotal         = this.page.locator("//div[@data-test='total-label']");
        this.buttonFinish       = this.page.locator("//button[@id='finish' or data-test='finish']");
        this.titleComplete      = this.page.locator("//span[@data-test='title' and contains(text(),'Complete!')]");
        this.headerComplete     = this.page.locator("//h2[@data-test='complete-header' and contains(text(),'Thank you')]");
    }
}

export { CheckoutObjects };
