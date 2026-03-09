<template>
  <div class="imp-body">
    <!-- Word count selector -->
    <div class="imp-word-count-row">
      <Label class="imp-wc-label">Word count</Label>
      <div class="imp-wc-options">
        <button
          v-for="count in WORD_COUNTS"
          :key="count"
          type="button"
          class="imp-wc-btn"
          :class="{ 'imp-wc-btn--active': wordCount === count }"
          @click="selectWordCount(count)"
        >{{ count }}</button>
      </div>
    </div>

    <!-- Warning -->
    <p class="imp-warning">
      <AlertTriangle :size="14" />
      Enter your {{ wordCount }}-word recovery phrase. Ensure it is correct before continuing.
    </p>

    <!-- Input grid -->
    <div class="imp-inputs-grid">
      <div v-for="i in wordCount" :key="'i-' + i" class="imp-input-cell">
        <div class="imp-ac-wrap">
          <input
            v-model="inputs[i - 1]"
            type="text"
            class="imp-input"
            :placeholder="String(i)"
            autocomplete="off"
            @input="handleInput(i - 1)"
            @keydown="handleKeydown($event, i - 1)"
            @blur="handleBlur"
            @paste="handlePaste"
          />
          <div
            v-if="ac && ac.index === i - 1 && ac.suggestions.length"
            class="imp-ac-dropdown"
          >
            <div
              v-for="(word, si) in ac.suggestions"
              :key="word"
              class="imp-ac-item"
              :class="{ 'imp-ac-item--active': ac.focus === si }"
              @mousedown.prevent="selectSuggestion(word, i - 1)"
            >{{ word }}</div>
          </div>
        </div>
        <span class="imp-input-num">{{ i }}</span>
      </div>
    </div>

    <!-- BIP32 Root GPG Key Fingerprint (shown once all words are filled) -->
    <div v-if="rootGPGFingerprint" class="imp-gpg-box">
      <div class="imp-gpg-header">
        <span class="imp-gpg-label">BIP32 Root GPG Key Fingerprint</span>
        <button type="button" class="imp-gpg-copy" @click="copyFingerprint" title="Copy fingerprint">
          <Copy :size="12" />
        </button>
      </div>
      <div class="imp-gpg-value">{{ rootGPGFingerprint }}</div>
      <p class="imp-gpg-desc">
        Derived from your BIP32 root extended private key — represents the cryptographic identity of your entire wallet hierarchy.
      </p>
    </div>
    <div v-else-if="isGeneratingGPG" class="imp-gpg-box imp-gpg-box--loading">
      <span class="imp-gpg-label">Generating BIP32 Root GPG fingerprint…</span>
    </div>

    <!-- Error -->
    <p v-if="error" class="imp-error">{{ error }}</p>

    <!-- Actions -->
    <div class="imp-actions">
      <button type="button" class="imp-btn imp-btn--ghost" @click="emit('back')">
        <ChevronLeft :size="14" /> Back
      </button>
      <button
        type="button"
        class="imp-btn imp-btn--primary"
        :disabled="!canConfirm"
        @click="handleConfirm"
      >
        Confirm &amp; Create Account
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Label } from 'radix-vue'
import { AlertTriangle, ChevronLeft, Copy } from 'lucide-vue-next'
import * as bip39 from 'bip39'
import { wordlists } from 'bip39'
import { generateGPGFromRootExtendedPrivateKey } from '@/lib/cores/cryptographyCore/deterministicGPG/deterministicGPG.seed'

const emit = defineEmits<{
  confirm: [mnemonic: string]
  back: []
}>()

// ── Word counts ─────────────────────────────────────────────────────────────
const WORD_COUNTS = [12, 15, 18, 21, 24] as const
type WordCount = typeof WORD_COUNTS[number]

const wordCount = ref<WordCount>(12)
const inputs = ref<string[]>(Array(12).fill(''))
const error = ref('')

const selectWordCount = (count: WordCount) => {
  wordCount.value = count
  inputs.value = Array(count).fill('')
  error.value = ''
}

const canConfirm = computed(() =>
  inputs.value.slice(0, wordCount.value).every(w => w.trim().length > 0)
)

// ── BIP32 Root GPG Fingerprint ───────────────────────────────────────────────
const rootGPGFingerprint = ref<string | null>(null)
const isGeneratingGPG = ref(false)

// Compute the current mnemonic from filled inputs
const currentMnemonic = computed(() =>
  canConfirm.value
    ? inputs.value.slice(0, wordCount.value).map(w => w.trim()).join(' ')
    : ''
)

watch(currentMnemonic, async (mnemonic) => {
  rootGPGFingerprint.value = null
  if (!mnemonic) return
  isGeneratingGPG.value = true
  try {
    const result = await generateGPGFromRootExtendedPrivateKey(mnemonic)
    rootGPGFingerprint.value = result.gpgFingerprint
  } catch (err) {
    console.error('Error generating root GPG fingerprint:', err)
  } finally {
    isGeneratingGPG.value = false
  }
})

const copyFingerprint = async () => {
  if (rootGPGFingerprint.value) {
    await navigator.clipboard.writeText(rootGPGFingerprint.value)
  }
}

// ── Paste ───────────────────────────────────────────────────────────────────
const handlePaste = (e: ClipboardEvent) => {
  const text = e.clipboardData?.getData('text').trim()
  if (!text) return
  const words = text.split(/\s+/)
  if (words.length !== wordCount.value) return
  e.preventDefault()
  inputs.value = [...words]
}

