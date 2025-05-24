import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
// import Directories from '../views/Directories.vue'
// import Test from '../views/Test.vue'
// import Settings from '../views/Settings.vue'

/**
 * Application routes configuration
 * @type {import('vue-router').RouteRecordRaw[]}
 */
export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
 * @type {import('vue-router').Router}
 */
export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// For consistency with other modules
export default router
