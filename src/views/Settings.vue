<template>
  <div class="view settings">
    <br>
    <h1 class="view-name">Settings</h1>
    <network-status />
    
    <!-- settings tabs -->
    <tabs-wrapper class="flex items-center text-xl font-semibold">
      <tab-component
        v-for="(tab, tabIndex) in tabs"
        :key="`settings-view_tab-${tabIndex}`"
        :on-click="() => (activeTab = tab)"
        :active="tab === activeTab"
      >
        {{ tab }}
      </tab-component>
    </tabs-wrapper>
    <!-- settings tabs -->

    <div class="bg-white shadow py-5 px-4 mt-4 rounded-lg">
      <!-- user content -->
      <user-profile v-if="activeTab === 'user'" />
      <!-- user content -->

      <!-- security content -->
      <security-settings v-if="activeTab === 'security'" />
      <!-- security content -->

      <!-- email content -->
      <email-settings v-if="activeTab === 'email'" />
      <!-- email content -->

      <misc v-if="activeTab === 'misc'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Components
import UserProfile from '@/components/settings/UserProfile.vue'
import Misc from '@/components/settings/Misc.vue'
import SecuritySettings from '@/components/settings/SecuritySettings.vue'
import EmailSettings from '@/components/settings/EmailSettings.vue'
import NetworkStatus from '@/components/global/NetworkStatus.vue'
import TabComponent from '@/components/global/TabComponent.vue'
import TabsWrapper from '@/components/global/TabsWrapper.vue'

export default defineComponent({
  name: 'SettingsView',
  components: {
    UserProfile,
    EmailSettings,
    SecuritySettings,
    Misc,
    NetworkStatus,
    TabComponent,
    TabsWrapper
  },
  setup() {
    const route = useRoute()
    const activeTab = ref('user')
    const tabs = ref(['user', 'security', 'email', 'misc'])

    onMounted(() => {
      if (route.params.activeTab) {
        activeTab.value = route.params.activeTab as string
      }
    })

    return {
      activeTab,
      tabs
    }
  }
})
</script>

<style lang="scss" scoped>
.settings {
  .view-name {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #1f2937;
  }
}
</style> 