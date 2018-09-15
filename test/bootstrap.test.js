const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
const nock = require('nock');

before(function () {
  chai.should();
  chai.use(chaiAsPromised);
  chai.use(sinonChai);
  nock.disableNetConnect();
});
