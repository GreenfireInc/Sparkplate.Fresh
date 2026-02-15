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
          class="relative z-10 flex flex-col rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 max-h-[90vh] w-full max-w-2xl"
          @click.stop
        >
          <!-- Header -->
          <div class="shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl pl-8 pr-6 py-4">
            <h2 class="text-xl font-bold text-white">
              Derivation Path Dive
            </h2>
            <p class="text-sm text-white/90 mt-1">
              Enter a PIN to explore wallet addresses at a specific derivation path index
            </p>
          </div>

          <!-- Body (scrollable) -->
          <div class="flex-1 overflow-y-auto p-6 space-y-4">
            <!-- PIN Input Section -->
            <div class="space-y-2 px-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                PIN (4–10 characters)
              </label>
              <div class="flex gap-2">
                <input
                  v-model="pin"
                  type="text"
                  placeholder="Enter your PIN..."
                  maxlength="10"
                  @keydown.enter="handleGenerate"
                  class="max-w-[200px] font-mono text-sm px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  @click="handleGenerate"
                  :disabled="isGenerating || pin.length < 4"
                  class="shrink-0 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-medium rounded-lg transition-opacity shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {{ isGenerating ? 'Generating...' : 'Generate Addresses' }}
                </button>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Your PIN will be converted to a derivation index. Same PIN always produces the same addresses.
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

            <!-- Derivation Index Display -->
            <div v-if="derivationIndex !== null" class="px-2">
              <div class="flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-500/20 dark:border-blue-400/20">
                <Info class="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <p class="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Derivation Index:</strong> {{ derivationIndex }} (Generated from PIN: {{ pin }})
                </p>
              </div>
            </div>

            <!-- Information Box -->
            <div class="flex items-start gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 mx-2">
              <AlertCircle class="h-4 w-4 text-gray-600 dark:text-gray-400 mt-0.5 shrink-0" />
              <div class="text-xs text-gray-600 dark:text-gray-400">
                <p class="font-semibold text-gray-900 dark:text-white mb-1">About Derivation Path Dive</p>
                <p class="leading-tight">
                  This tool allows you to explore different derivation paths using a memorable PIN. The PIN is converted to a
                  numerical index (0–999,999) which is used in the derivation path. This lets you create multiple "accounts"
                  from the same seed phrase without remembering complex numbers. Click "Generate Addresses" to view the
                  wallet addresses on the main page.
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
import { AlertCircle, Info } from 'lucide-vue-next'

interface Props {
  open: boolean
  seedPhrase: string
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'generateWithIndices', indices: Record<string, number>): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const pin = ref('')
const isGenerating = ref(false)
const derivationIndex = ref<number | null>(null)
const errorMessage = ref('')

// Clear state when modal closes
watch(() => props.open, (newOpen) => {
  if (!newOpen) {
    pin.value = ''
    derivationIndex.value = null
    errorMessage.value = ''
  }
})

/**
 * Convert PIN to a derivation index.
 * Uses a simple hash function to convert the PIN string to a number.
 */
const pinToDerivationIndex = (pinInput: string): number => {
  let hash = 0
  for (let i = 0; i < pinInput.length; i++) {
    const char = pinInput.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  // Ensure positive number and reasonable range (0 to 999999)
  return Math.abs(hash) % 1000000
}

const handleGenerate = async () => {
  errorMessage.value = ''

  if (!props.seedPhrase) {
    errorMessage.value = 'No seed phrase available. Please generate or input a seed phrase first.'
    return
  }

  if (pin.value.length < 4 || pin.value.length > 10) {
    errorMessage.value = 'PIN must be between 4 and 10 characters.'
    return
  }

  if (!bip39.validateMnemonic(props.seedPhrase)) {
    errorMessage.value = 'The seed phrase is not valid. Please check your seed phrase.'
    return
  }

  isGenerating.value = true
  try {
    const index = pinToDerivationIndex(pin.value)
    derivationIndex.value = index

    const indices: Record<string, number> = {
      BTC: index,
      LTC: index,
      DOGE: index,
      ETH: index,
      TRX: index,
      SOL: index,
      XTZ: index,
      LUNC: index,
    }

    emit('generateWithIndices', indices)
    emit('update:open', false)
  } catch (error) {
    console.error('Error generating addresses:', error)
    errorMessage.value = error instanceof Error ? error.message : 'Failed to generate addresses.'
  } finally {
    isGenerating.value = false
  }
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
