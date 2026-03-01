<template>
  <div class="tab-panel space-y-6">
    <h4 class="text-md font-medium text-gray-700">Exchanges</h4>
    <p class="text-sm text-gray-500">
      API keys for trading, price feeds, and exchange integrations.
    </p>
    <div class="exchange-cards-scroll grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div
        v-for="exchange in exchangeTableData"
        :key="exchange.id"
        class="exchange-card rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:border-gray-300 transition-colors"
      >
        <button
          type="button"
          class="w-full flex items-center gap-2 text-left mb-3 min-w-0"
          @click="openExchangeModal(exchange.id)"
        >
          <img
            v-if="exchangeIconMap[exchange.id]"
            :src="exchangeIconMap[exchange.id]"
            :alt="exchange.name"
            class="exchange-entity-icon shrink-0"
          />
          <i v-else class="bi bi-currency-exchange exchange-entity-icon shrink-0"></i>
          <span class="text-sm font-medium text-gray-900 wrap-break-word">{{ exchange.name }}</span>
        </button>
        <button
          type="button"
          role="switch"
          :aria-checked="!!apiKeys[exchange.apiKey]"
          :class="['exchange-toggle', { 'exchange-toggle-on': apiKeys[exchange.apiKey] }]"
          @click.stop="toggleExchange(exchange)"
        >
          <span class="exchange-toggle-thumb" />
        </button>
      </div>
    </div>
    <ExchangesModal v-model="exchangeModalOpen" :exchange-id="selectedExchangeId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue'
import ExchangesModal from '@/components/modals/settings/apis/ExchangesModal.vue'
import { CryptoExchanges } from '@/lib/cores/currencyCore/exchanges'

const STORAGE_PREFIX = 'sparkplate_api_'

const EXCHANGE_ENTITIES = Object.keys(CryptoExchanges).map((name) => {
  const id = name.toLowerCase()
  return {
    id,
    name,
    apiKey: `${id}_api_key`,
    apiSecret: `${id}_api_secret`,
  }
})

// Icons from public/assets/icons/exchanges (fallback to generic icon when missing)
const EXCHANGE_ICON_MAP: Record<string, string> = {
  binance: '/assets/icons/exchanges/binance.svg',
  bitfinex: '/assets/icons/exchanges/bitfinex.svg',
  bitget: '/assets/icons/exchanges/bitget.svg',
  bitflyer: '/assets/icons/exchanges/bitflyer.svg',
  bitstamp: '/assets/icons/exchanges/bitstamp.svg',
  bybit: '/assets/icons/exchanges/bybit.svg',
  coinbase: '/assets/icons/exchanges/coinbase.svg',
  gateio: '/assets/icons/exchanges/gateio.svg',
  gemini: '/assets/icons/exchanges/gemini.svg',
  huobi: '/assets/icons/exchanges/htx.svg',
  kraken: '/assets/icons/exchanges/kraken.svg',
  kucoin: '/assets/icons/exchanges/kucoin.svg',
  mexc: '/assets/icons/exchanges/mexc.svg',
  okx: '/assets/icons/exchanges/okx.svg',
  upbit: '/assets/icons/exchanges/upbit.svg',
}

export default defineComponent({
  name: 'Exchanges',
  components: { ExchangesModal },
  setup() {
    const apiKeys = ref<Record<string, string>>({})

    const loadApiKeys = () => {
      const keys: Record<string, string> = {}
      for (const exchange of EXCHANGE_ENTITIES) {
        try {
          const stored = localStorage.getItem(STORAGE_PREFIX + exchange.apiKey)
          if (stored) keys[exchange.apiKey] = stored
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

    const exchangeModalOpen = ref(false)
    const selectedExchangeId = ref('')

    const openExchangeModal = (exchangeId: string) => {
      selectedExchangeId.value = exchangeId
      exchangeModalOpen.value = true
    }

    const toggleExchange = (exchange: { id: string; apiKey: string; apiSecret: string }) => {
      if (apiKeys.value[exchange.apiKey]) {
        apiKeys.value[exchange.apiKey] = ''
        apiKeys.value[exchange.apiSecret] = ''
        saveApiKey(exchange.apiKey)
        saveApiKey(exchange.apiSecret)
      } else {
        openExchangeModal(exchange.id)
      }
    }

    const exchangeTableData = computed(() => EXCHANGE_ENTITIES)

    onMounted(loadApiKeys)

    watch(exchangeModalOpen, (open) => {
      if (!open) loadApiKeys()
    })

    return {
      apiKeys,
      saveApiKey,
      exchangeTableData,
      exchangeModalOpen,
      selectedExchangeId,
      openExchangeModal,
      toggleExchange,
      exchangeIconMap: EXCHANGE_ICON_MAP,
    }
  }
})
</script>

<style lang="scss" scoped>
.exchange-cards-scroll {
  max-height: 100%;
  overflow-y: auto;
}

.exchange-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.exchange-entity-icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  object-fit: contain;
}

.exchange-entity-icon.bi {
  font-size: 1.5rem;
  color: #6b7280;
}

.exchange-toggle {
  position: relative;
  display: inline-flex;
  width: 2.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  align-items: center;
  border: none;
  border-radius: 9999px;
  background: #d1d5db;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.exchange-toggle:hover {
  background: #9ca3af;
}

.exchange-toggle-on {
  background: #22c55e;
}

.exchange-toggle-on:hover {
  background: #16a34a;
}

.exchange-toggle-thumb {
  position: absolute;
  left: 2px;
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.exchange-toggle-on .exchange-toggle-thumb {
  transform: translateX(1rem);
}
</style>
