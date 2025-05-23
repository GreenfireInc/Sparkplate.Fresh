import { createRouter, createWebHashHistory } from 'vue-router'

// Route components
// Using dynamic imports for code splitting and lazy loading
const Home = () => import('../views/Home.vue')
const Directories = () => import('../views/Directories.vue')
const Test = () => import('../views/Test.vue')
const Settings = () => import('../views/Settings.vue')

// Routes definition
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false,
      title: 'Home'
    }
  },
  {
    path: '/directories',
    name: 'Directories',
    component: Directories,
    meta: {
      requiresAuth: false,
      title: 'Directories'
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
    meta: {
      requiresAuth: false,
      title: 'Test'
    }
  },
  {
    path: '/settings/:activeTab',
    name: 'Settings',
    component: Settings,
    props: true,
    meta: {
      requiresAuth: false,
      title: 'Settings'
    }
  }
]

// Create router instance
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Set document title
  document.title = to.meta.title ? `Sparkplate - ${to.meta.title}` : 'Sparkplate'
  
  // Check for auth if needed
  if (to.meta.requiresAuth) {
    // Implementation of authentication check would go here
    // For example, using a Pinia auth store:
    // const authStore = useAuthStore()
    // if (!authStore.isAuthenticated) {
    //   return next({ name: 'Login' })
    // }
  }
  
  // Continue navigation
  next()
})

export default router 