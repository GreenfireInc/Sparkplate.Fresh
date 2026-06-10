/**
 * useWalletsStore — Pinia setup store for **public** wallet addresses shown on the Dashboard.
 *
 * Phase 4 "address-only" slice of `docs/methodologies/06032026.methodology.vuex.to.pinia.store.conversion.md`
 * and the concrete wiring described in §8 of
 * `docs/executions/20260610.execution.vuex.to.pinia.store.conversion.md`.
 *
 * Greenery kept wallets DB-backed (WalletService) and rehydrated them per-user on login. This V2 slice
 * is deliberately smaller: it persists only the **public** address material a user generates/imports on
 * the Dashboard, keyed by ticker, via `pinia-plugin-persistedstate` under `sparkplate_wallets`. No
 * private keys / WIF / mnemonics are stored — persisting encrypted secrets is a separate concern.
 *
 * Vuex → Pinia mapping (Greenery `walletsModule`):
 *   - `state[identifier] = Wallet[]`            → `byTicker: Record<ticker, StoredWallet[]>` (same shape)
 *   - `commit('addWallet', …)`                  → `addWallet()` mutates `byTicker` directly
 *   - `getWallets(identifier)`                  → `walletsFor(ticker)` getter
 *   - DB rehydrate via `fetchDBWallets(userId)` → persistedstate plugin rehydrates `byTicker` on init
 *
 * Derivation is delegated to the existing, proven renderer-side core:
 *   - mnemonic → public address : `@/utils/cryptoGenerator` `generateAddressesFromMnemonic`
 *   - imported private key      : already derived by `ModalDashboardImport` (we store the public parts)
 * Both heavy crypto paths are lazy-imported so the Dashboard bundle stays light until a wallet is made.
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const PERSIST_KEY = 'sparkplate_wallets'

/** A persisted, public-only wallet entry. Never holds private keys / WIF / mnemonics. */
export interface StoredWallet {
  /** Uppercased ticker the address belongs to (e.g. `BTC`). */
  ticker: string
  /** Public wallet address. */
  address: string
  /** Public key, when known (imported wallets and HD derivations expose it). */
  publicKey?: string
  /** BIP-derivation path for HD wallets (e.g. `m/44'/0'/0'/0/0`). */
  derivationPath?: string
  /** True when derived from a seed phrase (HD), false for imported / watch-only addresses. */
  isHDWallet: boolean
  /** Optional user-facing label (e.g. `Throwaway`). */
  nickname?: string
  /** Cached balance — `0` until the Phase 4 IPC balance bridge lands. */
  balance: number
  /** Creation timestamp (ms epoch) for stable ordering. */
  createdAt: number
}

/** Input accepted by {@link addWallet}; `isHDWallet`/`balance`/`createdAt` default sensibly. */
export interface AddWalletInput {
  ticker: string
  address: string
  publicKey?: string
  derivationPath?: string
  isHDWallet?: boolean
  nickname?: string
  balance?: number
  createdAt?: number
}

/** Options shared by the mnemonic-derived add paths. */
export interface GenerateWalletOptions {
  isHDWallet?: boolean
  nickname?: string
  /** HD account/address index (defaults to 0). */
  index?: number
}

