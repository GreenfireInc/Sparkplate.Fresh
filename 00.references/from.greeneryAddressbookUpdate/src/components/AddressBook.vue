<template>
  <div class="address-book-container">
    <div class="header">
      <h1><NotebookTabs :size="24" class="header-icon" />Address Book</h1>
      <div class="actions">
        <button class="btn" @click="openAddContactModal(null, activeTab as 'Contacts' | 'Exchanges' | 'Wallets' | 'Companies')">
          <SquareUser :size="18" class="btn-icon" />
          Add {{ getAddButtonText(activeTab) }}
        </button>
        <ImportButton @contacts-imported="addContacts" />
        <ExportButton 
          :activeTab="activeTab" 
          :contacts="contacts" 
          :exchanges="exchanges" 
          :wallets="wallets" 
          :companies="companies" 
        />
      </div>
    </div>

    <div class="sub-header">
      <input type="text" v-model="searchQuery" placeholder="Search contacts..." class="search-input" />
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <div class="table-container">
      <div class="table-wrapper">
        <table v-if="activeTab === 'Contacts'">
          <thead>
            <tr>
              <th class="col-checkbox">
                <input
                  type="checkbox"
                  @change="selectAllContacts"
                  :checked="isCurrentPageSelected"
                  :disabled="paginatedContacts.length === 0"
                />
              </th>
              <th @click="sortBy('id')" class="col-id sortable" :class="{ 'active-sort': sortKey === 'id' }">
                ID
                <span v-if="sortKey === 'id'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
              </th>
              <th @click="sortBy('firstname')" class="col-firstname sortable" :class="{ 'active-sort': sortKey === 'firstname' }">
                Firstname
                <span v-if="sortKey === 'firstname'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
              </th>
              <th @click="sortBy('lastname')" class="col-lastname sortable" :class="{ 'active-sort': sortKey === 'lastname' }">
                Lastname
                <span v-if="sortKey === 'lastname'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
              </th>
              <th @click="sortBy('company')" class="col-company sortable" :class="{ 'active-sort': sortKey === 'company' }">
                Company
                <span v-if="sortKey === 'company'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
              </th>
              <th @click="sortBy('email')" class="col-email sortable" :class="{ 'active-sort': sortKey === 'email' }">
                Email
                <span v-if="sortKey === 'email'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
              </th>
              <th @click="sortBy('wallets')" class="col-numwallets sortable" :class="{ 'active-sort': sortKey === 'wallets' }">
                N° of Wallets
                <span v-if="sortKey === 'wallets'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
              </th>
              <th class="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="paginatedContacts.length === 0">
              <td colspan="8" class="empty-state">
                No contacts found.
              </td>
            </tr>
            <tr v-for="contact in paginatedContacts" :key="contact.id" @click="openContactDetailsModal(contact)">
              <td class="col-checkbox">
                <input type="checkbox" :value="contact.id" v-model="selectedContacts" @click.stop />
              </td>
              <td class="col-id">{{ contact.id }}</td>
              <td class="col-firstname">{{ contact.firstname }}</td>
              <td class="col-lastname">{{ contact.lastname }}</td>
              <td class="col-company">{{ contact.company }}</td>
              <td class="col-email">{{ contact.email }}</td>
              <td class="col-numwallets">{{ contact.wallets }}</td>
              <td class="col-actions">
                <ActionsDropdown
                  :contact="contact"
                  @add-currency-request="selectedContactForCurrency = contact; showAddCurrencyModal = true"
                  @currency-added="handleCurrencyAdded"
                  @generate-qrcode-png="onGenerateQrCodePng"
                  @generate-qrcode-svg="onGenerateQrCodeSvg"
                  @export-csv="onExportCsv"
                  @export-vcf="onExportVcf"
                  @delete="confirmDeleteContact"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <ExchangeTab v-if="activeTab === 'Exchanges'" :exchanges="exchanges" @exchange-clicked="handleExchangeClicked" />
        <WalletTab v-if="activeTab === 'Wallets'" :wallets="wallets" />
        <CompaniesTab v-if="activeTab === 'Companies'" :companies="companies" />

        <div v-if="activeTab !== 'Contacts' && activeTab !== 'Exchanges' && activeTab !== 'Wallets' && activeTab !== 'Companies'" class="empty-state">
          Content for {{ activeTab }} goes here.
        </div>
      </div>

      <div class="footer">
        <div class="footer-left">
          <button
            v-if="activeTab === 'Contacts' && selectedContacts.length > 0"
            class="btn btn-delete"
            @click="confirmDeleteSelectedContacts"
          >
            Delete Selected
          </button>
        </div>
        <div class="footer-right">
          <span v-if="activeTab === 'Contacts'" class="footer-text">
            {{ firstItemIndex }}-{{ lastItemIndex }} of {{ filteredContacts.length }}
          </span>
           <span v-else class="footer-text">0-0 of 0</span>
          <div class="pagination">
            <button
              @click="prevPage"
              :disabled="activeTab !== 'Contacts' || currentPage === 1 || filteredContacts.length === 0"
            >
              &lt;
            </button>
            <button
              @click="nextPage"
              :disabled="activeTab !== 'Contacts' || currentPage === totalPages || filteredContacts.length === 0"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
    <AddContactModal :show="showAddContactModal" :contact="selectedContactForEdit" :initialEntity="initialEntityType" @close="closeAddContactModal" @contact-saved="loadContacts" @exchange-saved="handleExchangeSaved" @wallet-saved="handleWalletSaved" @company-saved="handleCompanySaved" />
    <ContactDetailsModal :show="showContactDetailsModal" :contact="selectedContactForDetails" @close="closeContactDetailsModal" @contact-updated="handleContactUpdated" @contact-deleted="confirmDeleteContact" />
    <AddCurrencyModal
      v-if="selectedContactForCurrency?.id"
      :show="showAddCurrencyModal"
      :contactId="selectedContactForCurrency.id!"
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
import { ref, computed, watch, onMounted } from 'vue';
import AddContactModal from './modals/addEntry.vue';
import ContactDetailsModal from './modals/ContactDetailsModal.vue';
import AddCurrencyModal from './modals/AddCurrencyModal.vue';
import ConfirmModal from './modals/confirmations/ConfirmModal.vue';
import ImportButton from './buttons/ImportButton.vue';
import ExportButton from './buttons/ExportButton.vue';
import ExchangeTab from './tabs/addressBook/ExchangeTab.vue';
import WalletTab from './tabs/addressBook/WalletTab.vue';
import CompaniesTab from './tabs/addressBook/CompaniesTab.vue';
import ActionsDropdown from './dropdown/ActionsDropdown.vue';
import { NotebookTabs, SquareUser } from 'lucide-vue-next';
import { initDatabase } from '../services/databaseService';
import { getContacts, addContact, deleteContact, getContact, Contact } from '../services/contactService';
import { addWallet, getWalletCountForContact, walletsRevision, type Wallet as ContactWallet } from '../services/walletService';
import { type Currency, type Exchange, getExchanges, addExchange } from '../services/exchangeService';
import { type StandaloneWallet, getStandaloneWallets, addStandaloneWallet } from '../services/standaloneWalletService';
import { type StandaloneCompany, getStandaloneCompanies, addStandaloneCompany } from '../services/standaloneCompanyService';

