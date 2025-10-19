<template>
  <div>
    <p class="text-left text-gray-600 mb-6">Resolve human-readable domain names to cryptocurrency addresses</p>
    
    <section class="mx-auto">
      <div class="mx-auto w-full">
        <form class="mb-6" @submit.prevent="resolveAddress">
          <div class="flex flex-col space-y-4">

            <div> <!-- Wrapper for the domain input field and its description -->
              <label for="search-dropdown" class="block text-sm font-medium text-gray-700 mb-1">Domain Name</label>
              <div class="flex max-w-2xl"> <!-- Flex container for the dropdown button and the input field -->
                <div class="relative">
                  <button 
                    id="dropdown-button" 
                    @click="toggleDropdown"
                    class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-blue-600 border border-blue-600 rounded-s-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    style="background-color: #2563eb !important; border-color: #2563eb !important; color: white !important;"
                    type="button">
                    {{ selectedNetwork || 'Networks ' }}   
                    <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                  </button>
                  <div v-show="isDropdownOpen" class="absolute top-full left-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-64 dark:bg-gray-700">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <!-- Available services -->
                      <li v-for="service in availableDomainServices" :key="service.name">
                        <a 
                          href="#" 
                          @click.prevent="selectNetwork(service.displayName)" 
                          class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          :title="service.description"
                        >
                          <img 
                            v-if="getServiceIcon(service.name)"
                            :src="getServiceIcon(service.name)" 
                            :alt="service.displayName" 
                            class="w-5 h-5 flex-shrink-0"
                          />
                          <span>{{ service.displayName }}</span>
                        </a>
                      </li>
                      <!-- Unavailable services -->
                      <li v-for="service in unavailableDomainServices" :key="service.name">
                        <a 
                          href="#" 
                          class="flex items-center gap-3 px-4 py-2 text-gray-400 cursor-not-allowed"
                          :title="service.description"
                        >
                          <img 
                            v-if="getServiceIcon(service.name)"
                            :src="getServiceIcon(service.name)" 
                            :alt="service.displayName" 
                            class="w-5 h-5 flex-shrink-0 opacity-50"
                          />
                          <span>{{ service.displayName }} (Unavailable)</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="relative flex-grow">
                  <input 
                    type="search" 
                    id="search-dropdown" 
                    v-model="domainAddress.domain"
                    class="block w-full py-2.5 px-3 text-sm text-gray-900 bg-gray-50 rounded-none border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 -ml-px h-[42px]"
                    placeholder="Enter a domain (e.g., example.eth)" 
                    required 
                  />
                </div>
                <button
                  class="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center rounded-e-lg border border-blue-600 -ml-px"
                  :class="{
                    'text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800': isFormValid && !domainAddress.loading,
                    'text-gray-500 bg-blue-300 cursor-not-allowed': !isFormValid || domainAddress.loading
                  }"
                  type="submit"
                  :disabled="!isFormValid || domainAddress.loading"
                >
                  <span v-if="domainAddress.loading" class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                  {{ domainAddress.loading ? 'Searching...' : 'Search' }}
                </button>
              </div>
              <p class="mt-1 text-xs text-gray-500">
                Currently supporting: {{ availableDomainServices.map((s: DomainServiceMetadata) => s.extensions.map((e: string) => `.${e}`).join(', ')).join(', ') }} domains
              </p>
            </div> <!-- End of wrapper for domain input section -->
            
            <!-- Cryptocurrency Ticker Selection -->
            <div v-if="!isEthereumNameService && !isTezosDomainsService">
              <label for="coin-ticker" class="block text-sm font-medium text-gray-700 mb-1">Query an address for a Domain</label>
              <select 
                id="coin-ticker"
                v-model="coinTicker"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Select a cryptocurrency</option>
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ADA">Cardano (ADA)</option>
                <option value="SOL">Solana (SOL)</option>
                <option value="DOT">Polkadot (DOT)</option>
                <option value="MATIC">Polygon (MATIC)</option>
                <option value="AVAX">Avalanche (AVAX)</option>
                <option value="LINK">Chainlink (LINK)</option>
                <option value="UNI">Uniswap (UNI)</option>
              </select>
              <p class="mt-1 text-xs text-gray-500">Select the cryptocurrency you want to resolve the domain to</p>
            </div>
            
            <!-- Ethereum Name Service Info -->
            <div v-if="isEthereumNameService" class="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-sm font-medium text-blue-800">Ethereum Name Service selected - will resolve to ETH address</span>
              </div>
            </div>
            
          </div> <!-- End of flex flex-col space-y-4 -->
          <br>
          <!-- Domain Address Resolution Display Info -->
          <domain-resolution-badge
            v-if="domainAddress.enabled"
            :domain-address="domainAddress"
            :currency="effectiveCoinTicker"
          />
          <br>
          <!-- Information about domain name services -->
          <div class="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 class="text-lg font-medium mb-2">About Domain Resolution</h3>
            <p class="text-sm text-gray-600 mb-2">
              This tool resolves human-readable domain names to cryptocurrency addresses using various blockchain domain services.
            </p>
            <ul class="text-sm text-gray-600 list-disc list-inside space-y-1">
              <!-- Available services -->
              <li v-for="service in availableDomainServices" :key="service.name">
                <span class="font-medium">{{ service.extensions.map((e: string) => `.${e}`).join(', ') }} domains</span> - 
                {{ service.description }}
              </li>
              <!-- Unavailable services -->
              <li v-for="service in unavailableDomainServices" :key="service.name" class="text-gray-400">
                <span class="font-medium">{{ service.extensions.map((e: string) => `.${e}`).join(', ') }} domains</span> - 
                <span class="line-through">{{ service.description }}</span> (temporarily unavailable)
              </li>
            </ul>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import { domainMixins } from '../../../utils/mixins/domainMixins'
