import React, {Component} from 'react';
import Dashboard from './Dashboard';
import {connect, Provider} from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import getReduxReducer from './redux/reducers';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux';

import '../scss/main.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    getReduxReducer(),
    composeEnhancers(applyMiddleware(thunk, promise)),
);

export default class ReduxProvider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Provider store={store}>
          <Dashboard/>
        </Provider>
    );
  }
}
