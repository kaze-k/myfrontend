import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router"
import beforeEach from '@/router/beforeEach'


const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "登录",
    meta: {
      hidden: true,
      title: "学生管理系统"
    },
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: "/",
    redirect: "/home/",
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    name: "页面丢失",
    meta: {
      hidden: true,
      title: "找不到页面啦"
    },
    component: () => import('@/views/404/NotFound.vue'),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    meta: {
      hidden: true
    }
  },
  {
    path: "/home",
    name: "首页",
    meta: {
      title: "首页",
      icon: "fa fa-home",
    },
    component: () => import('@/components/common/container.vue'),
    children: [
      {
        path: "/home/",
        component: () => import('@/views/home/Home.vue')
      }
    ]
  },
  {
    path: "/user",
    name: "用户中心",
    meta: {
      title: "用户中心",
      icon: "fa fa-user-circle-o"
    },
    component: () => import('@/components/common/container.vue'),
    children: [
      {
        name: "用户",
        path: "/user/",
        component: () => import('@/views/user/User.vue')
      }
    ]
  },
  {
    path: "/student",
    name: "学生管理",
    meta: {
      title: "学生管理",
      icon: "fa fa-users",
      group: true
    },
    component: () => import('@/components/common/container.vue'),
    children: [
      {
        path: "/student/student",
        name: "学生列表",
        meta: {
          permissions: true,
          icon: "fa fa-list"
        },
        component: () => import('@/views/student/StudentData.vue')
      },
      {
        path: "/student/info",
        name: "学生信息",
        meta: {
          icon: "fa fa-info-circle"
        },
        component: () => import('@/views/student/InfoList.vue')
      }
    ]
  },
  {
    path: "/sudo",
    name: "权限管理",
    meta: {
      title: "权限管理",
      icon: " fa fa-sitemap",
      group: true
    },
    component: () => import('@/components/common/container.vue'),
    children: [
      {
        path: "/sudo/admin",
        name: "管理员列表",
        meta: {
          permissions: true,
          icon: "fa fa-user-secret"
        },
        component: () => import('@/views/sudo/AdminList.vue')
      },
      {
        path: "/sudo/user",
        name: "用户列表",
        meta: {
          icon: "fa fa-address-book"
        },
        component: () => import('@/views/sudo/UserList.vue')
      }
    ]
  }
]
const router = createRouter({
  routes,
  history: createWebHashHistory()
})


// 路由导航守卫
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  beforeEach(to, next)
})

export default router