<template>
  <div class="calc-page">
    <!-- Ticker -->
    <div class="calc-ticker">
      <MarqueeTicker />
    </div>

    <!-- Subtitle -->
    <Separator class="calc-separator" />

    <!-- Cards row -->
    <div class="calc-row">

      <!-- ── From card ─────────────────────────────────────────── -->
      <AspectCalculatorLeftInput
        v-model:from-is-fiat="fromIsFiat"
        v-model:from-crypto-ticker="fromCryptoTicker"
        v-model:from="args.from"
        v-model:amount="args.amount"
        :is-loading="isLoading"
        :fiat-currencies="fiatCurrencies"
        :get-currency-symbol="getCurrencySymbol"
        @submit="convertCurrency"
      />

      <!-- ── Swap icon ─────────────────────────────────────────── -->
      <div class="calc-swap">
        <div class="calc-swap-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
        </div>
      </div>

      <!-- ── To card ───────────────────────────────────────────── -->
      <AspectCalculatorRightResult
        v-model:to-is-crypto="toIsCrypto"
        v-model:to-crypto-ticker="toCryptoTicker"
        v-model:to-fiat-iso="toFiatIso"
        v-model:to="args.to"
        :from="args.from"
        :amount="args.amount"
        :solution="solution"
        :from-change24h="solution.fromChange24h"
        :get-currency-symbol="getCurrencySymbol"
      />

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { Separator } from 'radix-vue'
import MarqueeTicker from '../../partials/marqueeTicker/MarqueeTicker.vue'
import AspectCalculatorLeftInput from './aspect.Calculator/aspect.calculator.left.input.vue'
import AspectCalculatorRightResult from './aspect.Calculator/aspect.calculator.right.result.vue'
import { cryptoCurrencyFromPublicIconTicker } from '@/lib/cores/bridge/bridge.shared.publicIcons.for.currencies'
import {
  CALCULATOR_FIAT_OPTIONS,
  fiatByIso,
  getFiatCurrencySymbol,
  toCalculatorFiatOption,
  unitedStates,
} from '@/lib/cores/fiatStandard'

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

// Reactive state
const fromIsFiat = ref(false)
const toIsCrypto = ref(false)
const isLoading = ref(false)
const fiatCurrencies = ref([...CALCULATOR_FIAT_OPTIONS])
const fromCryptoTicker = ref('BTC')
const toCryptoTicker = ref('BTC')
const toFiatIso = ref('USD')

