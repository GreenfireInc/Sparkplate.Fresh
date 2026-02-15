<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop - click to close -->
        <div
          class="fixed inset-0 bg-black/50 backdrop-blur-sm z-0"
          aria-hidden="true"
          @click="handleClose"
        ></div>

        <!-- Modal Content -->
        <div
          class="relative z-10 flex flex-col rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 max-h-[90vh] w-full max-w-7xl"
          @click.stop
        >
          <!-- Header -->
          <div class="shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl pl-8 pr-6 py-4">
            <h2 class="text-xl font-bold text-white">
              Derive Mnemonic from Private Key
            </h2>
            <p class="text-sm text-white/90 mt-1">
              Enter a private key to generate possible BIP39 mnemonic phrases
            </p>
          </div>

          <!-- Body (scrollable) -->
          <div class="flex-1 overflow-y-auto p-6 space-y-3">
            <!-- Private Key Input -->
            <div class="space-y-1 px-2">
              <div class="flex items-center justify-between">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Private Key (Hex)
                </label>
                <button
                  @click="triggerFileUpload"
                  class="px-2.5 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-xs font-medium transition-colors flex items-center gap-1"
                >
                  <Upload class="h-3 w-3" />
                  Load File
                </button>
                <input
                  ref="fileInputRef"
                  type="file"
                  accept=".json,.csv,.txt"
                  class="hidden"
                  @change="loadFromFile"
                />
              </div>
              <textarea
                v-model="privateKey"
                placeholder="Enter private key or load from file..."
                class="w-full min-h-[60px] font-mono text-xs p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              ></textarea>
            </div>

            <!-- Generate Button -->
            <div class="px-2">
              <button
                @click="handleGenerate"
                :disabled="isGenerating || !privateKey.trim()"
                class="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-medium rounded-lg transition-opacity shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Loader2 v-if="isGenerating" class="h-4 w-4 animate-spin" />
                {{ isGenerating ? 'Generating Mnemonics...' : 'Generate Mnemonic Suggestions' }}
              </button>
            </div>

            <!-- Information Box -->
            <div class="flex items-start gap-2 p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 mx-2">
              <Info class="h-4 w-4 text-gray-600 dark:text-gray-400 mt-0.5 shrink-0" />
              <p class="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                Generates BIP39 mnemonics from a private key using multiple methods. Each valid mnemonic includes a GPG key fingerprint for verification.
              </p>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="px-2">
              <div class="p-4 rounded-lg border-2 bg-red-50 dark:bg-red-900/30 border-red-500 dark:border-red-400">
                <div class="flex items-center gap-2">
                  <AlertCircle class="h-5 w-5 text-red-600 dark:text-red-400" />
                  <p class="font-semibold text-red-900 dark:text-red-100 text-sm">{{ errorMessage }}</p>
                </div>
              </div>
            </div>

            <!-- Suggestions Display -->
            <div v-if="suggestions.length > 0" class="space-y-2 px-2">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Mnemonic Suggestions ({{ suggestions.filter(s => s.isValid).length }} valid)
              </label>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div
                  v-for="(suggestion, index) in suggestions"
                  :key="index"
                  :class="[
                    'rounded-lg p-3 space-y-2 border-2',
                    suggestion.isValid
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400'
                      : 'bg-red-50 dark:bg-red-900/30 border-red-500 dark:border-red-400'
                  ]"
                >
                  <!-- Card Header -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      <CheckCircle2
                        v-if="suggestion.isValid"
                        class="h-4 w-4 text-blue-600 dark:text-blue-400"
                      />
                      <AlertCircle
                        v-else
                        class="h-4 w-4 text-red-600 dark:text-red-400"
                      />
                      <div>
                        <p class="font-semibold text-xs text-gray-900 dark:text-white">
                          {{ suggestion.wordCount }}-word
                        </p>
                        <p class="text-[10px] text-gray-600 dark:text-gray-400">
                          {{ suggestion.method.replace(' (128-bit)', '').replace(' (256-bit)', '') }}
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center gap-1">
                      <button
                        @click="handleCopy(suggestion.mnemonic)"
                        class="h-7 w-7 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        title="Copy mnemonic"
                      >
                        <Copy class="h-3 w-3 text-gray-700 dark:text-gray-300" />
                      </button>
                      <button
                        v-if="suggestion.isValid"
                        @click="handleApply(suggestion.mnemonic)"
                        class="h-7 px-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  <!-- Mnemonic -->
                  <textarea
                    :value="suggestion.mnemonic"
                    readonly
                    class="w-full min-h-[50px] font-mono text-[10px] leading-tight p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                  ></textarea>

                  <!-- GPG Fingerprint -->
                  <div v-if="suggestion.isValid" class="space-y-1">
                    <div v-if="suggestion.isGenerating" class="flex items-center gap-1 p-1.5 bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-600">
                      <Loader2 class="h-3 w-3 animate-spin text-gray-500" />
                      <span class="text-[10px] text-gray-500 dark:text-gray-400">Generating GPG fingerprint...</span>
                    </div>
                    <div v-else-if="suggestion.gpgFingerprint" class="flex items-center gap-1">
                      <input
                        :value="suggestion.gpgFingerprint"
                        readonly
                        class="flex-1 font-mono text-[10px] h-7 px-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
                      />
                      <button
                        @click="handleCopy(suggestion.gpgFingerprint!)"
                        class="h-7 w-7 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        title="Copy GPG fingerprint"
                      >
                        <Copy class="h-3 w-3 text-gray-700 dark:text-gray-300" />
                      </button>
                    </div>
                    <p v-else class="text-[10px] text-red-600 dark:text-red-400 p-1.5 bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-600">
                      Failed to generate GPG fingerprint
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Warning -->
            <div v-if="suggestions.length > 0" class="flex items-start gap-2 p-2.5 rounded-lg bg-yellow-50 dark:bg-yellow-900/30 border-2 border-yellow-500 dark:border-yellow-400 mx-2">
              <AlertCircle class="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
              <p class="text-xs text-yellow-900 dark:text-yellow-100 leading-tight">
                <strong>Important:</strong> These mnemonics are deterministically derived from your private key. Each method produces a different valid BIP39 phrase. Verify which derivation method matches your use case.
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div class="shrink-0 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/80 px-6 py-4 rounded-b-xl">
            <button
              @click="handleClose"
              class="w-full px-4 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import * as bip39 from 'bip39'
