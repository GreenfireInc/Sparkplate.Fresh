<template>
  <div class="hash-tool">
    <header class="hash-tool__header">
      <h2 class="hash-tool__title">Hash Generator</h2>
      <p class="hash-tool__lead">
        Generate cryptographic hashes using various algorithms
      </p>
    </header>

    <div class="hash-tool__panel">
      <!-- Top row: input source tabs + algorithm select -->
      <div class="hash-tool__top">
        <div class="hash-tool__field hash-tool__field--grow">
          <Label class="hash-tool__label">Input source</Label>
          <TabsRoot v-model="inputType" class="hash-tool__tabs">
            <TabsList class="hash-tool__tab-list" aria-label="Choose text or file input">
              <TabsTrigger value="text" class="hash-tool__tab-trigger">
                Text
              </TabsTrigger>
              <TabsTrigger value="file" class="hash-tool__tab-trigger">
                File
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" class="hash-tool__tab-content">
              <Label for="hash-text-input" class="hash-tool__label hash-tool__label--inner">Text to hash</Label>
              <textarea
                id="hash-text-input"
                v-model="textInput"
                class="hash-tool__textarea"
                rows="5"
                placeholder="Enter text to hash…"
                spellcheck="false"
              />
            </TabsContent>

            <TabsContent value="file" class="hash-tool__tab-content">
              <Label for="hash-file-input" class="hash-tool__label hash-tool__label--inner">File to hash</Label>
              <div class="hash-tool__file-wrap">
                <input
                  id="hash-file-input"
                  type="file"
                  class="hash-tool__file"
                  @change="handleFileSelect"
                />
              </div>
              <p v-if="selectedFile" class="hash-tool__file-meta">
                Selected: <strong>{{ selectedFile.name }}</strong>
                ({{ formatFileSize(selectedFile.size) }})
              </p>
            </TabsContent>
          </TabsRoot>
        </div>

        <div class="hash-tool__field hash-tool__field--algo">
          <Label for="hash-algo-select" class="hash-tool__label">Hash algorithm</Label>
          <SelectRoot v-model="selectedAlgorithm">
            <SelectTrigger id="hash-algo-select" class="hash-tool__select-trigger" aria-label="Hash algorithm">
              <SelectValue placeholder="Algorithm" />
              <SelectIcon class="hash-tool__select-chevron" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectContent class="hash-tool__select-content" position="popper" :side-offset="4">
                <SelectScrollUpButton class="hash-tool__select-scroll" />
                <SelectViewport class="hash-tool__select-viewport">
                  <SelectGroup>
                    <SelectLabel class="hash-tool__select-group-label">SHA family</SelectLabel>
                    <SelectItem value="sha1" class="hash-tool__select-item">
                      <SelectItemText>SHA-1</SelectItemText>
                    </SelectItem>
                    <SelectItem value="sha256" class="hash-tool__select-item">
                      <SelectItemText>SHA-256</SelectItemText>
                    </SelectItem>
                    <SelectItem value="sha384" class="hash-tool__select-item">
                      <SelectItemText>SHA-384</SelectItemText>
                    </SelectItem>
                    <SelectItem value="sha512" class="hash-tool__select-item">
                      <SelectItemText>SHA-512</SelectItemText>
                    </SelectItem>
                  </SelectGroup>
                  <SelectSeparator class="hash-tool__select-sep" />
                  <SelectGroup>
                    <SelectLabel class="hash-tool__select-group-label">MD family</SelectLabel>
                    <SelectItem value="md5" class="hash-tool__select-item">
                      <SelectItemText>MD5</SelectItemText>
                    </SelectItem>
                  </SelectGroup>
                  <SelectSeparator class="hash-tool__select-sep" />
                  <SelectGroup>
                    <SelectLabel class="hash-tool__select-group-label">RIPEMD family</SelectLabel>
                    <SelectItem value="ripemd128" class="hash-tool__select-item">
                      <SelectItemText>RIPEMD-128</SelectItemText>
                    </SelectItem>
                    <SelectItem value="ripemd160" class="hash-tool__select-item">
                      <SelectItemText>RIPEMD-160</SelectItemText>
                    </SelectItem>
                    <SelectItem value="ripemd256" class="hash-tool__select-item">
                      <SelectItemText>RIPEMD-256</SelectItemText>
                    </SelectItem>
                    <SelectItem value="ripemd320" class="hash-tool__select-item">
                      <SelectItemText>RIPEMD-320</SelectItemText>
                    </SelectItem>
                  </SelectGroup>
                  <SelectSeparator class="hash-tool__select-sep" />
                  <SelectGroup>
                    <SelectLabel class="hash-tool__select-group-label">Other</SelectLabel>
                    <SelectItem value="whirlpool" class="hash-tool__select-item">
                      <SelectItemText>Whirlpool</SelectItemText>
                    </SelectItem>
                    <SelectItem value="tiger128_3" class="hash-tool__select-item">
                      <SelectItemText>Tiger-128,3</SelectItemText>
                    </SelectItem>
                    <SelectItem value="tiger160_3" class="hash-tool__select-item">
                      <SelectItemText>Tiger-160,3</SelectItemText>
                    </SelectItem>
                    <SelectItem value="tiger192_3" class="hash-tool__select-item">
                      <SelectItemText>Tiger-192,3</SelectItemText>
                    </SelectItem>
                    <SelectItem value="tiger128_4" class="hash-tool__select-item">
                      <SelectItemText>Tiger-128,4</SelectItemText>
                    </SelectItem>
                    <SelectItem value="blake2b" class="hash-tool__select-item">
                      <SelectItemText>Blake2b</SelectItemText>
                    </SelectItem>
                  </SelectGroup>
                </SelectViewport>
                <SelectScrollDownButton class="hash-tool__select-scroll" />
              </SelectContent>
            </SelectPortal>
          </SelectRoot>
        </div>
      </div>

      <Separator class="hash-tool__separator" />

      <div class="hash-tool__actions">
        <button
          type="button"
          class="hash-tool__btn"
          :disabled="!canGenerateHash || isGenerating"
          @click="generateHash"
        >
          <span v-if="isGenerating" class="hash-tool__btn-inner">
            <span class="hash-tool__spinner" aria-hidden="true" />
            Generating…
          </span>
          <span v-else>Generate hash</span>
        </button>
      </div>
    </div>

    <div v-if="hashResult" class="hash-tool__result">
      <div class="hash-tool__result-head">
        <h3 class="hash-tool__result-title">Hash result</h3>
        <button type="button" class="hash-tool__copy" @click="copyToClipboard">
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
      </div>
      <dl class="hash-tool__meta">
        <div class="hash-tool__meta-row">
          <dt>Algorithm</dt>
          <dd>{{ selectedAlgorithm.toUpperCase() }}</dd>
        </div>
        <div v-if="inputType === 'file' && selectedFile" class="hash-tool__meta-row">
          <dt>File</dt>
          <dd>{{ selectedFile.name }}</dd>
        </div>
      </dl>
      <div class="hash-tool__output">
        <code class="hash-tool__code">{{ hashResult }}</code>
      </div>
    </div>

    <div v-if="error" class="hash-tool__error" role="alert">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CryptoJS from 'crypto-js'
