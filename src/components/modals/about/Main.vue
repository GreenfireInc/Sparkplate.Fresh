<template>
  <div class="main-content-wrapper">
    <div class="container-fluid">
      <div class="row">
        <!-- Info section on the left -->
        <div class="col-6 info-column">
          <div>
            <br>
            <h4 class="h3">
              <b>Sparkplate {{ appVersion }}</b>
            </h4>
            <ul>
              <li v-if="hostname"><b>Hostname:</b> {{ hostname }}</li>
              <!-- <NetworkStatus :vertical="true" :hideStatus="true" /> -->
              <li v-if="os"><b>OS:</b> {{ os }}</li>
              <li v-if="nodeVersion"><b>Node:</b> {{ nodeVersion }}</li>
              <li v-if="electronVersion">
                <b>Electron:</b> v{{ electronVersion }}
              </li>
              <!-- <li v-if="dbVersion"><b>Database:</b> v{{ dbVersion }}</li> -->
              <li v-if="memorySize"><b>Installed RAM:</b> {{ memorySize }}</li>
              <li v-if="processor"><b>Processor:</b> {{ processor }}</li>
              <li v-if="gpu"><b>GPU:</b> {{ gpu }}</li>
              <li v-if="datetime"><b>Date/Time:</b> {{ datetime }}</li>
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
    </div>
  </div>
</template>

<script>
import NetworkStatus from '@/components/settings/NetworkStatus.vue'
// import { dbVersion } from '@/service/IdbService'
import { version } from '../../../../package.json'

export default {
  name: 'AboutMain',
  components: { NetworkStatus },
  data: () => ({
    appVersion: version,
    // dbVersion: dbVersion,
    datetime: '',
    electronVersion: '',
    gpu: '',
    hostname: '',
    memorySize: '',
    nodeVersion: '',
    os: '',
    processor: ''
  }),
  async created() {
    const appData = window.appData
    window.app.getGPUInfo().then((res) => {
      this.gpu = res.auxAttributes.glRenderer
    })
    this.datetime = this.$moment().format('MMM Do, YYYY H:mm')
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
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content-wrapper {
  @apply overflow-x-hidden w-full max-w-full;
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
</style> 