<template>
  <div class="form-wrapper">
    <div class="tabs">
      <button @click="currentTab = 'general'" :class="{ 'active': currentTab === 'general' }">General</button>
      <button @click="currentTab = 'advanced'" :class="{ 'active': currentTab === 'advanced' }">Wallets</button>
    </div>

    <form @submit.prevent="handleSave">
      <div class="tab-content">
        <div class="tab-panel" :class="{ 'active-panel': currentTab === 'general' }">
          <div class="form-grid">
            <div class="form-group">
              <label for="wallet-name">Wallet</label>
              <input type="text" id="wallet-name" v-model="walletForm.name" placeholder="Name of the wallet, ex. 'MetaMask'" required/>
            </div>
            <div class="form-group">
              <label for="wallet-firstAndLast">firstAndLast</label>
              <input type="text" id="wallet-firstAndLast" v-model="walletForm.firstAndLast" placeholder="First and Last words of the Mnemonic" />
            </div>
            <div class="form-group full-width">
              <label for="wallet-keyFingerprint">keyFingerprint</label>
              <input type="text" id="wallet-keyFingerprint" v-model="walletForm.keyFingerprint" placeholder="20 character pairs of the gpg keyFingerprint of the Mnemonic seedPhrase" />
            </div>               
          </div>
        </div>

        <div class="tab-panel" :class="{ 'active-panel': currentTab === 'advanced' }">
          <div class="wallets-section">
              <div v-if="walletWallets.length > 0" class="wallet-group wallet-header">
                  <strong>Coin</strong>
                  <strong>Address</strong>
                  <span></span> <!-- Empty span for alignment -->
              </div>
              <div v-for="(wallet, index) in walletWallets" :key="index" class="wallet-group">
                  <CurrencyDropdown v-model="wallet.coinTicker" />
                  <input type="text" v-model="wallet.address" placeholder="Wallet Address" />
                  <button type="button" class="remove-wallet-btn" @click="removeWallet(index)">Remove</button>
              </div>
              <button type="button" class="add-wallet-btn" @click="addWalletRow">+ Add Wallet</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type Wallet } from '../../../services/walletService';
import CurrencyDropdown from '../../dropdown/CurrencyDropdown.vue';
import { parseWalletJsonFile } from '../../../lib/cores/importStandard/importWallet.json';

const emit = defineEmits<{
  (e: 'saved', data: { form: any; wallets: Partial<Wallet>[] }): void;
  (e: 'cancel'): void;
}>();

const currentTab = ref<'general' | 'advanced'>('general');
const walletForm = ref({
  name: '',
  keyFingerprint: '',
  firstAndLast: ''
});

const walletWallets = ref<Partial<Wallet>[]>([]);

function addWalletRow() {
  walletWallets.value.push({ coinTicker: '', address: '' });
}

function removeWallet(index: number) {
  walletWallets.value.splice(index, 1);
}

function handleSave() {
  emit('saved', {
    form: walletForm.value,
    wallets: walletWallets.value
  });
}

const handleFileImportFromModal = async (file: File) => {
  try {
    const result = await parseWalletJsonFile(file);
    // Add imported wallets to the existing wallet wallets array
    walletWallets.value.push(...result.wallets);
  } catch (error) {
    console.error('Error importing file:', error);
    alert(error instanceof Error ? error.message : 'Error importing file. Please ensure it is a valid JSON file.');
  }
};

// Expose methods for parent component
defineExpose({
  handleSave,
  handleFileImportFromModal
});
</script>

<style scoped>
.tabs {
  display: flex;
  border-bottom: 1px solid #d1d5db;
  margin-bottom: 0.75rem;
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

.form-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: 100%;
}

.tab-content {
  display: grid;
  flex: 1;
  overflow-y: visible;
  overflow-x: visible;
  min-height: 0;
}

.tab-panel {
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
    gap: 0.75rem;
    min-height: 100%;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
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
  margin-top: auto;
  padding-top: 1.5rem;
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
</style>

