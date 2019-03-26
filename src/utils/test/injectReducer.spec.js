/**
 * Test injectors
 */
import { configure, shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import identity from 'lodash/identity';
import configureStore from '../../configureStore';
import injectReducer from '../injectReducer';
import * as reducerInjectors from '../reducerInjectors';

configure({ adapter: new Adapter() });
// Fixtures
const Component = () => null;

const reducer = identity;

describe('injectReducer decorator', () => {
  let store;
  let injectors;
  let ComponentWithReducer;

  beforeEach(() => {
    store = configureStore({});
    injectors = {
      injectReducer: jest.fn(),
    };
    ComponentWithReducer = injectReducer({ key: 'test', reducer })(Component);
    reducerInjectors.default = jest.fn(() => injectors);
  });

  test('should inject a given reducer', () => {
    shallow(<ComponentWithReducer />, { context: { store } });
    expect(injectors.injectReducer).toHaveBeenCalledTimes(1);
    expect(injectors.injectReducer).toHaveBeenCalledWith('test', reducer);
  });

  test('should set a correct display name', () => {
    expect(ComponentWithReducer.displayName).toBe('withReducer(Component)');
    expect(injectReducer({ key: 'test', reducer })(() => null).displayName).toBe('withReducer(Component)');
  });

  test('should propagate props', () => {
    const props = { testProp: 'test' };
    const renderedComponent = shallow(<ComponentWithReducer {...props} />, {
      context: { store },
    });

    expect(renderedComponent.prop('testProp')).toBe('test');
  });
});
