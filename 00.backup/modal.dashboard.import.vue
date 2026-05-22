<template>
  <div
    v-if="show"
    class="modal-overlay"
    data-stacked-modal="dashboard-import"
    @click.self="handleClose"
  >
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <div class="modal-header__title">
          <img
            v-if="headerIconPath"
            :src="headerIconPath"
            :alt="currencyLabel"
            class="modal-header__icon"
          />
          <span v-else class="modal-header__fallback">{{ currencyLabel.slice(0, 2) }}</span>
          <h2>{{ currencyLabel }} Wallet Import</h2>
        </div>
      </div>

      <form id="mdi-import-form" class="modal-form" @submit.prevent="submitForm">
        <p v-if="!hasKeyMaterial" class="modal-hint">
          Paste <code>%ticker%://%privateKey%</code> or import JSON
          (<code>{"privateKey":"…"}</code>, filename e.g. <code>owner.btc.address.json</code>).
        </p>

        <div class="form-group form-group--uri">
          <label for="mdi-private-key-uri" class="form-label--compact">Private key (URI)</label>
          <div class="private-key-input-group">
            <CurrencyDropdown
              v-model="selectedNetwork"
              :only-visible="true"
              :allow-empty="false"
            />
            <input
              id="mdi-private-key-uri"
              v-model="cryptoInput"
              type="text"
              class="form-input form-input--mono form-input--compact private-key-input"
              spellcheck="false"
              autocomplete="off"
              :placeholder="`${selectedNetwork}://…`"
            />
            <button
              type="button"
              class="icon-button icon-button--compact"
              aria-label="Import private key from JSON file"
              title="Import private key from JSON file"
              @click="triggerFileImport"
            >
              <Upload :size="15" />
            </button>
            <input
              ref="fileInput"
              type="file"
              accept="application/json,.json"
              class="hidden-file-input"
              @change="handleFileImport"
            />
          </div>
          <p
            v-if="statusLine"
            class="import-status"
            :class="{ 'import-status--error': importStatusError }"
          >
            {{ statusLine }}
          </p>
        </div>

        <section
          v-if="hasKeyMaterial && (isLoading || cryptoPublicKey || cryptoWalletAddress)"
          class="derived-panel"
          aria-label="Derived wallet preview"
        >
          <p v-if="isLoading" class="derived-panel__loading">Deriving…</p>
          <template v-else>
            <div v-if="cryptoWalletAddress" class="derived-panel__row">
              <span class="derived-panel__label">Address</span>
              <input
                id="mdi-wallet-address"
                :value="cryptoWalletAddress"
                readonly
                class="derived-panel__value"
                :title="cryptoWalletAddress"
              />
            </div>
            <div v-if="cryptoPublicKey" class="derived-panel__row">
              <span class="derived-panel__label">Public key</span>
              <textarea
                id="mdi-public-key"
                :value="cryptoPublicKey"
                readonly
                class="derived-panel__value derived-panel__value--multiline"
                rows="2"
                :title="cryptoPublicKey"
              />
            </div>
          </template>
        </section>

        <p v-if="cryptoErrorMessage" class="error-message">{{ cryptoErrorMessage }}</p>
        <p v-if="tickerMismatchWarning" class="warning-message">{{ tickerMismatchWarning }}</p>
      </form>

      <footer class="modal-footer">
        <button
          type="submit"
          form="mdi-import-form"
          class="btn btn-primary"
          :disabled="!canSubmit"
        >
          Import Wallet
        </button>
        <button type="button" class="btn btn-secondary" @click="handleClose">
          Cancel
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Upload } from 'lucide-vue-next'
import { NETWORKS } from '@/lib/cores/currencyCore/currencies'
import CurrencyDropdown from '@/components/dropdown/dropdown.currency.from.currencyCore.vue'
import {
  SUPPORTED_TICKERS,
  useCryptocurrencyEngine,
} from '@/lib/cores/bridge/bridge.Cryptography.Via.Currency'
import {
  buildCryptoUri,
  parsePrivateKeyFile,
  triggerFileInput,
} from '@/lib/cores/importStandard/fileImports.privateKey'

defineOptions({ name: 'ModalDashboardImport' })

export type DashboardImportedWallet = {
  ticker: string
  privateKey: string
  cryptoUri: string
  publicKey: string
  walletAddress: string
  spckCurve: 'secp256k1' | 'x25519' | null
}

const props = withDefaults(
  defineProps<{
    show: boolean
    /** Active dashboard currency tab (e.g. BTC). Pre-fills network dropdown. */
    defaultTicker?: string
  }>(),
  {
    defaultTicker: 'BTC',
  },
)

