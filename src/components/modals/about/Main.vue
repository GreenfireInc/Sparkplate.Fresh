<template>
  <div class="main-content-wrapper">
    <div class="container-fluid">
      <div class="row">
        <!-- Info section on the left -->
        <div class="col-6 info-column">
          <div>
            <br>
            <!-- <h4 class="h3">
              <b>Sparkplate {{ appVersion }}</b>
            </h4> -->
            <ul>
              <li v-if="hostname"><b>Hostname:</b> {{ hostname }}</li>
              <NetworkStatus :vertical="true" :hideStatus="true" :showLocalIp="true" />
              <li v-if="os"><b>OS:</b> {{ os }}</li>
              <li v-if="nodeVersion"><b>Node:</b> {{ nodeVersion }}</li>
              <li v-if="electronVersion">
                <b>Electron:</b> v{{ electronVersion }}
              </li>
              <!-- <li v-if="dbVersion"><b>Database:</b> v{{ dbVersion }}</li> -->
              <li v-if="memorySize"><b>Installed RAM:</b> {{ memorySize }}</li>
              <li v-if="processor"><b>CPU:</b> {{ processor }}</li>
              <GpuInfo />
              <LiveDateTime />
              <UptimeCounter />
            </ul>
          </div>
        </div>
        
        <!-- Logo section on the right -->
        <div class="col-6">
          <div class="center-content">
            <a href="https://www.greenfire.io" target="_blank">
              <img 
                src="/assets/icons/greenfire/sparkplate.png" 
                alt="sparkplate-logo" 
                style="width: 250px; height: auto;" 
              />
            </a>
          </div>
        </div>
      </div>
      
      <!-- Clear Store Button -->
      <div class="clear-store-container">
        <button @click="clearStore" class="clear-store-btn">
          Clear Store
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NetworkStatus from '@/components/global/NetworkStatus.vue'
import UptimeCounter from '@/components/partials/time/UptimeCounter.vue'
import LiveDateTime from '@/components/partials/time/LiveDateTime.vue'
import GpuInfo from '@/components/partials/hardware/GpuInfo.vue'
// import { dbVersion } from '@/service/IdbService'
import { version } from '../../../../package.json'

export default {
  name: 'AboutMain',
  components: { NetworkStatus, UptimeCounter, LiveDateTime, GpuInfo },
  data: () => ({
    appVersion: version,
    // dbVersion: dbVersion,
    electronVersion: '',
    hostname: '',
    memorySize: '',
    nodeVersion: '',
    os: '',
    processor: ''
  }),
  async created() {
    const appData = window.appData
    this.electronVersion = appData.electronVersion
    this.hostname = appData.hostname
    this.memorySize = appData.systemMemory
      ? this.formatBytes(appData.systemMemory)
      : ''
    this.nodeVersion = appData.nodeVersion
    this.os = appData.osVersion
    this.processor = appData.processor
  },
  methods: {
    formatBytes(bytes, decimals = 0) {
      if (!+bytes) return '0 Bytes'

      const kb = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

      const i = Math.floor(Math.log(bytes) / Math.log(kb))

      return `${parseFloat((bytes / Math.pow(kb, i)).toFixed(dm))} ${sizes[i]}`
    },
    clearStore() {
      // Clear localStorage
      localStorage.clear()
      
      // Clear sessionStorage
      sessionStorage.clear()
      
      // You can add more store clearing logic here if needed
      console.log('Store cleared successfully')
      
      // Optional: Show confirmation or close modal
      // this.hideModal()
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content-wrapper {
  @apply overflow-x-hidden w-full max-w-full;
  position: relative;
}

.container-fluid {
  @apply px-0 max-w-full;
}

.row {
  @apply mx-0 max-w-full;
}

.center-content {
  @apply flex items-center justify-center h-full;
}

.info-column {
  @apply px-3;
  ul {
    @apply pl-4 m-0;
    
    li {
      @apply mb-2 break-words;
    }
  }
}

.clear-store-container {
  @apply flex justify-end;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}

.clear-store-btn {
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: #b91c1c;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}
</style> 