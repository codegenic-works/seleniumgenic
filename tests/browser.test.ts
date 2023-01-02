import { expect } from 'chai';
import { SeleniumStubs } from './stubs/selenium-stubs';
import { Browser, WindowSize } from '../src/browser';

describe('Browser', () => {
    let seleniumStubs: SeleniumStubs;
    let browserInstance: Browser;

    beforeEach(() => {
        seleniumStubs = new SeleniumStubs();
        browserInstance = new Browser({ driver: seleniumStubs.webDriverStub });
    });

    describe('constructor', () => {
        it('should create an instance successfully', () => {
            expect(browserInstance).to.be.an.instanceof(Browser);
        });
    });

    describe('getUrl', () => {
        it('should call the getCurrentUrl function', async () => {
            await browserInstance.getUrl();

            expect(
                seleniumStubs.webDriverStub.getCurrentUrl
            ).to.have.been.calledOnceWith();
        });

        it('should return the result of the getCurrentUrl call', async () => {
            const result = await browserInstance.getUrl();

            expect(result).to.equal(
                seleniumStubs.webDriverResults.getCurrentUrl
            );
        });
    });

    describe('goBack', () => {
        it('should call the navigate back function as expected', async () => {
            await browserInstance.goBack();

            expect(
                seleniumStubs.navigationStub.back
            ).to.have.been.calledOnceWith();
        });
    });

    describe('goForward', () => {
        it('should call the navigate forward function as expected', async () => {
            await browserInstance.goForward();

            expect(
                seleniumStubs.navigationStub.forward
            ).to.have.been.calledOnceWith();
        });
    });

    describe('goTo', () => {
        it('should call the navigate to function as expected', async () => {
            const url = 'https://www.google.com';

            await browserInstance.goTo({ url });

            expect(
                seleniumStubs.navigationStub.to
            ).to.have.been.calledOnce.and.calledWith(url);
        });
    });

    describe('quit', () => {
        it('should call the quit function', async () => {
            await browserInstance.quit();

            expect(
                seleniumStubs.webDriverStub.quit
            ).to.have.been.calledOnceWith();
        });
    });

    describe('refresh', () => {
        it('should call the navigate refresh function as expected', async () => {
            await browserInstance.refresh();

            expect(
                seleniumStubs.navigationStub.refresh
            ).to.have.been.calledOnceWith();
        });
    });

    describe('setSize', () => {
        it('should call the fullscreen function when passed in value is fullscreen', async () => {
            await browserInstance.setSize(WindowSize.Fullscreen);

            expect(
                seleniumStubs.windowStub.fullscreen
            ).to.have.been.calledOnceWith();
        });

        it('should call the maximize function when passed in value is maximized', async () => {
            await browserInstance.setSize(WindowSize.Maximized);

            expect(
                seleniumStubs.windowStub.maximize
            ).to.have.been.calledOnceWith();
        });

        it('should call the minimize function when passed in value is minimized', async () => {
            await browserInstance.setSize(WindowSize.Minimized);

            expect(
                seleniumStubs.windowStub.minimize
            ).to.have.been.calledOnceWith();
        });

        it('should call setRect function when passed in a rectangle object', async () => {
            const geometry = { x: 120 };

            await browserInstance.setSize(geometry);

            expect(
                seleniumStubs.windowStub.setRect
            ).to.have.been.calledOnceWith(geometry);
        });
    });

    describe('takeScreenshot', () => {
        it('should call takeScreenshot function as expected', async () => {
            await browserInstance.takeScreenshot();

            expect(
                seleniumStubs.webDriverStub.takeScreenshot
            ).to.have.been.calledOnceWith();
        });

        it('should resolve to the expected string value', async () => {
            const result = await browserInstance.takeScreenshot();

            expect(result).to.equal(
                seleniumStubs.webDriverResults.takeScreenshot
            );
        });
    });
});
