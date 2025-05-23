import './assets/tailwind.css'
import './polyfills.js'
import Vue from 'vue'

import currencyConfig from './config/currencyConfig.js'
import walletListConfig from './config/walletListConfig.js'
import appMeta from './config/appMeta.js'

import Ripple from 'vue-ripple-directive'
import CurrencySymbol from '@/components/reusables/CurrencySymbol.vue'
import TabComponent from '@/components/reusables/Navigation/Tab.vue'
import TabsComponent from '@/components/reusables/Navigation/Tabs.vue'
import VueIziToast from 'vue-izitoast'
import Loading from 'vue-loading-overlay'
import VueQrcodeReader from 'vue-qrcode-reader'

import './assets/scss/main.scss'
import { Loader } from '@/utils/general/loader.js'
import { generateBlob } from '@/utils/general/exportCSV.js'
import { exportAsXls } from '@/utils/general/exportXls.js'
import { exportAsPDF } from '@/utils/general/exportPdf.js'
import { exportAsFile } from '@/utils/general/exportFile.js'
import { validator } from '@/utils/general/validate.js'
import { windowsFunc } from '@/utils/windowFunctions.js'
import VModal from 'vue-js-modal'
import ToggleButton from 'vue-js-toggle-button'
import Tooltip from 'vue-directive-tooltip'
import 'vue-directive-tooltip/dist/vueDirectiveTooltip.css'
import moment from 'moment'

Vue.use(Tooltip)

// Get OS, Processor, System Memory, and User Data Path
window.app
  .getPreloadData()
  .then((appData) => {
    window.appData = appData
    // WindowsFunc must be invoked after appData.userDataPath has been set
    windowsFunc()
  })
  .catch((err) => {
    console.error(err)
  })

Vue.config.productionTip = false
Vue.config.errorHandler = function (err) {
  console.error('Error: ', err.message, '\nStack: ', err.stack)
}

Vue.config.warnHandler = function (msg, vm, trace) {
  console.log(`Warn: ${msg}\nTrace: ${trace}`)
}
Vue.directive('ripple', Ripple)
Vue.use(VueIziToast)
Vue.use(Loading)
Vue.use(ToggleButton)
Vue.component('CurrencySymbol', CurrencySymbol)
Vue.component('TabComponent', TabComponent)
Vue.component('TabsWrapper', TabsComponent)
Vue.prototype.$eventBus = new Vue()
Vue.prototype.$appMeta = appMeta
// using IPC bridge now
// Vue.prototype.$axios = axios
Vue.prototype.$currencyConfig = currencyConfig
Vue.prototype.$walletListConfig = walletListConfig
Vue.prototype.$loader = Loader
Vue.prototype.$exportAsCSV = generateBlob
Vue.prototype.$exportAsXls = exportAsXls
Vue.prototype.$exportAsPDF = exportAsPDF
Vue.prototype.$exportAsFile = exportAsFile
Vue.prototype.$validate = validator
Vue.prototype.$dialog = window.dialog
Vue.prototype.$moment = moment

Vue.use(VueQrcodeReader)
Vue.use(VModal)

// Initialize Vue
import('./initializer.js')
  .then((init) => {
    init.default()
  })
  .catch((err) => {
    console.error(err)
  })
