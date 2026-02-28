<template>
  <div class="tab-panel space-y-6">
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
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { CryptoExchanges } from '@/lib/cores/currencyCore/exchanges'

const STORAGE_PREFIX = 'sparkplate_api_'

export default defineComponent({
  name: 'Exchanges',
  setup() {
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

    const apiKeys = ref<Record<string, string>>({})

    const loadApiKeys = () => {
      const keys: Record<string, string> = {}
      const allKeys = exchanges.value.flatMap((e) => [e.apiKey, e.apiSecret])
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
      exchanges,
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
