<template>
  <div class="cwa-card">
    <button
      type="button"
      class="cwa-delete"
      title="Delete wallet"
      @click="handleDelete"
    >
      <Trash2 :size="16" />
    </button>

    <button
      type="button"
      class="cwa-qr-trigger"
      aria-label="Open wallet QR code"
      @click="showQRModal = true"
    >
      <div class="cwa-qr-frame">
        <img
          v-if="qrCodeDataUrl"
          :src="qrCodeDataUrl"
          alt="Wallet QR Code"
          class="cwa-qr-frame__img"
        />
        <div v-else class="cwa-qr-frame__loading">Generating QR code…</div>
        <img
          v-if="qrCodeDataUrl && getCryptoIconPath(wallet.coinTicker)"
          :src="getCryptoIconPath(wallet.coinTicker)!"
          :alt="wallet.coinTicker"
          class="cwa-qr-frame__overlay-icon"
          @error="($event.target as HTMLImageElement).style.display = 'none'"
        />
      </div>
    </button>

    <ModalWalletQRCode
      :show="showQRModal"
      :wallet="wallet"
      @close="showQRModal = false"
    />

    <Separator class="cwa-separator" />

    <div class="cwa-footer">
      <div class="cwa-row cwa-row--address">
        <code class="cwa-row__mono cwa-row__mono--address">{{ truncatedAddress }}</code>
        <button
          type="button"
          class="cwa-icon-btn"
          title="Copy address"
          @click="copyToClipboard(wallet.address)"
        >
          <Copy :size="16" />
        </button>
      </div>
      <div v-if="wallet.keyFingerprint" class="cwa-row cwa-row--fingerprint">
        <code class="cwa-row__mono cwa-row__mono--fingerprint">{{ truncatedFingerprint }}</code>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Separator } from 'radix-vue'
import { Copy, Trash2 } from 'lucide-vue-next'
import QRCode from 'qrcode'
import type { Wallet } from '@/services/addressBook/service.addressBook.Wallet'
import { useTruncatedAddress } from '@/components/structure/truncate.publicWalletAddress'
import { useTruncatedFingerprint } from '@/components/structure/truncate.gpgkeyFingerprint'
import ModalWalletQRCode from '@/components/modals/addressbook/subModals/subModal.qrCode.WalletAddress.vue'

defineOptions({ name: 'CardWalletAddress' })

const props = defineProps<{
  wallet: Wallet
}>()

const emit = defineEmits<{
  (e: 'delete', walletId: number): void
  (e: 'copy', address: string): void
}>()

const qrCodeDataUrl = ref<string | null>(null)
const showQRModal = ref(false)

const truncatedAddress = useTruncatedAddress(computed(() => props.wallet))
const truncatedFingerprint = useTruncatedFingerprint(computed(() => props.wallet))

const generateQRCode = async () => {
  const walletAddress = `${props.wallet.coinTicker.toLowerCase()}://${props.wallet.address}`
  try {
    const dataUrl = await QRCode.toDataURL(walletAddress, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    })
    qrCodeDataUrl.value = dataUrl
  } catch (error) {
    console.error('Error generating QR code:', error)
    qrCodeDataUrl.value = null
  }
}

const getCryptoIconPath = (coinTicker: string): string | null => {
  if (!coinTicker) return null
  return `/assets/icons/crypto/${coinTicker.toLowerCase()}.svg`
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    emit('copy', text)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const handleDelete = () => {
  emit('delete', props.wallet.id)
}

onMounted(() => {
  generateQRCode()
})

watch(
  () => props.wallet,
  () => {
    generateQRCode()
  },
  { deep: true },
)
</script>

<style scoped>
/* Card shell — aligned with Contact Details / radix dialog surfaces (#f9fafb, 0.75rem radius) */
.cwa-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.18s ease, border-color 0.18s ease;
  overflow: hidden;
  gap: 0.625rem;
}

.cwa-card:hover {
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.12);
  border-color: #d1d5db;
}

/* Delete button — pinned to the upper-right corner of the card */
.cwa-delete {
  position: absolute;
  top: 2rem;
  right: 0.5rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  background: #fef2f2;
  border-radius: 0.375rem;
  color: #dc2626;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
  flex-shrink: 0;
}

.cwa-delete:hover {
  background: #fee2e2;
  color: #b91c1c;
}

.cwa-delete:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* QR — centered white inset panel; top margin reserves space for the absolute delete button */
.cwa-qr-trigger {
  margin: 1.5rem auto 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  transition: opacity 0.15s ease;
}

.cwa-qr-trigger:hover {
  opacity: 0.92;
}

.cwa-qr-trigger:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

.cwa-qr-frame {
  position: relative;
  background: #fff;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cwa-qr-frame__img {
  width: 100%;
  height: auto;
  display: block;
  vertical-align: middle;
}

.cwa-qr-frame__loading {
  color: #6b7280;
  font-size: 0.75rem;
  text-align: center;
  padding: 1.5rem 0.5rem;
}

.cwa-qr-frame__overlay-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  object-fit: contain;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 50%;
  padding: 6px;
  pointer-events: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.cwa-separator {
  height: 1px;
  background: #e5e7eb;
  flex-shrink: 0;
  margin: 0 -0.25rem;
}

.cwa-footer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-shrink: 0;
}

.cwa-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.45rem 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  background: #fff;
}

.cwa-row--fingerprint {
  background: #f0f9ff;
  border-color: #bae6fd;
}

.cwa-row__mono {
  margin: 0;
  flex: 1;
  min-width: 0;
  font-family: ui-monospace, 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.65rem;
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

.cwa-row__mono--address {
  color: #111827;
}

.cwa-row__mono--fingerprint {
  color: #0369a1;
}

.cwa-icon-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  background: #f3f4f6;
  border-radius: 0.375rem;
  color: #6b7280;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
}

.cwa-icon-btn:hover {
  background: #e5e7eb;
  color: #111827;
}

.cwa-icon-btn:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 1px;
}
</style>
