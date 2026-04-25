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
import { ref, onMounted, onUnmounted, computed } from 'vue'
import QRCode from 'qrcode'
import {
  PocketKnife,
  Pencil,
  Coins,
  FileImage,
  Image,
  FileUser,
  FileJson,
  Star,
  Save,
  SaveOff,
  Trash2,
} from 'lucide-vue-next'
import type { Contact } from '@/services/addressBook/service.addressBook.Contact'
import type { Wallet } from '@/services/addressBook/service.addressBook.Wallet'
import { getWalletsForContact } from '@/services/addressBook/service.addressBook.Wallet'
import { generateVCard, generateContactQRCode } from '@/lib/cores/displayStandard/generateContactVCardQrCode'
import {
  exportContactQRCodeAsPNG,
  generateContactQRCodeFilename,
} from '@/lib/cores/exportStandard/filenameStructureAndContent.AddressBook.Individual.qrCode'
import { generateQRCodeSvgFilename } from '@/lib/cores/exportStandard/qrCode.filename.standAlone'
import {
  generateWalletAddressesCSVContent,
  type GeneralAddress,
} from '@/lib/cores/exportStandard/currencies/filenameStructureAndContent.walletAddresses.text'

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
  /** Companies table: pocket menu with Delete only (contact row uses default). */
  variant: {
    type: String as () => 'contact' | 'company',
    default: 'contact',
  },
})

const emit = defineEmits([
  'currency-added',
  'generate-qrcode-png',
  'generate-qrcode-svg',
  'export-csv',
  'export-vcf',
  'export-json',
  'update:edit-mode',
  'save-changes',
  'add-currency-request',
  'cancel-edit',
  'delete-requested',
])

/** Export / QR pipelines use contact + wallets; skip stubs used on exchange/wallet modals. */
function isRegularAddressBookContact(c: Contact | undefined): boolean {
  return !!c && c.type === 'regular'
}

function contactExportBasename(c: Contact): string {
  return `${c.firstname}_${c.lastname}`.replace(/[^a-zA-Z0-9_]/g, '_') || 'contact'
}

function walletToGeneralAddress(w: Wallet): GeneralAddress {
  return {
    currency: w.coinTicker,
    address: w.address,
    derivationPath: '',
    keyFingerprint: w.keyFingerprint ?? '',
    cryptoPublicKey: w.cryptoPublicKey ?? '',
    gpgPublicKey: w.gpgPublicKey ?? '',
  }
}

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

async function loadWalletsForExport(): Promise<Wallet[]> {
  const id = props.contact.id
  if (id == null) return []
  return getWalletsForContact(id)
}

function contactOnlyCsv(c: Contact, walletCount: number): string {
  const escape = (v: unknown) => {
    const s = v == null ? '' : String(v)
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
    return s
  }
  const headers = ['firstname', 'lastname', 'email', 'company', 'notes', 'wallets']
  const row = [
    escape(c.firstname),
    escape(c.lastname),
    escape(c.email),
    escape(c.company),
    escape(c.notes),
    escape(String(walletCount)),
  ]
  return `${headers.join(',')}\n${row.join(',')}\n`
}

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

const handleGenerateQrCodePng = () => {
  void runExportQrPng()
}

const handleGenerateQrCodeSvg = () => {
  void runExportQrSvg()
}

const handleExportCsv = () => {
  void runExportCsv()
}

const handleExportVcf = () => {
  void runExportVcf()
}

const handleExportJson = () => {
  void runExportJson()
}

async function runExportQrPng() {
  if (!isRegularAddressBookContact(props.contact)) {
    emit('generate-qrcode-png', props.contact)
    isOpen.value = false
    return
  }
  try {
    const wallets = await loadWalletsForExport()
    const vcardText = generateVCard(props.contact, wallets)
    const qrCodeDataUrl = await generateContactQRCode(props.contact, wallets)
    await exportContactQRCodeAsPNG({
      contact: props.contact,
      wallets,
      vcardText,
      qrCodeDataUrl,
    })
  } catch (e) {
    console.error('QR PNG export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export QR code (PNG).')
  } finally {
    isOpen.value = false
  }
}

