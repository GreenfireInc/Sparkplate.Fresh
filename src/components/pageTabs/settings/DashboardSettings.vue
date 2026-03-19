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
    </div>

    <div class="dashboard-toolbar">
      <input
        v-model="searchQuery"
        type="search"
        class="dashboard-search"
        placeholder="Filter by name or ticker..."
        aria-label="Filter currencies"
      />
      <span class="dashboard-stat">Active: {{ activeCount }} / {{ currenciesOrdered.length }} ({{ filteredCurrencies.length }} shown)</span>
    </div>

    <div class="dashboard-table-wrapper">
      <table class="dashboard-table">
        <thead>
          <tr>
            <th class="dashboard-th dashboard-th--index">#</th>
            <th class="dashboard-th dashboard-th--coin">Coin</th>
            <th class="dashboard-th dashboard-th--name">Name</th>
            <th class="dashboard-th dashboard-th--ticker">Ticker</th>
            <th class="dashboard-th dashboard-th--tags">Tags</th>
            <th class="dashboard-th dashboard-th--description">Description</th>
            <th class="dashboard-th dashboard-th--visibility">Visible</th>
            <th class="dashboard-th dashboard-th--network">Network</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(currency, index) in filteredCurrencies"
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
            <td class="dashboard-td dashboard-td--tags">
              <span class="dashboard-tags">{{ getTags(currency) }}</span>
            </td>
            <td class="dashboard-td dashboard-td--description">
              <span class="dashboard-desc-cell" :title="currency.basicInfo.description">{{ truncateDesc(currency.basicInfo.description) }}</span>
            </td>
            <td class="dashboard-td dashboard-td--visibility">
              <label
                class="dashboard-toggle"
                :class="{ 'dashboard-toggle--disabled': activeCount <= 1 && (visibilityToggles[currency.basicInfo.symbolTicker] ?? true) }"
              >
                <input
                  type="checkbox"
                  :checked="visibilityToggles[currency.basicInfo.symbolTicker] ?? true"
                  :disabled="activeCount <= 1 && (visibilityToggles[currency.basicInfo.symbolTicker] ?? true)"
                  class="sr-only"
                  :aria-label="`Toggle ${currency.basicInfo.name} visibility`"
                  @change="toggleVisibility(currency.basicInfo.symbolTicker, ($event.target as HTMLInputElement).checked)"
                />
                <span class="dashboard-toggle-track" />
              </label>
            </td>
            <td class="dashboard-td dashboard-td--network">
              <button
                class="dashboard-network-btn"
                :aria-label="`View RPC endpoints for ${currency.basicInfo.name}`"
                @click="openEndpointsModal(currency)"
              >
                <span class="dashboard-network-btn__label">
                  {{ getEndpointCount(currency) }} endpoint{{ getEndpointCount(currency) !== 1 ? 's' : '' }}
                </span>
                <svg class="dashboard-network-btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <DashboardNetworks ref="networksModal" :get-icon="getIcon" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { allCurrencies, NETWORKS } from '@/lib/cores/currencyCore/currencies'
import type { CurrencyData } from '@/lib/cores/currencyCore/currencies'
import DashboardNetworks from '@/components/modals/settings/dashboard/dashboardNetworks.vue'

defineOptions({ name: 'DashboardSettings' })

const STORAGE_KEY_VISIBILITY = 'sparkplate_dashboard_visibility'

const visibilityToggles = ref<Record<string, boolean>>({})
const searchQuery = ref('')

// ── RPC Endpoints modal ──────────────────────────────────────────────────────

const networksModal = ref<InstanceType<typeof DashboardNetworks> | null>(null)

function getEndpointCount(currency: CurrencyData): number {
  const endpoints = (currency as Record<string, unknown>)['rpcEndpoints']
  return Array.isArray(endpoints) ? endpoints.length : 0
}

function openEndpointsModal(currency: CurrencyData) {
  networksModal.value?.open(currency)
}

const currenciesOrdered = computed(() => {
  return [...allCurrencies].sort((a, b) =>
    a.basicInfo.name.localeCompare(b.basicInfo.name)
  ) as CurrencyData[]
})

const filteredCurrencies = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return currenciesOrdered.value
  return currenciesOrdered.value.filter(
    (c) =>
      c.basicInfo.name.toLowerCase().includes(q) ||
      c.basicInfo.symbolTicker.toLowerCase().includes(q)
  )
})

const activeCount = computed(() => {
  return Object.entries(visibilityToggles.value).filter(([, v]) => v).length
})

