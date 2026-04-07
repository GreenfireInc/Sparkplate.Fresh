<template>
  <div class="export-button-wrapper">
    <button class="btn" @click.stop="toggleDropdown">
      <BookUser :size="18" class="btn-icon" />Export
      <ChevronDown :size="16" class="btn-icon" />
    </button>
    <div v-if="isOpen" class="dropdown-menu" @click.stop>
      <button @click="exportToVCF" class="dropdown-item">
        <FileText :size="16" class="dropdown-icon" />
        Export as VCF
      </button>
      <button @click="exportToJSON" class="dropdown-item">
        <FileCode :size="16" class="dropdown-icon" />
        Export as JSON
      </button>
      <button @click="exportToCSV" class="dropdown-item">
        <FileSpreadsheet :size="16" class="dropdown-icon" />
        Export as CSV
      </button>
      <button @click="exportToODS" class="dropdown-item">
        <FileSpreadsheet :size="16" class="dropdown-icon" />
        Export as ODS
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { BookUser, ChevronDown, FileText, FileCode, FileSpreadsheet } from 'lucide-vue-next';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { generateVCard } from '../../lib/cores/displayStandard/generateContactVCardQrCode';
import { generateAddressBookFilename } from '../../lib/cores/exportStandard/filenameStructureAndContent.AddressBook.Whole';
import type { Contact } from '../../services/contactService';
import type { Wallet } from '../../services/walletService';
import { getWalletsForContact } from '../../services/walletService';

const props = defineProps<{
  activeTab: string;
  contacts?: any[];
  exchanges?: any[];
  wallets?: any[];
  companies?: any[];
}>();

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.export-button-wrapper')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true);
});

const getData = () => {
  switch (props.activeTab) {
    case 'Contacts':
      return props.contacts || [];
    case 'Exchanges':
      return props.exchanges || [];
    case 'Wallets':
      return props.wallets || [];
    case 'Companies':
      return props.companies || [];
    default:
      return [];
  }
};

const getFilename = (extension: string) => {
  const data = getData();
  const contactAmount = data.length;
  
  return generateAddressBookFilename({
    extension,
    section: props.activeTab,
    contactAmount,
    subSection: '' // Can be customized later
  });
};

const downloadFile = (content: string | Blob, filename: string, mimeType: string) => {
  const blob = typeof content === 'string' ? new Blob([content], { type: mimeType }) : content;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  isOpen.value = false;
};

const exportToVCF = async () => {
  const data = getData();
  if (data.length === 0) {
    alert('No data to export');
    return;
  }

  if (props.activeTab === 'Contacts') {
    const vcfContent: string[] = [];
    for (const contact of data as Contact[]) {
      const wallets = contact.id ? await getWalletsForContact(contact.id) : [];
      vcfContent.push(generateVCard(contact, wallets));
    }
    downloadFile(vcfContent.join('\r\n\r\n'), getFilename('vcf'), 'text/vcard');
  } else {
    alert('VCF export is only available for Contacts');
  }
};

const exportToJSON = () => {
  const data = getData();
  if (data.length === 0) {
    alert('No data to export');
    return;
  }

  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, getFilename('json'), 'application/json');
};

const exportToCSV = () => {
  const data = getData();
  if (data.length === 0) {
    alert('No data to export');
    return;
  }

  // Flatten nested objects for CSV
  const flattenedData = data.map(item => {
    const flat: any = { ...item };
    
    // Handle currencies array
    if (item.currencies && Array.isArray(item.currencies)) {
      item.currencies.forEach((currency: any, index: number) => {
        flat[`currency_${index + 1}_name`] = currency.name || '';
        flat[`currency_${index + 1}_abbreviation`] = currency.abbreviation || '';
        flat[`currency_${index + 1}_address`] = currency.address || '';
      });
      delete flat.currencies;
    }
    
    return flat;
  });

  const csv = Papa.unparse(flattenedData);
  downloadFile(csv, getFilename('csv'), 'text/csv');
};

const exportToODS = () => {
  const data = getData();
  if (data.length === 0) {
    alert('No data to export');
    return;
  }

  // Flatten nested objects for ODS
  const flattenedData = data.map(item => {
    const flat: any = { ...item };
    
    // Handle currencies array
    if (item.currencies && Array.isArray(item.currencies)) {
      item.currencies.forEach((currency: any, index: number) => {
        flat[`currency_${index + 1}_name`] = currency.name || '';
        flat[`currency_${index + 1}_abbreviation`] = currency.abbreviation || '';
        flat[`currency_${index + 1}_address`] = currency.address || '';
      });
      delete flat.currencies;
    }
    
    return flat;
  });

  const worksheet = XLSX.utils.json_to_sheet(flattenedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, props.activeTab);
  
  // Generate ODS file
  XLSX.writeFile(workbook, getFilename('ods'), { bookType: 'ods' });
  isOpen.value = false;
};
</script>

<style scoped>
.export-button-wrapper {
  position: relative;
  display: inline-block;
  margin-left: 1rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  cursor: pointer;
  color: #1f2937;
  font-weight: 500;
}

.btn-icon {
  flex-shrink: 0;
}

.btn:hover {
  background-color: #f3f4f6;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 0.25rem);
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 1000;
  min-width: 180px;
  overflow: hidden;
}

.dropdown-item {
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

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.dropdown-icon {
  flex-shrink: 0;
  color: #6b7280;
}
</style>

