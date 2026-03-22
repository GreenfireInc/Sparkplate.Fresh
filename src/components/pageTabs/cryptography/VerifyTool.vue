<template>
  <div class="verify-tool">
    <header class="verify-tool__header">
      <h2 class="verify-tool__title">File integrity verification</h2>
      <p class="verify-tool__lead">
        Verify the integrity of files by comparing their hashes with known values
      </p>
    </header>

    <div class="verify-tool__panel">
      <div class="verify-tool__top">
        <div class="verify-tool__field verify-tool__field--grow">
          <Label for="verify-file-input" class="verify-tool__label">Select file to verify</Label>
          <div class="verify-tool__file-wrap">
            <input
              id="verify-file-input"
              type="file"
              class="verify-tool__file"
              @change="handleFileSelect"
            />
          </div>
          <p v-if="selectedFile" class="verify-tool__file-meta">
            Selected: <strong>{{ selectedFile.name }}</strong>
            ({{ formatFileSize(selectedFile.size) }})
          </p>
        </div>

        <div class="verify-tool__field verify-tool__field--algo">
          <Label for="verify-algo-select" class="verify-tool__label">Hash algorithm</Label>
          <SelectRoot v-model="selectedAlgorithm">
            <SelectTrigger id="verify-algo-select" class="verify-tool__select-trigger" aria-label="Hash algorithm">
              <SelectValue placeholder="Algorithm" />
              <SelectIcon class="verify-tool__select-chevron" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectContent class="verify-tool__select-content" position="popper" :side-offset="4">
                <SelectViewport class="verify-tool__select-viewport">
                  <SelectGroup>
                    <SelectLabel class="verify-tool__select-group-label">SHA family</SelectLabel>
                    <SelectItem value="sha1" class="verify-tool__select-item">
                      <SelectItemText>SHA-1</SelectItemText>
                    </SelectItem>
                    <SelectItem value="sha256" class="verify-tool__select-item">
                      <SelectItemText>SHA-256</SelectItemText>
                    </SelectItem>
                    <SelectItem value="sha384" class="verify-tool__select-item">
                      <SelectItemText>SHA-384</SelectItemText>
                    </SelectItem>
                    <SelectItem value="sha512" class="verify-tool__select-item">
                      <SelectItemText>SHA-512</SelectItemText>
                    </SelectItem>
                  </SelectGroup>
                  <SelectSeparator class="verify-tool__select-sep" />
                  <SelectGroup>
                    <SelectLabel class="verify-tool__select-group-label">MD family</SelectLabel>
                    <SelectItem value="md5" class="verify-tool__select-item">
                      <SelectItemText>MD5</SelectItemText>
                    </SelectItem>
                  </SelectGroup>
                </SelectViewport>
              </SelectContent>
            </SelectPortal>
          </SelectRoot>
        </div>
      </div>

      <div class="verify-tool__field">
        <Label for="expectedHash" class="verify-tool__label">Expected hash (optional)</Label>
        <input
          id="expectedHash"
          v-model="expectedHash"
          type="text"
          class="verify-tool__input"
          placeholder="Enter the expected hash value to compare…"
          autocomplete="off"
          spellcheck="false"
        />
        <p class="verify-tool__hint">
          Leave empty to only calculate the hash, or enter an expected value to verify.
        </p>
      </div>

      <Separator class="verify-tool__separator" />

      <div class="verify-tool__actions">
        <button
          type="button"
          class="verify-tool__btn verify-tool__btn--primary"
          :disabled="!selectedFile || isCalculating"
          @click="calculateHash"
        >
          <span v-if="isCalculating" class="verify-tool__btn-inner">
            <span class="verify-tool__spinner" aria-hidden="true" />
            Calculating…
          </span>
          <span v-else>Calculate hash</span>
        </button>
        <button
          type="button"
          class="verify-tool__btn verify-tool__btn--success"
          :disabled="!selectedFile || !expectedHash.trim() || isCalculating"
          @click="verifyHash"
        >
          <span v-if="isCalculating" class="verify-tool__btn-inner">
            <span class="verify-tool__spinner" aria-hidden="true" />
            Verifying…
          </span>
          <span v-else>Verify integrity</span>
        </button>
      </div>
    </div>

    <!-- Results -->
    <div v-if="calculatedHash" class="verify-tool__result">
      <div class="verify-tool__result-head">
        <h3 class="verify-tool__result-title">Hash result</h3>
        <button type="button" class="verify-tool__copy" @click="copyToClipboard">
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
      </div>
      <dl class="verify-tool__meta">
        <div class="verify-tool__meta-row">
          <dt>File</dt>
          <dd>{{ selectedFile?.name }}</dd>
        </div>
        <div class="verify-tool__meta-row">
          <dt>Algorithm</dt>
          <dd>{{ selectedAlgorithm.toUpperCase() }}</dd>
        </div>
      </dl>
      <div class="verify-tool__output">
        <span class="verify-tool__output-label">Calculated hash</span>
        <code class="verify-tool__code">{{ calculatedHash }}</code>
      </div>

      <div v-if="verificationResult !== null" class="verify-tool__verify-block">
        <div v-if="verificationResult" class="verify-tool__banner verify-tool__banner--ok">
          <svg class="verify-tool__banner-icon" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="verify-tool__banner-text">Hash verification successful — file integrity confirmed.</p>
        </div>
        <div v-else class="verify-tool__banner verify-tool__banner--bad">
          <svg class="verify-tool__banner-icon" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="verify-tool__banner-text">Hash verification failed — file may be corrupted or modified.</p>
        </div>
        <div v-if="!verificationResult" class="verify-tool__output verify-tool__output--expected">
          <span class="verify-tool__output-label">Expected hash</span>
          <code class="verify-tool__code verify-tool__code--error">{{ expectedHash }}</code>
        </div>
      </div>
    </div>

    <div v-if="error" class="verify-tool__error" role="alert">
      {{ error }}
    </div>

    <div class="verify-tool__info">
      <h3 class="verify-tool__info-title">About file verification</h3>
      <ul class="verify-tool__info-list">
        <li>
          <strong>Calculate hash:</strong> Generate a cryptographic hash of your file to verify integrity later.
        </li>
        <li>
          <strong>Verify integrity:</strong> Compare your file’s hash with a known good hash to detect changes or corruption.
        </li>
        <li>
          <strong>Common uses:</strong> Verifying downloaded ISOs, software integrity, and tampering detection.
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CryptoJS from 'crypto-js'
import {
  Label,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectPortal,
  SelectViewport,
  SelectItem,
  SelectItemText,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectIcon,
  Separator,
} from 'radix-vue'