function getTags(currency: CurrencyData): string {
  const parts: string[] = []
  if (currency.technicalInfo?.proofingType) {
    const pt = currency.technicalInfo.proofingType
    if (pt === 'Proof of Stake') parts.push('PoS')
    else if (pt === 'Proof of Work') parts.push('PoW')
    else if (pt === 'Proof of Authority') parts.push('PoA')
    else parts.push(pt)
  }
  if (currency.technicalInfo?.class) {
    const cls = currency.technicalInfo.class
    if (cls.includes('Layer 1')) parts.push('L1')
    else if (cls.includes('Layer 2')) parts.push('L2')
  }
  return parts.length ? parts.join(', ') : '—'
}

function truncateDesc(text: string, max = 60): string {
  if (!text || !text.trim()) return '—'
  return text.length <= max ? text : text.slice(0, max).trim() + '…'
}

function getIcon(ticker: string): string | null {
  const n = NETWORKS.find((x) => x.ticker === ticker.toUpperCase())
  return n?.icon ?? null
}

function toggleVisibility(ticker: string, value: boolean) {
  if (activeCount.value <= 1 && (visibilityToggles.value[ticker] ?? true)) return
  visibilityToggles.value = { ...visibilityToggles.value, [ticker]: value }
  saveVisibility()
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

function saveVisibility() {
  try {
    localStorage.setItem(STORAGE_KEY_VISIBILITY, JSON.stringify(visibilityToggles.value))
  } catch {
    // ignore
  }
}

onMounted(() => {
  loadVisibility()
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

.dashboard-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.dashboard-search {
  flex: 1;
  max-width: 20rem;
  padding: 0.5rem 0.75rem 0.5rem 2rem;
  font-size: 0.875rem;
  color: #374151;
  background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E") no-repeat 0.6rem center;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
}

.dashboard-stat {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  flex-shrink: 0;
}

.dashboard-table-wrapper {
  overflow-x: auto;
  overflow-y: auto;
  max-height: 60vh;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.dashboard-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.dashboard-th {
  position: sticky;
  top: 0;
  z-index: 1;
  text-align: left;
  padding: 0.75rem 1rem;
  font-weight: 600;
  color: #374151;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 0 0 #e5e7eb;
}

.dashboard-th--index {
  width: 2.5rem;
  text-align: center;
}

.dashboard-th--coin {
  width: 3rem;
  text-align: center;
}

.dashboard-th--name {
  max-width: 12rem;
  padding-right: 0.375rem;
}

.dashboard-td--name {
  max-width: 12rem;
  padding-right: 0.375rem;
}

.dashboard-th--ticker {
  width: 5rem;
  padding-left: 0.375rem;
  text-align: center;
}

.dashboard-td--ticker {
  padding-left: 0.375rem;
}

.dashboard-th--tags {
  min-width: 5rem;
  max-width: 8rem;
}

.dashboard-td--tags {
  font-size: 0.8125rem;
  color: #6b7280;
}

.dashboard-tags {
  white-space: nowrap;
}

.dashboard-th--description {
  min-width: 10rem;
  max-width: 18rem;
}

.dashboard-td--description {
  font-size: 0.8125rem;
  color: #6b7280;
  line-height: 1.35;
}

.dashboard-desc-cell {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.dashboard-th--visibility {
  width: 6rem;
  text-align: center;
}

.dashboard-th--network {
  width: 9rem;
}

// ── Network button ────────────────────────────────────────────────────────────

.dashboard-network-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  font-size: 0.8125rem;
  color: #2563eb;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.375rem;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: #dbeafe;
    border-color: #93c5fd;
  }

  &__label {
    font-weight: 500;
  }

  &__icon {
    width: 0.875rem;
    height: 0.875rem;
    flex-shrink: 0;
  }
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

.dashboard-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
}

.dashboard-toggle--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.dashboard-toggle-track {
  position: relative;
  width: 2.75rem;
  height: 1.5rem;
  border-radius: 9999px;
  background: #d1d5db;
  transition: background 0.2s;
  border: none;
}

.dashboard-toggle-track::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.dashboard-toggle input:checked + .dashboard-toggle-track {
  background: #3b82f6;
}

.dashboard-toggle input:checked + .dashboard-toggle-track::after {
  transform: translateX(1.25rem);
}

.dashboard-toggle input:focus-visible + .dashboard-toggle-track {
  outline: none;
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #3b82f6;
}

.dashboard-td--network {
  min-width: 9rem;
}
</style>
