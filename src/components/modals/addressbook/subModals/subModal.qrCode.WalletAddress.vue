<template>
  <DialogRoot :open="dialogOpen" @update:open="onDialogOpen">
    <DialogPortal>
      <DialogOverlay class="cwq-overlay" />
      <DialogContent
        class="cwq-modal"
        data-stacked-modal="wallet-qrcode"
        :aria-describedby="undefined"
      >
        <!-- Header -->
        <div class="cwq-header">
          <div class="cwq-header__row">
            <div class="cwq-header__title-group">
              <DialogTitle class="cwq-header__title">Wallet QR Code</DialogTitle>
              <!-- <span v-if="wallet" class="cwq-header__subtitle">
                {{ wallet.coinTicker }} · {{ wallet.name || wallet.address.slice(0, 10) + '…' }}
              </span> -->
            </div>
            <DialogClose class="cwq-header__close" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </DialogClose>
          </div>
        </div>

        <Separator class="cwq-separator" />

        <!-- Body -->
        <div class="cwq-body">

          <!-- Loading -->
          <div v-if="loading" class="cwq-state cwq-state--muted">
            <div class="cwq-spinner" aria-hidden="true" />
            <p class="cwq-state__text">Generating QR code…</p>
          </div>

          <!-- Error -->
          <div v-else-if="error" class="cwq-state">
            <p class="cwq-state__error">{{ error }}</p>
            <button type="button" class="cwq-btn cwq-btn--primary" @click="generateQRCode">
              Retry
            </button>
          </div>

          <!-- Content -->
          <div v-else-if="qrCodeDataUrl && wallet" class="cwq-content">

            <!-- Key fingerprint badge -->
            <div v-if="wallet.keyFingerprint" class="cwq-fingerprint">
              <span class="cwq-fingerprint__label">Key fingerprint</span>
              <code class="cwq-fingerprint__text">{{ wallet.keyFingerprint }}</code>
            </div>

            <!-- QR image -->
            <div class="cwq-qr">
              <img :src="qrCodeDataUrl" alt="Wallet QR Code" class="cwq-qr__image" />
              <img
                v-if="getCryptoIconPath(wallet.coinTicker)"
                :src="getCryptoIconPath(wallet.coinTicker)!"
                :alt="wallet.coinTicker"
                class="cwq-qr__icon"
                @error="($event.target as HTMLImageElement).style.display = 'none'"
              />
            </div>

            <!-- Address / Public Key -->
            <TooltipProvider :delay-duration="300">
              <div class="cwq-address-panel">

                <!-- No public key — plain address row -->
                <template v-if="!wallet.cryptoPublicKey">
                  <span class="cwq-panel__label">Public wallet address</span>
                  <div class="cwq-address-row">
                    <code
                      class="cwq-address-row__text cwq-address-row__text--clickable"
                      :title="showTickerPrefix ? 'Click to hide ticker prefix' : 'Click to show ticker prefix'"
                      role="button"
                      tabindex="0"
                      @click="toggleTickerPrefix"
                      @keydown.enter.prevent="toggleTickerPrefix"
                      @keydown.space.prevent="toggleTickerPrefix"
                    >{{ fullAddress }}</code>
                    <TooltipRoot v-model:open="tooltipAddress">
                      <TooltipTrigger as-child>
                        <button
                          type="button"
                          class="cwq-copy-btn"
                          :class="{ 'cwq-copy-btn--copied': copiedAddress }"
                          :aria-label="copiedAddress ? 'Copied!' : 'Copy address'"
                          @click="copyAddress"
                        >
                          <Check v-if="copiedAddress" :size="15" />
                          <Copy v-else :size="15" />
                        </button>
                      </TooltipTrigger>
                      <TooltipPortal>
                        <TooltipContent class="cwq-tooltip" :side-offset="6">
                          {{ copiedAddress ? 'Copied!' : 'Copy address' }}
                          <TooltipArrow class="cwq-tooltip__arrow" />
                        </TooltipContent>
                      </TooltipPortal>
                    </TooltipRoot>
                  </div>
                </template>

                <!-- Both present — tab toggle -->
                <TabsRoot v-else v-model="activeAddressTab" class="cwq-tabs">
                  <TabsList class="cwq-tabs__list">
                    <TabsTrigger value="address" class="cwq-tabs__trigger">Address</TabsTrigger>
                    <TabsTrigger value="pubkey" class="cwq-tabs__trigger">Public Key</TabsTrigger>
                  </TabsList>

                  <TabsContent value="address" class="cwq-tabs__panel">
                    <div class="cwq-address-row">
                      <code
                        class="cwq-address-row__text cwq-address-row__text--clickable"
                        :title="showTickerPrefix ? 'Click to hide ticker prefix' : 'Click to show ticker prefix'"
                        role="button"
                        tabindex="0"
                        @click="toggleTickerPrefix"
                        @keydown.enter.prevent="toggleTickerPrefix"
                        @keydown.space.prevent="toggleTickerPrefix"
                      >{{ fullAddress }}</code>
                      <TooltipRoot v-model:open="tooltipAddress">
                        <TooltipTrigger as-child>
                          <button
                            type="button"
                            class="cwq-copy-btn"
                            :class="{ 'cwq-copy-btn--copied': copiedAddress }"
                            :aria-label="copiedAddress ? 'Copied!' : 'Copy address'"
                            @click="copyAddress"
                          >
                            <Check v-if="copiedAddress" :size="15" />
                            <Copy v-else :size="15" />
                          </button>
                        </TooltipTrigger>
                        <TooltipPortal>
                          <TooltipContent class="cwq-tooltip" :side-offset="6">
                            {{ copiedAddress ? 'Copied!' : 'Copy address' }}
                            <TooltipArrow class="cwq-tooltip__arrow" />
                          </TooltipContent>
                        </TooltipPortal>
                      </TooltipRoot>
                    </div>
                  </TabsContent>

                  <TabsContent value="pubkey" class="cwq-tabs__panel">
                    <div class="cwq-address-row">
                      <code class="cwq-address-row__text">{{ wallet.cryptoPublicKey }}</code>
                      <TooltipRoot v-model:open="tooltipPubkey">
                        <TooltipTrigger as-child>
                          <button
                            type="button"
                            class="cwq-copy-btn"
                            :class="{ 'cwq-copy-btn--copied': copiedPubkey }"
                            :aria-label="copiedPubkey ? 'Copied!' : 'Copy public key'"
                            @click="copyCryptoPublicKey"
                          >
                            <Check v-if="copiedPubkey" :size="15" />
                            <Copy v-else :size="15" />
                          </button>
                        </TooltipTrigger>
                        <TooltipPortal>
                          <TooltipContent class="cwq-tooltip" :side-offset="6">
                            {{ copiedPubkey ? 'Copied!' : 'Copy public key' }}
                            <TooltipArrow class="cwq-tooltip__arrow" />
                          </TooltipContent>
                        </TooltipPortal>
                      </TooltipRoot>
                    </div>
                  </TabsContent>
                </TabsRoot>

              </div>
            </TooltipProvider>
          </div>

        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import {
  DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogClose,
  Separator,
  TabsRoot, TabsList, TabsTrigger, TabsContent,
  TooltipProvider, TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow,
} from 'radix-vue'
import { Copy, Check } from 'lucide-vue-next'
import QRCode from 'qrcode'
import type { Wallet } from '@/services/addressBook/service.addressBook.Wallet'

