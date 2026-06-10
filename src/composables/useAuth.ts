/**
 * useAuth — thin shim over `useAccountsStore` (Pinia).
 *
 * The account/session state moved into `src/stores/useAccountsStore.ts` as part of Phase 1 of the
 * Vuex→Pinia migration (`docs/methodologies/06032026.methodology...md`). This composable is kept so
 * existing consumers (`App.vue`, `dropdown.authentication.vue`, `LoginStandard.vue`, `UserModal.vue`,
 * `tab.Settings.User.vue`) need no change — it preserves the original return shape.
 *
 * NOTE: like every store-backed composable, this must be called from within `setup()` / `<script setup>`
 * (where an active Pinia instance exists), which is already the case for all current callers.
 */
import { storeToRefs } from 'pinia'
import { useAccountsStore, type User } from '@/stores/useAccountsStore'

export type { User }

export function useAuth() {
  const store = useAccountsStore()
  const { active, authenticated } = storeToRefs(store)

  return {
    isAuthenticated: authenticated,
    currentUser: active,
    mockUsers: store.all,
    login: store.login,
    logout: store.logout,
  }
}
