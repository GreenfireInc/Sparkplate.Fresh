<template>
  <div class="edt">
    <header class="edt__header">
      <h2 class="edt__title">File encryption &amp; decryption</h2>
      <p class="edt__lead">
        Encrypt files with password protection or decrypt encrypted files
      </p>
    </header>

    <div class="edt__panel">
      <div class="edt__top">
        <div class="edt__field edt__field--grow">
          <Label class="edt__label">Operation</Label>
          <TabsRoot v-model="operation" class="edt__tabs" orientation="horizontal">
            <TabsList class="edt__tab-list" aria-label="Encrypt or decrypt">
              <TabsTrigger value="encrypt" class="edt__tab-trigger">
                Encrypt file
              </TabsTrigger>
              <TabsTrigger value="decrypt" class="edt__tab-trigger">
                Decrypt file
              </TabsTrigger>
            </TabsList>
          </TabsRoot>
        </div>

        <div class="edt__field edt__field--algo">
          <Label for="edt-algo-select" class="edt__label">Encryption algorithm</Label>
          <SelectRoot v-model="selectedAlgorithm">
            <SelectTrigger id="edt-algo-select" class="edt__select-trigger" aria-label="Encryption algorithm">
              <SelectValue placeholder="Algorithm" />
              <SelectIcon class="edt__select-chevron" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectContent class="edt__select-content" position="popper" :side-offset="4">
                <SelectViewport class="edt__select-viewport">
                  <SelectGroup>
                    <SelectLabel class="edt__select-group-label">AES</SelectLabel>
                    <SelectItem value="aes256" class="edt__select-item">
                      <SelectItemText>AES-256-CBC</SelectItemText>
                    </SelectItem>
                    <SelectItem value="aes192" class="edt__select-item">
                      <SelectItemText>AES-192-CBC</SelectItemText>
                    </SelectItem>
                    <SelectItem value="aes128" class="edt__select-item">
                      <SelectItemText>AES-128-CBC</SelectItemText>
                    </SelectItem>
                  </SelectGroup>
                  <SelectSeparator class="edt__select-sep" />
                  <SelectGroup>
                    <SelectLabel class="edt__select-group-label">Other</SelectLabel>
                    <SelectItem value="des" class="edt__select-item">
                      <SelectItemText>DES</SelectItemText>
                    </SelectItem>
                    <SelectItem value="3des" class="edt__select-item">
                      <SelectItemText>3DES</SelectItemText>
                    </SelectItem>
                  </SelectGroup>
                </SelectViewport>
              </SelectContent>
            </SelectPortal>
          </SelectRoot>
        </div>
      </div>

      <div class="edt__field">
        <Label for="edt-file-input" class="edt__label">
          {{ operation === 'encrypt' ? 'Select file to encrypt' : 'Select encrypted file' }}
        </Label>
        <div class="edt__file-wrap">
          <input
            id="edt-file-input"
            type="file"
            class="edt__file"
            @change="handleFileSelect"
          />
        </div>
        <p v-if="selectedFile" class="edt__file-meta">
          Selected: <strong>{{ selectedFile.name }}</strong>
          ({{ formatFileSize(selectedFile.size) }})
        </p>
      </div>

      <div class="edt__grid">
        <div class="edt__field">
          <Label for="edt-password" class="edt__label">Password</Label>
          <div class="edt__password-wrap">
            <input
              id="edt-password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="edt__input edt__input--password"
              placeholder="Enter a strong password…"
              autocomplete="off"
            />
            <button
              type="button"
              class="edt__pw-toggle"
              :aria-pressed="showPassword"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              @click="showPassword = !showPassword"
            >
              <svg v-if="!showPassword" class="edt__pw-icon" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg v-else class="edt__pw-icon" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clip-rule="evenodd"
                />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            </button>
          </div>
          <div class="edt__strength">
            <span class="edt__strength-label">Password strength</span>
            <div class="edt__strength-bars" role="img" :aria-label="getPasswordStrengthText()">
              <div
                v-for="i in 4"
                :key="i"
                class="edt__strength-seg"
                :class="getPasswordStrength() >= i ? strengthBarClass() : 'edt__strength-seg--empty'"
              />
            </div>
            <p class="edt__strength-text" :class="strengthTextClass()">
              {{ getPasswordStrengthText() }}
            </p>
          </div>
        </div>

        <div v-if="operation === 'encrypt'" class="edt__field">
          <Label for="edt-confirm" class="edt__label">Confirm password</Label>
          <input
            id="edt-confirm"
            v-model="confirmPassword"
            type="password"
            class="edt__input"
            placeholder="Confirm your password…"
            autocomplete="off"
          />
          <p v-if="password && confirmPassword && password !== confirmPassword" class="edt__mismatch">
            Passwords do not match
          </p>
        </div>
      </div>

      <Separator class="edt__separator" />

      <div class="edt__actions">
        <button
          type="button"
          class="edt__btn"
          :class="operation === 'encrypt' ? 'edt__btn--encrypt' : 'edt__btn--decrypt'"
          :disabled="!canProcess || isProcessing"
          @click="processFile"
        >
          <span v-if="isProcessing" class="edt__btn-inner">
            <span class="edt__spinner" aria-hidden="true" />
            {{ operation === 'encrypt' ? 'Encrypting…' : 'Decrypting…' }}
          </span>
          <span v-else>{{ operation === 'encrypt' ? 'Encrypt file' : 'Decrypt file' }}</span>
        </button>
      </div>
    </div>

    <div v-if="processedFile" class="edt__success">
      <div class="edt__success-row">
        <div class="edt__success-msg">
          <svg class="edt__success-icon" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="edt__success-title">
            {{ operation === 'encrypt' ? 'File encrypted successfully.' : 'File decrypted successfully.' }}
          </p>
        </div>
        <button type="button" class="edt__download" @click="downloadFile">
          Download
        </button>
      </div>
      <p class="edt__success-meta">
        {{ operation === 'encrypt' ? 'Encrypted' : 'Decrypted' }} file: {{ processedFileName }}
      </p>
    </div>

    <div v-if="error" class="edt__error" role="alert">
      {{ error }}
    </div>

    <div class="edt__info">
      <h3 class="edt__info-title">Security information</h3>
      <ul class="edt__info-list">
        <li>
          <strong>Encryption:</strong> Files are encrypted using standard algorithms with your password as the key.
        </li>
        <li>
          <strong>Password security:</strong> Use a strong password with mixed case, numbers, and symbols.
        </li>
        <li>
          <strong>Important:</strong> Keep your password safe — encrypted files cannot be recovered without it.
        </li>
      </ul>
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
  name: 'EncryptDecryptTool',
})