import { CheckCircle2, AlertCircle, Info, Copy, Upload, Loader2 } from 'lucide-vue-next'
import { generateGPGFromRootExtendedPrivateKey } from '@/lib/cores/cryptographyCore/deterministicGPG/deterministicGPG.seed'

interface Props {
  open: boolean
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'mnemonicSelect', mnemonic: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

interface MnemonicSuggestion {
  mnemonic: string
  wordCount: number
  method: string
  gpgFingerprint: string | null
  isValid: boolean
  isGenerating: boolean
}

const privateKey = ref('')
const suggestions = ref<MnemonicSuggestion[]>([])
const isGenerating = ref(false)
const errorMessage = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)

// Clear state when modal closes
watch(() => props.open, (newOpen) => {
  if (!newOpen) {
    privateKey.value = ''
    suggestions.value = []
    errorMessage.value = ''
  }
})

/**
 * Convert hex string to entropy and generate mnemonic
 */
const hexToMnemonic = (hex: string, wordCount: 12 | 24): string | null => {
  try {
    const cleanHex = hex.toLowerCase().replace(/^0x/, '')
    if (!/^[0-9a-f]+$/i.test(cleanHex)) return null

    const requiredLength = wordCount === 12 ? 32 : 64
    let entropyHex = cleanHex

    if (cleanHex.length < requiredLength) {
      entropyHex = cleanHex.padEnd(requiredLength, '0')
    } else if (cleanHex.length > requiredLength) {
      entropyHex = cleanHex.slice(0, requiredLength)
    }

    return bip39.entropyToMnemonic(entropyHex)
  } catch (error) {
    console.error('Error converting hex to mnemonic:', error)
    return null
  }
}

/**
 * Alternative: Map each hex character pair to a BIP39 word
 */
