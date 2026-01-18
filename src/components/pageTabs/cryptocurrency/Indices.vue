<template>
  <div class="indices-container">
    <!-- Index Selection Dropdown and Search -->
    <div class="mb-6 flex items-end gap-3 flex-wrap">
      <IndexSelector
        v-model="selectedIndex"
        :available-indices="availableIndices"
      />
      
      <!-- Search Input (List View Only) -->
      <div v-if="viewMode === 'list'" class="flex-1 min-w-[200px]">
        
        <div class="relative">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" :size="18" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="          Search by symbol or name..."
            class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X :size="18" />
          </button>
        </div>
      </div>
      
      <!-- View Toggle Buttons -->
      <div class="flex gap-2 ml-auto">
        <button
          @click="viewMode = 'chart'"
          :class="[
            'p-2 rounded-lg border transition-all',
            viewMode === 'chart'
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          ]"
          title="Chart View"
        >
          <ChartPie :size="20" />
        </button>
        <button
          @click="viewMode = 'list'"
          :class="[
            'p-2 rounded-lg border transition-all',
            viewMode === 'list'
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          ]"
          title="List View"
        >
          <List :size="20" />
        </button>
      </div>
    </div>

    <!-- Chart View -->
    <div v-if="viewMode === 'chart' && filteredCurrencies.length > 0" class="chart-view-container">
      <div class="flex flex-col xl:flex-row items-center xl:items-start gap-8">
        <!-- Donut Chart -->
        <div class="chart-wrapper">
          <svg 
            :viewBox="`0 0 ${chartSize} ${chartSize}`" 
            class="donut-chart"
            @mouseleave="hoveredSegment = null"
          >
            <!-- Background circle (donut hole) -->
            <circle
              :cx="chartSize / 2"
              :cy="chartSize / 2"
              :r="radius"
              fill="none"
              class="stroke-gray-200 dark:stroke-gray-700"
              :stroke-width="strokeWidth"
            />
            <!-- Chart segments -->
            <circle
              v-for="(segment, index) in chartSegments"
              :key="`segment-${index}`"
              :cx="chartSize / 2"
              :cy="chartSize / 2"
              :r="radius"
              fill="none"
              :stroke="segment.color"
              :stroke-width="hoveredSegment === index ? strokeWidth + 4 : strokeWidth"
              :stroke-dasharray="segment.dashArray"
              :stroke-dashoffset="segment.dashOffset"
              stroke-linecap="butt"
              class="segment-circle transition-all duration-200 cursor-pointer"
              :class="{ 'opacity-70': hoveredSegment !== null && hoveredSegment !== index }"
              @mouseenter="hoveredSegment = index"
              @mouseleave="hoveredSegment = null"
            />
          </svg>
          <!-- Center Text -->
          <div class="chart-center-text">
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ hoveredSegment !== null ? chartSegments[hoveredSegment]?.symbol : filteredCurrencies.length }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ hoveredSegment !== null ? chartSegments[hoveredSegment]?.percentage.toFixed(1) + '%' : 'Assets' }}
            </p>
          </div>
        </div>

        <!-- Legend -->
        <div class="chart-legend">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {{ getIndexLabel(selectedIndex) }}
          </h3>
          <div class="legend-grid">
            <div
              v-for="(segment, index) in chartSegments"
              :key="`legend-${index}`"
              class="legend-item"
              :class="{ 'legend-item-active': hoveredSegment === index }"
              @mouseenter="hoveredSegment = index"
              @mouseleave="hoveredSegment = null"
            >
              <span 
                class="legend-color" 
                :style="{ backgroundColor: segment.color }"
              ></span>
              <span class="legend-symbol">{{ segment.symbol }}</span>
              <span class="legend-percentage">{{ segment.percentage.toFixed(1) }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- List View - Currency Table -->
    <div v-if="viewMode === 'list' && filteredCurrencies.length > 0" class="table-container">
      <table class="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <thead class="sticky-header">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              #
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Logo
            </th>
            <th 
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 select-none"
              @click="sortBy('symbol')"
            >
              <div class="flex items-center gap-2">
                Symbol
                <span class="sort-indicator">
                  <svg v-if="sortColumn === 'symbol'" class="w-4 h-4 inline-block" :class="{ 'rotate-180': sortDirection === 'desc' }" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>
            <th 
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 select-none"
              @click="sortBy('name')"
            >
              <div class="flex items-center gap-2">
                Name
                <span class="sort-indicator">
                  <svg v-if="sortColumn === 'name'" class="w-4 h-4 inline-block" :class="{ 'rotate-180': sortDirection === 'desc' }" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>
            <th 
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 select-none"
              @click="sortBy('type')"
            >
              <div class="flex items-center gap-2">
                Type
                <span class="sort-indicator">
                  <svg v-if="sortColumn === 'type'" class="w-4 h-4 inline-block" :class="{ 'rotate-180': sortDirection === 'desc' }" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>
            <th 
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 select-none"
              @click="sortBy('consensus')"
            >
              <div class="flex items-center gap-2">
                Consensus
                <span class="sort-indicator">
                  <svg v-if="sortColumn === 'consensus'" class="w-4 h-4 inline-block" :class="{ 'rotate-180': sortDirection === 'desc' }" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Class
            </th>
            <th 
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 select-none"
              @click="sortBy('price')"
            >
              <div class="flex items-center gap-2">
                Price
                <span class="sort-indicator">
                  <svg v-if="sortColumn === 'price'" class="w-4 h-4 inline-block" :class="{ 'rotate-180': sortDirection === 'desc' }" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(currency, index) in filteredCurrencies"
            :key="`${selectedIndex}-${index}-${currency.symbol || currency.tickerSymbol || currency.ticker}`"
            class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            @click="openCurrencyModal(currency)"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              {{ index + 1 }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <img
                :src="getCurrencyLogo(currency)"
                :alt="(currency.symbol || currency.tickerSymbol || currency.ticker) + ' logo'"
                class="w-8 h-8 rounded-full object-cover"
                :ref="(el) => { if (el) (el as any).__currency = currency }"
                @error="handleImageError"
                loading="lazy"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ currency.symbol || currency.tickerSymbol || currency.ticker }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 dark:text-gray-100">{{ currency.name }}</div>
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
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              <div v-if="currencyPrices[(currency.symbol || currency.tickerSymbol || currency.ticker || '').toLowerCase()]">
                <span class="font-medium">
                  ${{ formatPrice(currencyPrices[(currency.symbol || currency.tickerSymbol || currency.ticker || '').toLowerCase()]?.price || 0) }}
                </span>
                <span 
                  v-if="currencyPrices[(currency.symbol || currency.tickerSymbol || currency.ticker || '').toLowerCase()]?.priceChange"
                  class="ml-2 text-xs"
                  :class="currencyPrices[(currency.symbol || currency.tickerSymbol || currency.ticker || '').toLowerCase()]?.priceChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
                >
                  ({{ currencyPrices[(currency.symbol || currency.tickerSymbol || currency.ticker || '').toLowerCase()]?.priceChange >= 0 ? '+' : '' }}{{ currencyPrices[(currency.symbol || currency.tickerSymbol || currency.ticker || '').toLowerCase()]?.priceChange.toFixed(2) }}%)
                </span>
              </div>
              <div v-else-if="priceLoading" class="text-gray-400 dark:text-gray-500">
                Loading...
              </div>
              <div v-else class="text-gray-400 dark:text-gray-500">
                N/A
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

    <!-- Currency Detail Modal -->
    <CurrencyDetailModal
      :is-open="isModalOpen"
      :currency="selectedCurrency"
      @close="closeCurrencyModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { ChartPie, List, Search, X } from 'lucide-vue-next'
import * as IndexComposites from '@/lib/cores/currencyCore/indexComposites'
import CurrencyDetailModal from './indices/CurrencyDetailModal.vue'
import IndexSelector, { type IndexOption, type CurrencyItem } from './dropdowns/IndexSelector.vue'
import { fetchCurrencyPrices, formatPrice } from '@/lib/cores/currencyCore/indexComposites'

// Define component name
defineOptions({
  name: 'CryptocurrencyIndices'
})

const selectedIndex = ref<string>('proof-of-work')
const sortColumn = ref<string | null>(null)
const sortDirection = ref<'asc' | 'desc'>('asc')
const viewMode = ref<'chart' | 'list'>('list')
const hoveredSegment = ref<number | null>(null)
const searchQuery = ref<string>('')
const isModalOpen = ref<boolean>(false)
const selectedCurrency = ref<any>(null)
const currencyPrices = ref<Record<string, { price: number; priceChange: number; marketCap: number }>>({})
const priceLoading = ref<boolean>(false)

// Chart configuration
const chartSize = 300
const strokeWidth = 40
const radius = (chartSize - strokeWidth) / 2
const circumference = 2 * Math.PI * radius

// Color palette for chart segments
const chartColors = [
  '#3B82F6', // blue-500
  '#10B981', // emerald-500
  '#F59E0B', // amber-500
  '#EF4444', // red-500
  '#8B5CF6', // violet-500
  '#EC4899', // pink-500
  '#06B6D4', // cyan-500
  '#84CC16', // lime-500
  '#F97316', // orange-500
  '#6366F1', // indigo-500
  '#14B8A6', // teal-500
  '#A855F7', // purple-500
  '#22C55E', // green-500
  '#0EA5E9', // sky-500
  '#E11D48', // rose-600
  '#7C3AED', // violet-600
  '#2563EB', // blue-600
  '#059669', // emerald-600
  '#D97706', // amber-600
  '#DC2626', // red-600
]

// Explicitly define each index with its own data array to ensure no cross-contamination
const availableIndices: IndexOption[] = [
  {
    id: 'proof-of-work',
    label: 'Proof of Work',
    data: IndexComposites.PROOF_OF_WORK as CurrencyItem[]
  },
  {
    id: 'proof-of-stake',
    label: 'Proof of Stake',
    data: IndexComposites.PROOF_OF_STAKE as CurrencyItem[]
  },
  {
    id: 'coinbase-ny',
    label: 'Coinbase (NY)',
    data: IndexComposites.NY_EXCHANGE_OFFERINGS_COINBASE as CurrencyItem[]
  },
  {
    id: 'gemini-ny',
    label: 'Gemini (NY)',
    data: IndexComposites.NY_EXCHANGE_OFFERINGS_GEMINI as CurrencyItem[]
  },
  {
    id: 'bitflyer-ny',
    label: 'bitFlyer (NY)',
    data: IndexComposites.NY_EXCHANGE_OFFERINGS_BITFLYER as CurrencyItem[]
  },
  {
    id: 'bitstamp-ny',
    label: 'bitStamp (NY)',
    data: IndexComposites.NY_EXCHANGE_OFFERINGS_BITSTAMP as CurrencyItem[]
  },
  {
    id: 'paypal-venmo-ny',
    label: 'PayPal/Venmo (NY)',
    data: IndexComposites.NY_EXCHANGE_OFFERINGS_PAYPAL_VENMO as CurrencyItem[]
  },
  {
    id: 'robinhood-ny',
    label: 'Robinhood (NY)',
    data: IndexComposites.NY_EXCHANGE_OFFERINGS_ROBINHOOD as CurrencyItem[]
  },
  {
    id: 'storage',
    label: 'Storage',
    data: IndexComposites.STORAGE_CURRENCIES as CurrencyItem[]
  },
  {
    id: 'oracles',
    label: 'Oracles',
    data: IndexComposites.CLASS_ORACLES as CurrencyItem[]
  },
  {
    id: 'coinbase50',
    label: 'Coinbase 50',
    data: IndexComposites.COINBASE50 as CurrencyItem[]
  },
  {
    id: 'currency-core',
    label: 'Currency Core',
    data: IndexComposites.CURRENCY_CORE as CurrencyItem[]
  },
  {
    id: 'exchange-currencies',
    label: 'Exchange Currencies',
    data: IndexComposites.EXCHANGE_CURRENCIES as CurrencyItem[]
  },
  {
    id: 'greenery-v1',
    label: 'Greenery V1',
    data: IndexComposites.GREENERY_V1 as CurrencyItem[]
  },
  {
    id: 'greenery36-set0',
    label: 'Greenery 36 Set 0',
    data: IndexComposites.GREENERY36_SET0 as CurrencyItem[]
  },
  {
    id: 'nft-marketplace-currencies',
    label: 'NFT Marketplace Currencies',
    data: IndexComposites.NFT_MARKETPLACE_CURRENCIES as CurrencyItem[]
  },
  {
    id: 'random-list-ucid',
    label: 'Random List (UCID)',
    data: IndexComposites.RANDOM_LIST_VIA_UCID as CurrencyItem[]
  },
  {
    id: 'random-list-media-press-kit',
    label: 'Random List (Media Press Kit)',
    data: IndexComposites.RANDOM_LIST_VIA_MEDIA_PRESS_KIT as CurrencyItem[]
  },
  {
    id: 'sec-securities-list',
    label: 'SEC Securities List',
    data: IndexComposites.SEC_SECURITIES_LIST as CurrencyItem[]
  },
  {
    id: 'stablecoins',
    label: 'Stablecoins',
    data: IndexComposites.STABLECOINS as CurrencyItem[]
  }
]

const filteredCurrencies = computed(() => {
  const index = availableIndices.find(idx => idx.id === selectedIndex.value)
  if (!index || !index.data) return []
  
  // Create a deep copy to ensure complete isolation between indices
  // This prevents any shared references or Vue reactivity issues
  const dataArray = Array.isArray(index.data) 
    ? JSON.parse(JSON.stringify(index.data)) 
    : []
  
  // Handle different currency item structures and normalize
  let normalizedData = dataArray.map((item: any) => {
    // Normalize tickerSymbol to symbol for StorageCurrencyItem
    if ('tickerSymbol' in item && !('symbol' in item)) {
      return { ...item, symbol: item.tickerSymbol }
    }
    // Normalize ticker to symbol for ExchangeCurrencyItem, NFTMarketplaceCurrencyItem, and StablecoinItem
    if ('ticker' in item && !('symbol' in item)) {
      return { ...item, symbol: item.ticker }
    }
    return item
  })
  
  // Apply search filter (only in list view)
  if (searchQuery.value && viewMode.value === 'list') {
    const query = searchQuery.value.toLowerCase().trim()
    normalizedData = normalizedData.filter((item: any) => {
      const symbol = (item.symbol || item.tickerSymbol || item.ticker || '').toLowerCase()
      const name = (item.name || '').toLowerCase()
      return symbol.includes(query) || name.includes(query)
    })
  }
  
  // Apply sorting if a column is selected
  if (sortColumn.value) {
    return normalizedData.sort((a: any, b: any) => {
      let aValue: any
      let bValue: any
      
      // Get values based on sort column
      switch (sortColumn.value) {
        case 'symbol':
          aValue = (a.symbol || a.tickerSymbol || a.ticker || '').toLowerCase()
          bValue = (b.symbol || b.tickerSymbol || b.ticker || '').toLowerCase()
          break
        case 'name':
          aValue = (a.name || '').toLowerCase()
          bValue = (b.name || '').toLowerCase()
          break
        case 'type':
          aValue = (a.type || '').toLowerCase()
          bValue = (b.type || '').toLowerCase()
          break
        case 'consensus':
          aValue = (a.consensusType || '').toLowerCase()
          bValue = (b.consensusType || '').toLowerCase()
          break
        case 'price':
          const aSymbol = (a.symbol || a.tickerSymbol || a.ticker || '').toLowerCase()
          const bSymbol = (b.symbol || b.tickerSymbol || b.ticker || '').toLowerCase()
          aValue = currencyPrices.value[aSymbol]?.price || 0
          bValue = currencyPrices.value[bSymbol]?.price || 0
          break
        default:
          return 0
      }
      
      // Compare values
      let comparison = 0
      if (aValue < bValue) comparison = -1
      if (aValue > bValue) comparison = 1
      
      // Apply sort direction
      return sortDirection.value === 'asc' ? comparison : -comparison
    })
  }
  
  return normalizedData
})

// Chart segments computed from filtered currencies
const chartSegments = computed(() => {
  const currencies = filteredCurrencies.value
  if (!currencies.length) return []
  
  // Each currency gets equal weight in the chart (since we don't have market cap data)
  const totalItems = currencies.length
  const percentagePerItem = 100 / totalItems
  
  let cumulativeOffset = 0
  
  return currencies.map((currency: any, index: number) => {
    const symbol = currency.symbol || currency.tickerSymbol || currency.ticker || '?'
    const percentage = percentagePerItem
    const segmentLength = (percentage / 100) * circumference
    const dashArray = `${segmentLength} ${circumference - segmentLength}`
    const dashOffset = -cumulativeOffset + (circumference / 4) // Start from top (12 o'clock)
    
    cumulativeOffset += segmentLength
    
    return {
      symbol,
      name: currency.name || symbol,
      percentage,
      color: chartColors[index % chartColors.length],
      dashArray,
      dashOffset
    }
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

const getCurrencyLogo = (currency: any): string => {
  const symbol = (currency.symbol || currency.tickerSymbol || currency.ticker || '').toLowerCase()
  
  // Use dynamic path construction like MarqueeTicker.vue
  // This automatically works for any currency that has an icon file matching its symbol
  if (symbol) {
    return `./assets/icons/crypto/${symbol}.svg`
  }
  
  // Fallback: generic placeholder
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iMTYiIGZpbGw9IiNFNUU3RUIiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMEMzLjU4IDAgMCAzLjU4IDAgOEMwIDEyLjQyIDMuNTggMTYgOCAxNkMxMi40MiAxNiAxNiAxMi40MiAxNiA4QzE2IDMuNTggMTIuNDIgMCA4IDBaIiBmaWxsPSIjOUI5Q0E1Ii8+Cjwvc3ZnPgo8L3N2Zz4K'
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  const currency = (event.target as any).__currency
  const symbol = currency ? (currency.symbol || currency.tickerSymbol || currency.ticker || '').toLowerCase() : ''
  
  // Try alternative CoinGecko URL format if first attempt failed
  if (symbol && !img.src.includes('data:image')) {
    // Try different CoinGecko URL patterns
    const alternativeUrls = [
      `https://assets.coingecko.com/coins/images/1/thumb/${symbol}.png`,
      `https://cryptoicons.org/api/icon/${symbol}/200`,
      `https://coin-images.coingecko.com/coins/images/1/large/${symbol}.png`
    ]
    
    // Try next alternative URL
    const currentAttempt = (img as any).__attempt || 0
    if (currentAttempt < alternativeUrls.length) {
      (img as any).__attempt = currentAttempt + 1
      img.src = alternativeUrls[currentAttempt]
      return
    }
  }
  
  // Final fallback: placeholder
  img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iMTYiIGZpbGw9IiNFNUU3RUIiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMEMzLjU4IDAgMCAzLjU4IDAgOEMwIDEyLjQyIDMuNTggMTYgOCAxNkMxMi40MiAxNiAxNiAxMi0yIDE2IDhDMTYgMy41OCAxMi40MiAwIDggMFoiIGZpbGw9IiM5QjlDQTUiLz4KPC9zdmc+Cjwvc3ZnPgo='
}

const sortBy = (column: string) => {
  // If clicking the same column, toggle direction
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    // New column, default to ascending
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

const openCurrencyModal = (currency: any) => {
  selectedCurrency.value = currency
  isModalOpen.value = true
}

const closeCurrencyModal = () => {
  isModalOpen.value = false
  selectedCurrency.value = null
}

// Fetch prices for currencies
const fetchPrices = async () => {
  const currencies = filteredCurrencies.value
  if (currencies.length === 0) return

  priceLoading.value = true
  
  try {
    const prices = await fetchCurrencyPrices(currencies, {
      timeout: 10000,
      vs_currency: 'usd',
      per_page: currencies.length
    })

    currencyPrices.value = { ...currencyPrices.value, ...prices }
  } catch (error) {
    console.error('[Indices] Failed to fetch prices:', error)
  } finally {
    priceLoading.value = false
  }
}

// Watch for changes in filtered currencies and fetch prices
watch([filteredCurrencies, selectedIndex], () => {
  if (viewMode.value === 'list' && filteredCurrencies.value.length > 0) {
    fetchPrices()
  }
}, { immediate: true })
</script>

<style scoped>
@reference "tailwindcss";

.indices-container {
  @apply w-full;
}

/* Sorting indicator transition */
.sort-indicator svg {
  transition: transform 0.2s ease-in-out;
}

.rotate-180 {
  transform: rotate(180deg);
}

/* Table Container with Scroll */
.table-container {
  overflow-x: auto;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
}

/* Sticky Table Header */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f9fafb;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
  .sticky-header {
    background-color: #111827;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.3);
  }
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

/* Chart View Styles */
.chart-view-container {
  @apply w-full py-4;
}

.chart-wrapper {
  @apply relative;
  width: 300px;
  height: 300px;
}

.donut-chart {
  @apply w-full h-full;
  transform: rotate(-90deg);
}

.segment-circle {
  transform-origin: center;
}

.chart-center-text {
  @apply absolute inset-0 flex flex-col items-center justify-center text-center;
}

.chart-legend {
  @apply flex-1 max-w-md;
}

.legend-grid {
  @apply grid gap-2;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  max-height: 280px;
  overflow-y: auto;
}

.legend-item {
  @apply flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all;
}

.legend-item:hover,
.legend-item-active {
  @apply bg-gray-100 dark:bg-gray-700;
}

.legend-color {
  @apply w-3 h-3 rounded-full flex-shrink-0;
}

.legend-symbol {
  @apply text-sm font-medium text-gray-900 dark:text-white flex-1 truncate;
}

.legend-percentage {
  @apply text-xs text-gray-500 dark:text-gray-400;
}

/* Responsive chart sizing */
@media (min-width: 640px) {
  .chart-wrapper {
    width: 350px;
    height: 350px;
  }
}

@media (min-width: 1024px) {
  .chart-wrapper {
    width: 400px;
    height: 400px;
  }
}
</style>


