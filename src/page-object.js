const Component = require('./component-object');

/** Represents a Web Page */
class Page {
    /**
     * Creates a Page instance.
     * @param {Object} props - Properties for defining the Page.
     * @param {WebDriver} props.driver - The Selenium WebDriver instance.
     */
    constructor({ driver }) {
        this._driver = driver;
    }

    /**
     * Gets the current page title.
     * @returns {Promise<String>}
     */
    getTitle() {
        return this._driver.getTitle();
    }

    /**
     * Convenience method for instantiating a Component within the scope of this Page.
     * @param {Object} props Properties for defining the Component.
     * @param {By} props.by - The Selenium By that is used to locate the Component.
     * @param {Component} [props.componentClass=Component] - The class/type of Component that the Component should be created as.
     * @returns {Component} An instance of Component initialized as the provided componentClass.
     * @example
     *  class MyPage extends Page {
     *      get MyComponent() {
     *          return this.createComponent({
     *              by: By.xpath('.//div[contains(@class, "some-class-partial")]'),
     *              componentClass: MyComponentClass
     *          });
     *      }
     *  }
     */
    createComponent({ by, componentClass = Component }) {
        return new componentClass({
            driver: this._driver,
            by
        });
    }

    /**
     * Creates an array of Components within the scope of this Page.
     * @param {Object} props Properties for defining the Components.
     * @param {By} props.by - The Selenium By that is used to locate the Components.
     * @param {Component} [props.componentClass=Component] - The class/type of Component that the Components should be created as.
     * @returns {Promise<Array<Component>>} Promise that resolves as an Array of Components initialized as the provided componentClass.
     * @example
     *  class MyPage extends Page {
     *      getListItems() {
     *          return this.createComponents({
     *              by: By.xpath('.//li'),
     *              componentClass: MyComponentClass
     *          });
     *      }
     *  }
     */
    async createComponents({ by, componentClass = Component }) {
        const components = [];

        const webElements = await this._driver.findElements(by);

        for (const webElement of webElements) {
            const component = new componentClass({ driver: this._driver, webElement });
            components.push(component);
        }

        return components;
    }
}

module.exports = Page;