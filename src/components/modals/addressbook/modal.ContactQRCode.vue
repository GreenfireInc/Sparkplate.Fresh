<template>
  <DialogRoot :open="!!show && !!contact" @update:open="onDialogOpen">
    <DialogPortal>
      <DialogOverlay class="cqr-overlay" />
      <DialogContent class="cqr-modal" :aria-describedby="undefined">
        <div class="cqr-header">
          <div class="cqr-header__row">
            <DialogTitle class="cqr-header__title">Contact QR Code</DialogTitle>
            <DialogClose class="cqr-header__close" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </DialogClose>
          </div>
        </div>

        <Separator class="cqr-separator" />

        <div class="cqr-body">
          <div v-if="loading" class="cqr-state cqr-state--muted">
            <p class="cqr-state__text">Generating QR code…</p>
          </div>

          <div v-else-if="error" class="cqr-state">
            <p class="cqr-state__error">{{ error }}</p>
            <button type="button" class="cqr-btn cqr-btn--primary" @click="generateQRCode">
              Retry
            </button>
          </div>

          <div v-else-if="qrCodeDataUrl" class="cqr-content">
            <div class="cqr-qr-card">
              <img :src="qrCodeDataUrl" alt="Contact QR Code" class="cqr-qr-card__img" />
            </div>
            <p class="cqr-hint">
              Scan this QR code with your phone's camera to add this contact to your address book.
            </p>
            <div class="cqr-actions">
              <DropdownMenuRoot v-model:open="downloadMenuOpen">
                <DropdownMenuTrigger class="cqr-btn cqr-btn--primary cqr-btn--flex" type="button">
                  <Download :size="16" />
                  Download QR Code
                  <ChevronDown :size="16" />
                </DropdownMenuTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuContent class="cqr-download-menu" side="top" align="start" :side-offset="6">
                    <DropdownMenuItem class="cqr-download-item" @click="downloadQRCodePNG">
                      <FileImage :size="16" class="cqr-download-item__icon" />
                      Download as PNG
                    </DropdownMenuItem>
                    <DropdownMenuItem class="cqr-download-item" @click="downloadQRCodePDF">
                      <FileText :size="16" class="cqr-download-item__icon" />
                      Download as PDF
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenuRoot>
              <button type="button" class="cqr-btn cqr-btn--primary cqr-btn--flex" @click="copyVCard">
                <Copy :size="16" />
                Copy vCard
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
  Separator,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'radix-vue'
import { Download, Copy, ChevronDown, FileImage, FileText } from 'lucide-vue-next'
import type { Contact } from '@/services/addressBook/contactService'
import { getWalletsForContact } from '@/services/addressBook/walletService'
import { generateContactQRCode, generateVCard } from '@/lib/cores/displayStandard/generateContactVCardQrCode'
import {
  exportContactQRCodeAsPNG,
  exportContactQRCodeAsPDF,
  type ContactQRCodeExportData,
} from '@/lib/cores/exportStandard/filenameStructureAndContent.AddressBook.Individual.qrCode'

defineOptions({ name: 'ContactQRCodeModal' })

