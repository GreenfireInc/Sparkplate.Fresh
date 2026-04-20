<template>
  <DialogRoot :open="dialogOpen" @update:open="onDialogOpen">
    <DialogPortal>
      <DialogOverlay class="cgq-overlay" />
      <DialogContent
        class="cgq-modal"
        data-stacked-modal="gpg-qrcode"
        :aria-describedby="undefined"
      >
        <div class="cgq-header">
          <div class="cgq-header__row">
            <DialogTitle class="cgq-header__title">GPG Public Key QR Code</DialogTitle>
            <DialogClose class="cgq-header__close" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </DialogClose>
          </div>
        </div>

        <Separator class="cgq-separator" />

        <div class="cgq-body">
          <div v-if="loading" class="cgq-state cgq-state--muted">
            <p class="cgq-state__text">Generating QR code…</p>
          </div>

          <div v-else-if="error" class="cgq-state">
            <p class="cgq-state__error">{{ error }}</p>
            <button type="button" class="cgq-btn cgq-btn--primary" @click="generateQRCode">
              Retry
            </button>
          </div>

          <div v-else-if="qrCodeDataUrl && wallet" class="cgq-container">
            <div class="cgq-address">
              <span class="cgq-address__wrapper">
                <img
                  v-if="getCryptoIconPath(wallet.coinTicker)"
                  :src="getCryptoIconPath(wallet.coinTicker)!"
                  :alt="wallet.coinTicker"
                  class="cgq-address__icon"
                  @error="($event.target as HTMLImageElement).style.display = 'none'"
                />
                <code class="cgq-address__text">{{ wallet.coinTicker.toLowerCase() }}://{{ wallet.address }}</code>
              </span>
            </div>

            <div class="cgq-qr-wrapper">
              <img :src="qrCodeDataUrl" alt="GPG Public Key QR Code" class="cgq-qr-image" />
            </div>

            <div v-if="wallet.keyFingerprint" class="cgq-fingerprint">
              <label class="cgq-label">Key fingerprint</label>
              <code class="cgq-fingerprint__text">{{ wallet.keyFingerprint }}</code>
            </div>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
  Separator,
} from 'radix-vue'
import QRCode from 'qrcode'
import type { Wallet } from '@/services/addressBook/walletService'

defineOptions({ name: 'SubModalGPGQRCode' })

const props = defineProps<{
  show: boolean
  wallet: Wallet | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const dialogOpen = computed(() => !!(props.show && props.wallet))

function onDialogOpen(open: boolean) {
  if (!open) handleClose()
}

const loading = ref(false)
const error = ref<string | null>(null)
const qrCodeDataUrl = ref<string | null>(null)

const generateQRCode = async () => {
  if (!props.wallet || !props.wallet.gpgPublicKey) {
    error.value = 'No GPG public key provided'
    return
  }

  loading.value = true
  error.value = null
  qrCodeDataUrl.value = null

  try {
    const dataUrl = await QRCode.toDataURL(props.wallet.gpgPublicKey, {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    })
    qrCodeDataUrl.value = dataUrl
  } catch (err: unknown) {
    console.error('Error generating QR code:', err)
    error.value = err instanceof Error ? err.message : 'Failed to generate QR code'
  } finally {
    loading.value = false
  }
}

const handleClose = () => emit('close')

const getCryptoIconPath = (coinTicker: string): string | null => {
  if (!coinTicker) return null
  return `/assets/icons/crypto/${coinTicker.toLowerCase()}.svg`
}

watch(
  () => props.show,
  (open) => {
    if (open && props.wallet?.gpgPublicKey) generateQRCode()
  },
)

onMounted(() => {
  if (props.show && props.wallet?.gpgPublicKey) generateQRCode()
})
</script>

<style scoped>
/* Sits above Contact Details (10061) and stacked child modals */
.cgq-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10100;
  animation: cgq-fade 0.15s ease;
}

@keyframes cgq-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

.cgq-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10101;
  width: min(95vw, 40rem);
  max-height: 90vh;
  background: #f9fafb;
  border-radius: 0.75rem;
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: cgq-pop 0.18s ease;
}

@keyframes cgq-pop {
  from {
    opacity: 0;
    transform: translate(-50%, -48%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.cgq-header {
  padding: 0.875rem 1.25rem 0.75rem;
  flex-shrink: 0;
}

.cgq-header__row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  padding-right: 2.5rem;
}

.cgq-header__title {
  flex: 1;
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 700;
  color: #111827;
}

.cgq-header__close {
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
}

.cgq-header__close svg {
  width: 1rem;
  height: 1rem;
}

.cgq-header__close:hover {
  background: #e5e7eb;
  color: #111827;
}

.cgq-separator {
  height: 1px;
  background: #e5e7eb;
  flex-shrink: 0;
}

.cgq-body {
  padding: 1.25rem 1.25rem 1.5rem;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
}

.cgq-state {
  text-align: center;
  padding: 2rem 0.75rem;
}

.cgq-state--muted .cgq-state__text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.cgq-state__error {
  color: #dc2626;
  font-size: 0.875rem;
  margin: 0 0 1rem;
}

.cgq-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.875rem;
  font-size: 0.8125rem;
  font-weight: 600;
  font-family: inherit;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background 0.12s;
}

.cgq-btn--primary {
  background: #2563eb;
  color: #fff;
}

.cgq-btn--primary:hover {
  background: #1d4ed8;
}

.cgq-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.cgq-address {
  width: 100%;
  display: flex;
  justify-content: center;
}

.cgq-address__wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.875rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  max-width: 100%;
}

.cgq-address__icon {
  width: 1.25rem;
  height: 1.25rem;
  object-fit: contain;
  flex-shrink: 0;
}

.cgq-address__text {
  font-family: ui-monospace, 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.8125rem;
  color: #1f2937;
  word-break: break-all;
  margin: 0;
}

.cgq-qr-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.cgq-qr-image {
  display: block;
  width: 100%;
  max-width: 24rem;
  height: auto;
}

.cgq-fingerprint {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.cgq-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cgq-fingerprint__text {
  width: 100%;
  font-family: ui-monospace, 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.75rem;
  color: #0369a1;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  padding: 0.75rem;
  border-radius: 0.375rem;
  text-align: center;
  word-break: break-all;
}
</style>
