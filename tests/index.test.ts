import { expect } from 'chai';
import * as browser from '../src/browser';
import * as component from '../src/component';
import * as index from '../src';

describe('Main package export', () => {
    it('should contain Browser', () => {
        expect(index.Browser).to.equal(browser.Browser);
    });

    it('should contain Component', () => {
        expect(index.Component).to.equal(component.Component);
    });

    it('should contain WindowSizes', () => {
        expect(index.WindowSize).to.equal(browser.WindowSize);
    });
});
