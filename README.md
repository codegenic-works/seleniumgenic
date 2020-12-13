# seleniumgenic
Utilities to improve projects that utilize [selenium-webdriver](https://www.selenium.dev/selenium/docs/api/javascript/index.html). Provides foundational classes for Page and Page Component Objects to help modularize and organize code which leads to improved readbility, maintainability, and reusability. Also provides other utilies to aid in common tasks/scenarios.

Implemented in an unopinionated way providing an an easy to understand and use API.

# Install

`npm install -S seleniumgenic`

# Contents
- [seleniumgenic](#seleniumgenic)
- [Install](#install)
- [Contents](#contents)
- [Usage](#usage)
  - [Component Objects](#component-objects)
  - [Page Objects](#page-objects)
  - [Put It Together](#put-it-together)

# Usage

## Component Objects

```javascript
// components/login-form.js
const { Component } = require('seleniumgenic');
const { By } = require('selenium');

class LoginForm extends Component {
    get UsernameInput() {
        return this.createComponent({
            by: By.id('username')
        });
    }

    get PasswordInput() {
        return this.createComponent({
            by: By.id('password')
        });
    }

    get LoginButton() {
        return this.createComponent({
            by: By.id('login')
        });
    }

    async login({ username, password }) {
        await this.UsernameInput.sendKeys(username);
        await this.PasswordInput.sendKeys(password);
        return this.LoginButton.click();
    }
}

module.exports = LoginForm;
```

## Page Objects

```javascript
// login-page.js
const { Page, Component } = require('seleniumgenic');
const LoginForm = require('./components/login-form');
const { By } = require('selenium-webdriver');

class LoginPage extends Page {
    get LoginForm() {
        return this.createComponent({
            by: By.className('login-panel'),
            componentClass: LoginForm
        });
    }

    get RegisterLink() {
        return this.createComponent({
            by: By.id('register')
        })
    }

    goTo() {
        return this._driver.get('url to login page');
    }
}
```

## Put It Together

```javascript
// main.js
require('chromedriver');
const { Builder } = require('selenium-webdriver');
const LoginPage = Require('./login-page');

(async function() {
    try {
        const driver = await new Builder().forBrowser('chrome').build();
        const LoginPage = new LoginPage({ driver });
        await LoginPage.LoginForm.login({ username: 'joe', password: 'abcd1234' });
    } catch(err) {
        console.error(err);
    } finally {
        await driver.quit();
    }
})();
```