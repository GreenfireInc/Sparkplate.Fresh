import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import KeyFiles from '../views/KeyFiles.vue'
import Cryptocurrency from '../views/Cryptocurrency.vue'
import Cryptography from '../views/Cryptography.vue'
import Networking from '../views/Networking.vue'
import Techstack from '../views/Techstack.vue'
import Repurposing from '../views/Repurposing.vue'
import Build from '../views/Build.vue'
import Package from '../views/Package.vue'
import Publish from '../views/Publish.vue'
import Games from '../views/Games.vue'
import Sandbox from '../views/Sandbox.vue'
import Settings from '../views/Settings.vue'

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
  },
  {
    path: '/networking',
    name: 'Networking',
    component: Networking
  },
  {
    path: '/techstack',
    name: 'Techstack',
    component: Techstack
  },
  {
    path: '/repurposing',
    name: 'Repurposing',
    component: Repurposing
  },
  {
    path: '/build',
    name: 'Build',
    component: Build
  },
  {
    path: '/package',
    name: 'Package',
    component: Package
  },
  {
    path: '/publish',
    name: 'Publish',
    component: Publish
  },
  {
    path: '/games',
    name: 'Games',
    component: Games
  },
  {
    path: '/sandbox',
    name: 'Sandbox',
    component: Sandbox
  },
  {
    path: '/settings/:activeTab?',
    name: 'Settings',
    component: Settings
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