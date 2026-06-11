/**
 * Centralized logout reset for the Pinia stores.
 *
 * Phase 5 of `docs/methodologies/06032026.methodology.vuex.to.pinia.store.conversion.md`
 * ("Add `store.$reset()` to the logout flow for every store — parity with Greenery `reset*State`"),
 * implemented per §3.1-C of `docs/executions/20260611.execution.vuex.to.pinia.store.conversion.md`.
 *
 * Logout data policy (the §5 open decision):
 *   - **Session-scoped state is always cleared:** the accounts session (active user / `authenticated`)
 *     and the in-memory contacts list. Contacts data on disk is service-owned and untouched — it simply
 *     reloads from `localStorage` on the next mount, so clearing the ref is harmless.
 *   - **Device-level state is retained by default** because it is not the logged-out user's private data
 *     and/or clearing it is undesirable:
 *       - `useSettingsStore` — app-wide UI prefs (menu type / visibility toggles / network); wiping these
 *         on logout would reset the user's chrome.
 *       - `useCoinsStore` — market-data cache; not user-specific, kept as a warm start.
 *       - `useWalletsStore` — public addresses are derived from **discarded** mnemonics, so clearing them
 *         is irreversible. Retained by default; opt in via {@link LogoutResetOptions.clearWallets} for
 *         shared-device privacy. Proper per-user partitioning is a Phase 4 concern.
 *
 * Each `reset()` is a no-op-safe action already defined on its store, so this is the single place the
 * logout flow needs to touch when a new store is added.
 */
import { useAccountsStore } from './useAccountsStore'
import { useContactsStore } from './useContactsStore'
import { useWalletsStore } from './useWalletsStore'
import { useCoinsStore } from './useCoinsStore'
import { useSettingsStore } from './useSettingsStore'

export interface LogoutResetOptions {
  /**
   * Also drop the persisted public wallet addresses (`sparkplate_wallets`). Default `false` — these are
   * derived from discarded seed phrases, so clearing them is irreversible. Enable only for shared-device
   * privacy where leaking the previous user's public addresses matters more than losing them.
   */
  clearWallets?: boolean
  /** Also clear the cached coin market data (`sparkplate_coins`). Default `false` — not user-specific. */
  clearCoins?: boolean
  /** Also reset UI settings (menu / visibility / network). Default `false` — app-wide prefs, not user data. */
  clearSettings?: boolean
}

/**
 * Reset Pinia state for a logout. Clears the session-scoped stores by default; pass options to also
 * clear the retained device-level state. Safe to call from any component event handler (Pinia is active).
 */
export function resetStoresOnLogout(options: LogoutResetOptions = {}): void {
  // Session-scoped — always cleared. `accounts.reset()` is a superset of `logout()` (also clears `ip`).
  useAccountsStore().reset()
  useContactsStore().reset()

  // Device-level — retained unless explicitly opted into.
  if (options.clearWallets) useWalletsStore().reset()
  if (options.clearCoins) useCoinsStore().reset()
  if (options.clearSettings) useSettingsStore().reset()
}
