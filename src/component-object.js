/** Represents a Component (web element) on a Page */
class Component {
    /**
     * Creates a Component instance. Either a Selenium By or a Selenium WebElement must be provided.
     * @param {Object} props - Properties for defining the Component.
     * @param {WebDriver} props.driver - The current Selenium WebDriver.
     * @param {By} [props.by] - The Selenium By that is used to locate the Component.
     * @param {WebDriver|Component} [scope=props.driver] - The scope in which to use the By to locate the Component.
     * @param {WebElement} [webElement] - The Selenium WebElement object that represents the Component.
     * @example
     * const myComponent = new Component({
     *     driver: seleniumWebDriver,
     *     by: By.className('target-class')
     * });
     * @example
     * const subComponent = new Component({
     *     driver: seleniumWebDriver,
     *     by: By.className('sub-target-class'),
     *     scope: myComponent
     * });
     */
    constructor({ driver, by, scope = driver, webElement }) {
        if (!driver) throw new Error('A driver must be provided to create a Component');
        if (!webElement && !by) throw new Error('Either the "webElement" or "by" property must be provided to create a Component');

        this._element = webElement;
        this._driver = driver;
        this._by = by;
        this._scope = scope;
    }

    /** Gets the Selenium WebElement that this Component represents. */
    get element() {
        return this._element || (this._element = this._scope.findElement(this._by));
    }

    /**
     * Clears the value if this Component represents an INPUT or TEXTAREA element.
     * @returns {Promise<undefined>}
     */
    clear() {
        return this.element.clear();
    }

    /**
     * Clicks this Component.
     * @returns {Promise<undefined>}
     */
    click() {
        return this.element.click();
    }

    /**
     * Performs a context/right click on this Component.
     * @returns {Promise<undefined>}
     */
    contextClick() {
        return this._driver.actions().contextClick(this.element).perform();
    }

    /**
     * Convenience method for instantiating a Component within the scope of this Component.
     * @param {Object} props Properties for defining the Component.
     * @param {By} props.by - The Selenium By that is used to locate the Component.
     * @param {Component} [props.componentClass=Component] - The class/type of Component that the Component should be created as.
     * @returns {Component} An instance of Component initialized as the provided componentClass.
     * @example
     *  class MyComponent extends Component {
     *      get SubComponent() {
     *          return this.createComponent({
     *              by: By.xpath('.//div[contains(@class, "some-class-partial")]'),
     *              componentClass: MyOtherComponentClass
     *          });
     *      }
     *  }
     */
    createComponent({ by, componentClass = Component }) {
        return new componentClass({
            driver: this._driver,
            by,
            scope: this
        });
    }

    /**
     * Creates an array of Components within the scope of this Component.
     * @param {Object} props Properties for defining the Components.
     * @param {By} props.by - The Selenium By that is used to locate the Components.
     * @param {Component} [props.componentClass=Component] - The class/type of Component that the Components should be created as.
     * @returns {Promise<Array<Component>>} Promise that resolves as an Array of Components initialized as the provided componentClass.
     * @example
     *  class MyComponent extends Component {
     *      getListItems() {
     *          return this.createComponents({
     *              by: By.xpath('.//li'),
     *              componentClass: MyOtherComponentClass
     *          });
     *      }
     *  }
     */
    async createComponents({ by, componentClass = Component }) {
        const components = [];

        const webElements = await this.element.findElements(by);

        for (const webElement of webElements) {
            const component = new componentClass({ driver: this._driver, webElement });
            components.push(component);
        }

        return components;
    }

    /**
     * Performs a double left-click on this Component.
     * @returns {Promise<undefined>}
     */
    doubleClick() {
        return this._driver.actions().doubleClick(this.element).perform();
    }

    /**
     * Performs a drag-and-drop of this Component to another Component.
     * @param {Component} target The Component that this Component is to be dropped on.
     * @returns {Promise<undefined>}
     */
    dragAndDropTo(target) {
        return this._driver.actions().dragAndDrop(this.element, target.element).perform();
    }

    /**
     * Finds a Selenium WebElement within the WebElement that this Component represents.
     * @param {By} by The Selenium By used to locate the WebElement.
     * @returns {WebElementPromise}
     */
    findElement(by) {
        return this.element.findElement(by);
    }

    /**
     * Finds Selenium WebElements withing the WebElement that this Component represents.
     * @param {By} by The Selenium By used to locate the WebElements.
     * @returns {Promise<Array<WebElement>>}
     */
    findElements(by) {
        return this.element.findElements(by);
    }

