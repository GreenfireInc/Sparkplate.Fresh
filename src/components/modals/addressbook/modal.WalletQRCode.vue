<template>
  <DialogRoot :open="dialogOpen" @update:open="onDialogOpen">
    <DialogPortal>
      <DialogOverlay class="cwq-overlay" />
      <DialogContent
        class="cwq-modal"
        data-stacked-modal="wallet-qrcode"
        :aria-describedby="undefined"
      >
        <div class="cwq-header">
          <div class="cwq-header__row">
            <DialogTitle class="cwq-header__title">Wallet QR Code</DialogTitle>
            <DialogClose class="cwq-header__close" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </DialogClose>
          </div>
        </div>

        <Separator class="cwq-separator" />

        <div class="cwq-body">
          <div v-if="loading" class="cwq-state cwq-state--muted">
            <p class="cwq-state__text">Generating QR code…</p>
          </div>

          <div v-else-if="error" class="cwq-state">
            <p class="cwq-state__error">{{ error }}</p>
            <button type="button" class="cwq-btn cwq-btn--primary" @click="generateQRCode">
              Retry
            </button>
          </div>

          <div v-else-if="qrCodeDataUrl && wallet" class="wallet-qr-container">
            <div v-if="wallet.keyFingerprint" class="fingerprint-section">
              <code class="fingerprint-text">{{ wallet.keyFingerprint }}</code>
            </div>

            <div class="qr-code-wrapper">
              <img :src="qrCodeDataUrl" alt="Wallet QR Code" class="qr-code-image" />
              <img
                v-if="getCryptoIconPath(wallet.coinTicker)"
                :src="getCryptoIconPath(wallet.coinTicker)!"
                :alt="wallet.coinTicker"
                class="crypto-icon-overlay"
                @error="($event.target as HTMLImageElement).style.display = 'none'"
              />
            </div>

            <div class="address-section full-address-section">
              <label class="section-label">Public wallet address</label>
              <div class="full-address-wrapper">
                <code class="full-address-text">{{ fullAddress }}</code>
                <button type="button" class="copy-button" title="Copy address" @click="copyAddress">
                  <Copy :size="16" />
                </button>
              </div>
            </div>

            <div v-if="wallet.cryptoPublicKey" class="address-section crypto-public-key-section">
              <label class="section-label">Crypto public key</label>
              <div class="full-address-wrapper">
                <code class="full-address-text">{{ wallet.cryptoPublicKey }}</code>
                <button type="button" class="copy-button" title="Copy crypto public key" @click="copyCryptoPublicKey">
                  <Copy :size="16" />
                </button>
              </div>
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
import { Copy } from 'lucide-vue-next'
import QRCode from 'qrcode'
import type { Wallet } from '@/services/addressBook/walletService'

defineOptions({ name: 'ModalWalletQRCode' })

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

const loading = ref(true)
const error = ref<string | null>(null)
const qrCodeDataUrl = ref<string | null>(null)

const fullAddress = computed(() => {
  if (!props.wallet) return ''
  return `${props.wallet.coinTicker.toLowerCase()}://${props.wallet.address}`
})

const generateQRCode = async () => {
  if (!props.wallet) {
    error.value = 'No wallet provided'
    return
  }

  loading.value = true
  error.value = null
  qrCodeDataUrl.value = null

  try {
    const walletAddress = `${props.wallet.coinTicker.toLowerCase()}://${props.wallet.address}`
    const dataUrl = await QRCode.toDataURL(walletAddress, {
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

const copyAddress = async () => {
  if (!fullAddress.value) return
  try {
    await navigator.clipboard.writeText(fullAddress.value)
  } catch (err) {
    console.error('Failed to copy address:', err)
    alert('Failed to copy address to clipboard')
  }
}

const copyCryptoPublicKey = async () => {
  if (!props.wallet?.cryptoPublicKey) return
  try {
    await navigator.clipboard.writeText(props.wallet.cryptoPublicKey)
  } catch (err) {
    console.error('Failed to copy crypto public key:', err)
    alert('Failed to copy crypto public key to clipboard')
  }
}

const getCryptoIconPath = (coinTicker: string): string | null => {
  if (!coinTicker) return null
  return `/assets/icons/crypto/${coinTicker.toLowerCase()}.svg`
}

watch(
  () => props.show,
  (open) => {
    if (open && props.wallet) generateQRCode()
  },
)

onMounted(() => {
  if (props.show && props.wallet) generateQRCode()
})
</script>

<style scoped>
/* Above Contact Details (10061); align with Contact QR (10070) but above stacked child modals */
.cwq-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10100;
  animation: cwq-fade 0.15s ease;
}

@keyframes cwq-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.cwq-modal {
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
  animation: cwq-pop 0.18s ease;
}

@keyframes cwq-pop {
  from {
    opacity: 0;
    transform: translate(-50%, -48%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.cwq-header {
  padding: 0.875rem 1.25rem 0.75rem;
  flex-shrink: 0;
}

.cwq-header__row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  padding-right: 2.5rem;
}

.cwq-header__title {
  flex: 1;
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 700;
  color: #111827;
}

.cwq-header__close {
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

.cwq-header__close svg {
  width: 1rem;
  height: 1rem;
}

.cwq-header__close:hover {
  background: #e5e7eb;
  color: #111827;
}

.cwq-separator {
  height: 1px;
  background: #e5e7eb;
  flex-shrink: 0;
}

.cwq-body {
  padding: 1.25rem 1.25rem 1.5rem;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
}

.cwq-state {
  text-align: center;
  padding: 2rem 0.75rem;
}

.cwq-state--muted .cwq-state__text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.cwq-state__error {
  color: #dc2626;
  font-size: 0.875rem;
  margin: 0 0 1rem;
}

.cwq-btn {
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

.cwq-btn--primary {
  background: #2563eb;
  color: #fff;
}

.cwq-btn--primary:hover {
  background: #1d4ed8;
}

.wallet-qr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.fingerprint-section {
  width: 100%;
  text-align: center;
}

.section-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.fingerprint-text {
  font-family: ui-monospace, 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.75rem;
  color: #0369a1;
  background-color: #f0f9ff;
  padding: 0.75rem;
  border-radius: 0.375rem;
  display: block;
  word-break: break-all;
}

.qr-code-wrapper {
  background: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  position: relative;
}

.qr-code-image {
  display: block;
  width: 100%;
  max-width: 400px;
  height: auto;
}

.crypto-icon-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  object-fit: contain;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  padding: 8px;
  z-index: 1;
}

.address-section {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.full-address-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  background: #fff;
  border: 1px solid #e5e7eb;
  padding: 0.75rem;
  border-radius: 0.375rem;
}

.full-address-text {
  font-family: ui-monospace, 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.8rem;
  color: #1f2937;
  display: block;
  word-break: break-all;
  flex: 1;
  min-width: 0;
  margin: 0;
}

.copy-button {
  background: #f3f4f6;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  flex-shrink: 0;
  transition: background 0.12s, color 0.12s;
}

.copy-button:hover {
  background: #e5e7eb;
  color: #111827;
}
</style>
