<!--
  Dashboard Settings — Toggle visibility and network options for dashboard currencies.
  Reference: 00.references/from.Greenery/DashboardSettings.vue
  Currencies: src/lib/cores/currencyCore/currencies
-->

<template>
  <div class="dashboard-settings">
    <div class="dashboard-header">
      <h2 class="dashboard-title">Dashboard Settings</h2>
      <p class="dashboard-desc">
        Choose which currencies appear on your dashboard. At least one must remain active.
      </p>
      <div class="dashboard-stats">
        <span class="dashboard-stat">Active: {{ activeCount }} / {{ currenciesOrdered.length }}</span>
      </div>
    </div>

    <div class="dashboard-table-wrapper">
      <table class="dashboard-table">
        <thead>
          <tr>
            <th class="dashboard-th dashboard-th--index">#</th>
            <th class="dashboard-th dashboard-th--coin">Coin</th>
            <th class="dashboard-th dashboard-th--name">Name</th>
            <th class="dashboard-th dashboard-th--ticker">Ticker</th>
            <th class="dashboard-th dashboard-th--visibility">Visible</th>
            <th class="dashboard-th dashboard-th--network">Network</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(currency, index) in currenciesOrdered"
            :key="currency.basicInfo.symbolTicker"
            class="dashboard-row"
          >
            <td class="dashboard-td dashboard-td--index">{{ index + 1 }}</td>
            <td class="dashboard-td dashboard-td--coin">
              <img
                v-if="getIcon(currency.basicInfo.symbolTicker)"
                :src="getIcon(currency.basicInfo.symbolTicker)"
                :alt="currency.basicInfo.symbolTicker"
                class="dashboard-coin-icon"
              />
              <span v-else class="dashboard-coin-fallback">{{ currency.basicInfo.symbolTicker.slice(0, 2) }}</span>
            </td>
            <td class="dashboard-td dashboard-td--name">
              <span class="dashboard-name">{{ currency.basicInfo.name }}</span>
            </td>
            <td class="dashboard-td dashboard-td--ticker">
              <span class="dashboard-ticker">{{ currency.basicInfo.symbolTicker.toUpperCase() }}</span>
            </td>
            <td class="dashboard-td dashboard-td--visibility">
              <SwitchRoot
                :checked="visibilityToggles[currency.basicInfo.symbolTicker] ?? true"
                :disabled="activeCount <= 1 && (visibilityToggles[currency.basicInfo.symbolTicker] ?? true)"
                class="dashboard-switch"
                @update:checked="(v) => toggleVisibility(currency.basicInfo.symbolTicker, v)"
              >
                <SwitchThumb class="dashboard-switch-thumb" />
              </SwitchRoot>
            </td>
            <td class="dashboard-td dashboard-td--network">
              <SelectRoot
                :model-value="networkSelection[currency.basicInfo.symbolTicker] ?? 'Mainnet'"
                @update:model-value="(v) => selectNetwork(currency.basicInfo.symbolTicker, v)"
              >
                <SelectTrigger class="dashboard-select-trigger" aria-label="Select network">
                  <SelectValue placeholder="Network" />
                </SelectTrigger>
                <SelectPortal>
                  <SelectContent class="dashboard-select-content" position="popper" :side-offset="4">
                    <SelectViewport class="dashboard-select-viewport">
                      <SelectItem
                        v-for="opt in networkOptions"
                        :key="opt"
                        :value="opt"
                        class="dashboard-select-item"
                      >
                        <SelectItemText>{{ opt }}</SelectItemText>
                      </SelectItem>
                    </SelectViewport>
                  </SelectContent>
                </SelectPortal>
              </SelectRoot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  SwitchRoot,
  SwitchThumb,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectValue,
  SelectPortal,
  SelectViewport,
} from 'radix-vue'
import { allCurrencies, NETWORKS } from '@/lib/cores/currencyCore/currencies'
import type { CurrencyData } from '@/lib/cores/currencyCore/currencies'

defineOptions({ name: 'DashboardSettings' })

const STORAGE_KEY_VISIBILITY = 'sparkplate_dashboard_visibility'
const STORAGE_KEY_NETWORK = 'sparkplate_dashboard_network'

const visibilityToggles = ref<Record<string, boolean>>({})
const networkSelection = ref<Record<string, string>>({})

const networkOptions = ['Mainnet', 'Testnet']

const currenciesOrdered = computed(() => {
  return [...allCurrencies].sort((a, b) =>
    a.basicInfo.name.localeCompare(b.basicInfo.name)
  ) as CurrencyData[]
})

