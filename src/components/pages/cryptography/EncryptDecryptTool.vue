<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">File Encryption & Decryption</h2>
    <p class="text-gray-600 mb-6">Encrypt files with password protection or decrypt encrypted files</p>
    
    <div class="space-y-6">
      <!-- Top Row: Operation Mode Selection and Encryption Algorithm Selection -->
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <!-- Operation Mode Selection -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">Operation</label>
          <div class="flex space-x-4">
            <label class="flex items-center">
              <input 
                type="radio" 
                v-model="operation" 
                value="encrypt" 
                class="mr-2"
              />
              Encrypt File
            </label>
            <label class="flex items-center">
              <input 
                type="radio" 
                v-model="operation" 
                value="decrypt" 
                class="mr-2"
              />
              Decrypt File
            </label>
          </div>
        </div>

        <!-- Encryption Algorithm Selection - Upper Right -->
        <div class="md:w-64">
          <label class="block text-sm font-medium text-gray-700 mb-2">Encryption Algorithm</label>
          <select
            v-model="selectedAlgorithm"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="aes256">AES-256-CBC</option>
            <option value="aes192">AES-192-CBC</option>
            <option value="aes128">AES-128-CBC</option>
            <option value="des">DES</option>
            <option value="3des">3DES</option>
          </select>
        </div>
      </div>

      <!-- File Selection -->
      <div>
        <label for="fileInput" class="block text-sm font-medium text-gray-700 mb-2">
          {{ operation === 'encrypt' ? 'Select File to Encrypt' : 'Select Encrypted File' }}
        </label>
        <input
          id="fileInput"
          type="file"
          @change="handleFileSelect"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p v-if="selectedFile" class="mt-2 text-sm text-gray-600">
          Selected: {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})
        </p>
      </div>

      <!-- Password Input and Confirm Password - Side by Side -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div class="relative">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Enter a strong password..."
              class="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
            >
              <svg v-if="!showPassword" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
              </svg>
              <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"/>
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
              </svg>
            </button>
          </div>
          <div class="mt-2">
            <div class="text-xs text-gray-500">Password strength:</div>
            <div class="flex mt-1">
              <div 
                v-for="i in 4" 
                :key="i"
                :class="[
                  'flex-1 h-1 mr-1 last:mr-0 rounded',
                  getPasswordStrength() >= i ? getPasswordStrengthColor() : 'bg-gray-200'
                ]"
              ></div>
            </div>
            <div class="text-xs mt-1" :class="getPasswordStrengthTextColor()">
              {{ getPasswordStrengthText() }}
            </div>
          </div>
        </div>

        <!-- Confirm Password (for encryption) -->
        <div v-if="operation === 'encrypt'">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm your password..."
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p v-if="password && confirmPassword && password !== confirmPassword" class="mt-1 text-xs text-red-600">
            Passwords do not match
          </p>
        </div>
      </div>

      <!-- Action Button -->
      <div>
        <button
          @click="processFile"
          :disabled="!canProcess || isProcessing"
          :class="[
            'w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200',
            canProcess && !isProcessing
              ? operation === 'encrypt' 
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          <span v-if="isProcessing" class="inline-flex items-center">
            <div class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
            {{ operation === 'encrypt' ? 'Encrypting...' : 'Decrypting...' }}
          </span>
          <span v-else>
            {{ operation === 'encrypt' ? 'Encrypt File' : 'Decrypt File' }}
          </span>
        </button>
      </div>

      <!-- Success Message -->
      <div v-if="processedFile" class="bg-green-50 border border-green-200 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <p class="text-green-800 font-medium">
              {{ operation === 'encrypt' ? 'File encrypted successfully!' : 'File decrypted successfully!' }}
            </p>
          </div>
          <button
            @click="downloadFile"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
          >
            Download
          </button>
        </div>
        <p class="text-sm text-green-700 mt-2">
          {{ operation === 'encrypt' ? 'Encrypted' : 'Decrypted' }} file: {{ processedFileName }}
        </p>
      </div>

      <!-- Error Display -->
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-800">{{ error }}</p>
      </div>

      <!-- Information Section -->
      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 class="text-lg font-medium mb-2 text-blue-800">Security Information</h3>
        <div class="text-sm text-blue-700 space-y-2">
          <p>
            <strong>Encryption:</strong> Files are encrypted using industry-standard algorithms with your password as the key.
          </p>
          <p>
            <strong>Password Security:</strong> Use a strong password with uppercase, lowercase, numbers, and special characters.
          </p>
          <p>
            <strong>Important:</strong> Keep your password safe - encrypted files cannot be recovered without it!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CryptoJS from 'crypto-js'

