<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Cryptocurrency Ticker -->
    <div class="pt-6 pb-4">
      <MarqueeTicker />
    </div>
    
    <!-- Header Section -->
    <div class="text-center mb-8">
      <!-- <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Cryptocurrency Calculator
      </h1> -->
      <p class="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Convert between cryptocurrencies and fiat currencies with real-time exchange rates
      </p>
    </div>
    
    <!-- Main Calculator Interface -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div class="flex flex-col lg:flex-row items-stretch justify-center gap-6">
        <!-- Left Calculator Section -->
        <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700 w-full lg:w-2/5 transform hover:scale-105 transition-all duration-300">
          <div class="mb-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">From</h2>
            <div class="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          
          <form @submit.prevent="convertCurrency" class="space-y-4">
            <!-- Currency Type Toggle -->
            <div class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
              <div class="flex items-center justify-between">
                <span class="font-semibold text-gray-900 dark:text-white text-sm">
                  {{ !fromIsFiat ? 'Cryptocurrency' : 'Fiat Currency' }}
                </span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="fromIsFiat" class="sr-only peer">
                  <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500"></div>
                  <span class="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300">Fiat</span>
                </label>
              </div>
            </div>

            <!-- Amount Input -->
            <div class="space-y-2">
              <label for="amount" class="block text-sm font-semibold text-gray-900 dark:text-white">Amount</label>
              <div class="relative">
                <input
                  id="amount"
                  type="number"
                  step="0.0000001"
                  min="0"
                  v-model="args.amount"
                  class="bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-base rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent block w-full p-3 transition-all duration-200 shadow-sm hover:shadow-md"
                  placeholder="Enter amount"
                  required
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <!-- Currency Selection -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label for="from-currency" class="block text-sm font-semibold text-gray-900 dark:text-white">Currency</label>
                <div class="flex items-center space-x-2">
                  <img
                    v-if="!fromIsFiat && args.from.symbol"
                    :src="`/assets/icons/crypto/${args.from.symbol.toLowerCase()}.svg`"
                    :alt="args.from.symbol"
                    class="w-6 h-6 rounded-full shadow-sm"
                  />
                  <span v-else-if="fromIsFiat" class="text-lg font-bold text-blue-600 dark:text-blue-400">{{ getCurrencySymbol(args.from.symbol) }}</span>
                </div>
              </div>
              
              <!-- Cryptocurrency Dropdown -->
              <select
                v-if="!fromIsFiat"
                v-model="args.from"
                class="bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent block w-full p-3 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <option v-for="coin in cryptoCurrencies" :key="coin.id" :value="coin">
                  {{ coin.name }} ({{ coin.symbol }})
                </option>
              </select>

              <!-- Fiat Currency Dropdown -->
              <select
                v-else
                v-model="args.from"
                class="bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent block w-full p-3 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <option v-for="fiat in fiatCurrencies" :key="fiat.symbol" :value="fiat">
                  {{ fiat.name }}
                </option>
              </select>
            </div>

            <!-- Convert Button -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-xl text-base px-4 py-3 text-center dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Converting...
              </span>
              <span v-else>Convert Currency</span>
            </button>
          </form>
        </div>

        <!-- Convert Icon -->
        <div class="flex-shrink-0 relative flex items-center justify-center lg:py-8">
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 inline-flex p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="w-6 h-6 text-white"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </div>
          <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 animate-pulse"></div>
        </div>

        <!-- Right Calculator Section -->
        <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700 w-full lg:w-2/5 transform hover:scale-105 transition-all duration-300">
          <div class="mb-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">To</h2>
            <div class="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
          
          <div class="space-y-4">
            <!-- Currency Type Toggle -->
            <div class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
              <div class="flex items-center justify-between">
                <span class="font-semibold text-gray-900 dark:text-white text-sm">
                  {{ !toIsCrypto ? 'Fiat Currency' : 'Cryptocurrency' }}
                </span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="toIsCrypto" class="sr-only peer">
                  <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                  <span class="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300">Crypto</span>
                </label>
              </div>
            </div>

            <!-- Result Amount -->
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-900 dark:text-white">Amount</label>
              <div class="relative">
                <input
                  type="text"
                  :value="solution.amount || 'Not yet converted'"
                  class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-600 dark:to-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-base rounded-xl block w-full p-3 font-mono"
                  readonly
                />
                <div v-if="solution.amount" class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <!-- Target Currency Selection -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="block text-sm font-semibold text-gray-900 dark:text-white">Currency</label>
                <div class="flex items-center space-x-2">
                  <img
                    v-if="toIsCrypto && args.to.symbol"
                    :src="`/assets/icons/crypto/${args.to.symbol.toLowerCase()}.svg`"
                    :alt="args.to.symbol"
                    class="w-6 h-6 rounded-full shadow-sm"
                  />
                  <span v-else-if="!toIsCrypto" class="text-lg font-bold text-purple-600 dark:text-purple-400">{{ getCurrencySymbol(args.to.symbol) }}</span>
                </div>
              </div>
              
              <!-- Cryptocurrency Dropdown -->
              <select
                v-if="toIsCrypto"
                v-model="args.to"
                class="bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent block w-full p-3 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <option v-for="coin in cryptoCurrencies" :key="coin.id" :value="coin">
                  {{ coin.name }} ({{ coin.symbol }})
                </option>
              </select>

              <!-- Fiat Currency Dropdown -->
              <select
                v-else
                v-model="args.to"
                class="bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent block w-full p-3 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <option v-for="fiat in fiatCurrencies" :key="fiat.symbol" :value="fiat">
                  {{ fiat.name }}
                </option>
              </select>
            </div>

            <!-- Conversion Rate Display -->
            <div v-if="solution.rate" class="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700">
              <div class="flex items-center mb-2">
                <svg class="w-4 h-4 text-green-600 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <p class="text-xs font-medium text-green-800 dark:text-green-300">Exchange Rate</p>
              </div>
              <p class="text-base font-bold text-green-900 dark:text-green-100">
                1 {{ args.from.symbol }} = {{ solution.rate }} {{ args.to.symbol }}
              </p>
            </div>

            <!-- Spacer to match left side height -->
            <div class="h-12"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import MarqueeTicker from '../../partials/marqueeTicker/MarqueeTicker.vue'

