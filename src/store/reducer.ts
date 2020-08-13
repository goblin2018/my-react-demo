import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import sagaReducer from './saga/reducers'
import thunkReducer from './thunk/reducers'

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    ...sagaReducer,
    ...thunkReducer,
  })
