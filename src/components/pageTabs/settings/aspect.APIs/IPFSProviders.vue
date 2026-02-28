<template>
  <div class="tab-panel space-y-6">
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
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

const STORAGE_PREFIX = 'sparkplate_api_'

const IPFS_PROVIDERS = [
  { id: 'filebase', name: 'Filebase', apiKey: 'filebase_api_key', apiSecret: 'filebase_api_secret', needsSecret: true },
  { id: 'pinata', name: 'Pinata', apiKey: 'pinata_api_key', apiSecret: 'pinata_api_secret', needsSecret: true },
  { id: 'web3storage', name: 'Web3.Storage', apiKey: 'web3storage_api_key', needsSecret: false },
  { id: 'nftstorage', name: 'NFT.Storage', apiKey: 'nftstorage_api_key', needsSecret: false }
]

export default defineComponent({
  name: 'IPFSProviders',
  setup() {
    const ipfsProviders = IPFS_PROVIDERS
    const apiKeys = ref<Record<string, string>>({})

    const loadApiKeys = () => {
      const keys: Record<string, string> = {}
      const allKeys = ipfsProviders.flatMap((p) => (p.needsSecret ? [p.apiKey, p.apiSecret] : [p.apiKey]))
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
      ipfsProviders,
      apiKeys,
      saveApiKey,
    }
  }
})
</script>

<style lang="scss" scoped>
.api-key-group {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #f3f4f6;
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
</style>