defineOptions({ name: 'SubModalQrCodeWalletAddress' })

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
const activeAddressTab = ref<'address' | 'pubkey'>('address')

// Copy state
const copiedAddress = ref(false)
const copiedPubkey = ref(false)
const tooltipAddress = ref(false)
const tooltipPubkey = ref(false)

/** When true, the displayed/encoded address is `<ticker>://<address>` (URI form);
 *  when false, just the raw address. Toggled by clicking the address text. */
const showTickerPrefix = ref(true)

const fullAddress = computed(() => {
  if (!props.wallet) return ''
  const prefix = showTickerPrefix.value ? `${props.wallet.coinTicker.toLowerCase()}://` : ''
  return `${prefix}${props.wallet.address}`
})

function toggleTickerPrefix() {
  showTickerPrefix.value = !showTickerPrefix.value
  if (props.wallet) generateQRCode()
}

const generateQRCode = async () => {
  if (!props.wallet) {
    error.value = 'No wallet provided'
    return
  }
  loading.value = true
  error.value = null
  qrCodeDataUrl.value = null
  try {
    const dataUrl = await QRCode.toDataURL(fullAddress.value, {
      width: 400,
      margin: 2,
      color: { dark: '#000000', light: '#FFFFFF' },
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

function flashCopied(flag: typeof copiedAddress) {
  flag.value = true
  setTimeout(() => { flag.value = false }, 2000)
}

const copyAddress = async () => {
  if (!fullAddress.value) return
  try {
    await navigator.clipboard.writeText(fullAddress.value)
    flashCopied(copiedAddress)
  } catch (err) {
    console.error('Failed to copy address:', err)
  }
}

const copyCryptoPublicKey = async () => {
  if (!props.wallet?.cryptoPublicKey) return
  try {
    await navigator.clipboard.writeText(props.wallet.cryptoPublicKey)
    flashCopied(copiedPubkey)
  } catch (err) {
    console.error('Failed to copy crypto public key:', err)
  }
}

const getCryptoIconPath = (coinTicker: string): string | null => {
  if (!coinTicker) return null
  return `/assets/icons/crypto/${coinTicker.toLowerCase()}.svg`
}

watch(
  () => props.show,
  (open) => {
    if (open && props.wallet) {
      activeAddressTab.value = 'address'
      copiedAddress.value = false
      copiedPubkey.value = false
      showTickerPrefix.value = true
      generateQRCode()
    }
  },
)

onMounted(() => {
  if (props.show && props.wallet) generateQRCode()
})
</script>

<style lang="scss" scoped>
/* ── Overlay ─────────────────────────────────────────────── */
/* z-index: above Contact Details (10061) */
.cwq-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 10100;
  animation: cwq-fade 0.15s ease;
}

@keyframes cwq-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ── Modal shell ─────────────────────────────────────────── */
.cwq-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10101;
  width: min(95vw, 28rem);
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
  from { opacity: 0; transform: translate(-50%, -48%); }
  to   { opacity: 1; transform: translate(-50%, -50%); }
}

/* ── Header ──────────────────────────────────────────────── */
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

.cwq-header__title-group {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.cwq-header__title {
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;
}

.cwq-header__subtitle {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

  svg { width: 1rem; height: 1rem; }

  &:hover { background: #e5e7eb; color: #111827; }
}

/* ── Separator ───────────────────────────────────────────── */
.cwq-separator {
  height: 1px;
  background: #e5e7eb;
  flex-shrink: 0;
}

/* ── Body ────────────────────────────────────────────────── */
.cwq-body {
  padding: 1.25rem 1.25rem 1.5rem;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
}

/* ── States ──────────────────────────────────────────────── */
.cwq-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2.5rem 0.75rem;
}

.cwq-state--muted .cwq-state__text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.cwq-state__error {
  color: #dc2626;
  font-size: 0.875rem;
  margin: 0;
}

.cwq-spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: cwq-spin 0.7s linear infinite;
}

@keyframes cwq-spin {
  to { transform: rotate(360deg); }
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
  &:hover { background: #1d4ed8; }
}

/* ── Content layout ──────────────────────────────────────── */
.cwq-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

/* ── Fingerprint ─────────────────────────────────────────── */
.cwq-fingerprint {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.cwq-fingerprint__label {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #6b7280;
}

.cwq-fingerprint__text {
  font-family: ui-monospace, 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.625rem;
  color: #0369a1;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  display: block;
  word-break: break-all;
}

/* ── QR code ─────────────────────────────────────────────── */
.cwq-qr {
  background: #fff;
  padding: 0.875rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  position: relative;
}

.cwq-qr__image {
  display: block;
  width: 100%;
  max-width: 320px;
  height: auto;
}

.cwq-qr__icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 52px;
  height: 52px;
  object-fit: contain;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 50%;
  padding: 7px;
  z-index: 1;
}

/* ── Address panel ───────────────────────────────────────── */
.cwq-address-panel {
  width: 100%;
}

.cwq-panel__label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #6b7280;
  margin-bottom: 0.4rem;
}

.cwq-address-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  padding: 0.6rem 0.75rem;
  border-radius: 0.375rem;
}

.cwq-address-row__text {
  font-family: ui-monospace, 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.775rem;
  color: #1f2937;
  display: block;
  word-break: break-all;
  flex: 1;
  min-width: 0;
  margin: 0;
}

.cwq-address-row__text--clickable {
  cursor: pointer;
  user-select: none;
  border-radius: 0.25rem;
  padding: 0.1rem 0.2rem;
  margin: -0.1rem -0.2rem;
  transition: background 0.12s, color 0.12s;

  &:hover { background: #f3f4f6; color: #2563eb; }

  &:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 1px;
  }
}

/* ── Copy button ─────────────────────────────────────────── */
.cwq-copy-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.875rem;
  height: 1.875rem;
  padding: 0;
  background: #f3f4f6;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  color: #6b7280;
  transition: background 0.12s, color 0.12s;

  &:hover { background: #e5e7eb; color: #111827; }

  &.cwq-copy-btn--copied {
    background: #dcfce7;
    color: #16a34a;
  }
}

/* ── Tabs ────────────────────────────────────────────────── */
.cwq-tabs {
  width: 100%;
}

.cwq-tabs__list {
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 0.75rem;
}

.cwq-tabs__trigger {
  padding: 0.4rem 0.875rem;
  border: none;
  background: none;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  position: relative;
  transition: color 0.12s;
  font-family: inherit;

  &:hover { color: #111827; }

  &[data-state='active'] {
    color: #2563eb;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background: #2563eb;
      border-radius: 1px;
    }
  }
}

.cwq-tabs__panel {
  outline: none;
}

/* ── Tooltip ─────────────────────────────────────────────── */
.cwq-tooltip {
  z-index: 10200;
  padding: 0.35rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #f9fafb;
  background: #1f2937;
  border-radius: 0.3rem;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.12);
  white-space: nowrap;
}

.cwq-tooltip__arrow {
  fill: #1f2937;
}
</style>
