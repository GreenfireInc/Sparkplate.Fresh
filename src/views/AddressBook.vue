<template>
  <div class="ab-view">

    <!-- View header -->
    <header class="ab-view__header">
      <TooltipProvider>
        <TooltipRoot :delay-duration="300">
          <TooltipTrigger as-child>
            <h1 class="ab-view__title" tabindex="0">
              <NotebookTabs :size="22" class="ab-view__title-icon" aria-hidden="true" />
              Address Book
            </h1>
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent
              class="ab-view__tooltip"
              side="bottom"
              align="start"
              :side-offset="6"
              :collision-padding="16"
              :avoid-collisions="true"
            >
              Manage contacts, wallet addresses, companies, and file imports in one place.
              <TooltipArrow class="ab-view__tooltip-arrow" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </TooltipProvider>
    </header>

    <!-- Toolbar -->
    <div class="ab-view__toolbar">
      <div class="ab-view__actions">
        <button type="button" class="ab-btn" @click="handleAddClick">
          <component
            :is="addButton.icon"
            :size="18"
            class="ab-btn__icon"
            aria-hidden="true"
          />
          {{ addButton.label }}
        </button>
        <ImportButton
          :label="importButton.label"
          :variant="importButton.variant"
          @contacts-imported="addContacts"
          @companies-imported="addContacts"
          @wallets-imported="onWalletsImported"
          @exchanges-imported="onExchangesImported"
        />
        <ExportButton
          :label="exportButton.label"
          :variant="exportButton.variant"
          :contacts="contacts"
          :exchanges="exchanges"
          :wallets="wallets"
        />
      </div>

      <div class="ab-view__search-field">
        <!-- <Label for="ab-search" class="ab-view__search-label">Search contacts</Label> -->
        <input
          id="ab-search"
          v-model="searchQuery"
          type="search"
          class="ab-view__search-input"
          placeholder="Search by name, company, or email…"
          autocomplete="off"
        />
      </div>
    </div>

    <Separator class="ab-view__separator" />

    <!-- Tabs + table -->
    <section class="ab-view__section" aria-label="Address book">
      <TabsRoot v-model="activeTab" class="ab-tabs">
        <TabsList class="ab-tabs__list" aria-label="Address book categories">
          <TabsTrigger
            v-for="tab in tabs"
            :key="tab"
            :value="tab"
            class="ab-tabs__trigger"
          >
            {{ tab }}
          </TabsTrigger>
        </TabsList>

        <div class="ab-table-shell">
          <div class="ab-scroll-area">
            <!-- tab.addressBook.Contact renders its own TabsContent internally -->
            <ContactsTab
              v-model:selected-contacts="selectedContacts"
              :paginated-contacts="paginatedContacts"
              :is-current-page-selected="isCurrentPageSelected"
              :sort-key="sortKey"
              :sort-order="sortOrder"
              @sort="sortBy"
              @select-all="selectAllContacts"
              @open-contact="openContactDetailsModal"
              @add-currency-request="onAddCurrencyRequest"
              @generate-qrcode-png="onGenerateQrCodePng"
              @generate-qrcode-svg="onGenerateQrCodeSvg"
              @export-csv="onExportCsv"
              @export-vcf="onExportVcf"
            />

            <TabsContent value="Exchanges" class="ab-tabs__panel">
              <ExchangeTab :exchanges="exchanges" @exchanges-changed="loadExchanges" />
            </TabsContent>

            <TabsContent value="Wallets" class="ab-tabs__panel">
              <WalletTab :wallets="wallets" @wallets-changed="loadStandaloneWallets" />
            </TabsContent>

            <CompaniesTab ref="companiesTabRef" />
          </div>

          <!-- Footer: sibling of scroll area inside the card — never inside the scroll -->
          <div class="ab-table-footer">
            <div class="ab-table-footer__left">
              <button
                v-if="activeTab === 'Contacts' && selectedContacts.length > 0"
                type="button"
                class="ab-btn ab-btn--danger"
                @click="confirmDeleteSelectedContacts"
              >
                Delete selected
              </button>
            </div>
            <div class="ab-table-footer__right">
              <span v-if="activeTab === 'Contacts'" class="ab-table-footer__count">
                {{ firstItemIndex }}–{{ lastItemIndex }} of {{ filteredContacts.length }}
              </span>
              <span v-else class="ab-table-footer__count">0–0 of 0</span>
              <div class="ab-table-footer__pagination">
                <button
                  type="button"
                  class="ab-page-btn"
                  :disabled="activeTab !== 'Contacts' || currentPage === 1 || filteredContacts.length === 0"
                  aria-label="Previous page"
                  @click="prevPage"
                >
                  <ChevronLeft :size="18" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  class="ab-page-btn"
                  :disabled="activeTab !== 'Contacts' || currentPage === totalPages || filteredContacts.length === 0"
                  aria-label="Next page"
                  @click="nextPage"
                >
                  <ChevronRight :size="18" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </TabsRoot>
    </section>

    <!-- Modals -->
    <AddContactModal
      :show="showAddContactModal"
      :contact="selectedContactForEdit"
      :initial-entity="initialEntityForAdd"
      @close="closeAddContactModal"
      @contact-saved="loadContacts"
      @exchange-saved="onExchangeSaved"
      @external-wallet-saved="onExternalWalletSaved"
    />
    <ContactDetailsModal
      :show="showContactDetailsModal"
      :contact="selectedContactForDetails"
      @close="closeContactDetailsModal"
    />
    <AddCurrencyModal
      v-if="selectedContactForCurrency?.id"
      :show="showAddCurrencyModal"
      :contact-id="selectedContactForCurrency.id"
      @close="showAddCurrencyModal = false"
      @currency-added="handleCurrencyAddedFromModal"
    />
    <ModalConfirmDeleteGeneral
      :show="showConfirmModal"
      :title="confirmModalTitle"
      :message="confirmModalMessage"
      @close="closeConfirmModal"
      @confirm="onConfirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import {
  TabsRoot, TabsList, TabsTrigger, TabsContent,
  Separator, Label,
  TooltipProvider, TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow,
} from 'radix-vue'
import { NotebookTabs, SquareUser, Landmark, Wallet, Building2, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import AddContactModal from '@/components/modals/addressbook/modal.add.entry.vue'
import type { ExternalWalletForm } from '@/components/modals/addressbook/transformsFor.add.Entry/form.addEntry.externalWallet.vue'
import ContactDetailsModal from '@/components/modals/addressbook/modal.details.Contact.vue'
import AddCurrencyModal from '@/components/modals/addressbook/subModals/subModal.add.Currency.vue'
import ModalConfirmDeleteGeneral from '@/components/modals/confirmations/modal.confirm.delete.general.vue'
import ImportButton from '@/components/buttons/addressbook/button.addressBook.import.vue'
import ExportButton from '@/components/buttons/addressbook/button.addressBook.export.vue'
import ExchangeTab from '@/components/pageTabs/addressbook/tab.addressBook.Exchange.vue'
import WalletTab from '@/components/pageTabs/addressbook/tab.addressBook.Wallet.vue'
import CompaniesTab from '@/components/pageTabs/addressbook/tab.addressBook.Companies.vue'
import ContactsTab from '@/components/pageTabs/addressbook/tab.addressBook.Contact.vue'
import { getContacts, addContact, deleteContact, type Contact } from '@/services/addressBook/service.addressBook.Contact'
import { addWallet, getWalletCountForContact } from '@/services/addressBook/service.addressBook.Wallet'
import { getExchanges, addExchange, type ExchangeRecord } from '@/services/addressBook/service.addressBook.Exchange'
import {
  getStandaloneWallets,
  addStandaloneWallet,
  type StandaloneWalletRecord,
} from '@/services/addressBook/service.addressBook.StandaloneWallet'
import type { ImportedWallet } from '@/lib/cores/importStandard/importWallet.json'

defineOptions({ name: 'AddressBookView' })

interface DisplayContact extends Contact {
  wallets: number
}

const tabs = ['Contacts', 'Exchanges', 'Wallets', 'Companies'] as const
const activeTab = ref<(typeof tabs)[number]>('Contacts')
const contacts = ref<DisplayContact[]>([] as DisplayContact[])
const exchanges = ref<ExchangeRecord[]>([])
const wallets = ref<StandaloneWalletRecord[]>([])

const showAddContactModal = ref(false)
const showContactDetailsModal = ref(false)
const selectedContactForEdit = ref<Contact | null>(null)
type AddEntity = 'Contacts' | 'Exchanges' | 'Wallets' | 'Companies'
const initialEntityForAdd = ref<AddEntity>('Contacts')
const selectedContactForDetails = ref<Contact | null>(null)
const selectedContacts = ref<number[]>([])
const currentPage = ref(1)
const itemsPerPage = 25
const searchQuery = ref('')
const showConfirmModal = ref(false)
const confirmModalTitle = ref('')
const confirmModalMessage = ref('')
const contactsToDelete = ref<number[]>([])
const sortKey = ref<keyof DisplayContact>('id')
const sortOrder = ref<'asc' | 'dsc'>('asc')
const showAddCurrencyModal = ref(false)
const selectedContactForCurrency = ref<Contact | null>(null)

/** Refreshes `CompaniesTab` (companies are derived from contacts via `getCompanies`). */
const companiesTabRef = ref<{ loadCompanies: () => Promise<void> } | null>(null)

onMounted(async () => {
  await loadContacts()
  await loadExchanges()
  await loadStandaloneWallets()
})

async function loadContacts() {
  const dbContacts = await getContacts()
  const displayContacts: DisplayContact[] = []
  for (const contact of dbContacts) {
    const walletCount = await getWalletCountForContact(contact.id!)
    displayContacts.push({ ...contact, wallets: walletCount })
  }
  contacts.value = displayContacts
  closeConfirmModal()
  await nextTick()
  await companiesTabRef.value?.loadCompanies?.()
}

async function loadExchanges() {
  exchanges.value = await getExchanges()
}

async function loadStandaloneWallets() {
  wallets.value = await getStandaloneWallets()
}

const filteredContacts = computed(() => {
  if (!searchQuery.value) return contacts.value
  const q = searchQuery.value.toLowerCase()
  return contacts.value.filter(
    (c) =>
      c.firstname.toLowerCase().includes(q) ||
      c.lastname.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q),
  )
})

