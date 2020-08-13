/**
 * 定义action 接口，包含了
 * type action 类型
 * payload action所包含的数据
 */

interface ActionParams<T = any> {
  type: string
  payload: Object<T>
}