// Type alias for standalone wallets used in WalletTab
type Wallet = StandaloneWallet;

// Type alias for standalone companies used in CompaniesTab
type Company = StandaloneCompany;

interface DisplayContact extends Contact {
  wallets: number;
}

const tabs = ['Contacts', 'Exchanges', 'Wallets', 'Companies'];
const activeTab = ref('Contacts');
const contacts = ref<DisplayContact[]>([] as DisplayContact[]);
const exchanges = ref<Exchange[]>([]);
const wallets = ref<Wallet[]>([]);
const companies = ref<Company[]>([]);
const showAddContactModal = ref(false);
const showContactDetailsModal = ref(false);
const selectedContactForEdit = ref<Contact | null>(null);
const initialEntityType = ref<'Contacts' | 'Exchanges' | 'Wallets' | 'Companies'>('Contacts');
const selectedContactForDetails = ref<Contact | null>(null);
const selectedContacts = ref<number[]>([]);
const currentPage = ref(1);
const itemsPerPage = 25;
const searchQuery = ref('');
const showConfirmModal = ref(false);
const confirmModalTitle = ref('');
const confirmModalMessage = ref('');
const contactToDelete = ref<Contact | null>(null);
const contactsToDelete = ref<number[]>([]);
const sortKey = ref<keyof DisplayContact>('id');
const sortOrder = ref<'asc' | 'dsc'>('asc');
const showAddCurrencyModal = ref(false);
const selectedContactForCurrency = ref<Contact | null>(null);


