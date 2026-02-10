import { test, expect } from "@playwright/test";
import { LoginActions } from "../../login/loginActions";
/**@type {LoginActions}*/
let loginAction;
import { InventoryActions } from "../../inventory/inventoryActions";
/**@type {InventoryActions}*/
let inventoryAction;
import { CartActions } from "../../cart/cartActions";
/**@type {CartActions}*/
let cartAction;
import { CheckoutActions } from "../../checkout/checkoutActions";
/**@type {CheckoutActions}*/
let checkoutAction;
import { MenuActions } from "../../menu/menuActions";
/**@type {MenuActions}*/
let menuAction;

const username   = "standard_user";
const password   = "secret_sauce";
let ProductToAdd = 3;
const expectedPurchaseSuccessMsg = "Thank you for your order!";
let totalAvailableProducts, allProductName, allProductPrice, toBeAddedProductName, toBeAddedProductPrice, totalAddedProducts, addedProductNames, addedProductPrice;

test.describe.parallel("Test Suite-2-Q2: Login with standard_user, Add and Purchase any 3 product ", ()=>{

    test.beforeEach(async({ page }) => {
        loginAction     = new LoginActions(page);
        inventoryAction = new InventoryActions(page);
        cartAction      = new CartActions(page);
        checkoutAction  = new CheckoutActions(page);
        menuAction      = new MenuActions(page);
        await page.goto("/");
        await page.waitForURL("/", { timeout: 30000 });
        await loginAction.enterUserName(username);
        await loginAction.enterPassword(password);
        await loginAction.clickButtonLogin();
    });

    test("TCS-Q2.1: Login with ‘standard_user’ and verify user login", async({page})=>{
        await page.waitForURL("https://www.saucedemo.com/inventory.html", { timeout: 30000 });
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');    
    });
    
    test("TCS-Q2.2: Reset the App State", async({page})=>{
        await menuAction.clickMenuOptions('reset');
    });

    test("TCS-Q2.3: Add 3 items to cart and Navigate to the checkout page", async({page})=>{
        await test.step("• Step-1: Get the name & price of all the available products", async ()=>{
            totalAvailableProducts  = await inventoryAction.getNumberOfAllProducts();
            allProductName          = await inventoryAction.getNameOfAllProduct();
            allProductPrice         = await inventoryAction.getPriceOfAllProduct();
            expect(allProductName.length).toEqual(totalAvailableProducts);
        });
        await test.step("• Step-2: Select first 3 items from inventory and Add to cart", async ()=>{
            if (totalAvailableProducts >= ProductToAdd){
                toBeAddedProductName   = allProductName.slice(0, ProductToAdd);
                toBeAddedProductPrice  = allProductPrice.slice(0, ProductToAdd);
            }else{
                toBeAddedProductName   = allProductName;
                toBeAddedProductPrice  = allProductPrice;
                ProductToAdd           = totalAvailableProducts;
            }
            await inventoryAction.addToCart(ProductToAdd);
        });
        await test.step("• Step-3: Click on the 'Cart' icon", async ()=>{
            await inventoryAction.clickIconCart();
        });
        await test.step("• Step-4: Click 'Checkout' button to access Chekout info page", async ()=>{
            await cartAction.clickButtonCheckout();
            await page.waitForURL("https://www.saucedemo.com/checkout-step-one.html", { timeout: 30000 });
            await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
        });
        await test.step("• Step: Verify user could not proceed with incomplete credentials", async ()=>{
            await checkoutAction.clickButtonContinue();
            await expect(await checkoutAction.isError('firstName')).toBeTruthy();
            await checkoutAction.enterFirstName('');
            await checkoutAction.enterLastName('Habib');
            await checkoutAction.enterPostalCode('4210');
            await checkoutAction.clickButtonContinue();
            await expect(await checkoutAction.isError('firstName')).toBeTruthy();
            await checkoutAction.enterFirstName('Kaiser');
            await checkoutAction.enterLastName('');
            await checkoutAction.enterPostalCode('4210');
            await checkoutAction.clickButtonContinue();
            await expect(await checkoutAction.isError('lastName')).toBeTruthy();
            await checkoutAction.enterFirstName('Kaiser');
            await checkoutAction.enterLastName('Habib');
            await checkoutAction.enterPostalCode('');
            await checkoutAction.clickButtonContinue();
            await expect(await checkoutAction.isError('postalCode')).toBeTruthy();
            //await checkoutAction.clickButtonError();
        });
        await test.step("• Step-5: Keyin and submit the valid Checkout Information", async ()=>{  
            await checkoutAction.enterFirstName('Kaiser');
            await checkoutAction.enterLastName('Habib');
            await checkoutAction.enterPostalCode('4210');
            await checkoutAction.clickButtonContinue();                   
        });
        await test.step(`• Step-6: Verify that ${ProductToAdd} itmes have been added to the cart`, async ()=>{
            totalAddedProducts = await cartAction.getNumberOfAddedProducts();
            expect(totalAddedProducts).toEqual(ProductToAdd);
        });
        await test.step("• Step-7: Verify that only the added product names are present in the cart", async ()=>{
            addedProductNames = await cartAction.getNameOfAddedProduct();
            expect(addedProductNames).toEqual(toBeAddedProductName);
        });
        await test.step("• Step-8: Verify that price of individual added product matches in the cart", async ()=>{
            addedProductPrice  = await cartAction.getPriceOfAddedProduct();
            expect(addedProductPrice).toEqual(toBeAddedProductPrice);
        });
        await test.step("• Step-9: Verify the sum of individual added product price matches with cart total price", async ()=>{
            const sumOfIndividualProductPrice = await checkoutAction.getSumOfIndividualProductPrice(toBeAddedProductPrice);
            const totalPrice = await checkoutAction.getSubTotalPrice();
            expect(sumOfIndividualProductPrice).toEqual(totalPrice);
        });
        await test.step("• Step-10: Verify the successful order completion message", async ()=>{
            await checkoutAction.clickButtonFinish();
            const actualPurchaseSuccessMsg = await checkoutAction.isPurchaseSuccess();
            expect(actualPurchaseSuccessMsg).toEqual(expectedPurchaseSuccessMsg);
        });
        await test.step("• Step-11: Reset the App State", async ()=>{
            await menuAction.clickMenuOptions('reset');
        });
        await test.step("• Step-12: Logout the current user", async ()=>{
            await menuAction.clickMenuOptions('logout');
        });
        await test.step("• Step-13: Verify the user logged out successfully", async ()=>{
            await page.waitForURL("/", { timeout: 30000 });
            await expect(page).toHaveURL("/");
            expect(await loginAction.isLoginPage()).toBeTruthy();
        });
    });
});

