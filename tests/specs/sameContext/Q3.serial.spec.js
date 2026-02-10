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


test.describe.serial("Test Suite-3-Q3: Log in with ‘performance_glitch_user’, Filter and Purchase a product", ()=>{

    let context, page;
    test.beforeAll(async({ browser }) => {
        context         = await browser.newContext();
        page            = await context.newPage();
        loginAction     = new LoginActions(page);
        inventoryAction = new InventoryActions(page);
        cartAction      = new CartActions(page);
        checkoutAction  = new CheckoutActions(page);
        menuAction      = new MenuActions(page);
        await page.goto("/");
        await page.waitForURL("/", { timeout: 30000 });
    });

    test("TCS-Q3.1: Login with ‘performance_glitch_user’ and verify user login", async()=>{
        await test.step("• Step-1: Access the SauceDemo e-Commerce Site", async()=>{
            await expect(page).toHaveURL('/');
            await expect(loginAction.isLoginPage).toBeTruthy();
        });
        await test.step("• Step-2: Fill the form using performance_glitch_user and secret_sauce", async ()=>{            
            await loginAction.enterUserName(username);
            await loginAction.enterPassword(password);
        });
        await test.step('• Step-3: Submit the form and verify user Login', async ()=>{
            await loginAction.clickButtonLogin();
            await page.waitForURL("https://www.saucedemo.com/inventory.html", { timeout: 30000 });
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
            console.log(`Start Test Suite-3 with UserName: ${username}`);
        });
    });
    
    test("TCS-Q3.2: Reset the App State", async()=>{
        await menuAction.clickMenuOptions('reset');
    });

    test("TCS-Q3.3: Filter/Sort the available products by name (Z to A)", async()=>{
        await test.step("• Step-1: Validate that user is in the 'Inventory' page", async ()=>{
            await page.waitForURL("https://www.saucedemo.com/inventory.html", { timeout: 30000 });
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        });
        await test.step("• Step-2: Get name & price of all the products BEFORE Filter", async ()=>{
            totalAvailableProducts_BF  = await inventoryAction.getNumberOfAllProducts();
            allProductName_BF          = await inventoryAction.getNameOfAllProduct();
            allProductPrice_BF         = await inventoryAction.getPriceOfAllProduct();
            expect(allProductName_BF.length).toEqual(totalAvailableProducts_BF);
            console.log(`List of available Products BEFORE filter: ${allProductName_BF}`);
        });
        await test.step("• Step-3:  Click Filter and select 'Name (Z to A)' option", async ()=>{
            await inventoryAction.clickDropdownFilter();
        });
        await test.step("• Step-4: Get name & price of all the products AFTER Filter", async ()=>{
            totalAvailableProducts  = await inventoryAction.getNumberOfAllProducts();
            allProductName          = await inventoryAction.getNameOfAllProduct();
            allProductPrice         = await inventoryAction.getPriceOfAllProduct();
            expect(allProductName.length).toEqual(totalAvailableProducts);
            expect(totalAvailableProducts_BF).toEqual(totalAvailableProducts);
            console.log(`List of available Products AFTER filter: ${allProductName}`);
        });
        await test.step("• Step-5: Verify products are sorted in discending order alphabetically", async ()=>{
            let productZtoA  = allProductName_BF;
            productZtoA      = productZtoA.reverse();
            expect(productZtoA).toEqual(allProductName);
        });
    });

    test("TCS-Q3.4: Add the first filtered item to the cart", async()=>{
        await test.step("• Step-1: Validate that user is in the 'Inventory' page", async ()=>{
            await page.waitForURL("https://www.saucedemo.com/inventory.html", { timeout: 30000 });
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        });
        await test.step("• Step-2: Select first item from inventory and Add to cart", async ()=>{
            if (totalAvailableProducts >= ProductToAdd){
                toBeAddedProductName   = allProductName.slice(0, ProductToAdd);
                toBeAddedProductPrice  = allProductPrice.slice(0, ProductToAdd);
            }else{
                toBeAddedProductName   = allProductName;
                toBeAddedProductPrice  = allProductPrice;
                ProductToAdd           = totalAvailableProducts;
            }
            await inventoryAction.addToCart(ProductToAdd);
            console.log(`First Product in the filtered list to be Added: ${toBeAddedProductName}`);
        });
        await test.step(`• Step-3: Validate the cart icon badge shows ${ProductToAdd} items`, async ()=>{
            const cartIconBadge = await inventoryAction.getCartIconBadge();
            expect(cartIconBadge).toEqual(ProductToAdd.toString());
        });
    });

    test("TCS-Q3.5: Navigate to the checkout page", async()=>{
        await test.step("• Step-1:  Click on the 'Cart' icon", async ()=>{
            await inventoryAction.clickIconCart();
        });
        await test.step("• Step-2: Validate user is in the 'Cart' page", async ()=>{
            await page.waitForURL("https://www.saucedemo.com/cart.html", { timeout: 30000 });
            await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
        });
        await test.step(`• Step-3: Verify that ${ProductToAdd} itme added to cart`, async ()=>{
            totalAddedProducts = await cartAction.getNumberOfAddedProducts();
            expect(totalAddedProducts).toEqual(ProductToAdd);
        });
        await test.step("• Step-4: Click 'Checkout' button to access Chekout info page", async ()=>{
            await cartAction.clickButtonCheckout();
            await page.waitForURL("https://www.saucedemo.com/checkout-step-one.html", { timeout: 30000 });
            await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
        });
    });

    test("TCS-Q3.6: Enter credentials in Checkout Information page.", async()=>{
        await test.step("• Step-1:  Verify user is in the 'Checkout information' page", async ()=>{
            await page.waitForURL("https://www.saucedemo.com/checkout-step-one.html", { timeout: 30000 });
            await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
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
            await page.waitForURL("https://www.saucedemo.com/checkout-step-two.html", { timeout: 30000 });
            await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
        });
    });

    test(`TCS-Q3.7: Verify that ${ProductToAdd} itmes have been added to the cart`, async ()=>{
        totalAddedProducts = await cartAction.getNumberOfAddedProducts();
        expect(totalAddedProducts).toEqual(ProductToAdd);
        console.log(`Number of product added into the cart: ${totalAddedProducts}`);
    });

    test("TCS-Q3.8: Verify that only the added product names are present in the cart", async ()=>{
        addedProductNames = await cartAction.getNameOfAddedProduct();
        expect(addedProductNames).toEqual(toBeAddedProductName);
        console.log(`Name of the Products added into the cart: ${addedProductNames}`);
    });

    test("TCS-Q3.9: Verify that price of individual added product matches in the cart", async ()=>{
        addedProductPrice  = await cartAction.getPriceOfAddedProduct();
        expect(addedProductPrice).toEqual(toBeAddedProductPrice);
        console.log(`Price of the Products added into the cart: ${addedProductPrice}`);
    });

    test("TCS-Q3.10: Verify the sum of individual added product price matches with cart total price", async ()=>{
        const sumOfIndividualProductPrice = await checkoutAction.getSumOfIndividualProductPrice(toBeAddedProductPrice);
        const totalPrice = await checkoutAction.getSubTotalPrice();
        expect(sumOfIndividualProductPrice).toEqual(totalPrice);
        console.log(`Sum of Individual product Price: ${sumOfIndividualProductPrice} and cart shown total price: ${totalPrice}`);
    });

    test("TCS-Q3.11: Finish the purchase journey and verify the successful order message", async ()=>{
        await test.step("• Step-1: Click on the 'Finish' button", async ()=>{
            await checkoutAction.clickButtonFinish();
        });
        await test.step("• Step-2: Verify user is in the 'Checkout Complete' page", async ()=>{
            await page.waitForURL("https://www.saucedemo.com/checkout-complete.html", { timeout: 30000 });
            await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
        });
        await test.step("• Step-3: Verify the successful order completion message", async ()=>{
            const actualPurchaseSuccessMsg = await checkoutAction.isPurchaseSuccess();
            expect(actualPurchaseSuccessMsg).toEqual(expectedPurchaseSuccessMsg);
        });
    });

    test("TCS-Q3.12:  Reset the App State and Logout", async()=>{
        await test.step("• Step-1: Reset the App State", async ()=>{
            await menuAction.clickMenuOptions('reset');
        });
        await test.step("• Step-2: Logout the current user", async ()=>{
            await menuAction.clickMenuOptions('logout');
        });
        await test.step("• Step-3: Verify the user logged out successfully", async ()=>{
            await page.waitForURL("/", { timeout: 30000 });
            await expect(page).toHaveURL("/");
            expect(await loginAction.isLoginPage()).toBeTruthy();
        });
        console.log("Test Suite-3 COMPLETED.");        
    });

    test.afterAll(async () => {
        await page.close();
        await context.close();
    });
    
});

