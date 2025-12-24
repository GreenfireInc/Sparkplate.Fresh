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
            <p class="text-white/80 mt-1 font-light">Load a private key without logging in</p>
          </div>

          <!-- White Content Section -->
          <div class="px-8 pt-12 pb-8 space-y-4 bg-white">
            <!-- Network Selection and Private Key Input -->
            <div class="grid grid-cols-1 md:grid-cols-[125px_1fr] gap-4 items-end min-w-0">
              <!-- Network Selection (Custom Dropdown with Icons) -->
              <div class="relative pl-2" ref="networkDropdownRef">
                <label class="text-sm font-medium text-gray-700 pl-3 mb-2 block">{{ t('network') }}</label>
                <button
                  ref="networkButtonRef"
                  type="button"
                  @click="toggleNetworkDropdown"
                  class="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded h-10 px-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 outline-none flex items-center justify-between"
                >
                  <span class="flex items-center gap-2">
                    <img 
                      :src="getSelectedNetworkIcon()" 
                      :alt="selectedTicker" 
                      class="w-5 h-5"
                      @error="handleIconError"
                    />
                    <span>{{ getSelectedNetworkLabel() }}</span>
                  </span>
                  <ChevronDown :size="16" class="text-gray-400 transition-transform duration-200" :class="{ 'rotate-180': isNetworkDropdownOpen }" />
                </button>
              </div>
              
              <!-- Teleported Dropdown Options (outside modal to avoid overflow clipping) -->
              <Teleport to="body">
                <div 
                  v-if="isNetworkDropdownOpen"
                  ref="dropdownMenuRef"
                  class="fixed z-100 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                  :style="dropdownStyle"
                >
                  <div
                    v-for="network in networks"
                    :key="network.ticker"
                    @click="selectNetwork(network.ticker)"
                    class="flex items-center gap-2 px-3 py-2 hover:bg-blue-50 cursor-pointer transition-colors"
                    :class="{ 'bg-blue-100': network.ticker === selectedTicker }"
                  >
                    <img 
                      :src="network.icon" 
                      :alt="network.ticker" 
                      class="w-5 h-5"
                      @error="handleIconError"
                    />
                    <span class="text-gray-900">{{ network.label }}</span>
                  </div>
                </div>
              </Teleport>

              <!-- Private Key Input -->
              <div class="min-w-0">
                <label class="text-sm font-medium text-gray-700 pl-3 mb-2 block">
                  {{ getNetworkLabel() }} {{ t('privateKey') }}
                </label>
                <div class="flex items-end gap-2 pr-4">
                  <div class="relative flex-1 min-w-0">
                    <Key :size="16" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      v-model="privateKeyInput"
                      :type="showPrivateKey ? 'text' : 'password'"
                      :placeholder="t('pastePrivateKey')"
                      style="padding-left: 2.5rem; padding-right: 3rem; max-width: 435px;"
                      class="w-full bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400 rounded h-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 outline-none"
                    />
                    <button
                      @click="toggleShowPrivateKey"
                      class="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <FileUp :size="16" />
                    </button>
                  </div>
                  <!-- Derive Button -->
                  <button
                    @click="handleDerive"
                    :disabled="!privateKeyInput.trim()"
                    style="background-color: #2563eb;"
                    class="px-3 hover:bg-blue-700 text-white text-sm font-medium rounded h-10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {{ t('use') }}
                  </button>
                </div>
              </div>
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

            <!-- Footer Spacer -->
            <div class="mt-6 h-8"></div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Key, Eye, EyeOff, Copy, ExternalLink, ChevronDown, FileUp } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'
// Import only types from currencyData.ts (doesn't load heavy currency modules)
import type { CurrencyData } from '@/lib/currencyCore/currencies/currencyData'

// Type for supported cryptocurrency tickers (matches currencies/index.ts)
type SupportedTicker = "ALGO" | "AR" | "ATOM" | "BCH" | "BNB" | "BTC" | "DOGE" | "DOT" | "ETC" | "ETH" | "LTC" | "LUNA" | "LUNC" | "SOL" | "STX" | "TRX" | "WAVES" | "XLM" | "XRP" | "XTZ"

// Network type for display
interface NetworkInfo {
  ticker: SupportedTicker
  label: string
  icon: string
}

