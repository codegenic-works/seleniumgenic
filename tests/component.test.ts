import { expect } from 'chai';
import { SeleniumStubs } from './stubs/selenium-stubs';
import { Component } from '../src/component';
import sinon, { StubbedInstance, stubConstructor } from 'ts-sinon';
import { WebElementPromise } from 'selenium-webdriver';

describe('Component', () => {
    let seleniumStub: SeleniumStubs;
    let componentInstance: Component;

    beforeEach(() => {
        seleniumStub = new SeleniumStubs();
        componentInstance = new Component({
            locator: seleniumStub.locatorStub,
            driver: seleniumStub.webDriverStub
        });
    });

    describe('constructor', () => {
        it('should create an instance successfully', () => {
            expect(componentInstance).to.be.an.instanceof(Component);
        });
    });

    describe('clear', () => {
        it('should call WebElement.clear', async () => {
            await componentInstance.clear();

            expect(
                seleniumStub.webElementPromiseStub.clear
            ).to.have.been.calledOnceWith();
        });
    });

    describe('click', () => {
        it('should call WebElement.click', async () => {
            await componentInstance.click();

            expect(
                seleniumStub.webElementPromiseStub.click
            ).to.have.been.calledOnceWith();
        });
    });

    describe('contextClick', () => {
        it('should call actions.contextClick as expected', async () => {
            await componentInstance.contextClick();

            expect(
                seleniumStub.actionsStub.contextClick
            ).to.have.been.calledOnceWith(
                seleniumStub.webDriverResults.findElement
            );
        });

        it('should call actions.perform as expected', async () => {
            await componentInstance.contextClick();

            expect(
                seleniumStub.actionsStub.perform
            ).to.have.been.calledOnceWith();
        });
    });

    describe('doubleClick', () => {
        it('should call actions.doubleClick as expected', async () => {
            await componentInstance.doubleClick();

            expect(
                seleniumStub.actionsStub.doubleClick
            ).to.have.been.calledOnceWith(
                seleniumStub.webDriverResults.findElement
            );
        });

        it('should call actions.perform as expected', async () => {
            await componentInstance.doubleClick();

            expect(
                seleniumStub.actionsStub.perform
            ).to.have.been.calledOnceWith();
        });
    });

    describe('dragAndDropOn', () => {
        const targetEl: Partial<WebElementPromise> = {};
        let target: StubbedInstance<Component>;

        beforeEach(() => {
            target = stubConstructor(Component, {
                locator: seleniumStub.locatorStub,
                driver: seleniumStub.webDriverStub
            });
            target.getElement.resolves(targetEl as WebElementPromise);
        });

        it('should call actions.dragAndDrop as expected', async () => {
            await componentInstance.dragAndDropOn(target);

            expect(
                seleniumStub.actionsStub.dragAndDrop
            ).to.have.been.calledOnceWith(
                seleniumStub.webDriverResults.findElement,
                targetEl
            );
        });

        it('should call actions.perform as expected', async () => {
            await componentInstance.dragAndDropOn(target);

            expect(
                seleniumStub.actionsStub.perform
            ).to.have.been.calledOnceWith();
        });
    });

    describe('getAttribute', () => {
        it('should call WebElement.getAttribute as expected', async () => {
            const name = 'attribute-name';
            await componentInstance.getAttribute(name);

            expect(
                seleniumStub.webElementPromiseStub.getAttribute
            ).to.have.been.calledOnceWith(name);
        });

        it('should resolve to the getAttribute resolved value', async () => {
            const result = await componentInstance.getAttribute('name');

            expect(result).to.equal(
                seleniumStub.webElementResults.getAttribute
            );
        });
    });

    describe('getCssValue', () => {
        it('should call WebElement.getCssValue as expected', async () => {
            const name = 'property-name';
            await componentInstance.getCssValue(name);

            expect(
                seleniumStub.webElementPromiseStub.getCssValue
            ).to.have.been.calledOnceWith(name);
        });

        it('should resolve to the getCssValue resolved value', async () => {
            const result = await componentInstance.getCssValue('name');

            expect(result).to.equal(seleniumStub.webElementResults.getCssValue);
        });
    });

    describe('getGeometry', () => {
        it('should call webElement.getRect as expected', async () => {
            await componentInstance.getGeometry();

            expect(
                seleniumStub.webElementPromiseStub.getRect
            ).to.have.been.calledOnceWith();
        });

        it('should resolve to the getRect resolved value', async () => {
            const result = await componentInstance.getGeometry();

            expect(result).to.equal(seleniumStub.webElementResults.getRect);
        });
    });

    describe('getTagName', () => {
        it('should call webElement.getTagName', async () => {
            await componentInstance.getTagName();

            expect(
                seleniumStub.webElementPromiseStub.getTagName
            ).calledOnceWith();
        });

        it('should resolve to the getTagName resolved value', async () => {
            const result = await componentInstance.getTagName();

            expect(result).to.equal(seleniumStub.webElementResults.getTagName);
        });
    });

    describe('getText', () => {
        it('should call webElement.getText', async () => {
            await componentInstance.getText();

            expect(
                seleniumStub.webElementPromiseStub.getText
            ).to.have.been.calledOnceWith();
        });

        it('should resolve to the getText resolved value', async () => {
            const result = await componentInstance.getText();

            expect(result).to.equal(seleniumStub.webElementResults.getText);
        });

        it('should call webElement.getAttribute as expected if raw = true', async () => {
            await componentInstance.getText(true);

            expect(
                seleniumStub.webElementPromiseStub.getAttribute
            ).to.have.been.calledOnceWith('textContent');
        });

        it('should not call webElement.getText when raw = true', async () => {
            await componentInstance.getText(true);

            expect(seleniumStub.webElementPromiseStub.getText).not.to.have.been
                .called;
        });

        it('should resolve to the resolved value of webElement.getAttribute when raw = true', async () => {
            const result = await componentInstance.getText(true);

            expect(result).to.equal(
                seleniumStub.webElementResults.getAttribute
            );
        });
    });

    describe('hoverClick', () => {
        it('should call actions.click as expected', async () => {
            await componentInstance.hoverClick();

            expect(
                seleniumStub.actionsStub.click
            ).to.have.been.calledOnceWith();
        });

        it('should call actions.perform as expected', async () => {
            await componentInstance.hoverClick();

            expect(
                seleniumStub.actionsStub.perform
            ).to.have.been.calledOnceWith();
        });
    });

    describe('isDisplayed', () => {
        it('should call webElement.isDisplayed as expected', async () => {
            await componentInstance.isDisplayed();

            expect(
                seleniumStub.webElementStub.isDisplayed
            ).to.have.been.calledOnceWith();
        });

        it('should resolve to the webElement.isDisplayed resolved value', async () => {
            const result = await componentInstance.isDisplayed();

            expect(result).to.equal(seleniumStub.webElementResults.isDisplayed);
        });
    });

    describe('isEnabled', () => {
        it('should call WebElement.getAttribute as expected', async () => {
            await componentInstance.isEnabled();

            expect(
                seleniumStub.webElementPromiseStub.getAttribute
            ).to.have.been.calledOnceWith('disabled');
        });

        it('should resolve to true if the element does not have a disabled attribute', async () => {
            seleniumStub.webElementStub.getAttribute.resolves();

            const result = await componentInstance.isEnabled();

            expect(result).to.equal(true);
        });

        it('should resolve to false if the element does have a disabled attribute', async () => {
            seleniumStub.webElementStub.getAttribute.resolves('true');

            const result = await componentInstance.isEnabled();

            expect(result).to.equal(false);
        });
    });

    describe('isPresent', () => {
        it('should call driver.findElements as expected', async () => {
            await componentInstance.isPresent();

            expect(
                seleniumStub.webDriverStub.findElements
            ).to.have.been.calledOnceWith(seleniumStub.locatorStub);
        });

        it('should resolve to true if the array retuned has a length longer than 0', async () => {
            const result = await componentInstance.isPresent();

            expect(result).to.be.true;
        });

        it('should resolve to false if the array returned has a length of 0', async () => {
            seleniumStub.webDriverStub.findElements.resolves([]);

            const result = await componentInstance.isPresent();

            expect(result).to.be.false;
        });
    });

    describe('isSelected', () => {
        it('should call webElement.isSelected as expected', async () => {
            await componentInstance.isSelected();

            expect(
                seleniumStub.webElementStub.isSelected
            ).to.have.been.calledOnceWith();
        });

        it('should resolve to the webElement.isSelected resolved value', async () => {
            const result = await componentInstance.isSelected();

            expect(result).to.equal(seleniumStub.webElementResults.isSelected);
        });
    });

    describe('sendKeys', () => {
        it('should call webElement.sendKeys as expected', async () => {
            const keys = 'Hello World!';
            await componentInstance.sendKeys(keys);

            expect(
                seleniumStub.webElementStub.sendKeys
            ).to.have.been.calledOnceWith(keys);
        });
    });

    describe('submit', () => {
        it('should call webElement.submit as expected', async () => {
            await componentInstance.submit();

            expect(
                seleniumStub.webElementStub.submit
            ).to.have.been.calledOnceWith();
        });
    });

    describe('takeScreenshot', () => {
        it('should call webElement.takeScreenshot as expected', async () => {
            await componentInstance.takeScreenshot(true);

            expect(
                seleniumStub.webElementStub.takeScreenshot
            ).to.have.been.calledOnceWith(true);
        });

        it('should resolve to the webElement.takeScreenshot resolved value', async () => {
            const result = await componentInstance.takeScreenshot();

            expect(result).to.equal(
                seleniumStub.webElementResults.takeScreenshot
            );
        });
    });

    describe('waitUntilIsDisplayed', () => {
        it('should call webDriver.wait as expected', async () => {
            await componentInstance.waitUntilIsDisplayed();

            expect(seleniumStub.webDriverStub.wait).to.have.been.calledOnceWith(
                sinon.match.func,
                10_000
            );
        });

        it('should call webDriver.wait as expected when a different timeout is provided', async () => {
            const customTimeout = 25_000;

            await componentInstance.waitUntilIsDisplayed(customTimeout);

            expect(seleniumStub.webDriverStub.wait).to.have.been.calledOnceWith(
                sinon.match.func,
                customTimeout
            );
        });

        describe('wait callback', () => {
            it('should call isDisplayed', async () => {
                componentInstance.isDisplayed = sinon.spy();
                await componentInstance.waitUntilIsDisplayed();

                const cb = seleniumStub.webDriverStub.wait.getCall(0)
                    .args[0] as () => Promise<boolean>;

                await cb();

                expect(
                    componentInstance.isDisplayed
                ).to.have.been.calledOnceWith();
            });
        });
    });

    describe('waitUntilIsEnabled', () => {
        it('should call webDriver.wait as expected', async () => {
            await componentInstance.waitUntilIsEnabled();

            expect(seleniumStub.webDriverStub.wait).to.have.been.calledOnceWith(
                sinon.match.func,
                10_000
            );
        });

        it('should call webDriver.wait as expected when a different timeout is provided', async () => {
            const customTimeout = 25_000;

            await componentInstance.waitUntilIsEnabled(customTimeout);

            expect(seleniumStub.webDriverStub.wait).to.have.been.calledOnceWith(
                sinon.match.func,
                customTimeout
            );
        });

        describe('wait callback', () => {
            it('should call isEnabled', async () => {
                componentInstance.isEnabled = sinon.spy();
                await componentInstance.waitUntilIsEnabled();

                const cb = seleniumStub.webDriverStub.wait.getCall(0)
                    .args[0] as () => Promise<boolean>;

                await cb();

                expect(
                    componentInstance.isEnabled
                ).to.have.been.calledOnceWith();
            });
        });
    });

    describe('waitUntilIsPresent', () => {
        it('should call webDriver.wait as expected', async () => {
            await componentInstance.waitUntilIsPresent();

            expect(seleniumStub.webDriverStub.wait).to.have.been.calledOnceWith(
                sinon.match.func,
                10_000
            );
        });

        it('should call webDriver.wait as expected when a different timeout is provided', async () => {
            const customTimeout = 25_000;

            await componentInstance.waitUntilIsPresent(customTimeout);

            expect(seleniumStub.webDriverStub.wait).to.have.been.calledOnceWith(
                sinon.match.func,
                customTimeout
            );
        });

        describe('wait callback', () => {
            it('should call isPresent', async () => {
                componentInstance.isPresent = sinon.spy();
                await componentInstance.waitUntilIsPresent();

                const cb = seleniumStub.webDriverStub.wait.getCall(0)
                    .args[0] as () => Promise<boolean>;

                await cb();

                expect(
                    componentInstance.isPresent
                ).to.have.been.calledOnceWith();
            });
        });
    });

    describe('waitUntilIsSelected', () => {
        it('should call webDriver.wait as expected', async () => {
            await componentInstance.waitUntilIsSelected();

            expect(seleniumStub.webDriverStub.wait).to.have.been.calledOnceWith(
                sinon.match.func,
                10_000
            );
        });

        it('should call webDriver.wait as expected when a different timeout is provided', async () => {
            const customTimeout = 25_000;

            await componentInstance.waitUntilIsSelected(customTimeout);

            expect(seleniumStub.webDriverStub.wait).to.have.been.calledOnceWith(
                sinon.match.func,
                customTimeout
            );
        });

        describe('wait callback', () => {
            it('should call isSelected', async () => {
                componentInstance.isSelected = sinon.spy();
                await componentInstance.waitUntilIsSelected();

                const cb = seleniumStub.webDriverStub.wait.getCall(0)
                    .args[0] as () => Promise<boolean>;

                await cb();

                expect(
                    componentInstance.isSelected
                ).to.have.been.calledOnceWith();
            });
        });
    });
});