const emit = defineEmits<{
  close: []
  imported: [payload: DashboardImportedWallet]
}>()

const URI_REGEX = /^([A-Za-z0-9]+):\/\/(.+)$/

const selectedNetwork = ref('BTC')
const cryptoInput = ref('')
const importStatus = ref('')
const importStatusError = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const {
  ticker: cryptoTickerSymbol,
  publicKey: cryptoPublicKey,
  walletAddress: cryptoWalletAddress,
  errorMessage: cryptoErrorMessage,
  spckCurve: cryptoSpckCurve,
  isLoading,
} = useCryptocurrencyEngine(cryptoInput)

const hasKeyMaterial = computed(() => cryptoInput.value.trim().length > 0)

const statusLine = computed(() => {
  const parts: string[] = []
  if (importStatus.value) parts.push(importStatus.value)
  if (cryptoTickerSymbol.value && !cryptoErrorMessage.value) {
    const curve =
      cryptoSpckCurve.value === 'secp256k1'
        ? 'SPCK v1'
        : cryptoSpckCurve.value === 'x25519'
          ? 'SPCK v2'
          : ''
    parts.push(`Detected ${cryptoTickerSymbol.value}${curve ? ` · ${curve}` : ''}`)
  }
  return parts.join(' · ')
})

const currencyLabel = computed(() =>
  (props.defaultTicker || selectedNetwork.value || 'crypto').toUpperCase(),
)

const headerIconPath = computed(() => {
  const n = NETWORKS.find((x) => x.ticker === currencyLabel.value)
  return n?.icon ?? null
})

const tickerMismatchWarning = computed(() => {
  const expected = props.defaultTicker?.toUpperCase()
  const detected = cryptoTickerSymbol.value?.toUpperCase()
  if (!expected || !detected || expected === detected) return ''
  return `Imported key is for ${detected}, but the dashboard tab is ${expected}. You can still import, or switch networks before submitting.`
})

const canSubmit = computed(
  () =>
    Boolean(cryptoPublicKey.value && cryptoWalletAddress.value && !cryptoErrorMessage.value),
)

function resetForm() {
  selectedNetwork.value = props.defaultTicker || 'BTC'
  cryptoInput.value = ''
  importStatus.value = ''
  importStatusError.value = false
  if (fileInput.value) fileInput.value.value = ''
}

function normalizeCryptoUri(raw: string, fallbackTicker: string): string {
  const trimmed = raw.trim()
  if (!trimmed) return ''
  if (URI_REGEX.test(trimmed)) return trimmed
  return buildCryptoUri(fallbackTicker.toUpperCase(), trimmed)
}

function setImportStatus(message: string, isError = false) {
  importStatus.value = message
  importStatusError.value = isError
}

const handleClose = () => {
  resetForm()
  emit('close')
}

const triggerFileImport = () => {
  triggerFileInput(fileInput.value)
}

const handleFileImport = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const result = await parsePrivateKeyFile(file)
  if (result.ok) {
    cryptoInput.value = result.value.cryptoUri
    selectedNetwork.value = result.value.ticker
    setImportStatus(`Imported ${result.value.ticker} private key from ${result.value.filename}.`)
  } else {
    setImportStatus(result.error, true)
  }

  target.value = ''
}

const submitForm = () => {
  const uri = normalizeCryptoUri(cryptoInput.value, selectedNetwork.value)
  if (!uri) {
    alert('Please enter or import a private key.')
    return
  }

  if (uri !== cryptoInput.value.trim()) {
    cryptoInput.value = uri
  }

  if (cryptoErrorMessage.value || !cryptoPublicKey.value || !cryptoWalletAddress.value) {
    alert(cryptoErrorMessage.value || 'Could not derive wallet material from this private key.')
    return
  }

  const match = uri.match(URI_REGEX)
  const ticker = (match?.[1] ?? selectedNetwork.value).toUpperCase()
  const privateKey = (match?.[2] ?? '').trim()

  if (!SUPPORTED_TICKERS.includes(ticker)) {
    alert(`Unsupported ticker "${ticker}".`)
    return
  }

  const payload: DashboardImportedWallet = {
    ticker,
    privateKey,
    cryptoUri: uri,
    publicKey: cryptoPublicKey.value,
    walletAddress: cryptoWalletAddress.value,
    spckCurve: cryptoSpckCurve.value,
  }

  emit('imported', payload)
  resetForm()
  emit('close')
}

watch(
  () => props.show,
  (isOpen) => {
    if (isOpen) {
      resetForm()
      selectedNetwork.value = props.defaultTicker || 'BTC'
    }
  },
)

