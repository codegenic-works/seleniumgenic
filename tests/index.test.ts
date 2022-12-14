import { expect } from 'chai';
import * as browser from '../src/browser';
import * as index from '../src';

describe('Main package export', () => {
    it('should contain Browser', () => {
        expect(index.Browser).to.equal(browser.Browser);
    });

    it('should contain WindowSizes', () => {
        expect(index.WindowSize).to.equal(browser.WindowSize);
    });
});