const args = reactive({
  from: { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' } as Currency,
  to: toCalculatorFiatOption(unitedStates) as Currency,
  amount: 1
})

const solution = reactive({
  amount: '',
  rate: '',
  fromChange24h: null as number | null,
})

function clearSolution() {
  solution.amount = ''
  solution.rate = ''
  solution.fromChange24h = null
}

// Type guard functions
function isCryptoCurrency(currency: Currency): currency is CryptoCurrency {
  return 'id' in currency
}

function isFiatCurrency(currency: Currency): currency is FiatCurrency {
  return !('id' in currency)
}

// Methods
function getCurrencySymbol(code: string) {
  return getFiatCurrencySymbol(code)
}

function cryptoCurrencyFromTicker(ticker: string): CryptoCurrency {
  return cryptoCurrencyFromPublicIconTicker(ticker)
}

async function convertCurrency() {
  if (!args.amount || args.amount <= 0) {
    alert('Please enter a valid amount')
    return
  }

  isLoading.value = true
  
  try {
    let fromPrice: number, toPrice: number

    let fiatRates: Record<string, number> | null = null
    const getFiatRate = async (iso: string): Promise<number> => {
      if (!fiatRates) {
        fiatRates = await fetchFiatRates()
      }
      return fiatRates[iso.toUpperCase()] ?? 1
    }
    
    // Get price for 'from' currency
    if (fromIsFiat.value) {
      fromPrice = 1 // Fiat base price is 1 (used only in fiat-to-crypto path)
      solution.fromChange24h = null
    } else {
      const fromCrypto = args.from as CryptoCurrency
      const fromData = await fetchCryptoPrice(fromCrypto.id, true)
      fromPrice = fromData.current_price
      solution.fromChange24h = fromData.price_change_percentage_24h ?? null
    }

    // Get price for 'to' currency
    if (toIsCrypto.value) {
      const toCrypto = args.to as CryptoCurrency
      const toData = await fetchCryptoPrice(toCrypto.id)
      toPrice = toData.current_price
    } else {
      toPrice = 1 // Fiat base price is 1 (used only in fiat-to-crypto path)
    }

    // Handle fiat-to-fiat conversion
    if (fromIsFiat.value && !toIsCrypto.value) {
      const fromRate = await getFiatRate(args.from.symbol)
      const toRate = await getFiatRate(args.to.symbol)
      const exchangeRate = toRate / fromRate
      
      solution.rate = formatNumber(exchangeRate, 6)
      solution.amount = formatNumber(args.amount * exchangeRate, 6)
    } else {
      // Crypto-to-fiat, fiat-to-crypto, or crypto-to-crypto conversion
      let exchangeRate: number
      
      if (fromIsFiat.value) {
        // Fiat to crypto: convert source fiat → USD → crypto
        const fromRate = await getFiatRate(args.from.symbol)
        exchangeRate = (1 / fromRate) / toPrice
      } else if (toIsCrypto.value) {
        // Crypto to crypto: fromPrice / toPrice (both USD-denominated)
        exchangeRate = fromPrice / toPrice
      } else {
        // Crypto to fiat: convert USD-denominated crypto price → target fiat
        const toRate = await getFiatRate(args.to.symbol)
        exchangeRate = fromPrice * toRate
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

async function fetchCryptoPrice(
  coinId: string,
  include24hChange = false
): Promise<{ current_price: number; price_change_percentage_24h?: number }> {
  const params = new URLSearchParams({
    ids: coinId,
    vs_currencies: 'usd',
  })
  if (include24hChange) {
    params.set('include_24hr_change', 'true')
  }

  const url = `https://api.coingecko.com/api/v3/simple/price?${params.toString()}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`CoinGecko API returned ${response.status} for "${coinId}"`)
  }

  const data = await response.json()
  const coin = data[coinId] as { usd?: number; usd_24h_change?: number } | undefined
  const price = coin?.usd

  if (price == null) {
    throw new Error(`No USD price data returned for coin "${coinId}"`)
  }

  return {
    current_price: price,
    price_change_percentage_24h: coin?.usd_24h_change,
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
    if (fromIsFiat.value) {
      args.from = toCalculatorFiatOption(unitedStates)
    } else {
      fromCryptoTicker.value = 'BTC'
      args.from = cryptoCurrencyFromTicker('BTC')
    }
  } else {
    if (toIsCrypto.value) {
      toCryptoTicker.value = 'BTC'
      args.to = cryptoCurrencyFromTicker('BTC')
    } else {
      toFiatIso.value = 'USD'
      args.to = toCalculatorFiatOption(unitedStates)
    }
  }
  
  // Clear previous results
  clearSolution()
}

// Watchers
watch(fromIsFiat, () => {
  resetToDefaults('from')
})

watch(toIsCrypto, () => {
  resetToDefaults('to')
})

watch(fromCryptoTicker, (ticker) => {
  if (!fromIsFiat.value && ticker) {
    args.from = cryptoCurrencyFromTicker(ticker)
  }
})

watch(toCryptoTicker, (ticker) => {
  if (toIsCrypto.value && ticker) {
    args.to = cryptoCurrencyFromTicker(ticker)
  }
})

watch(toFiatIso, (iso) => {
  if (!toIsCrypto.value && iso) {
    const fiat = fiatByIso[iso.toUpperCase()]
    if (fiat) {
      args.to = toCalculatorFiatOption(fiat)
    }
  }
})

watch(() => args.from, () => {
  clearSolution()
})

watch(() => args.to, () => {
  clearSolution()
})

watch(() => args.amount, () => {
  clearSolution()
})
</script>

<style scoped lang="scss">
/* ── Page layout ──────────────────────────────────────────── */
.calc-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  padding: 0;
}

.calc-separator {
  display: block;
  flex-shrink: 0;
  height: 1px;
  margin: 0 16px 8px;
  background: #e5e7eb;
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
  border-top: 3px solid #2563eb;
}

.calc-card-header--purple {
  border-top: 3px solid #7c3aed;
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
  background: #2563eb;
  &::after { transform: translateX(16px); }
}

.calc-toggle-input:checked + .calc-toggle-track--purple {
  background: #7c3aed;
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
  color: #2563eb;
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
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
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

/* ── Currency dropdown (public icons) ─────────────────────── */
.calc-currency-dropdown {
  width: 100%;

  :deep(.custom-select-wrapper),
  :deep(.custom-select) {
    width: 100%;
    box-sizing: border-box;
  }

  :deep(.custom-select) {
    padding: 8px 12px;
    font-size: 0.8rem;
    background: #fff;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    color: #111827;
    transition: border-color 0.15s;
  }

  :deep(.custom-select.open),
  :deep(.custom-select:focus-within) {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
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
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
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
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
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
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);

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