import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/todoList'
  },
  {
    path: '/',
    name: 'layout',
    component: () => import(/* webpackChunkName: "layout  " */ '../views/layout/Layout.vue'),
    children: [
      {
        path: '/todoList',
        name: 'todoList',
        component: () => import(/* webpackChunkName: "todoList" */ '../views/todoList/TodoList.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notFound" */ '../views/notFound/NotFound.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局路由前置守卫
router.beforeEach((to, from) => {
  const token = window.localStorage.getItem('token')
  if (to.name !== 'login' && !token) {
    return '/login'
  }
})


export default router
