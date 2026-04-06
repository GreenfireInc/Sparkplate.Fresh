<template>
  <div class="ab-page" :class="{ 'ab-page--embedded': embedded }">
    <div class="ab-page__toolbar">
      <h1 v-if="!embedded" class="ab-page__title">
        <NotebookTabs :size="24" class="ab-page__title-icon" aria-hidden="true" />
        Address Book
      </h1>
      <div class="ab-page__actions">
        <button type="button" class="ab-btn" @click="openAddContactModal(null)">
          <SquareUser :size="18" class="ab-btn__icon" aria-hidden="true" />
          Add contact
        </button>
        <ImportButton @contacts-imported="addContacts" />
        <ExportButton :contacts="contacts" />
      </div>
    </div>

    <Separator class="ab-page__separator" />

    <div class="ab-page__search-row">
      <div class="ab-page__search-field">
        <Label for="ab-search" class="ab-page__search-label">Search contacts</Label>
        <input
          id="ab-search"
          v-model="searchQuery"
          type="search"
          class="ab-page__search-input"
          placeholder="Search by name, company, or email…"
          autocomplete="off"
        />
      </div>
    </div>

    <TabsRoot v-model="activeTab" class="ab-page__tabs">
      <TabsList class="ab-page__tab-list" aria-label="Address book categories">
        <TabsTrigger
          v-for="tab in tabs"
          :key="tab"
          :value="tab"
          class="ab-page__tab-trigger"
        >
          {{ tab }}
        </TabsTrigger>
      </TabsList>

      <div class="ab-page__table-shell">
        <div class="ab-page__table-scroll">
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

          <TabsContent value="Exchanges" class="ab-page__tab-panel">
            <ExchangeTab :exchanges="exchanges" />
          </TabsContent>

          <TabsContent value="Wallets" class="ab-page__tab-panel">
            <WalletTab :wallets="wallets" />
          </TabsContent>

          <TabsContent value="Companies" class="ab-page__tab-panel">
            <CompaniesTab />
          </TabsContent>
        </div>

        <div class="ab-page__footer">
          <div class="ab-page__footer-left">
            <button
              v-if="activeTab === 'Contacts' && selectedContacts.length > 0"
              type="button"
              class="ab-btn ab-btn--danger"
              @click="confirmDeleteSelectedContacts"
            >
              Delete selected
            </button>
          </div>
          <div class="ab-page__footer-right">
            <span v-if="activeTab === 'Contacts'" class="ab-page__footer-text">
              {{ firstItemIndex }}–{{ lastItemIndex }} of {{ filteredContacts.length }}
            </span>
            <span v-else class="ab-page__footer-text">0–0 of 0</span>
            <div class="ab-page__pagination">
              <button
                type="button"
                class="ab-page__page-btn"
                :disabled="activeTab !== 'Contacts' || currentPage === 1 || filteredContacts.length === 0"
                aria-label="Previous page"
                @click="prevPage"
              >
                <ChevronLeft :size="18" aria-hidden="true" />
              </button>
              <button
                type="button"
                class="ab-page__page-btn"
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

    <AddContactModal :show="showAddContactModal" :contact="selectedContactForEdit" @close="closeAddContactModal" @contact-saved="loadContacts" />
    <ContactDetailsModal :show="showContactDetailsModal" :contact="selectedContactForDetails" @close="closeContactDetailsModal" />
    <AddCurrencyModal
      v-if="selectedContactForCurrency?.id"
      :show="showAddCurrencyModal"
      :contact-id="selectedContactForCurrency.id"
      @close="showAddCurrencyModal = false"
      @currency-added="handleCurrencyAddedFromModal"
    />
    <ConfirmModal
      :show="showConfirmModal"
      :title="confirmModalTitle"
      :message="confirmModalMessage"
      @close="closeConfirmModal"
      @confirm="onConfirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
  Label,
} from 'radix-vue'
import AddContactModal from './modals/addContact.vue'
import ContactDetailsModal from './modals/ContactDetailsModal.vue'
import AddCurrencyModal from './modals/AddCurrencyModal.vue'
import ConfirmModal from './modals/ConfirmModal.vue'
import ImportButton from './ImportButton.vue'
import ExportButton from './ExportButton.vue'
import ExchangeTab from '@/components/pageTabs/addressbook/ExchangeTab.vue'
import WalletTab from '@/components/pageTabs/addressbook/WalletTab.vue'
import CompaniesTab from '@/components/pageTabs/addressbook/CompaniesTab.vue'
import ContactsTab from '@/components/pageTabs/addressbook/ContactsTab.vue'
import { NotebookTabs, SquareUser, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { getContacts, addContact, deleteContact, type Contact } from '@/services/addressBook/contactService'
import { addWallet, getWalletCountForContact } from '@/services/addressBook/walletService'

defineOptions({ name: 'AddressBookPage' })

withDefaults(defineProps<{ embedded?: boolean }>(), { embedded: false })

interface DisplayContact extends Contact {
  wallets: number
}

interface Currency {
  name: string
  abbreviation: string
  address: string
}

interface Exchange {
  id: number
  name: string
  url: string
  referralUrl: string
  referralCode: string
  currencies: Currency[]
  email: string
}

interface Wallet {
  id: number
  name: string
  currencies: Currency[]
}

const tabs = ['Contacts', 'Exchanges', 'Wallets', 'Companies'] as const
const activeTab = ref<(typeof tabs)[number]>('Contacts')
const contacts = ref<DisplayContact[]>([] as DisplayContact[])
const exchanges = ref<Exchange[]>([
  {
    id: 1,
    name: 'Binance',
    url: 'https://www.binance.com',
    referralUrl: 'https://www.binance.com/en/register?ref=12345',
    referralCode: '12345',
    currencies: [
      { name: 'Bitcoin', abbreviation: 'BTC', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
      { name: 'Ethereum', abbreviation: 'ETH', address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe' },
    ],
    email: 'test@example.com',
  },
])
const wallets = ref<Wallet[]>([
  {
    id: 1,
    name: 'MetaMask',
    currencies: [
      { name: 'Ethereum', abbreviation: 'ETH', address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe' },
      { name: 'Binance Coin', abbreviation: 'BNB', address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe' },
    ],
  },
])
const showAddContactModal = ref(false)
const showContactDetailsModal = ref(false)
const selectedContactForEdit = ref<Contact | null>(null)
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

onMounted(async () => {
  await loadContacts()
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
}

const filteredContacts = computed(() => {
  if (!searchQuery.value) {
    return contacts.value
  }
  const lowerCaseQuery = searchQuery.value.toLowerCase()
  return contacts.value.filter((contact) => {
    return (
      contact.firstname.toLowerCase().includes(lowerCaseQuery) ||
      contact.lastname.toLowerCase().includes(lowerCaseQuery) ||
      contact.company.toLowerCase().includes(lowerCaseQuery) ||
      contact.email.toLowerCase().includes(lowerCaseQuery)
    )
  })
})

const sortedContacts = computed(() => {
  const key = sortKey.value
  const order = sortOrder.value
  return [...filteredContacts.value].sort((a, b) => {
    const aValue = a[key]
    const bValue = b[key]

    if (aValue === bValue) {
      return 0
    }

    if (order === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
})

watch(searchQuery, () => {
  currentPage.value = 1
})

const totalPages = computed(() => Math.ceil(sortedContacts.value.length / itemsPerPage))

const paginatedContacts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return sortedContacts.value.slice(start, end)
})

const firstItemIndex = computed(() => (sortedContacts.value.length > 0 ? (currentPage.value - 1) * itemsPerPage + 1 : 0))
const lastItemIndex = computed(() => Math.min(currentPage.value * itemsPerPage, sortedContacts.value.length))

const isCurrentPageSelected = computed(() => {
  const visibleContactIds = paginatedContacts.value.map((c) => c.id as number)
  if (visibleContactIds.length === 0) return false
  return visibleContactIds.every((id) => selectedContacts.value.includes(id))
})

const addContacts = async (newContacts: any[]) => {
  for (const c of newContacts) {
    const newContact: Contact = {
      type: 'regular',
      firstname: c.firstname || '',
      lastname: c.lastname || '',
      company: c.company || '',
      email: c.email || '',
      notes: c.notes || '',
    }
    const addedContact = await addContact(newContact)
    if (c.wallets) {
      for (const wallet of c.wallets.split(',')) {
        const [coinTicker, address] = wallet.split('://')
        if (coinTicker && address) {
          await addWallet({ contactId: addedContact.id!, coinTicker, address })
        }
      }
    }
  }
  await loadContacts()
}

const selectAllContacts = (event: Event) => {
  const target = event.target as HTMLInputElement
  const visibleContactIds = paginatedContacts.value.map((c) => c.id as number)
  if (target.checked) {
    selectedContacts.value = [...new Set([...selectedContacts.value, ...visibleContactIds])]
  } else {
    selectedContacts.value = selectedContacts.value.filter((id) => !visibleContactIds.includes(id))
  }
}

const confirmDeleteSelectedContacts = () => {
  contactsToDelete.value = selectedContacts.value
  confirmModalTitle.value = 'Delete Selected Contacts'
  confirmModalMessage.value = `Are you sure you want to delete the ${selectedContacts.value.length} selected contacts?`
  showConfirmModal.value = true
}

const onConfirmDelete = async () => {
  if (contactsToDelete.value.length > 0) {
    for (const contactId of contactsToDelete.value) {
      await deleteContact(contactId)
    }
    selectedContacts.value = []
  }
  await loadContacts()
}

const openAddContactModal = (contact: Contact | null = null) => {
  selectedContactForEdit.value = contact
  showAddContactModal.value = true
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

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

async function handleCurrencyAddedFromModal(currencyData: { contactId: number; network: string; address: string }) {
  await addWallet({
    contactId: currencyData.contactId,
    coinTicker: currencyData.network,
    address: currencyData.address,
  })
  showAddCurrencyModal.value = false
  await loadContacts()
}

function onGenerateQrCodePng(contact: Contact) {
  console.log(`Generating QR Code (PNG) for contact: ${contact.id}`)
}

function onGenerateQrCodeSvg(contact: Contact) {
  console.log(`Generating QR Code (SVG) for contact: ${contact.id}`)
}

function onExportCsv(contact: Contact) {
  console.log(`Exporting CSV for contact: ${contact.id}`)
}

function onExportVcf(contact: Contact) {
  console.log(`Exporting VCF for contact: ${contact.id}`)
}
</script>

<style lang="scss" scoped>
.ab-page {
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  font-family: inherit;
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
}

.ab-page--embedded {
  max-width: none;
  margin: 0;
  padding: 0;
  background: transparent;
  box-shadow: none;
  border-radius: 0;
}

.ab-page__toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 1rem;
}

.ab-page--embedded .ab-page__toolbar {
  justify-content: flex-end;
}

.ab-page__title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}

.ab-page__title-icon {
  flex-shrink: 0;
  color: #4b5563;
}

.ab-page__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem;
}

.ab-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  margin: 0;
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

  &:hover:not(.ab-btn--danger) {
    background: #f3f4f6;
  }
}

.ab-btn__icon {
  flex-shrink: 0;
}

.ab-btn--danger {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;

  &:hover {
    background: #dc2626;
    border-color: #dc2626;
  }
}

.ab-page__actions :deep(.btn) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  margin: 0;
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

  &:hover {
    background: #f3f4f6;
  }
}

.ab-page__separator {
  display: block;
  height: 1px;
  margin: 0 0 1rem;
  background: #e5e7eb;
}

.ab-page__search-row {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.ab-page__search-field {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.35rem;
  width: min(100%, 20rem);
}

.ab-page__search-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
  line-height: 1.25;
  text-align: left;
}

.ab-page__search-input {
  width: 100%;
  max-width: 20rem;
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

  &::placeholder {
    color: #9ca3af;
  }
}

.ab-page__tabs {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.ab-page__tab-list {
  display: flex;
  flex-shrink: 0;
  gap: 0.25rem;
  border-bottom: 1px solid #d1d5db;
  margin-bottom: 0;
}

.ab-page__tab-trigger {
  position: relative;
  padding: 0.65rem 1rem;
  border: none;
  background: none;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: #111827;
  }

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

.ab-page__table-shell {
  background: #fff;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.ab-page__table-scroll {
  overflow-x: auto;
  overflow-y: auto;
  max-height: calc(100vh - 300px);
  min-height: 800px;
}

.ab-page__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1rem;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

.ab-page__footer-left {
  min-width: 150px;
}

.ab-page__footer-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.ab-page__footer-text {
  font-size: 0.875rem;
  color: #6b7280;
}

.ab-page__pagination {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.ab-page__page-btn {
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
