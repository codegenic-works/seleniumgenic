import {
    Actions,
    Options,
    WebDriver,
    WebElement,
    WebElementPromise
} from 'selenium-webdriver';
import sinon, { stubConstructor } from 'ts-sinon';

export class SeleniumStubs {
    public actionsStub = {
        click: sinon.stub().returnsThis(),
        contextClick: sinon.stub().returnsThis(),
        doubleClick: sinon.stub().returnsThis(),
        dragAndDrop: sinon.stub().returnsThis(),
        perform: sinon.stub().resolves()
    };
    public actionsPartial: Partial<Actions> = {
        ...this.actionsStub
    };
    public locatorStub = sinon.stub();
    public navigationStub = {
        back: sinon.stub().resolves(),
        forward: sinon.stub().resolves(),
        refresh: sinon.stub().resolves(),
        to: sinon.stub().resolves()
    };
    public windowStub = {
        fullscreen: sinon.stub().resolves(),
        maximize: sinon.stub().resolves(),
        minimize: sinon.stub().resolves(),
        setRect: sinon.stub().resolves()
    };
    public optionsStub = {
        window: sinon.stub().returns(this.windowStub)
    };
    public optionsPartial: Partial<Options> = {
        ...this.optionsStub
    };
    public webElementStub = stubConstructor(WebElement);
    public webElementPromiseStub = {
        ...this.webElementStub
    };
    public webElementPromisePartial: Partial<WebElementPromise> = {
        ...this.webElementPromiseStub
    };
    public webDriverStub = stubConstructor(WebDriver);
    public webElementResults = {
        findElement: this.webElementPromisePartial as WebElementPromise,
        findElements: [this.webElementStub],
        getAttribute: 'attribute-value',
        getCssValue: 'css-value',
        getRect: {
            height: 1,
            width: 10,
            x: 0,
            y: 100
        },
        getTagName: 'tagname',
        getText: 'some text',
        isDisplayed: true,
        isEnabled: true,
        isSelected: true,
        takeScreenshot: 'some base64 encoded string'
    };
    public webDriverResults = {
        findElement: this.webElementPromisePartial as WebElementPromise,
        findElements: [this.webElementStub],
        getCurrentUrl: 'https://www.codegenicworks.com',
        takeScreenshot: 'some base64 encoded string'
    };

    constructor() {
        // #region webElementStub setup

        this.webElementStub.findElement.returns(
            this.webElementResults.findElement
        );

        this.webElementStub.findElements.resolves(
            this.webElementResults.findElements
        );

        this.webElementStub.getAttribute.resolves(
            this.webElementResults.getAttribute
        );

        this.webElementStub.getCssValue.resolves(
            this.webElementResults.getCssValue
        );

        this.webElementStub.getRect.resolves(this.webElementResults.getRect);

        this.webElementStub.getTagName.resolves(
            this.webElementResults.getTagName
        );

        this.webElementStub.getText.resolves(this.webElementResults.getText);

        this.webElementStub.isDisplayed.resolves(
            this.webElementResults.isDisplayed
        );

        this.webElementStub.isEnabled.resolves(
            this.webElementResults.isEnabled
        );

        this.webElementStub.isSelected.resolves(
            this.webElementResults.isSelected
        );

        this.webElementStub.takeScreenshot.resolves(
            this.webElementResults.takeScreenshot
        );

        // #endregion

        // #region webDriverStub setup

        this.webDriverStub.actions.returns(this.actionsPartial as Actions);

        this.webDriverStub.findElement.returns(
            this.webDriverResults.findElement
        );

        this.webDriverStub.findElements.resolves(
            this.webDriverResults.findElements
        );

        this.webDriverStub.getCurrentUrl.resolves(
            this.webDriverResults.getCurrentUrl
        );

        this.webDriverStub.manage.returns(this.optionsPartial as Options);

        this.webDriverStub.navigate.returns(this.navigationStub);

        this.webDriverStub.takeScreenshot.resolves(
            this.webDriverResults.takeScreenshot
        );

        // #endregion
    }
}
