/**
 * @func: 用于扩展redux-saga-routines 的基本参数
 * redux-saga-rotines 提供5个默认的action.type参数：
 * TRIGGER REQUEST SUCCESS FAILURE FULFILL
 * 也有5个 action creator：
 * trigger request success failure fulfill
 *
 * @example
 * import { createRoutine } from 'redux-saga-routines'
 * import extendRoutine from './extendRoutine'
 *
 * const common = extendRoutine(
 *  createRoutine('common'),
 *  [
 *    {
 *      type: 'SET_RETRY_TIP',
 *      action: 'setTryTip',
 *    },
 *  ]
 * )
 */
import { createAction } from 'redux-actions'
import { Routine, ActionCreatorFunction } from 'redux-saga-routines'

type Key = string

type ExtendRoutineReturn<T extends Key, A extends Key> = Routine &
  { [key in T]: string } &
  { [key in A]: ActionCreatorFunction }

// 更换了action名称 添加了prefix
const createActionCreator = (type: string, typePrefix: string) =>
  createAction(`${typePrefix}/${type}`)

// 扩展了routine 增加了type 和action
export default function extendRoutine<T extends Key, A extends Key>(
  routine: any,
  types: {
    type: T
    action: A
  }[]
): ExtendRoutineReturn<T, A> {
  const typePrefix = routine.toString().replace(/\/([^/]+)\/?$/, '') // 去掉了尾部的 /xxxx/ 类型数据
  const newRoutine = routine

  types.forEach(({ type, action }) => {
    const actionCreators = createActionCreator(type, typePrefix)

    newRoutine[action] = actionCreators
    newRoutine[type] = actionCreators.toString()
  })
  return newRoutine
}
