<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">File Integrity Verification</h2>
    <p class="text-gray-600 mb-6">Verify the integrity of files by comparing their hashes with known values</p>
    
    <div class="space-y-6">
      <!-- File Selection -->
      <div>
        <label for="fileInput" class="block text-sm font-medium text-gray-700 mb-2">Select File to Verify</label>
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

      <!-- Hash Algorithm Selection -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Hash Algorithm</label>
        <select
          v-model="selectedAlgorithm"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="sha1">SHA-1</option>
          <option value="sha256">SHA-256</option>
          <option value="sha384">SHA-384</option>
          <option value="sha512">SHA-512</option>
          <option value="md5">MD5</option>
        </select>
      </div>

      <!-- Expected Hash Input -->
      <div>
        <label for="expectedHash" class="block text-sm font-medium text-gray-700 mb-2">Expected Hash (Optional)</label>
        <input
          id="expectedHash"
          type="text"
          v-model="expectedHash"
          placeholder="Enter the expected hash value to compare..."
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p class="mt-1 text-xs text-gray-500">
          Leave empty to just calculate the hash, or provide an expected value for verification
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-4">
        <button
          @click="calculateHash"
          :disabled="!selectedFile || isCalculating"
          :class="[
            'flex-1 py-3 px-4 rounded-lg font-medium transition-colors duration-200',
            selectedFile && !isCalculating
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          <span v-if="isCalculating" class="inline-flex items-center">
            <div class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
            Calculating...
          </span>
          <span v-else>Calculate Hash</span>
        </button>
        
        <button
          @click="verifyHash"
          :disabled="!selectedFile || !expectedHash.trim() || isCalculating"
          :class="[
            'flex-1 py-3 px-4 rounded-lg font-medium transition-colors duration-200',
            selectedFile && expectedHash.trim() && !isCalculating
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          <span v-if="isCalculating" class="inline-flex items-center">
            <div class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
            Verifying...
          </span>
          <span v-else>Verify Integrity</span>
        </button>
      </div>

      <!-- Results -->
      <div v-if="calculatedHash" class="bg-gray-50 p-4 rounded-lg border">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-lg font-medium">Hash Result</h3>
          <button
            @click="copyToClipboard"
            class="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors duration-200"
          >
            {{ copied ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <div class="space-y-3">
          <p class="text-sm text-gray-600">
            <span class="font-medium">File:</span> {{ selectedFile?.name }}
          </p>
          <p class="text-sm text-gray-600">
            <span class="font-medium">Algorithm:</span> {{ selectedAlgorithm.toUpperCase() }}
          </p>
          <div class="bg-white p-3 rounded border">
            <p class="text-sm text-gray-600 mb-1">Calculated Hash:</p>
            <p class="text-sm font-mono break-all">{{ calculatedHash }}</p>
          </div>
          
          <!-- Verification Result -->
          <div v-if="verificationResult !== null" class="mt-4">
            <div v-if="verificationResult" class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <p class="text-green-800 font-medium">✓ Hash verification successful! File integrity confirmed.</p>
              </div>
            </div>
            
            <div v-else class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                <p class="text-red-800 font-medium">✗ Hash verification failed! File may be corrupted or modified.</p>
              </div>
              <div class="mt-3 bg-white p-3 rounded border">
                <p class="text-sm text-gray-600 mb-1">Expected Hash:</p>
                <p class="text-sm font-mono break-all text-red-600">{{ expectedHash }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Display -->
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-800">{{ error }}</p>
      </div>

      <!-- Information Section -->
      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 class="text-lg font-medium mb-2 text-blue-800">About File Verification</h3>
        <div class="text-sm text-blue-700 space-y-2">
          <p>
            <strong>Calculate Hash:</strong> Generate a cryptographic hash of your file to verify its integrity later.
          </p>
          <p>
            <strong>Verify Integrity:</strong> Compare your file's hash with a known good hash to detect any changes or corruption.
          </p>
          <p>
            <strong>Common Use Cases:</strong> Verifying downloaded ISO files, checking software integrity, detecting file tampering.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CryptoJS from 'crypto-js'

// Define component name
defineOptions({
  name: 'VerifyTool'
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
  // Reset results when a new file is selected
  calculatedHash.value = ''
  verificationResult.value = null
  error.value = ''
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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
  } catch (err: any) {
    error.value = err.message || 'An error occurred while calculating the hash'
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
    
    // Compare hashes (case-insensitive)
    const expected = expectedHash.value.trim().toLowerCase()
    const calculated = hash.toLowerCase()
    verificationResult.value = expected === calculated
  } catch (err: any) {
    error.value = err.message || 'An error occurred while verifying the hash'
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
  const wordArray = CryptoJS.lib.WordArray.create(uint8Array as any)

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

<style scoped>
/* Add any component-specific styles here */
</style> 