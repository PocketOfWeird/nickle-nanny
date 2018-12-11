import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import createRootReducer from './reducers';
import actions from './actions';

export default function configureStore(initialState, routerHistory) {
  const router = routerMiddleware(routerHistory);

  const middlewares = [thunk, router];

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (process.env.NODE_ENV === 'development' && compose_) {
      return compose_({ actions });
    }
    return compose;
  })();

  const enhancer = composeEnhancers(applyMiddleware(...middlewares), persistState());
  const rootReducer = createRootReducer(connectRouter(routerHistory));

  return createStore(rootReducer, initialState, enhancer);
}
