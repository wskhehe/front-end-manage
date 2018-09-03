import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import * as global from './global/reducer';
import * as role from './role/reducer';
import thunk from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

let store =
  process.env.NODE_ENV === 'production'
    ? createStore(combineReducers({ ...role, ...global }), compose(applyMiddleware(thunk)))
    : createStore(combineReducers({ ...role, ...global }), composeEnhancers(applyMiddleware(thunk)));

export default store;
