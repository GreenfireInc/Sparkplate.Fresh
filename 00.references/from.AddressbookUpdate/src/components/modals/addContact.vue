<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <div class="entity-selector-wrapper">
          <select v-model="selectedEntity" class="entity-selector">
            <option>Contacts</option>
            <option>Exchanges</option>
            <option>Wallets</option>
            <option>Companies</option>
          </select>
        </div>
        <h2>{{ modalTitle }}</h2>
      </div>

      <div v-if="selectedEntity === 'Contacts'">
        <div class="tabs">
          <button @click="currentTab = 'general'" :class="{ 'active': currentTab === 'general' }">General</button>
          <button @click="currentTab = 'advanced'" :class="{ 'active': currentTab === 'advanced' }">Wallets</button>
        </div>

        <form @submit.prevent="saveContact">
          <div class="tab-content">
            <div class="tab-panel" :class="{ 'active-panel': currentTab === 'general' }">
              <div class="form-grid">
                <div class="form-group">
                  <label for="firstname">First Name</label>
                  <input type="text" id="firstname" v-model="form.firstname" required/>
                </div>
                <div class="form-group">
                  <label for="lastname">Last Name</label>
                  <input type="text" id="lastname" v-model="form.lastname" required/>
                </div>
              </div>
              <div class="form-grid">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" v-model="form.email" />
                </div>
                <div class="form-group">
                  <label for="company">Company</label>
                  <input type="text" id="company" v-model="form.company" />
                </div>
              </div>
              <div class="form-group full-width">
                <label for="notes">Notes</label>
                <textarea id="notes" v-model="form.notes"></textarea>
              </div>
            </div>

            <div class="tab-panel" :class="{ 'active-panel': currentTab === 'advanced' }">
              <div class="wallets-section">
                  <div v-if="wallets.length > 0" class="wallet-group wallet-header">
                      <strong>Coin</strong>
                      <strong>Address</strong>
                      <span></span> <!-- Empty span for alignment -->
                  </div>
                  <div v-for="(wallet, index) in wallets" :key="index" class="wallet-group">
                      <CurrencyDropdown v-model="wallet.coinTicker" />
                      <input type="text" v-model="wallet.address" placeholder="Wallet Address" />
                      <button type="button" class="remove-wallet-btn" @click="removeWallet(index)">Remove</button>
                  </div>
                  <button type="button" class="add-wallet-btn" @click="addWalletRow">+ Add Wallet</button>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <input 
              type="file" 
              ref="fileInput" 
              @change="handleFileImport" 
              accept=".json" 
              style="display: none"
            />
            <button type="button" class="btn-import" @click="triggerFileImport">Import</button>
            <button type="button" class="btn-secondary" @click="close">Cancel</button>
            <button type="submit" class="btn-primary">Save Contact</button>
          </div>
        </form>
      </div>
      <div v-else class="placeholder-form">
        <p>Form for adding a new {{ selectedEntity.slice(0, -1).toLowerCase() }} will be here.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineProps, defineEmits } from 'vue';
import { Contact, addContact, updateContact } from '../../services/contactService';
import { Wallet, addWallet, getWalletsForContact, updateWallet, deleteWallet } from '../../services/walletService';
import CurrencyDropdown from '../dropdown/CurrencyDropdown.vue';
import { parseWalletJsonFile } from '../../lib/cores/importStandard/importWallet.json';

const props = defineProps<{
  show: boolean,
  contact: Contact | null
}>();
const emit = defineEmits(['close', 'contact-saved']);

const isEditing = ref(false);
const form = ref<Contact>({ id: undefined, type: 'regular', firstname: '', lastname: '', email: '', company: '', notes: '' });
const wallets = ref<Partial<Wallet>[]>([])
const currentTab = ref<'general' | 'advanced'>('general');
const selectedEntity = ref<'Contacts' | 'Exchanges' | 'Wallets' | 'Companies'>('Contacts');
const fileInput = ref<HTMLInputElement | null>(null);

const modalTitle = computed(() => {
  if (props.contact && selectedEntity.value === 'Contacts') {
    return 'Edit Contact';
  }
  return `Add New ${selectedEntity.value.slice(0, -1)}`;
});

watch(() => props.show, (newVal) => {
    if (newVal) {
        currentTab.value = 'general';
        selectedEntity.value = 'Contacts';
        if (props.contact) {
            isEditing.value = true;
            form.value = { ...props.contact };
            loadWallets(props.contact.id!);
        } else {
            isEditing.value = false;
            form.value = { id: undefined, type: 'regular', firstname: '', lastname: '', email: '', company: '', notes: '' };
            wallets.value = [];
        }
    }
});

