<template>
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

      <!-- Currency -->
      <div class="calc-field">
        <div class="calc-label-row">
          <Label class="calc-label">Currency</Label>
          <img
            v-if="toIsCrypto && to.symbol"
            :src="`./assets/icons/crypto/${to.symbol.toLowerCase()}.svg`"
            :alt="to.symbol"
            class="calc-coin-icon"
          />
          <span v-else-if="!toIsCrypto" class="calc-fiat-symbol">{{ getCurrencySymbol(to.symbol) }}</span>
        </div>
        <CurrencyDropdown
          v-if="toIsCrypto"
          v-model="toCryptoTicker"
          class="calc-currency-dropdown"
        />
        <select v-else v-model="to" class="calc-select">
          <option v-for="fiat in fiatCurrencies" :key="fiat.symbol" :value="fiat">
            {{ fiat.name }}
          </option>
        </select>
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

      <!-- ── Exchange rate (centered in remaining space) ─────────── -->
      <div class="calc-rate-area">
        <div v-if="solution.rate" class="calc-rate">
          <i class="bi bi-check-circle-fill calc-rate-icon" />
          <div>
            <p class="calc-rate-heading">Exchange Rate</p>
            <p class="calc-rate-value">1 {{ from.symbol }} = {{ solution.rate }} {{ to.symbol }}</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        class="calc-btn calc-btn--export"
        :disabled="!solution.rate || isExporting"
        @click="handleExport"
      >
        {{ isExporting ? 'Exporting…' : 'Export' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Label } from 'radix-vue'
import CurrencyDropdown from '@/components/dropdowns/dropdown.currency.from.publicIcons.fullNames.vue'
import { exportCalculatorSnapshotAsPNG } from '@/lib/cores/exportStandard/filenameStructureAndContent.Calculator.snapshot'

defineOptions({ name: 'AspectCalculatorRightResult' })

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

const props = defineProps<{
  from: Currency
  amount: number
  solution: { amount: string; rate: string }
  fiatCurrencies: FiatCurrency[]
  getCurrencySymbol: (code: string) => string
}>()

const toIsCrypto = defineModel<boolean>('toIsCrypto', { required: true })
const toCryptoTicker = defineModel<string>('toCryptoTicker', { required: true })
const to = defineModel<Currency>('to', { required: true })

const isExporting = ref(false)

async function handleExport() {
  if (!props.solution.rate) {
    alert('Please convert before exporting')
    return
  }

  isExporting.value = true

  try {
    await exportCalculatorSnapshotAsPNG({
      from: props.from,
      to: props.to,
      amount: props.amount,
      solution: props.solution,
    })
  } catch (error) {
    console.error('Calculator export error:', error)
    alert('Error exporting calculator snapshot. Please try again.')
  } finally {
    isExporting.value = false
  }
}
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

.calc-card-header--purple {
  border-top: 3px solid #7c3aed;
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

.calc-toggle-input:checked + .calc-toggle-track--purple {
  background: #7c3aed;
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

.calc-rate-area {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
}

.calc-rate {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 14px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 10px;
  flex-shrink: 0;
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

.calc-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 9px 16px;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.15s, border-color 0.15s, box-shadow 0.15s;
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

.calc-btn--export {
  color: #374151;
  background: #fff;
  border: 1.5px solid #e5e7eb;

  &:hover:not(:disabled) {
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
  }
}

@keyframes dot-pulse {
  0%,
  100% {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }

  50% {
    opacity: 0.4;
    transform: translateY(-50%) scale(0.7);
  }
}
</style>
