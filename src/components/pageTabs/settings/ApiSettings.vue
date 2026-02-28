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
        <div v-if="activeApiTab === 'exchanges'" class="tab-panel space-y-6">
          <h4 class="text-md font-medium text-gray-700">Exchanges</h4>
          <p class="text-sm text-gray-500">
            API keys for trading, price feeds, and exchange integrations.
          </p>
          <div class="space-y-4">
            <div v-for="exchange in exchanges" :key="exchange.id" class="api-key-group">
              <label :for="`exchange-${exchange.id}`" class="block text-sm font-medium text-gray-700 mb-2">
                {{ exchange.name }}
              </label>
              <div class="grid grid-cols-2 gap-3">
                <input
                  :id="`exchange-${exchange.id}`"
                  v-model="apiKeys[exchange.apiKey]"
                  type="password"
                  class="input-field"
                  :placeholder="`${exchange.name} API Key`"
                  autocomplete="off"
                  @blur="saveApiKey(exchange.apiKey)"
                />
                <input
                  v-model="apiKeys[exchange.apiSecret]"
                  type="password"
                  class="input-field"
                  :placeholder="`${exchange.name} API Secret`"
                  autocomplete="off"
                  @blur="saveApiKey(exchange.apiSecret)"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- AI LLMs -->
        <div v-if="activeApiTab === 'llms'" class="tab-panel space-y-6">
          <h4 class="text-md font-medium text-gray-700">AI LLMs</h4>
          <p class="text-sm text-gray-500">
            API keys for AI language models (Gemini, Claude, ChatGPT, etc.).
          </p>
          <div class="llms-table-scroll rounded-lg border border-gray-200 overflow-hidden">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200">
                  <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">#</th>
                  <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">Entity</th>
                  <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">Status</th>
                  <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(entity, idx) in llmTableData"
                  :key="entity.id"
                  class="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                >
                  <td class="py-3 px-4 text-sm text-gray-600">{{ idx + 1 }}</td>
                  <td class="py-3 px-4 text-sm font-medium text-gray-900">{{ entity.name }}</td>
                  <td class="py-3 px-4 text-sm">
                    <button
                      class="text-blue-600 hover:text-blue-800 hover:underline"
                      @click="openLlmModal(entity.id)"
                    >
                      {{ getLlmStatus(entity) }}
                    </button>
                  </td>
                  <td class="py-3 px-4 text-sm">
                    <div class="flex gap-2">
                      <button
                        class="api-table-btn api-table-btn-save"
                        @click="saveApiKey(entity.apiKey)"
                      >
                        Save
                      </button>
                      <button
                        class="api-table-btn api-table-btn-test"
                        @click="() => {}"
                      >
                        Test/Ping
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <LlmsModal v-model="llmsModalOpen" :entity-id="selectedLlmId" />
        </div>

        <!-- IPFS Providers -->
        <div v-if="activeApiTab === 'ipfs'" class="tab-panel space-y-6">
          <h4 class="text-md font-medium text-gray-700">IPFS Providers</h4>
          <p class="text-sm text-gray-500">
            API keys for IPFS pinning services (Filebase, Pinata, etc.).
          </p>
          <div class="space-y-4">
            <div v-for="provider in ipfsProviders" :key="provider.id" class="api-key-group">
              <label :for="`ipfs-${provider.id}`" class="block text-sm font-medium text-gray-700 mb-2">
                {{ provider.name }}
              </label>
              <div v-if="provider.needsSecret" class="grid grid-cols-2 gap-3">
                <input
                  :id="`ipfs-${provider.id}`"
                  v-model="apiKeys[provider.apiKey]"
                  type="password"
                  class="input-field"
                  :placeholder="`${provider.name} API Key`"
                  autocomplete="off"
                  @blur="saveApiKey(provider.apiKey)"
                />
                <input
                  v-model="apiKeys[provider.apiSecret]"
                  type="password"
                  class="input-field"
                  :placeholder="`${provider.name} API Secret`"
                  autocomplete="off"
                  @blur="saveApiKey(provider.apiSecret)"
                />
              </div>
              <input
                v-else
                :id="`ipfs-${provider.id}`"
                v-model="apiKeys[provider.apiKey]"
                type="password"
                class="input-field"
                :placeholder="`${provider.name} API Key`"
                autocomplete="off"
                @blur="saveApiKey(provider.apiKey)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue'
import { CryptoExchanges } from '@/lib/cores/currencyCore/exchanges'
import LlmsModal from '@/components/modals/settings/apis/Llms.vue'

const STORAGE_PREFIX = 'sparkplate_api_'

