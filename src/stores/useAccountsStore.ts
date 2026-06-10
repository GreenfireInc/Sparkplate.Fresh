/**
 * useAccountsStore — Pinia setup store for the active user / account session.
 *
 * Phase 1 "foundational store" of `docs/methodologies/06032026.methodology.vuex.to.pinia.store.conversion.md`
 * (§7 Phase 1: "`useAccountsStore` (state + `user`; defer `signup/login` crypto to Phase 4)").
 *
 * It absorbs the pre-existing `src/composables/useAuth.ts` singleton into a single source of truth — the
 * same pattern `useSettingsStore` used for `useMenuState` / `useDashboardCurrencies`. `useAuth.ts` is now
 * a thin shim delegating here, so its consumers (`App.vue`, `dropdown.authentication.vue`,
 * `LoginStandard.vue`, `UserModal.vue`, `tab.Settings.User.vue`) are unchanged.
 *
 * Vuex → Pinia mapping (Greenery `accountsModule`):
 *   - `state.active`                         → `active` ref (the logged-in user; was `useAuth.currentUser`)
 *   - `state.all`                            → `all` ref (selectable users; was `useAuth.mockUsers`)
 *   - `state.authenticated`                  → `authenticated` ref
 *   - `state.ip`                             → `ip` ref (reserved; `fetchIP` deferred to Phase 4)
 *   - mutations `setCurrentUser`/`setAuthenticated`/`setAllUsers`/`addUser`/`resetAccountState`
 *                                            → same-named actions (mutate refs directly)
 *   - root `user` getter / mixin `loggedIn` / `loggedUserData` → `user` / `loggedIn` getters
 *
 * Persistence: NOT persisted — matching Greenery (only `settings`/`coins` were persisted, never accounts)
 * and the current `useAuth` behavior (auth state resets on reload). The real `signup`/`login` crypto and
 * `fetchIP` remain a Phase 4 concern gated on the account/crypto bridges.
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface User {
  id: number
  name: string
  email: string
}

/** Built-in selectable users (was `useAuth.mockUsers`). Real account loading is a Phase 4 concern. */
const MOCK_USERS: User[] = [
  { id: 1, name: 'Goldie', email: 'goldie@greenfire.io' },
  { id: 2, name: 'Francis', email: 'francis@greenfire.io' },
  { id: 3, name: 'Elizabeth', email: 'elizabeth@greenfire.io' },
  { id: 4, name: 'Guest', email: 'guest@greenfire.io' },
]

export const useAccountsStore = defineStore('accounts', () => {
  // ── state ──────────────────────────────────────────────────────────────────
  const active = ref<User | null>(null)
  const all = ref<User[]>([...MOCK_USERS])
  const authenticated = ref(false)
  /** Reserved for the Phase 4 `fetchIP` bridge (Greenery `accounts.ip`). */
  const ip = ref<string>('')

  // ── getters (Greenery root `user` / mixin `loggedIn` / `loggedUserData`) ─────
  const user = computed<User | null>(() => active.value)
  const loggedIn = computed<boolean>(() => authenticated.value)

  // ── actions ──────────────────────────────────────────────────────────────────
  function login(target: User): void {
    active.value = target
    authenticated.value = true
  }
  function logout(): void {
    active.value = null
    authenticated.value = false
  }
  function setCurrentUser(target: User | null): void {
    active.value = target
  }
  function setAuthenticated(value: boolean): void {
    authenticated.value = value
  }
  function setAllUsers(users: User[]): void {
    all.value = users
  }
  function addUser(target: User): void {
    if (!all.value.some((u) => u.id === target.id)) {
      all.value = [...all.value, target]
    }
  }
  /** Restore defaults (parity with Greenery `resetAccountState`, for the logout flow). */
  function reset(): void {
    active.value = null
    authenticated.value = false
    all.value = [...MOCK_USERS]
    ip.value = ''
  }

  return {
    // state
    active,
    all,
    authenticated,
    ip,
    // getters
    user,
    loggedIn,
    // actions
    login,
    logout,
    setCurrentUser,
    setAuthenticated,
    setAllUsers,
    addUser,
    reset,
  }
})
