import checkStore from '../checkStore';

describe('checkStore', () => {
  let store;

  beforeEach(() => {
    store = {
      dispatch: () => {},
      subscribe: () => {},
      getState: () => {},
      replaceReducer: () => {},
      runSaga: () => {},
      injectedReducers: {},
      injectedSagas: {},
    };
  });

  test('should not throw if passed valid store shape', () => {
    expect(() => checkStore(store)).not.toThrowError();
  });

  test('should throw if passed invalid store shape', () => {
    expect(() => checkStore({})).toThrowError();
    expect(() => checkStore({ ...store, injectedSagas: null })).toThrowError();
    expect(() => checkStore({ ...store, injectedReducers: null })).toThrowError();
    expect(() => checkStore({ ...store, runSaga: null })).toThrowError();
    expect(() => checkStore({ ...store, replaceReducer: null })).toThrowError();
  });
});
