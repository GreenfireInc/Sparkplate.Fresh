<template>
  <div v-if="show" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Add Currency for Contact ID: {{ contactId }}</h2>
      </div>
      <form @submit.prevent="submitForm" class="modal-form">
        <div class="form-group">
          <label for="walletAddress">Wallet Address:</label>
          <div class="wallet-address-input-group">
            <CurrencyDropdown v-model="selectedNetwork" />
            <input
              type="text"
              id="walletAddress"
              v-model="walletAddress"
              placeholder="Enter wallet address"
              class="form-input wallet-input"
            />
            <input 
              type="file" 
              ref="fileInput" 
              @change="handleFileImport" 
              accept=".json" 
              style="display: none;" 
            />
            <button type="button" class="icon-button" @click.stop="triggerFileImport" title="Upload JSON">
              <Upload :size="20" />
            </button>
            <button type="button" class="icon-button" @click.stop="handleQrCodeScan" title="Scan QR Code">
              <Camera :size="20" />
            </button>
          </div>
        </div>

        <div class="modal-actions">
          <button type="submit" class="btn btn-primary">Add Currency</button>
          <button type="button" class="btn btn-secondary" @click="handleClose">Cancel</button>
        </div>
      </form>
    </div>
    <WalletImportConfirmModal
      :show="showImportModal"
      :file="importedFile"
      :wallets="importedWallets"
      @close="closeImportModal"
      @confirm="handleConfirmImport"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Camera, Upload } from 'lucide-vue-next';
import CurrencyDropdown from '../dropdown/CurrencyDropdown.vue';
import WalletImportConfirmModal from './WalletImportConfirmModal.vue';
import { parseWalletJsonFile, type ImportedWallet } from '@/lib/cores/importStandard/importWallet.json';
import { addWallet } from '@/services/addressBook/walletService';

interface CurrencyData {
  contactId: number;
  network: string;
  address: string;
}

const props = defineProps<{
  show: boolean;
  contactId: number;
}>();

const emits = defineEmits<{
  (e: 'close'): void;
  (e: 'currency-added', currency: CurrencyData): void;
}>();

const selectedNetwork = ref('BTC');
const walletAddress = ref('');
const fileInput = ref<HTMLInputElement | null>(null);
const showImportModal = ref(false);
const importedFile = ref<File | null>(null);
const importedWallets = ref<ImportedWallet[]>([]);

const resetForm = () => {
  selectedNetwork.value = 'BTC';
  walletAddress.value = '';
};

const submitForm = () => {
  if (!walletAddress.value) {
    alert('Please enter a wallet address.');
    return;
  }

  const newCurrency: CurrencyData = {
    contactId: props.contactId,
    network: selectedNetwork.value,
    address: walletAddress.value,
  };

  console.log('Adding Currency:', newCurrency); // For now, just log
  emits('currency-added', newCurrency);
  resetForm();
  emits('close');
};

const handleClose = () => {
  resetForm();
  emits('close');
};

const triggerFileImport = () => {
  fileInput.value?.click();
};

const handleFileImport = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (!file) return;

  try {
    const result = await parseWalletJsonFile(file);
    importedFile.value = result.file;
    importedWallets.value = result.wallets;
    showImportModal.value = true;
  } catch (error) {
    console.error('Error importing file:', error);
    alert(error instanceof Error ? error.message : 'Error importing file. Please ensure it is a valid JSON file.');
  }
  
  // Reset file input
  if (target) {
    target.value = '';
  }
};

const closeImportModal = () => {
  showImportModal.value = false;
  importedFile.value = null;
  importedWallets.value = [];
};

const handleConfirmImport = async (wallets: ImportedWallet[]) => {
  try {
    // Add all imported wallets to the database
    for (const wallet of wallets) {
      await addWallet({
        contactId: props.contactId,
        coinTicker: wallet.coinTicker,
        address: wallet.address,
        keyFingerprint: wallet.keyFingerprint,
        cryptoPublicKey: wallet.cryptoPublicKey,
        gpgPublicKey: wallet.gpgPublicKey,
      });
      
      // Emit currency-added event for each wallet to maintain consistency
      emits('currency-added', {
        contactId: props.contactId,
        network: wallet.coinTicker,
        address: wallet.address,
      });
    }
    
    closeImportModal();
    resetForm();
    emits('close');
  } catch (error) {
    console.error('Error adding imported wallets:', error);
    alert('Error adding imported wallets. Please try again.');
  }
};

const handleQrCodeScan = () => {
  console.log('Scan QR Code clicked for contact ID:', props.contactId);
  // Placeholder for QR code scanning logic
  alert('QR Code scanning functionality not yet implemented.');
};

// Watch for changes in the 'show' prop to reset the form when the modal opens
watch(() => props.show, (newVal) => {
  if (newVal) {
    resetForm();
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #6b7280;
  line-height: 1;
}

.close-button:hover {
  color: #374151;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-select,
.form-input {
  padding: 0.65rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #374151;
  background-color: #ffffff;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-select:focus,
.form-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
  outline: none;
}

.wallet-address-input-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.wallet-address-input-group :deep(.custom-select-wrapper) {
  width: auto;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;
}

.wallet-address-input-group .wallet-input {
  flex: 1;
  min-width: 0;
}

.icon-button {
  background: none;
  border: 1px solid #d1d5db;
  padding: 0.65rem;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b5563;
  transition: background-color 0.2s, border-color 0.2s;
}

.icon-button:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.btn {
  padding: 0.65rem 1.25rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}

.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
  border: 1px solid #2563eb;
}

.btn-primary:hover {
  background-color: #1d4ed8;
  border-color: #1d4ed8;
}

.btn-secondary {
  background-color: #ffffff;
  color: #4b5563;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}
</style>