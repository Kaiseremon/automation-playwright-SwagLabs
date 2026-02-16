import { CartObjects } from "./cartObjects";

class CartActions{
    
    constructor(page){
        this.page = page;
        /** @type {CartObjects} */
        this.cartLocator = new CartObjects(page);
    }

    async getNumberOfAddedProducts(){
        await this.cartLocator.cartList.waitFor({ state: 'attached'});
        await this.cartLocator.cartList.waitFor({ state: 'visible' });
        return await this.cartLocator.noOfAddedProducts.count();
    }
    async getNameOfAddedProduct(){
        await this.cartLocator.nameOfAddedProduct.first().waitFor({ state: 'attached'});
        await this.cartLocator.nameOfAddedProduct.first().waitFor({ state: 'visible' });
        return await this.cartLocator.nameOfAddedProduct.allTextContents();
    }
    async getPriceOfAddedProduct(){
        await this.cartLocator.priceOfAddedProduct.first().waitFor({ state: 'attached'});
        await this.cartLocator.priceOfAddedProduct.first().waitFor({ state: 'visible' });
        return await this.cartLocator.priceOfAddedProduct.allTextContents();
    }
    async clickButtonCheckout(){
        await this.cartLocator.buttonCheckout.waitFor({ state: 'attached'});
        await this.cartLocator.buttonCheckout.waitFor({ state: 'visible' });
        await this.cartLocator.buttonCheckout.click();
    }
}

export { CartActions };
