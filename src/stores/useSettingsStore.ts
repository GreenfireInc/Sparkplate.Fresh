/**
 * useSettingsStore — Pinia setup store for app-wide UI settings.
 *
 * Phase 1 "foundational store" of `docs/methodologies/06032026.methodology.vuex.to.pinia.store.conversion.md`.
 * It absorbs two pre-existing composables into a single, persisted source of truth:
 *   - `src/composables/useMenuState.ts`           → `menuType` + `changeMenuType` / `toggleMenuType`
 *   - `src/composables/useDashboardCurrencies.ts` → `visibilityToggles` + visibility getters / guards
 *
 * Both composables now delegate here (thin shims), so existing consumers are untouched.
 *
 * Vuex → Pinia mapping (Greenery `settingsModule` / root `menuType`):
 *   - root `state.settings.menuType`              → `menuType` ref
 *   - `userSettings.visibilityToggles`            → `visibilityToggles` ref
 *   - `userSettings.networkSelection`             → `networkSelection` ref
 *   - mutation `setMenuType` / `updateSetting`    → mutate the ref directly inside actions
 *   - `resetSettingsState`                        → `reset()`
 *
 * Persistence: this store OWNS its data (no backing service), so it opts in to
 * `pinia-plugin-persistedstate` under `sparkplate_settings`. Greenery persisted the same slice
 * (`settings`) via SecureLS `vuex-persistedstate`; the plugin replaces it (methodology §3.5).
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { allCurrencies, type CurrencyData } from '@/lib/cores/currencyCore/currencies'

export type MenuType = 'macro' | 'micro'

/** Consolidated persisted key for all settings (replaces the dashboard-only key below). */
const PERSIST_KEY = 'sparkplate_settings'
/** Legacy key written by the former `useDashboardCurrencies` composable — migrated on first run. */
const LEGACY_VISIBILITY_KEY = 'sparkplate_dashboard_visibility'

/**
 * Sorted list of every supported currency (alphabetical by display name). Stable, non-reactive
 * reference — sorted once. Exported for the `useDashboardCurrencies` shim, which surfaces it directly.
 */
export const currenciesOrdered: CurrencyData[] = [...allCurrencies].sort((a, b) =>
  a.basicInfo.name.localeCompare(b.basicInfo.name),
) as CurrencyData[]

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export const useSettingsStore = defineStore(
  'settings',
  () => {
    // ── state ────────────────────────────────────────────────────────────────
    const menuType = ref<MenuType>('micro')
    const visibilityToggles = ref<Record<string, boolean>>({})
    const networkSelection = ref<Record<string, string>>({})

    // ── getters ──────────────────────────────────────────────────────────────
    const visibleCurrencies = computed<CurrencyData[]>(() =>
      currenciesOrdered.filter((c) => visibilityToggles.value[c.basicInfo.symbolTicker] ?? true),
    )
    const activeCount = computed<number>(
      () => Object.entries(visibilityToggles.value).filter(([, v]) => v).length,
    )

    // ── menu actions (was useMenuState) ────────────────────────────────────────
    function changeMenuType(type: MenuType): void {
      menuType.value = type
    }
    function toggleMenuType(): void {
      menuType.value = menuType.value === 'macro' ? 'micro' : 'macro'
    }

    // ── visibility actions (was useDashboardCurrencies) ────────────────────────
    function isVisible(ticker: string): boolean {
      return visibilityToggles.value[ticker] ?? true
    }
    function setVisibility(ticker: string, value: boolean): void {
      // New object reference so the persistedstate plugin and computeds both react.
      visibilityToggles.value = { ...visibilityToggles.value, [ticker]: value }
    }
    /** Guarded toggle — refuses to hide the last visible currency so the Dashboard always renders. */
    function toggleVisibility(ticker: string, value: boolean): void {
      if (!value && activeCount.value <= 1 && isVisible(ticker)) return
      setVisibility(ticker, value)
    }

    let initialized = false
    /**
     * Lazily hydrate visibility: migrate the legacy dashboard key on first run, then ensure every
     * supported currency defaults to visible. Also installs a cross-window `storage` listener for
     * parity with the former composable (the same mechanism that replaced `vuex-shared-mutations`).
     * Safe to call repeatedly; runs at most once.
     */
    function ensureInitialized(): void {
      if (initialized) return
      initialized = true

      // One-time migration: seed from the legacy dashboard-only key when the consolidated
      // settings blob has not populated visibility yet (preserves a user's existing toggles).
      if (Object.keys(visibilityToggles.value).length === 0) {
        const legacy = readJson<Record<string, boolean>>(LEGACY_VISIBILITY_KEY)
        if (legacy) visibilityToggles.value = { ...legacy }
      }

      // Default every currently supported currency to visible.
      const next = { ...visibilityToggles.value }
      let changed = false
      for (const c of currenciesOrdered) {
        const ticker = c.basicInfo.symbolTicker
        if (!(ticker in next)) {
          next[ticker] = true
          changed = true
        }
      }
      if (changed) visibilityToggles.value = next

      // Cross-window sync — re-read the persisted blob when another window writes it.
      if (typeof window !== 'undefined') {
        window.addEventListener('storage', (e) => {
          if (e.key !== PERSIST_KEY) return
          const data = readJson<{
            menuType?: MenuType
            visibilityToggles?: Record<string, boolean>
            networkSelection?: Record<string, string>
          }>(PERSIST_KEY)
          if (!data) return
          if (data.menuType) menuType.value = data.menuType
          if (data.visibilityToggles) visibilityToggles.value = data.visibilityToggles
          if (data.networkSelection) networkSelection.value = data.networkSelection
        })
      }
    }

    /** Restore defaults (parity with Greenery `resetSettingsState`, for the future logout flow). */
    function reset(): void {
      menuType.value = 'micro'
      networkSelection.value = {}
      const defaults: Record<string, boolean> = {}
      for (const c of currenciesOrdered) defaults[c.basicInfo.symbolTicker] = true
      visibilityToggles.value = defaults
    }

    return {
      // state
      menuType,
      visibilityToggles,
      networkSelection,
      // getters
      visibleCurrencies,
      activeCount,
      // actions
      changeMenuType,
      toggleMenuType,
      isVisible,
      setVisibility,
      toggleVisibility,
      ensureInitialized,
      reset,
    }
  },
  {
    persist: { key: PERSIST_KEY, pick: ['menuType', 'visibilityToggles', 'networkSelection'] },
  },
)