const hexCharToWordMapping = (hex: string, wordCount: 12 | 24): string | null => {
  try {
    const cleanHex = hex.toLowerCase().replace(/^0x/, '').replace(/[^0-9a-f]/g, '')
    if (cleanHex.length === 0) return null

    const wordlist = bip39.wordlists.english || bip39.wordlists['english']
    if (!wordlist) return null

    const words: string[] = []
    for (let i = 0; i < wordCount; i++) {
      const hexIndex = (i * 2) % cleanHex.length
      const hexPair = cleanHex.slice(hexIndex, hexIndex + 2).padEnd(2, '0')
      const value = parseInt(hexPair, 16)
      const wordIndex = Math.floor((value / 255) * 2047)
      words.push(wordlist[wordIndex])
    }

    const mnemonic = words.join(' ')
    if (!bip39.validateMnemonic(mnemonic)) {
      const entropyHex = cleanHex.padEnd(wordCount === 12 ? 32 : 64, '0').slice(0, wordCount === 12 ? 32 : 64)
      return bip39.entropyToMnemonic(entropyHex)
    }

    return mnemonic
  } catch (error) {
    console.error('Error in hex char to word mapping:', error)
    return null
  }
}

/**
 * Alternative: SHA-256 hash of private key as entropy
 */
const hashBasedMnemonic = async (privateKeyInput: string, wordCount: 12 | 24): Promise<string | null> => {
  try {
    const cleanKey = privateKeyInput.replace(/^0x/, '')
    const encoder = new TextEncoder()
    const data = encoder.encode(cleanKey)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    const entropyLength = wordCount === 12 ? 32 : 64
    let entropyHex = hashHex

    if (wordCount === 24 && hashHex.length < 64) {
      const secondHashBuffer = await crypto.subtle.digest('SHA-256', new Uint8Array(hashBuffer))
      const secondHashArray = Array.from(new Uint8Array(secondHashBuffer))
      const secondHashHex = secondHashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      entropyHex = (hashHex + secondHashHex).slice(0, 64)
    } else {
      entropyHex = hashHex.slice(0, entropyLength)
    }

    return bip39.entropyToMnemonic(entropyHex)
  } catch (error) {
    console.error('Error in hash-based mnemonic:', error)
    return null
  }
}

/**
 * Generate GPG fingerprint for a mnemonic
 */
const generateGPGFingerprint = async (mnemonic: string): Promise<string | null> => {
  try {
    if (!bip39.validateMnemonic(mnemonic)) return null
    const result = await generateGPGFromRootExtendedPrivateKey(mnemonic)
    return result.gpgFingerprint
  } catch (error) {
    console.error('Error generating GPG fingerprint:', error)
    return null
  }
}

/**
 * Parse CSV content and extract private key
 */
