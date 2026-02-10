import { LoginObjects } from "./loginObjects";

class LoginActions{
    constructor(page){
        this.page = page;
        /** @type {LoginObjects} */
        this.loginLocator = new LoginObjects(page);
    }

    async isLoginPage(){
        await this.loginLocator.containerLogin.waitFor({ state: 'attached'});
        await this.loginLocator.containerLogin.waitFor({ state: 'visible' });
        return await this.loginLocator.containerLogin.isVisible();
    }
    async enterUserName(enterText){
        await this.loginLocator.inputUserName.waitFor({ state: 'attached'});
        await this.loginLocator.inputUserName.waitFor({ state: 'visible' });
        await this.loginLocator.inputUserName.clear();
        await this.loginLocator.inputUserName.fill(enterText);
    }
    async enterPassword(enterText){
        await this.loginLocator.inputPassword.waitFor({ state: 'attached'});
        await this.loginLocator.inputPassword.waitFor({ state: 'visible' });
        await this.loginLocator.inputPassword.clear();
        await this.loginLocator.inputPassword.fill(enterText);
    }
    async clickButtonLogin(){
        await this.loginLocator.buttonLogin.waitFor({ state: 'attached'});
        await this.loginLocator.buttonLogin.waitFor({ state: 'visible' });
        const isEnabled = await this.loginLocator.buttonLogin.isEnabled();
        if (isEnabled) {
            await this.loginLocator.buttonLogin.click();
        } else {
            console.log("Button is disabled");
        }
    }
    async clickButtonError(){
        await this.loginLocator.buttonError.waitFor({ state: 'attached'});
        await this.loginLocator.buttonError.waitFor({ state: 'visible' });
        const isEnabled = await this.loginLocator.buttonError.isEnabled();
        if (isEnabled) {
            await this.loginLocator.buttonError.click();
        } else {
            console.log("Error Button is disabled");
        }
    }
    async validateLoginErrorMessage(){
        await this.loginLocator.headerError.waitFor({ state: 'attached'});
        await this.loginLocator.headerError.waitFor({ state: 'visible' });
        return await this.loginLocator.headerError.innerText();
    }
    async isError(label) {
        await this.loginLocator.headerError.waitFor({ state: 'attached'});
        await this.loginLocator.headerError.waitFor({ state: 'visible' });
        const map = {
            username        : this.loginLocator.emptyUsername,
            password        : this.loginLocator.emptyPassword,
            invalid         : this.loginLocator.invalidCredential,
            locked_user     : this.loginLocator.locked_out_user,
        };
        const hiddenLocator = map[label];
        if (!hiddenLocator) return false;
        return await hiddenLocator.isVisible();
    }
}

export { LoginActions };

