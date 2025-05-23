import './assets/tailwind.css'
import './polyfills'

// Vue 3 imports
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Configuration imports
import currencyConfig from './config/currencyConfig'
import walletListConfig from './config/walletListConfig'
import appMeta from './config/appMeta'

// UI Components and plugins
import 'vue-toastification/dist/index.css'
import Toast from 'vue-toastification'
import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import QrReader from 'vue3-qrcode-reader'
import VueQrcode from '@chenfengyuan/vue-qrcode'

// Import styles
import './assets/scss/main.scss'

// Utilities
import { Loader } from '@/utils/general/loader'
import { generateBlob } from '@/utils/general/exportCSV'
import { exportAsXls } from '@/utils/general/exportXls'
import { exportAsPDF } from '@/utils/general/exportPdf'
import { exportAsFile } from '@/utils/general/exportFile'
import { validator } from '@/utils/general/validate'
import { windowsFunc } from '@/utils/windowFunctions'
import { vRipple } from '@/directives/ripple'
import moment from 'moment'

// App component
import App from './App.vue'
import router from './router'

// Create Vue 3 app
const app = createApp(App)

// Set up Pinia store
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// Set up router
app.use(router)

// Register plugins
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 5,
  newestOnTop: true
})
app.use(LoadingPlugin)
app.use(QrReader)

// Register directives
app.directive('ripple', vRipple)

// Register global components
app.component('VueQrcode', VueQrcode)

// Set up global properties (replaces Vue.prototype in Vue 2)
app.config.globalProperties.$appMeta = appMeta
app.config.globalProperties.$currencyConfig = currencyConfig
app.config.globalProperties.$walletListConfig = walletListConfig
app.config.globalProperties.$loader = Loader
app.config.globalProperties.$exportAsCSV = generateBlob
app.config.globalProperties.$exportAsXls = exportAsXls
app.config.globalProperties.$exportAsPDF = exportAsPDF
app.config.globalProperties.$exportAsFile = exportAsFile
app.config.globalProperties.$validate = validator
app.config.globalProperties.$dialog = window.dialog
app.config.globalProperties.$moment = moment

// Error handling
app.config.errorHandler = (err, instance, info) => {
  console.error('Error:', err.message, '\nInfo:', info, '\nStack:', err.stack)
}

// Get OS, Processor, System Memory, and User Data Path
window.app
  .getPreloadData()
  .then((appData) => {
    window.appData = appData
    // WindowsFunc must be invoked after appData.userDataPath has been set
    windowsFunc()
    
    // Mount app after preload data is available
    app.mount('#app')
  })
  .catch((err) => {
    console.error(err)
    // Mount anyway if preload data fails
    app.mount('#app')
  }) 