const LLM_ENTITIES = [
  { id: 'chatgpt', name: 'ChatGPT', apiKey: 'chatgpt_api_key' },
  { id: 'claude', name: 'Claude', apiKey: 'claude_api_key' },
  { id: 'deepseek', name: 'DeepSeek', apiKey: 'deepseek_api_key' },
  { id: 'gemini', name: 'Gemini', apiKey: 'gemini_api_key' },
  { id: 'grok', name: 'Grok', apiKey: 'grok_api_key' },
  { id: 'kimi', name: 'Kimi', apiKey: 'kimi_api_key' },
  { id: 'manus', name: 'Manus', apiKey: 'manus_api_key' },
  { id: 'meta', name: 'Meta', apiKey: 'meta_api_key' },
  { id: 'mistral', name: 'Mistral', apiKey: 'mistral_api_key' },
  { id: 'perplexity', name: 'Perplexity', apiKey: 'perplexity_api_key' },
  { id: 'qwen', name: 'Qwen', apiKey: 'qwen_api_key' },
]

export default defineComponent({
  name: 'ApiSettings',
  components: { LlmsModal },
  setup() {
    const activeApiTab = ref<'exchanges' | 'llms' | 'ipfs'>('exchanges')
    const apiTabLabels = {
      exchanges: 'Exchanges',
      llms: 'AI LLMs',
      ipfs: 'IPFS Providers'
    }

    const exchanges = computed(() =>
      Object.keys(CryptoExchanges).map((name) => {
        const id = name.toLowerCase()
        return {
          id,
          name,
          apiKey: `${id}_api_key`,
          apiSecret: `${id}_api_secret`
        }
      })
    )

    const llmProviders = LLM_ENTITIES.map((e) => ({ id: e.id, name: e.name, apiKey: e.apiKey }))

    const ipfsProviders = [
      { id: 'filebase', name: 'Filebase', apiKey: 'filebase_api_key', apiSecret: 'filebase_api_secret', needsSecret: true },
      { id: 'pinata', name: 'Pinata', apiKey: 'pinata_api_key', apiSecret: 'pinata_api_secret', needsSecret: true },
      { id: 'web3storage', name: 'Web3.Storage', apiKey: 'web3storage_api_key', needsSecret: false },
      { id: 'nftstorage', name: 'NFT.Storage', apiKey: 'nftstorage_api_key', needsSecret: false }
    ]

    const apiKeys = ref<Record<string, string>>({})

    const loadApiKeys = () => {
      const keys: Record<string, string> = {}
      const allKeys = [
        ...exchanges.value.flatMap((e) => [e.apiKey, e.apiSecret]),
        ...llmProviders.map((l) => l.apiKey),
        ...ipfsProviders.flatMap((p) => (p.needsSecret ? [p.apiKey, p.apiSecret] : [p.apiKey]))
      ]
      for (const key of allKeys) {
        try {
          const stored = localStorage.getItem(STORAGE_PREFIX + key)
          if (stored) keys[key] = stored
        } catch {
          // Ignore storage errors
        }
      }
      apiKeys.value = keys
    }

    const saveApiKey = (key: string) => {
      const value = apiKeys.value[key]
      try {
        if (value) {
          localStorage.setItem(STORAGE_PREFIX + key, value)
        } else {
          localStorage.removeItem(STORAGE_PREFIX + key)
        }
      } catch {
        // Ignore storage errors
      }
    }

    const llmsModalOpen = ref(false)
    const selectedLlmId = ref('')

    const getLlmStatus = (entity: { apiKey: string }) => {
      const key = apiKeys.value[entity.apiKey]
      return key ? 'Configured' : '—'
    }

    const openLlmModal = (entityId: string) => {
      selectedLlmId.value = entityId
      llmsModalOpen.value = true
    }

    const llmTableData = computed(() => LLM_ENTITIES)

    onMounted(loadApiKeys)

    watch(llmsModalOpen, (open) => {
      if (!open) loadApiKeys()
    })

    return {
      activeApiTab,
      apiTabLabels,
      exchanges,
      llmProviders,
      ipfsProviders,
      apiKeys,
      saveApiKey,
      llmTableData,
      llmsModalOpen,
      selectedLlmId,
      getLlmStatus,
      openLlmModal,
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

  .api-table-btn {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    border-radius: 0.25rem;
    cursor: pointer;
    border: 1px solid #d1d5db;
    background: white;
  }

  .api-table-btn-save:hover {
    background: #eff6ff;
    border-color: #3b82f6;
  }

  .api-table-btn-test:hover {
    background: #f0fdf4;
    border-color: #22c55e;
  }

  .llms-table-scroll {
    max-height: 100%;
    overflow-y: auto;

    thead {
      position: sticky;
      top: 0;
      z-index: 1;
      background: #f9fafb;
    }
  }
}
</style>
