import { CheckoutObjects } from "./checkoutObjects";

class CheckoutActions{
    
    constructor(page){
        this.page = page;
        /** @type {CheckoutObjects} */
        this.checkoutLocator = new CheckoutObjects(page);
    }
    
    async enterFirstName(enterText){
        await this.checkoutLocator.inputFirstName.waitFor({ state: 'attached'});
        await this.checkoutLocator.inputFirstName.waitFor({ state: 'visible' });
        await this.checkoutLocator.inputFirstName.clear();
        await this.checkoutLocator.inputFirstName.fill(enterText);
    }
    async enterLastName(enterText){
        await this.checkoutLocator.inputLastName.waitFor({ state: 'attached'});
        await this.checkoutLocator.inputLastName.waitFor({ state: 'visible' });
        await this.checkoutLocator.inputLastName.clear();
        await this.checkoutLocator.inputLastName.fill(enterText);
    }
    async enterPostalCode(enterText){
        await this.checkoutLocator.inputPostalCode.waitFor({ state: 'attached'});
        await this.checkoutLocator.inputPostalCode.waitFor({ state: 'visible' });
        await this.checkoutLocator.inputPostalCode.clear();
        await this.checkoutLocator.inputPostalCode.fill(enterText);
    }
    async clickButtonContinue(){
        await this.checkoutLocator.buttonContinue.waitFor({ state: 'attached'});
        await this.checkoutLocator.buttonContinue.waitFor({ state: 'visible' });
        await this.checkoutLocator.buttonContinue.click();
    }
    async clickButtonCancle(){
        await this.checkoutLocator.buttonCancel.waitFor({ state: 'attached'});
        await this.checkoutLocator.buttonCancel.waitFor({ state: 'visible' });
        await this.checkoutLocator.buttonCancel.click();
    }
    async clickButtonError(){
        await this.checkoutLocator.buttonError.waitFor({ state: 'attached'});
        await this.checkoutLocator.buttonError.waitFor({ state: 'visible' });
        await this.checkoutLocator.buttonError.click();
    }
    async isError(label) {
        await this.checkoutLocator.headerError.waitFor({ state: 'attached'});
        await this.checkoutLocator.headerError.waitFor({ state: 'visible' });
        const map = {
            firstName     : this.checkoutLocator.emptyFirstName,
            lastName      : this.checkoutLocator.emptyLastName,
            postalCode    : this.checkoutLocator.emptyPostalCode,
        };
        const hiddenLocator = map[label];
        if (!hiddenLocator) return false;
        return await hiddenLocator.isVisible();
    }
    async getSumOfIndividualProductPrice(price){
        let sumOfIndividualProductPrice = 0;
        for (let i = 0; i < price.length; i++) {
            const value = Number(price[i].replace('$', ''));
            sumOfIndividualProductPrice += value;
        }
        sumOfIndividualProductPrice = Number(sumOfIndividualProductPrice.toFixed(2));
        return sumOfIndividualProductPrice;
    }
    async getSubTotalPrice(){
        await this.checkoutLocator.labelSubTotal.waitFor({ state: 'attached'});
        await this.checkoutLocator.labelSubTotal.waitFor({ state: 'visible' });
        const totalString = await this.checkoutLocator.labelSubTotal.innerText();
        const total       = parseFloat(totalString.split("$")[1]);
        return total;
    }
    async clickButtonFinish(){
        await this.checkoutLocator.buttonFinish.waitFor({ state: 'attached'});
        await this.checkoutLocator.buttonFinish.waitFor({ state: 'visible' });
        await this.checkoutLocator.buttonFinish.click();
    }
    async isPurchaseSuccess(){
        await this.checkoutLocator.headerComplete.waitFor({ state: 'attached'});
        await this.checkoutLocator.headerComplete.waitFor({ state: 'visible' });
        return await this.checkoutLocator.headerComplete.innerText();
    }
}

export { CheckoutActions };