defineOptions({
  name: 'VerifyTool',
})

const selectedFile = ref<File | null>(null)
const selectedAlgorithm = ref('sha256')
const expectedHash = ref('')
const calculatedHash = ref('')
const verificationResult = ref<boolean | null>(null)
const isCalculating = ref(false)
const error = ref('')
const copied = ref(false)

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  selectedFile.value = target.files?.[0] || null
  calculatedHash.value = ''
  verificationResult.value = null
  error.value = ''
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
}

async function calculateHash() {
  if (!selectedFile.value) return

  isCalculating.value = true
  error.value = ''
  verificationResult.value = null

  try {
    const arrayBuffer = await readFileAsArrayBuffer(selectedFile.value)
    const hash = await computeFileHash(arrayBuffer, selectedAlgorithm.value)
    calculatedHash.value = hash
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An error occurred while calculating the hash'
    error.value = message
    calculatedHash.value = ''
  } finally {
    isCalculating.value = false
  }
}

async function verifyHash() {
  if (!selectedFile.value || !expectedHash.value.trim()) return

  isCalculating.value = true
  error.value = ''

  try {
    const arrayBuffer = await readFileAsArrayBuffer(selectedFile.value)
    const hash = await computeFileHash(arrayBuffer, selectedAlgorithm.value)
    calculatedHash.value = hash

    const expected = expectedHash.value.trim().toLowerCase()
    const calculated = hash.toLowerCase()
    verificationResult.value = expected === calculated
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An error occurred while verifying the hash'
    error.value = message
    calculatedHash.value = ''
    verificationResult.value = null
  } finally {
    isCalculating.value = false
  }
}

function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as ArrayBuffer)
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsArrayBuffer(file)
  })
}

async function computeFileHash(arrayBuffer: ArrayBuffer, algorithm: string): Promise<string> {
  const uint8Array = new Uint8Array(arrayBuffer)
  const wordArray = CryptoJS.lib.WordArray.create(uint8Array as unknown as number[])

  switch (algorithm) {
    case 'sha1':
      return CryptoJS.SHA1(wordArray).toString()
    case 'sha256':
      return CryptoJS.SHA256(wordArray).toString()
    case 'sha384':
      return CryptoJS.SHA384(wordArray).toString()
    case 'sha512':
      return CryptoJS.SHA512(wordArray).toString()
    case 'md5':
      return CryptoJS.MD5(wordArray).toString()
    default:
      throw new Error(`Unsupported algorithm: ${algorithm}`)
  }
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(calculatedHash.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
  }
}
</script>

<style lang="scss" scoped>
.verify-tool {
  width: 100%;
  max-width: 52rem;
}

.verify-tool__header {
  margin-bottom: 1.25rem;
}

.verify-tool__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.375rem;
}

.verify-tool__lead {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.verify-tool__panel {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem 1.25rem 1.25rem;
}

.verify-tool__top {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1.5rem;
  }
}

.verify-tool__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;

  &--grow {
    flex: 1;
  }

  &--algo {
    width: 100%;

    @media (min-width: 768px) {
      width: 16rem;
      flex-shrink: 0;
    }
  }
}

