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
          :class="[
            'relative z-10 flex flex-col rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600',
            'bg-white dark:bg-gray-800',
            'max-h-[90vh] w-full max-w-5xl'
          ]"
          @click.stop
        >
          <!-- Header -->
          <div class="shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl pl-8 pr-6 py-4">
            <h2 class="text-xl font-bold text-white">
              Advanced: Mnemonic Phrase Expansion
            </h2>
            <p class="text-sm text-white/90 mt-1">
              Expand a 12-word seed phrase to 24 words using various methods
            </p>
          </div>

          <!-- Body (scrollable) -->
          <div class="flex-1 overflow-y-auto p-6 space-y-4">
            <!-- Input Section -->
            <div class="space-y-2 px-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                Original Seed Phrase (12 words)
              </label>
              <textarea
                v-model="inputSeedPhrase"
                placeholder="Enter your 12-word mnemonic seed phrase..."
                class="w-full min-h-[80px] font-mono text-sm p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              ></textarea>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Enter a valid 12-word BIP39 seed phrase to expand it to 24 words.
              </p>
            </div>

            <!-- Expansion Method Selection - 2 Column Grid -->
            <div class="space-y-2 px-2">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Expansion Method
              </label>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div
                  v-for="(info, method) in methodDescriptions"
                  :key="method"
                  @click="expansionMethod = method as ExpansionMethod"
                  :class="[
                    'flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors',
                    expansionMethod === method
                      ? 'border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  ]"
                >
                  <!-- Radio circle -->
                  <div class="mt-0.5 shrink-0">
                    <div
                      :class="[
                        'w-4 h-4 rounded-full border-2 flex items-center justify-center',
                        expansionMethod === method
                          ? 'border-blue-500 dark:border-blue-400'
                          : 'border-gray-300 dark:border-gray-500'
                      ]"
                    >
                      <div
                        v-if="expansionMethod === method"
                        class="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"
                      ></div>
                    </div>
                  </div>
                  <div class="flex-1 space-y-1">
                    <label class="font-semibold cursor-pointer text-sm text-gray-900 dark:text-white">
                      {{ info.title }}
                    </label>
                    <p class="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                      {{ info.description }}
                    </p>
                    <div
                      v-if="info.warning"
                      class="flex items-start gap-1.5 mt-1.5 p-1.5 rounded bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-500/20 dark:border-yellow-400/20"
                    >
                      <AlertCircle class="h-3 w-3 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                      <p class="text-xs text-yellow-900 dark:text-yellow-100 leading-tight">
                        {{ info.warning }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Expand Button -->
            <div class="px-2">
              <button
                @click="handleExpand"
                :disabled="isExpanding || !inputSeedPhrase.trim()"
                class="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-medium rounded-lg transition-opacity shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isExpanding ? 'Expanding...' : 'Expand to 24 Words' }}
              </button>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="px-2">
              <div class="p-4 rounded-lg border-2 bg-red-50 dark:bg-red-900/30 border-red-500 dark:border-red-400">
                <div class="flex items-center gap-2">
                  <AlertCircle class="h-5 w-5 text-red-600 dark:text-red-400" />
                  <p class="font-semibold text-red-900 dark:text-red-100">{{ errorMessage }}</p>
                </div>
              </div>
            </div>

            <!-- Expanded Phrase Display -->
            <div v-if="expandedPhrase" class="space-y-3 p-4 bg-green-50 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-400 rounded-lg mx-2">
              <div class="flex items-center gap-2">
                <CheckCircle2 class="h-5 w-5 text-green-600 dark:text-green-400" />
                <label class="text-sm font-semibold text-green-900 dark:text-green-100">
                  Expanded Seed Phrase (24 words)
                </label>
              </div>

              <!-- Checksum Validation Display -->
              <div class="bg-white/50 dark:bg-gray-800/50 p-2.5 rounded-lg border border-green-500/30 dark:border-green-400/30">
                <div class="space-y-1 text-xs font-mono">
                  <div class="flex items-center gap-2">
                    <CheckCircle2 class="h-3 w-3 text-green-600 dark:text-green-400" />
                    <span class="text-green-900 dark:text-green-100">
                      Word count: {{ expandedPhrase.split(/\s+/).filter(w => w.length > 0).length }} ✓
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <CheckCircle2 class="h-3 w-3 text-green-600 dark:text-green-400" />
                    <span class="text-green-900 dark:text-green-100">
                      Entropy bits: 256 ✓
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <CheckCircle2 class="h-3 w-3 text-green-600 dark:text-green-400" />
                    <span class="text-green-900 dark:text-green-100">
                      Checksum: Valid ✓
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <CheckCircle2 class="h-3 w-3 text-green-600 dark:text-green-400" />
                    <span class="text-green-900 dark:text-green-100">
                      Method: {{ methodDescriptions[expansionMethod].title }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Expanded phrase textarea -->
              <textarea
                :value="expandedPhrase"
                readonly
                class="w-full min-h-[100px] font-mono text-sm p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
              ></textarea>

              <!-- Action buttons -->
              <div class="flex gap-2">
                <button
                  @click="handleCopyExpanded"
                  class="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Copy v-if="!expandedCopied" class="h-4 w-4" />
                  <Check v-else class="h-4 w-4 text-green-500" />
                  {{ expandedCopied ? 'Copied!' : 'Copy' }}
                </button>
                <button
                  @click="handleApplyExpansion"
                  class="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Apply to Main Form
                </button>
              </div>

              <!-- Info note -->
              <div class="flex items-start gap-2 p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-500/20 dark:border-blue-400/20">
                <Info class="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <p class="text-xs text-blue-900 dark:text-blue-100 leading-tight">
                  <strong>Important:</strong> The expanded 24-word phrase is a new seed phrase.
                  {{ (expansionMethod === 'random' || expansionMethod === 'hybrid')
                    ? ' Contains random elements - cannot be recreated later. Save it now!'
                    : ' Can be recreated using the same method.' }}
                </p>
              </div>
            </div>

            <!-- Information Box -->
            <div class="flex items-start gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 mx-2">
              <Info class="h-4 w-4 text-gray-600 dark:text-gray-400 mt-0.5 shrink-0" />
              <div class="text-xs text-gray-600 dark:text-gray-400">
                <p class="font-semibold text-gray-900 dark:text-white mb-1">About Mnemonic Expansion</p>
                <p class="leading-tight">
                  Expansion converts 12-word (128-bit) to 24-word (256-bit) phrases. Different methods provide different levels of determinism.
                  Always validate expanded phrases and store them securely.
                </p>
              </div>
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
import { CheckCircle2, AlertCircle, Info, Copy, Check } from 'lucide-vue-next'

type ExpansionMethod = 'duplicate' | 'deterministic' | 'random' | 'hybrid'

interface Props {
  open: boolean
  seedPhrase: string
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'update:seedPhrase', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const inputSeedPhrase = ref(props.seedPhrase)
const expansionMethod = ref<ExpansionMethod>('deterministic')
const expandedPhrase = ref('')
const isExpanding = ref(false)
const expandedCopied = ref(false)
const errorMessage = ref('')

// Update input when seedPhrase prop changes
watch(() => props.open, (newOpen) => {
  if (newOpen && props.seedPhrase) {
    inputSeedPhrase.value = props.seedPhrase
    expandedPhrase.value = ''
    errorMessage.value = ''
  }
})

watch(() => props.seedPhrase, (newPhrase) => {
  if (props.open && newPhrase) {
    inputSeedPhrase.value = newPhrase
  }
})

const methodDescriptions: Record<ExpansionMethod, { title: string; description: string; warning?: string }> = {
  duplicate: {
    title: 'Duplicate Method',
    description: 'Duplicates the original entropy to create a 24-word phrase with valid checksum. Provides no additional entropy but is the simplest method.',
    warning: 'This method does not increase security - same entropy is used twice.',
  },
  deterministic: {
    title: 'Deterministic Method',
    description: 'Uses the original seed phrase to deterministically generate additional entropy. The same 12-word phrase will always expand to the same 24-word phrase with valid checksum.',
    warning: 'This method is deterministic - same input always produces same output.',
  },
  random: {
    title: 'Random Method',
    description: 'Combines original entropy with new random entropy to create a 24-word phrase with valid checksum. Each expansion produces different results.',
    warning: '⚠️ WARNING: This method is non-deterministic. You will NOT be able to recreate this expansion later. Use with caution!',
  },
  hybrid: {
    title: 'Hybrid Method',
    description: 'Combines original entropy with deterministic entropy (64 bits) and random entropy (64 bits). Creates a 24-word phrase with valid checksum.',
    warning: '⚠️ WARNING: Contains random elements. The random portion cannot be recreated later.',
  },
}

/**
 * Method 1: Duplicate and Append
 */
const expandByDuplication = (phrase: string): string => {
  try {
    const originalEntropy = bip39.mnemonicToEntropy(phrase)
    const combinedEntropy = originalEntropy + originalEntropy
    return bip39.entropyToMnemonic(combinedEntropy)
  } catch (error) {
    console.error('Error in duplicate expansion:', error)
    return phrase
  }
}

/**
 * Method 2: Deterministic Expansion
 */
const expandByDeterministic = async (phrase: string): Promise<string> => {
  try {
    const originalEntropy = bip39.mnemonicToEntropy(phrase)
    const originalSeed = await bip39.mnemonicToSeed(phrase)
    const seedBytes = new Uint8Array(originalSeed)
    const hashBuffer = await crypto.subtle.digest('SHA-256', seedBytes)
    const hashArray = new Uint8Array(hashBuffer)
    const additionalEntropy = Array.from(hashArray.slice(0, 16))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    const combinedEntropy = originalEntropy + additionalEntropy
    return bip39.entropyToMnemonic(combinedEntropy)
  } catch (error) {
    console.error('Error in deterministic expansion:', error)
    return phrase
  }
}

/**
 * Method 3: Random Expansion
 */
const expandByRandom = (phrase: string): string => {
  try {
    const originalEntropy = bip39.mnemonicToEntropy(phrase)
    const additionalEntropy = crypto.getRandomValues(new Uint8Array(16))
    const additionalEntropyHex = Array.from(additionalEntropy)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    const combinedEntropy = originalEntropy + additionalEntropyHex
    return bip39.entropyToMnemonic(combinedEntropy)
  } catch (error) {
    console.error('Error in random expansion:', error)
    return phrase
  }
}

/**
 * Method 4: Hybrid Expansion
 */
const expandByHybrid = async (phrase: string): Promise<string> => {
  try {
    const originalEntropy = bip39.mnemonicToEntropy(phrase)
    const originalSeed = await bip39.mnemonicToSeed(phrase)
    const seedBytes = new Uint8Array(originalSeed)
    const hashBuffer = await crypto.subtle.digest('SHA-256', seedBytes)
    const hashArray = new Uint8Array(hashBuffer)
    const deterministicPart = Array.from(hashArray.slice(0, 8))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    const randomBytes = crypto.getRandomValues(new Uint8Array(8))
    const randomPart = Array.from(randomBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    const combinedEntropy = originalEntropy + deterministicPart + randomPart
    return bip39.entropyToMnemonic(combinedEntropy)
  } catch (error) {
    console.error('Error in hybrid expansion:', error)
    return phrase
  }
}

const handleExpand = async () => {
  const trimmedPhrase = inputSeedPhrase.value.trim()
  errorMessage.value = ''

  if (!trimmedPhrase) {
    errorMessage.value = 'Please enter a seed phrase to expand.'
    return
  }

  const words = trimmedPhrase.split(/\s+/).filter(word => word.length > 0)

  if (words.length !== 12) {
    errorMessage.value = 'Expansion currently only supports 12-word seed phrases. Please enter a 12-word phrase.'
    return
  }

  if (!bip39.validateMnemonic(trimmedPhrase)) {
    errorMessage.value = 'The seed phrase must be a valid BIP39 mnemonic. Please validate it first using the Checksum button.'
    return
  }

  isExpanding.value = true
  try {
    let expanded: string

    switch (expansionMethod.value) {
      case 'duplicate':
        expanded = expandByDuplication(trimmedPhrase)
        break
      case 'deterministic':
        expanded = await expandByDeterministic(trimmedPhrase)
        break
      case 'random':
        expanded = expandByRandom(trimmedPhrase)
        break
      case 'hybrid':
        expanded = await expandByHybrid(trimmedPhrase)
        break
      default:
        expanded = trimmedPhrase
    }

    const isValid = bip39.validateMnemonic(expanded)
    const expandedWords = expanded.split(/\s+/).filter(word => word.length > 0)

    if (isValid && expandedWords.length === 24) {
      expandedPhrase.value = expanded
    } else {
      errorMessage.value = `The expanded phrase is invalid. Word count: ${expandedWords.length}, Valid checksum: ${isValid}`
    }
  } catch (error) {
    console.error('Error expanding seed phrase:', error)
    errorMessage.value = error instanceof Error ? error.message : 'An error occurred during expansion.'
  } finally {
    isExpanding.value = false
  }
}

const handleApplyExpansion = () => {
  if (expandedPhrase.value) {
    emit('update:seedPhrase', expandedPhrase.value)
    emit('update:open', false)
  }
}

const handleCopyExpanded = async () => {
  if (!expandedPhrase.value) return
  try {
    await navigator.clipboard.writeText(expandedPhrase.value)
    expandedCopied.value = true
    setTimeout(() => {
      expandedCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy expanded phrase:', err)
  }
}

const handleClose = () => {
  expandedPhrase.value = ''
  errorMessage.value = ''
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
