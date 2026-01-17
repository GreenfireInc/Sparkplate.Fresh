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
              Logo
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
import * as IndexComposites from '@/lib/cores/currencyCore/indexComposites'

// Define component name
defineOptions({
  name: 'CryptocurrencyIndices'
})

type CurrencyItem = 
  | IndexComposites.ProofOfWorkItem 
  | IndexComposites.ProofOfStakeItem 
  | IndexComposites.NYExchangeOfferingsCoinbaseItem 
  | IndexComposites.NYExchangeOfferingsGeminiItem 
  | IndexComposites.NYExchangeOfferingsBitFlyerItem
  | IndexComposites.NYExchangeOfferingsBitStampItem
  | IndexComposites.NYExchangeOfferingsPayPalVenmoItem
  | IndexComposites.NYExchangeOfferingsRobinhoodItem
  | IndexComposites.StorageCurrencyItem
  | IndexComposites.OracleClassItem
  | IndexComposites.CoinbaseIndexItem
  | IndexComposites.CurrencyCoreItem
  | IndexComposites.ExchangeCurrencyItem
  | IndexComposites.GreeneryV1Item
  | IndexComposites.Greenery36Set0Item
  | IndexComposites.NFTMarketplaceCurrencyItem
  | IndexComposites.RandomListViaUCIDItem
  | IndexComposites.RandomListViaMediaPressKitItem
  | IndexComposites.SecSecurityItem
  | IndexComposites.StablecoinItem

interface IndexOption {
  id: string
  label: string
  data: CurrencyItem[]
}

const selectedIndex = ref<string>('proof-of-work')

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
  
  // Ensure we're working with the correct array - create a fresh copy to avoid mutations
  const dataArray = Array.isArray(index.data) ? [...index.data] : []
  
  // Handle different currency item structures
  return dataArray.map(item => {
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
  
  // Comprehensive mapping of all available local crypto icons
  const localIconMap: Record<string, string> = {
    // Major cryptocurrencies
    'btc': '/assets/icons/crypto/btc.svg',
    'eth': '/assets/icons/crypto/eth.svg',
    'bch': '/assets/icons/crypto/bch.svg',
    'bnb': '/assets/icons/crypto/bnb.svg',
    'ltc': '/assets/icons/crypto/ltc.svg',
    'sol': '/assets/icons/crypto/sol.svg',
    'xlm': '/assets/icons/crypto/xlm.svg',
    'xrp': '/assets/icons/crypto/xrp.svg',
    'xtz': '/assets/icons/crypto/xtz.svg',
    'doge': '/assets/icons/crypto/doge.svg',
    'etc': '/assets/icons/crypto/etc.svg',
    'dot': '/assets/icons/crypto/dot.svg',
    'atom': '/assets/icons/crypto/atom.svg',
    'algo': '/assets/icons/crypto/algo.svg',
    'ar': '/assets/icons/crypto/ar.svg',
    'stx': '/assets/icons/crypto/stx.svg',
    'trx': '/assets/icons/crypto/trx.svg',
    'waves': '/assets/icons/crypto/waves.svg',
    'luna': '/assets/icons/crypto/luna.svg',
    'lunc': '/assets/icons/crypto/lunc.svg',
    'ada': '/assets/icons/crypto/ada.svg',
    'avax': '/assets/icons/crypto/avax.svg',
    'egld': '/assets/icons/crypto/egld.svg',
    'eos': '/assets/icons/crypto/eos.svg',
    'near': '/assets/icons/crypto/near.svg',
    'neo': '/assets/icons/crypto/neo.svg',
    'mina': '/assets/icons/crypto/mina.svg',
    'zec': '/assets/icons/crypto/zec.svg',
    'zil': '/assets/icons/crypto/zil.svg',
    'rvn': '/assets/icons/crypto/rvn.svg',
    'ksm': '/assets/icons/crypto/ksm.svg',
    'rose': '/assets/icons/crypto/rose.svg',
    'icp': '/assets/icons/crypto/icp.svg',
    'hnt': '/assets/icons/crypto/hnt.svg',
    'qnt': '/assets/icons/crypto/qnt.svg',
    'fet': '/assets/icons/crypto/fet.svg',
    'jasmy': '/assets/icons/crypto/jasmy.svg',
    'btt': '/assets/icons/crypto/btt.svg',
    'chz': '/assets/icons/crypto/chz.svg',
    // DeFi tokens
    'aave': '/assets/icons/crypto/aave.svg',
    'uni': '/assets/icons/crypto/uni.svg',
    'link': '/assets/icons/crypto/link.svg',
    'crv': '/assets/icons/crypto/crv.svg',
    'mkr': '/assets/icons/crypto/mkr.svg',
    'snx': '/assets/icons/crypto/snx.svg',
    'sushi': '/assets/icons/crypto/sushi.svg',
    'comp': '/assets/icons/crypto/comp.svg',
    'bat': '/assets/icons/crypto/bat.svg',
    'grt': '/assets/icons/crypto/grt.svg',
    'ldo': '/assets/icons/crypto/ldo.svg',
    'lpt': '/assets/icons/crypto/lpt.svg',
    'inj': '/assets/icons/crypto/inj.svg',
    'imx': '/assets/icons/crypto/imx.svg',
    'api3': '/assets/icons/crypto/api3.svg',
    '1inch': '/assets/icons/crypto/1inch.svg',
    // Stablecoins
    'usdc': '/assets/icons/crypto/usdc.svg',
    'usdt': '/assets/icons/crypto/usdt.svg',
    'dai': '/assets/icons/crypto/dai.svg',
    'tusd': '/assets/icons/crypto/tusd.svg',
    'gusd': '/assets/icons/crypto/gusd.svg',
    'euroc': '/assets/icons/crypto/euroc.svg',
    // NFTs & Gaming
    'ape': '/assets/icons/crypto/ape.svg',
    'axs': '/assets/icons/crypto/axs.svg',
    'mana': '/assets/icons/crypto/mana.svg',
    'sand': '/assets/icons/crypto/sand.svg',
    'blur': '/assets/icons/crypto/blur.svg',
    // Layer 2 & Other
    'matic': '/assets/icons/crypto/matic.svg',
    'render': '/assets/icons/crypto/render.svg',
    'shib': '/assets/icons/crypto/shib.svg',
    'bonk': '/assets/icons/crypto/bonk.svg',
    'acu': '/assets/icons/crypto/acu.svg',
    'usd': '/assets/icons/crypto/usd.svg',
    'eur': '/assets/icons/crypto/eur.svg',
  }
  
  // Check local icons first
  if (localIconMap[symbol]) {
    return localIconMap[symbol]
  }
  
  // Fallback to CoinGecko CDN using symbol (more reliable than UCID)
  // CoinGecko uses lowercase symbols in their image URLs
  if (symbol) {
    return `https://assets.coingecko.com/coins/images/1/thumb/${symbol}.png`
  }
  
  // Ultimate fallback: generic placeholder
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
  img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iMTYiIGZpbGw9IiNFNUU3RUIiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMEMzLjU4IDAgMCAzLjU4IDAgOEMwIDEyLjQyIDMuNTggMTYgOCAxNkMxMi40MiAxNiAxNiAxMi40MiAxNiA4QzE2IDMuNTggMTIuNDIgMCA4IDBaIiBmaWxsPSIjOUI5Q0E1Ii8+Cjwvc3ZnPgo8L3N2Zz4K'
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


