<template>
  <div class="modal-layout">
    <!-- Scrollable Content Area -->
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
                <li v-if="hostnameValue"><b>{{ tAbout('hostname') }}:</b> {{ hostnameValue }}</li>
                <NetworkStatus :vertical="true" :hideStatus="true" :showLocalIp="true" />
                <li v-if="osValue"><b>{{ tAbout('os') }}:</b> {{ osValue }}</li>
                <li v-if="nodeVersionValue"><b>{{ tAbout('node') }}:</b> {{ nodeVersionValue }}</li>
                <li v-if="electronVersionValue">
                  <b>{{ tAbout('electron') }}:</b> v{{ electronVersionValue }}
                </li>
                <!-- <li v-if="dbVersion"><b>Database:</b> v{{ dbVersion }}</li> -->
                <li v-if="memorySizeValue"><b>{{ tAbout('installedRAM') }}:</b> {{ memorySizeValue }}</li>
                <li v-if="processorValue"><b>{{ tAbout('cpu') }}:</b> {{ processorValue }}</li>
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
                  :alt="tAbout('sparkplateLogo')" 
                  style="width: 250px; height: auto;" 
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Static Modal Footer -->
    <div class="modal-footer" @click.stop>
      <div class="export-dropdown" ref="exportDropdown">
        <button
          type="button"
          @click.stop="toggleExportDropdown"
          class="export-btn"
          :class="{ 'active': showExportDropdown }"
        >
          Export sysInfo
          <span class="dropdown-arrow" :class="{ 'open': showExportDropdown }">▼</span>
        </button>
      </div>
      <button @click="clearStore" class="clear-store-btn">
        {{ tAbout('clearStore') }}
      </button>
    </div>

    <!-- Dropdown Menu - Positioned outside footer to avoid overflow clipping -->
    <Teleport to="body">
      <div v-if="showExportDropdown" class="dropdown-menu-portal" :style="dropdownPosition" @click.stop>
        <button type="button" @click.stop="exportAs('png')" class="dropdown-item">Export as PNG</button>
        <button type="button" @click.stop="exportAs('pdf')" class="dropdown-item">Export as PDF</button>
        <button type="button" @click.stop="exportAs('json')" class="dropdown-item">Export as JSON</button>
        <button type="button" @click.stop="exportAs('txt')" class="dropdown-item">Export as TXT</button>
      </div>
    </Teleport>
  </div>
</template>

<script>
import NetworkStatus from '@/components/global/NetworkStatus.vue'
import UptimeCounter from '@/components/partials/time/UptimeCounter.vue'
import LiveDateTime from '@/components/partials/time/LiveDateTime.vue'
import GpuInfo from '@/components/partials/hardware/GpuInfo.vue'
import { useUnifiedTranslations } from '@/composables/useUnifiedTranslations'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
// import { dbVersion } from '@/service/IdbService'
import { version } from '../../../../package.json'

