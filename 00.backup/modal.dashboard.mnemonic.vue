<template>
  <div
    v-if="show"
    class="modal-overlay"
    data-stacked-modal="dashboard-mnemonic"
    @click.self="handleClose"
  >
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <div class="modal-header__title">
          <KeyRound :size="22" class="modal-header__glyph" aria-hidden="true" />
          <h2>Enter Recovery Phrase</h2>
        </div>
      </div>

      <form id="mdm-mnemonic-form" class="modal-form" @submit.prevent="submitForm">
        <p class="modal-hint">
          No account seed is loaded for this session. Enter your
          <strong>12–24&nbsp;word BIP-39 recovery phrase</strong> to derive
          <template v-if="ticker">a <strong>{{ ticker.toUpperCase() }}</strong> wallet</template>
          <template v-else>this wallet</template>.
          The phrase is used for this session only and is never stored in plaintext.
        </p>

        <div class="form-group">
          <label for="mdm-phrase">Recovery phrase</label>
          <textarea
            id="mdm-phrase"
            ref="phraseInput"
            v-model="phrase"
            class="form-input form-input--mono"
            rows="3"
            spellcheck="false"
            autocomplete="off"
            autocapitalize="off"
            placeholder="word1 word2 word3 …"
            @keydown.enter.prevent="submitForm"
          />
          <div class="mdm-meta">
            <span class="mdm-wordcount">{{ wordCount }} word{{ wordCount === 1 ? '' : 's' }}</span>
            <span
              v-if="phrase.trim() && !checking"
              class="mdm-validity"
              :class="isValid ? 'mdm-validity--ok' : 'mdm-validity--bad'"
            >
              {{ isValid ? 'Valid phrase' : 'Not a valid BIP-39 phrase' }}
            </span>
          </div>
        </div>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>

      <footer class="modal-footer">
        <button
          type="submit"
          form="mdm-mnemonic-form"
          class="btn btn-primary"
          :disabled="!isValid || checking"
        >
          Use Phrase
        </button>
        <button type="button" class="btn btn-secondary" @click="handleClose">
          Cancel
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { KeyRound } from 'lucide-vue-next'

defineOptions({ name: 'ModalDashboardMnemonic' })

const props = withDefaults(
  defineProps<{
    show: boolean
    /** Active dashboard currency tab (e.g. BTC) — shown in the prompt copy. */
    ticker?: string
  }>(),
  {
    ticker: '',
  },
)

const emit = defineEmits<{
  close: []
  confirmed: [mnemonic: string]
}>()

const phrase = ref('')
const isValid = ref(false)
const checking = ref(false)
const errorMessage = ref('')
const phraseInput = ref<HTMLTextAreaElement | null>(null)

/** Collapse runs of whitespace so pasted phrases validate regardless of formatting. */
const normalized = computed(() => phrase.value.trim().replace(/\s+/g, ' '))
const wordCount = computed(() => (normalized.value ? normalized.value.split(' ').length : 0))

// Validate against the BIP-39 word list (lazy-imported so it doesn't weigh down the Dashboard).
watch(
  normalized,
  async (value) => {
    errorMessage.value = ''
    if (!value) {
      isValid.value = false
      return
    }
    checking.value = true
    try {
      const bip39 = await import('bip39')
      isValid.value = bip39.validateMnemonic(value)
    } catch {
      isValid.value = false
    } finally {
      checking.value = false
    }
  },
  { immediate: false },
)

function resetForm() {
  phrase.value = ''
  isValid.value = false
  checking.value = false
  errorMessage.value = ''
}

const handleClose = () => {
  resetForm()
  emit('close')
}

const submitForm = () => {
  if (checking.value) return
  if (!isValid.value) {
    errorMessage.value = 'Please enter a valid 12–24 word BIP-39 recovery phrase.'
    return
  }
  const value = normalized.value
  resetForm()
  emit('confirmed', value)
}

watch(
  () => props.show,
  (isOpen) => {
    if (isOpen) {
      resetForm()
      nextTick(() => phraseInput.value?.focus())
    }
  },
)
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
  max-width: 520px;
  max-height: min(90vh, 640px);
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
  padding: 1.5rem 2rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header__title {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 0;
}

.modal-header__glyph {
  color: #16a34a;
  flex-shrink: 0;
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.modal-hint {
  margin: 0 0 1rem;
  padding: 0.65rem 0.75rem;
  font-size: 0.8rem;
  line-height: 1.45;
  color: #4b5563;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 1rem 2rem;
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

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
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
  line-height: 1.5;
  resize: vertical;
}

.form-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
  outline: none;
}

.mdm-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.4rem;
  font-size: 0.78rem;
}

.mdm-wordcount {
  color: #6b7280;
}

.mdm-validity--ok {
  color: #16a34a;
}

.mdm-validity--bad {
  color: #b45309;
}

.error-message {
  margin: 0;
  font-size: 0.82rem;
  color: #b91c1c;
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
