# Utils #
In this folder are a few utilities taken from React Boilerplate. Feel free to add your own utilities!

## injectReducer.js & reducerInjectors.js ##
A small utility for dynamically injecting reducers alongside your containers. This way you don't initially need to instantiate the full application store.

## injectSaga & sagaInjectors.js ##
Utility function to dynamically inject a saga, passes component's props as saga arguments. By default the saga will be started on component mount and cancelled on component un-mount for improved performance.

###