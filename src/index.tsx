import * as React from 'react';
import * as ReactDOM from 'react-dom';

import thunk from 'redux-thunk';

import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from 'redux';

import App from './App';
import { reducer } from './reducers';

const win: any = window;

const devTools = win.__REDUX_DEVTOOLS_EXTENSION__ ? win.__REDUX_DEVTOOLS_EXTENSION__() : (noop: any) => noop;
const enhancer: any = compose(applyMiddleware(thunk), devTools);

const preloadedState = win.__PRELOADED_STATE__;
delete win.__PRELOADED_STATE__;

const store = createStore(reducer, preloadedState, enhancer);

ReactDOM.hydrate(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("app")
);