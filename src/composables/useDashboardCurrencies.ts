/**
 * useDashboardCurrencies — thin compatibility shim over `useSettingsStore`.
 *
 * Dashboard currency-visibility state was absorbed into the Pinia settings store (Phase 1 of the
 * Vuex→Pinia methodology, 06032026). The store now owns the state and its persistence (key
 * `sparkplate_settings`, migrating the previous `sparkplate_dashboard_visibility` blob on first run),
 * the all-currencies-default-to-visible hydration, the "never hide the last currency" guard, and
 * cross-window sync.
 *
 * This shim keeps the original composable API so existing consumers (Dashboard,
 * tab.Settings.Dashboard, the currencyCore dropdown) need no changes; new code should prefer
 * `useSettingsStore()` directly. Must be called within a component `setup()` / `<script setup>`.
 *
 * Reference (V1, Greenery): visibility was driven by `userSettings.visibilityToggles` in Vuex.
 */
import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'
import { useSettingsStore, currenciesOrdered } from '@/stores/useSettingsStore'
import type { CurrencyData } from '@/lib/cores/currencyCore/currencies'

/** Retained for backwards compatibility; the store now persists under `sparkplate_settings`. */
const STORAGE_KEY_VISIBILITY = 'sparkplate_dashboard_visibility'

export function useDashboardCurrencies(): {
  visibilityToggles: Ref<Record<string, boolean>>
  currenciesOrdered: CurrencyData[]
  visibleCurrencies: Ref<CurrencyData[]>
  activeCount: Ref<number>
  isVisible: (ticker: string) => boolean
  toggleVisibility: (ticker: string, value: boolean) => void
  setVisibility: (ticker: string, value: boolean) => void
} {
  const store = useSettingsStore()
  store.ensureInitialized()

  const { visibilityToggles, visibleCurrencies, activeCount } = storeToRefs(store)

  return {
    visibilityToggles,
    currenciesOrdered,
    visibleCurrencies,
    activeCount,
    isVisible: store.isVisible,
    toggleVisibility: store.toggleVisibility,
    setVisibility: store.setVisibility,
  }
}

export { STORAGE_KEY_VISIBILITY }
