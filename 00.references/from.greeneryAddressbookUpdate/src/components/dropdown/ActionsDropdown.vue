<template>
  <div class="action-dropdown" ref="dropdown">
    <button @click.stop="toggleDropdown">
      <PocketKnife />
    </button>
    <div v-if="isOpen" class="dropdown-content" @click.stop>
      <a
        v-for="(action, index) in dropdownActions"
        :key="index"
        href="#"
        @click.prevent="action.handler()"
        class="dropdown-item"
      >
        <component v-if="action.icon" :is="action.icon" :size="16" class="action-icon" />
        {{ action.label }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { PocketKnife, Pencil, Coins, FileImage, Image, FileUser, UserStar, Save, SaveOff, Trash2 } from 'lucide-vue-next';
import type { Contact } from '../../services/contactService';
import { getWalletsForContact } from '../../services/walletService';
import { generateContactQRCode, generateVCard } from '../../lib/cores/displayStandard/generateContactVCardQrCode';
import QRCode from 'qrcode';
import { 
  exportIndividualContactAsCSV, 
  exportIndividualContactAsVCF,
  type IndividualContactExportData 
} from '../../lib/cores/exportStandard/filenameStructureAndContent.AddressBook.Individual.text';
import {
  exportContactQRCodeAsPNG,
  type ContactQRCodeExportData
} from '../../lib/cores/exportStandard/filenameStructureAndContent.AddressBook.Individual.qrCode';

interface Action {
  label: string;
  handler: () => void;
  icon?: any;
}

const props = defineProps({
  contact: {
    type: Object as () => Contact,
    required: true,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  'currency-added',
  'generate-qrcode-png',
  'generate-qrcode-svg',
  'export-csv',
  'export-vcf',
  'update:edit-mode', // New event for toggling edit mode
  'save-changes',     // New event for saving changes
  'add-currency-request', // New event for requesting AddCurrencyModal
  'cancel-edit',       // New event for canceling edit mode
  'delete'            // Event for deleting a contact
]);

const isOpen = ref(false);
const dropdown = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Handlers for the actions
const handleAddCurrencyRequest = () => {
  emit('add-currency-request');
  isOpen.value = false;
};

const handleGenerateQrCodePng = async () => {
  if (!props.contact?.id) return;
  
  try {
    // Fetch wallets for the contact
    const wallets = await getWalletsForContact(props.contact.id);
    
    // Generate vCard text
    const vcardText = generateVCard(props.contact, wallets);
    
    // Generate QR code data URL
    const qrCodeDataUrl = await generateContactQRCode(props.contact, wallets);
    
    // Create export data
    const exportData: ContactQRCodeExportData = {
      contact: props.contact,
      wallets,
      vcardText,
      qrCodeDataUrl
    };
    
    // Export as PNG
    await exportContactQRCodeAsPNG(exportData);
    isOpen.value = false;
  } catch (err) {
    console.error('Error exporting QR code PNG:', err);
    alert('Failed to export QR code PNG. Please try again.');
    isOpen.value = false;
  }
};

const handleGenerateQrCodeSvg = async () => {
  if (!props.contact?.id) return;
  
  try {
    // Fetch wallets for the contact
    const wallets = await getWalletsForContact(props.contact.id);
    
    // Generate vCard text
    const vcardText = generateVCard(props.contact, wallets);
    
    // Generate SVG QR code string
    const svgString = await QRCode.toString(vcardText, {
      type: 'svg',
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    
    // Create filename (similar to other individual exports)
    const contactName = `${props.contact.firstname}_${props.contact.lastname}`.replace(/[^a-zA-Z0-9_]/g, '_');
    const now = new Date();
    const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const time = `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
    const filename = `greeneryaddressbook.${date}.${time}.contact.${contactName}.svg`;
    
    // Create blob and download
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    
    isOpen.value = false;
  } catch (err) {
    console.error('Error exporting QR code SVG:', err);
    alert('Failed to export QR code SVG. Please try again.');
    isOpen.value = false;
  }
};

const handleExportCsv = async () => {
  if (!props.contact?.id) return;
  
  try {
    const wallets = await getWalletsForContact(props.contact.id);
    const exportData: IndividualContactExportData = {
      contact: props.contact,
      wallets
    };
    await exportIndividualContactAsCSV(exportData);
    isOpen.value = false;
  } catch (err) {
    console.error('Error exporting CSV:', err);
    alert('Failed to export CSV. Please try again.');
    isOpen.value = false;
  }
};

const handleExportVcf = async () => {
  if (!props.contact?.id) return;
  
  try {
    const wallets = await getWalletsForContact(props.contact.id);
    const exportData: IndividualContactExportData = {
      contact: props.contact,
      wallets
    };
    await exportIndividualContactAsVCF(exportData);
    isOpen.value = false;
  } catch (err) {
    console.error('Error exporting VCF:', err);
    alert('Failed to export VCF. Please try again.');
    isOpen.value = false;
  }
};

const handleEditContact = () => {
  emit('update:edit-mode', true);
  isOpen.value = false;
};

const handleSaveChanges = () => {
  emit('save-changes');
  isOpen.value = false;
};

const handleCancelEdit = () => {
  emit('cancel-edit');
  isOpen.value = false;
};

const handleDeleteContact = () => {
  emit('delete', props.contact);
  isOpen.value = false;
};

// Computed property for dropdown actions
const dropdownActions = computed<Action[]>(() => {
  const actions: Action[] = [
    { label: 'Edit', handler: handleEditContact, icon: Pencil },
    { label: 'QRCode (png)', handler: handleGenerateQrCodePng, icon: FileImage },
    { label: 'QRCode (svg)', handler: handleGenerateQrCodeSvg, icon: Image },
    { label: 'Export (csv)', handler: handleExportCsv, icon: FileUser },
    { label: 'Export (vcf)', handler: handleExportVcf, icon: UserStar },
    { label: 'Add Currency', handler: handleAddCurrencyRequest, icon: Coins },
    { label: 'Delete', handler: handleDeleteContact, icon: Trash2 },
  ];

  if (props.isEditing) {
    // Add Save and Cancel at the beginning if editing
    actions.unshift(
      { label: 'Save', handler: handleSaveChanges, icon: Save },
      { label: 'Cancel', handler: handleCancelEdit, icon: SaveOff }
    );
  }

  return actions;
});


const handleClickOutside = (event: MouseEvent) => {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  // Use capture phase to ensure this fires before @click.stop handlers
  document.addEventListener('click', handleClickOutside, true);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true);
});
</script>

<style scoped>
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-icon {
  flex-shrink: 0;
}

.dropdown-content a:hover {
  background-color: #f3f4f6;
}
</style>


