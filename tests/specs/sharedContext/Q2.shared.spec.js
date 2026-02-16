// import { test, expect } from "@playwright/test";
// import { test, expect } from '../utils/sharedFixture.js';
import { test, expect } from '../../utils/sharedFixture';
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

test.describe.serial("Test Suite-2-Q2: Login with standard_user, Add and Purchase any 3 product ", ()=>{

    test.beforeAll(async({sharedPage}) => {
        loginAction     = new LoginActions(sharedPage);
        inventoryAction = new InventoryActions(sharedPage);
        cartAction      = new CartActions(sharedPage);
        checkoutAction  = new CheckoutActions(sharedPage);
        menuAction      = new MenuActions(sharedPage);
        await sharedPage.goto("/");
        await sharedPage.waitForURL("/", { timeout: 30000 });
    });

    test("TCS-Q2.1: Login with ‘standard_user’ and verify user login", async({sharedPage})=>{
        await test.step("• Step-1: Access the SauceDemo e-Commerce Site", async()=>{
            await expect(sharedPage).toHaveURL('/');
            await expect(loginAction.isLoginPage).toBeTruthy();
        });
        await test.step("• Step-2: Fill the form using standard_user and secret_sauce password", async ()=>{            
            await loginAction.enterUserName(username);
            await loginAction.enterPassword(password);
        });
        await test.step("• Step-3: Submit the form and verify user Login", async ()=>{
            await loginAction.clickButtonLogin();
            await sharedPage.waitForURL("https://www.saucedemo.com/inventory.html", { timeout: 30000 });
            await expect(sharedPage).toHaveURL('https://www.saucedemo.com/inventory.html');
            console.log(`Start Test Suite-2 with UserName: ${username}`);
        });
    });
    
    test("TCS-Q2.2: Reset the App State", async({sharedPage})=>{
        await menuAction.clickMenuOptions('reset');
    });

    test("TCS-Q2.3: Add any three items to the cart", async({sharedPage})=>{
        await test.step("• Step-1: Validate that user is in the 'Inventory' page", async ()=>{
            await sharedPage.waitForURL("https://www.saucedemo.com/inventory.html", { timeout: 30000 });
            await expect(sharedPage).toHaveURL('https://www.saucedemo.com/inventory.html');
        });
        await test.step("• Step-2: Get the name & price of all the available products", async ()=>{
            totalAvailableProducts  = await inventoryAction.getNumberOfAllProducts();
            allProductName          = await inventoryAction.getNameOfAllProduct();
            allProductPrice         = await inventoryAction.getPriceOfAllProduct();
            expect(allProductName.length).toEqual(totalAvailableProducts);
            console.log(`List of available Products in inventory: ${allProductName}`);
        });
        await test.step("• Step-3: Select first 3 items from inventory and Add to cart", async ()=>{
            if (totalAvailableProducts >= ProductToAdd){
                toBeAddedProductName   = allProductName.slice(0, ProductToAdd);
                toBeAddedProductPrice  = allProductPrice.slice(0, ProductToAdd);
            }else{
                toBeAddedProductName   = allProductName;
                toBeAddedProductPrice  = allProductPrice;
                ProductToAdd           = totalAvailableProducts;
            }
            await inventoryAction.addToCart(ProductToAdd);
            console.log(`Selected Products to be Added into the cart: ${toBeAddedProductName}`);
        });
        await test.step(`• Step-4: Validate the cart icon badge shows ${ProductToAdd} items`, async ()=>{
            const cartIconBadge = await inventoryAction.getCartIconBadge();
            expect(cartIconBadge).toEqual(ProductToAdd.toString());
        });
    });

    test("TCS-Q2.4: Navigate to the checkout page", async({sharedPage})=>{
        await test.step("• Step-1:  Click on the 'Cart' icon", async ()=>{
            await inventoryAction.clickIconCart();
        });
        await test.step("• Step-2: Validate user is in the 'Cart' page", async ()=>{
            await sharedPage.waitForURL("https://www.saucedemo.com/cart.html", { timeout: 30000 });
            await expect(sharedPage).toHaveURL('https://www.saucedemo.com/cart.html');
        });
        await test.step(`• Step-3: Verify that ${ProductToAdd} itmes added to cart`, async ()=>{
            totalAddedProducts = await cartAction.getNumberOfAddedProducts();
            expect(totalAddedProducts).toEqual(ProductToAdd);
        });
        await test.step("• Step-4: Click 'Checkout' button to access Chekout info page", async ()=>{
            await cartAction.clickButtonCheckout();
            await sharedPage.waitForURL("https://www.saucedemo.com/checkout-step-one.html", { timeout: 30000 });
            await expect(sharedPage).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
        });
    });

    test("TCS-Q2.5: Enter credentials in Checkout Information page.", async({sharedPage})=>{
        await test.step("• Step-1:  Verify user is in the 'Checkout information' page", async ()=>{
            await sharedPage.waitForURL("https://www.saucedemo.com/checkout-step-one.html", { timeout: 30000 });
            await expect(sharedPage).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
        });
        await test.step("• Step-2: Verify user could not proceed with incomplete credentials", async ()=>{
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
        await test.step("• Step-3: Keyin and submit the valid Checkout Information", async ()=>{  
            await checkoutAction.enterFirstName('Kaiser');
            await checkoutAction.enterLastName('Habib');
            await checkoutAction.enterPostalCode('4210');
            await checkoutAction.clickButtonContinue();                   
        });
        await test.step("• Step-4: Verify the 'Final Checkout' page is navigated", async ()=>{
            await sharedPage.waitForURL("https://www.saucedemo.com/checkout-step-two.html", { timeout: 30000 });
            await expect(sharedPage).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
        });
    });

    test(`TCS-Q2.6: Verify that ${ProductToAdd} itmes have been added to the cart`, async ({sharedPage})=>{
        totalAddedProducts = await cartAction.getNumberOfAddedProducts();
        expect(totalAddedProducts).toEqual(ProductToAdd);
        console.log(`Number of product added into the cart: ${totalAddedProducts}`);
    });

    test("TCS-Q2.7: Verify that only the added product names are present in the cart", async ({sharedPage})=>{
        addedProductNames = await cartAction.getNameOfAddedProduct();
        expect(addedProductNames).toEqual(toBeAddedProductName);
        console.log(`Name of the Products added into the cart: ${addedProductNames}`);
    });

    test("TCS-Q2.8: Verify that price of individual added product matches in the cart", async ({sharedPage})=>{
        addedProductPrice  = await cartAction.getPriceOfAddedProduct();
        expect(addedProductPrice).toEqual(toBeAddedProductPrice);
        console.log(`Price of the Products added into the cart: ${addedProductPrice}`);
    });

    test("TCS-Q2.9: Verify the sum of individual added product price matches with cart total price", async ({sharedPage})=>{
        const sumOfIndividualProductPrice = await checkoutAction.getSumOfIndividualProductPrice(toBeAddedProductPrice);
        const totalPrice = await checkoutAction.getSubTotalPrice();
        expect(sumOfIndividualProductPrice).toEqual(totalPrice);
        console.log(`Sum of Individual product Price: ${sumOfIndividualProductPrice} and cart shown total price: ${totalPrice}`);
    });

    test("TCS-Q2.10: Finish the purchase journey and verify the successful order message", async ({sharedPage})=>{
        await test.step("• Step-1: Click on the 'Finish' button", async ()=>{
            await checkoutAction.clickButtonFinish();
        });
        await test.step("• Step-2: Verify user is in the 'Checkout Complete' page", async ()=>{
            await sharedPage.waitForURL("https://www.saucedemo.com/checkout-complete.html", { timeout: 30000 });
            await expect(sharedPage).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
        });
        await test.step("• Step-3: Verify the successful order completion message", async ()=>{
            const actualPurchaseSuccessMsg = await checkoutAction.isPurchaseSuccess();
            expect(actualPurchaseSuccessMsg).toEqual(expectedPurchaseSuccessMsg);
        });
    });

    test("TCS-Q2.11:  Reset the App State and Logout", async({sharedPage})=>{
        await test.step("• Step-1: Reset the App State", async ()=>{
            await menuAction.clickMenuOptions('reset');
        });
        await test.step("• Step-2: Logout the current user", async ()=>{
            await menuAction.clickMenuOptions('logout');
        });
        await test.step("• Step-3: Verify the user logged out successfully", async ()=>{
            await sharedPage.waitForURL("/", { timeout: 30000 });
            await expect(sharedPage).toHaveURL("/");
            expect(await loginAction.isLoginPage()).toBeTruthy();
            console.log("Test Suite-2 COMPLETED.");
        });
        
    });

});

