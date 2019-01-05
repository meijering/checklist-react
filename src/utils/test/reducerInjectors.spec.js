import createHistory from 'history/createMemoryHistory';
import { fromJS } from 'immutable';
import identity from 'lodash/identity';
import configureStore from '../../configureStore';
import getInjectors, { injectReducerFactory } from '../reducerInjectors';

// Fixtures

const initialState = fromJS({ reduced: 'soon' });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST':
      return state.set('reduced', action.payload);
    default:
      return state;
  }
};

describe('reducer injectors', () => {
  let store;
  let injectReducer;

  describe('getInjectors', () => {
    beforeEach(() => {
      store = configureStore({}, createHistory());
    });

    test('should return injectors', () => {
      expect(Object.keys(getInjectors(store))).toEqual(['injectReducer']);
    });

    test('should throw if passed invalid store shape', () => {
      Reflect.deleteProperty(store, 'dispatch');

      // expect(() => getInjectors(store)).to.throw(); TODO: enable when testing on production
    });
  });

  describe('injectReducer helper', () => {
    beforeEach(() => {
      store = configureStore({}, createHistory());
      injectReducer = injectReducerFactory(store, true);
    });

    test('should check a store if the second argument is falsy', () => {
      const inject = injectReducerFactory({});

      expect(() => inject('test', reducer)).toThrowError();
    });

    test('it should not check a store if the second argument is true', () => {
      Reflect.deleteProperty(store, 'dispatch');

      expect(() => injectReducer('test', reducer)).not.toThrowError();
    });

    test("should validate a reducer and reducer's key", () => {
      expect(() => injectReducer('', reducer)).toThrowError();
      expect(() => injectReducer(1, reducer)).toThrowError();
      expect(() => injectReducer(1, 1)).toThrowError();
    });

    test('given a store, it should provide a function to inject a reducer', () => {
      injectReducer('test', reducer);

      const actual = store.getState().get('test');
      const expected = initialState;

      expect(actual.toJS()).toEqual(expected.toJS());
    });

    test('should not assign reducer if already existing', () => {
      store.replaceReducer = jest.fn();
      injectReducer('test', reducer);
      injectReducer('test', reducer);

      expect(store.replaceReducer).toHaveBeenCalledTimes(1);
    });

    test(
      'should assign reducer if different implementation for hot reloading',
      () => {
        store.replaceReducer = jest.fn();
        injectReducer('test', reducer);
        injectReducer('test', identity);

        expect(store.replaceReducer).toHaveBeenCalledTimes(2);
      }
    );
  });
});