import ens from '@/utils/currencyCore/domains/ens'
import DomainResolutionBadge from '@/utils/currencyCore/domains/domainRouter.vue'
import { getDomainServices, type DomainServiceMetadata } from '@/utils/currencyCore/domains/index'

// Define component name
defineOptions({
  name: 'DomainResolver'
})

// Initialize Flowbite components on mount
onMounted(() => {
  initFlowbite()
})

const coinTicker = ref('') // Start with empty selection
const selectedNetwork = ref('')
const isDropdownOpen = ref(false)
const domainAddress = reactive({
  address: '',
  domain: '',
  enabled: false,
  loading: false,
  service: '',
  error: ''
})

// Get available domain services dynamically
const domainServices = getDomainServices()
const availableDomainServices = computed(() => domainServices.filter(service => service.available))
const unavailableDomainServices = computed(() => domainServices.filter(service => !service.available))

// Computed property to check if Ethereum Name Service is selected
const isEthereumNameService = computed(() => {
  return selectedNetwork.value === 'Ethereum Name Service'
})

// Computed property to check if Tezos Domains is selected (always false now)
const isTezosDomainsService = computed(() => {
  return false // Disabled: selectedNetwork.value === 'Tezos Domains'
})

// Computed property for the effective coin ticker (ETH for ENS, otherwise the selected one)
const effectiveCoinTicker = computed(() => {
  if (isEthereumNameService.value) return 'ETH'
  return coinTicker.value
})

// Computed property to check if form is valid
const isFormValid = computed(() => {
  const hasValidDomain = domainAddress.domain.trim() !== ''
  const hasValidCurrency = isEthereumNameService.value || coinTicker.value !== ''
  return hasValidDomain && hasValidCurrency
})

// Dropdown functions
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function selectNetwork(network: string) {
  // Find the service by display name
  const service = domainServices.find(s => s.displayName === network)
  
  // Prevent selecting unavailable networks
  if (!service || !service.available) {
    return;
  }
  
  selectedNetwork.value = network
  isDropdownOpen.value = false
  
  // If Ethereum Name Service is selected, automatically set coinTicker to ETH
  if (network === 'Ethereum Name Service') {
    coinTicker.value = 'ETH'
  } else {
    // Reset coinTicker when switching away from ENS
    coinTicker.value = ''
  }
}

// Get icon path for each service
function getServiceIcon(serviceName: string): string | null {
  const iconMap: Record<string, string> = {
    'ens': '/assets/icons/domains/ethereumNameService.svg',
    'uns': '/assets/icons/domains/unstoppableDomains.svg',
    'tezos': '/assets/icons/domains/tezosDomains.svg',
    'sol': '/assets/icons/domains/solanaNameService.svg',
    'sns': '/assets/icons/domains/solanaNameService.svg',
    'algo': '/assets/icons/domains/nfDomains.svg',
    'stx': '/assets/icons/domains/bitcoinNameService.svg',
    'stacks': '/assets/icons/domains/bitcoinNameService.svg',
    'icns': '/assets/icons/domains/icns.svg',
    'tns': '/assets/icons/domains/tezosDomains.svg'
  }
  
  return iconMap[serviceName.toLowerCase()] || null
}

// Helper function to determine if domain is ENS (.eth)
function isEthDomain(domain: string): boolean {
  return domain.toLowerCase().endsWith('.eth')
}

async function resolveAddress() {
  const domain = domainAddress.domain
  const ticker = effectiveCoinTicker.value

  // Check if provided domain name is valid
  const isDomain = domainMixins.isDomain(domain)
  if (!isDomain) {
    domainAddress.error = 'Not a valid domain address.'
    domainAddress.enabled = true
    return
  }

  // If domain is valid, ensure address, error, and service fields have been cleared
  domainAddress.address = ''
  domainAddress.service = ''
  domainAddress.error = ''

  // Resolve address from domain
  try {
    domainAddress.loading = true
    domainAddress.enabled = true
    
    // Check if it's an ENS domain (.eth) or if Ethereum Name Service is explicitly selected
    if (isEthDomain(domain) || isEthereumNameService.value) {
      // Use ENS service for .eth domains or when ENS is selected
      const address = await ens.getAddress({
        domain,
        coinTicker: 'ETH' // Always use ETH for ENS
      })
      domainAddress.address = address
      domainAddress.service = 'ens'
    } else if (domain.endsWith('.tez')) {
      // Tezos domains - show error that it's temporarily unavailable
      throw new Error('Tezos Domains resolution temporarily unavailable');
    } else if (domain.endsWith('.crypto') || domain.endsWith('.wallet') || domain.endsWith('.nft')) {
      // Unstoppable domains - show error that it's temporarily unavailable
      throw new Error('Unstoppable Domains resolution temporarily unavailable');
    } else {
      // Use existing domain mixins for other domain types
      const { address, service } = await domainMixins.resolveAddressFromDomain({
        domain,
        coinTicker: ticker
      })
      domainAddress.address = address
      domainAddress.service = service
    }
  } catch (err: any) {
    domainAddress.error = err.message
  } finally {
    domainAddress.loading = false
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style> 