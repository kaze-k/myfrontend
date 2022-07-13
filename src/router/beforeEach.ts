import { ElMessage } from "element-plus"
import { getToken } from '@/utils/token'
import { checkToken } from "@/api"
import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router"


const beforeEach = (to: RouteLocationNormalized, next: NavigationGuardNext) => {
  // 动态标题
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  // 路由权限验证
  const token = getToken("token")
  const username = getToken("username")
  if (to.meta.permissions) {
    if (token && username) {
      if (token.includes("[root]") || token.includes("[sudo]")) {
        next()
      } else {
        next('/404')
      }
    } else {
      next('/login')
    }
  }
  // token验证
  else if (to.path !== '/login') {
    if (token) {
      checkToken(username, token).then(res => {
        if (res.data.code === 0) {
          next()
        } else {
          ElMessage({ message: "请重新登录", type: 'warning', showClose: true, center: true })
          if (to.path !== '/login') {
            next('/login')
          } else {
            next()
          }
        }
      })
    } else {
      next('/login')
    }

  } else next()
}

export default beforeEach