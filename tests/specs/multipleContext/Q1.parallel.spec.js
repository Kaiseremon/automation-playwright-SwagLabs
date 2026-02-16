import { test, expect } from "@playwright/test";
import { LoginActions } from "../../login/loginActions";
/**@type {LoginActions}*/
let loginAction;
import { MenuActions } from "../../menu/menuActions";
/**@type {MenuActions}*/
let menuAction;

const username = "locked_out_user";
const password = "secret_sauce";
const expectedErrorMessage = "Epic sadface: Sorry, this user has been locked out.";

test.describe("Test Suite-1-Q1:Login with ‘locked_out_user’ & verify error message", ()=>{
    let userNames, i;
    test.beforeEach(async({ page }) => {        
        loginAction = new LoginActions(page);
        menuAction  = new MenuActions(page);
        await page.goto("/");
        await page.waitForURL("/", { timeout: 30000 });
    });

    test("TCS-Q1.1: Access the SauceDemo e-Commerce Site", async({page})=>{
        await expect(page).toHaveURL('/');
        await expect(loginAction.isLoginPage).toBeTruthy();
    });

    test("TCS-Q1.2: Validate user CAN NOT Login without giving credentials", async({page})=>{
        await loginAction.clickButtonLogin();
        await expect(await loginAction.isError('username')).toBeTruthy();
        await loginAction.clickButtonError();
        await expect(page).toHaveURL('/');
    });

    test("TCS-Q1.3: Validate user can not login without giving Username", async({page})=>{
        await test.step('• Step-1: Fill the Login form w/o giving Username', async ()=>{            
            await loginAction.enterUserName("");
            await loginAction.enterPassword(password);
        });
        await test.step("• Step-2: Submit the form and verify user Login", async ()=>{
            await loginAction.clickButtonLogin();
            await expect(await loginAction.isError('username')).toBeTruthy();
            await loginAction.clickButtonError();
            await expect(page).toHaveURL('/');
        });
    });

    test("TCS-Q1.4: Validate user can not login without giving Password", async({page})=>{
        await test.step("• Step-1: Fill the Login form w/o giving Password", async ()=>{            
            await loginAction.enterUserName("abcd");
            await loginAction.enterPassword("");
        });
        await test.step("• Step-2: Submit the form and verify user Login", async ()=>{
            await loginAction.clickButtonLogin();
            await expect(await loginAction.isError('password')).toBeTruthy();
            await loginAction.clickButtonError();
            await expect(page).toHaveURL('/');
        });
    });

    test("TCS-Q1.5: Validate user can not login using INVALID credentials", async({page})=>{
        await test.step("• Step-1: Fill the Login form giving Invalid credentials", async ()=>{            
            await loginAction.enterUserName("abcd");
            await loginAction.enterPassword("dcba");
        });
        await test.step("• Step-2: Submit the form and verify user Login", async ()=>{
            await loginAction.clickButtonLogin();
            await expect(await loginAction.isError('invalid')).toBeTruthy();
            await loginAction.clickButtonError();
            await expect(page).toHaveURL('/');
        });
    });

    test("TCS-Q1.6: Login with ‘locked_out_user’ and verify the error message", async({page})=>{
        await test.step("• Step-1: Fill form using locked_out_user and secret_sauce password", async ()=>{            
            await loginAction.enterUserName(username);
            await loginAction.enterPassword(password);
        });
        await test.step('• Step-2: Submit the form and verify user Login', async ()=>{
            await loginAction.clickButtonLogin();
            await expect(await loginAction.isError('locked_user')).toBeTruthy();
            const actualErrorMessage = await loginAction.validateLoginErrorMessage();
            await loginAction.clickButtonError();
            expect(actualErrorMessage).toEqual(expectedErrorMessage);
        });
    });

    test("TCS-Q1.7: Login with all the available user names and verify user login", async({page})=>{
        userNames = await loginAction.getUserName();
        for (i = 0; i <= userNames.length-1; i++){
            if (userNames[i] !== "locked_out_user") {
                await test.step(`• Step-${i+1}: Fill and submit login form using '${userNames[i]}'`, async ()=>{            
                    await loginAction.enterUserName(userNames[i]);
                    await loginAction.enterPassword(password);
                    await loginAction.clickButtonLogin();
                    //console.log(userNames[i]);
                    await page.waitForURL("https://www.saucedemo.com/inventory.html", { timeout: 30000 });
                    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
                    await menuAction.clickMenuOptions('logout');
                    await page.goto("/");
                    await page.waitForURL("/", { timeout: 30000 });
                });
            }
        }
    });
});

