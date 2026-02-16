import { InventoryObjects } from "./inventoryObjects";

class InventoryActions{
    
    constructor(page){
        this.page = page;
        /** @type {InventoryObjects} */
        this.inventoryLocator = new InventoryObjects(page);
    }
    
    async getNumberOfAllProducts(){
        await this.inventoryLocator.inventoryList.waitFor({ state: 'attached'});
        await this.inventoryLocator.inventoryList.waitFor({ state: 'visible' });        
        return await this.inventoryLocator.noOfProducts.count();
    }
    async getNameOfAllProduct(){
        await this.inventoryLocator.nameOfEachProduct.first().waitFor({ state: 'attached'});
        await this.inventoryLocator.nameOfEachProduct.first().waitFor({ state: 'visible' });
        return await this.inventoryLocator.nameOfEachProduct.allTextContents();
    }
    async getPriceOfAllProduct(){
        await this.inventoryLocator.priceOfEachProduct.first().waitFor({ state: 'attached'});
        await this.inventoryLocator.priceOfEachProduct.first().waitFor({ state: 'visible' });
        return await this.inventoryLocator.priceOfEachProduct.allTextContents();
    }
    async addToCart(items){
        //button[@id='add-to-cart-sauce-labs-backpack']
        const productNames = await this.getNameOfAllProduct();
        for(let i =0; i<items; i++ ){
            let eachProductName = productNames[i];
            eachProductName = eachProductName.toLowerCase();
            eachProductName = eachProductName.replaceAll(" ", "-");
            await this.page.locator(`//button[@id='add-to-cart-${eachProductName}']`).click();
        }
    }
    async getCartIconBadge(){
        await this.inventoryLocator.iconCartBadge.waitFor({ state: 'attached'});
        await this.inventoryLocator.iconCartBadge.waitFor({ state: 'visible' });
        return await this.inventoryLocator.iconCartBadge.innerText();
    }
    async clickDropdownFilter(){
        await this.inventoryLocator.dropDownFilter.waitFor({ state: 'attached'});
        await this.inventoryLocator.dropDownFilter.waitFor({ state: 'visible' });
        await this.inventoryLocator.dropDownFilter.selectOption('za');
    }
    async clickIconCart(){
        await this.inventoryLocator.iconCart.waitFor({ state: 'attached'});
        await this.inventoryLocator.iconCart.waitFor({ state: 'visible' });
        await this.inventoryLocator.iconCart.click();
    }
}

export { InventoryActions };
