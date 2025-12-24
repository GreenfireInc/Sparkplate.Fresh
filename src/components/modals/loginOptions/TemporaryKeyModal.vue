<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="closeModal">
        <div class="w-full max-w-2xl bg-blue-600 rounded-2xl shadow-xl overflow-hidden">
          <!-- Blue Header Section -->
          <div class="bg-blue-600 px-8 pt-16 pb-10 text-center rounded-t-2xl">
            <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mt-4 mb-4 flex items-center justify-center">
              <Key :size="32" class="text-white" />
            </div>
            <h2 class="text-2xl font-light text-white">{{ t('temporaryPrivateKey') }}</h2>
            <p class="text-white/80 mt-1 font-light">{{ t('network') }}</p>
          </div>

          <!-- White Content Section -->
          <div class="px-8 pt-12 pb-8 space-y-4 bg-white">
            <!-- Network Selection and Private Key Input -->
            <div class="grid grid-cols-1 md:grid-cols-[125px_1fr] gap-4 items-end">
              <!-- Network Selection -->
              <div>
                <label class="text-sm font-medium text-gray-700 pl-3 mb-2 block">{{ t('network') }}</label>
                <select
                  v-model="selectedTicker"
                  class="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded h-10 px-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 outline-none"
                >
                  <option 
                    v-for="ticker in availableNetworks" 
                    :key="ticker" 
                    :value="ticker"
                  >
                    {{ ticker }} - {{ currencyByTicker[ticker]?.basicInfo?.name || ticker }}
                  </option>
                  <option v-if="currenciesLoading" disabled>Loading currencies...</option>
                </select>
              </div>

              <!-- Private Key Input -->
              <div>
                <label class="text-sm font-medium text-gray-700 pl-3 mb-2 block">
                  {{ getNetworkLabel() }} {{ t('privateKey') }}
                </label>
                <div class="relative">
                  <Key :size="16" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    v-model="privateKeyInput"
                    :type="showPrivateKey ? 'text' : 'password'"
                    :placeholder="t('pastePrivateKey')"
                    style="padding-left: 2.5rem; padding-right: 2.5rem;"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400 rounded h-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 outline-none"
                  />
                  <button
                    @click="toggleShowPrivateKey"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Eye v-if="!showPrivateKey" :size="16" />
                    <EyeOff v-else :size="16" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Derive Button -->
            <div class="bg-gray-50 rounded-lg p-3">
              <button
                @click="handleDerive"
                :disabled="!privateKeyInput.trim()"
                style="background-color: #2563eb;"
                class="w-full hover:bg-blue-700 text-white font-medium rounded h-10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ t('use') }}
              </button>
            </div>

            <!-- Results Section -->
            <div v-if="derivedAddress" class="mt-6 space-y-4">
              <!-- QR Code -->
              <div class="flex justify-center">
                <div class="relative">
                  <div class="w-64 h-64 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                    <div class="text-center">
                      <div class="text-4xl mb-2">🔐</div>
                      <div class="text-sm text-gray-600">{{ selectedTicker }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Address Display -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 pl-3 block">{{ t('walletAddress') }}</label>
                <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                  <span class="flex-1 text-sm font-mono break-all">{{ derivedAddress }}</span>
                  <button
                    @click="copyToClipboard(derivedAddress, t('walletAddress'))"
                    class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Copy :size="16" />
                  </button>
                </div>
              </div>

              <!-- Public Key Display -->
              <div v-if="derivedPublicKey" class="space-y-2">
                <label class="text-sm font-medium text-gray-700 pl-3 block">{{ t('publicKey') }}</label>
                <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                  <span class="flex-1 text-sm font-mono break-all">{{ derivedPublicKey }}</span>
                  <button
                    @click="copyToClipboard(derivedPublicKey, t('publicKey'))"
                    class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Copy :size="16" />
                  </button>
                </div>
              </div>

              <!-- Block Explorer Link -->
              <div v-if="blockExplorerLink" class="space-y-2">
                <label class="text-sm font-medium text-gray-700 pl-3 block">{{ t('viewOnExplorer') }}</label>
                <a
                  :href="blockExplorerLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors ml-3"
                >
                  <ExternalLink :size="16" />
                  {{ t('openInExplorer') }}
                </a>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="p-3 bg-red-50 border border-red-200 rounded-md">
              <p class="text-sm text-red-600">{{ errorMessage }}</p>
            </div>

            <!-- Footer Links -->
            <div class="mt-6 text-center">
              <button 
                @click="closeModal"
                class="text-blue-600 hover:underline text-sm font-medium focus:outline-none focus:ring-0 border-0"
              >
                {{ t('cancel') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { Key, Eye, EyeOff, Copy, ExternalLink } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

// Define types locally to avoid importing the currencies module at startup
type SupportedTicker = "ALGO" | "AR" | "ATOM" | "BCH" | "BNB" | "BTC" | "DOGE" | "DOT" | "ETC" | "ETH" | "LTC" | "LUNA" | "LUNC" | "SOL" | "STX" | "TRX" | "WAVES" | "XLM" | "XRP" | "XTZ"

interface CurrencyData {
  basicInfo?: { name?: string }
  deriveFromPrivateKey?: (privateKey: string) => any
  getBlockExplorerLink?: (address: string) => string
  blockExplorer?: { blockExplorerLink?: string }
}

interface TemporaryKeyModalProps {
  isOpen: boolean
}

const props = defineProps<TemporaryKeyModalProps>()
const emit = defineEmits<{
  'update:open': [value: boolean]
  derive: [ticker: string, privateKey: string]
}>()

const { t } = useI18n()

const selectedTicker = ref<SupportedTicker>('ETH')
const privateKeyInput = ref('')
const showPrivateKey = ref(false)
const derivedAddress = ref('')
const derivedPublicKey = ref('')
const blockExplorerLink = ref('')
const errorMessage = ref('')

// Lazy-loaded currency data (loaded when modal opens)
const currencyByTicker = ref<Record<string, CurrencyData>>({})
const currenciesLoaded = ref(false)
const currenciesLoading = ref(false)

// Load currencies dynamically when the modal opens
const loadCurrencies = async () => {
  if (currenciesLoaded.value || currenciesLoading.value) return
  
  currenciesLoading.value = true
  try {
    const module = await import('@/lib/currencyCore/currencies')
    currencyByTicker.value = module.currencyByTicker
    currenciesLoaded.value = true
  } catch (error) {
    console.error('Failed to load currencies:', error)
  } finally {
    currenciesLoading.value = false
  }
}

// Watch for modal open to load currencies
watch(() => props.isOpen, (isOpen) => {
  if (isOpen && !currenciesLoaded.value) {
    loadCurrencies()
  }
}, { immediate: true })

// Get all available networks from the currency data
// Filter to only include currencies that have deriveFromPrivateKey function
const availableNetworks = computed(() => {
  if (!currenciesLoaded.value) return ['ETH'] as SupportedTicker[]
  return Object.keys(currencyByTicker.value)
    .filter(ticker => currencyByTicker.value[ticker]?.deriveFromPrivateKey)
    .sort() as SupportedTicker[]
})

const getNetworkLabel = () => {
  const currency = currencyByTicker.value[selectedTicker.value]
  return currency?.basicInfo?.name || selectedTicker.value
}

const getBlockExplorerUrl = (ticker: string, address: string) => {
  const currency = currencyByTicker.value[ticker]
  if (currency?.getBlockExplorerLink) {
    return currency.getBlockExplorerLink(address) || ''
  }
  
  // Fallback to blockExplorerLink if available
  if (currency?.blockExplorer?.blockExplorerLink) {
    return `${currency.blockExplorer.blockExplorerLink}${address}`
  }
  
  return ''
}

const handleDerive = async () => {
  if (!privateKeyInput.value.trim()) return

  errorMessage.value = ''
  derivedAddress.value = ''
  derivedPublicKey.value = ''
  blockExplorerLink.value = ''

  try {
    // Simulate derivation process
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock derivation - in real implementation, this would use actual crypto libraries
    const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`
    const mockPublicKey = `0x${Math.random().toString(16).substr(2, 64)}`
    
    derivedAddress.value = mockAddress
    derivedPublicKey.value = mockPublicKey
    blockExplorerLink.value = getBlockExplorerUrl(selectedTicker.value, mockAddress)
    
    emit('derive', selectedTicker.value, privateKeyInput.value.trim())
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : t('derivationError')
  }
}

const copyToClipboard = async (text: string, label: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // You could add a toast notification here
    console.log(`${label} copied to clipboard`)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const toggleShowPrivateKey = () => {
  showPrivateKey.value = !showPrivateKey.value
}

const closeModal = () => {
  emit('update:open', false)
  selectedTicker.value = 'ETH'
  privateKeyInput.value = ''
  showPrivateKey.value = false
  derivedAddress.value = ''
  derivedPublicKey.value = ''
  blockExplorerLink.value = ''
  errorMessage.value = ''
}


// Reset form when ticker changes
watch(selectedTicker, () => {
  privateKeyInput.value = ''
  derivedAddress.value = ''
  derivedPublicKey.value = ''
  blockExplorerLink.value = ''
  errorMessage.value = ''
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
