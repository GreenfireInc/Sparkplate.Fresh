<template>
  <div class="mnemonic-generator min-h-screen bg-background p-2 md:p-4">
    <div class="max-w-7xl mx-auto space-y-4">
      <!-- Header -->
      <div class="text-center space-y-2 py-3">
        <div class="flex items-center justify-center gap-1.5 mb-1">
          <Shield class="h-5 w-5 text-primary" />
          <h1 class="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Mnemonic Seed Phrase Generator
          </h1>
        </div>
        <p class="text-sm text-muted-foreground max-w-2xl mx-auto">
          Generate deterministic cryptocurrency wallets with BIP39 mnemonic seed phrases
        </p>
      </div>

      <!-- Seed Phrase Generator Card -->
      <div class="max-w-4xl mx-auto">
        <div class="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
          <!-- Card Header -->
          <div class="mb-3">
            <h2 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Seed Phrase Generator
            </h2>
            <p class="text-xs text-muted-foreground mt-0.5">
              Generate or input your mnemonic seed phrase
            </p>
          </div>

          <!-- Mode Toggle Buttons -->
          <div class="flex gap-2 mb-3">
            <button
              @click="inputMode = 'generate'"
              :class="[
                'flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                inputMode === 'generate' ? 'btn-active' : 'btn-inactive'
              ]"
            >
              Generate
            </button>
            <button
              @click="inputMode = 'input'"
              :class="[
                'flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                inputMode === 'input' ? 'btn-active' : 'btn-inactive'
              ]"
            >
              Input
            </button>
            <button
              @click="triggerFileUpload"
              class="px-4 py-2 rounded-md text-sm font-medium transition-colors border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              title="Load from JSON or CSV file"
            >
              <Upload class="h-4 w-4" />
            </button>
            <input
              ref="fileInput"
              type="file"
              accept=".json,.csv"
              @change="loadFromFile"
              class="hidden"
            />
          </div>

          <!-- Generate Mode -->
          <div v-if="inputMode === 'generate'" class="space-y-2">
            <div class="space-y-1">
              <label class="text-xs font-medium text-gray-700 dark:text-gray-300">Word Count</label>
              <select
                v-model="wordCount"
                class="w-full px-2 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option v-for="count in wordCounts" :key="count" :value="count">
                  {{ count }} words
                </option>
              </select>
            </div>

            <button
              @click="generateMnemonic"
              class="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-semibold hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-2 text-sm"
            >
              <RefreshCw class="h-3 w-3" />
              Generate Seed Phrase
            </button>
          </div>

          <!-- Input Mode -->
          <div v-if="inputMode === 'input'" class="space-y-1">
            <label class="text-xs font-medium text-gray-700 dark:text-gray-300">Enter Seed Phrase</label>
            <textarea
              v-model="mnemonic"
              placeholder="Enter your mnemonic seed phrase..."
              class="w-full min-h-[80px] px-2 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <!-- Display Seed Phrase (when generated or entered) -->
          <div v-if="mnemonic" class="mt-3 space-y-2">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <label class="text-xs font-medium text-gray-700 dark:text-gray-300">Your Seed Phrase</label>
              <div class="flex gap-1">
                <button
                  @click="copyToClipboard"
                  class="px-2 py-1 rounded-md text-xs font-medium transition-colors border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-1"
                >
                  <Copy v-if="!copied" class="h-3 w-3" />
                  <Check v-else class="h-3 w-3 text-green-500" />
                  {{ copied ? 'Copied!' : 'Copy' }}
                </button>
                <button
                  @click="downloadSeedPhrase"
                  class="px-2 py-1 rounded-md text-xs font-medium transition-colors border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-1"
                >
                  <Download class="h-3 w-3" />
                  Download
                </button>
              </div>
            </div>

            <!-- Word Grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              <div
                v-for="(word, index) in mnemonicWords"
                :key="index"
                class="bg-gray-50 dark:bg-gray-700/50 rounded-md p-2 border border-gray-200 dark:border-gray-600"
              >
                <span class="text-xs text-gray-500 dark:text-gray-400 font-medium mr-1">
                  {{ index + 1 }}.
                </span>
                <span class="text-xs font-mono text-gray-900 dark:text-white">
                  {{ word }}
                </span>
              </div>
            </div>

            <!-- Raw Seed Phrase Display -->
            <div class="bg-gray-50 dark:bg-gray-900/50 rounded-md p-2 border border-gray-200 dark:border-gray-700">
              <p class="text-xs font-mono text-gray-900 dark:text-white break-all">
                {{ mnemonic }}
              </p>
            </div>

            <!-- Warning -->
            <p class="text-xs text-red-600 dark:text-red-400">
              ⚠️ Never share your seed phrase with anyone. Store it securely offline.
            </p>
          </div>
        </div>
      </div>

      <!-- Security Notice -->
      <div class="max-w-4xl mx-auto mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <h3 class="text-sm font-semibold text-red-600 dark:text-red-400 mb-1 flex items-center gap-1">
          <Shield class="h-4 w-4" />
          Security Warning
        </h3>
        <ul class="text-xs text-gray-700 dark:text-gray-300 space-y-0.5 list-disc list-inside">
          <li>Never share your seed phrase or private keys with anyone</li>
          <li>Store your seed phrase offline in a secure location</li>
          <li>This tool runs entirely in your browser - no data is sent to any server</li>
          <li>Always verify addresses before sending funds</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import * as bip39 from 'bip39'