const parseCSV = (content: string): string | null => {
  const lines = content.split('\n').filter(line => line.trim())
  if (lines.length < 2) return null

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
  const privateKeyIndex = headers.findIndex(h =>
    h === 'privatekey' || h === 'private_key' || h === 'private key' || h === 'privkey'
  )
  if (privateKeyIndex === -1) return null

  const values = lines[1].split(',').map(v => v.trim().replace(/^["']|["']$/g, ''))
  return values[privateKeyIndex] || null
}

/**
 * Parse TXT content and extract private key
 */
const parseTXT = (content: string): string | null => {
  const lines = content.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    const match = trimmed.match(/(?:private[_\s]?key|privkey)\s*[:=]\s*(.+)/i)
    if (match) return match[1].trim().replace(/^["']|["']$/g, '')
    if (/^[0-9a-f]{64}$/i.test(trimmed)) return trimmed
    if (/^0x[0-9a-f]+$/i.test(trimmed)) return trimmed
  }
  return null
}

const triggerFileUpload = () => {
  fileInputRef.value?.click()
}

const loadFromFile = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  try {
    const content = await file.text()
    let extractedKey: string | null = null

    if (file.name.endsWith('.json')) {
      try {
        const data = JSON.parse(content)
        extractedKey = data.privateKey || data.private_key || data.privKey || null
      } catch {
        errorMessage.value = 'Invalid JSON file format.'
        return
      }
    } else if (file.name.endsWith('.csv')) {
      extractedKey = parseCSV(content)
    } else if (file.name.endsWith('.txt')) {
      extractedKey = parseTXT(content)
    }

    if (extractedKey) {
      privateKey.value = extractedKey
      errorMessage.value = ''
    } else {
      errorMessage.value = 'Could not find private key in file.'
    }
  } catch {
    errorMessage.value = 'Failed to read file.'
  }

  target.value = ''
}

const handleGenerate = async () => {
  errorMessage.value = ''

  if (!privateKey.value.trim()) {
    errorMessage.value = 'Please enter a private key.'
    return
  }

  isGenerating.value = true
  const newSuggestions: MnemonicSuggestion[] = []

  try {
    // Method 1: Direct hex to 12-word mnemonic
    const mnemonic12Direct = hexToMnemonic(privateKey.value, 12)
    if (mnemonic12Direct) {
      newSuggestions.push({
        mnemonic: mnemonic12Direct,
        wordCount: 12,
        method: 'Direct Hex Conversion (128-bit)',
        gpgFingerprint: null,
        isValid: bip39.validateMnemonic(mnemonic12Direct),
        isGenerating: true,
      })
    }

    // Method 2: Direct hex to 24-word mnemonic
    const mnemonic24Direct = hexToMnemonic(privateKey.value, 24)
    if (mnemonic24Direct) {
      newSuggestions.push({
        mnemonic: mnemonic24Direct,
        wordCount: 24,
        method: 'Direct Hex Conversion (256-bit)',
        gpgFingerprint: null,
        isValid: bip39.validateMnemonic(mnemonic24Direct),
        isGenerating: true,
      })
    }

    // Method 3: Hash-based 12-word mnemonic
    const mnemonic12Hash = await hashBasedMnemonic(privateKey.value, 12)
    if (mnemonic12Hash) {
      newSuggestions.push({
        mnemonic: mnemonic12Hash,
        wordCount: 12,
        method: 'SHA-256 Hash Derived (128-bit)',
        gpgFingerprint: null,
        isValid: bip39.validateMnemonic(mnemonic12Hash),
        isGenerating: true,
      })
    }

    // Method 4: Hash-based 24-word mnemonic
    const mnemonic24Hash = await hashBasedMnemonic(privateKey.value, 24)
    if (mnemonic24Hash) {
      newSuggestions.push({
        mnemonic: mnemonic24Hash,
        wordCount: 24,
        method: 'SHA-256 Hash Derived (256-bit)',
        gpgFingerprint: null,
        isValid: bip39.validateMnemonic(mnemonic24Hash),
        isGenerating: true,
      })
    }

    // Method 5: Character mapping 12-word
    const mnemonic12Mapping = hexCharToWordMapping(privateKey.value, 12)
    if (mnemonic12Mapping && !newSuggestions.find(s => s.mnemonic === mnemonic12Mapping)) {
      newSuggestions.push({
        mnemonic: mnemonic12Mapping,
        wordCount: 12,
        method: 'Character Mapping (128-bit)',
        gpgFingerprint: null,
        isValid: bip39.validateMnemonic(mnemonic12Mapping),
        isGenerating: true,
      })
    }

    // Method 6: Character mapping 24-word
    const mnemonic24Mapping = hexCharToWordMapping(privateKey.value, 24)
    if (mnemonic24Mapping && !newSuggestions.find(s => s.mnemonic === mnemonic24Mapping)) {
      newSuggestions.push({
        mnemonic: mnemonic24Mapping,
        wordCount: 24,
        method: 'Character Mapping (256-bit)',
        gpgFingerprint: null,
        isValid: bip39.validateMnemonic(mnemonic24Mapping),
        isGenerating: true,
      })
    }

    suggestions.value = newSuggestions

    if (newSuggestions.length === 0) {
      errorMessage.value = 'Unable to generate valid mnemonics from the provided private key.'
    }

    // Generate GPG fingerprints for valid mnemonics
    for (let i = 0; i < newSuggestions.length; i++) {
      if (newSuggestions[i].isValid) {
        const fingerprint = await generateGPGFingerprint(newSuggestions[i].mnemonic)
        suggestions.value = suggestions.value.map((s, idx) =>
          idx === i ? { ...s, gpgFingerprint: fingerprint, isGenerating: false } : s
        )
      } else {
        suggestions.value = suggestions.value.map((s, idx) =>
          idx === i ? { ...s, isGenerating: false } : s
        )
      }
    }
  } catch (error) {
    console.error('Error generating mnemonics:', error)
    errorMessage.value = 'Failed to generate mnemonics from private key.'
  } finally {
    isGenerating.value = false
  }
}

const handleCopy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const handleApply = (mnemonic: string) => {
  emit('mnemonicSelect', mnemonic)
  emit('update:open', false)
}

const handleClose = () => {
  emit('update:open', false)
}
</script>

<style scoped>
/* Modal transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar styling */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgb(156 163 175 / 0.5);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgb(156 163 175 / 0.7);
}
</style>
