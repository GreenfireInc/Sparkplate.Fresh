/**
 * useDashboardCurrencies — Shared dashboard currency visibility state.
 *
 * Single source of truth for which currencies appear on the Dashboard.
 * Backed by `localStorage` under `sparkplate_dashboard_visibility` so that
 * `tab.Settings.Dashboard.vue` (toggles) and `Dashboard.vue` (consumer) stay in
 * sync without prop drilling, an event bus, or Vuex/Pinia.
 *
 * Reference (V1, Greenery): visibility was driven by `userSettings.visibilityToggles`
 * in the Vuex store. Here we recreate the same behavior with a module-level
 * `ref` shared across all callers, plus cross-tab sync via the `storage` event.
 */

import { computed, ref, type ComputedRef } from 'vue'
import { allCurrencies, type CurrencyData } from '@/lib/cores/currencyCore/currencies'

const STORAGE_KEY_VISIBILITY = 'sparkplate_dashboard_visibility'

/**
 * Module-level reactive state — instantiated once and shared across every
 * component that calls `useDashboardCurrencies()`.
 */
const visibilityToggles = ref<Record<string, boolean>>({})
let initialized = false

function readFromStorage(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_VISIBILITY)
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {}
  } catch {
    return {}
  }
}

function writeToStorage(value: Record<string, boolean>): void {
  try {
    localStorage.setItem(STORAGE_KEY_VISIBILITY, JSON.stringify(value))
  } catch {
    /* localStorage unavailable / quota exceeded — fail silently */
  }
}

/**
 * Sorted list of every supported currency (alphabetical by display name).
 * Stable reference — sorting happens once.
 */
const currenciesOrdered: CurrencyData[] = [...allCurrencies].sort((a, b) =>
  a.basicInfo.name.localeCompare(b.basicInfo.name),
) as CurrencyData[]

/**
 * Hydrate `visibilityToggles` from localStorage and ensure every currently
 * supported currency has a default entry of `true`.
 */
function ensureInitialized(): void {
  if (initialized) return
  initialized = true

  const stored = readFromStorage()
  const next: Record<string, boolean> = { ...stored }
  let changed = false

  currenciesOrdered.forEach((c) => {
    const ticker = c.basicInfo.symbolTicker
    if (!(ticker in next)) {
      next[ticker] = true
      changed = true
    }
  })

  visibilityToggles.value = next
  if (changed) writeToStorage(next)

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key !== STORAGE_KEY_VISIBILITY) return
      visibilityToggles.value = readFromStorage()
    })
  }
}

export function useDashboardCurrencies(): {
  visibilityToggles: typeof visibilityToggles
  currenciesOrdered: CurrencyData[]
  visibleCurrencies: ComputedRef<CurrencyData[]>
  activeCount: ComputedRef<number>
  isVisible: (ticker: string) => boolean
  toggleVisibility: (ticker: string, value: boolean) => void
  setVisibility: (ticker: string, value: boolean) => void
} {
  ensureInitialized()

  const visibleCurrencies = computed<CurrencyData[]>(() =>
    currenciesOrdered.filter(
      (c) => visibilityToggles.value[c.basicInfo.symbolTicker] ?? true,
    ),
  )

  const activeCount = computed<number>(
    () => Object.entries(visibilityToggles.value).filter(([, v]) => v).length,
  )

  function isVisible(ticker: string): boolean {
    return visibilityToggles.value[ticker] ?? true
  }

  function setVisibility(ticker: string, value: boolean): void {
    visibilityToggles.value = { ...visibilityToggles.value, [ticker]: value }
    writeToStorage(visibilityToggles.value)
  }

  /**
   * Guarded toggle — refuses to disable the last visible currency so the
   * Dashboard always has at least one tab to render.
   */
  function toggleVisibility(ticker: string, value: boolean): void {
    if (!value && activeCount.value <= 1 && isVisible(ticker)) return
    setVisibility(ticker, value)
  }

  return {
    visibilityToggles,
    currenciesOrdered,
    visibleCurrencies,
    activeCount,
    isVisible,
    toggleVisibility,
    setVisibility,
  }
}

export { STORAGE_KEY_VISIBILITY }
