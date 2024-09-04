import { createRouter, createWebHistory } from 'vue-router'
import LoginSignup from '../views/LoginSignup.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginSignup
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DashboardPage.vue')
    },
    {
      path:'/setting',
      name:'account-setting',
      component: ()=> import('../views/AccountSetting.vue')
    }
  ]
})

export default router
