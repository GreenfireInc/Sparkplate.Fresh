/**
 * useContactsStore — Pinia setup store for the address book Contacts tab.
 *
 * Port of Greenery's Vuex `contacts` module (`greenery/src/store/contactModule.js`) following
 * `docs/methodologies/06032026.methodology.vuex.to.pinia.store.conversion.md` (Phase 2/3).
 *
 * IMPORTANT — single source of truth for persistence:
 * Per the address-book persistence finding (`docs/findings/06032026.sparkplate.findings.addressbook.localStorage.persistence.md`),
 * contact data is already owned by the `localStorage`-backed services under `src/services/addressBook/*`
 * (`sparkplate.addressbook.contacts.v1`, `sparkplate.addressbook.wallets.v1`). This store therefore
 * thinly wraps those services and deliberately does NOT enable `persist`, so we never double-persist
 * the same data under a second Pinia key (methodology §3.5, finding §"Practical implications").
 *
 * Vuex → Pinia mapping applied here:
 *   - `state.list`                         → `contacts` ref (display rows incl. per-contact wallet count)
 *   - getter `getContactById(id)`          → `getContactById` computed factory
 *   - getter `contactWalletCount(id)`      → folded into each row's `wallets` count on load
 *   - action `loadContacts`                → `loadContacts()` (delegates to the Contact + Wallet services)
 *   - actions `dropDownContacts` / `importContacts` / `importVcardContact` → `importRows(rows)`
 *   - action `insertContact` / `updateContact` → `saveContact(contact)`
 *   - action `removeContactById`           → `removeContacts(ids)`
 *   - mutation `resetContactsState`        → `reset()` (clears in-memory list only; see note)
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
  type Contact,
} from '@/services/addressBook/service.addressBook.Contact'
import {
  addWallet,
  getWalletCountForContact,
} from '@/services/addressBook/service.addressBook.Wallet'

/** A contact row augmented with its current wallet count for table display. */
export interface DisplayContact extends Contact {
  wallets: number
}

/** Shape accepted by `importRows` — parser/importer output is loosely typed. */
export interface ImportContactRow {
  firstname?: string
  lastname?: string
  company?: string
  email?: string
  notes?: string
  phone?: string
  website?: string
  relationship?: string
  twitter?: string
  linkedin?: string
  instagram?: string
  facebook?: string
  /** Comma-separated `coin://address` pairs, mirroring Greenery's CSV/vCard wallet column. */
  wallets?: string
}

export const useContactsStore = defineStore('contacts', () => {
  // state (was Vuex `state.list`)
  const contacts = ref<DisplayContact[]>([])
  const loading = ref(false)

  // getters
  const count = computed(() => contacts.value.length)
  const getContactById = computed(
    () => (id: number) => contacts.value.find((c) => c.id === id),
  )

  /**
   * Hydrate `contacts` from the service layer, attaching each contact's wallet count.
   * Replaces Greenery `loadContacts` + `contactWalletCount`.
   */
  async function loadContacts(): Promise<void> {
    loading.value = true
    try {
      const dbContacts = await getContacts()
      const display: DisplayContact[] = []
      for (const contact of dbContacts) {
        const walletCount = await getWalletCountForContact(contact.id!)
        display.push({ ...contact, wallets: walletCount })
      }
      contacts.value = display
    } finally {
      loading.value = false
    }
  }

  /**
   * Bulk-add parsed rows (CSV / spreadsheet / vCard), then reload.
   * Mirrors Greenery `dropDownContacts` / `importContacts`: persist each contact via the service,
   * then split the optional `coin://address` wallet column into individual wallet records.
   */
  async function importRows(rows: ImportContactRow[]): Promise<void> {
    for (const c of rows) {
      // Only set optional keys when present so we don't write empty strings into undefined columns.
      const added = await addContact({
        type: 'regular',
        firstname: c.firstname || '',
        lastname: c.lastname || '',
        company: c.company || '',
        email: c.email || '',
        notes: c.notes || '',
        ...(c.phone ? { phone: c.phone } : {}),
        ...(c.website ? { website: c.website } : {}),
        ...(c.relationship ? { relationship: c.relationship } : {}),
        ...(c.twitter ? { twitter: c.twitter } : {}),
        ...(c.linkedin ? { linkedin: c.linkedin } : {}),
        ...(c.instagram ? { instagram: c.instagram } : {}),
        ...(c.facebook ? { facebook: c.facebook } : {}),
      })
      if (c.wallets) {
        for (const wallet of c.wallets.split(',')) {
          const [coinTicker, address] = wallet.split('://')
          if (coinTicker && address) {
            await addWallet({ contactId: added.id!, coinTicker, address })
          }
        }
      }
    }
    await loadContacts()
  }

  /**
   * Insert (no `id`) or update (with `id`) a single contact via the service, then reload.
   * Combines Greenery `insertContact` + `updateContact`.
   */
  async function saveContact(contact: Contact): Promise<void> {
    if (contact.id == null) {
      await addContact(contact)
    } else {
      await updateContact(contact)
    }
    await loadContacts()
  }

  /** Delete one or more contacts by id, then reload. Mirrors Greenery `removeContactById`. */
  async function removeContacts(ids: number[]): Promise<void> {
    for (const id of ids) await deleteContact(id)
    await loadContacts()
  }

  /**
   * Clear the in-memory list (parity with Greenery `resetContactsState`, used on logout).
   * Note: this does NOT clear `localStorage`; the service remains the source of truth. A future
   * `clearAddressBook()` service API would be required to wipe persisted data (see finding §Logout/reset).
   */
  function reset(): void {
    contacts.value = []
  }

  return {
    // state
    contacts,
    loading,
    // getters
    count,
    getContactById,
    // actions
    loadContacts,
    importRows,
    saveContact,
    removeContacts,
    reset,
  }
})
