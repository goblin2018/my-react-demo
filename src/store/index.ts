import { createStore, applyMiddleware, compose } from 'redux'
import { routinePromiseWatcherSaga } from 'redux-saga-routines'

import createSageMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'

import rootReducer from './reducer'
import rootSaga from './saga/sagas'

/*
 * thunk 的原理
 * 实际上thunk中间件会做一个判断
 * 如果传进来的action是一个函数，并且向下传递被包装过后的dispatch
 * 如果不是一个函数，就直接传递最初的dispatch
 * */

export const history = createBrowserHistory()

const sagaMiddleware = createSageMiddleware()

const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE_
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose

const store = createStore(
  rootReducer(history),
  composeEnhancer(
    applyMiddleware(routerMiddleware(history), sagaMiddleware, thunk)
  )
)

sagaMiddleware.run(rootSaga)

sagaMiddleware.run(routinePromiseWatcherSaga)

export default store