onMounted(async () => {
  await initDatabase();
  await loadContacts();
  await loadExchanges();
  await loadStandaloneWallets();
  await loadStandaloneCompanies();
});

// Refresh wallet counts whenever wallets change (import, add, delete, etc.)
watch(
  walletsRevision,
  async () => {
    if (contacts.value.length === 0) return;
    // Refresh wallet counts for all contacts
    const updatedContacts: DisplayContact[] = [];
    for (const contact of contacts.value) {
      const walletCount = await getWalletCountForContact(contact.id!);
      updatedContacts.push({ ...contact, wallets: walletCount });
    }
    contacts.value = updatedContacts;
  },
  { flush: 'post' }
);

async function loadExchanges() {
  exchanges.value = await getExchanges();
}

async function loadStandaloneWallets() {
  wallets.value = await getStandaloneWallets();
}

async function loadStandaloneCompanies() {
  companies.value = await getStandaloneCompanies();
}

async function loadContacts() {
  const dbContacts = await getContacts();
  const displayContacts: DisplayContact[] = [];
  for (const contact of dbContacts) {
    const walletCount = await getWalletCountForContact(contact.id!);
    displayContacts.push({ ...contact, wallets: walletCount });
  }
  contacts.value = displayContacts;
  closeConfirmModal();
}


const filteredContacts = computed(() => {
    if (!searchQuery.value) {
        return contacts.value;
    }
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    return contacts.value.filter(contact => {
        return (
            contact.firstname.toLowerCase().includes(lowerCaseQuery) ||
            contact.lastname.toLowerCase().includes(lowerCaseQuery) ||
            contact.company.toLowerCase().includes(lowerCaseQuery) ||
            contact.email.toLowerCase().includes(lowerCaseQuery)
        );
    });
});

const sortedContacts = computed(() => {
  const key = sortKey.value;
  const order = sortOrder.value;
  return [...filteredContacts.value].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue === bValue) {
      return 0;
    }

    if (order === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
});

watch(searchQuery, () => {
    currentPage.value = 1;
});

const totalPages = computed(() => Math.ceil(sortedContacts.value.length / itemsPerPage));

const paginatedContacts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedContacts.value.slice(start, end);
});

const firstItemIndex = computed(() => sortedContacts.value.length > 0 ? (currentPage.value - 1) * itemsPerPage + 1 : 0);
const lastItemIndex = computed(() => Math.min(currentPage.value * itemsPerPage, sortedContacts.value.length));

const isCurrentPageSelected = computed(() => {
  const visibleContactIds = paginatedContacts.value.map(c => c.id as number);
  if (visibleContactIds.length === 0) return false;
  return visibleContactIds.every(id => selectedContacts.value.includes(id));
});

const addContacts = async (newContacts: any[]) => {
  for (const c of newContacts) {
    const newContact: Contact = {
        type: 'regular',
        firstname: c.firstname || '',
        lastname: c.lastname || '',
        company: c.company || '',
        email: c.email || '',
        notes: c.notes || '',
        phone: c.phone || '',
    };
    const addedContact = await addContact(newContact);
    if (c.wallets) {
        for (const wallet of c.wallets.split(',')) {
            const [coinTicker, address] = wallet.split('://');
            if (coinTicker && address) {
                await addWallet({ contactId: addedContact.id!, coinTicker, address });
            }
        }
    }
  }
  await loadContacts();
};

const selectAllContacts = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const visibleContactIds = paginatedContacts.value.map(c => c.id as number);
  if (target.checked) {
    selectedContacts.value = [...new Set([...selectedContacts.value, ...visibleContactIds])];
  } else {
    selectedContacts.value = selectedContacts.value.filter(id => !visibleContactIds.includes(id));
  }
};

const confirmDeleteContact = (contact: Contact) => {
  contactToDelete.value = contact;
  confirmModalTitle.value = 'Delete Contact';
  confirmModalMessage.value = `Are you sure you want to delete ${contact.firstname} ${contact.lastname}?`;
  showConfirmModal.value = true;
};

