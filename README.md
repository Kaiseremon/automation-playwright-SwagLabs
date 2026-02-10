# Swag Labs UI Automation

This project aims to built an automation testing framework for [Swag Labs](https://www.saucedemo.com/) website
using Playwright with JavaScript.

- Project URL: https://www.saucedemo.com/

- Packages: playwright, playwright-core. Jest, chai, allure-playwright, allure-commandline.

<br>

## A. Objective:

The objective of this project is to perform automated UI and functionality testing, cross-browser execution, screenshot/video capture, and test reporting on Swag Labs website based on the following scenarios:

1. **Test Suite-1-Q1:** Try login with *‘locked_out_user’* and verify the error message.

2. **Test Suite-2-Q2:** Log in with *‘standard_user’*. Then, from the hamburger menu, reset the App State. Add any three items to the cart. Navigate to the final checkout page, verify the product name and total price. Finish the purchase and verify the successful order message. Then, reset the App State again and log out.

3. **Test Suite-3-Q3:** Login with *‘performance_glitch_user’* and reset the App State. Then filter by name (Z to A) and select the first product into the cart. Then navigate up to the final checkout page and verify all the products' names and the total price. Then finish the purchase journey and verify the successful order message. Then, reset the App State again and log out.

<br>

## B. Documentation

In this project, the UI and feature functionalities of the SwagLabs website have been analyzed. Based on the analysis, a detailed test case scenarios have been written on the above mentioned test suites to perform automated testing.

This is a page object model (**POM**) based automation framework.

Where **Playwright** is used as the automation tools and **Jest** is used to create the framework.

The framework structure follows Test Driven Development (**TDD**) approach. The detailed test case scenarios can be found in the **'TestScenarios.txt'** file inside the *'documents'* folder.
 
Besides, **Allure reporter** is used to get the report after completing the test execution. This helps to generate report and take screenshot when a step become failed.

<br>

## C. Prerequisites:

If you have not installed already, the following tools are required to install in order to run this project flawlessly:

| Tools | Scope |
|--------|------------|
| [Node.js](https://nodejs.org/) | npm package manager to run Playwright using JavaScript |
| [Java JDK](https://www.oracle.com/java/technologies/downloads/) | To run allure-commanline |
| [VS Code](https://code.visualstudio.com/) | Open-source code editor |
| [Git CLI](https://git-scm.com/install/) | To sync with GitHub |

<br>

## D. Install Dependencies:

In order to run this automation framework locally, please refer the following sections carefully:
1. Open the VS Code editor.
2. Open terminal (… → Terminal → New Terminal).


### 1. Clone the project:

To get the project in your local machine, open the VS code terminal and run the following git command:

```bash
git clone https://github.com/Kaiseremon/swagLabs-automation.git
```

Then go to the directory where the project downloaded and select the branch *swagLabs-automation*.

```bash
cd swagLabs-automation
```

Once you are in the *swagLabs-automation* folder, run the command bellow to open the project in VS code file explorer:

```bash
code .
```



### 2. Install Project Dependencies

From the terminal, install the necessary project dependencies as defined in the **package.json** file using npm:

```bash
npm install
```

### 3. Install Playwright Browsers:

To install the Playwright **browser binaries** (Chromium, Firefox, and Webkit), run the following command:

```bash
npx playwright install
```

After the successful installation, all the project configuration will be enlist inside the **playwright.config.js** file.

<br>

## E. Run the test case scenarios Locally:

In order to run this automation project locally in your VS code **terminal**, please refer the following sections carefully:

### 1. Running tests in the Same Browser Context (Serial Execution):

**Test Suite-1-Q1:** To run all the test cases of this test suite in a same browser context serially, execute:

```bash
npm run Q1serial
```

**Test Suite-2-Q2:** To run all the test cases of this test suite in a same browser context serially, execute:

```bash
npm run Q2serial
```

**Test Suite-3-Q3:** to run all the test cases of this test suite in a same browser context serially, execute:

```bash
npm run Q3serial
```

**Run All Sequentially:** To run ALL the test suites (Q1, Q2, Q3) sequentially in a same browser context, execute:

```bash
npm run serial
```

<br>

### 2. Running tests in Individual Browser Contexts (Parallel Execution):

**Test Suite-1-Q1:** Run all the test cases of this test suite in individual browser context parallelly, execute:

```bash
npm run Q1parallel
```

**Test Suite-2-Q2:** Run all the test cases of this test suite in individual browser context parallelly, execute:

```bash
npm run Q2parallel
```

**Test Suite-3-Q3:** Run all the test cases of this test suite in individual browser context parallelly, execute:

```bash
npm run Q3parallel
```

**Run all Parallelly:** In order to run ALL the test suites in multiple browser context parallelly, execute:

```bash
npm run parallel
```

### 3. Running all tests in both Execution mode:

Run all the test cases of all the test suits available in this project both serial and parallel context, execute:

```bash
npm run test
```

<br>

## F. Get Test Report after the execution:

**Allure Reporter:** To generate and view ALLURE report after the test execution, run:

```bash
npm run reportAllure
```

**HTML Reporter:** To generate the playwright default HTML report after the test execution, run:

```bash
npm run reportHTML
```

In order to close the currently generated report in your browser, run:

```bash
ctrl+c
```

<br>

## G. Cross-Browser Testing:

- To run the test suites in **one** browser (workers) at a time, then to run in another type of browser (if available), replace/overwrite the following properties of the **playwright.config.js** file:

```bash
  fullyParallel: true,
  workers: process.env.CI ? 1 : 1,
  projects: [
    {name: 'Chromium', use: { browserName: 'chromium' },},
    {name: 'Firefox', use: { browserName: 'firefox' },},
    {name: 'webkit', use: { ...devices['Desktop Safari'] },},
```

- To run the test suites in **two same browsers** (workers) at a time, then run in two same browsers of other type (if available), replace/overwrite the following properties of the **playwright.config.js** file:

```bash
  fullyParallel: true,
  workers: process.env.CI ? 1 : 2,
  projects: [
    {name: 'Chromium', use: { browserName: 'chromium' },},
    {name: 'Firefox', use: { browserName: 'firefox' },},
    {name: 'webkit', use: { ...devices['Desktop Safari'] },},
```

- To run the test suites in **all the available browsers** parallelly based on the number of CPU cores on your machine, replace the following properties of **playwright.config.js** file (prone to CPU race condition):

```bash
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,
  projects: [
    {name: 'chromium', use: { ...devices['Desktop Chrome'] },},
    {name: 'firefox', use: { ...devices['Desktop Firefox'] },},
    {name: 'webkit', use: { ...devices['Desktop Safari'] },},
```

<br>

## H. Demo Videos on each execution:

### 1. Running tests in the Same Browser Context (Serial Execution):

- **Test Suite-1-Q1:** Running all the test cases of this test suite in a same browser context serially:
  - URL: https://drive.google.com/file/d/1YxGRwqFixKs_ZLF76lMpSng1kg3i9-Cl/view?usp=sharing

- **Test Suite-2-Q2:** Running all the test cases of this test suite in a same browser context serially:
  - URL: https://drive.google.com/file/d/1cyn3d_LqbYApYhFm8Vp5MQhrJrJBNtkY/view?usp=sharing

- **Test Suite-3-Q3:** Running all the test cases of this test suite in a same browser context serially:
  - URL: https://drive.google.com/file/d/1ucSZYlo-Kxv6yKwd_7ETGevS-x0qZOk8/view?usp=sharing

- **Run All Sequentially:** Running ALL the test suites (Q1, Q2, Q3) sequentially in a same browser context:
  - URL: https://drive.google.com/file/d/17b7uM_i0RzVnFc2j6PrgNQP9yLktk6xP/view?usp=sharing

<br>

### 2. Running tests in Individual Browser Contexts (Parallel Execution):

- **Test Suite-1-Q1:** Running all the test cases of this test suite in individual browser context parallelly:
  - URL: https://drive.google.com/file/d/10hPirdH27JIVHbw_9R9Xp9CIuizWef0F/view?usp=sharing

- **Test Suite-2-Q2:** Running all the test cases of this test suite in individual browser context parallelly:
  - URL: https://drive.google.com/file/d/1FgULTu3aGhunVno04qylD9Kb2czaLbaK/view?usp=sharing

- **Test Suite-3-Q3:** Running all the test cases of this test suite in individual browser context parallelly:
  - URL: https://drive.google.com/file/d/1cybIHy7mBdT4v8nn8guHf0kXTabt7J9L/view?usp=sharing

- **Run all Parallelly:** Running ALL the test suites in multiple browser context parallelly:
  - URL: https://drive.google.com/file/d/1VyMRVFvBrHyjl5uZI177UmEgNlb4kFO2/view?usp=sharing

<br>

### 3. Running all tests in both Execution mode:

- **Full suite journey:** Running all the test cases of all the test suits available in this project both serial and parallel context:
  - URL: https://drive.google.com/file/d/1wH7PPoLBqJXD-PtGXTH4p1AtE1vm1hMx/view?usp=sharing

<br>

## Author

- [@Kaiseremon](https://github.com/Kaiseremon)

