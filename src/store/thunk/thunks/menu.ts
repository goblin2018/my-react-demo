import { ASYNC_SET_MENU } from '../actions/menu'
import { Dispatch } from 'redux'

/**
 * 发送异步请求
 */
export const getMenuData = () => {
  return async function (dispath: Dispatch) {
    await setTimeout(() => console.log('thunk yibu '), 2000)

    dispath({
      type: ASYNC_SET_MENU,
      payload: 'yibu shuju ',
    })
  }
}
