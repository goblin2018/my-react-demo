/***
 * @auth: frog
 * @time: 2020/7/6
 * @func: 辅助生成导航所需数据的工具函数
 ***/
interface Breadcrumb {
  [key: string]: {
    icon: string
    name: string
  }
}
const breadcrumb: Breadcrumb = {}

interface Route {
  icon: string
  name: string
  path: string
  routes?: Route[]
}

/*
 * 抽离逻辑出来
 * 协助recursiveMenu 处理下级路由
 * @params: rootPath 跟路径
 * */
export const createMenu = (rootPath: string, routes: Route[]) => {
  const menu: Route[] = []

  routes.forEach((subMenu: Route) => {
    const underMenu: Route[] = []
    if (subMenu.routes) {
      // 又要去遍历这个对象
      subMenu.routes.forEach((under: Route) => {
        // 在这里边处理
        const basePath = rootPath + subMenu.path
        // if( permissions ) { // 处理权限 }
        if (under.path) {
          // 处理面包屑
          breadcrumb[basePath + under.path] = {
            icon: under.icon,
            name: under.name,
          }
          // 处理underMenu
          underMenu.push({
            icon: under.icon,
            name: under.name,
            path: basePath + under.path,
          })
        }
        if (under.routes) {
          under.routes.forEach((lastRoute: Route) => {
            if (lastRoute.path) {
              breadcrumb[basePath + under.path + lastRoute.path] = {
                icon: lastRoute.icon,
                name: lastRoute.name,
              }
            }
          })
        }
        // 还需要在这里，处理 面包屑
        breadcrumb[`${rootPath}${subMenu.path}`] = {
          name: subMenu.name,
          icon: subMenu.icon,
        }
      })

      if (underMenu.length !== 0) {
        menu.push({
          icon: subMenu.icon,
          name: subMenu.name,
          path: `${rootPath}${subMenu.path}`,
          routes: underMenu,
        })
      }
    } else {
      menu.push({
        icon: subMenu.icon,
        name: subMenu.name,
        path: `${rootPath}${subMenu.path}`,
      })

      // 还需要在这里，处理 面包屑
      breadcrumb[`${rootPath}${subMenu.path}`] = {
        name: subMenu.name,
        icon: subMenu.icon,
      }
    }
  })

  return menu
}

/*
 * 处理数据，返回路由所需数据的函数
 * @params: routes ===> 路由对象
 * @params: permissions ===> 后端返回给咱们的权限码 是一个数组。
 * */
export const recursiveMenu = (routes: Route[], permissions = []) => {
  const topMenu: Route[] = []
  const sideMenu: any = {}

  routes.forEach((route: Route) => {
    const path = route.path
    topMenu.push({
      name: route.name,
      path: route.path || '',
      icon: route.icon,
    })
    if (route.routes) {
      // 说明应该处理 breadcrumb
      sideMenu[path] = createMenu(path, route.routes)

      breadcrumb[path] = {
        name: route.name,
        icon: route.icon,
      }
    }
  })

  return {
    topMenu,
    breadcrumb,
    sideMenu,
  }
}