.verify-tool__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.verify-tool__file-wrap {
  padding: 0.75rem 1rem;
  background: #fff;
  border: 1px dashed #d1d5db;
  border-radius: 0.375rem;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus-within {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
}

.verify-tool__file {
  width: 100%;
  padding: 0;
  font-size: 0.8125rem;
  color: #374151;
  background: transparent;
  border: none;
  cursor: pointer;

  &::file-selector-button {
    margin-right: 0.875rem;
    margin-inline-start: 0.125rem;
    padding: 0.5rem 0.875rem;
    font-size: 0.8125rem;
    font-weight: 500;
    color: #1d4ed8;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
}

.verify-tool__file-meta {
  font-size: 0.8125rem;
  color: #6b7280;
  margin: 0;
}

.verify-tool__input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-size: 0.875rem;
  color: #111827;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
}

.verify-tool__hint {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

.verify-tool__separator {
  height: 1px;
  background: #e5e7eb;
  margin: 1rem 0;
}

.verify-tool__actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 480px) {
    flex-direction: row;
  }
}

.verify-tool__btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;

  &:disabled {
    background: #d1d5db !important;
    color: #6b7280;
    cursor: not-allowed;
    box-shadow: none;
  }

  &--primary {
    background: #2563eb;

    &:hover:not(:disabled) {
      background: #1d4ed8;
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px #2563eb;
    }
  }

  &--success {
    background: #16a34a;

    &:hover:not(:disabled) {
      background: #15803d;
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px #16a34a;
    }
  }
}

.verify-tool__btn-inner {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.verify-tool__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: verify-spin 0.7s linear infinite;
}

@keyframes verify-spin {
  to {
    transform: rotate(360deg);
  }
}

.verify-tool__select-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  min-height: 2.75rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #111827;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:hover {
    border-color: #9ca3af;
  }

  &[data-state='open'] {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
}

.verify-tool__select-chevron {
  display: flex;
  color: #6b7280;
  flex-shrink: 0;
  transition: transform 0.15s;
}

.verify-tool__select-trigger[data-state='open'] .verify-tool__select-chevron {
  transform: rotate(180deg);
}

/* Results */
.verify-tool__result {
  margin-top: 1.25rem;
  padding: 1rem 1.25rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.verify-tool__result-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.verify-tool__result-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.verify-tool__copy {
  flex-shrink: 0;
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #1d4ed8;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #dbeafe;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #3b82f6;
  }
}

.verify-tool__meta {
  margin: 0 0 0.75rem;
  font-size: 0.8125rem;
  color: #6b7280;
}

.verify-tool__meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.5rem;
  margin-bottom: 0.25rem;

  dt {
    font-weight: 600;
    color: #4b5563;
    margin: 0;
  }

  dd {
    margin: 0;
  }
}

.verify-tool__output {
  padding: 0.75rem 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;

  &--expected {
    margin-top: 0.75rem;
  }
}

.verify-tool__output-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-bottom: 0.375rem;
}

.verify-tool__code {
  display: block;
  font-size: 0.8125rem;
  line-height: 1.5;
  word-break: break-all;
  color: #111827;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  &--error {
    color: #b91c1c;
  }
}

.verify-tool__verify-block {
  margin-top: 1rem;
}

.verify-tool__banner {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.875rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid;

  &--ok {
    background: #f0fdf4;
    border-color: #bbf7d0;
    color: #166534;
  }

  &--bad {
    background: #fef2f2;
    border-color: #fecaca;
    color: #991b1b;
  }
}

.verify-tool__banner-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.verify-tool__banner-text {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.45;
}

.verify-tool__error {
  margin-top: 1rem;
  padding: 0.875rem 1rem;
  font-size: 0.875rem;
  color: #991b1b;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
}

.verify-tool__info {
  margin-top: 1.25rem;
  padding: 1rem 1.25rem;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.5rem;
}

.verify-tool__info-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1e3a8a;
  margin: 0 0 0.75rem;
}

.verify-tool__info-list {
  margin: 0;
  padding-left: 1.125rem;
  font-size: 0.875rem;
  color: #1e40af;
  line-height: 1.55;

  li {
    margin-bottom: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    font-weight: 600;
  }
}
</style>

<style lang="scss">
.verify-tool__select-content {
  z-index: 10050;
  min-width: var(--radix-select-trigger-width);
  max-height: min(50vh, 18rem);
  overflow: hidden;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12);
}

.verify-tool__select-viewport {
  padding: 0.25rem;
}

.verify-tool__select-group-label {
  padding: 0.5rem 0.625rem 0.25rem;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #9ca3af;
}

.verify-tool__select-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #374151;
  border-radius: 0.25rem;
  cursor: pointer;
  outline: none;
  user-select: none;

  &[data-highlighted] {
    background: #f3f4f6;
    color: #111827;
  }

  &[data-state='checked'] {
    font-weight: 500;
    color: #1d4ed8;
  }
}

.verify-tool__select-sep {
  height: 1px;
  margin: 0.25rem 0;
  background: #f3f4f6;
}
</style>
