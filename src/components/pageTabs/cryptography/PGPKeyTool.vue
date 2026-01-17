<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">PGP/GPG Key Tool</h2>
    <p class="text-gray-600 mb-6">Validate keypairs, generate public keys, and encrypt/decrypt files with PGP/GPG</p>
    
    <!-- Tab Navigation -->
    <TabsWrapper class="tabs-container">
      <TabComponent
        :active="activeTab === 'validate'"
        :onClick="() => (activeTab = 'validate')"
      >
        Validate Keypair
      </TabComponent>
      <TabComponent
        :active="activeTab === 'encrypt-decrypt'"
        :onClick="() => (activeTab = 'encrypt-decrypt')"
      >
        Encrypt/Decrypt
      </TabComponent>
    </TabsWrapper>

    <!-- Tab Content -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <!-- Validate Keypair Tab -->
      <div v-if="activeTab === 'validate'">
        <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Validate Keypair</h3>
          
          <div class="space-y-4">
            <!-- Public Key and Private Key Inputs - Side by Side -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <!-- Private Key Input -->
              <div>
                <label for="privateKey" class="block text-sm font-medium text-gray-700 mb-2">Private Key</label>
                <textarea
                  id="privateKey"
                  v-model="privateKey"
                  @input="generatePublicKey"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  rows="6"
                  placeholder="Paste your private key (armored format)..."
                ></textarea>
              </div>
              
              <!-- Public Key Input -->
              <div>
                <label for="publicKey" class="block text-sm font-medium text-gray-700 mb-2">Public Key</label>
                <textarea
                  id="publicKey"
                  v-model="publicKey"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  rows="6"
                  placeholder="Paste your public key (armored format)..."
                ></textarea>
              </div>

              
            </div>

            <!-- Fingerprint Display -->
            <div v-if="keyFingerprint" class="bg-white p-3 rounded border border-gray-300">
              <label class="block text-sm font-medium text-gray-700 mb-1">Fingerprint</label>
              <div class="flex items-center justify-between">
                <p class="font-mono text-sm text-gray-900 break-all">{{ keyFingerprint.replace('Fingerprint: ', '') }}</p>
                <button
                  @click="copyFingerprint"
                  class="ml-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                  title="Copy fingerprint"
                >
                  Copy
                </button>
              </div>
            </div>

            <!-- Validation Message -->
            <div v-if="validationMessage" class="p-3 rounded"
                 :class="validationMessage === 'Keys are valid!' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'">
              <p class="text-sm font-medium">{{ validationMessage }}</p>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3">
              <button
                @click="validateKeys"
                :disabled="!publicKey.trim() || !privateKey.trim() || isValidating"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
                  (publicKey.trim() && privateKey.trim() && !isValidating)
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                ]"
              >
                {{ isValidating ? 'Validating...' : 'Validate Keypair' }}
              </button>

              <!-- Export Dropdown -->
              <div v-if="publicKey && rawFingerprint" class="relative">
                <button
                  @click="showExportOptions = !showExportOptions"
                  class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  Export
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <Transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <div
                    v-if="showExportOptions"
                    class="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden"
                  >
                    <button
                      @click="exportKeyData('txt')"
                      class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
                    >
                      TXT
                    </button>
                    <button
                      @click="exportKeyData('csv')"
                      class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
                    >
                      CSV
                    </button>
                    <button
                      @click="exportKeyData('json')"
                      class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
                    >
                      JSON
                    </button>
                    <button
                      @click="exportKeyData('vcf')"
                      class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
                    >
                      vCard
                    </button>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Encrypt/Decrypt Tab -->
      <div v-if="activeTab === 'encrypt-decrypt'">
        <!-- Sub-tabs for Encrypt/Decrypt -->
        <TabsWrapper class="sub-tabs-container mb-6">
          <TabComponent
            :active="encryptDecryptTab === 'encrypt'"
            :onClick="() => (encryptDecryptTab = 'encrypt')"
          >
            Encrypt File
          </TabComponent>
          <TabComponent
            :active="encryptDecryptTab === 'decrypt'"
            :onClick="() => (encryptDecryptTab = 'decrypt')"
          >
            Decrypt File
          </TabComponent>
        </TabsWrapper>

        <!-- Encrypt File Sub-tab -->
        <div v-if="encryptDecryptTab === 'encrypt'" class="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Encrypt File</h3>
          
          <div class="space-y-4">
            <!-- File Input and Public Key - Side by Side -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="encryptFile" class="block text-sm font-medium text-gray-700 mb-2">Select File</label>
                <input
                  id="encryptFile"
                  type="file"
                  @change="handleEncryptFileSelect"
                  class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p v-if="fileToEncrypt" class="mt-2 text-sm text-gray-600">
                  Selected: {{ fileToEncrypt.name }} ({{ formatFileSize(fileToEncrypt.size) }})
                </p>
              </div>

              <div>
                <label for="encryptPublicKey" class="block text-sm font-medium text-gray-700 mb-2">Public Key</label>
                <textarea
                  id="encryptPublicKey"
                  v-model="publicKey"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  rows="4"
                  placeholder="Paste public key for encryption..."
                ></textarea>
              </div>
            </div>

            <button
              @click="encryptFile"
              :disabled="!fileToEncrypt || !publicKey.trim() || isEncrypting"
              :class="[
                'w-full px-4 py-2 rounded-lg font-medium transition-colors duration-200',
                (fileToEncrypt && publicKey.trim() && !isEncrypting)
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              {{ isEncrypting ? 'Encrypting...' : 'Encrypt File' }}
            </button>

            <div v-if="encryptionStatus" class="p-3 rounded text-sm"
                 :class="encryptionStatus.includes('successfully') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'">
              <p>{{ encryptionStatus }}</p>
            </div>
          </div>
        </div>

        <!-- Decrypt File Sub-tab -->
        <div v-if="encryptDecryptTab === 'decrypt'" class="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Decrypt File</h3>
          
          <div class="space-y-4">
            <!-- File Input and Private Key - Side by Side -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="decryptFile" class="block text-sm font-medium text-gray-700 mb-2">Select Encrypted File</label>
                <input
                  id="decryptFile"
                  type="file"
                  accept=".gpg,.pgp"
                  @change="handleDecryptFileSelect"
                  class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p v-if="fileToDecrypt" class="mt-2 text-sm text-gray-600">
                  Selected: {{ fileToDecrypt.name }} ({{ formatFileSize(fileToDecrypt.size) }})
                </p>
              </div>

              <div>
                <label for="decryptPrivateKey" class="block text-sm font-medium text-gray-700 mb-2">Private Key</label>
                <textarea
                  id="decryptPrivateKey"
                  v-model="privateKey"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  rows="4"
                  placeholder="Paste private key for decryption..."
                ></textarea>
              </div>
            </div>

            <button
              @click="decryptFile"
              :disabled="!fileToDecrypt || !privateKey.trim() || isDecrypting"
              :class="[
                'w-full px-4 py-2 rounded-lg font-medium transition-colors duration-200',
                (fileToDecrypt && privateKey.trim() && !isDecrypting)
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              {{ isDecrypting ? 'Decrypting...' : 'Decrypt File' }}
            </button>

            <div v-if="decryptionStatus" class="p-3 rounded text-sm"
                 :class="decryptionStatus.includes('successfully') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'">
              <p>{{ decryptionStatus }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import * as openpgp from 'openpgp'
import TabComponent from '@/components/global/TabComponent.vue'
import TabsWrapper from '@/components/global/TabsWrapper.vue'

defineOptions({
  name: 'PGPKeyTool'
})

// Tab state
const activeTab = ref('validate')
const encryptDecryptTab = ref('encrypt')

// State
const publicKey = ref('')
const privateKey = ref('')
const validationMessage = ref('')
const keyFingerprint = ref('')
const rawFingerprint = ref('')
const showExportOptions = ref(false)
const fileToEncrypt = ref<File | null>(null)
const fileToDecrypt = ref<File | null>(null)
const encryptionStatus = ref('')
const decryptionStatus = ref('')
const isValidating = ref(false)
const isEncrypting = ref(false)
const isDecrypting = ref(false)

// Utility functions
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
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
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

// Copy fingerprint to clipboard
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
    } catch (error) {
      validationMessage.value = 'Failed to copy fingerprint'
    }
  }
}

