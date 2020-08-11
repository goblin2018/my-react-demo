import { createStore, applyMiddleware, compose } from 'redux'
import { routinePromiseWatcherSaga } from 'redux-saga-routines'

import createSageMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'

import rootReducer from './reducer'
