import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'

import './style.css'

import './demos/ipc'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

// Get OS, Processor, System Memory, and User Data Path like Greenery does
window.app
  .getPreloadData()
  .then((appData) => {
    window.appData = appData
    
    // Initialize Vue app after appData is set
    const app = createApp(App)
    app.config.globalProperties.$moment = moment
    app
      .use(router)
      .mount('#app')
      .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*')
      })
  })
  .catch((err) => {
    console.error('Error loading app data:', err)
    
    // Initialize Vue app even if appData fails
    const app = createApp(App)
    app.config.globalProperties.$moment = moment
    app
      .use(router)
      .mount('#app')
      .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*')
      })
  })
