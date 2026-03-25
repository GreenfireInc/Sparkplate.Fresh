<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Company</th>
          <th>Email</th>
          <th>N° of Wallets</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="contacts.length === 0">
          <td colspan="8" class="empty-state">No contacts found.</td>
        </tr>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>{{ contact.id }}</td>
          <td>{{ contact.type }}</td>
          <td>{{ contact.firstname }}</td>
          <td>{{ contact.lastname }}</td>
          <td>{{ contact.company }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ walletCounts[contact.id] || 0 }}</td>
          <td>
            <ActionsDropdown
              :contact="contact"
              @delete="confirmDeleteContact(contact)"
              @edit="openEditModal(contact)"
              @add-currency-request="selectedContactForCurrency = contact; showAddCurrencyModal = true"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <ConfirmationModal
      :show="showDeleteModal"
      @close="showDeleteModal = false"
      @confirm="deleteContactAction"
      title="Confirm Delete"
      message="Are you sure you want to delete this contact?"
    />
    <ContactModal
      :show="showEditModal"
      :contact="selectedContact"
      @close="showEditModal = false"
      @save="saveContact"
    />
    <AddCurrencyModal
      v-if="selectedContactForCurrency?.id"
      :show="showAddCurrencyModal"
      :contactId="selectedContactForCurrency.id!"
      @close="showAddCurrencyModal = false"
      @currency-added="handleCurrencyAdded"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getContacts, deleteContact, updateContact, addContact } from '../services/contactService';
import type { Contact } from '../services/contactService';
import { getWalletCountForContact } from '../services/walletService';
import ActionsDropdown from './ActionsDropdown.vue';
import ConfirmationModal from './modals/ConfirmModal.vue';
import ContactModal from './modals/addContact.vue';
import AddCurrencyModal from './modals/AddCurrencyModal.vue';

const contacts = ref<Contact[]>([]);
const walletCounts = ref<{[key: number]: number}>({});
const showDeleteModal = ref(false);
const showEditModal = ref(false);
const contactToDelete = ref<Contact | null>(null);
const selectedContact = ref<Contact | null>(null);

const showAddCurrencyModal = ref(false);
const selectedContactForCurrency = ref<Contact | null>(null);

async function fetchContacts() {
  contacts.value = await getContacts();
  for (const contact of contacts.value) {
    if (contact.id) {
      walletCounts.value[contact.id] = await getWalletCountForContact(contact.id);
    }
  }
}

function confirmDeleteContact(contact: Contact) {
  contactToDelete.value = contact;
  showDeleteModal.value = true;
}

async function deleteContactAction() {
  if (contactToDelete.value && contactToDelete.value.id) {
    await deleteContact(contactToDelete.value.id);
    showDeleteModal.value = false;
    fetchContacts();
  }
}

function openEditModal(contact: Contact) {
  selectedContact.value = { ...contact };
  showEditModal.value = true;
}

async function saveContact(contact: Contact) {
  if (contact.id) {
    await updateContact(contact);
  } else {
    await addContact(contact);
  }
  showEditModal.value = false;
  fetchContacts();
}

async function handleCurrencyAdded(currencyData: { contactId: number; network: string; address: string }) {
  console.log('Currency added:', currencyData);
  showAddCurrencyModal.value = false;
  await fetchContacts(); // Refresh contact list to update wallet count
}

onMounted(() => {
  fetchContacts();
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}

thead {
  background-color: #f2f2f2;
}

.empty-state {
  text-align: center;
}
</style>