// Define component name
defineOptions({
  name: 'EncryptDecryptTool'
})

const operation = ref('encrypt')
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
  // Reset results when a new file is selected
  processedFile.value = null
  processedFileName.value = ''
  error.value = ''
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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

function getPasswordStrengthColor(): string {
  const strength = getPasswordStrength()
  if (strength <= 1) return 'bg-red-500'
  if (strength === 2) return 'bg-yellow-500'
  if (strength === 3) return 'bg-blue-500'
  return 'bg-green-500'
}

function getPasswordStrengthTextColor(): string {
  const strength = getPasswordStrength()
  if (strength <= 1) return 'text-red-600'
  if (strength === 2) return 'text-yellow-600'
  if (strength === 3) return 'text-blue-600'
  return 'text-green-600'
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
      processedFileName.value = selectedFile.value.name + '.encrypted'
    } else {
      const decrypted = await decryptFile(fileData, password.value, selectedAlgorithm.value)
      processedFile.value = decrypted
      // Remove .encrypted extension if present
      const originalName = selectedFile.value.name.replace(/\.encrypted$/, '')
      processedFileName.value = originalName
    }
  } catch (err: any) {
    error.value = err.message || `An error occurred while ${operation.value}ing the file`
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

async function encryptFile(data: ArrayBuffer, password: string, algorithm: string): Promise<Blob> {
  const uint8Array = new Uint8Array(data)
  const wordArray = CryptoJS.lib.WordArray.create(uint8Array as any)
  
  let encrypted: CryptoJS.lib.CipherParams
  
  switch (algorithm) {
    case 'aes256':
      encrypted = CryptoJS.AES.encrypt(wordArray, password)
      break
    case 'aes192':
      encrypted = CryptoJS.AES.encrypt(wordArray, password)
      break
    case 'aes128':
      encrypted = CryptoJS.AES.encrypt(wordArray, password)
      break
    case 'des':
      encrypted = CryptoJS.DES.encrypt(wordArray, password)
      break
    case '3des':
      encrypted = CryptoJS.TripleDES.encrypt(wordArray, password)
      break
    default:
      throw new Error(`Unsupported encryption algorithm: ${algorithm}`)
  }
  
  const encryptedString = encrypted.toString()
  const encryptedBytes = new TextEncoder().encode(encryptedString)
  return new Blob([encryptedBytes], { type: 'application/octet-stream' })
}

async function decryptFile(data: ArrayBuffer, password: string, algorithm: string): Promise<Blob> {
  const uint8Array = new Uint8Array(data)
  const encryptedString = new TextDecoder().decode(uint8Array)
  
  let decrypted: CryptoJS.lib.WordArray
  
  try {
    switch (algorithm) {
      case 'aes256':
      case 'aes192':
      case 'aes128':
        decrypted = CryptoJS.AES.decrypt(encryptedString, password)
        break
      case 'des':
        decrypted = CryptoJS.DES.decrypt(encryptedString, password)
        break
      case '3des':
        decrypted = CryptoJS.TripleDES.decrypt(encryptedString, password)
        break
      default:
        throw new Error(`Unsupported decryption algorithm: ${algorithm}`)
    }
    
    if (decrypted.sigBytes <= 0) {
      throw new Error('Invalid password or corrupted file')
    }
    
    // Convert decrypted WordArray back to Uint8Array
    const decryptedBytes = new Uint8Array(decrypted.sigBytes)
    const words = decrypted.words
    for (let i = 0; i < decrypted.sigBytes; i++) {
      const byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff
      decryptedBytes[i] = byte
    }
    
    return new Blob([decryptedBytes], { type: 'application/octet-stream' })
  } catch (err) {
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

<style scoped>
/* Add any component-specific styles here */
</style> 