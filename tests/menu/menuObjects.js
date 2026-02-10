/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */

class MenuObjects{
    constructor(page){
        /**@type {Page}*/
        this.page = page;
        this.menuOpen       = this.page.locator("//button[@id='react-burger-menu-btn']");
        this.menuClose      = this.page.locator("//button[@id='react-burger-cross-btn']");
        this.menuAllItems   = this.page.locator("//a[@id='inventory_sidebar_link' or @data-test='inventory-sidebar-link']");
        this.menuLogout     = this.page.locator("//a[@id='logout_sidebar_link' or @data-test='logout-sidebar-link']");
        this.menuResetApp   = this.page.locator("//a[@id='reset_sidebar_link' or @data-test='reset-sidebar-link']");
        this.logoutSuccess  = this.page.locator("//div[@id='login_button_container']");
    }
}

export { MenuObjects };