const activeCount = computed(() => {
  return Object.entries(visibilityToggles.value).filter(([, v]) => v).length
})

function getIcon(ticker: string): string | null {
  const n = NETWORKS.find((x) => x.ticker === ticker.toUpperCase())
  return n?.icon ?? null
}

function toggleVisibility(ticker: string, value: boolean) {
  if (activeCount.value <= 1 && (visibilityToggles.value[ticker] ?? true)) return
  visibilityToggles.value = { ...visibilityToggles.value, [ticker]: value }
  saveVisibility()
}

function selectNetwork(ticker: string, network: string) {
  networkSelection.value = { ...networkSelection.value, [ticker]: network }
  saveNetwork()
}

function loadVisibility() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_VISIBILITY)
    if (raw) {
      visibilityToggles.value = { ...visibilityToggles.value, ...JSON.parse(raw) }
    }
  } catch {
    // keep defaults
  }
}

function loadNetwork() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NETWORK)
    if (raw) {
      networkSelection.value = { ...networkSelection.value, ...JSON.parse(raw) }
    }
  } catch {
    // keep defaults
  }
}

function saveVisibility() {
  try {
    localStorage.setItem(STORAGE_KEY_VISIBILITY, JSON.stringify(visibilityToggles.value))
  } catch {
    // ignore
  }
}

function saveNetwork() {
  try {
    localStorage.setItem(STORAGE_KEY_NETWORK, JSON.stringify(networkSelection.value))
  } catch {
    // ignore
  }
}

onMounted(() => {
  loadVisibility()
  loadNetwork()
  // Ensure all currencies have a visibility entry (default: true)
  const next: Record<string, boolean> = { ...visibilityToggles.value }
  let changed = false
  currenciesOrdered.value.forEach((c) => {
    const ticker = c.basicInfo.symbolTicker
    if (!(ticker in next)) {
      next[ticker] = true
      changed = true
    }
  })
  if (changed) {
    visibilityToggles.value = next
    saveVisibility()
  }
})
</script>

<style lang="scss" scoped>
.dashboard-settings {
  width: 100%;
}

.dashboard-header {
  margin-bottom: 1.5rem;
}

.dashboard-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.25rem 0;
}

.dashboard-desc {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.dashboard-stats {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.dashboard-table-wrapper {
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.dashboard-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.dashboard-th {
  text-align: left;
  padding: 0.75rem 1rem;
  font-weight: 600;
  color: #374151;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.dashboard-th--index {
  width: 2.5rem;
  text-align: center;
}

.dashboard-th--coin {
  width: 3rem;
  text-align: center;
}

.dashboard-th--ticker {
  width: 5rem;
  text-align: center;
}

.dashboard-th--visibility {
  width: 6rem;
  text-align: center;
}

.dashboard-th--network {
  width: 9rem;
}

.dashboard-row {
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
}

.dashboard-td {
  padding: 0.75rem 1rem;
  vertical-align: middle;
  color: #374151;
}

.dashboard-td--index {
  text-align: center;
  color: #9ca3af;
}

.dashboard-td--coin {
  text-align: center;
}

.dashboard-coin-icon {
  width: 2rem;
  height: 2rem;
  object-fit: contain;
}

.dashboard-coin-fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: #e5e7eb;
  border-radius: 0.25rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: #6b7280;
}

.dashboard-name {
  font-weight: 500;
  color: #111827;
}

.dashboard-ticker {
  font-weight: 600;
  color: #6b7280;
}

.dashboard-td--visibility {
  text-align: center;
}

.dashboard-switch {
  position: relative;
  width: 2.25rem;
  height: 1.25rem;
  background: #d1d5db;
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.15s;

  &[data-state='checked'] {
    background: #2563eb;
  }

  &[data-disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.dashboard-switch-thumb {
  display: block;
  width: 1rem;
  height: 1rem;
  background: #fff;
  border-radius: 9999px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.15s;
  transform: translateX(2px);

  [data-state='checked'] & {
    transform: translateX(1.125rem);
  }
}

.dashboard-select-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  min-width: 7rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #374151;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  outline: none;

  &:hover {
    border-color: #9ca3af;
  }

  &:focus-visible {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
}

.dashboard-td--network {
  min-width: 9rem;
}
</style>

<style>
.dashboard-select-content {
  min-width: 10rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  padding: 0.25rem;
  z-index: 10000;
}

.dashboard-select-viewport {
  padding: 0;
}

.dashboard-select-item {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  cursor: pointer;
  outline: none;

  &:hover,
  &[data-highlighted] {
    background: #f3f4f6;
  }
}
</style>
