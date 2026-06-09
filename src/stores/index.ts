/**
 * Pinia bootstrap for Sparkplate.Fresh.
 *
 * Implements Phase 0 of `docs/methodologies/06032026.methodology.vuex.to.pinia.store.conversion.md`:
 * a single `createPinia()` instance with `pinia-plugin-persistedstate` registered globally.
 *
 * The persistedstate plugin replaces Greenery's `vuex-persistedstate` (SecureLS) and, via its
 * built-in `storage` event handling, the `vuex-shared-mutations` cross-window sync — mirroring the
 * pattern already used by `src/composables/useDashboardCurrencies.ts`.
 *
 * Stores opt in to persistence individually with `{ persist: { key, pick: [...] } }`. Stores whose
 * data is already owned by a `localStorage`-backed service (e.g. the address book under
 * `src/services/addressBook/*`) intentionally do NOT enable `persist`, to avoid double-persisting the
 * same data under two keys (see the address-book persistence finding, 06032026).
 */
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