async function loadWallets(contactId: number) {
    wallets.value = await getWalletsForContact(contactId);
}

function addWalletRow() {
  wallets.value.push({ coinTicker: '', address: '' });
}

function removeWallet(index: number) {
  const wallet = wallets.value[index];
  if (wallet.id) {
    deleteWallet(wallet.id);
  }
  wallets.value.splice(index, 1);
}

async function saveContact() {
  let savedContact: Contact;
  if (isEditing.value) {
    await updateContact(form.value);
    savedContact = form.value;
  } else {
    savedContact = await addContact(form.value);
  }

  for (const wallet of wallets.value) {
    if (wallet.id) { // Existing wallet
      await updateWallet(wallet as Wallet);
    } else { // New wallet
      await addWallet({ ...wallet, contactId: savedContact.id! } as Wallet);
    }
  }

  emit('contact-saved');
  close();
}

const triggerFileImport = () => {
  fileInput.value?.click();
};

const handleFileImport = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (!file) return;

  try {
    const result = await parseWalletJsonFile(file);
    
    // Add imported wallets to the existing wallets array
    wallets.value.push(...result.wallets);
  } catch (error) {
    console.error('Error importing file:', error);
    alert(error instanceof Error ? error.message : 'Error importing file. Please ensure it is a valid JSON file.');
  }
  
  // Reset file input
  if (target) {
    target.value = '';
  }
};

const close = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #f9fafb;
  padding: 2.5rem;
  border-radius: 0.75rem;
  width: 90%;
  max-width: 550px;
  position: relative;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.entity-selector-wrapper {
  flex-shrink: 0;
}

.entity-selector {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: #fff;
  font-weight: 500;
  color: #374151;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  text-align: center;
  margin: 0;
  flex-grow: 1;
}

.close-button {
    position: static;
    background: none;
    border: none;
    font-size: 1.75rem;
    line-height: 1;
    color: #9ca3af;
    cursor: pointer;
    transition: color 0.2s;
}

.close-button:hover {
    color: #1f2937;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #d1d5db;
  margin-bottom: 1.5rem;
}

.tabs button {
  background: none;
  border: none;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}

.tabs button:hover {
  color: #111827;
}

.tabs button.active {
  color: #2563eb;
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

.tab-content {
  display: grid;
}

.tab-panel {
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
}

.tab-panel.active-panel {
  opacity: 1;
  pointer-events: auto;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem; 
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
    grid-column: 1 / -1;
}

label {
  font-weight: 500;
  color: #374151;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

input[type="text"]:focus,
input[type="email"]:focus,
textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

textarea {
    min-height: 80px;
    resize: vertical;
}

h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.5rem;
}

.wallets-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.wallet-group {
    display: grid;
    grid-template-columns: 1fr 2fr auto;
    gap: 1rem;
    align-items: center;
}

.wallet-header {
    font-weight: 600;
    color: #374151;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: -0.5rem;
}

.wallet-group input,
.wallet-group select {
    margin: 0;
}

.add-wallet-btn, .remove-wallet-btn {
    background-color: transparent;
    border: 1px solid #d1d5db;
    color: #374151;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
}

.remove-wallet-btn {
    border: none;
    color: #ef4444;
    padding: 0.5rem;
}
.remove-wallet-btn:hover {
    color: #b91c1c;
    background-color: #fee2e2;
}


.add-wallet-btn {
    align-self: flex-start;
}

.add-wallet-btn:hover {
    background-color: #f3f4f6;
    border-color: #9ca3af;
}

.form-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn-primary, .btn-secondary {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
}

.btn-primary {
    background-color: #2563eb;
    color: white;
}

.btn-primary:hover {
    background-color: #1d4ed8;
}

.btn-secondary {
    background-color: #e5e7eb;
    color: #374151;
}

.btn-secondary:hover {
    background-color: #d1d5db;
}

.btn-import {
    padding: 0.75rem 1.5rem;
    border: 1px solid #2563eb;
    border-radius: 0.375rem;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
    background-color: #ffffff;
    color: #2563eb;
}

.btn-import:hover {
    background-color: #eff6ff;
    border-color: #1d4ed8;
}

.placeholder-form {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #6b7280;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
}
</style>
