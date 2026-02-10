import { MenuObjects } from "./menuObjects";

class MenuActions{
    constructor(page){
        this.page = page;
        /** @type {MenuObjects} */
        this.menuLocator = new MenuObjects(page);
    }
    
    async clickMenuOptions(action){
        await this.menuLocator.menuOpen.waitFor({ state: 'attached'});
        await this.menuLocator.menuOpen.waitFor({ state: 'visible' });
        await this.menuLocator.menuOpen.click();
        await this.menuLocator.menuResetApp.waitFor({ state: 'attached'});
        await this.menuLocator.menuResetApp.waitFor({ state: 'visible' });
        const isMenuResetEnabled = await this.menuLocator.menuResetApp.isEnabled();
        await this.menuLocator.menuLogout.waitFor({ state: 'attached'});
        await this.menuLocator.menuLogout.waitFor({ state: 'visible' });
        const isMenuLogoutEnabled = await this.menuLocator.menuLogout.isEnabled();
        if (isMenuResetEnabled && isMenuLogoutEnabled){
            if (action === 'reset'){
                await this.menuLocator.menuResetApp.click();
                await this.menuLocator.menuClose.click();
            } else if (action === 'logout'){
                await this.menuLocator.menuLogout.click();
            }
        } else {
            console.log("Menu options are disabled");
        }
    }
}

export { MenuActions };

