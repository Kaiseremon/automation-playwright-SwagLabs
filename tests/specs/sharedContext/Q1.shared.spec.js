//import { test, expect } from "@playwright/test";
//import { test, expect } from '../utils/sharedFixture.js';
import { test, expect } from '../../utils/sharedFixture';
import { LoginActions } from "../../login/loginActions";
/**@type {LoginActions}*/
let loginAction;
import { MenuActions } from "../../menu/menuActions";
/**@type {MenuActions}*/
let menuAction;

const username = "locked_out_user";
const password = "secret_sauce";
const expectedErrorMessage = "Epic sadface: Sorry, this user has been locked out.";

test.describe.serial("Test Suite-1-Q1:Login with ‘locked_out_user’ & verify error message", ()=>{

    let userNames, i;
    test.beforeAll(async({sharedPage}) => {
        loginAction = new LoginActions(sharedPage);
        menuAction  = new MenuActions(sharedPage);
        await sharedPage.goto("/");
        await sharedPage.waitForURL("/", { timeout: 30000 });
    });

    test("TCS-Q1.1: Access the SauceDemo e-Commerce Site", async({sharedPage})=>{
        await expect(sharedPage).toHaveURL('/');
        await expect(loginAction.isLoginPage).toBeTruthy();
        userNames = await loginAction.getUserName();
    });

    test("TCS-Q1.2: Validate user CAN NOT Login without giving credentials", async({sharedPage})=>{
        await loginAction.clickButtonLogin();
        await expect(await loginAction.isError('username')).toBeTruthy();
        await expect(sharedPage).toHaveURL('/');
        await loginAction.clickButtonError();
    });

    test("TCS-Q1.3: Validate user can not login without giving Username", async({sharedPage})=>{
        await test.step("• Step-1: Fill the Login form w/o giving Username", async ()=>{            
            await loginAction.enterUserName("");
            await loginAction.enterPassword(password);
        });
        await test.step("• Step-2: Submit the form and verify user Login", async ()=>{
            await loginAction.clickButtonLogin();
            await expect(await loginAction.isError('username')).toBeTruthy();
            await expect(sharedPage).toHaveURL('/');
            await loginAction.clickButtonError();
        });
    });

    test("TCS-Q1.4: Validate user can not login without giving Password", async({sharedPage})=>{
        await test.step("• Step-1: Fill the Login form w/o giving Password", async ()=>{            
            await loginAction.enterUserName("abcd");
            await loginAction.enterPassword("");
        });
        await test.step("• Step-2: Submit the form and verify user Login", async ()=>{
            await loginAction.clickButtonLogin();
            await expect(await loginAction.isError('password')).toBeTruthy();
            await expect(sharedPage).toHaveURL('/');
            await loginAction.clickButtonError();
        });
    });

    test("TCS-Q1.5: Validate user can not login using INVALID credentials", async({sharedPage})=>{
        await test.step("• Step-1: Fill the Login form giving Invalid credentials", async ()=>{            
            await loginAction.enterUserName("abcd");
            await loginAction.enterPassword("dcba");
        });
        await test.step("• Step-2: Submit the form and verify user Login", async ()=>{
            await loginAction.clickButtonLogin();
            await expect(await loginAction.isError('invalid')).toBeTruthy();
            await expect(sharedPage).toHaveURL('/');
            await loginAction.clickButtonError();
        });
    });

    test("TCS-Q1.6: Login with ‘locked_out_user’ and verify the error message", async({sharedPage})=>{
        await test.step("• Step-1: Fill form using locked_out_user and secret_sauce password", async ()=>{            
            await loginAction.enterUserName(username);
            await loginAction.enterPassword(password);
        });
        await test.step("• Step-2: Submit the form and verify user Login", async ()=>{
            await loginAction.clickButtonLogin();
            await expect(await loginAction.isError('locked_user')).toBeTruthy();
            const actualErrorMessage = await loginAction.validateLoginErrorMessage();
            expect(actualErrorMessage).toEqual(expectedErrorMessage);
        });
    });

    test("TCS-Q1.7: Login with all the available user names and verify user login", async({sharedPage})=>{
        for (i = 0; i <= userNames.length-1; i++){
            if (userNames[i] !== "locked_out_user") {
                await test.step(`• Step-${i+1}: Fill and submit login form using '${userNames[i]}'`, async ()=>{            
                    await loginAction.enterUserName(userNames[i]);
                    //console.log(userNames[i]);
                    await loginAction.enterPassword(password);
                    await loginAction.clickButtonLogin();
                    await sharedPage.waitForURL("https://www.saucedemo.com/inventory.html", { timeout: 30000 });
                    await expect(sharedPage).toHaveURL('https://www.saucedemo.com/inventory.html');
                    await menuAction.clickMenuOptions('logout');
                    await sharedPage.goto("/");
                    await sharedPage.waitForURL("/", { timeout: 30000 });
                });
            }
        }
    });
});

