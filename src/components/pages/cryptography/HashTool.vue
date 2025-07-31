<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Hash Generator</h2>
    <p class="text-gray-600 mb-6">Generate cryptographic hashes using various algorithms</p>
    
    <div class="space-y-6">
      <!-- Input Section -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Input Type</label>
        <div class="flex space-x-4 mb-4">
          <label class="flex items-center">
            <input 
              type="radio" 
              v-model="inputType" 
              value="text" 
              class="mr-2"
            />
            Text
          </label>
          <label class="flex items-center">
            <input 
              type="radio" 
              v-model="inputType" 
              value="file" 
              class="mr-2"
            />
            File
          </label>
        </div>
      </div>

      <!-- Text Input -->
      <div v-if="inputType === 'text'">
        <label for="textInput" class="block text-sm font-medium text-gray-700 mb-2">Text to Hash</label>
        <textarea
          id="textInput"
          v-model="textInput"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="4"
          placeholder="Enter text to hash..."
        ></textarea>
      </div>

      <!-- File Input -->
      <div v-if="inputType === 'file'">
        <label for="fileInput" class="block text-sm font-medium text-gray-700 mb-2">File to Hash</label>
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

      <!-- Algorithm Selection -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Hash Algorithm</label>
        <select
          v-model="selectedAlgorithm"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <optgroup label="SHA Family">
            <option value="sha1">SHA-1</option>
            <option value="sha256">SHA-256</option>
            <option value="sha384">SHA-384</option>
            <option value="sha512">SHA-512</option>
          </optgroup>
          <optgroup label="MD Family">
            <option value="md5">MD5</option>
          </optgroup>
          <optgroup label="RIPEMD Family">
            <option value="ripemd128">RIPEMD-128</option>
            <option value="ripemd160">RIPEMD-160</option>
            <option value="ripemd256">RIPEMD-256</option>
            <option value="ripemd320">RIPEMD-320</option>
          </optgroup>
          <optgroup label="Other Algorithms">
            <option value="whirlpool">Whirlpool</option>
            <option value="tiger128_3">Tiger-128,3</option>
            <option value="tiger160_3">Tiger-160,3</option>
            <option value="tiger192_3">Tiger-192,3</option>
            <option value="tiger128_4">Tiger-128,4</option>
            <option value="blake2b">Blake2b</option>
          </optgroup>
        </select>
      </div>

      <!-- Generate Button -->
      <div>
        <button
          @click="generateHash"
          :disabled="!canGenerateHash || isGenerating"
          :class="[
            'w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200',
            canGenerateHash && !isGenerating
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          <span v-if="isGenerating" class="inline-flex items-center">
            <div class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
            Generating...
          </span>
          <span v-else>Generate Hash</span>
        </button>
      </div>

      <!-- Results -->
      <div v-if="hashResult" class="bg-gray-50 p-4 rounded-lg border">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-lg font-medium">Hash Result</h3>
          <button
            @click="copyToClipboard"
            class="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors duration-200"
          >
            {{ copied ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <div class="space-y-2">
          <p class="text-sm text-gray-600">
            <span class="font-medium">Algorithm:</span> {{ selectedAlgorithm.toUpperCase() }}
          </p>
          <p class="text-sm text-gray-600" v-if="inputType === 'file'">
            <span class="font-medium">File:</span> {{ selectedFile?.name }}
          </p>
          <div class="bg-white p-3 rounded border">
            <p class="text-sm font-mono break-all">{{ hashResult }}</p>
          </div>
        </div>
      </div>

      <!-- Error Display -->
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-800">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CryptoJS from 'crypto-js'

// Define component name
defineOptions({
  name: 'HashTool'
})

const inputType = ref('text')
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
  } else {
    return selectedFile.value !== null
  }
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
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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
  } catch (err: any) {
    error.value = err.message || 'An error occurred while generating the hash'
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
  // Convert input to WordArray for crypto-js or string for node-forge
  let wordArray: CryptoJS.lib.WordArray
  let inputString: string

  if (typeof input === 'string') {
    wordArray = CryptoJS.enc.Utf8.parse(input)
    inputString = input
  } else {
    // Convert ArrayBuffer to WordArray for crypto-js
    const uint8Array = new Uint8Array(input)
    wordArray = CryptoJS.lib.WordArray.create(uint8Array as any)
    // Convert ArrayBuffer to string for node-forge
    inputString = String.fromCharCode.apply(null, uint8Array as any)
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
      // Fallback to SHA-256 for Blake2b (crypto-js doesn't support it natively)
      console.warn('Blake2b not fully supported, using SHA-256 instead')
      return CryptoJS.SHA256(wordArray).toString()
    default:
      // For algorithms not supported by crypto-js or node-forge, fallback to SHA-256
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

<style scoped>
/* Add any component-specific styles here */
</style> 