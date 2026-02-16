/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */

class LoginObjects{

    constructor(page){
        /**@type {Page}*/
        this.page = page;
    
        /** @type {Locator}*/
        this.containerLogin     = this.page.locator("//div[@id='login_button_container']");
        /** @type {Locator}*/
        this.containerUserName  = this.page.locator("//div[@id ='login_credentials' or data-test='login-credentials']");
        /** @type {Locator}*/
        this.inputUserName      = this.page.locator("//input[@id='user-name' or data-test='username']");
        /** @type {Locator}*/
        this.inputPassword      = this.page.locator("//input[@id='password' or data-test='password']");
        /** @type {Locator}*/
        this.buttonLogin        = this.page.locator("//input[@id='login-button' or @data-test='login-button']");
        /** @type {Locator}*/
        this.buttonError        = this.page.locator("//h3[@data-test='error']/button[@data-test='error-button']");
        /** @type {Locator}*/
        this.headerError        = this.page.locator("//h3[@data-test='error']");
        /** @type {Locator}*/
        this.emptyUsername      = this.page.locator("//h3[@data-test='error' and contains(text(),'Username is required')]");
        /** @type {Locator}*/
        this.emptyPassword      = this.page.locator("//h3[@data-test='error' and contains(text(),'Password is required')]");
        /** @type {Locator}*/
        this.invalidCredential  = this.page.locator("//h3[@data-test='error' and contains(text(),'Username and password do not match')]");
        /** @type {Locator}*/
        this.locked_out_user    = this.page.locator("//h3[@data-test='error' and contains(text(),'Sorry, this user has been locked out')]");
    }
}

export { LoginObjects };