const sortedContacts = computed(() => {
  const key = sortKey.value
  const order = sortOrder.value
  return [...filteredContacts.value].sort((a, b) => {
    if (a[key] === b[key]) return 0
    return order === 'asc' ? (a[key] > b[key] ? 1 : -1) : a[key] < b[key] ? 1 : -1
  })
})

watch(searchQuery, () => { currentPage.value = 1 })

const totalPages = computed(() => Math.ceil(sortedContacts.value.length / itemsPerPage))

const paginatedContacts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return sortedContacts.value.slice(start, start + itemsPerPage)
})

const firstItemIndex = computed(() =>
  sortedContacts.value.length > 0 ? (currentPage.value - 1) * itemsPerPage + 1 : 0,
)
const lastItemIndex = computed(() =>
  Math.min(currentPage.value * itemsPerPage, sortedContacts.value.length),
)

const isCurrentPageSelected = computed(() => {
  const ids = paginatedContacts.value.map((c) => c.id as number)
  return ids.length > 0 && ids.every((id) => selectedContacts.value.includes(id))
})

const addContacts = async (newContacts: any[]) => {
  for (const c of newContacts) {
    const added = await addContact({
      type: 'regular',
      firstname: c.firstname || '',
      lastname: c.lastname || '',
      company: c.company || '',
      email: c.email || '',
      notes: c.notes || '',
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

const selectAllContacts = (event: Event) => {
  const target = event.target as HTMLInputElement
  const ids = paginatedContacts.value.map((c) => c.id as number)
  if (target.checked) {
    selectedContacts.value = [...new Set([...selectedContacts.value, ...ids])]
  } else {
    selectedContacts.value = selectedContacts.value.filter((id) => !ids.includes(id))
  }
}

const confirmDeleteSelectedContacts = () => {
  contactsToDelete.value = selectedContacts.value
  confirmModalTitle.value = 'Delete Selected Contacts'
  confirmModalMessage.value = `Are you sure you want to delete the ${selectedContacts.value.length} selected contacts?`
  showConfirmModal.value = true
}

const onConfirmDelete = async () => {
  for (const id of contactsToDelete.value) await deleteContact(id)
  selectedContacts.value = []
  await loadContacts()
}

const openAddContactModal = (
  contact: Contact | null = null,
  entity: AddEntity = 'Contacts',
) => {
  selectedContactForEdit.value = contact
  initialEntityForAdd.value = entity
  showAddContactModal.value = true
}

const addButton = computed(() => {
  switch (activeTab.value) {
    case 'Exchanges':
      return { label: 'Add Exchange', icon: Landmark, action: 'exchange' as const }
    case 'Wallets':
      return { label: 'Add Wallets', icon: Wallet, action: 'wallet' as const }
    case 'Companies':
      return { label: 'Add Companies', icon: Building2, action: 'company' as const }
    case 'Contacts':
    default:
      return { label: 'Add contact', icon: SquareUser, action: 'contact' as const }
  }
})

const importButton = computed(() => {
  switch (activeTab.value) {
    case 'Exchanges':
      return { label: 'Import Exchanges', variant: 'exchanges' as const }
    case 'Wallets':
      return { label: 'Import Wallets', variant: 'wallets' as const }
    case 'Companies':
      return { label: 'Import Companies', variant: 'companies' as const }
    case 'Contacts':
    default:
      return { label: 'Import Contacts', variant: 'contacts' as const }
  }
})

const exportButton = computed(() => {
  switch (activeTab.value) {
    case 'Exchanges':
      return { label: 'Export Exchanges', variant: 'exchanges' as const }
    case 'Wallets':
      return { label: 'Export Wallets', variant: 'wallets' as const }
    case 'Companies':
      return { label: 'Export Companies', variant: 'companies' as const }
    case 'Contacts':
    default:
      return { label: 'Export Contacts', variant: 'contacts' as const }
  }
})

const handleAddClick = () => {
  switch (addButton.value.action) {
    case 'contact':
      openAddContactModal(null, 'Contacts')
      break
    case 'exchange':
      openAddContactModal(null, 'Exchanges')
      break
    case 'wallet':
      openAddContactModal(null, 'Wallets')
      break
    case 'company':
      openAddContactModal(null, 'Companies')
      break
  }
}

async function onExchangeSaved(exchange: Omit<ExchangeRecord, 'id'>) {
  await addExchange(exchange)
  await loadExchanges()
}

async function onExternalWalletSaved(payload: ExternalWalletForm) {
  const mnemonicHint = [payload.mnemonicFirst, payload.mnemonicLast]
    .filter((s) => s?.trim())
    .join(' · ')
    .trim()
  const nameParts = [payload.wallet?.trim(), mnemonicHint].filter(Boolean)
  const label = nameParts.length > 0 ? nameParts.join(' · ') : 'External wallet'
  await addStandaloneWallet({
    name: label,
    mnemonicWordCount: payload.mnemonicWordCount,
    mnemonicFirst: payload.mnemonicFirst,
    mnemonicLast: payload.mnemonicLast,
    notes: payload.notes,
    passwordHint: payload.passwordHint,
    currencies: payload.currencies.map((c) => ({
      name: c.name || c.abbreviation || '',
      abbreviation: c.abbreviation || '',
      address: c.address || '',
    })),
  })
  await loadStandaloneWallets()
}

async function onExchangesImported(list: unknown[]) {
  for (const raw of list) {
    const ex = raw as Partial<Omit<ExchangeRecord, 'id'>>
    if (!ex || typeof ex !== 'object') continue
    await addExchange({
      name: String(ex.name ?? ''),
      url: String(ex.url ?? ''),
      referralUrl: String(ex.referralUrl ?? ''),
      referralCode: String(ex.referralCode ?? ''),
      email: String(ex.email ?? ''),
      notes: String(ex.notes ?? ''),
      currencies: Array.isArray(ex.currencies)
        ? (ex.currencies as unknown[]).map((cur) => {
            const c = cur as Partial<{ name: string; abbreviation: string; address: string }>
            return {
              name: String(c?.name ?? c?.abbreviation ?? ''),
              abbreviation: String(c?.abbreviation ?? c?.name ?? ''),
              address: String(c?.address ?? ''),
            }
          })
        : [],
    })
  }
  await loadExchanges()
}

async function onWalletsImported(payload: { wallets: ImportedWallet[] }) {
  for (const w of payload.wallets) {
    const ticker = w.coinTicker || 'Wallet'
    await addStandaloneWallet({
      name: ticker,
      currencies: [
        {
          name: ticker,
          abbreviation: ticker,
          address: w.address || '',
        },
      ],
    })
  }
  await loadStandaloneWallets()
}

const closeAddContactModal = () => {
  selectedContactForEdit.value = null
  showAddContactModal.value = false
}

const openContactDetailsModal = (contact: Contact) => {
  selectedContactForDetails.value = contact
  showContactDetailsModal.value = true
}

function onAddCurrencyRequest(contact: Contact) {
  selectedContactForCurrency.value = contact
  showAddCurrencyModal.value = true
}

const closeContactDetailsModal = () => {
  selectedContactForDetails.value = null
  showContactDetailsModal.value = false
}

const closeConfirmModal = () => {
  showConfirmModal.value = false
  contactsToDelete.value = []
}

function sortBy(key: keyof DisplayContact) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'dsc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }

async function handleCurrencyAddedFromModal(currencyData: { contactId: number; network: string; address: string }) {
  await addWallet({
    contactId: currencyData.contactId,
    coinTicker: currencyData.network,
    address: currencyData.address,
  })
  showAddCurrencyModal.value = false
  await loadContacts()
}

function onGenerateQrCodePng(contact: Contact) { console.log(`QR PNG: ${contact.id}`) }
function onGenerateQrCodeSvg(contact: Contact) { console.log(`QR SVG: ${contact.id}`) }
function onExportCsv(contact: Contact) { console.log(`CSV: ${contact.id}`) }
function onExportVcf(contact: Contact) { console.log(`VCF: ${contact.id}`) }
</script>

<style lang="scss" scoped>
/* ── View shell ───────────────────────────────────────────── */
.ab-view {
  width: 100%;
  height: 100%;          /* fill .main-content which is calc(100vh - 4rem) */
  padding: 1.5rem 2rem 0;
  box-sizing: border-box;
  background: #fff;
  font-family: inherit;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ── Header ──────────────────────────────────────────────── */
.ab-view__header {
  margin-bottom: 1.25rem;
}

.ab-view__title {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  cursor: help;
  outline: none;
  border-radius: 0.25rem;

  &:focus-visible {
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #2563eb;
  }
}

.ab-view__title-icon {
  flex-shrink: 0;
  color: #4b5563;
}

.ab-view__tooltip {
  max-width: 22rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  line-height: 1.45;
  color: #f9fafb;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.12), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.ab-view__tooltip-arrow {
  fill: #1f2937;
}

/* ── Toolbar ─────────────────────────────────────────────── */
.ab-view__toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 0.875rem;
  flex-wrap: wrap;
}

.ab-view__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem;
}

.ab-view__search-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: min(100%, 20rem);
}

.ab-view__search-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
  line-height: 1.25;
}

.ab-view__search-input {
  width: 100%;
  padding: 0.55rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #fff;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
  }

  &::placeholder { color: #9ca3af; }
}

/* ── Separator ───────────────────────────────────────────── */
.ab-view__separator {
  display: block;
  height: 1px;
  margin: 0 0 1.25rem;
  background: #e5e7eb;
}

/* ── Section ─────────────────────────────────────────────── */
.ab-view__section {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

/* ── Buttons ─────────────────────────────────────────────── */
.ab-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.45rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background: #fff;
  cursor: pointer;
  color: #1f2937;
  font-weight: 500;
  font-size: 0.8125rem;
  line-height: 1.25;
  font-family: inherit;
  transition: background 0.12s, border-color 0.12s;

  &:hover:not(.ab-btn--danger) { background: #f3f4f6; }
}

.ab-btn__icon { flex-shrink: 0; }

.ab-btn--danger {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;

  &:hover { background: #dc2626; border-color: #dc2626; }
}

/* Pass-through styles for address book import / export buttons */
.ab-view__actions :deep(.btn) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.45rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background: #fff;
  cursor: pointer;
  color: #1f2937;
  font-weight: 500;
  font-size: 0.8125rem;
  line-height: 1.25;
  font-family: inherit;
  transition: background 0.12s;

  &:hover { background: #f3f4f6; }
}

/* ── Tabs ────────────────────────────────────────────────── */
.ab-tabs {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.ab-tabs__list {
  display: flex;
  flex-shrink: 0;
  gap: 0.25rem;
  border-bottom: 1px solid #d1d5db;
  padding: 0 1rem;
}

.ab-tabs__trigger {
  position: relative;
  padding: 0.65rem 1rem;
  border: none;
  background: none;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.15s;

  &:hover { color: #111827; }

  &[data-state='active'] {
    color: #2563eb;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background: #2563eb;
      border-radius: 1px;
    }
  }
}

.ab-tabs__panel {
  padding: 0;
}

/* ── Table shell ─────────────────────────────────────────── */
.ab-table-shell {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

/* Scroll area — single scroll container for both axes so position:sticky on thead works */
.ab-scroll-area {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: auto;
}


/* ── Table footer ────────────────────────────────────────── */
.ab-table-footer {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1rem;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

.ab-table-footer__left {
  min-width: 150px;
}

.ab-table-footer__right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.ab-table-footer__count {
  font-size: 0.875rem;
  color: #6b7280;
  white-space: nowrap;
}

.ab-table-footer__pagination {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.ab-page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #fff;
  color: #374151;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s;

  &:hover:not(:disabled) {
    background: #f3f4f6;
    border-color: #9ca3af;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
}
</style>
