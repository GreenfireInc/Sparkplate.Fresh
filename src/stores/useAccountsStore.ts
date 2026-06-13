/**
 * useAccountsStore — Pinia setup store for the active user / account session.
 *
 * Phase 1 "foundational store" of `docs/methodologies/06032026.methodology.vuex.to.pinia.store.conversion.md`
 * (§7 Phase 1: "`useAccountsStore` (state + `user`; defer `signup/login` crypto to Phase 4)").
 *
 * It absorbs the pre-existing `src/composables/useAuth.ts` singleton into a single source of truth — the
 * same pattern `useSettingsStore` used for `useMenuState` / `useDashboardCurrencies`. `useAuth.ts` is now
 * a thin shim delegating here, so its read-only consumers (`App.vue`, `dropdown.authentication.vue`,
 * `tab.Settings.User.vue`) are unchanged; the auth flow (`LoginStandard.vue`, `UserModal.vue`,
 * `01.registration.signUp.vue`) calls this store directly.
 *
 * Real accounts (§9): credential persistence + password hashing live in the service-owned
 * `src/services/account/service.account.User.ts` (the store never holds a hash/salt — only sanitized
 * `PublicUser` profiles), consistent with the contacts "service-owned persistence" decision (§5).
 *
 * Vuex → Pinia mapping (Greenery `accountsModule`):
 *   - `state.active`                         → `active` ref (the logged-in user; was `useAuth.currentUser`)
 *   - `state.all`                            → `all` ref (saved users; loaded from the account service)
 *   - `state.authenticated`                  → `authenticated` ref
 *   - `state.ip`                             → `ip` ref (reserved; `fetchIP` deferred to Phase 4)
 *   - actions `signup`/`login`               → `signup()` / `authenticate()` (service-backed)
 *   - mutations `setCurrentUser`/`setAuthenticated`/`setAllUsers`/`resetAccountState`
 *                                            → same-named actions (mutate refs directly)
 *   - root `user` getter / mixin `loggedIn` / `loggedUserData` → `user` / `loggedIn` getters
 *
 * Persistence: the store enables NO `persist` — matching Greenery (only `settings`/`coins` were persisted,
 * never accounts) and the current `useAuth` (session resets on reload). Accounts themselves persist via the
 * service's `localStorage` key. The account's recovery phrase and precomputed BIP-39 seed buffer
 * live in session only (`mnemonic`, `hdWallet`) — set at signup, restored at login — and power HD
 * wallet derivation on the Dashboard (`getActiveMnemonic` / `getActiveSeed`). `fetchIP` remains
 * a Phase 4 concern.
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  createUser,
  decryptMnemonic,
  listUsers,
  verifyLogin,
  type CreateUserInput,
  type PublicUser,
} from '@/services/account/service.account.User'
import {
  createHDWalletContext,
  type HDWalletContext,
} from '@/services/wallet/service.wallet.HDWallet'

export interface User {
  id: number
  name: string
  email: string
  firstName?: string
  lastName?: string
}

/** Map the service's credential-free profile to the store's display-oriented `User`. */
function toUser(pub: PublicUser): User {
  return {
    id: pub.id,
    name: `${pub.firstName} ${pub.lastName}`.trim() || pub.email,
    email: pub.email,
    firstName: pub.firstName,
    lastName: pub.lastName,
  }
}

export const useAccountsStore = defineStore('accounts', () => {
  // ── state ──────────────────────────────────────────────────────────────────
  const active = ref<User | null>(null)
  const all = ref<User[]>([])
  const authenticated = ref(false)
  /** Reserved for the Phase 4 `fetchIP` bridge (Greenery `accounts.ip`). */
  const ip = ref<string>('')
  /**
   * The active account's decrypted BIP-39 recovery phrase, held in memory for the session only.
   * Kept in sync with {@link hdWallet}; prefer `getActiveMnemonic()` / `getActiveSeed()`.
   */
  const mnemonic = ref<string | null>(null)
  /**
   * Greenery `accounts.hdWallet` equivalent — phrase + precomputed 64-byte seed (PBKDF2 run once at
   * signup/login). Session only; never persisted.
   */
  const hdWallet = ref<HDWalletContext | null>(null)

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
    mnemonic.value = null
    hdWallet.value = null
  }

  /**
   * Precompute the BIP-39 seed buffer and install session HD context (Greenery login/signup path).
   * Clears both refs when phrase is empty or invalid.
   */
  async function setHDWalletFromPhrase(phrase: string, email: string): Promise<void> {
    const trimmed = phrase?.trim()
    if (!trimmed) {
      mnemonic.value = null
      hdWallet.value = null
      return
    }
    hdWallet.value = await createHDWalletContext(trimmed, email)
    mnemonic.value = hdWallet.value.getPhrase()
  }

  /** The active account's recovery phrase (or `null` when unavailable). */
  function getActiveMnemonic(): string | null {
    return hdWallet.value?.getPhrase() ?? mnemonic.value
  }

  /** Precomputed 64-byte BIP-39 seed for the session — use for HD derivation (no repeat PBKDF2). */
  function getActiveSeed(): Buffer | null {
    return hdWallet.value?.getSeed() ?? null
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

  /** Load saved accounts from the service into `all` (credential-free). Safe to call repeatedly. */
  async function loadUsers(): Promise<void> {
    all.value = (await listUsers()).map(toUser)
  }

  /**
   * Create a real account (service hashes + persists the password), refresh `all`, and auto-login.
   * Throws on duplicate email / missing fields — callers surface the message.
   */
  async function signup(input: CreateUserInput): Promise<User> {
    const created = await createUser(input)
    await loadUsers()
    const user = toUser(created)
    login(user)
    if (input.mnemonic?.trim()) {
      await setHDWalletFromPhrase(input.mnemonic, created.email)
    } else {
      mnemonic.value = null
      hdWallet.value = null
    }
    return user
  }

  /** Verify credentials via the service and log in on success. Returns `false` on bad email/password. */
  async function authenticate(email: string, password: string): Promise<boolean> {
    const verified = await verifyLogin(email, password)
    if (!verified) return false
    login(toUser(verified))
    const phrase = await decryptMnemonic(email, password)
    if (phrase) {
      await setHDWalletFromPhrase(phrase, email)
    } else {
      mnemonic.value = null
      hdWallet.value = null
    }
    return true
  }

  /** Clear the in-memory session (parity with Greenery `resetAccountState`). Saved accounts are
   * service-owned and untouched — mirroring the contacts `reset()` decision (§5). */
  function reset(): void {
    active.value = null
    authenticated.value = false
    ip.value = ''
    mnemonic.value = null
    hdWallet.value = null
  }

  return {
    // state
    active,
    all,
    authenticated,
    ip,
    mnemonic,
    hdWallet,
    // getters
    user,
    loggedIn,
    // actions
    login,
    logout,
    getActiveMnemonic,
    getActiveSeed,
    setHDWalletFromPhrase,
    setCurrentUser,
    setAuthenticated,
    setAllUsers,
    loadUsers,
    signup,
    authenticate,
    reset,
  }
})
