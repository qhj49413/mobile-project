import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'question',
        name: 'question',
        component: () => import('@/views/question')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/search/result',
    name: 'result',
    component: () => import('@/views/search/result')
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('@/views/article')
  },
  {
    path: '/user/profile',
    name: 'profile',
    component: () => import('@/views/user/profile')
  }
]

const router = new VueRouter({
  routes
})

export default router
