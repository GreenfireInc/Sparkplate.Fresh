<template>
  <div>
    <!-- Header -->
    <div class="mnm-header">
      <div class="mnm-header-icon">
        <KeyRound :size="26" class="mnm-header-icon-svg" />
      </div>
      <DialogTitle class="mnm-title">
        {{ mode === 'display' ? 'Recovery Phrase' : mode === 'verify' ? 'Verify Phrase' : 'Import Phrase' }}
      </DialogTitle>
      <p class="mnm-subtitle">
        {{ modeSubtitle }}
      </p>
    </div>

    <!-- Body -->
    <div class="mnm-body">
      <!-- Display mode: show generated words -->
      <template v-if="mode === 'display'">
        <!-- Word count selector -->
        <div class="mnm-word-count-row">
          <Label class="mnm-wc-label">Word count</Label>
          <div class="mnm-wc-options">
            <button
              v-for="count in WORD_COUNTS"
              :key="count"
              type="button"
              class="mnm-wc-btn"
              :class="{ 'mnm-wc-btn--active': wordCount === count }"
              @click="selectWordCount(count)"
            >{{ count }}</button>
          </div>
          <button type="button" class="mnm-regen-btn" @click="generatePhrase" title="Regenerate">
            <RefreshCw :size="13" />
          </button>
        </div>

        <p class="mnm-warning">
          <AlertTriangle :size="14" />
          Write this phrase down and store it securely. You will need it to recover your account.
        </p>

        <!-- BIP32 Root GPG Key Fingerprint -->
        <div v-if="rootGPGFingerprint" class="mnm-gpg-box">
          <div class="mnm-gpg-header">
            <span class="mnm-gpg-label">BIP32 Root GPG Key Fingerprint</span>
            <button type="button" class="mnm-gpg-copy" @click="copyFingerprint" title="Copy fingerprint">
              <Copy :size="12" />
            </button>
          </div>
          <div class="mnm-gpg-value">{{ rootGPGFingerprint }}</div>
          <p class="mnm-gpg-desc">
            Derived from your BIP32 root extended private key — represents the cryptographic identity of your entire wallet hierarchy.
          </p>
        </div>
        <div v-else-if="isGeneratingGPG" class="mnm-gpg-box mnm-gpg-box--loading">
          <span class="mnm-gpg-label">Generating BIP32 Root GPG fingerprint…</span>
        </div>

        <div class="mnm-words-grid" :style="{ gridTemplateColumns: gridCols }">
          <div
            v-for="(word, i) in phraseWords"
            :key="'w-' + i"
            class="mnm-word-cell"
          >
            <span class="mnm-word-num">{{ i + 1 }}</span>
            <span class="mnm-word">{{ word }}</span>
          </div>
        </div>
        <div class="mnm-actions">
          <button type="button" class="mnm-btn mnm-btn--ghost" @click="emit('back')">
            <ChevronLeft :size="14" /> Back
          </button>
          <button type="button" class="mnm-btn mnm-btn--primary" @click="mode = 'verify'">
            Continue
          </button>
          <button type="button" class="mnm-btn mnm-btn--link" @click="mode = 'import'">
            Import Seed Phrase
          </button>
          <button type="button" class="mnm-btn mnm-btn--outline" @click="handlePrint">
            <Printer :size="14" /> Print
          </button>
        </div>

        <PrintMnemonicCanvas ref="printCanvas" :phrase="phrase" />
      </template>

      <!-- Verify mode: user re-enters generated phrase -->
      <template v-else-if="mode === 'verify'">
        <p class="mnm-warning">
          <AlertTriangle :size="14" />
          Re-enter your {{ wordCount }}-word recovery phrase to confirm you have saved it correctly.
        </p>
        <div class="mnm-inputs-grid" :style="{ gridTemplateColumns: gridCols }">
          <div v-for="i in wordCount" :key="'v-' + i" class="mnm-input-cell">
            <div class="mnm-ac-wrap">
              <input
                v-model="verifyInputs[i - 1]"
                type="text"
                class="mnm-input"
                :placeholder="String(i)"
                autocomplete="off"
                @input="handleAcInput(i - 1, 'verify')"
                @keydown="handleAcKeydown($event, i - 1, 'verify')"
                @blur="handleAcBlur"
                @paste="handlePaste"
              />
              <div
                v-if="verifyAC && verifyAC.index === i - 1 && verifyAC.suggestions.length"
                class="mnm-ac-dropdown"
              >
                <div
                  v-for="(word, si) in verifyAC.suggestions"
                  :key="word"
                  class="mnm-ac-item"
                  :class="{ 'mnm-ac-item--active': verifyAC.focus === si }"
                  @mousedown.prevent="selectAcSuggestion(word, i - 1, 'verify')"
                >{{ word }}</div>
              </div>
            </div>
            <span class="mnm-input-num">{{ i }}</span>
          </div>
        </div>
        <p v-if="verifyError" class="mnm-error">{{ verifyError }}</p>
        <div class="mnm-actions">
          <button type="button" class="mnm-btn mnm-btn--ghost" @click="mode = 'display'">
            <ChevronLeft :size="14" /> Back
          </button>
          <button
            type="button"
            class="mnm-btn mnm-btn--primary"
            :disabled="!canConfirm"
            @click="handleVerify"
          >
            Confirm &amp; Create Account
          </button>
        </div>
      </template>

      <!-- Import mode: user enters their own phrase -->
      <template v-else>
        <ImportMnemonicPhrase
          @confirm="(mnemonic) => emit('confirm', mnemonic)"
          @back="mode = 'display'"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { DialogTitle, Label } from 'radix-vue'
