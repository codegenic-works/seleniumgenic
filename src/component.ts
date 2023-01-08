import {
    ThenableWebDriver,
    IRectangle,
    WebDriver,
    WebElementPromise,
    Locator,
    WebElement
} from 'selenium-webdriver';

export interface IScope {
    findElement(locator: Locator): WebElementPromise;
    findElements(locator: Locator): Promise<Array<WebElement>>;
}

export interface IComponentConfig {
    /**
     * Locator to use to find the Component.
     */
    locator: Locator;
    /**
     * Selenium WebDriver instance.
     */
    driver: WebDriver | ThenableWebDriver;
    /**
     * The scope to locate the component within. WebDriver (entire page) or Component (within a parent component).
     */
    scope?: IScope;
}

/**
 * Represents a Page Object Component.
 */
export class Component {
    /**
     * Creates a Page Object Component instance.
     * @param config Configuration of the Component instance.
     */
    constructor({ locator, driver, scope }: IComponentConfig) {
        this._locator = locator;
        this._driver = driver;
        this._scope = scope ?? driver;
    }

    // #region Properties

    private _driver: WebDriver | ThenableWebDriver;
    private _locator: Locator;
    private _scope: IScope;

    // #endregion

    // #region Methods

    /**
     * Performs a WeDriver | WebElement findElement to get the WebElementPromise based on
     * the given locator.
     * @returns The WebElementPromise that represents the element in the browser.
     */
    public getElement(): WebElementPromise {
        return this._scope.findElement(this._locator);
    }

    /**
     * Clears the current value of the component.
     */
    public async clear(): Promise<void> {
        const el = await this.getElement();
        return el.clear();
    }

    /**
     * Click the component.
     */
    public async click(): Promise<void> {
        const el = await this.getElement();
        return el.click();
    }

    /**
     * Performs a context/right click on this component.
     */
    public async contextClick(): Promise<void> {
        const el = await this.getElement();
        return this._driver.actions().contextClick(el).perform();
    }

    /**
     * Performs a double click on the component.
     */
    public async doubleClick(): Promise<void> {
        const el = await this.getElement();
        return this._driver.actions().doubleClick(el).perform();
    }

    /**
     * Performs a drag-and-drop of this component to another component.
     * @param target The component that represents the target to drop this component on to.
     */
    public async dragAndDropOn(target: Component): Promise<void> {
        const el = await this.getElement();
        const targetEl = await target.getElement();
        return this._driver.actions().dragAndDrop(el, targetEl).perform();
    }

    /**
     * Finds a Selenium WebElementPromise within this component.
     * @param locator Locator to use to find the Component.
     * @returns The WebElementPromise that represents the element in the browser.
     */
    public findElement(locator: Locator): WebElementPromise {
        return this.getElement().findElement(locator);
    }

    /**
     * Finds all Selenium Webelements within this component.
     * @param locator Locator to use to finde the elements.
     * @returns Array of all Selenium WebElements that are found based on the locator.
     */
    public findElements(locator: Locator): Promise<Array<WebElement>> {
        return this.getElement().findElements(locator);
    }

    /**
     * Gets the value of the attribute with the given name.
     * @param attributeName The name of the attribute.
     * @returns The value of the attribute.
     */
    public async getAttribute(attributeName: string): Promise<string> {
        const el = await this.getElement();
        return el.getAttribute(attributeName);
    }

    /**
     * Gets the value of the CSS property with the given namee.
     * @param property The name of the CSS property.
     * @returns The value of the CSS property.
     */
    public async getCssValue(property: string): Promise<string> {
        const el = await this.getElement();
        return el.getCssValue(property);
    }

    /**
     * Gets the component's geometry (bounding rectangle's location and size).
     * @returns The component's geometry.
     */
    public async getGeometry(): Promise<IRectangle> {
        const el = await this.getElement();
        return el.getRect();
    }

    /**
     * Gets the components HTML tag name.
     * @returns The tag name.
     */
    public async getTagName(): Promise<string> {
        const el = await this.getElement();
        return el.getTagName();
    }