async function runExportQrSvg() {
  if (!isRegularAddressBookContact(props.contact)) {
    emit('generate-qrcode-svg', props.contact)
    isOpen.value = false
    return
  }
  try {
    const wallets = await loadWalletsForExport()
    const vcard = generateVCard(props.contact, wallets)
    const svg = await QRCode.toString(vcard, { type: 'svg', width: 400, margin: 2 })
    const filename = generateQRCodeSvgFilename(vcard.slice(0, 64))
    downloadBlob(filename, new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }))
  } catch (e) {
    console.error('QR SVG export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export QR code (SVG).')
  } finally {
    isOpen.value = false
  }
}

async function runExportCsv() {
  if (!isRegularAddressBookContact(props.contact)) {
    emit('export-csv', props.contact)
    isOpen.value = false
    return
  }
  try {
    const wallets = await loadWalletsForExport()
    const base = contactExportBasename(props.contact)
    const filename = generateContactQRCodeFilename({ extension: 'csv', contactName: base })
    const body =
      wallets.length > 0
        ? generateWalletAddressesCSVContent(wallets.map(walletToGeneralAddress))
        : contactOnlyCsv(props.contact, wallets.length)
    downloadBlob(filename, new Blob([body], { type: 'text/csv;charset=utf-8' }))
  } catch (e) {
    console.error('CSV export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export CSV.')
  } finally {
    isOpen.value = false
  }
}

async function runExportVcf() {
  if (!isRegularAddressBookContact(props.contact)) {
    emit('export-vcf', props.contact)
    isOpen.value = false
    return
  }
  try {
    const wallets = await loadWalletsForExport()
    const vcard = generateVCard(props.contact, wallets)
    const base = contactExportBasename(props.contact)
    const filename = generateContactQRCodeFilename({ extension: 'vcf', contactName: base })
    downloadBlob(filename, new Blob([vcard], { type: 'text/vcard;charset=utf-8' }))
  } catch (e) {
    console.error('vCard export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export vCard.')
  } finally {
    isOpen.value = false
  }
}

async function runExportJson() {
  if (!isRegularAddressBookContact(props.contact)) {
    emit('export-json', props.contact)
    isOpen.value = false
    return
  }
  try {
    const wallets = await loadWalletsForExport()
    const base = contactExportBasename(props.contact)
    const filename = generateContactQRCodeFilename({ extension: 'json', contactName: base })
    const payload = {
      exportedAt: new Date().toISOString(),
      contact: props.contact,
      wallets,
    }
    downloadBlob(filename, new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }))
  } catch (e) {
    console.error('JSON export failed:', e)
    alert(e instanceof Error ? e.message : 'Could not export JSON.')
  } finally {
    isOpen.value = false
  }
}

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

const handleDeleteCompany = () => {
  emit('delete-requested');
  isOpen.value = false;
};

// Computed property for dropdown actions
const dropdownActions = computed<Action[]>(() => {
  if (props.variant === 'company') {
    return [{ label: 'Delete', handler: handleDeleteCompany, icon: Trash2 }];
  }

  const actions: Action[] = [
    { label: 'Edit', handler: handleEditContact, icon: Pencil },
    { label: 'QRCode (png)', handler: handleGenerateQrCodePng, icon: FileImage },
    { label: 'QRCode (svg)', handler: handleGenerateQrCodeSvg, icon: Image },
    { label: 'Export (csv)', handler: handleExportCsv, icon: FileUser },
    { label: 'Export (vcf)', handler: handleExportVcf, icon: Star },
    { label: 'Export (json)', handler: handleExportJson, icon: FileJson },
    { label: 'Add Currency', handler: handleAddCurrencyRequest, icon: Coins },
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