import { KeyRound, AlertTriangle, ChevronLeft, RefreshCw, Copy, Printer } from 'lucide-vue-next'
import * as bip39 from 'bip39'
import { wordlists } from 'bip39'
import { generateGPGFromRootExtendedPrivateKey } from '@/lib/cores/cryptographyCore/deterministicGPG/deterministicGPG.seed'
import PrintMnemonicCanvas from './aspects/print.mnemonicHDSeedPhrase.vue'
import ImportMnemonicPhrase from './aspects/import.mnemonicHDSeedPhrase.vue'

const emit = defineEmits<{
  confirm: [mnemonic: string]
  back: []
}>()

type Mode = 'display' | 'verify' | 'import'

// Standard BIP39 word counts with their entropy bits
const WORD_COUNTS = [12, 15, 18, 21, 24] as const
type WordCount = typeof WORD_COUNTS[number]

const ENTROPY_MAP: Record<WordCount, number> = {
  12: 128,
  15: 160,
  18: 192,
  21: 224,
  24: 256,
}

const mode = ref<Mode>('display')
const wordCount = ref<WordCount>(12)
const phrase = ref('')
const verifyInputs = ref<string[]>(Array(12).fill(''))
const verifyError = ref('')

const rootGPGFingerprint = ref<string | null>(null)
const isGeneratingGPG = ref(false)

