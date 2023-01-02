import chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'ts-sinon';

export const mochaHooks = {
    beforeAll() {
        chai.use(sinonChai);
    },
    afterEach() {
        sinon.resetHistory();
    }
};
