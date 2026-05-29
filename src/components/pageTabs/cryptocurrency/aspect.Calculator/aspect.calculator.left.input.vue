<template>
  <div class="calc-card">
    <div class="calc-card-header calc-card-header--blue">
      <span class="calc-card-title">From</span>
    </div>

    <form class="calc-form" @submit.prevent="emit('submit')">
      <!-- Type toggle -->
      <div class="calc-toggle-row">
        <span class="calc-toggle-label">{{ fromIsFiat ? 'Fiat Currency' : 'Cryptocurrency' }}</span>
        <label class="calc-toggle">
          <input type="checkbox" v-model="fromIsFiat" class="calc-toggle-input" />
          <span class="calc-toggle-track" />
          <span class="calc-toggle-hint">Fiat</span>
        </label>
      </div>

      <!-- Currency -->
      <div class="calc-field">
        <div class="calc-label-row">
          <Label class="calc-label">Currency</Label>
          <img
            v-if="!fromIsFiat && from.symbol"
            :src="`./assets/icons/crypto/${from.symbol.toLowerCase()}.svg`"
            :alt="from.symbol"
            class="calc-coin-icon"
          />
          <span v-else-if="fromIsFiat" class="calc-fiat-symbol">{{ getCurrencySymbol(from.symbol) }}</span>
        </div>
        <CurrencyDropdownWithSearch
          v-if="!fromIsFiat"
          v-model="fromCryptoTicker"
          class="calc-currency-dropdown"
        />
        <select v-else v-model="from" class="calc-select">
          <option v-for="fiat in fiatCurrencies" :key="fiat.symbol" :value="fiat">
            {{ fiat.name }}
          </option>
        </select>
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
            v-model="amount"
            class="calc-input"
            placeholder="Enter amount"
            required
          />
        </div>
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
</template>

<script setup lang="ts">
import { Label } from 'radix-vue'
import CurrencyDropdownWithSearch from '@/components/dropdowns/dropdown.currency.from.publicIcons.fullNames.WithSearch.vue'

defineOptions({ name: 'AspectCalculatorLeftInput' })

interface FiatCurrency {
  symbol: string
  name: string
}

interface CryptoCurrency {
  id: string
  symbol: string
  name: string
}

type Currency = CryptoCurrency | FiatCurrency

defineProps<{
  isLoading: boolean
  fiatCurrencies: FiatCurrency[]
  getCurrencySymbol: (code: string) => string
}>()

const emit = defineEmits<{
  submit: []
}>()

const fromIsFiat = defineModel<boolean>('fromIsFiat', { required: true })
const fromCryptoTicker = defineModel<string>('fromCryptoTicker', { required: true })
const from = defineModel<Currency>('from', { required: true })
const amount = defineModel<number>('amount', { required: true })
</script>

<style scoped lang="scss">
.calc-card {
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 420px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
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

.calc-card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.calc-form {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  gap: 10px;
  padding: 14px 20px 16px;
  overflow: hidden;
}

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
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
}

.calc-toggle-input:checked + .calc-toggle-track {
  background: #2563eb;

  &::after {
    transform: translateX(16px);
  }
}

.calc-toggle-hint {
  font-size: 0.7rem;
  color: #6b7280;
}

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
}

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

.calc-spinner-track {
  opacity: 0.25;
}

.calc-spinner-arc {
  opacity: 0.85;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