watch(phrase, async (mnemonic) => {
  rootGPGFingerprint.value = null
  if (!mnemonic.trim()) return
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

const printCanvas = ref<InstanceType<typeof PrintMnemonicCanvas> | null>(null)

const handlePrint = () => {
  printCanvas.value?.print()
}

// ── Autocomplete ───────────────────────────────────────────────────────────

interface AcState {
  index: number
  suggestions: string[]
  focus: number
}

const dictionary = wordlists.english
const verifyAC = ref<AcState | null>(null)

const handleAcInput = (index: number, _grid: 'verify') => {
  const value = verifyInputs.value[index]?.toLowerCase().trim()
  if (!value) { verifyAC.value = null; return }
  const suggestions = dictionary.filter(w => w.startsWith(value)).slice(0, 4)
  verifyAC.value = suggestions.length ? { index, suggestions, focus: -1 } : null
}

const selectAcSuggestion = (word: string, index: number, _grid: 'verify') => {
  verifyInputs.value[index] = word
  verifyAC.value = null
}

const handleAcKeydown = (e: KeyboardEvent, index: number, _grid: 'verify') => {
  if (!verifyAC.value || verifyAC.value.index !== index) return

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    verifyAC.value.focus = Math.min(verifyAC.value.focus + 1, verifyAC.value.suggestions.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    verifyAC.value.focus = Math.max(verifyAC.value.focus - 1, 0)
  } else if (e.key === 'Enter' || e.key === 'Tab') {
    if (verifyAC.value.focus >= 0) {
      if (e.key === 'Enter') e.preventDefault()
      selectAcSuggestion(verifyAC.value.suggestions[verifyAC.value.focus], index, 'verify')
    } else if (verifyAC.value.suggestions.length === 1) {
      if (e.key === 'Enter') e.preventDefault()
      selectAcSuggestion(verifyAC.value.suggestions[0], index, 'verify')
    }
  } else if (e.key === 'Escape') {
    verifyAC.value = null
  }
}

const handleAcBlur = () => {
  setTimeout(() => { verifyAC.value = null }, 150)
}

const phraseWords = computed(() => phrase.value ? phrase.value.split(' ') : [])

// 6 columns works for all standard BIP39 counts (12→2 rows, 15→3 rows, 18→3 rows, 21→4 rows, 24→4 rows)
const gridCols = 'repeat(6, 1fr)'

const modeSubtitle = computed(() => {
  switch (mode.value) {
    case 'display': return 'Save your recovery phrase in a secure location.'
    case 'verify':  return 'Enter each word in order.'
    case 'import':  return 'Enter your existing phrase.'
    default:        return ''
  }
})

const canConfirm = computed(() =>
  verifyInputs.value.slice(0, wordCount.value).every(w => w.trim().length > 0)
)

const generatePhrase = () => {
  const entropyBits = ENTROPY_MAP[wordCount.value]
  phrase.value = bip39.generateMnemonic(entropyBits)
  verifyInputs.value = Array(wordCount.value).fill('')
  verifyError.value = ''
}

const selectWordCount = (count: WordCount) => {
  wordCount.value = count
  generatePhrase()
}

const handlePaste = (e: ClipboardEvent) => {
  const text = e.clipboardData?.getData('text').trim()
  if (!text) return
  const words = text.split(/\s+/)
  if (words.length !== wordCount.value) return
  e.preventDefault()
  verifyInputs.value = [...words]
}

const handleVerify = () => {
  verifyError.value = ''
  const entered = verifyInputs.value.slice(0, wordCount.value).map(w => w.trim()).join(' ')
  if (entered !== phrase.value) {
    verifyError.value = 'The phrase you entered does not match. Please try again.'
    return
  }
  if (!bip39.validateMnemonic(entered)) {
    verifyError.value = 'Invalid recovery phrase. Please check each word.'
    return
  }
  emit('confirm', entered)
}


onMounted(() => {
  generatePhrase()
})
</script>

<style lang="scss" scoped>
/* ── Header ──────────────────────────────────────────────────────────────── */
.mnm-header {
  background: #2563eb;
  padding: 1.75rem 2rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.mnm-header-icon {
  width: 3rem;
  height: 3rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.2rem;
}

.mnm-header-icon-svg {
  color: #ffffff;
}

.mnm-title {
  font-size: 1.1rem;
  font-weight: 300;
  color: #ffffff;
  margin: 0;
}

.mnm-subtitle {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
  font-weight: 300;
}

/* ── Body ────────────────────────────────────────────────────────────────── */
.mnm-body {
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

/* ── Word count selector ─────────────────────────────────────────────────── */
.mnm-word-count-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.mnm-wc-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  flex-shrink: 0;
}

.mnm-wc-options {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.mnm-wc-btn {
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

.mnm-regen-btn {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  border-radius: 0.3rem;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  color: #6b7280;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;

  &:hover {
    background: #e0e7ff;
    color: #2563eb;
    border-color: #a5b4fc;
  }
}

/* ── Warning ─────────────────────────────────────────────────────────────── */
.mnm-warning {
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
}

.mnm-warning svg {
  flex-shrink: 0;
  margin-top: 1px;
}

/* ── BIP32 Root GPG Fingerprint ──────────────────────────────────────────── */
.mnm-gpg-box {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.65rem 0.75rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;

  &--loading {
    opacity: 0.6;
  }
}

.mnm-gpg-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mnm-gpg-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.mnm-gpg-copy {
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

.mnm-gpg-value {
  font-family: monospace;
  font-size: 0.75rem;
  color: #111827;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  padding: 0.4rem 0.5rem;
  word-break: break-all;
}

.mnm-gpg-desc {
  font-size: 0.68rem;
  color: #9ca3af;
  margin: 0;
  line-height: 1.5;
}

/* ── Words grid (display mode) ────────────────────────────────────────────── */
.mnm-words-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem 0.75rem;
}

.mnm-word-cell {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.5rem 0.6rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

.mnm-word-num {
  font-size: 0.65rem;
  color: #9ca3af;
  font-weight: 500;
}

.mnm-word {
  font-size: 0.8rem;
  font-weight: 500;
  color: #111827;
}

/* ── Autocomplete ────────────────────────────────────────────────────────── */
.mnm-ac-wrap {
  position: relative;
  width: 100%;
}

.mnm-ac-dropdown {
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

.mnm-ac-item {
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

  & + & {
    border-top: 1px solid #f3f4f6;
  }
}

/* ── Inputs grid (verify/import) ─────────────────────────────────────────── */
.mnm-inputs-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem 0.75rem;
}

.mnm-input-cell {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.mnm-input {
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

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
    background: #ffffff;
  }
}

.mnm-input-num {
  font-size: 0.65rem;
  color: #9ca3af;
  text-align: center;
}

/* ── Error ───────────────────────────────────────────────────────────────── */
.mnm-error {
  font-size: 0.75rem;
  color: #dc2626;
  margin: -0.25rem 0 0;
}

/* ── Actions ─────────────────────────────────────────────────────────────── */
.mnm-actions {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.mnm-btn {
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

    &:hover:not(:disabled) {
      background: #1d4ed8;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &--link {
    background: transparent;
    color: #2563eb;
    border: none;
    font-weight: 400;

    &:hover {
      text-decoration: underline;
    }
  }

  &--outline {
    background: transparent;
    color: #374151;
    border-color: #d1d5db;
    font-weight: 400;

    &:hover {
      background: #f3f4f6;
      border-color: #9ca3af;
    }
  }

  &--ghost {
    background: transparent;
    color: #2563eb;
    border: none;
    font-weight: 400;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
