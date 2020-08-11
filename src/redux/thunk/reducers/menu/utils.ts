const breadcrumb = {}

export const createMenu = (rootPath: string, routes: any, permissions: boolean) => {
  const menu = []

  routes.forEach((subMenu) => {
    const underMenu = []
    if (subMenu.routes) {
      subMenu.routes.forEach((under) => {
        const basePath = rootPath + subMenu.path
        if(permissions) {// 处理权限相关问题}

        if (under.path) {
          breadcrumb[basePath + under.path] = {
            icon:under.icon,
            name:under.name,
          }
        }

        underMenu.push({
          icon: under.icon,
          name:under.name,
          path: basePath + under.path,
        })
      })
    }
  })
}