// ── Confirm ─────────────────────────────────────────────────────────────────
const handleConfirm = () => {
  error.value = ''
  const entered = inputs.value.slice(0, wordCount.value).map(w => w.trim()).join(' ')
  if (!bip39.validateMnemonic(entered)) {
    error.value = 'Invalid recovery phrase. Please check each word.'
    return
  }
  emit('confirm', entered)
}

// ── Autocomplete ─────────────────────────────────────────────────────────────
interface AcState {
  index: number
  suggestions: string[]
  focus: number
}

const dictionary = wordlists.english
const ac = ref<AcState | null>(null)

const handleInput = (index: number) => {
  const value = inputs.value[index]?.toLowerCase().trim()
  if (!value) { ac.value = null; return }
  const suggestions = dictionary.filter(w => w.startsWith(value)).slice(0, 4)
  ac.value = suggestions.length ? { index, suggestions, focus: -1 } : null
}

const selectSuggestion = (word: string, index: number) => {
  inputs.value[index] = word
  ac.value = null
}

const handleKeydown = (e: KeyboardEvent, index: number) => {
  if (!ac.value || ac.value.index !== index) return

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    ac.value.focus = Math.min(ac.value.focus + 1, ac.value.suggestions.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    ac.value.focus = Math.max(ac.value.focus - 1, 0)
  } else if (e.key === 'Enter' || e.key === 'Tab') {
    if (ac.value.focus >= 0) {
      if (e.key === 'Enter') e.preventDefault()
      selectSuggestion(ac.value.suggestions[ac.value.focus], index)
    } else if (ac.value.suggestions.length === 1) {
      if (e.key === 'Enter') e.preventDefault()
      selectSuggestion(ac.value.suggestions[0], index)
    }
  } else if (e.key === 'Escape') {
    ac.value = null
  }
}

const handleBlur = () => {
  setTimeout(() => { ac.value = null }, 150)
}
</script>

<style lang="scss" scoped>
/* ── Word count selector ──────────────────────────────────────────────────── */
.imp-word-count-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.imp-wc-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  flex-shrink: 0;
}

.imp-wc-options {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.imp-wc-btn {
  padding: 0.2rem 0.55rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 0.3rem;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  color: #374151;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s, color 0.12s;

  &:hover {
    background: #e0e7ff;
    border-color: #a5b4fc;
    color: #2563eb;
  }

  &--active {
    background: #2563eb;
    border-color: #2563eb;
    color: #ffffff;
  }
}

/* ── Warning ──────────────────────────────────────────────────────────────── */
.imp-warning {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #b45309;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 0.375rem;
  padding: 0.6rem 0.75rem;
  margin: 0;
  line-height: 1.5;

  svg { flex-shrink: 0; margin-top: 1px; }
}

/* ── Input grid ───────────────────────────────────────────────────────────── */
.imp-inputs-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem 0.75rem;
}

.imp-input-cell {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.imp-ac-wrap {
  position: relative;
  width: 100%;
}

.imp-input {
  width: 100%;
  padding: 0.4rem 0.5rem;
  font-size: 0.75rem;
  color: #111827;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
  text-align: center;
  transition: border-color 0.15s, box-shadow 0.15s;

  &::placeholder { color: #9ca3af; }

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
    background: #ffffff;
  }
}

.imp-input-num {
  font-size: 0.65rem;
  color: #9ca3af;
  text-align: center;
}

/* ── Autocomplete dropdown ────────────────────────────────────────────────── */
.imp-ac-dropdown {
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 200;
  overflow: hidden;
}

.imp-ac-item {
  padding: 0.35rem 0.5rem;
  font-size: 0.75rem;
  color: #1f2937;
  cursor: pointer;
  transition: background 0.1s;

  &:hover,
  &--active {
    background: #eff6ff;
    color: #2563eb;
  }

  & + & { border-top: 1px solid #f3f4f6; }
}

/* ── BIP32 Root GPG Fingerprint ───────────────────────────────────────────── */
.imp-gpg-box {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.65rem 0.75rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;

  &--loading { opacity: 0.6; }
}

.imp-gpg-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.imp-gpg-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.imp-gpg-copy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.4rem;
  background: transparent;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  color: #9ca3af;
  transition: background 0.12s, color 0.12s;

  &:hover {
    background: #e0e7ff;
    color: #2563eb;
  }
}

.imp-gpg-value {
  font-family: monospace;
  font-size: 0.75rem;
  color: #111827;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  padding: 0.4rem 0.5rem;
  word-break: break-all;
}

.imp-gpg-desc {
  font-size: 0.68rem;
  color: #9ca3af;
  margin: 0;
  line-height: 1.5;
}

/* ── Error ────────────────────────────────────────────────────────────────── */
.imp-error {
  font-size: 0.75rem;
  color: #dc2626;
  margin: -0.25rem 0 0;
}

/* ── Actions ──────────────────────────────────────────────────────────────── */
.imp-body {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.imp-actions {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.imp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  flex-shrink: 0;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  cursor: pointer;
  outline: none;
  transition: background 0.15s, opacity 0.15s;

  &--primary {
    background: #2563eb;
    color: #ffffff;

    &:hover:not(:disabled) { background: #1d4ed8; }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  }

  &--ghost {
    background: transparent;
    color: #2563eb;
    border: none;
    font-weight: 400;

    &:hover { text-decoration: underline; }
  }
}
</style>
