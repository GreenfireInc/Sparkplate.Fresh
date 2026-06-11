/**
 * useCoinsStore — Pinia setup store for cryptocurrency market data (prices / 24h change / market cap).
 *
 * Phase 1 "foundational store" of `docs/methodologies/06032026.methodology.vuex.to.pinia.store.conversion.md`
 * (§7 Phase 1: "`useCoinsStore` (root coin data; `fetchCoinsInfo`)"; §3.5 persists under `sparkplate_coins`).
 *
 * Greenery kept coin data at the Vuex root (`coinsData` / `coinsInfo` / `coinsMeta` / `coinPrices`) and
 * refreshed it via the root `fetchCoinsInfo` action (which read files through `window.fs`). V2 has no such
 * file bridge but already exposes an in-renderer, multi-provider price aggregator with automatic fallback
 * (`fetchCurrencyPrices` → CoinGecko → CoinCap → Coinpaprika). This store owns the fetched cache, persists
 * it as a warm-start cache, and exposes simple lookups — replacing the ad-hoc per-component fetching.
 *
 * Vuex → Pinia mapping (Greenery root coin state):
 *   - `coinPrices` / `coinsData`        → `prices` ref (keyed by lowercase symbol)
 *   - root action `fetchCoinsInfo`      → `fetchCoinPrices()` (+ `fetchCoinsInfo` alias)
 *   - persisted `coinsData/Info/Meta`   → `persist: { key: 'sparkplate_coins' }` (§3.5)
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fetchCurrencyPrices } from '@/lib/cores/currencyCore/indexComposites'
import { allCurrencies } from '@/lib/cores/currencyCore/currencies'

const PERSIST_KEY = 'sparkplate_coins'

/** Per-symbol market datum, mirroring the aggregator's `fetchCurrencyPrices` result shape. */
export interface CoinPrice {
  price: number
  priceChange: number
  marketCap: number
}

/** Minimal currency descriptor accepted by {@link useCoinsStore.fetchCoinPrices}. */
export interface CoinPriceQuery {
  /** Explicit CoinGecko id (e.g. `'bitcoin'`); preferred over the symbol→id map when present. */
  id?: string
  ticker?: string
  symbol?: string
  name?: string
}

export const useCoinsStore = defineStore(
  'coins',
  () => {
    // ── state ──────────────────────────────────────────────────────────────────
    /** Market data keyed by **lowercase** symbol (e.g. `btc`). */
    const prices = ref<Record<string, CoinPrice>>({})
    /** Epoch ms of the last successful fetch (persisted, for cache-age checks). */
    const lastFetched = ref<number | null>(null)
    /** True while a fetch is in flight (not persisted). */
    const loading = ref(false)

    // ── getters ──────────────────────────────────────────────────────────────────
    const hasData = computed<boolean>(() => Object.keys(prices.value).length > 0)
    const priceFor = computed(() => (symbol: string): number =>
      prices.value[symbol.toLowerCase()]?.price ?? 0,
    )
    const marketCapFor = computed(() => (symbol: string): number =>
      prices.value[symbol.toLowerCase()]?.marketCap ?? 0,
    )
    const changeFor = computed(() => (symbol: string): number =>
      prices.value[symbol.toLowerCase()]?.priceChange ?? 0,
    )

    // ── actions ──────────────────────────────────────────────────────────────────
    /**
     * Fetch market data via the currencyCore aggregator and merge it into `prices`. Defaults to every
     * supported currency when no list is given. Failures are swallowed (logged) so a network error never
     * blanks an existing (possibly persisted) cache.
     */
    async function fetchCoinPrices(currencies?: CoinPriceQuery[]): Promise<void> {
      const list: CoinPriceQuery[] =
        currencies ??
        allCurrencies.map((c) => ({
          ticker: c.basicInfo.symbolTicker,
          name: c.basicInfo.name,
        }))

      loading.value = true
      try {
        const result = await fetchCurrencyPrices(list)
        if (Object.keys(result).length > 0) {
          prices.value = { ...prices.value, ...result }
          lastFetched.value = Date.now()
        }
      } catch (error) {
        console.error('[useCoinsStore] fetchCoinPrices failed:', error)
      } finally {
        loading.value = false
      }
    }

    /** Alias matching Greenery's root action name (`fetchCoinsInfo`). */
    const fetchCoinsInfo = fetchCoinPrices

    function reset(): void {
      prices.value = {}
      lastFetched.value = null
    }

    return {
      // state
      prices,
      lastFetched,
      loading,
      // getters
      hasData,
      priceFor,
      marketCapFor,
      changeFor,
      // actions
      fetchCoinPrices,
      fetchCoinsInfo,
      reset,
    }
  },
  {
    persist: { key: PERSIST_KEY, pick: ['prices', 'lastFetched'] },
  },
)
