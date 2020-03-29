// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'Home' },
    redirect: '/admin',
    children: [
      {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/admin/AdminList'), // PageView,
        // redirect: 'admin/AdminList',
        meta: { title: 'Admin', icon: 'user' }
      },
      {
        path: '/giftcode',
        name: 'giftcode',
        component: PageView,
        meta: { title: 'Quản lý GiftCode', icon: 'gift' },
        children: [
          {
            path: '/giftcode/danh-sach-goi',
            name: 'GiftCodeList',
            component: () => import('@/views/giftcode/GiftCodeList'),
            meta: { title: 'Danh sách gói GiftCode', keepAlive: true }
          },
          {
            path: '/giftcode/chi-tiet/:gifCodeID',
            name: 'GiftCodeDetail',
            component: () => import('@/views/giftcode/GiftCodeDetail'),
            meta: { title: 'Chi tiết gói Giftcode', noCache: true, activeMenu: '/giftcode/danh-sach-goi' },
            hidden: true
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  // {
  //   path: '/giftcode',
  //   component: PageView,
  //   redirect: '/giftcode/danh-sach-goi',
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/giftcode/chi-tiet/:gifCodeID',
  //       name: 'GiftCodeDetail',
  //       component: () => import(/* webpackChunkName: "user" */ '@/views/giftcode/GiftCodeDetail.vue')
  //     }
  //   ]
  // },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
