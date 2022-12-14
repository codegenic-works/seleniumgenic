import { IRectangle, ThenableWebDriver, WebDriver } from 'selenium-webdriver';

/**
 * Window Sizes.
 */
export enum WindowSize {
    /**
     * Window full screen mode.
     */
    Fullscreen,
    /**
     * Window maximized mode.
     */
    Maximized,
    /**
     * Window minimized mode.
     */
    Minimized
}

export class Browser {
    private driver: WebDriver | ThenableWebDriver;

    /**
     * Creates a Browser instance.
     * @param param0 options - Options for the Browser instance.
     */
    public constructor({
        driver
    }: {
        /**
         * Selenium WebDriver instance.
         */
        driver: WebDriver | ThenableWebDriver;
    }) {
        this.driver = driver;
    }

    /**
     * Closes the Browser window and invalidates the WebDriver session.
     * @returns {Promise<void>}
     */
    public close(): Promise<void> {
        return this.driver.quit();
    }

    /**
     * Gets the current URL present in this Browser.
     * @returns {Promise<string>} The current URL presented in the Browser.
     */
    public getUrl(): Promise<string> {
        return this.driver.getCurrentUrl();
    }

    /**
     * Navigates back to the previous URL in the Browser history.
     * @returns {Promise<void>}
     */
    public goBack(): Promise<void> {
        return this.driver.navigate().back();
    }

    /**
     * Navigates forward one URL in the Browser history.
     * @returns {Promise<void>}
     */
    public goForward(): Promise<void> {
        return this.driver.navigate().forward();
    }

    /**
     * Navigates the browser to the specified page.
     * @param {object} options - Options for specifying the page to navigate to.
     * @returns {Promise<void>}
     */
    public goTo({
        url
    }: {
        /**
         * The URL of the target page.
         */
        url: string;
    }): Promise<void> {
        return this.driver.navigate().to(url);
    }

    /**
     * Refreshes the current page in the browser.
     * @returns {Promise<void>}
     */
    public refresh(): Promise<void> {
        return this.driver.navigate().refresh();
    }

    /**
     * Sizes the Browser window.
     * @returns {Promise<void>}
     */
    public async setSize(
        size: WindowSize | Partial<IRectangle>
    ): Promise<void> {
        const window = this.driver.manage().window();

        if (size === WindowSize.Fullscreen) {
            await window.fullscreen();
        } else if (size === WindowSize.Maximized) {
            await window.maximize();
        } else if (size === WindowSize.Minimized) {
            await window.minimize();
        } else {
            await window.setRect(size);
        }
    }

    /**
     * Takes a screenshot of the current page rendered in the browser.
     * @returns {Promise<string>} A base-64 encoded PNG.
     */
    public takeScreenshot(): Promise<string> {
        return this.driver.takeScreenshot();
    }
}