export default {
  name: 'AboutMain',
  components: { NetworkStatus, UptimeCounter, LiveDateTime, GpuInfo },
  setup() {
    const { tAbout } = useUnifiedTranslations()
    return { tAbout }
  },
  data: () => ({
    appVersion: version,
    // dbVersion: dbVersion,
    electronVersionValue: '',
    hostnameValue: '',
    memorySizeValue: '',
    nodeVersionValue: '',
    osValue: '',
    processorValue: '',
    showExportDropdown: false,
    dropdownPosition: {}
  }),
  async created() {
    const appData = window.appData
    this.electronVersionValue = appData.electronVersion
    this.hostnameValue = appData.hostname
    this.memorySizeValue = appData.systemMemory
      ? this.formatBytes(appData.systemMemory)
      : ''
    this.nodeVersionValue = appData.nodeVersion
    this.osValue = appData.osVersion
    this.processorValue = appData.processor
  },
  mounted() {
    console.log('AboutMain component mounted')
    console.log('Initial showExportDropdown state:', this.showExportDropdown)
    // Close dropdown when clicking outside
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
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
    },
    toggleExportDropdown() {
      console.log('Toggle dropdown clicked, current state:', this.showExportDropdown)
      if (!this.showExportDropdown) {
        this.calculateDropdownPosition()
      }
      this.showExportDropdown = !this.showExportDropdown
      console.log('New dropdown state:', this.showExportDropdown)
    },
    calculateDropdownPosition() {
      const button = this.$refs.exportDropdown?.querySelector('.export-btn')
      if (button) {
        const rect = button.getBoundingClientRect()
        this.dropdownPosition = {
          top: `${rect.bottom + 8}px`,
          left: `${rect.left}px`,
          minWidth: `${rect.width}px`
        }
        console.log('Calculated dropdown position:', this.dropdownPosition)
      }
    },
    handleClickOutside(event) {
      if (this.showExportDropdown) {
        this.showExportDropdown = false
      }
    },
    generateFilename(format) {
      const hostname = this.hostnameValue || 'unknown'
      const now = new Date()
      
      // Format date as YYYY-MM-DD
      const date = now.toISOString().split('T')[0]
      
      // Format time as HH-MM-SS
      const time = now.toTimeString().split(' ')[0].replace(/:/g, '-')
      
      return `Sparkplate.${hostname}.${date}.${time}.${format}`
    },
    getSysInfoData() {
      return {
        appVersion: this.appVersion,
        hostname: this.hostnameValue,
        os: this.osValue,
        nodeVersion: this.nodeVersionValue,
        electronVersion: this.electronVersionValue,
        installedRAM: this.memorySizeValue,
        cpu: this.processorValue,
        exportedAt: new Date().toISOString()
      }
    },
    async exportAs(format) {
      console.log('Export as', format, 'clicked')
      this.showExportDropdown = false
      const filename = this.generateFilename(format)
      console.log('Generated filename:', filename)

      try {
        switch (format) {
          case 'png':
            console.log('Exporting as PNG...')
            await this.exportAsPNG(filename)
            break
          case 'pdf':
            console.log('Exporting as PDF...')
            await this.exportAsPDF(filename)
            break
          case 'json':
            console.log('Exporting as JSON...')
            this.exportAsJSON(filename)
            break
          case 'txt':
            console.log('Exporting as TXT...')
            this.exportAsTXT(filename)
            break
        }
        console.log('Export completed successfully')
        // Show success message
        alert(`Successfully exported system info as ${format.toUpperCase()}!`)
      } catch (error) {
        console.error(`Error exporting as ${format}:`, error)
        alert(`Error exporting file: ${error.message}`)
      }
    },
    async exportAsPNG(filename) {
      const element = this.$el.querySelector('.main-content-wrapper')
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2
      })
      
      // Add logo to canvas
      await this.addLogoToCanvas(canvas)
      
      const link = document.createElement('a')
      link.download = filename
      link.href = canvas.toDataURL()
      link.click()
    },
    async exportAsPDF(filename) {
      const element = this.$el.querySelector('.main-content-wrapper')
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2
      })
      
      // Add logo to canvas
      await this.addLogoToCanvas(canvas)
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })
      
      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save(filename)
    },
    exportAsJSON(filename) {
      const data = this.getSysInfoData()
      const json = JSON.stringify(data, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const link = document.createElement('a')
      link.download = filename
      link.href = URL.createObjectURL(blob)
      link.click()
      URL.revokeObjectURL(link.href)
    },
    exportAsTXT(filename) {
      const data = this.getSysInfoData()
      let text = 'Sparkplate System Information\n'
      text += '='.repeat(40) + '\n\n'
      
      for (const [key, value] of Object.entries(data)) {
        const label = key.replace(/([A-Z])/g, ' $1').trim()
        text += `${label}: ${value}\n`
      }
      
      const blob = new Blob([text], { type: 'text/plain' })
      const link = document.createElement('a')
      link.download = filename
      link.href = URL.createObjectURL(blob)
      link.click()
      URL.revokeObjectURL(link.href)
    },
    async addLogoToCanvas(canvas) {
      return new Promise((resolve, reject) => {
        const ctx = canvas.getContext('2d')
        const logo = new Image()
        
        logo.onload = () => {
          // Calculate logo size (make it 60px wide, maintain aspect ratio)
          const logoWidth = 120 // 60px * 2 (scale factor)
          const logoHeight = (logo.height / logo.width) * logoWidth
          
          // Position in upper left corner with some padding
          const x = 40 // 20px * 2 (scale factor)
          const y = 40 // 20px * 2 (scale factor)
          
          // Draw logo
          ctx.drawImage(logo, x, y, logoWidth, logoHeight)
          resolve()
        }
        
        logo.onerror = (error) => {
          console.error('Failed to load logo:', error)
          // Continue without logo if it fails to load
          resolve()
        }
        
        // Load the logo - use absolute path from public directory
        logo.src = '/assets/icons/greenfire/proper/greenfire.svg'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-layout {
  @apply w-full max-w-full;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.main-content-wrapper {
  @apply overflow-y-auto overflow-x-hidden w-full max-w-full;
  flex: 1;
  min-height: 0;
  padding-bottom: 1rem;
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

.modal-footer {
  @apply flex justify-between items-center;
  padding: 0.5rem 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  flex-shrink: 0;
  flex-grow: 0;
  position: relative;
  z-index: 100;
  min-height: 60px;
}

.export-dropdown {
  position: relative;
  z-index: 100;
}

.export-btn {
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  &.active {
    background: #1e40af;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    background: #1d4ed8;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.dropdown-arrow {
  font-size: 0.7rem;
  transition: transform 0.2s ease;
  display: inline-block;
  
  &.open {
    transform: rotate(180deg);
  }
}

.dropdown-menu-portal {
  position: fixed;
  background: #374151;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  min-width: 180px;
  z-index: 2000;
  animation: dropdownFadeIn 0.2s ease;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  color: white;
  border: none;
  text-align: left;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.15s ease;
  white-space: nowrap;
  
  &:hover {
    background: rgba(59, 130, 246, 0.3);
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  &:active {
    background: rgba(59, 130, 246, 0.4);
  }
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