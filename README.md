# Swag Labs UI Automation

This project aims to build an automation framework using playwright with JavaScript for the [Swag Labs](https://www.saucedemo.com/) website.

- Project URL: https://www.saucedemo.com/

- Packages: playwright, playwright-core, Jest, chai, allure-playwright, allure-commandline.

<br>

## A. Objective:

The objective of this project is to perform automated UI and functionality testing, cross-browser execution, screenshot/video capture on failure, and test reporting on the Swag Labs website based on the following scenarios:

1. **Test Suite-1-Q1:** Try log in with all the available user names, and verify successful user login/logout actions.

2. **Test Suite-2-Q2:** Log in with *‘standard_user’*. Then, from the hamburger menu, reset the App State. Add any three items to the cart. Navigate to the final checkout page, verify the product name and total price. Finish the purchase and verify the successful order message. Then, reset the App State again and log out.

3. **Test Suite-3-Q3:** Log in with *‘performance_glitch_user’* and reset the App State. Then filter by name (Z to A) and select the first product in the cart. Then navigate up to the final checkout page and verify all the product names and the total price added. Then finish the purchase journey and verify the successful order message. Then, reset the App State again and log out.

<br>

## B. Documentation

In this project, the UI and feature functionalities of the SwagLabs website have analyzed. Based on the analysis, detailed test case scenarios have been written on the above-mentioned test suites to perform automated testing.

This project is a page object model (**POM**) based automation framework.

Where **Playwright** is used as the automation tools, and **Jest** is used to create the framework.

The framework structure follows the 'Test Driven Development (**TDD**)' approach. Please find the detailed test case scenarios in the **'TestScenarios.txt'** file inside the *'documents'* folder.
 
Besides, **Allure reporter** is used to get the report after completing the test execution. This tool helps to generate the test report and take a screenshot/video clip when a step fails.

<br>

## C. Prerequisites:

The following tools need to be installed on your local machine before running this project:

| Tools | Scope |
|--------|------------|
| [Node.js](https://nodejs.org/) | npm package manager to run Playwright using JavaScript |
| [Java JDK](https://www.oracle.com/java/technologies/downloads/) | To run allure-commanline |
| [VS Code](https://code.visualstudio.com/) | Open-source code editor |
| [Git CLI](https://git-scm.com/install/) | To sync with GitHub |

<br>

## D. Install Dependencies:

In order to run this automation framework locally, please refer to the following sections carefully:
1. Open the VS Code editor.
2. Open the VS Code terminal.


### 1. Clone the project:

To get this project on your local machine, open the VS Code terminal and run the following git command:

```bash
git clone https://github.com/Kaiseremon/automation-playwright-SwagLabs.git
```

Then go to the local directory where the project is downloaded and select *automation-playwright-SwagLabs*.

```bash
cd automation-playwright-SwagLabs
```

Once you are in the *automation-playwright-SwagLabs* folder, open the project in VS Code file explore running:

```bash
code .
```


### 2. Install Project Dependencies

Install the necessary project dependencies using npm by running the following command in the VS Code terminal:

```bash
npm install
```

### 3. Install Playwright Browsers:

To install the Playwright **browser binaries** (Chromium, Firefox, and Webkit), run the following command:

```bash
npx playwright install
```


<br>

## E. Run the test case scenarios locally:

Execute the following commands in your **terminal** to run this automation testing project locally in your machine:

### 1. Automate tests in the Same Browser Context (Serial Execution):

**Test Suite-1-Q1:** To run all the test cases of this test suite in the same browser context serially, execute:

```bash
npm run Q1serial
```

**Test Suite-2-Q2:** To run all the test cases of this test suite in the same browser context serially, execute:

```bash
npm run Q2serial
```

**Test Suite-3-Q3:** To run all the test cases of this test suite in the same browser context serially, execute:

```bash
npm run Q3serial
```

**Run All Sequentially:** To run ALL the test suites (Q1, Q2, Q3) at once sequentially in the same browser, execute:

```bash
npm run serial
```

<br>

### 2. Automate tests in Individual Browser Contexts (Parallel Execution):

**Test Suite-1-Q1:** To run all the test cases of this test suite in individual browser contexts in parallel, execute:

```bash
npm run Q1parallel
```

**Test Suite-2-Q2:** To run all the test cases of this test suite in individual browser contexts in parallel, execute:

```bash
npm run Q2parallel
```

**Test Suite-3-Q3:** To run all the test cases of this test suite in individual browser contexts in parallel, execute:

```bash
npm run Q3parallel
```

**Run all Parallelly:** To run ALL the test suites (Q1, Q2, Q3) at once in individual browser contexts in parallel, execute:

```bash
npm run parallel
```

<br>

### 3. Automate all the test suites in the same Shared Browser Contexts:

To run all the test suites (Q1, Q2, Q3) at once in the same browser context sequentially, execute:

```bash
npm run shared
```

<br>

### 4. Automate all the tests of all the test suites in serial, parallel, and shared browser context:

To run all the test cases of all the test suits of this project in serial, parallel, and shared browser context, execute:

```bash
npm run test
```

<br>

## F. Get the test report after a test execution:

**Allure Reporter:** To generate and view the test report in ALLURE reporter, run:

```bash
npm run reportAllure
```

**HTML Reporter:** To generate and view the test report in HTML reporter, run:

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

- To run the test suites in **two same browsers** (workers) at a time, then run in two same browsers of another type (if available), replace/overwrite the following properties of the **playwright.config.js** file:

```bash
  fullyParallel: true,
  workers: process.env.CI ? 1 : 2,
  projects: [
    {name: 'Chromium', use: { browserName: 'chromium' },},
    {name: 'Firefox', use: { browserName: 'firefox' },},
    {name: 'webkit', use: { ...devices['Desktop Safari'] },},
```

- To run the test suites in **all the available browsers** in parallel based on the number of CPU cores on your machine, replace the following properties of the **playwright.config.js** file (prone to CPU race condition):

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

### 1. Automate tests in the Same Browser Context (Serial Execution):

- **Test Suite-1-Q1:** Running all the test cases of this test suite in the same browser context serially:
  - URL: https://drive.google.com/file/d/1sDT8qsT-fi6cMrlSXo-JFGlxJv3CqZf9/view?usp=sharing

- **Test Suite-2-Q2:** Running all the test cases of this test suite in the same browser context serially:
  - URL: https://drive.google.com/file/d/1b88UBuZD84d7Y_E3z4DIftoGp9IFdTHW/view?usp=sharing

- **Test Suite-3-Q3:** Running all the test cases of this test suite in the same browser context serially:
  - URL: https://drive.google.com/file/d/1L9iJUulPVU_pGhvmT5LJVfCmUbXOouh5/view?usp=sharing

- **Run All Sequentially:** Running ALL the test suites (Q1, Q2, Q3) at once sequentially in a same browser:
  - URL: https://drive.google.com/file/d/1cAvNItlMeajzkpajcQ7mRa4x3IfIsX8b/view?usp=sharing

<br>

### 2. Automate tests in Individual Browser Contexts (Parallel Execution):

- **Test Suite-1-Q1:** Running all the test cases of this test suite in individual browser context parallelly:
  - URL: https://drive.google.com/file/d/1QvkIwOJJj9q0My_HuKIRXQNGKSv95iHQ/view?usp=sharing

- **Test Suite-2-Q2:** Running all the test cases of this test suite in individual browser context parallelly:
  - URL: https://drive.google.com/file/d/1t3iUxJGgX8rilciPyu4PYNKXp8DacrCw/view?usp=sharing

- **Test Suite-3-Q3:** Running all the test cases of this test suite in individual browser context parallelly:
  - URL: https://drive.google.com/file/d/1MQ59Q0WSWMvYK-pLZpVPMygaXb4mL2aQ/view?usp=sharing

- **Run all Parallelly:** Running ALL the test suites in multiple browser context parallelly:
  - URL: https://drive.google.com/file/d/1oN9ojEQCGiDRXlGTu69-hMQeYgwXKgm8/view?usp=sharing

<br>

### 3. Automate all the test suites in the Shared Browser Contexts:

- **Shared Context:** Running all the test suites (Q1, Q2, Q3) at once in the same browser sequentially:
  - URL: https://drive.google.com/file/d/1jDJiJHf0rvvX59yKg10dRUGVNww12MzN/view?usp=sharing

<br>

### 4. Automate tests of all test suites in serial, parallel, and shared browser context:

- **Full suite journey:** Running all the test cases of all the test suits available in this project serial, parallel, and shared browser context:
  - URL: https://drive.google.com/file/d/1UK2hfjawlOaA0Q5T6Mash8HB3YpKCV2V/view?usp=sharing

<br>

## Author

- [@Kaiseremon](https://github.com/Kaiseremon)

