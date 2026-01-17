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
      <user-profile v-if="activeTab === 'User'" />
      <!-- user content -->

      <!-- security content -->
      <security-settings v-if="activeTab === 'Security'" />
      <!-- security content -->

      <!-- email content -->
      <email-settings v-if="activeTab === 'Email'" />
      <!-- email content -->

      <!-- application content -->
      <application-settings v-if="activeTab === 'Application'" />
      <!-- application content -->

      <!-- backup content -->
      <backup-settings v-if="activeTab === 'Backup'" />
      <!-- backup content -->

      <!-- network content -->
      <network-settings v-if="activeTab === 'Network'" />
      <!-- network content -->

      <!-- notifications content -->
      <notifications-settings v-if="activeTab === 'Notifications'" />
      <!-- notifications content -->

      <!-- hardware content -->
      <hardware-settings v-if="activeTab === 'Hardware'" />
      <!-- hardware content -->

      <misc v-if="activeTab === 'Misc'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Components
import UserProfile from '@/components/pageTabs/settings/UserProfile.vue'
import Misc from '@/components/pageTabs/settings/Misc.vue'
import SecuritySettings from '@/components/pageTabs/settings/SecuritySettings.vue'
import EmailSettings from '@/components/pageTabs/settings/EmailSettings.vue'
import ApplicationSettings from '@/components/pageTabs/settings/ApplicationSettings.vue'
import BackupSettings from '@/components/pageTabs/settings/BackupSettings.vue'
import NetworkSettings from '@/components/pageTabs/settings/NetworkSettings.vue'
import NotificationsSettings from '@/components/pageTabs/settings/NotificationsSettings.vue'
import HardwareSettings from '@/components/pageTabs/settings/HardwareSettings.vue'
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
    ApplicationSettings,
    BackupSettings,
    NetworkSettings,
    NotificationsSettings,
    HardwareSettings,
    NetworkStatus,
    TabComponent,
    TabsWrapper
  },
  setup() {
    const route = useRoute()
    const activeTab = ref('User')
    const tabs = ref(['User', 'Security', 'Email', 'Application', 'Backup', 'Network', 'Notifications', 'Hardware', 'Misc'])

    onMounted(() => {
      if (route.params.activeTab) {
        activeTab.value = (route.params.activeTab as string).charAt(0).toUpperCase() + (route.params.activeTab as string).slice(1)
      } else {
        activeTab.value = 'User'
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