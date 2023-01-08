import { WebDriver, ThenableWebDriver } from 'selenium-webdriver';

export interface IPageConfig {
    /**
     * Selenium WebDriver instance.
     */
    driver: WebDriver | ThenableWebDriver;
}

export class Page {
    /**
     * Creates a Page Object instance.
     * @param config Configuration of the Page instance.
     */
    constructor({ driver }: IPageConfig) {
        this._driver = driver;
    }

    // #region Properties

    private _driver: WebDriver | ThenableWebDriver;

    // #endregion

    // #region Methods

    public getTitle(): Promise<string> {
        return this._driver.getTitle();
    }

    // #endregion
}