    /**
     * Gets the current value of the given attribute of this Component.
     * @param {String} attrName Name of the attribute.
     * @returns {Promise<String|null>}
     */
    getAttribute(attrName) {
        return this.element.getAttribute(attrName);
    }

    /**
     * Gets the value of a CSS style of this Component.
     * @param {String} property The name of the CSS style.
     * @returns {Promise<String>}
     */
    getCssValue(property) {
        return this.element.getCssValue(property);
    }

    /**
     * Gets an object that describes this Component's location and size.
     * @returns {Promise<{height: Number, width: Number, x: Number, y: Number}>}
     */
    getRect() {
        return this.element.getRect();
    }

    /**
     * Gets the Components HTML tag name.
     * @returns {Promise<String>}
     */
    getTagName() {
        return this.element.getTagName();
    }

    /**
     * Gets the text contained within this Component. The default is to get the text as it is visually displayed to the user.
     * The 'raw' flag can be used to ge the text as it is provided to the HTML of the page.
     * @param {Boolean} [raw=false] Flag that indicates if the text should be retrieved in its raw form.
     * @returns {Promise<String>}
     */
    getText(raw = false) {
        if (raw) {
            return this.element.getAttribute('textContent');
        }

        return this.element.getText();
    }

    /**
     * Performs the actions of hovering the mouse over the Component and then left-clicking it. Great for Components that are
     * not displayed or able to be interacted with unless the Component is hovered over first.
     * @returns {Promise<undefined>}
     */
    hoverClick() {
        return this._driver.actions().click(this.element).perform();
    }

    /**
     * Gets a value indicating if the Component is currently displayed.
     * @returns {Promise<Boolean>}
     */
    isDisplayed() {
        return this.element.isDisplayed();
    }

    /**
     * Gets a value indicating if the Component is currently enabled.
     * @returns {Promise<Boolean>}
     */
    isEnabled() {
        return this.element.isEnabled();
    }

    /**
     * Gets a value indicating if the Component is present (or exists).
     * @returns {Promise<Boolean>}
     */
    async isPresent() {
        if (this._element) return true;

        if (this._by && this._scope) {
            const elements = await this._scope.findElements(this._by);
            return elements.length > 0;
        }

        return false;
    }

    /**
     * Gets a value that indicates if the Component is currently selected.
     * @returns {Promise<Boolean>}
     */
    isSelected() {
        return this.element.isSelected();
    }

    /**
     * Types a key sequence on the DOM element that this Component represents.
     * @see {@link https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html#sendKeys}
     * @param  {...any} args The sequence of keys to type.
     * @returns {Promise<undefined>}
     */
    sendKeys(...args) {
        return this.element.sendKeys(args);
    }

    /**
     * Submits the form that this Component is part of, or the form itself if this Component represents a FORM element.
     * @returns {Promise<undefined>}
     */
    submit() {
        return this.element.submit();
    }

    /**
     * Takes a screenshot of visible area of this Component.
     * @param {Boolean} [scroll] Indicates if the Component should be scrolled into view to take the screenshot.
     * @returns {Promise<String>} Resolves to the base-64 encoded PNG.
     */
    takeScreenshot(scroll) {
        return this.element.takeScreenshot(scroll);
    }

    /**
     * Waits until the Component is displayed.
     * @param {Number} [timeout=10000] The max amount of time (ms) to wait for the condition to be true.
     * @returns {Promise<undefined>}
     */
    async waitUntilIsDisplayed(timeout = 10000) {
        const self = this;
        await self._driver.wait(() => self.isDisplayed(), timeout);
    }

    /**
     * Waits until the Component is enabled.
     * @param {Number} [timeout=10000] The max amount of time (ms) to wait for the condition to be true.
     * @returns {Promise<undefined>}
     */
    async waitUntilIsEnabled(timeout = 10000) {
        const self = this;
        await self._driver.wait(() => self.isEnabled(), timeout);
    }

    /**
     * Wait until the Component is present.
     * @param {Number} [timeout=10000] The max amount of time (ms) to wait for the condition to be true.
     * @returns {Promise<undefined>}
     */
    async waitUntilIsPresent(timeout = 10000) {
        const self = this;
        await self._driver.wait(() => self.isPresent(), timeout);
    }

    /**
     * Wait until the Component is selected.
     * @param {Number} [timeout=10000] The max amount of time (ms) to wait for the condition to be true.
     * @returns {Promise<undefined>}
     */
    async waitUntilIsSelected(timeout = 10000) {
        const self = this;
        await self._driver.wait(() => self.isSelected(), timeout);
    }
}

module.exports = Component;