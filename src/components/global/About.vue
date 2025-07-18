<template>
  <Teleport to="body">
    <div 
      v-if="isVisible" 
      class="modal-overlay"
      @click.self="hideModal"
    >
      <div 
        class="modal-content"
        :style="{ 
          width: '800px', 
          height: '550px',
          borderRadius: '1rem'
        }"
      >
        <div class="modal-header">
          <h4 class="h4 font-semibold mb-0">About</h4>
          <button @click="hideModal" class="close-btn">&times;</button>
        </div>

        <!-- Tab Selection -->
        <TabsWrapper class="tabs-container">
          <TabComponentJS
            v-for="(name, mode) in modes"
            :key="mode + 'tab'"
            :active="mode === activeMode"
            :onClick="createSetActiveMode(mode)"
          >
            {{ name }}
          </TabComponentJS>
        </TabsWrapper>

        <!-- Tab Content -->
        <div class="main-content">
          <AboutMain v-if="activeMode === 'main'" />
          <Notes v-if="activeMode === 'notes'" />
          <Greenfire v-if="activeMode === 'greenfire'" />
          <Contribute v-if="activeMode === 'contribute'" />
          <Donations v-if="activeMode === 'donations'" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import AboutMain from '@/components/modals/about/Main.vue'
import Notes from '@/components/modals/about/Notes.vue'
import Greenfire from '@/components/modals/about/Greenfire.vue'
import Contribute from '@/components/modals/about/Contribute.vue'
import Donations from '@/components/modals/about/Donations.vue'
import TabComponentJS from '@/components/global/TabComponentJS.vue'
import TabsWrapper from '@/components/global/TabsWrapper.vue'

export default {
  name: 'AboutView',
  components: { AboutMain, Notes, Greenfire, Contribute, Donations, TabComponentJS, TabsWrapper },
  data: () => ({
    activeMode: 'main',
    modes: {
      main: 'Main',
      notes: 'Release Notes / Changelog',
      greenfire: 'Greenfire',
      contribute: 'Contribute',
      donations: 'Donations'
    },
    isVisible: false
  }),
  methods: {
    createSetActiveMode(mode) {
      return () => this.setActiveMode(mode)
    },
    setActiveMode(mode) {
      this.activeMode = mode
    },
    onClose() {
      this.activeMode = 'main'
      this.isVisible = false
    },
    onOpen() {
      this.isVisible = true
      this.$gtag?.pageview({ page_title: 'About - Main' })
    },
    showModal() {
      this.isVisible = true
      this.onOpen()
    },
    hideModal() {
      this.onClose()
    },
    toggleModal() {
      if (this.isVisible) {
        this.hideModal()
      } else {
        this.showModal()
      }
    }
  },
  watch: {
    activeMode(mode) {
      if (this.isVisible) {
        this.$gtag?.pageview({ page_title: `About - ${this.modes[mode]}` })
      }
    }
  },
  created() {
    window.ipcRenderer.on('about-modal-open', this.toggleModal)
  }
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e5e5;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #666;
  }
}

.tabs-container {
  margin-bottom: 0.5rem;
  padding-bottom: 0;

  :deep(.tabs-wrapper) {
    gap: 0.5rem;
  }
}

.main-content {
  overflow-y: auto;
  margin-top: 0;
  padding-top: 0;
  min-height: 0;
  flex-grow: 1;
}
</style> 