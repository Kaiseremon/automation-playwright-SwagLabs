import { test, expect } from "@playwright/test";
import { LoginActions } from "../../login/loginActions";
/**@type {LoginActions}*/
let loginAction;

const username = "locked_out_user";
const password = "secret_sauce";
const expectedErrorMessage = "Epic sadface: Sorry, this user has been locked out.";

test.describe.serial("Test Suite-1-Q1:Login with ‘locked_out_user’ & verify error message", ()=>{

    let context, page;
    test.beforeAll(async({ browser }) => {
        context     = await browser.newContext();
        page        = await context.newPage();
        loginAction = new LoginActions(page);
        await page.goto("/");
        await page.waitForURL("/", { timeout: 30000 });
    });

    test("TCS-Q1.1: Access the SauceDemo e-Commerce Site", async()=>{
        await expect(page).toHaveURL('/');
        await expect(loginAction.isLoginPage).toBeTruthy();
    });

    test("TCS-Q1.2: Validate user CAN NOT Login without giving credentials", async()=>{
        await loginAction.clickButtonLogin();
        await expect(await loginAction.isError('username')).toBeTruthy();
        await expect(page).toHaveURL('/');
        await loginAction.clickButtonError();
    });

    test("TCS-Q1.3: Validate user can not login without giving Username", async()=>{
        await test.step("• Step-1: Fill the Login form w/o giving Username", async ()=>{            
            await loginAction.enterUserName("");
            await loginAction.enterPassword(password);
        });
        await test.step("• Step-2: Submit the form and verify user Login", async ()=>{
            await loginAction.clickButtonLogin();
            await expect(await loginAction.isError('username')).toBeTruthy();
            await expect(page).toHaveURL('/');
            await loginAction.clickButtonError();
        });
    });

    test("TCS-Q1.4: Validate user can not login without giving Password", async()=>{
        await test.step("• Step-1: Fill the Login form w/o giving Password", async ()=>{            
            await loginAction.enterUserName("abcd");
            await loginAction.enterPassword("");
        });
        await test.step("• Step-2: Submit the form and verify user Login", async ()=>{
            await loginAction.clickButtonLogin();
            await expect(await loginAction.isError('password')).toBeTruthy();
            await expect(page).toHaveURL('/');
            await loginAction.clickButtonError();
        });
    });

    test("TCS-Q1.5: Validate user can not login using INVALID credentials", async()=>{
        await test.step("• Step-1: Fill the Login form giving Invalid credentials", async ()=>{            
            await loginAction.enterUserName("abcd");
            await loginAction.enterPassword("dcba");
        });
        await test.step("• Step-2: Submit the form and verify user Login", async ()=>{
            await loginAction.clickButtonLogin();
            await expect(await loginAction.isError('invalid')).toBeTruthy();
            await expect(page).toHaveURL('/');
            await loginAction.clickButtonError();
        });
    });

    test("TCS-Q1.6: Login with ‘locked_out_user’ and verify the error message", async()=>{
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

    test.afterAll(async () => {
        await page.close();
        await context.close();
    });
    
});

