<template>
  <div class="api-settings">
    <h3 class="text-lg font-semibold mb-4">API Keys</h3>
    <p class="text-sm text-gray-600 mb-6">
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
          <h4 class="text-md font-medium text-gray-700">Cryptocurrency Exchanges</h4>
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
          <div class="space-y-4">
            <div v-for="llm in llmProviders" :key="llm.id" class="api-key-group">
              <label :for="`llm-${llm.id}`" class="block text-sm font-medium text-gray-700 mb-2">
                {{ llm.name }}
              </label>
              <input
                :id="`llm-${llm.id}`"
                v-model="apiKeys[llm.apiKey]"
                type="password"
                class="input-field"
                :placeholder="`${llm.name} API Key`"
                autocomplete="off"
                @blur="saveApiKey(llm.apiKey)"
              />
            </div>
          </div>
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
import { defineComponent, ref, onMounted, computed } from 'vue'
import { CryptoExchanges } from '@/lib/cores/currencyCore/exchanges'

const STORAGE_PREFIX = 'sparkplate_api_'

export default defineComponent({
  name: 'ApiSettings',
  setup() {
    const activeApiTab = ref<'exchanges' | 'llms' | 'ipfs'>('exchanges')
    const apiTabLabels = {
      exchanges: 'Cryptocurrency Exchanges',
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

    const llmProviders = [
      { id: 'gemini', name: 'Google Gemini', apiKey: 'gemini_api_key' },
      { id: 'claude', name: 'Anthropic Claude', apiKey: 'claude_api_key' },
      { id: 'openai', name: 'OpenAI (ChatGPT)', apiKey: 'openai_api_key' },
      { id: 'groq', name: 'Groq', apiKey: 'groq_api_key' },
      { id: 'mistral', name: 'Mistral AI', apiKey: 'mistral_api_key' }
    ]

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

    onMounted(loadApiKeys)

    return {
      activeApiTab,
      apiTabLabels,
      exchanges,
      llmProviders,
      ipfsProviders,
      apiKeys,
      saveApiKey
    }
  }
})
</script>

<style lang="scss" scoped>
.api-settings {
  .api-tabs-layout {
    display: flex;
    gap: 2rem;
    min-height: 320px;
  }

  .api-tabs-nav {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 220px;
    border-right: 1px solid #e5e7eb;
    padding-right: 1.5rem;
  }

  .api-tab-btn {
    text-align: left;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
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
      margin-right: -1.5rem;
      padding-right: calc(1rem + 1.5rem);
    }
  }

  .api-tabs-content {
    flex: 1;
    min-width: 0;
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
