<template>
  <DialogRoot :open="dialogOpen" @update:open="onDialogOpen">
    <DialogPortal>
      <DialogOverlay class="iwa-overlay" data-stacked-modal="input-wallet-address" />
      <DialogContent
        class="iwa-modal"
        data-stacked-modal="input-wallet-address"
        :aria-describedby="undefined"
        @pointer-down-outside="onDialogPointerDownOutside"
      >
        <div class="iwa-header">
          <div class="iwa-header__row">
            <DialogTitle class="iwa-header__title">
              {{ title }}
            </DialogTitle>
            <DialogClose class="iwa-header__close" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </DialogClose>
          </div>
        </div>

        <Separator class="iwa-separator" />

        <div class="iwa-body">
          <div class="iwa-warning" role="alert">
            <AlertTriangle :size="18" class="iwa-warning__icon" aria-hidden="true" />
            <div class="iwa-warning__text">
              <strong>Double-check the wallet address.</strong>
              Transactions sent to a wrong address are
              <em>irreversible</em> and funds cannot be recovered.
            </div>
          </div>

          <div class="iwa-field">
            <label :for="firstInputId" class="iwa-field__label">
              Wallet address
              <span class="iwa-field__hint">Pasting allowed</span>
            </label>
            <div class="iwa-field__control">
              <input
                :id="firstInputId"
                v-model="firstAddress"
                :type="showAddresses ? 'text' : 'password'"
                class="iwa-input iwa-input--mono"
                autocomplete="off"
                autocapitalize="off"
                autocorrect="off"
                spellcheck="false"
                :placeholder="addressPlaceholder"
                @input="onFirstInput"
              />
              <button
                type="button"
                class="iwa-icon-btn"
                :title="showAddresses ? 'Hide addresses' : 'Show addresses'"
                :aria-label="showAddresses ? 'Hide addresses' : 'Show addresses'"
                @click="showAddresses = !showAddresses"
              >
                <component :is="showAddresses ? EyeOff : Eye" :size="16" />
              </button>
            </div>
          </div>

          <div class="iwa-field">
            <label :for="secondInputId" class="iwa-field__label">
              Confirm wallet address
              <span class="iwa-field__hint iwa-field__hint--strong">Paste disabled — please type to confirm</span>
            </label>
            <div class="iwa-field__control">
              <input
                :id="secondInputId"
                v-model="secondAddress"
                :type="showAddresses ? 'text' : 'password'"
                class="iwa-input iwa-input--mono"
                :class="{
                  'is-match': isMatch,
                  'is-mismatch': secondAddress.length > 0 && !isMatch,
                }"
                autocomplete="off"
                autocapitalize="off"
                autocorrect="off"
                spellcheck="false"
                :placeholder="addressPlaceholder"
                @paste.prevent="onPasteAttempt"
                @drop.prevent="onPasteAttempt"
                @input="onSecondInput"
              />
              <div class="iwa-status" aria-live="polite">
                <span v-if="!secondAddress" class="iwa-status__muted">—</span>
                <span v-else-if="isMatch" class="iwa-status__ok" title="Addresses match">
                  <Check :size="16" />
                </span>
                <span v-else class="iwa-status__err" title="Addresses do not match">
                  <AlertTriangle :size="16" />
                </span>
              </div>
            </div>
            <p v-if="pasteBlockedMessage" class="iwa-warning-inline" role="status">
              Paste is disabled in this field. Please type the address to confirm it.
            </p>
            <p v-else-if="secondAddress.length > 0 && !isMatch" class="iwa-warning-inline iwa-warning-inline--err">
              The addresses don't match yet.
            </p>
          </div>
        </div>

        <Separator class="iwa-separator" />

        <div class="iwa-footer">
          <button type="button" class="iwa-btn iwa-btn--muted" @click="handleClose">
            Cancel
          </button>
          <button
            type="button"
            class="iwa-btn iwa-btn--primary"
            :disabled="!canConfirm"
            @click="handleConfirm"
          >
            Confirm address
          </button>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
  Separator,
} from 'radix-vue'
import { AlertTriangle, Check, Eye, EyeOff } from 'lucide-vue-next'

defineOptions({ name: 'SubModalInputWalletAddress' })

const props = withDefaults(
  defineProps<{
    show: boolean
    title?: string
    coinTicker?: string
    /** Allow submitting without an exact case-sensitive match (defaults to strict). */
    caseInsensitive?: boolean
  }>(),
  {
    title: 'Enter wallet address',
    coinTicker: '',
    caseInsensitive: false,
  },
)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm', address: string): void
}>()

const dialogOpen = computed(() => props.show)

function onDialogOpen(open: boolean) {
  if (!open) handleClose()
}

// Keep stacked dialogs (like this one over add-currency) alive when clicking within.
function onDialogPointerDownOutside(event: Event) {
  const target = event.target as HTMLElement | null
  if (target?.closest('[data-stacked-modal]')) {
    event.preventDefault()
  }
}

const firstAddress = ref('')
const secondAddress = ref('')
const showAddresses = ref(false)
const pasteBlockedMessage = ref(false)
let pasteHintTimer: ReturnType<typeof setTimeout> | null = null

const firstInputId = `iwa-first-${Math.random().toString(36).slice(2, 8)}`
const secondInputId = `iwa-second-${Math.random().toString(36).slice(2, 8)}`

const addressPlaceholder = computed(() => {
  if (props.coinTicker) return `${props.coinTicker.toLowerCase()}://wallet-address`
  return 'Enter wallet address'
})