// Static NETWORKS data (mirroring currencies/index.ts to avoid heavy imports at startup)
const STATIC_NETWORKS: NetworkInfo[] = [
  { ticker: "ALGO", label: "ALGO://", icon: "/assets/icons/crypto/algo.svg" },
  { ticker: "AR", label: "AR://", icon: "/assets/icons/crypto/ar.svg" },
  { ticker: "ATOM", label: "ATOM://", icon: "/assets/icons/crypto/atom.svg" },
  { ticker: "BCH", label: "BCH://", icon: "/assets/icons/crypto/bch.svg" },
  { ticker: "BNB", label: "BNB://", icon: "/assets/icons/crypto/bnb.svg" },
  { ticker: "BTC", label: "BTC://", icon: "/assets/icons/crypto/btc.svg" },
  { ticker: "DOGE", label: "DOGE://", icon: "/assets/icons/crypto/doge.svg" },
  { ticker: "DOT", label: "DOT://", icon: "/assets/icons/crypto/dot.svg" },
  { ticker: "ETC", label: "ETC://", icon: "/assets/icons/crypto/etc.svg" },
  { ticker: "ETH", label: "ETH://", icon: "/assets/icons/crypto/eth.svg" },
  { ticker: "LTC", label: "LTC://", icon: "/assets/icons/crypto/ltc.svg" },
  { ticker: "LUNA", label: "LUNA://", icon: "/assets/icons/crypto/luna.svg" },
  { ticker: "LUNC", label: "LUNC://", icon: "/assets/icons/crypto/lunc.svg" },
  { ticker: "SOL", label: "SOL://", icon: "/assets/icons/crypto/sol.svg" },
  { ticker: "STX", label: "STX://", icon: "/assets/icons/crypto/stx.svg" },
  { ticker: "TRX", label: "TRX://", icon: "/assets/icons/crypto/trx.svg" },
  { ticker: "WAVES", label: "WAVES://", icon: "/assets/icons/crypto/waves.svg" },
  { ticker: "XLM", label: "XLM://", icon: "/assets/icons/crypto/xlm.svg" },
  { ticker: "XRP", label: "XRP://", icon: "/assets/icons/crypto/xrp.svg" },
  { ticker: "XTZ", label: "XTZ://", icon: "/assets/icons/crypto/xtz.svg" },
]

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
// Pre-populate networks with static data so dropdown is available immediately
const networks = ref<NetworkInfo[]>(STATIC_NETWORKS)

// Custom dropdown state
const networkDropdownRef = ref<HTMLElement | null>(null)
const networkButtonRef = ref<HTMLElement | null>(null)
const dropdownMenuRef = ref<HTMLElement | null>(null)
const isNetworkDropdownOpen = ref(false)
const dropdownPosition = ref({ top: 0, left: 0, width: 0 })

const updateDropdownPosition = () => {
  if (networkButtonRef.value) {
    const rect = networkButtonRef.value.getBoundingClientRect()
    dropdownPosition.value = {
      top: rect.bottom + 4, // 4px gap below button
      left: rect.left,
      width: rect.width
    }
  }
}

const toggleNetworkDropdown = () => {
  if (!isNetworkDropdownOpen.value) {
    updateDropdownPosition()
  }
  isNetworkDropdownOpen.value = !isNetworkDropdownOpen.value
}

const selectNetwork = (ticker: SupportedTicker) => {
  selectedTicker.value = ticker
  isNetworkDropdownOpen.value = false
}

const dropdownStyle = computed(() => ({
  top: `${dropdownPosition.value.top}px`,
  left: `${dropdownPosition.value.left}px`,
  minWidth: `${Math.max(dropdownPosition.value.width, 140)}px`
}))

const getSelectedNetworkIcon = () => {
  const network = networks.value.find(n => n.ticker === selectedTicker.value)
  return network?.icon || `/assets/icons/crypto/${selectedTicker.value.toLowerCase()}.svg`
}

const getSelectedNetworkLabel = () => {
  const network = networks.value.find(n => n.ticker === selectedTicker.value)
  return network?.label || `${selectedTicker.value}://`
}

const handleIconError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.style.opacity = '0.3'
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  const isInsideDropdownRef = networkDropdownRef.value?.contains(target)
  const isInsideDropdownMenu = dropdownMenuRef.value?.contains(target)
  
  if (!isInsideDropdownRef && !isInsideDropdownMenu) {
    isNetworkDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
const currenciesLoaded = ref(false)
const currenciesLoading = ref(false)

// Load currencies dynamically when the modal opens (following reference pattern from temporaryKeyModal.tsx)
const loadCurrencies = async () => {
  if (currenciesLoaded.value || currenciesLoading.value) return
  
  currenciesLoading.value = true
  try {
    // Dynamic import for currencyByTicker to avoid loading heavy modules at startup
    const module = await import('@/lib/currencyCore/currencies')
    currencyByTicker.value = module.currencyByTicker
    networks.value = module.NETWORKS
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
  if (!currenciesLoaded.value) {
    // Return just ETH while loading
    return ['ETH'] as SupportedTicker[]
  }
  return Object.keys(currencyByTicker.value)
    .filter(ticker => currencyByTicker.value[ticker]?.deriveFromPrivateKey)
    .sort() as SupportedTicker[]
})

const getNetworkLabel = () => {
  // First check the loaded currency data
  const currency = currencyByTicker.value[selectedTicker.value]
  if (currency?.basicInfo?.name) return currency.basicInfo.name
  
  // Fallback to networks data
  const network = networks.value.find(n => n.ticker === selectedTicker.value)
  return network?.label?.replace('://', '') || selectedTicker.value
}

const getBlockExplorerUrl = async (ticker: string, address: string): Promise<string> => {
  // Dynamic import for getting block explorer (following reference pattern)
  try {
    const { currencyByTicker: currencies } = await import('@/lib/currencyCore/currencies')
    const currency = currencies[ticker]
    
    if (currency?.getBlockExplorerLink) {
      return currency.getBlockExplorerLink(address) || ''
    }
    
    // Fallback to blockExplorerLink if available
    if (currency?.blockExplorer?.blockExplorerLink) {
      return `${currency.blockExplorer.blockExplorerLink}${address}`
    }
  } catch (error) {
    console.error(`Error getting block explorer link for ${ticker}:`, error)
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

/* Chevron rotation transition */
.rotate-180 {
  transform: rotate(180deg);
}

svg {
  transition: transform 0.2s ease;
}
</style>
