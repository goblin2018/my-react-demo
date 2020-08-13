import { all, fork } from 'redux-saga/effects'
import user from './user/user'

const rootSaga = function* () {
  yield all([fork(user())])
}

export default rootSaga