const confirmDeleteSelectedContacts = () => {
  contactsToDelete.value = selectedContacts.value;
  confirmModalTitle.value = 'Delete Selected Contacts';
  confirmModalMessage.value = `Are you sure you want to delete the ${selectedContacts.value.length} selected contacts?`;
  showConfirmModal.value = true;
};


const onConfirmDelete = async () => {
  if (contactToDelete.value) {
    await deleteContact(contactToDelete.value.id!);
  } else if (contactsToDelete.value.length > 0) {
    for (const contactId of contactsToDelete.value) {
      await deleteContact(contactId);
    }
    selectedContacts.value = [];
  }
  await loadContacts();
};

const getAddButtonText = (tab: string): string => {
  const textMap: Record<string, string> = {
    'Contacts': 'Contact',
    'Exchanges': 'Exchange',
    'Wallets': 'Wallet',
    'Companies': 'Company'
  };
  return textMap[tab] || 'Contact';
};

const openAddContactModal = (contact: Contact | null = null, entityType: 'Contacts' | 'Exchanges' | 'Wallets' | 'Companies' = 'Contacts') => {
  selectedContactForEdit.value = contact;
  initialEntityType.value = entityType;
  showAddContactModal.value = true;
};

const handleExchangeClicked = (exchange: any) => {
  // Open the addEntry modal with Exchanges selected for editing
  openAddContactModal(null, 'Exchanges');
};

const handleExchangeSaved = async (data: { form: any; wallets: Partial<Wallet>[] }) => {
  const { form, wallets } = data;
  
  // Convert wallets to currencies format
  const currencies = wallets.map(wallet => ({
    name: wallet.coinTicker || '',
    abbreviation: wallet.coinTicker || '',
    address: wallet.address || ''
  })).filter(c => c.name && c.address);
  
  // Extract URL from referralCodeLink if it's a URL, otherwise use empty string
  const url = form.referralCodeLink && form.referralCodeLink.startsWith('http') 
    ? form.referralCodeLink 
    : '';
  
  // Extract referral code from referralCodeLink if it's not a URL
  const referralCode = form.referralCodeLink && !form.referralCodeLink.startsWith('http')
    ? form.referralCodeLink
    : form.referralCodeLink || '';
  
  const referralUrl = form.referralCodeLink && form.referralCodeLink.startsWith('http')
    ? form.referralCodeLink
    : '';
  
  const exchangeData: Omit<Exchange, 'id'> = {
    name: form.name,
    email: form.email || '',
    url: url,
    referralUrl: referralUrl,
    referralCode: referralCode,
    currencies: currencies
  };
  
  await addExchange(exchangeData);
  await loadExchanges();
};

const handleWalletSaved = async (data: { form: any; wallets: Partial<ContactWallet>[] }) => {
  const { form, wallets: walletEntries } = data;
  
  // Convert wallet entries to currencies format
  const currencies = walletEntries.map(wallet => ({
    name: wallet.coinTicker || '',
    abbreviation: wallet.coinTicker || '',
    address: wallet.address || ''
  })).filter(c => c.name && c.address);
  
  const walletData: Omit<StandaloneWallet, 'id'> = {
    name: form.name,
    keyFingerprint: form.keyFingerprint || undefined,
    firstAndLast: form.firstAndLast || undefined,
    currencies: currencies
  };
  
  await addStandaloneWallet(walletData);
  await loadStandaloneWallets();
};

const handleCompanySaved = async (data: { form: any; wallets: Partial<ContactWallet>[] }) => {
  const { form, wallets: walletEntries } = data;
  
  // Convert wallet entries to currencies format
  const currencies = walletEntries.map(wallet => ({
    name: wallet.coinTicker || '',
    abbreviation: wallet.coinTicker || '',
    address: wallet.address || ''
  })).filter(c => c.name && c.address);
  
  const companyData: Omit<StandaloneCompany, 'id'> = {
    name: form.name,
    email: form.email || '',
    contact: form.contact || '',
    contactEmail: form.contactEmail || '',
    contactPosition: form.contactPosition || undefined,
    currencies: currencies
  };
  
  await addStandaloneCompany(companyData);
  await loadStandaloneCompanies();
};

const closeAddContactModal = () => {
  selectedContactForEdit.value = null;
  initialEntityType.value = 'Contacts';
  showAddContactModal.value = false;
};

const openContactDetailsModal = (contact: Contact) => {
  selectedContactForDetails.value = contact;
  showContactDetailsModal.value = true;
};