const operation = ref<'encrypt' | 'decrypt'>('encrypt')
const selectedFile = ref<File | null>(null)
const selectedAlgorithm = ref('aes256')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const processedFile = ref<Blob | null>(null)
const processedFileName = ref('')
const isProcessing = ref(false)
const error = ref('')

const canProcess = computed(() => {
  if (!selectedFile.value || !password.value.trim()) return false
  if (operation.value === 'encrypt') {
    return password.value === confirmPassword.value && getPasswordStrength() >= 2
  }
  return true
})

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  selectedFile.value = target.files?.[0] || null
  processedFile.value = null
  processedFileName.value = ''
  error.value = ''
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
}

function getPasswordStrength(): number {
  const pwd = password.value
  if (pwd.length < 4) return 0

  let strength = 0
  if (pwd.length >= 8) strength++
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
  if (/\d/.test(pwd)) strength++
  if (/[^a-zA-Z0-9]/.test(pwd)) strength++

  return strength
}

/** Active bar segment color (matches overall strength tier) */
function strengthBarClass(): string {
  const s = getPasswordStrength()
  if (s <= 1) return 'edt__strength-seg--red'
  if (s === 2) return 'edt__strength-seg--yellow'
  if (s === 3) return 'edt__strength-seg--blue'
  return 'edt__strength-seg--green'
}

function strengthTextClass(): string {
  const s = getPasswordStrength()
  if (s <= 1) return 'edt__strength-text--red'
  if (s === 2) return 'edt__strength-text--yellow'
  if (s === 3) return 'edt__strength-text--blue'
  return 'edt__strength-text--green'
}

function getPasswordStrengthText(): string {
  const strength = getPasswordStrength()
  if (strength === 0) return 'Too weak'
  if (strength === 1) return 'Weak'
  if (strength === 2) return 'Fair'
  if (strength === 3) return 'Good'
  return 'Strong'
}