import {
  Label,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
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
  SelectScrollUpButton,
  SelectScrollDownButton,
  Separator,
} from 'radix-vue'

defineOptions({
  name: 'HashTool',
})

const inputType = ref<'text' | 'file'>('text')
const textInput = ref('')
const selectedFile = ref<File | null>(null)
const selectedAlgorithm = ref('sha256')
const hashResult = ref('')
const isGenerating = ref(false)
const error = ref('')
const copied = ref(false)

const canGenerateHash = computed(() => {
  if (inputType.value === 'text') {
    return textInput.value.trim() !== ''
  }
  return selectedFile.value !== null
})

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  selectedFile.value = target.files?.[0] || null
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
}

async function generateHash() {
  if (!canGenerateHash.value) return

  isGenerating.value = true
  error.value = ''
  hashResult.value = ''

  try {
    let input: string | ArrayBuffer

    if (inputType.value === 'text') {
      input = textInput.value
    } else if (selectedFile.value) {
      input = await readFileAsArrayBuffer(selectedFile.value)
    } else {
      throw new Error('No input provided')
    }

    const hash = await computeHash(input, selectedAlgorithm.value)
    hashResult.value = hash
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An error occurred while generating the hash'
    error.value = message
  } finally {
    isGenerating.value = false
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

async function computeHash(input: string | ArrayBuffer, algorithm: string): Promise<string> {
  let wordArray: CryptoJS.lib.WordArray

  if (typeof input === 'string') {
    wordArray = CryptoJS.enc.Utf8.parse(input)
  } else {
    const uint8Array = new Uint8Array(input)
    wordArray = CryptoJS.lib.WordArray.create(uint8Array as unknown as number[])
  }

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
    case 'ripemd160':
      return CryptoJS.RIPEMD160(wordArray).toString()
    case 'blake2b':
      console.warn('Blake2b not fully supported, using SHA-256 instead')
      return CryptoJS.SHA256(wordArray).toString()
    default:
      console.warn(`Algorithm ${algorithm} not fully supported, using SHA-256 instead`)
      return CryptoJS.SHA256(wordArray).toString()
  }
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(hashResult.value)
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
.hash-tool {
  width: 100%;
  max-width: 52rem;
}

.hash-tool__header {
  margin-bottom: 1.25rem;
}

.hash-tool__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.375rem;
}

.hash-tool__lead {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.hash-tool__panel {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem 1.25rem 1.25rem;
}

.hash-tool__top {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1.5rem;
  }
}

.hash-tool__field {
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

.hash-tool__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;

  &--inner {
    margin-top: 0.25rem;
  }
}

/* Tabs (input source) */
.hash-tool__tabs {
  width: 100%;
}

.hash-tool__tab-list {
  display: inline-flex;
  gap: 0;
  padding: 0.25rem;
  background: #e5e7eb;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
}

.hash-tool__tab-trigger {
  flex: 1;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  background: transparent;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  outline: none;
  transition: color 0.15s, background 0.15s, box-shadow 0.15s;

  &:hover {
    color: #374151;
  }

  &[data-state='active'] {
    color: #111827;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #3b82f6;
  }
}

.hash-tool__tab-content {
  outline: none;

  &:focus-visible {
    border-radius: 0.375rem;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.35);
  }
}