// Define component name
defineOptions({
  name: 'CryptocurrencyCalculator'
})

// Type definitions
interface CryptoCurrency {
  id: string
  symbol: string
  name: string
}

interface FiatCurrency {
  symbol: string
  name: string
}

type Currency = CryptoCurrency | FiatCurrency

// Import the same cryptocurrency list from MarqueeTicker
const COINBASE50: CryptoCurrency[] = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'stellar', symbol: 'XLM', name: 'Stellar' },
  { id: 'tezos', symbol: 'XTZ', name: 'Tezos' },
  { id: 'near', symbol: 'NEAR', name: 'Near' },
  { id: 'render-token', symbol: 'RENDER', name: 'Render' },
  { id: 'blockstack', symbol: 'STX', name: 'Stacks' },
  { id: 'zcash', symbol: 'ZEC', name: 'ZCash' },
  { id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu' },
  { id: 'mina-protocol', symbol: 'MINA', name: 'Mina Protocol' },
  { id: 'apecoin', symbol: 'APE', name: 'ApeCoin' },
  { id: 'immutable-x', symbol: 'IMX', name: 'Immutable X' },
  { id: 'oasis-network', symbol: 'ROSE', name: 'Oasis Network' },
  { id: 'lido-dao', symbol: 'LDO', name: 'Lido DAO' },
  { id: 'bonk', symbol: 'BONK', name: 'BONK' },
  { id: 'elrond-erd-2', symbol: 'EGLD', name: 'MultiversX' },
  { id: 'helium', symbol: 'HNT', name: 'Helium' },
  { id: 'jasmycoin', symbol: 'JASMY', name: 'JasmyCoin' },
  { id: 'blur', symbol: 'BLUR', name: 'Blur' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
  { id: 'bitcoin-cash', symbol: 'BCH', name: 'Bitcoin Cash' },
  { id: 'uniswap', symbol: 'UNI', name: 'Uniswap' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin' },
  { id: 'aave', symbol: 'AAVE', name: 'Aave' },
  { id: 'internet-computer', symbol: 'ICP', name: 'Internet Computer' },
  { id: 'ethereum-classic', symbol: 'ETC', name: 'Ethereum Classic' },
  { id: 'matic-network', symbol: 'MATIC', name: 'Polygon' },
  { id: 'fetch-ai', symbol: 'FET', name: 'Fetch.ai' },
  { id: 'algorand', symbol: 'ALGO', name: 'Algorand' },
  { id: 'cosmos', symbol: 'ATOM', name: 'Cosmos' },
  { id: 'injective-protocol', symbol: 'INJ', name: 'Injective' },
  { id: 'the-graph', symbol: 'GRT', name: 'The Graph' },
  { id: 'quant-network', symbol: 'QNT', name: 'Quant Network' },
  { id: 'maker', symbol: 'MKR', name: 'Maker' },
  { id: 'the-sandbox', symbol: 'SAND', name: 'Sand' },
  { id: 'curve-dao-token', symbol: 'CRV', name: 'Curve DAO Token' },
  { id: 'eos', symbol: 'EOS', name: 'EOS' },
  { id: 'axie-infinity', symbol: 'AXS', name: 'Axie Infinity' },
  { id: 'decentraland', symbol: 'MANA', name: 'Decentraland' },
  { id: 'chiliz', symbol: 'CHZ', name: 'Chiliz' },
  { id: 'havven', symbol: 'SNX', name: 'Synthetix' },
  { id: 'livepeer', symbol: 'LPT', name: 'Livepeer' },
  { id: 'kusama', symbol: 'KSM', name: 'Kusama' },
  { id: '1inch', symbol: '1INCH', name: '1inch' }
]

// Major fiat currencies
const FIAT_CURRENCIES: FiatCurrency[] = [
  { symbol: 'USD', name: 'US Dollar (USD)' },
  { symbol: 'EUR', name: 'Euro (EUR)' },
  { symbol: 'GBP', name: 'British Pound (GBP)' },
  { symbol: 'JPY', name: 'Japanese Yen (JPY)' },
  { symbol: 'AUD', name: 'Australian Dollar (AUD)' },
  { symbol: 'CAD', name: 'Canadian Dollar (CAD)' },
  { symbol: 'CHF', name: 'Swiss Franc (CHF)' },
  { symbol: 'CNY', name: 'Chinese Yuan (CNY)' },
  { symbol: 'SEK', name: 'Swedish Krona (SEK)' },
  { symbol: 'NZD', name: 'New Zealand Dollar (NZD)' },
  { symbol: 'MXN', name: 'Mexican Peso (MXN)' },
  { symbol: 'SGD', name: 'Singapore Dollar (SGD)' },
  { symbol: 'HKD', name: 'Hong Kong Dollar (HKD)' },
  { symbol: 'NOK', name: 'Norwegian Krone (NOK)' },
  { symbol: 'TRY', name: 'Turkish Lira (TRY)' },
  { symbol: 'RUB', name: 'Russian Ruble (RUB)' },
  { symbol: 'INR', name: 'Indian Rupee (INR)' },
  { symbol: 'BRL', name: 'Brazilian Real (BRL)' },
  { symbol: 'ZAR', name: 'South African Rand (ZAR)' },
  { symbol: 'KRW', name: 'South Korean Won (KRW)' }
]

// Currency symbol mapping
const CURRENCY_SYMBOLS = {
  USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$', CAD: 'C$',
  CHF: 'CHF', CNY: '¥', SEK: 'kr', NZD: 'NZ$', MXN: '$', SGD: 'S$',
  HKD: 'HK$', NOK: 'kr', TRY: '₺', RUB: '₽', INR: '₹', BRL: 'R$',
  ZAR: 'R', KRW: '₩'
}

// Reactive state
const fromIsFiat = ref(false)
const toIsCrypto = ref(false)
const isLoading = ref(false)
const cryptoCurrencies = ref(COINBASE50)
const fiatCurrencies = ref(FIAT_CURRENCIES)

const args = reactive({
  from: { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' } as Currency,
  to: { symbol: 'USD', name: 'US Dollar (USD)' } as Currency,
  amount: 1
})

const solution = reactive({
  amount: '',
  rate: ''
})

// Type guard functions
function isCryptoCurrency(currency: Currency): currency is CryptoCurrency {
  return 'id' in currency
}

function isFiatCurrency(currency: Currency): currency is FiatCurrency {
  return !('id' in currency)
}

// Methods
function getCurrencySymbol(code: string) {
  return CURRENCY_SYMBOLS[code as keyof typeof CURRENCY_SYMBOLS] || code
}

async function convertCurrency() {
  if (!args.amount || args.amount <= 0) {
    alert('Please enter a valid amount')
    return
  }

  isLoading.value = true
  
  try {
    let fromPrice: number, toPrice: number
    
    // Get price for 'from' currency
    if (fromIsFiat.value) {
      fromPrice = 1 // Fiat base price is 1
    } else {
      const fromCrypto = args.from as CryptoCurrency
      const fromData = await fetchCryptoPrice(fromCrypto.id)
      fromPrice = fromData.current_price
    }

    // Get price for 'to' currency
    if (toIsCrypto.value) {
      const toCrypto = args.to as CryptoCurrency
      const toData = await fetchCryptoPrice(toCrypto.id)
      toPrice = toData.current_price
    } else {
      toPrice = 1 // Fiat base price is 1
    }

    // Handle fiat-to-fiat conversion
    if (fromIsFiat.value && !toIsCrypto.value) {
      const rates = await fetchFiatRates()
      const fromRate = rates[args.from.symbol] || 1
      const toRate = rates[args.to.symbol] || 1
      const exchangeRate = toRate / fromRate
      
      solution.rate = formatNumber(exchangeRate, 6)
      solution.amount = formatNumber(args.amount * exchangeRate, 6)
    } else {
      // Crypto-to-fiat, fiat-to-crypto, or crypto-to-crypto conversion
      let exchangeRate: number
      
      if (fromIsFiat.value) {
        // Fiat to crypto: 1 USD = X crypto
        exchangeRate = 1 / toPrice
      } else if (toIsCrypto.value) {
        // Crypto to crypto: fromPrice / toPrice
        exchangeRate = fromPrice / toPrice
      } else {
        // Crypto to fiat: crypto price in USD
        exchangeRate = fromPrice
      }

      solution.rate = formatNumber(exchangeRate, 8)
      solution.amount = formatNumber(args.amount * exchangeRate, 8)
    }

  } catch (error) {
    console.error('Conversion error:', error)
    alert('Error fetching conversion rates. Please try again.')
  } finally {
    isLoading.value = false
  }
}

async function fetchCryptoPrice(coinId: string) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  )
  
  if (!response.ok) {
    throw new Error(`Failed to fetch price for ${coinId}`)
  }
  
  const data = await response.json()
  return {
    current_price: data.market_data.current_price.usd
  }
}

async function fetchFiatRates() {
  // Using a free exchange rate API for fiat conversions
  const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
  
  if (!response.ok) {
    throw new Error('Failed to fetch fiat exchange rates')
  }
  
  const data = await response.json()
  return data.rates
}

function formatNumber(num: number, decimals = 6) {
  return parseFloat(num.toString()).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  })
}

function resetToDefaults(toggleType: string) {
  if (toggleType === 'from') {
    args.from = fromIsFiat.value 
      ? { symbol: 'USD', name: 'US Dollar (USD)' } as FiatCurrency
      : { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' } as CryptoCurrency
  } else {
    args.to = toIsCrypto.value
      ? { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' } as CryptoCurrency
      : { symbol: 'USD', name: 'US Dollar (USD)' } as FiatCurrency
  }
  
  // Clear previous results
  solution.amount = ''
  solution.rate = ''
}

// Watchers
watch(fromIsFiat, () => {
  resetToDefaults('from')
})

watch(toIsCrypto, () => {
  resetToDefaults('to')
})

watch(() => args.from, () => {
  solution.amount = ''
  solution.rate = ''
})

watch(() => args.to, () => {
  solution.amount = ''
  solution.rate = ''
})

watch(() => args.amount, () => {
  solution.amount = ''
  solution.rate = ''
})
</script>

<style scoped>
/* Custom animations and effects */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.float-animation {
  animation: float 3s ease-in-out infinite;
}

/* Custom toggle switch styling */
.peer:checked ~ .peer-checked\:bg-blue-600 {
  background-color: #2563eb;
}
</style> 