const props = defineProps<{
  show: boolean
  contact: Contact | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const loading = ref(false)
const error = ref<string | null>(null)
const qrCodeDataUrl = ref<string | null>(null)
const vcardText = ref('')
const wallets = ref<any[]>([])
const downloadMenuOpen = ref(false)

function onDialogOpen(open: boolean) {
  if (!open) handleClose()
}

const generateQRCode = async () => {
  if (!props.contact) {
    error.value = 'No contact provided'
    return
  }

  loading.value = true
  error.value = null
  qrCodeDataUrl.value = null

  try {
    wallets.value = props.contact.id
      ? await getWalletsForContact(props.contact.id)
      : []

    vcardText.value = generateVCard(props.contact, wallets.value)
    qrCodeDataUrl.value = await generateContactQRCode(props.contact, wallets.value)
  } catch (err: any) {
    console.error('Error generating QR code:', err)
    error.value = err.message || 'Failed to generate QR code'
  } finally {
    loading.value = false
  }
}

const handleClose = () => {
  emit('close')
}

const downloadQRCodePNG = async () => {
  if (!qrCodeDataUrl.value || !props.contact) return

  try {
    const exportData: ContactQRCodeExportData = {
      contact: props.contact,
      wallets: wallets.value,
      vcardText: vcardText.value,
      qrCodeDataUrl: qrCodeDataUrl.value,
    }

    await exportContactQRCodeAsPNG(exportData)
    downloadMenuOpen.value = false
  } catch (err) {
    console.error('Error exporting PNG:', err)
    alert('Failed to export PNG. Please try again.')
    downloadMenuOpen.value = false
  }
}

const downloadQRCodePDF = async () => {
  if (!qrCodeDataUrl.value || !props.contact) return

  try {
    const exportData: ContactQRCodeExportData = {
      contact: props.contact,
      wallets: wallets.value,
      vcardText: vcardText.value,
      qrCodeDataUrl: qrCodeDataUrl.value,
    }

    await exportContactQRCodeAsPDF(exportData)
    downloadMenuOpen.value = false
  } catch (err) {
    console.error('Error exporting PDF:', err)
    alert('Failed to export PDF. Please try again.')
    downloadMenuOpen.value = false
  }
}

const copyVCard = async () => {
  if (!vcardText.value) return

  try {
    await navigator.clipboard.writeText(vcardText.value)
    alert('vCard copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy vCard:', err)
    alert('Failed to copy vCard to clipboard')
  }
}

watch(
  () => props.show,
  (newVal) => {
    if (newVal && props.contact) {
      generateQRCode()
    }
  },
)

onMounted(() => {
  if (props.show && props.contact) {
    generateQRCode()
  }
})
</script>

<style lang="scss" scoped>
/* ── Overlay (aligned with Contact Details) ───────────────── */
.cqr-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10070;
  animation: cqr-fade 0.15s ease;
}

@keyframes cqr-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* ── Dialog shell ──────────────────────────────────────────── */
.cqr-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10071;
  width: min(95vw, 28rem);
  max-height: 90vh;
  background: #f9fafb;
  border-radius: 0.75rem;
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: cqr-pop 0.18s ease;
}

@keyframes cqr-pop {
  from {
    opacity: 0;
    transform: translate(-50%, -48%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

/* ── Header ───────────────────────────────────────────────── */
.cqr-header {
  padding: 0.875rem 1.25rem 0.75rem;
  flex-shrink: 0;
}

.cqr-header__row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  padding-right: 2.5rem;
}

.cqr-header__title {
  flex: 1;
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 700;
  color: #111827;
}

.cqr-header__close {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  background: #f3f4f6;
  border-radius: 0.375rem;
  cursor: pointer;
  color: #6b7280;
  transition: background 0.12s, color 0.12s;

  svg {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    background: #e5e7eb;
    color: #111827;
  }
}

/* ── Separator ───────────────────────────────────────────── */
.cqr-separator {
  height: 1px;
  background: #e5e7eb;
  flex-shrink: 0;
}

/* ── Body ──────────────────────────────────────────────────── */
.cqr-body {
  padding: 1.25rem 1.25rem 1.5rem;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
}

.cqr-state {
  text-align: center;
  padding: 2rem 0.75rem;
}

.cqr-state--muted .cqr-state__text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.cqr-state__error {
  color: #dc2626;
  font-size: 0.875rem;
  margin: 0 0 1rem;
}

.cqr-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.cqr-qr-card {
  background: #fff;
  padding: 0.875rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.cqr-qr-card__img {
  display: block;
  width: 100%;
  max-width: 280px;
  height: auto;
  vertical-align: middle;
}

.cqr-hint {
  text-align: center;
  color: #6b7280;
  font-size: 0.8125rem;
  line-height: 1.55;
  margin: 0;
  max-width: 22rem;
}

.cqr-actions {
  display: flex;
  gap: 0.625rem;
  width: 100%;
  max-width: 22rem;
}

.cqr-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 600;
  font-family: inherit;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background 0.12s, box-shadow 0.12s;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
  }
}

.cqr-btn--flex {
  flex: 1;
  min-width: 0;
}

.cqr-btn--primary {
  background: #2563eb;
  color: #fff;

  &:hover {
    background: #1d4ed8;
  }
}
</style>

<style lang="scss">
/* Portal: dropdown above Contact Details + QR dialog */
.cqr-download-menu {
  min-width: 12rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12);
  padding: 0.25rem;
  z-index: 10080;
}

.cqr-download-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  width: 100%;
  padding: 0.45rem 0.65rem;
  border-radius: 0.25rem;
  border: none;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  outline: none;
  font-family: inherit;
  text-align: left;

  &:hover,
  &[data-highlighted] {
    background: #f3f4f6;
    color: #111827;
  }
}

.cqr-download-item__icon {
  flex-shrink: 0;
  color: #6b7280;
}
</style>
