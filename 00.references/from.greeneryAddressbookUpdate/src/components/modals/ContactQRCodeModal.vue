<template>
  <div v-if="show" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Contact QR Code</h2>
        <button class="close-button" @click="handleClose" title="Close">
          <X :size="24" />
        </button>
      </div>
      
      <div class="modal-body">
        <div v-if="loading" class="loading-state">
          <p>Generating QR code...</p>
        </div>
        
        <div v-else-if="error" class="error-state">
          <p class="error-message">{{ error }}</p>
          <button @click="generateQRCode" class="retry-button">Retry</button>
        </div>
        
        <div v-else-if="qrCodeDataUrl" class="qr-code-container">
          <div class="qr-code-wrapper">
            <img :src="qrCodeDataUrl" alt="Contact QR Code" class="qr-code-image" />
          </div>
          <p class="instruction-text">
            Scan this QR code with your phone's camera to add this contact to your address book.
          </p>
          <div class="action-buttons">
            <div class="download-dropdown-wrapper">
              <button @click.stop="toggleDownloadDropdown" class="action-button">
                <Download :size="16" />
                Download QR Code
                <ChevronDown :size="16" />
              </button>
              <div v-if="isDownloadDropdownOpen" class="download-dropdown-menu" @click.stop>
                <button @click="downloadQRCodePNG" class="dropdown-item">
                  <FileImage :size="16" class="dropdown-icon" />
                  Download as PNG
                </button>
                <button @click="downloadQRCodePDF" class="dropdown-item">
                  <FileText :size="16" class="dropdown-icon" />
                  Download as PDF
                </button>
              </div>
            </div>
            <button @click="copyVCard" class="action-button">
              <Copy :size="16" />
              Copy vCard
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { X, Download, Copy, ChevronDown, FileImage, FileText } from 'lucide-vue-next';
import type { Contact } from '../../services/contactService';
import { getWalletsForContact } from '../../services/walletService';
import { generateContactQRCode, generateVCard } from '../../lib/cores/displayStandard/generateContactVCardQrCode';
import { 
  exportContactQRCodeAsPNG, 
  exportContactQRCodeAsPDF,
  type ContactQRCodeExportData 
} from '../../lib/cores/exportStandard/filenameStructureAndContent.AddressBook.Individual.qrCode';

const props = defineProps<{
  show: boolean;
  contact: Contact | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const loading = ref(false);
const error = ref<string | null>(null);
const qrCodeDataUrl = ref<string | null>(null);
const vcardText = ref<string>('');
const wallets = ref<any[]>([]);
const isDownloadDropdownOpen = ref(false);

const generateQRCode = async () => {
  if (!props.contact) {
    error.value = 'No contact provided';
    return;
  }

  loading.value = true;
  error.value = null;
  qrCodeDataUrl.value = null;

  try {
    // Fetch wallets for the contact
    wallets.value = props.contact.id 
      ? await getWalletsForContact(props.contact.id)
      : [];

    // Generate vCard
    vcardText.value = generateVCard(props.contact, wallets.value);

    // Generate QR code
    qrCodeDataUrl.value = await generateContactQRCode(props.contact, wallets.value);
  } catch (err: any) {
    console.error('Error generating QR code:', err);
    error.value = err.message || 'Failed to generate QR code';
  } finally {
    loading.value = false;
  }
};

const handleClose = () => {
  emit('close');
};

const toggleDownloadDropdown = () => {
  isDownloadDropdownOpen.value = !isDownloadDropdownOpen.value;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.download-dropdown-wrapper')) {
    isDownloadDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true);
});

const downloadQRCodePNG = async () => {
  if (!qrCodeDataUrl.value || !props.contact) return;

  try {
    const exportData: ContactQRCodeExportData = {
      contact: props.contact,
      wallets: wallets.value,
      vcardText: vcardText.value,
      qrCodeDataUrl: qrCodeDataUrl.value
    };
    
    await exportContactQRCodeAsPNG(exportData);
    isDownloadDropdownOpen.value = false;
  } catch (err) {
    console.error('Error exporting PNG:', err);
    alert('Failed to export PNG. Please try again.');
    isDownloadDropdownOpen.value = false;
  }
};

const downloadQRCodePDF = async () => {
  if (!qrCodeDataUrl.value || !props.contact) return;

  try {
    const exportData: ContactQRCodeExportData = {
      contact: props.contact,
      wallets: wallets.value,
      vcardText: vcardText.value,
      qrCodeDataUrl: qrCodeDataUrl.value
    };
    
    await exportContactQRCodeAsPDF(exportData);
    isDownloadDropdownOpen.value = false;
  } catch (err) {
    console.error('Error exporting PDF:', err);
    alert('Failed to export PDF. Please try again.');
    isDownloadDropdownOpen.value = false;
  }
};

const copyVCard = async () => {
  if (!vcardText.value) return;

  try {
    await navigator.clipboard.writeText(vcardText.value);
    alert('vCard copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy vCard:', err);
    alert('Failed to copy vCard to clipboard');
  }
};

// Generate QR code when modal opens
watch(() => props.show, (newVal) => {
  if (newVal && props.contact) {
    generateQRCode();
  }
});

onMounted(() => {
  if (props.show && props.contact) {
    generateQRCode();
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: color 0.2s;
}

.close-button:hover {
  color: #000;
}

.modal-body {
  padding: 2rem;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 3rem 1rem;
}

.error-message {
  color: #d32f2f;
  margin-bottom: 1rem;
}

.retry-button {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.retry-button:hover {
  background-color: #1565c0;
}

.qr-code-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.qr-code-wrapper {
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.qr-code-image {
  display: block;
  width: 100%;
  max-width: 400px;
  height: auto;
}

.instruction-text {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin: 0;
  max-width: 400px;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
}

.action-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.action-button:hover {
  background-color: #1565c0;
}

.action-button:active {
  background-color: #0d47a1;
}

.download-dropdown-wrapper {
  flex: 1;
  position: relative;
}

.download-dropdown-menu {
  position: absolute;
  bottom: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 1000;
  overflow: hidden;
  min-width: 180px;
}

.download-dropdown-menu .dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  color: #374151;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.download-dropdown-menu .dropdown-item:hover {
  background-color: #f3f4f6;
}

.download-dropdown-menu .dropdown-icon {
  flex-shrink: 0;
  color: #6b7280;
}
</style>




