import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import history from "./history";

import rootReducer from "./redux-modules/app/reducers";
import mySaga from "./redux-modules/app/sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const initialState = {};
const enhancers = [];
const middleware = [sagaMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

// then run the saga
sagaMiddleware.run(mySaga);

export default store;
