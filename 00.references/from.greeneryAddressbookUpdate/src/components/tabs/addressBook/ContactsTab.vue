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
          <td>{{ walletCounts[contact.id] ?? 0 }}</td>
          <td>
            <ActionsDropdown
              :contact="contact"
              @delete="confirmDeleteContact(contact)"
              @edit="openEditModal(contact)"
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { getContacts, deleteContact, updateContact, addContact } from '../../../services/contactService';
import type { Contact } from '../../../services/contactService';
import { getWalletCountForContact, walletsRevision } from '../../../services/walletService';
import ActionsDropdown from '../../dropdown/ActionsDropdown.vue';
import ConfirmationModal from '../../modals/confirmations/ConfirmModal.vue';
import ContactModal from '../../modals/addEntry.vue';

const contacts = ref<Contact[]>([]);
const walletCounts = ref<Record<number, number>>({});
const showDeleteModal = ref(false);
const showEditModal = ref(false);
const contactToDelete = ref<Contact | null>(null);
const selectedContact = ref<Contact | null>(null);

async function fetchContacts() {
  contacts.value = await getContacts();
  await refreshWalletCounts();
}

async function refreshWalletCounts() {
  const counts: Record<number, number> = {};
  for (const contact of contacts.value) {
    if (contact.id) {
      counts[contact.id] = await getWalletCountForContact(contact.id);
    }
  }
  walletCounts.value = counts;
}

function confirmDeleteContact(contact: Contact) {
  contactToDelete.value = contact;
  showDeleteModal.value = true;
}

async function deleteContactAction() {
  if (contactToDelete.value?.id) {
    await deleteContact(contactToDelete.value.id);
    showDeleteModal.value = false;
    await fetchContacts();
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
  await fetchContacts();
}

onMounted(() => {
  fetchContacts();
});

// Keep wallet counts in sync whenever wallets change anywhere in the app
watch(
  walletsRevision,
  async () => {
    if (contacts.value.length === 0) return;
    await refreshWalletCounts();
  },
  { flush: 'post' }
);
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