    /**
     * Gets the text contained within this Component. The default is to get the text as it is
     * visually displayed to the user.
     * The 'raw' flag can be used to ge the text as it is provided to the HTML of the page.
     * @param raw Flag that indicates if the text should be retrieved in its raw form. Default is false.
     * @returns The text of the component.
     */
    public async getText(raw = false): Promise<string> {
        const el = await this.getElement();

        if (raw) {
            return el.getAttribute('textContent');
        } else {
            return el.getText();
        }
    }

    /**
     * Performs the actions of hovering the mouse over the component and then left-clicking it.
     */
    public async hoverClick() {
        const el = await this.getElement();
        return this._driver.actions().click(el).perform();
    }

    /**
     * Returns true if the component is currently displayed, otherwise false.
     * @returns True if the component is currently displayed, otherwise false.
     */
    public async isDisplayed(): Promise<boolean> {
        const el = await this.getElement();
        return el.isDisplayed();
    }

    /**
     * Returns true if the component is currently enabled, otherwise returns false.
     * Based on if the related HTML element currently has the `disabled` attribute.
     * @returns True if the component is enabled, otherwise false.
     */
    public async isEnabled(): Promise<boolean> {
        const el = await this.getElement();
        const isDisabled = await el.getAttribute('disabled');
        return !(isDisabled === 'true');
    }

    /**
     * Returns true if the component is currently present in the DDM, otherwise returns false.
     * @returns True if this component is currently present in the DOM.
     */
    public async isPresent(): Promise<boolean> {
        const findResults = await this._scope.findElements(this._locator);
        return findResults.length > 0;
    }

    /**
     * Returns true if the component is currently selected, otherwise false.
     * @returns True if the component is currently selected, otherwise false.
     */
    public async isSelected(): Promise<boolean> {
        const el = await this.getElement();
        return el.isSelected();
    }

    /**
     * Types the sequence of given keys targeting this component.
     * @param var_args The sequence of keys to type. All arguments will be joined into a single sequence.
     */
    public async sendKeys(
        ...var_args: (string | number | Promise<string | number>)[]
    ): Promise<void> {
        const el = await this.getElement();
        return el.sendKeys(...var_args);
    }

    /**
     * Submits the form that this Component is part of, or the form itself if this Component
     * represents a FORM element.
     */
    public async submit(): Promise<void> {
        const el = await this.getElement();
        return el.submit();
    }

    /**
     * Takes a screenshot of the visible area of this component.
     * @param scroll Indicates if the component should be scrolled into view to take the screenshot.
     * @returns The base-64 encoded PNG.
     */
    public async takeScreenshot(scroll = false): Promise<string> {
        const el = await this.getElement();
        return el.takeScreenshot(scroll);
    }

    /**
     * Waits until the Component is displayed.
     * @param timeout The max amount of time (ms) to wait for the condition to be true.
     */
    public async waitUntilIsDisplayed(timeout = 10_000): Promise<void> {
        const getCondition = (comp: Component) => {
            return () => comp.isDisplayed();
        };

        await this._driver.wait(getCondition(this), timeout);
    }

    /**
     * Waits until the Component is enabled.
     * @param timeout The max amount of time (ms) to wait for the condition to be true.
     */
    public async waitUntilIsEnabled(timeout = 10_000): Promise<void> {
        const getCondition = (comp: Component) => {
            return () => comp.isEnabled();
        };

        await this._driver.wait(getCondition(this), timeout);
    }

    /**
     * Waits until the Component is present.
     * @param timeout The max amount of time (ms) to wait for the condition to be true.
     */
    public async waitUntilIsPresent(timeout = 10_000): Promise<void> {
        const getCondition = (comp: Component) => {
            return () => comp.isPresent();
        };

        await this._driver.wait(getCondition(this), timeout);
    }

    /**
     * Waits until the Component is selected.
     * @param timeout The max amount of time (ms) to wait for the condition to be true.
     */
    public async waitUntilIsSelected(timeout = 10_000): Promise<void> {
        const getCondition = (comp: Component) => {
            return () => comp.isSelected();
        };

        await this._driver.wait(getCondition(this), timeout);
    }

    // #endregion
}
