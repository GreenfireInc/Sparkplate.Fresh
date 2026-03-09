<template>
  <div class="calc-page">
    <!-- Ticker -->
    <div class="calc-ticker">
      <MarqueeTicker />
    </div>

    <!-- Subtitle -->
    <p class="calc-subtitle">
      Convert between cryptocurrencies and fiat currencies with real-time exchange rates
    </p>

    <!-- Cards row -->
    <div class="calc-row">

      <!-- ── From card ─────────────────────────────────────────── -->
      <div class="calc-card">
        <div class="calc-card-header calc-card-header--blue">
          <span class="calc-card-title">From</span>
        </div>

        <form class="calc-form" @submit.prevent="convertCurrency">
          <!-- Type toggle -->
          <div class="calc-toggle-row">
            <span class="calc-toggle-label">{{ fromIsFiat ? 'Fiat Currency' : 'Cryptocurrency' }}</span>
            <label class="calc-toggle">
              <input type="checkbox" v-model="fromIsFiat" class="calc-toggle-input" />
              <span class="calc-toggle-track" />
              <span class="calc-toggle-hint">Fiat</span>
            </label>
          </div>

          <!-- Amount -->
          <div class="calc-field">
            <Label for="calc-amount" class="calc-label">Amount</Label>
            <div class="calc-input-wrap">
              <input
                id="calc-amount"
                type="number"
                step="0.0000001"
                min="0"
                v-model="args.amount"
                class="calc-input"
                placeholder="Enter amount"
                required
              />
            </div>
          </div>

          <!-- Currency -->
          <div class="calc-field">
            <div class="calc-label-row">
              <Label class="calc-label">Currency</Label>
              <img
                v-if="!fromIsFiat && args.from.symbol"
                :src="`./assets/icons/crypto/${args.from.symbol.toLowerCase()}.svg`"
                :alt="args.from.symbol"
                class="calc-coin-icon"
              />
              <span v-else-if="fromIsFiat" class="calc-fiat-symbol">{{ getCurrencySymbol(args.from.symbol) }}</span>
            </div>
            <select v-if="!fromIsFiat" v-model="args.from" class="calc-select">
              <option v-for="coin in cryptoCurrencies" :key="coin.id" :value="coin">
                {{ coin.name }} ({{ coin.symbol }})
              </option>
            </select>
            <select v-else v-model="args.from" class="calc-select">
              <option v-for="fiat in fiatCurrencies" :key="fiat.symbol" :value="fiat">
                {{ fiat.name }}
              </option>
            </select>
          </div>

          <!-- Convert button -->
          <button type="submit" class="calc-btn" :disabled="isLoading">
            <svg v-if="isLoading" class="calc-spinner" viewBox="0 0 24 24" fill="none">
              <circle class="calc-spinner-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
              <path class="calc-spinner-arc" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {{ isLoading ? 'Converting…' : 'Convert' }}
          </button>
        </form>
      </div>

      <!-- ── Swap icon ─────────────────────────────────────────── -->
      <div class="calc-swap">
        <div class="calc-swap-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
        </div>
      </div>

      <!-- ── To card ───────────────────────────────────────────── -->
      <div class="calc-card">
        <div class="calc-card-header calc-card-header--purple">
          <span class="calc-card-title">To</span>
        </div>

        <div class="calc-form">
          <!-- Type toggle -->
          <div class="calc-toggle-row">
            <span class="calc-toggle-label">{{ toIsCrypto ? 'Cryptocurrency' : 'Fiat Currency' }}</span>
            <label class="calc-toggle">
              <input type="checkbox" v-model="toIsCrypto" class="calc-toggle-input" />
              <span class="calc-toggle-track calc-toggle-track--purple" />
              <span class="calc-toggle-hint">Crypto</span>
            </label>
          </div>

          <!-- Result amount -->
          <div class="calc-field">
            <Label class="calc-label">Amount</Label>
            <div class="calc-input-wrap">
              <input
                type="text"
                :value="solution.amount || '—'"
                class="calc-input calc-input--result"
                readonly
              />
              <span v-if="solution.amount" class="calc-result-dot" />
            </div>
          </div>

          <!-- Currency -->
          <div class="calc-field">
            <div class="calc-label-row">
              <Label class="calc-label">Currency</Label>
              <img
                v-if="toIsCrypto && args.to.symbol"
                :src="`./assets/icons/crypto/${args.to.symbol.toLowerCase()}.svg`"
                :alt="args.to.symbol"
                class="calc-coin-icon"
              />
              <span v-else-if="!toIsCrypto" class="calc-fiat-symbol">{{ getCurrencySymbol(args.to.symbol) }}</span>
            </div>
            <select v-if="toIsCrypto" v-model="args.to" class="calc-select">
              <option v-for="coin in cryptoCurrencies" :key="coin.id" :value="coin">
                {{ coin.name }} ({{ coin.symbol }})
              </option>
            </select>
            <select v-else v-model="args.to" class="calc-select">
              <option v-for="fiat in fiatCurrencies" :key="fiat.symbol" :value="fiat">
                {{ fiat.name }}
              </option>
            </select>
          </div>

          <!-- Exchange rate -->
          <div v-if="solution.rate" class="calc-rate">
            <i class="bi bi-check-circle-fill calc-rate-icon" />
            <div>
              <p class="calc-rate-heading">Exchange Rate</p>
              <p class="calc-rate-value">1 {{ args.from.symbol }} = {{ solution.rate }} {{ args.to.symbol }}</p>
            </div>
          </div>
          <div v-else class="calc-rate-placeholder" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { Label } from 'radix-vue'
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

