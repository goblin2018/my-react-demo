/**
 * 封装本地存储功能
 */

const store = window.localStorage

class LocalStore {
  public static setString(key: string, value: string): void {
    if (store) {
      store.setItem(key, value)
    }
  }

  public static setObj(key: string, value: Object): void {
    if (store) {
      store.setItem(key, JSON.stringify(value))
    }
  }

  public static get(key: string): string {
    if (store) {
      let v = store.getItem(key)
      if (v) {
        return v
      }
    }
    return ''
  }

  public static getObj(key: string) {
    if (store) {
      let v = store.getItem(key)
      if (v) {
        return JSON.parse(v)
      }
    }
    return null
  }

  public static remove(key: string): void {
    if (store) {
      store.removeItem(key)
    }
  }
}

export default LocalStore
