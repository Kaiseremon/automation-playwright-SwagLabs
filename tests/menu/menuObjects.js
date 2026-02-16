/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */

class MenuObjects{

    constructor(page){
        /**@type {Page}*/
        this.page = page;

        /** @type {Locator}*/
        this.menuOpen       = this.page.locator("//button[@id='react-burger-menu-btn']");
        /** @type {Locator}*/
        this.menuClose      = this.page.locator("//button[@id='react-burger-cross-btn']");
        /** @type {Locator}*/
        this.menuAllItems   = this.page.locator("//a[@id='inventory_sidebar_link' or @data-test='inventory-sidebar-link']");
        /** @type {Locator}*/
        this.menuLogout     = this.page.locator("//a[@id='logout_sidebar_link' or @data-test='logout-sidebar-link']");
        /** @type {Locator}*/
        this.menuResetApp   = this.page.locator("//a[@id='reset_sidebar_link' or @data-test='reset-sidebar-link']");
        /** @type {Locator}*/
        this.logoutSuccess  = this.page.locator("//div[@id='login_button_container']");
    }
}

export { MenuObjects };
