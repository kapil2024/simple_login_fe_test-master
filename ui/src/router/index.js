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
      component: () => import('../views/DashboardPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path:'/setting',
      name:'account-setting',
      component: ()=> import('../views/AccountSetting.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
}

// Global navigation guard
router.beforeEach((to, from, next) => {
  const isAuth = isAuthenticated() // Replace with your actual authentication check

  if (to.meta.requiresAuth && !isAuth) {
    // Redirect to login if the route requires auth and user is not authenticated
    next('/')
  } else if (!to.meta.requiresAuth && isAuth && to.path === '/') {
    // Redirect to dashboard if already authenticated and trying to access the login page
    next('/dashboard')
  } else {
    next()
  }
})

export default router
