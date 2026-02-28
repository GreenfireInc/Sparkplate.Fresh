<template>
  <div class="api-settings">
    <h3 class="text-lg font-semibold mb-2">API Keys</h3>
    <p class="text-sm text-gray-600 mb-3">
      Configure API keys to enable exchange integrations, AI features, and IPFS storage.
    </p>

    <div class="api-tabs-layout">
      <!-- Left-oriented tab navigation -->
      <div class="api-tabs-nav">
        <button
          v-for="(label, key) in apiTabLabels"
          :key="key"
          type="button"
          class="api-tab-btn"
          :class="{ active: activeApiTab === key }"
          @click="activeApiTab = key"
        >
          {{ label }}
        </button>
      </div>

      <!-- Tab content -->
      <div class="api-tabs-content">
        <!-- Cryptocurrency Exchanges -->
        <Exchanges v-if="activeApiTab === 'exchanges'" />

        <!-- AI LLMs -->
        <AiLLMProviders v-if="activeApiTab === 'llms'" />

        <!-- IPFS Providers -->
        <IPFSProviders v-if="activeApiTab === 'ipfs'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Exchanges from '@/components/pageTabs/settings/aspect.APIs/Exchanges.vue'
import AiLLMProviders from '@/components/pageTabs/settings/aspect.APIs/AiLLMProviders.vue'
import IPFSProviders from '@/components/pageTabs/settings/aspect.APIs/IPFSProviders.vue'

export default defineComponent({
  name: 'ApiSettings',
  components: { Exchanges, AiLLMProviders, IPFSProviders },
  setup() {
    const activeApiTab = ref<'exchanges' | 'llms' | 'ipfs'>('exchanges')
    const apiTabLabels = {
      exchanges: 'Exchanges',
      llms: 'AI LLMs',
      ipfs: 'IPFS Providers'
    }

    return {
      activeApiTab,
      apiTabLabels,
    }
  }
})
</script>

<style lang="scss" scoped>
.api-settings {
  .api-tabs-layout {
    display: flex;
    gap: 1.25rem;
    min-height: 320px;
    max-height: calc(100vh - 260px);
    overflow: hidden;
  }

  .api-tabs-nav {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 140px;
    max-width: 160px;
    border-right: 1px solid #e5e7eb;
    padding-right: 1rem;
  }

  .api-tab-btn {
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

  .api-tabs-content {
    flex: 1;
    min-width: 0;
    overflow-y: auto;
  }

  .tab-panel {
    padding: 0.25rem 0;
  }

  .input-field {
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background: white;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }

    &::placeholder {
      color: #9ca3af;
    }
  }

  .api-key-group {
    padding: 1rem;
    background: #f9fafb;
    border-radius: 0.5rem;
    border: 1px solid #f3f4f6;
  }
}
</style>
