/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */

class LoginObjects{
    constructor(page){
        /**@type {Page}*/
        this.page = page;
        this.containerLogin = this.page.locator("//div[@id='login_button_container']"); 
        this.inputUserName  = this.page.locator("//input[@id='user-name' or data-test='username']");
        this.inputPassword  = this.page.locator("//input[@id='password' or data-test='password']");
        this.buttonLogin    = this.page.locator("//input[@id='login-button' or @data-test='login-button']");
        this.buttonError    = this.page.locator("//h3[@data-test='error']/button[@data-test='error-button']");
        this.headerError     = this.page.locator("//h3[@data-test='error']");
        this.emptyUsername      = this.page.locator("//h3[@data-test='error' and contains(text(),'Username is required')]");
        this.emptyPassword      = this.page.locator("//h3[@data-test='error' and contains(text(),'Password is required')]");
        this.invalidCredential  = this.page.locator("//h3[@data-test='error' and contains(text(),'Username and password do not match')]");
        this.locked_out_user    = this.page.locator("//h3[@data-test='error' and contains(text(),'Sorry, this user has been locked out')]");
    }
}

export { LoginObjects };
