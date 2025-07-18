<template>
  <modal
    name="about-modal"
    classes="p-3"
    width="800px"
    :styles="{ borderRadius: '1rem' }"
    height="550px"
    @closed="onClose"
    @opened="onOpen"
  >
    <div class="top-content">
      <h4 class="h4 font-semibold mb-0">About</h4>

      <!-- Tab Selection -->
      <TabsComponent>
        <TabComponent
          v-for="(name, mode) of modes"
          :key="mode + 'tab'"
          :active="mode === activeMode"
          :onClick="() => (activeMode = mode)"
          >{{ name }}</TabComponent
        >
      </TabsComponent>
    </div>

    <!-- Tab Content -->
    <div class="main-content">
      <AboutMain v-if="activeMode === 'main'" />
      <Notes v-if="activeMode === 'notes'" />
      <Greenfire v-if="activeMode === 'greenfire'" />
    </div>
  </modal>
</template>

<script>
import AboutMain from '@/components/modals/about/Main.vue'
import Notes from '@/components/modals/about/Notes.vue'
import Greenfire from '@/components/modals/about/Greenfire.vue'

export default {
  name: 'AboutView',
  components: { AboutMain, Notes, Greenfire },
  data: () => ({
    activeMode: 'main',
    modes: {
      main: 'Main',
      notes: 'Release Notes / Changelog',
      greenfire: 'Greenfire'
    },
    open: false
  }),
  methods: {
    onClose() {
      this.activeMode = 'main'
      this.open = false
    },
    onOpen() {
      this.open = true
      this.$gtag.pageview({ page_title: 'About - Main' })
    },
    toggleModal() {
      this.open
        ? this.$modal.hide('about-modal')
        : this.$modal.show('about-modal')
    }
  },
  watch: {
    activeMode(mode) {
      if (this.open) {
        this.$gtag.pageview({ page_title: `About - ${this.modes[mode]}` })
      }
    }
  },
  created() {
    window.ipcRenderer.on('about-modal-open', this.toggleModal)
  }
}
</script>

<style lang="scss" scoped>
.top-content {
  height: 76px;
}
.main-content {
  height: 445px;
}
</style>
