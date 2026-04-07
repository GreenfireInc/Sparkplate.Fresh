<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close-button" @click="close">x</button>
      <h2>{{ isEditing ? 'Edit Contact' : 'Add New Contact' }}</h2>
      <form @submit.prevent="saveContact">
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

        <h3>Wallets</h3>
        <div class="wallets-section">
            <div v-if="wallets.length > 0" class="wallet-group wallet-header">
                <strong>Coin</strong>
                <strong>Address</strong>
                <span></span> <!-- Empty span for alignment -->
            </div>
            <div v-for="(wallet, index) in wallets" :key="index" class="wallet-group">
                <input type="text" v-model="wallet.coinTicker" placeholder="e.g., BTC" />
                <input type="text" v-model="wallet.address" placeholder="Wallet Address" />
                <button type="button" class="remove-wallet-btn" @click="removeWallet(index)">Remove</button>
            </div>
            <button type="button" class="add-wallet-btn" @click="addWalletRow">+ Add Wallet</button>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" @click="close">Cancel</button>
          <button type="submit" class="btn-primary">Save Contact</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import { Contact, addContact, updateContact } from '../services/contactService';
import { Wallet, addWallet, getWalletsForContact, updateWallet, deleteWallet } from '../services/walletService';

const props = defineProps<{ contact: Contact | null }>();
const emit = defineEmits(['close', 'contact-saved']);

const isEditing = ref(false);
const form = ref<Contact>({ id: undefined, type: 'regular', firstname: '', lastname: '', email: '', company: '', notes: '' });
const wallets = ref<Partial<Wallet>[]>([])

watch(() => props.contact, (newContact) => {
  if (newContact) {
    isEditing.value = true;
    form.value = { ...newContact };
    loadWallets(newContact.id!)
  } else {
    isEditing.value = false;
    form.value = { id: undefined, type: 'regular', firstname: '', lastname: '', email: '', company: '', notes: '' };
    wallets.value = [];
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
  background-color: #f9fafb; /* Light gray background */
  padding: 2.5rem;
  border-radius: 0.75rem; /* Slightly larger radius */
  width: 90%;
  max-width: 550px;
  position: relative;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-height: 90vh;
  overflow-y: auto;
}

.close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
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

h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
    text-align: center;
    margin-bottom: 1rem;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem; /* Spacing between form groups */
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Make email and company full width */
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
    gap: 0.75rem;
    align-items: center;
}

.wallet-header {
    font-weight: 600;
    color: #374151;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: -0.5rem; /* pull the items closer */
}

.wallet-group input {
    margin: 0; /* Override any potential margin */
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
</style>