// Export key data
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
      content = JSON.stringify({
        publicKey: publicKey.value,
        fingerprint: rawFingerprint.value
      }, null, 2)
      downloadFile(content, `${filename}.json`, 'application/json')
      break
    case 'vcf':
      content = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'FN:PGP Key Export',
        `NOTE:Fingerprint: ${keyFingerprint.value.replace('Fingerprint: ', '')}`,
        `KEY;TYPE=PGP:${publicKey.value}`,
        'END:VCARD'
      ].join('\n')
      downloadFile(content, `${filename}.vcf`, 'text/vcard')
      break
  }
  showExportOptions.value = false
}

// Generate public key from private key
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
  } catch (error) {
    publicKey.value = ''
    keyFingerprint.value = ''
    rawFingerprint.value = ''
  }
}

// Validate keys
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

// File handling
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

// Encrypt file
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

// Decrypt file
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

    downloadFile(decrypted as string, fileToDecrypt.value.name.replace('.gpg', '').replace('.pgp', ''), 'application/octet-stream')
    decryptionStatus.value = 'File decrypted successfully!'
  } catch (error) {
    decryptionStatus.value = `Error: ${(error as Error).message}`
  } finally {
    isDecrypting.value = false
  }
}

// Close export dropdown when clicking outside
watch(showExportOptions, (isOpen) => {
  if (isOpen) {
    const closeOnClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.relative')) {
        showExportOptions.value = false
        document.removeEventListener('click', closeOnClickOutside)
      }
    }
    setTimeout(() => {
      document.addEventListener('click', closeOnClickOutside)
    }, 0)
  }
})
</script>

<style scoped>
.tabs-container {
  margin-bottom: 1.5rem;
  
  :deep(.tabs-wrapper) {
    gap: 0.5rem;
  }
}

.sub-tabs-container {
  margin-bottom: 1.5rem;
  
  :deep(.tabs-wrapper) {
    gap: 0.5rem;
  }
}
</style>