export const useWalletsStore = defineStore(
  'wallets',
  () => {
    // ── state ──────────────────────────────────────────────────────────────────
    /** Public addresses grouped by uppercased ticker. */
    const byTicker = ref<Record<string, StoredWallet[]>>({})

    // ── getters ────────────────────────────────────────────────────────────────
    /** Reactive accessor: `walletsFor(ticker)` → that ticker's stored addresses (newest first). */
    const walletsFor = computed(() => (ticker: string): StoredWallet[] => {
      return byTicker.value[ticker.toUpperCase()] ?? []
    })

    /** Total number of stored addresses across every ticker. */
    const count = computed<number>(() =>
      Object.values(byTicker.value).reduce((sum, list) => sum + list.length, 0),
    )

    // ── helpers ──────────────────────────────────────────────────────────────────
    function hasAddress(ticker: string, address: string): boolean {
      const key = ticker.toUpperCase()
      return (byTicker.value[key] ?? []).some((w) => w.address === address)
    }

    // ── actions ────────────────────────────────────────────────────────────────
    /**
     * Add a fully-formed public wallet entry. Skips empty addresses and de-dupes by
     * (ticker, address). Replacing `byTicker` with a fresh object keeps the persistedstate
     * plugin and any `walletsFor` consumers reactive. Returns the stored wallet, or `null`
     * when nothing was added (empty / duplicate address).
     */
    function addWallet(input: AddWalletInput): StoredWallet | null {
      const key = input.ticker.toUpperCase()
      const address = input.address?.trim()
      if (!address || hasAddress(key, address)) return null

      const wallet: StoredWallet = {
        ticker: key,
        address,
        publicKey: input.publicKey,
        derivationPath: input.derivationPath,
        isHDWallet: input.isHDWallet ?? false,
        nickname: input.nickname,
        balance: input.balance ?? 0,
        createdAt: input.createdAt ?? Date.now(),
      }

      byTicker.value = {
        ...byTicker.value,
        [key]: [wallet, ...(byTicker.value[key] ?? [])],
      }
      return wallet
    }

    /**
     * Derive the **public** address for `ticker` from a BIP-39 `mnemonic` and store it.
     * Delegates to the shared `generateAddressesFromMnemonic` core (lazy-imported), then keeps
     * only the public material. Throws when the ticker is not supported by that core (currently
     * BTC, LTC, DOGE, ETH, TRX, SOL, XTZ, LUNC). Returns the stored wallet, or `null` on duplicate.
     */
    async function addFromMnemonic(
      ticker: string,
      mnemonic: string,
      options: GenerateWalletOptions = {},
    ): Promise<StoredWallet | null> {
      const key = ticker.toUpperCase()
      const index = options.index ?? 0

      const { generateAddressesFromMnemonic } = await import('@/utils/cryptoGenerator')
      const derived = await generateAddressesFromMnemonic(mnemonic, { [key]: index })
      const match = derived.find((d) => d.currency.toUpperCase() === key)

      if (!match || !match.address) {
        throw new Error(
          `Generating a ${key} wallet from a seed phrase is not supported in this build.`,
        )
      }

      return addWallet({
        ticker: key,
        address: match.address,
        publicKey: match.cryptoPublicKey,
        derivationPath: match.derivationPath,
        isHDWallet: options.isHDWallet ?? true,
        nickname: options.nickname,
        balance: 0,
      })
    }

    /**
     * Generate a brand-new random seed phrase and store the derived public address for `ticker`.
     * Backs the Dashboard's "New Wallet → From Mnemonic / Throwaway" actions, which carry no phrase.
     * The generated mnemonic is used only to derive the public address and is intentionally discarded.
     */
    async function generateAndAddWallet(
      ticker: string,
      options: GenerateWalletOptions = {},
    ): Promise<StoredWallet | null> {
      const bip39 = await import('bip39')
      const mnemonic = bip39.generateMnemonic()
      return addFromMnemonic(ticker, mnemonic, options)
    }

    /** Remove a single stored address for a ticker. */
    function removeWallet(ticker: string, address: string): void {
      const key = ticker.toUpperCase()
      const list = byTicker.value[key]
      if (!list) return
      byTicker.value = {
        ...byTicker.value,
        [key]: list.filter((w) => w.address !== address),
      }
    }

    /** Drop every stored wallet (parity with Greenery `resetWalletsState`, for the logout flow). */
    function reset(): void {
      byTicker.value = {}
    }

    return {
      // state
      byTicker,
      // getters
      walletsFor,
      count,
      // actions
      addWallet,
      addFromMnemonic,
      generateAndAddWallet,
      removeWallet,
      reset,
    }
  },
  {
    persist: { key: PERSIST_KEY, pick: ['byTicker'] },
  },
)
