import { expect } from 'chai';
import * as TypeMoq from 'typemoq';
import { setupWebDriverMock } from './mocks/selenium-mocks';
import { it } from 'mocha';
import { Navigation, WebDriver, Window } from 'selenium-webdriver';
import { Browser, WindowSize } from '../src/browser';

describe('Browser', () => {
    let driverMock: TypeMoq.IMock<WebDriver>;
    let navigationMock: TypeMoq.IMock<Navigation>;
    let getCurrentUrlResolvedValue: string;
    let takeScreenshotResolvedValue: string;
    let windowMock: TypeMoq.IMock<Window>;
    let browserInstance: Browser;

    beforeEach(() => {
        ({
            driverMock,
            navigationMock,
            getCurrentUrlResolvedValue,
            takeScreenshotResolvedValue,
            windowMock
        } = setupWebDriverMock());
        browserInstance = new Browser({ driver: driverMock.object });
    });

    describe('constructor', () => {
        it('should create an instance successfully', () => {
            expect(browserInstance).to.be.an.instanceof(Browser);
        });
    });

    describe('close', () => {
        it('should call the quit function', async () => {
            await browserInstance.close();

            driverMock.verify((x) => x.quit(), TypeMoq.Times.once());
        });
    });

    describe('getUrl', () => {
        it('should call the getCurrentUrl function', async () => {
            await browserInstance.getUrl();

            driverMock.verify((x) => x.getCurrentUrl(), TypeMoq.Times.once());
        });

        it('should return the result of the getCurrentUrl call', async () => {
            const result = await browserInstance.getUrl();

            expect(result).to.equal(getCurrentUrlResolvedValue);
        });
    });

    describe('goBack', () => {
        it('should call the navigate back function as expected', async () => {
            await browserInstance.goBack();

            navigationMock.verify((x) => x.back(), TypeMoq.Times.once());
        });
    });

    describe('goForward', () => {
        it('should call the navigate forward function as expected', async () => {
            await browserInstance.goForward();

            navigationMock.verify((x) => x.forward(), TypeMoq.Times.once());
        });
    });

    describe('goTo', () => {
        it('should call the navigate to function as expected', async () => {
            const url = 'https://www.google.com';

            await browserInstance.goTo({ url });

            navigationMock.verify(
                (x) => x.to(TypeMoq.It.isValue(url)),
                TypeMoq.Times.once()
            );
        });
    });

    describe('refresh', () => {
        it('should call the navigate refresh function as expected', async () => {
            await browserInstance.refresh();

            navigationMock.verify((x) => x.refresh(), TypeMoq.Times.once());
        });
    });

    describe('setSize', () => {
        it('should call the fullscreen function when passed in value is fullscreen', async () => {
            await browserInstance.setSize(WindowSize.Fullscreen);

            windowMock.verify((x) => x.fullscreen(), TypeMoq.Times.once());
        });

        it('should call the maximize function when passed in value is maximized', async () => {
            await browserInstance.setSize(WindowSize.Maximized);

            windowMock.verify((x) => x.maximize(), TypeMoq.Times.once());
        });

        it('should call the minimize function when passed in value is minimized', async () => {
            await browserInstance.setSize(WindowSize.Minimized);

            windowMock.verify((x) => x.minimize(), TypeMoq.Times.once());
        });

        it('should call setRect function when passed in a rectangle object', async () => {
            const geometry = { x: 120 };

            await browserInstance.setSize(geometry);

            windowMock.verify(
                (x) => x.setRect(TypeMoq.It.isValue(geometry)),
                TypeMoq.Times.once()
            );
        });
    });

    describe('takeScreenshot', () => {
        it('should call takeScreenshot function as expected', async () => {
            await browserInstance.takeScreenshot();

            driverMock.verify((x) => x.takeScreenshot(), TypeMoq.Times.once());
        });

        it('should resolve to the expected string value', async () => {
            const result = await browserInstance.takeScreenshot();

            expect(result).to.equal(takeScreenshotResolvedValue);
        });
    });
});
