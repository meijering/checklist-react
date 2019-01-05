import createHistory from 'history/createMemoryHistory';
import { put } from 'redux-saga/effects';
import { configure, shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from '../../configureStore';
import injectSaga from '../injectSaga';
import * as sagaInjectors from '../sagaInjectors';
configure({ adapter: new Adapter() });

// Fixtures
const Component = () => null;

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

describe('injectSaga decorator', () => {
  let store;
  let injectors;
  let ComponentWithSaga;

  beforeEach(() => {
    store = configureStore({}, createHistory());
    injectors = {
      injectSaga: jest.fn(),
      ejectSaga: jest.fn(),
    };
    ComponentWithSaga = injectSaga({ key: 'test', saga: testSaga, mode: 'testMode' })(Component);
    sagaInjectors.default = jest.fn(() => injectors);
  });

  test('should inject given saga, mode, and props', () => {
    const props = { test: 'test' };
    shallow(<ComponentWithSaga {...props} />, { context: { store } });

    expect(injectors.injectSaga).toHaveBeenCalledTimes(1);
    expect(injectors.injectSaga).toHaveBeenCalledWith('test', { saga: testSaga, mode: 'testMode' }, props);
  });

  test('should eject on unmount with a correct saga key', () => {
    const props = { test: 'test' };
    const renderedComponent = shallow(<ComponentWithSaga {...props} />, { context: { store } });
    renderedComponent.unmount();

    expect(injectors.ejectSaga).toHaveBeenCalledTimes(1);
    expect(injectors.ejectSaga).toHaveBeenCalledWith('test');
  });

  test('should set a correct display name', () => {
    expect(ComponentWithSaga.displayName).toBe('withSaga(Component)');
    expect(injectSaga({ key: 'test', saga: testSaga })(() => null).displayName).toBe('withSaga(Component)');
  });

  test('should propagate props', () => {
    const props = { testProp: 'test' };
    const renderedComponent = shallow(<ComponentWithSaga {...props} />, { context: { store } });

    expect(renderedComponent.prop('testProp')).toBe('test');
  });
});