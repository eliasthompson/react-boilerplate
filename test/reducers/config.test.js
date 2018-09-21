// import { expect } from 'chai';
//
// import reducer, { initialState } from '../../src/reducers/config';
// import * as actions from '../../src/actions/config';
//
// describe('Reducer: Config', function () {
//   describe(actions.UPDATE_CONFIG, function () {
//     it('updates the state', function () {
//       expect(reducer(initialState, { type: actions.UPDATE_CONFIG, data: { lang: 'es' } })).to.eql({ lang: 'es' });
//     });
//   });
//
//   describe('default', function () {
//     it('returns the state when invalid action is passed', function () {
//       expect(reducer({ lang: 'es' }, {})).to.eql({ lang: 'es' });
//     });
//
//     it('returns the initial state when invalid action is passed and no state', function () {
//       expect(reducer(undefined, {})).to.eql(initialState);
//     });
//   });
// });
