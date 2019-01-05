import createHistory from 'history/createMemoryHistory';
import { put } from 'redux-saga/effects';
import configureStore from '../../configureStore';
import getInjectors, {
  injectSagaFactory,
  ejectSagaFactory,
} from '../sagaInjectors';
import { DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT } from '../constants';

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

describe('injectors', () => {
  const originalNodeEnv = process.env.NODE_ENV;
  let store;
  let injectSaga;
  let ejectSaga;

  describe('getInjectors', () => {
    beforeEach(() => {
      store = configureStore({}, createHistory());
    });

    test('should return injectors', () => {
      expect(Object.keys(getInjectors(store))).toEqual(expect.arrayContaining(['injectSaga', 'ejectSaga']));
    });

    test('should throw if passed invalid store shape', () => {
      Reflect.deleteProperty(store, 'dispatch');

      // expect(() => getInjectors(store)).to.throw(); TODO: enable when testing production
    });
  });

  describe('ejectSaga helper', () => {
    beforeEach(() => {
      store = configureStore({}, createHistory());
      injectSaga = injectSagaFactory(store, true);
      ejectSaga = ejectSagaFactory(store, true);
    });

    test('should check a store if the second argument is falsy', () => {
      const eject = ejectSagaFactory({});

      expect(() => eject('test')).toThrowError();
    });

    test('should not check a store if the second argument is true', () => {
      Reflect.deleteProperty(store, 'dispatch');
      injectSaga('test', { saga: testSaga });

      expect(() => ejectSaga('test')).not.toThrowError();
    });

    test("should validate saga's key", () => {
      expect(() => ejectSaga('')).toThrowError();
      expect(() => ejectSaga(1)).toThrowError();
    });

    test('should cancel a saga in a default mode', () => {
      const cancel = jest.fn();
      store.injectedSagas.test = { task: { cancel } };
      ejectSaga('test');

      expect(cancel).toHaveBeenCalled();
    });

    test('should not cancel a daemon saga', () => {
      const cancel = jest.fn();
      store.injectedSagas.test = { task: { cancel }, mode: DAEMON };
      ejectSaga('test');

      expect(cancel).not.toHaveBeenCalled();
    });

    test('should ignore saga that was not previously injected', () => {
      expect(() => ejectSaga('test')).not.toThrowError();
    });

    test("should remove non daemon saga's descriptor in production", () => {
      process.env.NODE_ENV = 'production';
      injectSaga('test', { saga: testSaga, mode: RESTART_ON_REMOUNT });
      injectSaga('test1', { saga: testSaga, mode: ONCE_TILL_UNMOUNT });

      ejectSaga('test');
      ejectSaga('test1');

      expect(store.injectedSagas.test).toBe('done');
      expect(store.injectedSagas.test1).toBe('done');
      process.env.NODE_ENV = originalNodeEnv;
    });

    test("should not remove daemon saga's descriptor in production", () => {
      process.env.NODE_ENV = 'production';
      injectSaga('test', { saga: testSaga, mode: DAEMON });
      ejectSaga('test');

      expect(store.injectedSagas.test.saga).toBe(testSaga);
      process.env.NODE_ENV = originalNodeEnv;
    });

    test("should not remove daemon saga's descriptor in development", () => {
      injectSaga('test', { saga: testSaga, mode: DAEMON });
      ejectSaga('test');

      expect(store.injectedSagas.test.saga).toBe(testSaga);
    });
  });

  describe('injectSaga helper', () => {
    beforeEach(() => {
      store = configureStore({}, createHistory());
      injectSaga = injectSagaFactory(store, true);
      ejectSaga = ejectSagaFactory(store, true);
    });

    test('should check a store if the second argument is falsy', () => {
      const inject = injectSagaFactory({});

      expect(() => inject('test', testSaga)).toThrowError();
    });

    test('it should not check a store if the second argument is true', () => {
      Reflect.deleteProperty(store, 'dispatch');

      expect(() => injectSaga('test', { saga: testSaga })).not.toThrowError();
    });

    test("should validate saga's key", () => {
      expect(() => injectSaga('', { saga: testSaga })).toThrowError();
      expect(() => injectSaga(1, { saga: testSaga })).toThrowError();
    });

    test("should validate saga's descriptor", () => {
      expect(() => injectSaga('test')).toThrowError();
      expect(() => injectSaga('test', { saga: 1 })).toThrowError();
      expect(() => injectSaga('test', { saga: testSaga, mode: 'testMode' })).toThrowError();
      expect(() => injectSaga('test', { saga: testSaga, mode: 1 })).toThrowError();
      expect(() => injectSaga('test', { saga: testSaga, mode: RESTART_ON_REMOUNT })).not.toThrowError();
      expect(() => injectSaga('test', { saga: testSaga, mode: DAEMON })).not.toThrowError();
      expect(() => injectSaga('test', { saga: testSaga, mode: ONCE_TILL_UNMOUNT })).not.toThrowError();
    });

    test('should pass args to saga.run', () => {
      const args = {};
      store.runSaga = jest.fn();
      injectSaga('test', { saga: testSaga }, args);

      expect(store.runSaga).toHaveBeenCalledWith(testSaga, args);
    });

    test(
      'should not start daemon and once-till-unmount sagas if were started before',
      () => {
        store.runSaga = jest.fn();

        injectSaga('test1', { saga: testSaga, mode: DAEMON });
        injectSaga('test1', { saga: testSaga, mode: DAEMON });
        injectSaga('test2', { saga: testSaga, mode: ONCE_TILL_UNMOUNT });
        injectSaga('test2', { saga: testSaga, mode: ONCE_TILL_UNMOUNT });

        expect(store.runSaga).toHaveBeenCalledTimes(2);
      }
    );

    test('should start any saga that was not started before', () => {
      store.runSaga = jest.fn();

      injectSaga('test1', { saga: testSaga });
      injectSaga('test2', { saga: testSaga, mode: DAEMON });
      injectSaga('test3', { saga: testSaga, mode: ONCE_TILL_UNMOUNT });

      expect(store.runSaga).toHaveBeenCalledTimes(3);
    });

    test(
      'should restart a saga if different implementation for hot reloading',
      () => {
        const cancel = jest.fn();
        store.injectedSagas.test = { saga: testSaga, task: { cancel } };
        store.runSaga = jest.fn();

        function* testSaga1() {
          yield put({ type: 'TEST', payload: 'yup' });
        }

        injectSaga('test', { saga: testSaga1 });

        expect(cancel).toHaveBeenCalledTimes(1);
        expect(store.runSaga).toHaveBeenCalledWith(testSaga1, undefined);
      }
    );

    test(
      'should not cancel saga if different implementation in production',
      () => {
        process.env.NODE_ENV = 'production';
        const cancel = jest.fn();
        store.injectedSagas.test = {
          saga: testSaga,
          task: { cancel },
          mode: RESTART_ON_REMOUNT,
        };

        function* testSaga1() {
          yield put({ type: 'TEST', payload: 'yup' });
        }

        injectSaga('test', { saga: testSaga1, mode: DAEMON });

        expect(cancel).not.toHaveBeenCalled();
        process.env.NODE_ENV = originalNodeEnv;
      }
    );

    test('should save an entire descriptor in the saga registry', () => {
      injectSaga('test', { saga: testSaga, foo: 'bar' });
      expect(store.injectedSagas.test.foo).toBe('bar');
    });
  });
});
