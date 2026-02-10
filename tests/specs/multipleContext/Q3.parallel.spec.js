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

const username   = "performance_glitch_user";
const password   = "secret_sauce";
let ProductToAdd = 1;
const expectedPurchaseSuccessMsg = "Thank you for your order!";
let totalAvailableProducts_BF, allProductName_BF, allProductPrice_BF, totalAvailableProducts, allProductName, allProductPrice, toBeAddedProductName, toBeAddedProductPrice, totalAddedProducts, addedProductNames, addedProductPrice;

test.describe("Test Suite-3-Q3: Log in with ‘performance_glitch_user’, Filter and Purchase a product", ()=>{

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

    test("TCS-Q3.1: Login with ‘performance_glitch_user’ and verify user login", async({page})=>{
        await page.waitForURL("https://www.saucedemo.com/inventory.html", { timeout: 60000 });
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });
    
    test("TCS-Q3.2: Reset the App State", async({page})=>{
        await menuAction.clickMenuOptions('reset');
    });

    test("TCS-Q3.3: Filter/Sort the available products by name (Z to A)", async({page})=>{
        await test.step("• Step-1: Get name & price of all the products BEFORE Filter", async ()=>{
            totalAvailableProducts_BF  = await inventoryAction.getNumberOfAllProducts();
            allProductName_BF          = await inventoryAction.getNameOfAllProduct();
            allProductPrice_BF         = await inventoryAction.getPriceOfAllProduct();
            expect(allProductName_BF.length).toEqual(totalAvailableProducts_BF);
        });
        await test.step("• Step-2:  Click Filter and select 'Name (Z to A)' option", async ()=>{
            await inventoryAction.clickDropdownFilter();
        });
        await test.step("• Step-3: Get name & price of all the products AFTER Filter", async ()=>{
            totalAvailableProducts  = await inventoryAction.getNumberOfAllProducts();
            allProductName          = await inventoryAction.getNameOfAllProduct();
            allProductPrice         = await inventoryAction.getPriceOfAllProduct();
            expect(allProductName.length).toEqual(totalAvailableProducts);
            expect(totalAvailableProducts_BF).toEqual(totalAvailableProducts);
        });
        await test.step("• Step-4: Verify products are sorted in discending order alphabetically", async ()=>{
            let productZtoA  = allProductName_BF;
            productZtoA      = productZtoA.reverse();
            expect(productZtoA).toEqual(allProductName);
        });
        await test.step("• Step-5: Select first item from inventory and Add to cart", async ()=>{
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
        await test.step("• Step-6: Click on the 'Cart' icon", async ()=>{
            await inventoryAction.clickIconCart();
        });
        await test.step("• Step-7: Click 'Checkout' button to access Chekout info page", async ()=>{
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
            await checkoutAction.clickButtonError();
        });
        await test.step("• Step-8: Keyin and submit the valid Checkout Information", async ()=>{  
            await checkoutAction.enterFirstName('Kaiser');
            await checkoutAction.enterLastName('Habib');
            await checkoutAction.enterPostalCode('4210');
            await checkoutAction.clickButtonContinue();                   
        });
        await test.step(`• Step-9: Verify that ${ProductToAdd} itmes have been added to the cart`, async ()=>{
            totalAddedProducts = await cartAction.getNumberOfAddedProducts();
            expect(totalAddedProducts).toEqual(ProductToAdd);
        });
        await test.step("• Step-10: Verify that only the added product names are present in the cart", async ()=>{
            addedProductNames = await cartAction.getNameOfAddedProduct();
            expect(addedProductNames).toEqual(toBeAddedProductName);
        });
        await test.step("• Step-11: Verify that price of individual added product matches in the cart", async ()=>{
            addedProductPrice  = await cartAction.getPriceOfAddedProduct();
            expect(addedProductPrice).toEqual(toBeAddedProductPrice);
        });
        await test.step("• Step-12: Verify the sum of individual added product price matches with cart total price", async ()=>{
            const sumOfIndividualProductPrice = await checkoutAction.getSumOfIndividualProductPrice(toBeAddedProductPrice);
            const totalPrice = await checkoutAction.getSubTotalPrice();
            expect(sumOfIndividualProductPrice).toEqual(totalPrice);
        });
        await test.step("• Step-13: Verify the successful order completion message", async ()=>{
            await checkoutAction.clickButtonFinish();
            const actualPurchaseSuccessMsg = await checkoutAction.isPurchaseSuccess();
            expect(actualPurchaseSuccessMsg).toEqual(expectedPurchaseSuccessMsg);
        });
        await test.step("• Step-14: Reset the App State", async ()=>{
            await menuAction.clickMenuOptions('reset');
        });
        await test.step("• Step-15: Logout the current user", async ()=>{
            await menuAction.clickMenuOptions('logout');
        });
        await test.step("• Step-16: Verify the user logged out successfully", async ()=>{
            await page.waitForURL("/", { timeout: 30000 });
            await expect(page).toHaveURL("/");
            expect(await loginAction.isLoginPage()).toBeTruthy();
        });
    });   
});