const normalized = (value: string) =>
  props.caseInsensitive ? value.trim().toLowerCase() : value.trim()

const isMatch = computed(() => {
  if (!firstAddress.value || !secondAddress.value) return false
  return normalized(firstAddress.value) === normalized(secondAddress.value)
})

const canConfirm = computed(
  () => firstAddress.value.trim().length > 0 && isMatch.value,
)

function onFirstInput() {
  // no-op; kept for future validation hooks (e.g., ticker prefix check)
}

function onSecondInput() {
  if (pasteBlockedMessage.value) {
    pasteBlockedMessage.value = false
    if (pasteHintTimer) clearTimeout(pasteHintTimer)
  }
}

function onPasteAttempt() {
  pasteBlockedMessage.value = true
  if (pasteHintTimer) clearTimeout(pasteHintTimer)
  pasteHintTimer = setTimeout(() => {
    pasteBlockedMessage.value = false
  }, 4000)
}

function resetState() {
  firstAddress.value = ''
  secondAddress.value = ''
  showAddresses.value = false
  pasteBlockedMessage.value = false
  if (pasteHintTimer) {
    clearTimeout(pasteHintTimer)
    pasteHintTimer = null
  }
}

function handleClose() {
  resetState()
  emit('close')
}

function handleConfirm() {
  if (!canConfirm.value) return
  const value = firstAddress.value.trim()
  emit('confirm', value)
  resetState()
  emit('close')
}

watch(
  () => props.show,
  (open) => {
    if (!open) resetState()
  },
)
</script>

<style scoped>
.iwa-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10100;
  animation: iwa-fade 0.15s ease;
}

@keyframes iwa-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

.iwa-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10101;
  width: min(95vw, 32rem);
  max-height: 90vh;
  background: #f9fafb;
  border-radius: 0.75rem;
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: iwa-pop 0.18s ease;
}

@keyframes iwa-pop {
  from {
    opacity: 0;
    transform: translate(-50%, -48%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.iwa-header {
  padding: 0.875rem 1.25rem 0.75rem;
  flex-shrink: 0;
}

.iwa-header__row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  padding-right: 2.5rem;
}

.iwa-header__title {
  flex: 1;
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 700;
  color: #111827;
}

.iwa-header__close {
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

.iwa-header__close svg {
  width: 1rem;
  height: 1rem;
}

.iwa-header__close:hover {
  background: #e5e7eb;
  color: #111827;
}

.iwa-separator {
  height: 1px;
  background: #e5e7eb;
  flex-shrink: 0;
}

.iwa-body {
  padding: 1.125rem 1.25rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.iwa-warning {
  display: flex;
  gap: 0.625rem;
  padding: 0.75rem 0.875rem;
  background: #fffbeb;
  border: 1px solid #fcd34d;
  color: #92400e;
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  line-height: 1.45;
}

.iwa-warning__icon {
  flex-shrink: 0;
  color: #d97706;
  margin-top: 0.125rem;
}

.iwa-warning__text strong {
  color: #78350f;
  font-weight: 700;
}

.iwa-warning__text em {
  font-style: normal;
  font-weight: 700;
  color: #b45309;
}

.iwa-field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.iwa-field__label {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #111827;
}

.iwa-field__hint {
  font-size: 0.6875rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.iwa-field__hint--strong {
  color: #b91c1c;
}

.iwa-field__control {
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
}

.iwa-input {
  flex: 1;
  min-width: 0;
  padding: 0.625rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #fff;
  color: #111827;
  font-size: 0.875rem;
  font-family: inherit;
  transition: border-color 0.12s, box-shadow 0.12s;
}

.iwa-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.iwa-input--mono {
  font-family: ui-monospace, 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.8125rem;
  letter-spacing: 0.01em;
}

.iwa-input.is-match {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.18);
}

.iwa-input.is-mismatch {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.14);
}

.iwa-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  padding: 0;
  border: 1px solid #d1d5db;
  background: #fff;
  border-radius: 0.375rem;
  color: #6b7280;
  cursor: pointer;
  transition: background 0.12s, color 0.12s, border-color 0.12s;
  flex-shrink: 0;
}

.iwa-icon-btn:hover {
  background: #f3f4f6;
  color: #111827;
  border-color: #9ca3af;
}

.iwa-status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  flex-shrink: 0;
}

.iwa-status__muted {
  color: #9ca3af;
  font-weight: 600;
}

.iwa-status__ok {
  color: #059669;
  display: inline-flex;
}

.iwa-status__err {
  color: #dc2626;
  display: inline-flex;
}

.iwa-warning-inline {
  margin: 0;
  font-size: 0.75rem;
  color: #b45309;
}

.iwa-warning-inline--err {
  color: #b91c1c;
}

.iwa-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.875rem 1.25rem;
  background: #fff;
  flex-shrink: 0;
}

.iwa-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.875rem;
  font-size: 0.8125rem;
  font-weight: 600;
  font-family: inherit;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.12s, color 0.12s, border-color 0.12s;
}

.iwa-btn--muted {
  background: #ffffff;
  color: #374151;
  border-color: #d1d5db;
}

.iwa-btn--muted:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.iwa-btn--primary {
  background: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
}

.iwa-btn--primary:hover {
  background: #1d4ed8;
  border-color: #1d4ed8;
}

.iwa-btn--primary:disabled {
  background: #93c5fd;
  border-color: #93c5fd;
  cursor: not-allowed;
}
</style>
