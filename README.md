# seleniumgenic
Utilities to improve projects that utilize [selenium-webdriver](https://www.selenium.dev/selenium/docs/api/javascript/index.html). Provides foundational classes for Page and Page Component Objects to help modularize and organize code which leads to improved readability, maintainability, and reusability. Also provides other utilities to aid in common tasks/scenarios.

Implemented in an un-opinionated way providing an easy to understand and use API.

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
- [Details](#details)
  - [Component Objects](#component-objects-1)
    - [Import](#import)
    - [Constructor](#constructor)
    - [clear() => Promise<undefined>](#clear--promiseundefined)
    - [click() => Promise<undefined>](#click--promiseundefined)
    - [contextClick() => Promise<undefined>](#contextclick--promiseundefined)
    - [createComponent(props) => Component](#createcomponentprops--component)
    - [createComponents(props) => Promise<Array<Component>>](#createcomponentsprops--promisearraycomponent)
    - [doubleClick() => Promise<undefined>](#doubleclick--promiseundefined)
    - [dragAndDropTo(target) => Promise<undefined>](#draganddroptotarget--promiseundefined)
    - [getAttribute(attrName) => Promise<String|null>](#getattributeattrname--promisestringnull)
    - [getCssValue(property) => Promise<String|null>](#getcssvalueproperty--promisestringnull)
    - [getRect() => Promise<{height: Number, width: Number, x: Number, y: Number}>](#getrect--promiseheight-number-width-number-x-number-y-number)
    - [getTagName() => Promise<String>](#gettagname--promisestring)
    - [getText(raw = false) => Promise<String>](#gettextraw--false--promisestring)
    - [hoverClick() => Promise<undefined>](#hoverclick--promiseundefined)
    - [isDisplayed() => Promise<Boolean>](#isdisplayed--promiseboolean)
    - [isEnabled() => Promise<Boolean>](#isenabled--promiseboolean)
    - [isPresent() => Promise<Boolean>](#ispresent--promiseboolean)
    - [isSelected() => Promise<Boolean>](#isselected--promiseboolean)
    - [sendKeys(...args) => Promise<undefined>](#sendkeysargs--promiseundefined)
    - [submit() => Promise<undefined>](#submit--promiseundefined)
    - [takeScreenshot() => Promise<String>](#takescreenshot--promisestring)
    - [waitUntilIsDisplayed(timeout = 10000) => Promise<undefined>](#waituntilisdisplayedtimeout--10000--promiseundefined)
    - [waitUntilIsEnabled(timeout = 10000) => Promise<undefined>](#waituntilisenabledtimeout--10000--promiseundefined)
    - [waitUntilIsPresent(timeout = 10000) => Promise<undefined>](#waituntilispresenttimeout--10000--promiseundefined)
    - [waitUntilIsSelected(timeout = 10000) => Promise<undefined>](#waituntilisselectedtimeout--10000--promiseundefined)
  - [Page Objects](#page-objects-1)
    - [Import](#import-1)
    - [Constructor](#constructor-1)
    - [getTitle() => Promise<String>](#gettitle--promisestring)
    - [createComponent(props) => Component](#createcomponentprops--component-1)
    - [createComponents(props) => Promise<Array<Component>>](#createcomponentsprops--promisearraycomponent-1)

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
        await LoginPage.goTo();
        await LoginPage.LoginForm.login({ username: 'joe', password: 'abcd1234' });
    } catch(err) {
        console.error(err);
    } finally {
        await driver.quit();
    }
})();
```

# Details

`seleniumgenic` has zero dependencies. It just takes in a given Selenium [WebDriver](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html) instance and works with it's API. Since the suites of core Selenium packages are constantly updating and only work with the latest versions of browsers, it will be the aim to keep `seleniumgenic` always working with the latest versions of the [selenium-webdriver](https://www.selenium.dev/selenium/docs/api/javascript/index.html).

## Component Objects

Component Objects represent individual or groups of elements on a page. Like with the example above, components could be the individual INPUT elements, or represent a Login form that might be reused on multiple pages in an application.

### Import

```javascript
const { Component } = require('seleniumgenic');
```

### Constructor

Creates a Component instance. Takes a single `props` object as a parameter. Either a Selenium By or Selenium WebElement must be provided.

TIP: While Components can be created via the Constructor, it is highly recommended to make use of the `createComponent(s)` functions of Page and Component classes as they will take care of creating the Component instance with proper `driver` and `scope` properties as well as determining if the By or WebElement should be utilized.

**Props**
- `driver`: The current Selenium WebDriver instance. Required.
- `by`: The Selenium By that is used to locate the Component. If not provided, `webElement` must be provided.
- `scope`: The scope in which to use the By to locate the Component. Must be a WebDriver or Component. Optional, will default to the `driver` if not provided.
- `webElement`: The Selenium WebElement object that represents the Component. If not provided, `by` must be provided.

### clear() => Promise<undefined>

Clears the value if this Component represents an INPUT or TEXTAREA element.

### click() => Promise<undefined>

Clicks this Component.

### contextClick() => Promise<undefined>

Performs a context/right click on this Component.

### createComponent(props) => Component

Convenience method for instantiating a Component within the scope of this Component.

**props**

- `by`: The Selenium By that is used to locate the Component. Required.
- `componentClass`: The class/type of Component that the Component should be created as. Optional, will default to `Component` class.

### createComponents(props) => Promise<Array<Component>>

Creates an array of Components within the scope of this Component.

**props**

- `by`: The Selenium By that is used to locate the Components. Required.
- `componentClass`: The class/type of Component that the Components should be created as. Optional, will default to `Component` class.

### doubleClick() => Promise<undefined>

Performs a double left-click on this Component.

### dragAndDropTo(target) => Promise<undefined>

Performs a drag-and-drop of this Component to another Component.

- `target`: The Component that this Component is to be dropped on.

### getAttribute(attrName) => Promise<String|null>

Gets the current value of the given attribute of this Component.

### getCssValue(property) => Promise<String|null>

Gets the value of a CSS style of this Component.

### getRect() => Promise<{height: Number, width: Number, x: Number, y: Number}>

Gets an object that describes this Component's location and size.

### getTagName() => Promise<String>

Gets the Components HTML tag name.

### getText(raw = false) => Promise<String>

Gets the text contained within this Component. The default is to get the text as it is visually displayed to the user. The 'raw' flag can be used to ge the text as it is provided to the HTML of the page.

- `raw`: Boolean, flag that indicates if the text should be retrieved in its raw form.

### hoverClick() => Promise<undefined>

Performs the actions of hovering the mouse over the Component and then left-clicking it. Great for Components that are not displayed or able to be interacted with unless the Component is hovered over first.

### isDisplayed() => Promise<Boolean>

Gets a value indicating if the Component is currently displayed.

### isEnabled() => Promise<Boolean>

Gets a value indicating if the Component is currently enabled.

### isPresent() => Promise<Boolean>

Gets a value indicating if the Component is present (exists).

### isSelected() => Promise<Boolean>

Gets a value indicating if the Component is currently selected.

### sendKeys(...args) => Promise<undefined>

Types a key sequence on the DOM element that this Component represents. See [WebElement.sendKeys()](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html#sendKeys) for more details.

### submit() => Promise<undefined>

Submits the form that this Component is part of, or the form itself if this Component represents a FORM element.

### takeScreenshot() => Promise<String>

Takes a screenshot of visible area of this Component and returns the base-64 encoded PNG.

- `scroll`: Indicates if the Component should be scrolled into view to take the screenshot. Optional.

### waitUntilIsDisplayed(timeout = 10000) => Promise<undefined>

Waits until the Component is displayed.

- `timeout`: The max amount of time (ms) to wait for the condition to be true. Optional, default is 10000.

### waitUntilIsEnabled(timeout = 10000) => Promise<undefined>

Waits until the Component is enabled.

- `timeout`: The max amount of time (ms) to wait for the condition to be true. Optional, default is 10000.

### waitUntilIsPresent(timeout = 10000) => Promise<undefined>

Waits until the Component is present.

- `timeout`: The max amount of time (ms) to wait for the condition to be true. Optional, default is 10000.

### waitUntilIsSelected(timeout = 10000) => Promise<undefined>

Waits until the Component is selected.

- `timeout`: The max amount of time (ms) to wait for the condition to be true. Optional, default is 10000.

## Page Objects

Page Objects represent individual pages of a Web Application and represent collections of Components.

### Import

```javascript
const { Page } = require('seleniumgenic');
```

### Constructor

Creates a Page instance. Takes a single `props` object as a parameter.

**Props**
- `driver`: The current Selenium WebDriver instance. Required.

### getTitle() => Promise<String>

Gets the current page title.

### createComponent(props) => Component

Convenience method for instantiating a Component within the scope of this Page.

**props**

- `by`: The Selenium By that is used to locate the Component. Required.
- `componentClass`: The class/type of Component that the Component should be created as. Optional, will default to `Component` class.

### createComponents(props) => Promise<Array<Component>>

Creates an array of Components within the scope of this Page.

**props**

- `by`: The Selenium By that is used to locate the Components. Required.
- `componentClass`: The class/type of Component that the Components should be created as. Optional, will default to `Component` class.