<style scoped lang="scss">
/* ── Page layout ──────────────────────────────────────────── */
.calc-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 0 0 8px;
}

.calc-ticker {
  flex-shrink: 0;
  padding: 12px 0 4px;
}

.calc-subtitle {
  flex-shrink: 0;
  text-align: center;
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0 0 10px;
}

/* ── Cards row ────────────────────────────────────────────── */
.calc-row {
  display: flex;
  flex: 1;
  min-height: 0;
  align-items: stretch;
  justify-content: center;
  gap: 16px;
  padding: 0 20px;
}

/* ── Single card ──────────────────────────────────────────── */
.calc-card {
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 420px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,.08);
  overflow: hidden;
}

.calc-card-header {
  flex-shrink: 0;
  padding: 12px 20px 8px;
  border-bottom: 1px solid #f3f4f6;
}

.calc-card-header--blue {
  border-top: 3px solid #6366f1;
}

.calc-card-header--purple {
  border-top: 3px solid #a855f7;
}

.calc-card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

/* ── Form body ────────────────────────────────────────────── */
.calc-form {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  gap: 10px;
  padding: 14px 20px 16px;
  overflow: hidden;
}

/* ── Toggle row ───────────────────────────────────────────── */
.calc-toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 8px 12px;
  flex-shrink: 0;
}

.calc-toggle-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: #374151;
}

.calc-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.calc-toggle-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.calc-toggle-track {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
  background: #d1d5db;
  border-radius: 10px;
  transition: background 0.2s;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.2s;
    box-shadow: 0 1px 3px rgba(0,0,0,.2);
  }
}

.calc-toggle-input:checked + .calc-toggle-track {
  background: #6366f1;
  &::after { transform: translateX(16px); }
}

.calc-toggle-input:checked + .calc-toggle-track--purple {
  background: #a855f7;
}

.calc-toggle-hint {
  font-size: 0.7rem;
  color: #6b7280;
}

/* ── Field ────────────────────────────────────────────────── */
.calc-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;
}

.calc-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.calc-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.calc-coin-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.calc-fiat-symbol {
  font-size: 1rem;
  font-weight: 700;
  color: #6366f1;
}

/* ── Input ────────────────────────────────────────────────── */
.calc-input-wrap {
  position: relative;
}

.calc-input {
  width: 100%;
  padding: 8px 12px;
  font-size: 0.875rem;
  background: #fff;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  color: #111827;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99,102,241,.12);
  }

  &--result {
    background: #f9fafb;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    cursor: default;
    color: #1f2937;
  }
}

.calc-result-dot {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  animation: dot-pulse 1.5s ease-in-out infinite;
}

/* ── Select ───────────────────────────────────────────────── */
.calc-select {
  width: 100%;
  padding: 8px 12px;
  font-size: 0.8rem;
  background: #fff;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  color: #111827;
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s;
  box-sizing: border-box;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99,102,241,.12);
  }
}

/* ── Convert button ───────────────────────────────────────── */
.calc-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 9px 16px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.15s;
  margin-top: auto;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
}

.calc-spinner {
  width: 16px;
  height: 16px;
  animation: spin 0.8s linear infinite;
}

.calc-spinner-track { opacity: 0.25; }
.calc-spinner-arc   { opacity: 0.85; }

/* ── Exchange rate box ────────────────────────────────────── */
.calc-rate {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 14px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 10px;
  flex-shrink: 0;
  margin-top: auto;
}

.calc-rate-icon {
  color: #16a34a;
  font-size: 0.875rem;
  margin-top: 2px;
}

.calc-rate-heading {
  font-size: 0.68rem;
  font-weight: 600;
  color: #166534;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 2px;
}

.calc-rate-value {
  font-size: 0.875rem;
  font-weight: 700;
  color: #14532d;
  margin: 0;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

.calc-rate-placeholder {
  flex-shrink: 0;
  margin-top: auto;
  height: 52px;
}

/* ── Swap icon ────────────────────────────────────────────── */
.calc-swap {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
}

.calc-swap-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(99,102,241,.35);

  svg {
    width: 18px;
    height: 18px;
    color: #fff;
  }
}

/* ── Keyframes ────────────────────────────────────────────── */
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes dot-pulse {
  0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
  50%       { opacity: 0.4; transform: translateY(-50%) scale(0.7); }
}
</style> 