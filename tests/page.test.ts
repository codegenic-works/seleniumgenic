import { expect } from 'chai';
import { SeleniumStubs } from './stubs/selenium-stubs';
import { Page } from '../src/page';

describe('Page', () => {
    let seleniumStub: SeleniumStubs;
    let pageInstance: Page;

    beforeEach(() => {
        seleniumStub = new SeleniumStubs();
        pageInstance = new Page({ driver: seleniumStub.webDriverStub });
    });

    describe('constructor', () => {
        it('should create an instance successfully', () => {
            expect(pageInstance).to.be.an.instanceof(Page);
        });
    });

    describe('getTitle', () => {
        it('should call WebDriver.getTitle as expected', async () => {
            await pageInstance.getTitle();

            expect(
                seleniumStub.webDriverStub.getTitle
            ).to.have.been.calledOnceWith();
        });

        it('should resolve to the resolved value of WebDriver.getTitle', async () => {
            const result = await pageInstance.getTitle();

            expect(result).to.equal(seleniumStub.webDriverResults.getTitle);
        });
    });
});
