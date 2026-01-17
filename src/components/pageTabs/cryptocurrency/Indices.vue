<template>
  <div class="indices-container">
    <!-- Index Selection Dropdown -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Select Index
      </label>
      <select
        v-model="selectedIndex"
        class="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      >
        <option v-for="index in availableIndices" :key="index.id" :value="index.id">
          {{ index.label }}
        </option>
      </select>
    </div>

    <!-- Currency Table -->
    <div v-if="filteredCurrencies.length > 0" class="overflow-x-auto">
      <table class="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              #
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Symbol
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Name
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Type
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Consensus
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Class
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(currency, index) in filteredCurrencies"
            :key="currency.symbol || currency.tickerSymbol"
            class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              {{ index + 1 }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ currency.symbol || currency.tickerSymbol }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-900 dark:text-gray-100">{{ currency.name }}</div>
              <div v-if="currency.description" class="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md">
                {{ currency.description }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="getTypeClass(currency.type)"
              >
                {{ currency.type }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {{ formatConsensusType(currency.consensusType) }}
            </td>
            <td class="px-6 py-4">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="(cls, idx) in (currency.class || [])"
                  :key="idx"
                  class="px-2 py-1 text-xs font-medium rounded"
                  :class="getClassBadgeClass()"
                >
                  {{ cls }}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400">No currencies found for the selected index.</p>
    </div>

    <!-- Summary Info -->
    <div v-if="filteredCurrencies.length > 0" class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <p class="text-sm text-gray-700 dark:text-gray-300">
        Showing <span class="font-semibold">{{ filteredCurrencies.length }}</span> currencies
        from <span class="font-semibold">{{ getIndexLabel(selectedIndex) }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  PROOF_OF_WORK,
  PROOF_OF_STAKE,
  NY_EXCHANGE_OFFERINGS_COINBASE,
  NY_EXCHANGE_OFFERINGS_GEMINI,
  STORAGE_CURRENCIES,
  type ProofOfWorkItem,
  type ProofOfStakeItem,
  type NYExchangeOfferingsCoinbaseItem,
  type NYExchangeOfferingsGeminiItem,
  type StorageCurrencyItem
} from '@/lib/cores/currencyCore/indexComposites'

// Define component name
defineOptions({
  name: 'CryptocurrencyIndices'
})

type CurrencyItem = ProofOfWorkItem | ProofOfStakeItem | NYExchangeOfferingsCoinbaseItem | NYExchangeOfferingsGeminiItem | StorageCurrencyItem

interface IndexOption {
  id: string
  label: string
  data: CurrencyItem[]
}

const selectedIndex = ref<string>('proof-of-work')

const availableIndices: IndexOption[] = [
  {
    id: 'proof-of-work',
    label: 'Proof of Work',
    data: PROOF_OF_WORK
  },
  {
    id: 'proof-of-stake',
    label: 'Proof of Stake',
    data: PROOF_OF_STAKE
  },
  {
    id: 'coinbase-ny',
    label: 'Coinbase (NY)',
    data: NY_EXCHANGE_OFFERINGS_COINBASE
  },
  {
    id: 'gemini-ny',
    label: 'Gemini (NY)',
    data: NY_EXCHANGE_OFFERINGS_GEMINI
  },
  {
    id: 'storage',
    label: 'Storage',
    data: STORAGE_CURRENCIES
  }
]

const filteredCurrencies = computed(() => {
  const index = availableIndices.find(idx => idx.id === selectedIndex.value)
  if (!index) return []
  
  // Handle different currency item structures
  return index.data.map(item => {
    // Normalize tickerSymbol to symbol for StorageCurrencyItem
    if ('tickerSymbol' in item && !('symbol' in item)) {
      return { ...item, symbol: item.tickerSymbol }
    }
    return item
  })
})

const getIndexLabel = (indexId: string): string => {
  const index = availableIndices.find(idx => idx.id === indexId)
  return index?.label || indexId
}

const getTypeClass = (type: string | undefined): string => {
  if (!type) return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  return type === 'coin'
    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
}

const getClassBadgeClass = (): string => {
  return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
}

const formatConsensusType = (consensusType: string | undefined): string => {
  if (!consensusType) return 'N/A'
  return consensusType.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}
</script>

<style scoped>
.indices-container {
  @apply w-full;
}

/* Table responsive styles */
@media (max-width: 768px) {
  .indices-container table {
    font-size: 0.875rem;
  }
  
  .indices-container th,
  .indices-container td {
    padding: 0.5rem;
  }
}
</style>

