<template>
  <div
    v-if="show"
    class="modal-overlay"
    data-stacked-modal="add-currency"
    @click.self="handleClose"
  >
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Add Currency for {{ entityLabel }} ID: {{ contactId }}</h2>
      </div>
      <form @submit.prevent="submitForm" class="modal-form">
        <div class="form-group">
          <label for="walletAddress">Wallet Address:</label>
          <div class="wallet-address-input-group">
            <CurrencyDropdown v-model="selectedNetwork" />
            <input
              type="text"
              id="walletAddress"
              readonly
              class="form-input wallet-input wallet-input--address-trigger"
              :value="formattedWalletAddressDisplay"
              placeholder="Enter wallet address"
              aria-haspopup="dialog"
              @mousedown.prevent="openWalletAddressModal"
              @focus="onWalletAddressFieldFocus"
            />
            <input 
              type="file" 
              ref="fileInput" 
              @change="handleFileImport" 
              accept=".json" 
              style="display: none;" 
            />
            <StructureImportWalletAddress
              @upload-json="triggerFileImport"
              @scan-qr="handleQrCodeScan"
            />
          </div>
        </div>

        <div class="modal-actions">
          <button type="submit" class="btn btn-primary">Add Currency</button>
          <button type="button" class="btn btn-secondary" @click="handleClose">Cancel</button>
        </div>
      </form>
    </div>
    <ModalConfirmImportWallets
      :show="showImportModal"
      :file="importedFile"
      :wallets="importedWallets"
      @close="closeImportModal"
      @confirm="handleConfirmImport"
    />
  </div>

  <SubModalInputWalletAddress
    :show="show && showWalletAddressModal"
    :coin-ticker="selectedNetwork"
    @close="closeWalletAddressModal"
    @confirm="onWalletAddressModalConfirm"
  />
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import CurrencyDropdown from '@/components/dropdowns/dropdown.currency.from.publicIcons.vue';
import StructureImportWalletAddress from '@/components/structure/structure.import.walletAddress.vue';
import ModalConfirmImportWallets from '@/components/modals/confirmations/modal.confirm.import.Wallets.vue'
import SubModalInputWalletAddress from '@/components/modals/addressbook/subModals/subModal.input.WalletAddress.vue'
import { parseWalletJsonFile, type ImportedWallet } from '@/lib/cores/importStandard/importWallet.json';
import { addWallet } from '@/services/addressBook/service.addressBook.Wallet';

defineOptions({ name: 'SubModalAddCurrency' })

interface CurrencyData {
  contactId: number;
  network: string;
  address: string;
}

const props = withDefaults(
  defineProps<{
    show: boolean
    contactId: number
    /** "Contact" (default) or "Wallet" for standalone address book wallets */
    entityLabel?: string
    /**
     * When false, JSON import skips per-contact `addWallet` and emits
     * `standalone-currencies-imported` once (batch) for the address book Wallets tab.
     */
    persistImportedWalletsToContact?: boolean
  }>(),
  {
    entityLabel: 'Contact',
    persistImportedWalletsToContact: true,
  },
)

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'currency-added', currency: CurrencyData): void
  /** Batch JSON import when wallets were already persisted via `addWallet` in this modal. */
  (e: 'wallets-imported'): void
  (
    e: 'standalone-currencies-imported',
    payload: { targetId: number; items: ImportedWallet[] },
  ): void
}>()

const selectedNetwork = ref('BTC');
const walletAddress = ref('');
const showWalletAddressModal = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const showImportModal = ref(false);
const importedFile = ref<File | null>(null);
const importedWallets = ref<ImportedWallet[]>([]);

function formatWalletAddressForDisplay(address: string): string {
  if (!address) return '';
  if (address.length <= 18) return address;
  return `${address.slice(0, 9)}...${address.slice(-9)}`;
}

const formattedWalletAddressDisplay = computed(() =>
  formatWalletAddressForDisplay(walletAddress.value),
);

const resetForm = () => {
  selectedNetwork.value = 'BTC';
  walletAddress.value = '';
};

function openWalletAddressModal() {
  showWalletAddressModal.value = true;
}

function closeWalletAddressModal() {
  showWalletAddressModal.value = false;
}

function onWalletAddressFieldFocus(event: FocusEvent) {
  (event.target as HTMLInputElement).blur();
  openWalletAddressModal();
}

function onWalletAddressModalConfirm(payload: { address: string; coinTicker: string }) {
  walletAddress.value = payload.address;
  selectedNetwork.value = payload.coinTicker;
  closeWalletAddressModal();
}

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
  closeImportModal();
  closeWalletAddressModal();
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
    if (!props.persistImportedWalletsToContact) {
      emits('standalone-currencies-imported', {
        targetId: props.contactId,
        items: wallets,
      })
      closeImportModal()
      resetForm()
      emits('close')
      return
    }

    for (const wallet of wallets) {
      await addWallet({
        contactId: props.contactId,
        coinTicker: wallet.coinTicker,
        address: wallet.address,
        keyFingerprint: wallet.keyFingerprint,
        cryptoPublicKey: wallet.cryptoPublicKey,
        gpgPublicKey: wallet.gpgPublicKey,
      })
    }

    /* Avoid per-item `currency-added`: parent handlers re-fetch and would see
     * rows just inserted here as duplicates. */
    emits('wallets-imported')

    closeImportModal()
    resetForm()
    emits('close')
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
    closeWalletAddressModal();
    resetForm();
  } else {
    closeWalletAddressModal();
  }
});
</script>

<style scoped>
/* Above Contact Details radix dialog (10060/10061); below currency dropdown portal (10085) & import confirm (10095) */
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
  z-index: 10082;
}

.modal-content {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
  position: relative;
  z-index: 1;
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

.wallet-input--address-trigger {
  cursor: pointer;
  background-color: #ffffff;
}

.wallet-input--address-trigger::placeholder {
  color: #9ca3af;
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
