import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import StoreContext from './storeContext';

import getInjectors from './reducerInjectors';

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default ({ key, reducer }) => (WrappedComponent) => {
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;

    static displayName = `withReducer(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    static contextType = StoreContext;

    injectors = getInjectors(this.context);

    componentWillMount() {
      const { injectReducer } = this.injectors;
      injectReducer(key, reducer);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
