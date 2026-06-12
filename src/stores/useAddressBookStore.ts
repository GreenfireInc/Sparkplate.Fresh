/**
 * useAddressBookStore — Pinia setup store for the address-book entities that are NOT contacts:
 * exchange accounts, standalone wallets, companies (derived), and notes (owner-scoped passthrough).
 *
 * Companion to `useContactsStore`. Greenery's Vuex `contactModule` covered the whole address book; in
 * V2 the Contacts tab already runs through `useContactsStore`, while the Exchange / Wallet / Company /
 * Note tabs still call their services directly. This store brings them under the same Pinia layer,
 * implementing the "Phase 2 — service-backed domain store" step of
 * `docs/methodologies/06032026.methodology.vuex.to.pinia.store.conversion.md` for the remaining address
 * book, as scoped in §3.2 of `docs/executions/20260611.execution.vuex.to.pinia.store.conversion.md`.
 *
 * IMPORTANT — single source of truth for persistence (same rule as `useContactsStore`):
 * Per the address-book persistence finding (`docs/findings/06032026.sparkplate.findings.addressbook.localStorage.persistence.md`),
 * the data is already owned by the `localStorage`-backed services under `src/services/addressBook/*`
 * (`sparkplate.addressbook.exchanges.v1`, `sparkplate.addressbook.standaloneWallets.v1`, the per-owner
 * `notes-*` keys, and — for companies — the contacts key). This store therefore thinly wraps those
 * services and deliberately enables NO `persist`, so the same data is never double-persisted.
 *
 * Modeling notes:
 *   - **Exchanges / standalone wallets** are flat, self-owned lists → held as `exchanges` / `wallets` refs.
 *   - **Companies** are *derived* by the service from contacts (grouped by `contact.company`), so there is
 *     no company slice to persist; `companies` is just the latest projection from `getCompanies()`.
 *   - **Notes** are owner-scoped (per contact/exchange/company/wallet, each its own `localStorage` key), so
 *     they are not a flat list here — the store exposes thin passthrough actions plus the service's reactive
 *     `notesRevision` signal for consumers that need to react to note changes.
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  getExchanges,
  addExchange,
  updateExchange,
  deleteExchange,
  type ExchangeRecord,
} from '@/services/addressBook/service.addressBook.Exchange'
import {
  getStandaloneWallets,
  addStandaloneWallet,
  updateStandaloneWallet,
  deleteStandaloneWallet,
  type StandaloneWalletRecord,
} from '@/services/addressBook/service.addressBook.StandaloneWallet'
import {
  getCompanies,
  deleteCompany,
  type Company,
} from '@/services/addressBook/service.addressBook.Company'
import {
  getNotesForOwnerId,
  addNote as addNoteSvc,
  updateNote as updateNoteSvc,
  deleteNote as deleteNoteSvc,
  notesRevision,
  type Note,
  type NoteOwnerKind,
} from '@/services/addressBook/service.addressBook.Note'

/** Insert (`id` omitted) or update (`id` present) input for the flat list entities. */
export type ExchangeInput = Omit<ExchangeRecord, 'id'> & { id?: number }
export type StandaloneWalletInput = Omit<StandaloneWalletRecord, 'id'> & { id?: number }

