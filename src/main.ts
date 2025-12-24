import './polyfills' // Import polyfills first
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'

import './style.css'

import './demos/ipc'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

// Extend Window interface for Electron preload
declare global {
  interface Window {
    app: {
      getPreloadData(): Promise<any>;
    };
    appData: any;
  }
}

// Initialize Vue app function
const initApp = (appData?: any) => {
  if (appData) {
    window.appData = appData
  }
  
  try {
    const app = createApp(App)
    app.config.globalProperties.$moment = moment
    
    app.config.errorHandler = (err, instance, info) => {
      console.error('Vue error:', err)
      console.error('Error info:', info)
    }
    
    app
      .use(router)
      .mount('#app')
      .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*')
      })
    
    console.log('✅ Vue app mounted successfully')
  } catch (error) {
    console.error('❌ Failed to mount Vue app:', error)
  }
}

// Get OS, Processor, System Memory, and User Data Path like Greenery does
if (window.app && typeof window.app.getPreloadData === 'function') {
  console.log('Loading preload data...')
  window.app
    .getPreloadData()
    .then((appData: any) => {
      console.log('Preload data loaded:', appData)
      initApp(appData)
    })
    .catch((err: any) => {
      console.error('Error loading app data:', err)
      // Initialize Vue app even if appData fails
      initApp()
    })
} else {
  console.warn('window.app not available, initializing without preload data')
  // Initialize immediately if preload is not available
  initApp()
}
