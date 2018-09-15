import { put, takeEvery } from 'redux-saga/effects';
import { expect } from 'chai';

import * as saga from '../../src/sagas/config';
import * as actions from '../../src/actions/config';

describe('Saga: Config', function () {
  describe('updateItemSaga', function () {
    it('fires off storeConfig', function () {
      const data = { lang: 'es' };
      const action = { type: actions.UPDATE_CONFIG, data };
      const gen = saga.updateConfigSaga(action);

      expect(gen.next().value).to.eql(put(actions.storeConfig(data)));
      expect(gen.next().value).to.be.undefined;
    });
  });

  describe('watchConfig', function () {
    it('takes UPDATE_CONFIG', function () {
      const gen = saga.watchConfig();

      expect(gen.next().value).to.eql(takeEvery(actions.UPDATE_CONFIG, saga.updateConfigSaga));
      expect(gen.next().value).to.be.undefined;
    });
  });
});
