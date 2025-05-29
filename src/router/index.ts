import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import KeyFiles from '../views/KeyFiles.vue'
import Cryptocurrency from '../views/Cryptocurrency.vue'
import Cryptography from '../views/Cryptography.vue'

/**
 * Application routes configuration
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/keyfiles',
    name: 'KeyFiles',
    component: KeyFiles
  },
  {
    path: '/cryptocurrency',
    name: 'Cryptocurrency',
    component: Cryptocurrency
  },
  {
    path: '/cryptography',
    name: 'Cryptography',
    component: Cryptography
  }
  // {
  //   path: '/directories',
  //   name: 'Directories',
  //   component: Directories
  // },
  // {
  //   path: '/test',
  //   name: 'Test',
  //   component: Test
  // },
  // {
  //   path: '/settings/:activeTab',
  //   name: 'Settings',
  //   component: Settings
  // }
]

/**
 * Vue Router instance configured with hash history
 */
export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// For consistency with other modules
export default router 