watch(selectedNetwork, (ticker) => {
  const trimmed = cryptoInput.value.trim()
  if (!trimmed || URI_REGEX.test(trimmed)) return
  cryptoInput.value = buildCryptoUri(ticker.toUpperCase(), trimmed)
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10082;
}

.modal-content {
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
  max-height: min(90vh, 720px);
  overflow: hidden;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  margin: 0;
  padding: 0.85rem 1.25rem 0.65rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header__title {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 0;
}

.modal-header__icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  object-fit: contain;
}

.modal-header__fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  font-size: 0.75rem;
  font-weight: 700;
  color: #374151;
  background: #f3f4f6;
  border-radius: 0.375rem;
}

.modal-header h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #6b7280;
  line-height: 1;
  padding: 0 0.25rem;
}

.close-button:hover {
  color: #374151;
}

.modal-hint {
  margin: 0;
  padding: 0.4rem 0.5rem;
  font-size: 0.68rem;
  line-height: 1.35;
  color: #4b5563;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
}

.modal-hint code {
  padding: 0.05rem 0.2rem;
  font-size: 0.66rem;
  background: #ffffff;
  border-radius: 0.2rem;
  color: #1d4ed8;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 0.65rem 1.25rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  margin: 0;
  padding: 0.65rem 1.25rem 0.85rem;
  border-top: 1px solid #e5e7eb;
  background-color: #ffffff;
}

.modal-footer .btn {
  padding: 0.4rem 0.85rem;
  font-size: 0.8125rem;
  line-height: 1.25;
  border-radius: 0.3125rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label,
.form-label--compact {
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.form-group--uri {
  flex-shrink: 0;
}

.private-key-input-group {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.private-key-input-group :deep(.custom-select-wrapper) {
  width: auto;
  min-width: 118px;
  max-width: 148px;
  flex-shrink: 0;
}

.private-key-input-group :deep(.custom-select) {
  padding: 0.4rem 0.5rem;
  font-size: 0.8125rem;
}

.private-key-input-group .private-key-input {
  flex: 1;
  min-width: 0;
}

.form-input {
  padding: 0.65rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #374151;
  background-color: #ffffff;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  width: 100%;
  box-sizing: border-box;
}

.form-input--mono {
  font-family: ui-monospace, 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.875rem;
}

.form-input--compact {
  padding: 0.4rem 0.55rem;
  font-size: 0.8125rem;
  border-radius: 0.3125rem;
}

.form-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
  outline: none;
}

.form-input--readonly {
  background-color: #f9fafb;
  color: #1f2937;
  resize: vertical;
}

.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid #d1d5db;
  padding: 0.45rem;
  border-radius: 0.375rem;
  cursor: pointer;
  color: #4b5563;
  flex-shrink: 0;
  transition: background-color 0.2s, border-color 0.2s;
}

.icon-button--compact {
  padding: 0.35rem;
  border-radius: 0.3125rem;
}

.icon-button:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

.hidden-file-input {
  display: none;
}

.import-status {
  margin: 0.2rem 0 0;
  font-size: 0.68rem;
  line-height: 1.3;
  color: #1d4ed8;
}

.import-status--error {
  color: #b91c1c;
}

.derived-panel {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.4rem 0.5rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.3125rem;
}

.derived-panel__loading {
  margin: 0;
  font-size: 0.68rem;
  color: #6b7280;
}

.derived-panel__row {
  display: grid;
  grid-template-columns: 4.25rem minmax(0, 1fr);
  gap: 0.25rem 0.4rem;
  align-items: start;
}

.derived-panel__label {
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #6b7280;
  padding-top: 0.3rem;
}

.derived-panel__value {
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0.28rem 0.4rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  font-family: ui-monospace, 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.65rem;
  line-height: 1.3;
  color: #1f2937;
  background: #ffffff;
}

.derived-panel__value--multiline {
  min-height: 2.1rem;
  max-height: 2.75rem;
  resize: none;
  overflow-y: auto;
}

.error-message {
  margin: 0;
  font-size: 0.7rem;
  line-height: 1.3;
  color: #b91c1c;
}

.warning-message {
  margin: 0;
  font-size: 0.68rem;
  line-height: 1.3;
  color: #b45309;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 0.25rem;
  padding: 0.35rem 0.45rem;
}

.btn {
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}

.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #16a34a;
  color: #ffffff;
  border: 1px solid #15803d;
}

.btn-primary:hover:not(:disabled) {
  background-color: #15803d;
  border-color: #15803d;
}

.btn-secondary {
  background-color: #ffffff;
  color: #4b5563;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}
</style>