async function processFile() {
  if (!canProcess.value || !selectedFile.value) return

  isProcessing.value = true
  error.value = ''
  processedFile.value = null

  try {
    const fileData = await readFileAsArrayBuffer(selectedFile.value)

    if (operation.value === 'encrypt') {
      const encrypted = await encryptFile(fileData, password.value, selectedAlgorithm.value)
      processedFile.value = encrypted
      processedFileName.value = `${selectedFile.value.name}.encrypted`
    } else {
      const decrypted = await decryptFile(fileData, password.value, selectedAlgorithm.value)
      processedFile.value = decrypted
      const originalName = selectedFile.value.name.replace(/\.encrypted$/, '')
      processedFileName.value = originalName
    }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : `An error occurred while ${operation.value}ing the file`
    error.value = message
  } finally {
    isProcessing.value = false
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

async function encryptFile(data: ArrayBuffer, pwd: string, algorithm: string): Promise<Blob> {
  const uint8Array = new Uint8Array(data)
  const wordArray = CryptoJS.lib.WordArray.create(uint8Array as unknown as number[])

  let encrypted: CryptoJS.lib.CipherParams

  switch (algorithm) {
    case 'aes256':
    case 'aes192':
    case 'aes128':
      encrypted = CryptoJS.AES.encrypt(wordArray, pwd)
      break
    case 'des':
      encrypted = CryptoJS.DES.encrypt(wordArray, pwd)
      break
    case '3des':
      encrypted = CryptoJS.TripleDES.encrypt(wordArray, pwd)
      break
    default:
      throw new Error(`Unsupported encryption algorithm: ${algorithm}`)
  }

  const encryptedString = encrypted.toString()
  const encryptedBytes = new TextEncoder().encode(encryptedString)
  return new Blob([encryptedBytes], { type: 'application/octet-stream' })
}

async function decryptFile(data: ArrayBuffer, pwd: string, algorithm: string): Promise<Blob> {
  const uint8Array = new Uint8Array(data)
  const encryptedString = new TextDecoder().decode(uint8Array)

  let decrypted: CryptoJS.lib.WordArray

  try {
    switch (algorithm) {
      case 'aes256':
      case 'aes192':
      case 'aes128':
        decrypted = CryptoJS.AES.decrypt(encryptedString, pwd)
        break
      case 'des':
        decrypted = CryptoJS.DES.decrypt(encryptedString, pwd)
        break
      case '3des':
        decrypted = CryptoJS.TripleDES.decrypt(encryptedString, pwd)
        break
      default:
        throw new Error(`Unsupported decryption algorithm: ${algorithm}`)
    }

    if (decrypted.sigBytes <= 0) {
      throw new Error('Invalid password or corrupted file')
    }

    const decryptedBytes = new Uint8Array(decrypted.sigBytes)
    const words = decrypted.words
    for (let i = 0; i < decrypted.sigBytes; i++) {
      const byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff
      decryptedBytes[i] = byte
    }

    return new Blob([decryptedBytes], { type: 'application/octet-stream' })
  } catch {
    throw new Error('Decryption failed. Please check your password and try again.')
  }
}

function downloadFile() {
  if (!processedFile.value) return

  const url = URL.createObjectURL(processedFile.value)
  const a = document.createElement('a')
  a.href = url
  a.download = processedFileName.value
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<style lang="scss" scoped>
.edt {
  width: 100%;
  max-width: 52rem;
}

.edt__header {
  margin-bottom: 1.25rem;
}

.edt__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.375rem;
}

.edt__lead {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.edt__panel {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem 1.25rem 1.25rem;
}

.edt__top {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1.25rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1.5rem;
  }
}

.edt__field {
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

.edt__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.edt__tabs {
  width: 100%;
}

.edt__tab-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
  width: 100%;
  gap: 0;
  padding: 0.25rem;
  background: #e5e7eb;
  border-radius: 0.5rem;
}

.edt__tab-trigger {
  flex: 1 1 0;
  min-width: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  background: transparent;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  outline: none;
  white-space: nowrap;
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

.edt__file-wrap {
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

.edt__file {
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

.edt__file-meta {
  font-size: 0.8125rem;
  color: #6b7280;
  margin: 0;
}

.edt__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

.edt__input {
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

.edt__password-wrap {
  position: relative;
  display: flex;
  align-items: stretch;
}

.edt__input--password {
  padding-right: 2.75rem;
}

.edt__pw-toggle {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  padding: 0;
  color: #9ca3af;
  background: transparent;
  border: none;
  border-radius: 0 0.375rem 0.375rem 0;
  cursor: pointer;
  transition: color 0.15s, background 0.15s;

  &:hover {
    color: #4b5563;
    background: #f9fafb;
  }

  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 2px #3b82f6;
  }
}

.edt__pw-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.edt__strength {
  margin-top: 0.25rem;
}

.edt__strength-label {
  display: block;
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.375rem;
}

.edt__strength-bars {
  display: flex;
  gap: 0.25rem;
}

.edt__strength-seg {
  flex: 1;
  height: 0.25rem;
  border-radius: 9999px;
  transition: background 0.2s;

  &--empty {
    background: #e5e7eb;
  }

  &--red {
    background: #ef4444;
  }

  &--yellow {
    background: #eab308;
  }

  &--blue {
    background: #3b82f6;
  }

  &--green {
    background: #22c55e;
  }
}

.edt__strength-text {
  font-size: 0.75rem;
  margin: 0.375rem 0 0;

  &--red {
    color: #dc2626;
  }

  &--yellow {
    color: #ca8a04;
  }

  &--blue {
    color: #2563eb;
  }

  &--green {
    color: #16a34a;
  }
}

.edt__mismatch {
  font-size: 0.75rem;
  color: #dc2626;
  margin: 0.25rem 0 0;
}

.edt__separator {
  height: 1px;
  background: #e5e7eb;
  margin: 1rem 0;
}

.edt__actions {
  display: flex;
}

.edt__btn {
  width: 100%;
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
  transition: background 0.15s;

  &:disabled {
    background: #d1d5db !important;
    color: #6b7280;
    cursor: not-allowed;
  }

  &--encrypt {
    background: #16a34a;

    &:hover:not(:disabled) {
      background: #15803d;
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px #16a34a;
    }
  }

  &--decrypt {
    background: #2563eb;

    &:hover:not(:disabled) {
      background: #1d4ed8;
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px #2563eb;
    }
  }
}

.edt__btn-inner {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.edt__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: edt-spin 0.7s linear infinite;
}

@keyframes edt-spin {
  to {
    transform: rotate(360deg);
  }
}

.edt__select-trigger {
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

.edt__select-chevron {
  display: flex;
  color: #6b7280;
  flex-shrink: 0;
  transition: transform 0.15s;
}

.edt__select-trigger[data-state='open'] .edt__select-chevron {
  transform: rotate(180deg);
}

/* Success */
.edt__success {
  margin-top: 1.25rem;
  padding: 1rem 1.25rem;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 0.5rem;
}

.edt__success-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.edt__success-msg {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  min-width: 0;
}

.edt__success-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #22c55e;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.edt__success-title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #166534;
  line-height: 1.4;
}

.edt__download {
  padding: 0.5rem 1rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #fff;
  background: #16a34a;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #15803d;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #16a34a;
  }
}

.edt__success-meta {
  margin: 0.75rem 0 0;
  font-size: 0.8125rem;
  color: #15803d;
}

.edt__error {
  margin-top: 1rem;
  padding: 0.875rem 1rem;
  font-size: 0.875rem;
  color: #991b1b;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
}

.edt__info {
  margin-top: 1.25rem;
  padding: 1rem 1.25rem;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.5rem;
}

.edt__info-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1e3a8a;
  margin: 0 0 0.75rem;
}

.edt__info-list {
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
.edt__select-content {
  z-index: 10050;
  min-width: var(--radix-select-trigger-width);
  max-height: min(50vh, 20rem);
  overflow: hidden;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12);
}

.edt__select-viewport {
  padding: 0.25rem;
}

.edt__select-group-label {
  padding: 0.5rem 0.625rem 0.25rem;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #9ca3af;
}

.edt__select-item {
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

.edt__select-sep {
  height: 1px;
  margin: 0.25rem 0;
  background: #f3f4f6;
}
</style>
