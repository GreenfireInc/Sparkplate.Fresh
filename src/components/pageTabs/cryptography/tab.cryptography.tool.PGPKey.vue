<template>
  <div class="pgp">
    <header class="pgp__header">
      <h2 class="pgp__title">PGP / GPG key tool</h2>
      <p class="pgp__lead">
        Validate keypairs, derive public keys, and encrypt or decrypt files with PGP/GPG
      </p>
    </header>

    <TabsRoot v-model="activeTab" class="pgp__root-tabs" orientation="horizontal">
      <TabsList class="pgp__tab-list pgp__tab-list--main" aria-label="PGP tool sections">
        <TabsTrigger value="validate" class="pgp__tab-trigger">
          Validate keypair
        </TabsTrigger>
        <TabsTrigger value="encrypt-decrypt" class="pgp__tab-trigger">
          Encrypt / decrypt
        </TabsTrigger>
      </TabsList>

      <!-- Validate -->
      <TabsContent value="validate" class="pgp__tab-content">
        <div class="pgp__card">
          <h3 class="pgp__card-title">Validate keypair</h3>

          <div class="pgp__grid">
            <div class="pgp__field">
              <Label for="pgp-private-key" class="pgp__label">Private key</Label>
              <textarea
                id="pgp-private-key"
                v-model="privateKey"
                class="pgp__textarea"
                rows="6"
                placeholder="Paste your private key (armored format)…"
                spellcheck="false"
                @input="generatePublicKey"
              />
            </div>
            <div class="pgp__field">
              <Label for="pgp-public-key" class="pgp__label">Public key</Label>
              <textarea
                id="pgp-public-key"
                v-model="publicKey"
                class="pgp__textarea"
                rows="6"
                placeholder="Paste your public key (armored format)…"
                spellcheck="false"
              />
            </div>
          </div>

          <div v-if="keyFingerprint" class="pgp__fingerprint">
            <Label class="pgp__label">Fingerprint</Label>
            <div class="pgp__fingerprint-row">
              <p class="pgp__fingerprint-value">{{ keyFingerprint.replace('Fingerprint: ', '') }}</p>
              <button type="button" class="pgp__btn pgp__btn--ghost" title="Copy fingerprint" @click="copyFingerprint">
                Copy
              </button>
            </div>
          </div>

          <div
            v-if="validationMessage"
            class="pgp__notice"
            :class="validationMessage === 'Keys are valid!' || validationMessage === 'Fingerprint copied to clipboard!' ? 'pgp__notice--ok' : 'pgp__notice--bad'"
          >
            <p>{{ validationMessage }}</p>
          </div>

          <div class="pgp__row-actions">
            <button
              type="button"
              class="pgp__btn pgp__btn--primary"
              :disabled="!publicKey.trim() || !privateKey.trim() || isValidating"
              @click="validateKeys"
            >
              {{ isValidating ? 'Validating…' : 'Validate keypair' }}
            </button>

            <button
              type="button"
              class="pgp__btn pgp__btn--details"
              :disabled="!publicKey.trim()"
              @click="detailsOpen = true"
            >
              Details
            </button>

            <DropdownMenuRoot v-if="publicKey && rawFingerprint">
              <DropdownMenuTrigger type="button" class="pgp__btn pgp__btn--secondary pgp__dropdown-trigger">
                Export
                <svg class="pgp__chevron" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent class="pgp__dropdown-content" align="start" :side-offset="4">
                  <DropdownMenuItem class="pgp__dropdown-item" @click="exportKeyData('txt')">
                    TXT
                  </DropdownMenuItem>
                  <DropdownMenuItem class="pgp__dropdown-item" @click="exportKeyData('csv')">
                    CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem class="pgp__dropdown-item" @click="exportKeyData('json')">
                    JSON
                  </DropdownMenuItem>
                  <DropdownMenuItem class="pgp__dropdown-item" @click="exportKeyData('vcf')">
                    vCard
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenuRoot>
          </div>
        </div>
      </TabsContent>

      <!-- Encrypt / decrypt -->
      <TabsContent value="encrypt-decrypt" class="pgp__tab-content">
        <TabsRoot v-model="encryptDecryptTab" class="pgp__nested-tabs" orientation="horizontal">
          <TabsList class="pgp__tab-list pgp__tab-list--sub" aria-label="Encrypt or decrypt file">
            <TabsTrigger value="encrypt" class="pgp__tab-trigger">
              Encrypt file
            </TabsTrigger>
            <TabsTrigger value="decrypt" class="pgp__tab-trigger">
              Decrypt file
            </TabsTrigger>
          </TabsList>

          <TabsContent value="encrypt" class="pgp__sub-content">
            <div class="pgp__card">
              <h3 class="pgp__card-title">Encrypt file</h3>
              <div class="pgp__grid">
                <div class="pgp__field">
                  <Label for="pgp-encrypt-file" class="pgp__label">Select file</Label>
                  <div class="pgp__file-wrap">
                    <input
                      id="pgp-encrypt-file"
                      type="file"
                      class="pgp__file"
                      @change="handleEncryptFileSelect"
                    />
                  </div>
                  <p v-if="fileToEncrypt" class="pgp__file-meta">
                    Selected: <strong>{{ fileToEncrypt.name }}</strong> ({{ formatFileSize(fileToEncrypt.size) }})
                  </p>
                </div>
                <div class="pgp__field">
                  <Label for="pgp-encrypt-pk" class="pgp__label">Public key</Label>
                  <textarea
                    id="pgp-encrypt-pk"
                    v-model="publicKey"
                    class="pgp__textarea pgp__textarea--short"
                    rows="4"
                    placeholder="Paste public key for encryption…"
                    spellcheck="false"
                  />
                </div>
              </div>
              <button
                type="button"
                class="pgp__btn pgp__btn--primary pgp__btn--block"
                :disabled="!fileToEncrypt || !publicKey.trim() || isEncrypting"
                @click="encryptFile"
              >
                {{ isEncrypting ? 'Encrypting…' : 'Encrypt file' }}
              </button>
              <div
                v-if="encryptionStatus"
                class="pgp__notice"
                :class="encryptionStatus.includes('successfully') ? 'pgp__notice--ok' : 'pgp__notice--bad'"
              >
                <p>{{ encryptionStatus }}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="decrypt" class="pgp__sub-content">
            <div class="pgp__card">
              <h3 class="pgp__card-title">Decrypt file</h3>
              <div class="pgp__grid">
                <div class="pgp__field">
                  <Label for="pgp-decrypt-file" class="pgp__label">Select encrypted file</Label>
                  <div class="pgp__file-wrap">
                    <input
                      id="pgp-decrypt-file"
                      type="file"
                      class="pgp__file"
                      accept=".gpg,.pgp"
                      @change="handleDecryptFileSelect"
                    />
                  </div>
                  <p v-if="fileToDecrypt" class="pgp__file-meta">
                    Selected: <strong>{{ fileToDecrypt.name }}</strong> ({{ formatFileSize(fileToDecrypt.size) }})
                  </p>
                </div>
                <div class="pgp__field">
                  <Label for="pgp-decrypt-sk" class="pgp__label">Private key</Label>
                  <textarea
                    id="pgp-decrypt-sk"
                    v-model="privateKey"
                    class="pgp__textarea pgp__textarea--short"
                    rows="4"
                    placeholder="Paste private key for decryption…"
                    spellcheck="false"
                  />
                </div>
              </div>
              <button
                type="button"
                class="pgp__btn pgp__btn--primary pgp__btn--block"
                :disabled="!fileToDecrypt || !privateKey.trim() || isDecrypting"
                @click="decryptFile"
              >
                {{ isDecrypting ? 'Decrypting…' : 'Decrypt file' }}
              </button>
              <div
                v-if="decryptionStatus"
                class="pgp__notice"
                :class="decryptionStatus.includes('successfully') ? 'pgp__notice--ok' : 'pgp__notice--bad'"
              >
                <p>{{ decryptionStatus }}</p>
              </div>
            </div>
          </TabsContent>
        </TabsRoot>
      </TabsContent>
    </TabsRoot>

    <DetailsPgpModal v-model:open="detailsOpen" :armored-public-key="publicKey" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as openpgp from 'openpgp'