const closeContactDetailsModal = () => {
  selectedContactForDetails.value = null;
  showContactDetailsModal.value = false;
};

const handleContactUpdated = async () => {
  // Refresh the contact data when it's updated
  if (selectedContactForDetails.value?.id) {
    const updatedContact = await getContact(selectedContactForDetails.value.id);
    if (updatedContact) {
      selectedContactForDetails.value = updatedContact;
    }
    // Also refresh the contacts list
    await loadContacts();
  }
};

const closeConfirmModal = () => {
    showConfirmModal.value = false;
    contactToDelete.value = null;
    contactsToDelete.value = [];
}

function sortBy(key: keyof DisplayContact) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'dsc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

async function handleCurrencyAdded(currencyData: { contactId: number; selectedNetwork: string; walletAddress: string }) {
  console.log("Currency added:", currencyData);
  await loadContacts();
}

async function handleCurrencyAddedFromModal(currencyData: { contactId: number; network: string; address: string }) {
  console.log("Currency added from modal:", currencyData);
  // Add the wallet to the database
  await addWallet(currencyData.contactId, currencyData.network, currencyData.address);
  showAddCurrencyModal.value = false;
  await loadContacts();
}

function onGenerateQrCodePng(contact: Contact) {
  console.log(`Generating QR Code (PNG) for contact: ${contact.id}`);
}

function onGenerateQrCodeSvg(contact: Contact) {
  console.log(`Generating QR Code (SVG) for contact: ${contact.id}`);
}

function onExportCsv(contact: Contact) {
  console.log(`Exporting CSV for contact: ${contact.id}`);
}

function onExportVcf(contact: Contact) {
  console.log(`Exporting VCF for contact: ${contact.id}`);
}
</script>

<style scoped>
.address-book-container {
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  font-family: sans-serif;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.sub-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
}

.search-input {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  width: 300px;
}

.header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header-icon {
  flex-shrink: 0;
}

.actions {
  display: flex;
  gap: 1rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  cursor: pointer;
  color: #1f2937;
  font-weight: 500;
}

.btn-icon {
  flex-shrink: 0;
}

.btn:hover {
  background-color: #f3f4f6;
}

.btn-delete {
  background-color: #ef4444;
  color: #ffffff;
  border-color: #ef4444;
}

.btn-delete:hover {
  background-color: #dc2626;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #d1d5db;
  margin-bottom: 1.5rem;
}

.tabs button {
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  color: #6b7280;
  position: relative;
}

.tabs button.active {
  color: #1f2937;
  font-weight: 600;
}

.tabs button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #2563eb;
}

.table-container {
  background-color: #ffffff;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.table-wrapper {
  overflow-x: auto;
  overflow-y: auto;
  max-height: calc(100vh - 300px);
  min-height: 800px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f3f4f6;
  position: sticky;
  top: 0;
  z-index: 10;
}

tr {
  cursor: pointer;
}

tr:hover {
  background-color: #f9fafb;
}

th,
td {
  padding: 1rem;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid #e5e7eb;
}

th {
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b5563;
  text-transform: uppercase;
  background-color: #f3f4f6;
  position: sticky;
  top: 0;
  z-index: 10;
}

th.sortable {
  cursor: pointer;
}

th.sortable:hover {
  background-color: #e5e7eb;
}

.sort-arrow {
  margin-left: 0.25rem;
  font-size: 0.625rem;
}

td {
  color: #374151;
}

.action-dropdown {
  position: relative;
}

.action-dropdown button {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

.dropdown-content {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.dropdown-content a {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #374151;
  white-space: nowrap;
}

.dropdown-content a:hover {
  background-color: #f3f4f6;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9fafb;
}

.footer-left {
  min-width: 150px;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer-text {
  font-size: 0.875rem;
  color: #6b7280;
}

.pagination {
  display: flex;
}

.pagination button {
  background: none;
  border: 1px solid #d1d5db;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-left: 0.5rem;
  cursor: pointer;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.empty-state {
  text-align: center;
  padding: 5rem;
  color: #6b7280;
  font-size: 1rem;
}

.col-checkbox { width: 4%; }
.col-id { width: 4%; }
.col-firstname { width: 13%; }
.col-lastname { width: 13%; }
.col-company { width: 13%; }
.col-email { width: 23%; }
.col-numwallets { width: 15%; }
.col-actions { width: 15%; }

</style>