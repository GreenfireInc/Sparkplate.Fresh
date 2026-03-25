<template>
  <div class="address-book-container">
    <div class="header">
      <h1>Address Book</h1>
      <div class="actions">
        <button class="btn" @click="openAddContactModal(null)">Add contact</button>
        <ImportButton @contacts-imported="addContacts" />
        <ExportButton :contacts="contacts" />
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
              <th class="col-id">ID</th>
              <th class="col-firstname">Firstname</th>
              <th class="col-lastname">Lastname</th>
              <th class="col-company">Company</th>
              <th class="col-email">Email</th>
              <th class="col-numwallets">N° of Wallets</th>
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
                <ActionsDropdown @edit="openAddContactModal(contact)" @delete="confirmDeleteContact(contact)" />
              </td>
            </tr>
          </tbody>
        </table>
        
        <ExchangeTab v-if="activeTab === 'Exchanges'" :exchanges="exchanges" />
        <WalletTab v-if="activeTab === 'Wallets'" :wallets="wallets" />
        <CompaniesTab v-if="activeTab === 'Companies'" />

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
    <AddContactModal :show="showAddContactModal" :contact="selectedContactForEdit" @close="closeAddContactModal" @contact-saved="loadContacts" />
    <ContactDetailsModal :show="showContactDetailsModal" :contact="selectedContactForDetails" @close="closeContactDetailsModal" />
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
import AddContactModal from './modals/addContact.vue';
import ContactDetailsModal from './modals/ContactDetailsModal.vue';
import ConfirmModal from './modals/ConfirmModal.vue';
import ImportButton from './ImportButton.vue';
import ExportButton from './ExportButton.vue';
import ExchangeTab from './ExchangeTab.vue';
import WalletTab from './WalletTab.vue';
import CompaniesTab from './CompaniesTab.vue';
import ActionsDropdown from './ActionsDropdown.vue';
import { initDatabase } from '../services/databaseService';
import { getContacts, addContact, deleteContact, Contact } from '../services/contactService';
import { addWallet, getWalletCountForContact } from '../services/walletService';

interface DisplayContact extends Contact {
  wallets: number;
}


interface Currency {
  name: string;
  abbreviation: string;
  address: string;
}

interface Exchange {
  id: number;
  name: string;
  url: string;
  referralUrl: string;
  referralCode: string;
  currencies: Currency[];
  email: string;
}

interface Wallet {
  id: number;
  name: string;
  currencies: Currency[];
}

const tabs = ['Contacts', 'Exchanges', 'Wallets', 'Companies'];
const activeTab = ref('Contacts');
const contacts = ref<DisplayContact[]>([] as DisplayContact[]);
const exchanges = ref<Exchange[]>([
  {
    id: 1,
    name: 'Binance',
    url: 'https://www.binance.com',
    referralUrl: 'https://www.binance.com/en/register?ref=12345',
    referralCode: '12345',
    currencies: [
      { name: 'Bitcoin', abbreviation: 'BTC', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
      { name: 'Ethereum', abbreviation: 'ETH', address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe' }
    ],
    email: 'test@example.com'
  }
]);
const wallets = ref<Wallet[]>([
  {
    id: 1,
    name: 'MetaMask',
    currencies: [
      { name: 'Ethereum', abbreviation: 'ETH', address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe' },
      { name: 'Binance Coin', abbreviation: 'BNB', address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe' }
    ]
  }
]);
const showAddContactModal = ref(false);
const showContactDetailsModal = ref(false);
const selectedContactForEdit = ref<Contact | null>(null);
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


onMounted(async () => {
  await initDatabase();
  await loadContacts();
});

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

watch(searchQuery, () => {
    currentPage.value = 1;
});

const totalPages = computed(() => Math.ceil(filteredContacts.value.length / itemsPerPage));

const paginatedContacts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredContacts.value.slice(start, end);
});

const firstItemIndex = computed(() => filteredContacts.value.length > 0 ? (currentPage.value - 1) * itemsPerPage + 1 : 0);
const lastItemIndex = computed(() => Math.min(currentPage.value * itemsPerPage, filteredContacts.value.length));

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

const openAddContactModal = (contact: Contact | null = null) => {
  selectedContactForEdit.value = contact;
  showAddContactModal.value = true;
};

const closeAddContactModal = () => {
  selectedContactForEdit.value = null;
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

const closeConfirmModal = () => {
    showConfirmModal.value = false;
    contactToDelete.value = null;
    contactsToDelete.value = [];
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
}

.actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  cursor: pointer;
  color: #1f2937;
  font-weight: 500;
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
  min-height: 800px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f3f4f6;
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