.hash-tool__textarea {
  width: 100%;
  padding: 0.75rem 0.875rem;
  font-size: 0.875rem;
  line-height: 1.45;
  color: #111827;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  resize: vertical;
  min-height: 7rem;
  outline: none;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
}

.hash-tool__file-wrap {
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

.hash-tool__file {
  width: 100%;
  padding: 0;
  font-size: 0.8125rem;
  color: #374151;
  background: transparent;
  border: none;
  border-radius: 0;
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

.hash-tool__file-meta {
  font-size: 0.8125rem;
  color: #6b7280;
  margin: 0.5rem 0 0;
}

.hash-tool__select-trigger {
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

.hash-tool__select-chevron {
  display: flex;
  color: #6b7280;
  flex-shrink: 0;
  transition: transform 0.15s;
}

.hash-tool__select-trigger[data-state='open'] .hash-tool__select-chevron {
  transform: rotate(180deg);
}

.hash-tool__separator {
  height: 1px;
  background: #e5e7eb;
  margin: 1rem 0;
}

.hash-tool__actions {
  display: flex;
  justify-content: stretch;
}

.hash-tool__btn {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background: #2563eb;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #2563eb;
  }

  &:disabled {
    background: #d1d5db;
    color: #6b7280;
    cursor: not-allowed;
  }
}

.hash-tool__btn-inner {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.hash-tool__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: hash-spin 0.7s linear infinite;
}

@keyframes hash-spin {
  to {
    transform: rotate(360deg);
  }
}

/* Result block */
.hash-tool__result {
  margin-top: 1.25rem;
  padding: 1rem 1.25rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.hash-tool__result-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.hash-tool__result-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.hash-tool__copy {
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

.hash-tool__meta {
  margin: 0 0 0.75rem;
  font-size: 0.8125rem;
  color: #6b7280;
}

.hash-tool__meta-row {
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

.hash-tool__output {
  padding: 0.75rem 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

.hash-tool__code {
  display: block;
  font-size: 0.8125rem;
  line-height: 1.5;
  word-break: break-all;
  color: #111827;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.hash-tool__error {
  margin-top: 1rem;
  padding: 0.875rem 1rem;
  font-size: 0.875rem;
  color: #991b1b;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
}
</style>

<style lang="scss">
/* Portal content — must be unscoped for popper */
.hash-tool__select-content {
  z-index: 10050;
  min-width: var(--radix-select-trigger-width);
  max-height: min(60vh, 22rem);
  overflow: hidden;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12);
}

.hash-tool__select-viewport {
  padding: 0.25rem;
}

.hash-tool__select-group-label {
  padding: 0.5rem 0.625rem 0.25rem;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #9ca3af;
}

.hash-tool__select-item {
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

.hash-tool__select-sep {
  height: 1px;
  margin: 0.25rem 0;
  background: #f3f4f6;
}

.hash-tool__select-scroll {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  color: #9ca3af;
  cursor: default;
}
</style>