export const useAddressBookStore = defineStore('addressBook', () => {
  // ── state (service-owned; not persisted by Pinia) ────────────────────────────
  const exchanges = ref<ExchangeRecord[]>([])
  const wallets = ref<StandaloneWalletRecord[]>([])
  /** Derived from contacts via the Company service; refreshed by `loadCompanies()`. */
  const companies = ref<Company[]>([])
  const loading = ref(false)

  // ── getters ──────────────────────────────────────────────────────────────────
  const exchangeCount = computed(() => exchanges.value.length)
  const walletCount = computed(() => wallets.value.length)
  const companyCount = computed(() => companies.value.length)
  const getExchangeById = computed(
    () => (id: number) => exchanges.value.find((e) => e.id === id),
  )
  const getWalletById = computed(
    () => (id: number) => wallets.value.find((w) => w.id === id),
  )

  // ── exchanges ────────────────────────────────────────────────────────────────
  async function loadExchanges(): Promise<void> {
    exchanges.value = await getExchanges()
  }

  /** Insert (no `id`) or update (with `id`) an exchange account, then reload. */
  async function saveExchange(record: ExchangeInput): Promise<void> {
    if (record.id == null) await addExchange(record)
    else await updateExchange(record as ExchangeRecord)
    await loadExchanges()
  }

  async function removeExchange(id: number): Promise<void> {
    await deleteExchange(id)
    await loadExchanges()
  }

  // ── standalone wallets ───────────────────────────────────────────────────────
  async function loadWallets(): Promise<void> {
    wallets.value = await getStandaloneWallets()
  }

  /** Insert (no `id`) or update (with `id`) a standalone wallet, then reload. */
  async function saveWallet(record: StandaloneWalletInput): Promise<void> {
    if (record.id == null) await addStandaloneWallet(record)
    else await updateStandaloneWallet(record as StandaloneWalletRecord)
    await loadWallets()
  }

  async function removeWallet(id: number): Promise<void> {
    await deleteStandaloneWallet(id)
    await loadWallets()
  }

  // ── companies (derived from contacts) ─────────────────────────────────────────
  async function loadCompanies(): Promise<void> {
    companies.value = await getCompanies()
  }

  /**
   * Delete a company — this removes the underlying company contacts (and their wallets) via the service.
   * Reloads the company projection here; callers showing contacts should also refresh `useContactsStore`.
   */
  async function removeCompany(id: number): Promise<void> {
    await deleteCompany(id)
    await loadCompanies()
  }

  /** Hydrate every owned/derived list in one call. */
  async function loadAll(): Promise<void> {
    loading.value = true
    try {
      await Promise.all([loadExchanges(), loadWallets(), loadCompanies()])
    } finally {
      loading.value = false
    }
  }

  // ── notes (owner-scoped passthroughs; service owns persistence) ───────────────
  function notesFor(ownerId: number, ownerKind: NoteOwnerKind = 'contact'): Promise<Note[]> {
    return getNotesForOwnerId(ownerId, ownerKind)
  }
  function addNote(
    ownerId: number,
    note: Omit<Note, 'id' | 'contactId' | 'createdAt' | 'modifiedAt' | 'isLocked'>,
    ownerKind: NoteOwnerKind = 'contact',
  ): Promise<Note> {
    return addNoteSvc(ownerId, note, ownerKind)
  }
  function updateNote(
    ownerId: number,
    noteId: string,
    updates: Partial<Note>,
    ownerKind: NoteOwnerKind = 'contact',
  ): Promise<Note | null> {
    return updateNoteSvc(ownerId, noteId, updates, ownerKind)
  }
  function deleteNote(
    ownerId: number,
    noteId: string,
    ownerKind: NoteOwnerKind = 'contact',
  ): Promise<void> {
    return deleteNoteSvc(ownerId, noteId, ownerKind)
  }

  /**
   * Clear the in-memory lists (parity with the contacts `reset()`, used on logout). Does NOT clear
   * `localStorage`; the services remain the source of truth and rehydrate on the next `load*()`.
   */
  function reset(): void {
    exchanges.value = []
    wallets.value = []
    companies.value = []
  }

  return {
    // state
    exchanges,
    wallets,
    companies,
    loading,
    // reactive note-change signal (re-exported from the Note service)
    notesRevision,
    // getters
    exchangeCount,
    walletCount,
    companyCount,
    getExchangeById,
    getWalletById,
    // actions — exchanges
    loadExchanges,
    saveExchange,
    removeExchange,
    // actions — standalone wallets
    loadWallets,
    saveWallet,
    removeWallet,
    // actions — companies (derived)
    loadCompanies,
    removeCompany,
    // aggregate
    loadAll,
    // actions — notes (owner-scoped passthroughs)
    notesFor,
    addNote,
    updateNote,
    deleteNote,
    // lifecycle
    reset,
  }
})