import DetailsPgpModal from '@/components/modals/cryptography/details.pgp.vue'
import {
  Label,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'radix-vue'

defineOptions({
  name: 'PGPKeyTool',
})

const activeTab = ref<'validate' | 'encrypt-decrypt'>('validate')
const encryptDecryptTab = ref<'encrypt' | 'decrypt'>('encrypt')

const publicKey = ref('')
const privateKey = ref('')
const validationMessage = ref('')
const keyFingerprint = ref('')
const rawFingerprint = ref('')
const detailsOpen = ref(false)

const fileToEncrypt = ref<File | null>(null)
const fileToDecrypt = ref<File | null>(null)
const encryptionStatus = ref('')
const decryptionStatus = ref('')
const isValidating = ref(false)
const isEncrypting = ref(false)
const isDecrypting = ref(false)

const cleanArmoredKey = (key: string): string => {
  let cleaned = key.trim().replace(/^"|"$/g, '')
  cleaned = cleaned.replace(/\\n/g, '\n')
  return cleaned
}

const formatFingerprint = (fingerprint: string): string => {
  return fingerprint.toUpperCase().replace(/(.{2})(?!$)/g, '$1 ')
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Math.round((bytes / k ** i) * 100) / 100} ${sizes[i]}`
}

const downloadFile = (content: string, filename: string, contentType: string): void => {
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

const copyFingerprint = async (): Promise<void> => {
  if (rawFingerprint.value) {
    try {
      await navigator.clipboard.writeText(rawFingerprint.value)
      validationMessage.value = 'Fingerprint copied to clipboard!'
      setTimeout(() => {
        if (validationMessage.value === 'Fingerprint copied to clipboard!') {
          validationMessage.value = ''
        }
      }, 2000)
    } catch {
      validationMessage.value = 'Failed to copy fingerprint'
    }
  }
}

const exportKeyData = (format: 'txt' | 'csv' | 'json' | 'vcf'): void => {
  if (!publicKey.value || !rawFingerprint.value) {
    validationMessage.value = 'No key to export.'
    return
  }

  const filename = `pgp-key-${rawFingerprint.value.substring(0, 8)}`
  let content = ''

  switch (format) {
    case 'txt':
      content = `Public Key:\n${publicKey.value}\n\nFingerprint: ${keyFingerprint.value.replace('Fingerprint: ', '')}`
      downloadFile(content, `${filename}.txt`, 'text/plain')
      break
    case 'csv':
      content = `"publicKey","fingerprint"\n"${publicKey.value}","${rawFingerprint.value}"`
      downloadFile(content, `${filename}.csv`, 'text/csv')
      break
    case 'json':
      content = JSON.stringify(
        {
          publicKey: publicKey.value,
          fingerprint: rawFingerprint.value,
        },
        null,
        2
      )
      downloadFile(content, `${filename}.json`, 'application/json')
      break
    case 'vcf':
      content = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'FN:PGP Key Export',
        `NOTE:Fingerprint: ${keyFingerprint.value.replace('Fingerprint: ', '')}`,
        `KEY;TYPE=PGP:${publicKey.value}`,
        'END:VCARD',
      ].join('\n')
      downloadFile(content, `${filename}.vcf`, 'text/vcard')
      break
  }
}

const generatePublicKey = async (): Promise<void> => {
  if (!privateKey.value) {
    publicKey.value = ''
    keyFingerprint.value = ''
    rawFingerprint.value = ''
    return
  }

  try {
    const armoredKey = cleanArmoredKey(privateKey.value)
    const privateKeyObj = await openpgp.readPrivateKey({ armoredKey })
    if (privateKeyObj.isPrivate()) {
      const publicKeyObj = privateKeyObj.toPublic()
      publicKey.value = publicKeyObj.armor()
      const fingerprint = await publicKeyObj.getFingerprint()
      rawFingerprint.value = fingerprint
      keyFingerprint.value = `Fingerprint: ${formatFingerprint(fingerprint)}`
    } else {
      publicKey.value = ''
      keyFingerprint.value = ''
      rawFingerprint.value = ''
    }
  } catch {
    publicKey.value = ''
    keyFingerprint.value = ''
    rawFingerprint.value = ''
  }
}

const validateKeys = async (): Promise<void> => {
  validationMessage.value = ''
  keyFingerprint.value = ''
  rawFingerprint.value = ''
  isValidating.value = true

  try {
    const cleanPublicKey = cleanArmoredKey(publicKey.value)
    const cleanPrivateKey = cleanArmoredKey(privateKey.value)
    const publicKeyObj = await openpgp.readKey({ armoredKey: cleanPublicKey })
    const privateKeyObj = await openpgp.readPrivateKey({ armoredKey: cleanPrivateKey })

    if (publicKeyObj && privateKeyObj) {
      validationMessage.value = 'Keys are valid!'
      const fingerprint = await publicKeyObj.getFingerprint()
      rawFingerprint.value = fingerprint
      keyFingerprint.value = `Fingerprint: ${formatFingerprint(fingerprint)}`
    } else {
      validationMessage.value = 'Invalid keys.'
    }
  } catch (error) {
    validationMessage.value = `Error: ${(error as Error).message}`
  } finally {
    isValidating.value = false
  }
}

const handleEncryptFileSelect = (event: Event): void => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    fileToEncrypt.value = target.files[0]
    encryptionStatus.value = ''
  }
}

const handleDecryptFileSelect = (event: Event): void => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    fileToDecrypt.value = target.files[0]
    decryptionStatus.value = ''
  }
}

const encryptFile = async (): Promise<void> => {
  if (!fileToEncrypt.value || !publicKey.value) {
    encryptionStatus.value = 'Please select a file and provide a public key.'
    return
  }

  isEncrypting.value = true
  encryptionStatus.value = ''

  try {
    const cleanPublicKey = cleanArmoredKey(publicKey.value)
    const publicKeyObj = await openpgp.readKey({ armoredKey: cleanPublicKey })
    const fileData = await fileToEncrypt.value.arrayBuffer()
    const message = await openpgp.createMessage({ binary: new Uint8Array(fileData) })

    const encrypted = await openpgp.encrypt({
      message,
      encryptionKeys: publicKeyObj,
    })

    downloadFile(encrypted as string, `${fileToEncrypt.value.name}.gpg`, 'application/octet-stream')
    encryptionStatus.value = 'File encrypted successfully!'
  } catch (error) {
    encryptionStatus.value = `Error: ${(error as Error).message}`
  } finally {
    isEncrypting.value = false
  }
}

const decryptFile = async (): Promise<void> => {
  if (!fileToDecrypt.value || !privateKey.value) {
    decryptionStatus.value = 'Please select a file and provide a private key.'
    return
  }

  isDecrypting.value = true
  decryptionStatus.value = ''

  try {
    const cleanPrivateKey = cleanArmoredKey(privateKey.value)
    const privateKeyObj = await openpgp.readPrivateKey({ armoredKey: cleanPrivateKey })
    const encryptedData = await fileToDecrypt.value.arrayBuffer()
    const message = await openpgp.readMessage({ armoredMessage: new TextDecoder().decode(encryptedData) })

    const { data: decrypted } = await openpgp.decrypt({
      message,
      decryptionKeys: privateKeyObj,
    })

    downloadFile(
      decrypted as string,
      fileToDecrypt.value.name.replace('.gpg', '').replace('.pgp', ''),
      'application/octet-stream'
    )
    decryptionStatus.value = 'File decrypted successfully!'
  } catch (error) {
    decryptionStatus.value = `Error: ${(error as Error).message}`
  } finally {
    isDecrypting.value = false
  }
}
</script>

<style lang="scss" scoped>
.pgp {
  width: 100%;
  max-width: 56rem;
}

.pgp__header {
  margin-bottom: 1.25rem;
}

.pgp__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.375rem;
}

.pgp__lead {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.pgp__root-tabs {
  width: 100%;
}

.pgp__tab-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
  width: 100%;
  gap: 0;
  padding: 0.25rem;
  background: #e5e7eb;
  border-radius: 0.5rem;

  &--main {
    margin-bottom: 1rem;
    max-width: 28rem;
  }

  &--sub {
    margin-bottom: 1rem;
    max-width: 28rem;
  }
}

.pgp__tab-trigger {
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

.pgp__tab-content {
  outline: none;
}

.pgp__nested-tabs {
  width: 100%;
}

.pgp__sub-content {
  outline: none;
}

.pgp__card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.25rem;
}

.pgp__card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1rem;
}

.pgp__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

.pgp__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
}

.pgp__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.pgp__textarea {
  width: 100%;
  padding: 0.75rem 0.875rem;
  font-size: 0.8125rem;
  line-height: 1.45;
  color: #111827;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  resize: vertical;
  min-height: 8rem;
  outline: none;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  &--short {
    min-height: 5rem;
  }
}

.pgp__fingerprint {
  margin-bottom: 1rem;
  padding: 0.875rem 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

.pgp__fingerprint-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.pgp__fingerprint-value {
  margin: 0;
  font-size: 0.8125rem;
  font-family: ui-monospace, monospace;
  word-break: break-all;
  color: #111827;
  flex: 1;
  min-width: 0;
}

.pgp__notice {
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  border: 1px solid;

  p {
    margin: 0;
  }

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

.pgp__row-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.pgp__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;

  &:disabled {
    background: #d1d5db !important;
    color: #6b7280;
    cursor: not-allowed;
  }

  &--primary {
    color: #fff;
    background: #2563eb;

    &:hover:not(:disabled) {
      background: #1d4ed8;
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px #2563eb;
    }
  }

  &--secondary {
    color: #fff;
    background: #4b5563;

    &:hover:not(:disabled) {
      background: #374151;
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px #4b5563;
    }
  }

  &--details {
    color: #374151;
    background: #fff;
    border: 1px solid #d1d5db;

    &:hover:not(:disabled) {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px #3b82f6;
    }
  }

  &--ghost {
    flex-shrink: 0;
    font-weight: 500;
    color: #1d4ed8;
    background: #eff6ff;
    border: 1px solid #bfdbfe;

    &:hover:not(:disabled) {
      background: #dbeafe;
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px #3b82f6;
    }
  }

  &--block {
    width: 100%;
    min-height: 2.75rem;
    margin-top: 0.25rem;
  }
}

.pgp__dropdown-trigger {
  min-height: 2.5rem;
}

.pgp__chevron {
  flex-shrink: 0;
}

.pgp__file-wrap {
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

.pgp__file {
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

.pgp__file-meta {
  font-size: 0.8125rem;
  color: #6b7280;
  margin: 0;
}
</style>

<style lang="scss">
/* Portal: export menu */
.pgp__dropdown-content {
  z-index: 10050;
  min-width: 7rem;
  padding: 0.25rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12);
}

.pgp__dropdown-item {
  cursor: pointer;
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #374151;
  outline: none;
  user-select: none;

  &[data-highlighted] {
    background: #f3f4f6;
    color: #111827;
  }
}
</style>
