<template>
  <div class="network-settings">
    <h3 class="network-settings-title">Network Settings</h3>
    <p class="network-settings-desc">
      Configure adapters, proxies, services, and BitTorrent.
    </p>

    <div class="network-tabs-layout">
      <div class="network-tabs-nav">
        <button
          v-for="(label, key) in networkTabLabels"
          :key="key"
          type="button"
          class="network-tab-btn"
          :class="{ active: activeNetworkTab === key }"
          @click="activeNetworkTab = key"
        >
          {{ label }}
        </button>
      </div>

      <div class="network-tabs-content">
        <AdaptersAndProxies v-if="activeNetworkTab === 'adapters'" />
        <ServicesProtocols v-if="activeNetworkTab === 'services'" />
        <Bittorrent v-if="activeNetworkTab === 'bittorrent'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdaptersAndProxies from '@/components/pageTabs/settings/aspect.Network/AdaptersAndProxies.vue'
import ServicesProtocols from '@/components/pageTabs/settings/aspect.Network/ServicesProtocols.vue'
import Bittorrent from '@/components/pageTabs/settings/aspect.Network/Bittorrent.vue'

const activeNetworkTab = ref<'adapters' | 'services' | 'bittorrent'>('adapters')
const networkTabLabels = {
  adapters: 'Adapters & Proxies',
  services: 'Services / Protocols',
  bittorrent: 'BitTorrent',
}
</script>

<style lang="scss" scoped>
.network-settings {
  width: 100%;
}

.network-settings-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.network-settings-desc {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.network-tabs-layout {
  display: flex;
  gap: 1.25rem;
  min-height: 320px;
  max-height: calc(100vh - 260px);
  overflow: hidden;
}

.network-tabs-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 160px;
  max-width: 180px;
  border-right: 1px solid #e5e7eb;
  padding-right: 1rem;
}

.network-tab-btn {
  text-align: left;
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: #6b7280;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #374151;
    background-color: #f3f4f6;
  }

  &.active {
    color: #3b82f6;
    background-color: #eff6ff;
    border-right: 2px solid #3b82f6;
    margin-right: -1rem;
    padding-right: calc(0.75rem + 1rem);
  }
}

.network-tabs-content {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
}
</style>