import { Shield, RefreshCw, Upload, Copy, Check, Download } from 'lucide-vue-next'

const wordCounts = [12, 15, 18, 21, 24]
const wordCount = ref<number>(12)
const mnemonic = ref<string>('')
const copied = ref(false)
const inputMode = ref<'generate' | 'input'>('generate')
const fileInput = ref<HTMLInputElement | null>(null)

// Standard BIP39 word count → entropy bits
const standardEntropyMap: Record<number, number> = {
  12: 128,
  15: 160,
  18: 192,
  21: 224,
  24: 256,
}

// Generate BIP39 mnemonic (valid checksum, same as keyForge)
const generateMnemonic = () => {
  const count = wordCount.value
  const entropyBits = standardEntropyMap[count] ?? 256
  const phrase = bip39.generateMnemonic(entropyBits)
  mnemonic.value = phrase
  copied.value = false
}

const mnemonicWords = computed(() => {
  return mnemonic.value ? mnemonic.value.split(' ') : []
})

const copyToClipboard = async () => {
  if (!mnemonic.value) return
  
  try {
    await navigator.clipboard.writeText(mnemonic.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = mnemonic.value
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (fallbackErr) {
      console.error('Fallback copy failed:', fallbackErr)
    }
    document.body.removeChild(textArea)
  }
}

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const loadFromFile = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  try {
    const text = await file.text()
    
    if (file.name.endsWith('.json')) {
      const data = JSON.parse(text)
      // Try to find seed phrase in common JSON structures
      const seedPhrase = data.seedPhrase || data.mnemonic || data.seed || data.phrase || data.words?.join(' ')
      if (seedPhrase) {
        mnemonic.value = seedPhrase
        inputMode.value = 'input'
      } else {
        alert('Could not find seed phrase in JSON file')
      }
    } else if (file.name.endsWith('.csv')) {
      const wordlist = bip39.wordlists.english ?? bip39.wordlists['english']
      const lines = text.trim().split('\n')
      const words: string[] = []
      for (const line of lines) {
        const cells = line.split(',')
        for (const cell of cells) {
          const cleaned = cell.trim().replace(/"/g, '').toLowerCase()
          if (cleaned && wordlist.includes(cleaned)) {
            words.push(cleaned)
          }
        }
      }
      const phrase = words.join(' ')
      if (words.length >= 12) {
        mnemonic.value = phrase
        inputMode.value = 'input'
        if (!bip39.validateMnemonic(phrase)) {
          console.warn('Loaded phrase may have invalid checksum or word order.')
        }
      } else {
        alert('Could not find valid seed phrase in CSV file')
      }
    }
  } catch (err) {
    console.error('Failed to load file:', err)
    alert('Failed to load file')
  }
  
  // Reset input so the same file can be selected again
  target.value = ''
}

const downloadSeedPhrase = () => {
  if (!mnemonic.value) return
  
  const date = new Date()
  const dateStr = date.toISOString().split('T')[0]
  const content = JSON.stringify({
    seedPhrase: mnemonic.value,
    wordCount: mnemonicWords.value.length,
    createdAt: date.toISOString()
  }, null, 2)
  
  const blob = new Blob([content], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `seed-phrase-${dateStr}.json`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.mnemonic-generator {
  min-height: 100%;
}

.text-primary {
  color: rgb(37 99 235); /* blue-600 */
}

.dark .text-primary {
  color: rgb(96 165 250); /* blue-400 */
}

.text-muted-foreground {
  color: rgb(75 85 99); /* gray-600 */
}

.dark .text-muted-foreground {
  color: rgb(156 163 175); /* gray-400 */
}

.bg-background {
  background-color: rgb(249 250 251); /* gray-50 */
}

.dark .bg-background {
  background-color: rgb(17 24 39); /* gray-900 */
}

.btn-active {
  background-color: rgb(37 99 235); /* blue-600 */
  color: white;
}

.btn-active:hover {
  background-color: rgb(29 78 216); /* blue-700 */
}

.btn-inactive {
  background-color: rgb(243 244 246); /* gray-100 */
  color: rgb(55 65 81); /* gray-700 */
}

.btn-inactive:hover {
  background-color: rgb(229 231 235); /* gray-200 */
}

.dark .btn-inactive {
  background-color: rgb(55 65 81); /* gray-700 */
  color: rgb(209 213 219); /* gray-300 */
}

.dark .btn-inactive:hover {
  background-color: rgb(75 85 99); /* gray-600 */
}
</style>
