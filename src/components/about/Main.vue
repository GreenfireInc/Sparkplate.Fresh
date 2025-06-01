<template>
  <div class="d-flex justify-around h-full">
    <div class="col-6">
      <div class="center-content">
        <a href="https://www.greenfire.io" target="_blank">
          <img class="logo" src="/assets/icons/greenfire/sparkplate.png" alt="sparkplate-logo" />
        </a>
      </div>
    </div>
    <div class="col-6 flex flex-col items-center justify-center">
      <div>
        <h4 class="h3">
          <b>Sparkplate v{{ appVersion }}</b>
        </h4>
        <ul>
          <li v-if="hostname"><b>Hostname:</b> {{ hostname }}</li>
          <NetworkStatus :vertical="true" :hideStatus="true" />
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
  </div>
</template>

<script>
import NetworkStatus from '@/components/settings/NetworkStatus.vue'
// import { dbVersion } from '@/service/IdbService'

export default {
  name: 'AboutMain',
  data: () => ({
    appVersion: import.meta.env.VITE_APP_VERSION,
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
  components: { NetworkStatus },
  async created() {
    const appData = window.appData
    window.app.getGPUInfo().then((res) => {
      this.gpu = res.auxAttributes.glRenderer
    })
    this.datetime = this.$moment().format('MMM Do, YYYY H:mm')
    this.electronVersion = window.app.electronVersion
    this.hostname = appData.hostname
    this.memorySize = appData.systemMemory
      ? this.formatBytes(window.appData.systemMemory)
      : ''
    this.nodeVersion = window.app.nodeVersion
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
.center-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.logo {
  max-width: 14rem;
}
</style> 